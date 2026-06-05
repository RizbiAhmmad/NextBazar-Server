import status from "http-status";
import { prisma } from "../../lib/prisma";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import AppError from "../../errorHelpers/AppError";
import { generateUniqueSlug } from "../../utils/generateSlug";
import { ProductStatus } from "../../../generated/prisma/enums";

const createProduct = async (vendorId: string, payload: any) => {
  // 1. Verify shop ownership
  const shop = await prisma.shop.findUnique({
    where: { id: payload.shopId },
  });

  if (!shop || shop.vendorId !== vendorId) {
    throw new AppError(status.FORBIDDEN, "Unauthorized: This shop does not belong to you");
  }

  // 2. Verify category exists
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new AppError(status.NOT_FOUND, "Category not found");
  }

  // 3. Generate unique slug
  const slug = await generateUniqueSlug(prisma, payload.name, "product");

  const { variants, ...productData } = payload;

  const product = await prisma.product.create({
    data: {
      ...productData,
      slug,
      status: ProductStatus.ACTIVE,
      ...(variants && variants.length > 0 && {
        variants: {
          create: variants,
        },
      }),
    },
    include: {
      category: true,
      shop: true,
      variants: true,
    },
  });

  return product;
};

const getAllProducts = async (queryParams: IQueryParams) => {
  const { minPrice, maxPrice, categoryId, sortBy, ...remainingQuery } = queryParams;

  const filter: any = { ...remainingQuery };

  // Default to ACTIVE products for general listing
  if (!filter.status) {
    filter.status = ProductStatus.ACTIVE;
  }

  if (minPrice || maxPrice) {
    filter.sellPrice = {};
    if (minPrice) filter.sellPrice.gte = Number(minPrice);
    if (maxPrice) filter.sellPrice.lte = Number(maxPrice);
  }

  if (categoryId) {
    if (Array.isArray(categoryId)) {
      filter.categoryId = { in: categoryId };
    } else if (typeof categoryId === "string" && categoryId.includes(",")) {
      filter.categoryId = { in: categoryId.split(",") };
    } else {
      filter.categoryId = categoryId;
    }
  }

  // Map sortBy values
  if (sortBy) {
    if (sortBy === "price_asc") {
      filter.sortBy = "sellPrice";
      filter.sortOrder = "asc";
    } else if (sortBy === "price_desc") {
      filter.sortBy = "sellPrice";
      filter.sortOrder = "desc";
    } else if (sortBy === "newest") {
      filter.sortBy = "createdAt";
      filter.sortOrder = "desc";
    } else if (sortBy === "popularity") {
      filter.sortBy = "reviews"; 
      filter.sortOrder = "desc";
    }
  }


  const productQuery = new QueryBuilder(prisma.product, filter, {
    searchableFields: ["name", "description"],
    filterableFields: ["categoryId", "shopId", "status", "sellPrice"],
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      category: true,
      shop: true,
      variants: true,
    });

  const result = await productQuery.execute();
  return result;
};

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      shop: true,
      variants: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  return product;
};

const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      shop: true,
      variants: true,
      reviews: true,
    },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  return product;
};

const updateProduct = async (id: string, vendorId: string, payload: any) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
    include: { shop: true },
  });

  if (!existingProduct) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  if (existingProduct.shop.vendorId !== vendorId) {
    throw new AppError(status.FORBIDDEN, "Unauthorized: You are not the owner of this product");
  }

  let slug: string | undefined;
  if (payload.name && payload.name !== existingProduct.name) {
    slug = await generateUniqueSlug(prisma, payload.name, "product", id);
  }

  const { variants, ...productData } = payload;

  const updatedProduct = await prisma.$transaction(async (tx) => {
    if (variants !== undefined) {
      await tx.productVariant.deleteMany({
        where: { productId: id },
      });

      if (variants && variants.length > 0) {
        await tx.productVariant.createMany({
          data: variants.map((v: any) => ({
            ...v,
            productId: id,
          })),
        });
      }
    }

    return await tx.product.update({
      where: { id },
      data: {
        ...productData,
        ...(slug && { slug }),
      },
      include: {
        category: true,
        shop: true,
        variants: true,
      },
    });
  });

  return updatedProduct;
};

const getProductVariants = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { variants: true },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  return product.variants;
};

const uploadVariantImage = async (
  productId: string,
  variantId: string,
  vendorId: string,
  imageUrl: string,
) => {
  // Verify product belongs to vendor
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { shop: true },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  if (product.shop.vendorId !== vendorId) {
    throw new AppError(status.FORBIDDEN, "Unauthorized: This product does not belong to you");
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
  });

  if (!variant || variant.productId !== productId) {
    throw new AppError(status.NOT_FOUND, "Variant not found for this product");
  }

  const updated = await prisma.productVariant.update({
    where: { id: variantId },
    data: { image: imageUrl },
  });

  return updated;
};

const deleteProduct = async (id: string, vendorId: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { shop: true },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  if (product.shop.vendorId !== vendorId) {
    throw new AppError(status.FORBIDDEN, "Unauthorized");
  }

  // Soft delete by changing status
  await prisma.product.update({
    where: { id },
    data: { status: ProductStatus.DELETED },
  });

  return { message: "Product deleted successfully" };
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getProductVariants,
  uploadVariantImage,
};
