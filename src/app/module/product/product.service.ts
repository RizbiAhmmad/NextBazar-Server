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

  const product = await prisma.product.create({
    data: {
      ...payload,
      slug,
      status: ProductStatus.ACTIVE,
    },
    include: {
      category: true,
      shop: true,
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

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...payload,
      ...(slug && { slug }),
    },
  });

  return updatedProduct;
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
};
