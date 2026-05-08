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
  const productQuery = new QueryBuilder(prisma.product, queryParams, {
    searchableFields: ["name", "description", "tags"],
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
