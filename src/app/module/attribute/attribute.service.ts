import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { Role } from "../../../generated/prisma/enums";

const createAttribute = async (
  user: { userId: string; role: Role },
  payload: { name: string; shopId?: string | null }
) => {
  let shopId = payload.shopId || null;

  if (user.role === Role.SELLER) {
    const shop = await prisma.shop.findUnique({
      where: { vendorId: user.userId },
    });
    if (!shop) {
      throw new AppError(status.NOT_FOUND, "Seller shop not found");
    }
    shopId = shop.id;
  }

  // Check if attribute with same name already exists for this shop / global
  const existing = await prisma.attribute.findFirst({
    where: {
      name: payload.name,
      shopId: shopId,
    },
  });

  if (existing) {
    throw new AppError(
      status.BAD_REQUEST,
      "Attribute with this name already exists"
    );
  }

  const attribute = await prisma.attribute.create({
    data: {
      name: payload.name,
      shopId: shopId,
    },
    include: {
      values: true,
      shop: true,
    },
  });

  return attribute;
};

const getAllAttributes = async (user?: { userId: string; role: Role }) => {
  // If user is seller, return global attributes AND their shop's attributes
  if (user && user.role === Role.SELLER) {
    const shop = await prisma.shop.findUnique({
      where: { vendorId: user.userId },
    });
    if (shop) {
      return await prisma.attribute.findMany({
        where: {
          OR: [{ shopId: null }, { shopId: shop.id }],
        },
        include: {
          values: true,
          shop: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  }

  // Otherwise return all attributes
  return await prisma.attribute.findMany({
    include: {
      values: true,
      shop: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAttributeById = async (id: string) => {
  const attribute = await prisma.attribute.findUnique({
    where: { id },
    include: {
      values: true,
      shop: true,
    },
  });

  if (!attribute) {
    throw new AppError(status.NOT_FOUND, "Attribute not found");
  }

  return attribute;
};

const updateAttribute = async (
  id: string,
  user: { userId: string; role: Role },
  payload: { name: string }
) => {
  const attribute = await prisma.attribute.findUnique({
    where: { id },
    include: { shop: true },
  });

  if (!attribute) {
    throw new AppError(status.NOT_FOUND, "Attribute not found");
  }

  // If seller, check ownership
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized: You cannot edit this attribute"
      );
    }
  }

  // Check unique constraint for rename
  const existing = await prisma.attribute.findFirst({
    where: {
      name: payload.name,
      shopId: attribute.shopId,
      NOT: { id },
    },
  });

  if (existing) {
    throw new AppError(
      status.BAD_REQUEST,
      "Attribute with this name already exists"
    );
  }

  const updated = await prisma.attribute.update({
    where: { id },
    data: { name: payload.name },
    include: {
      values: true,
      shop: true,
    },
  });

  return updated;
};

const deleteAttribute = async (
  id: string,
  user: { userId: string; role: Role }
) => {
  const attribute = await prisma.attribute.findUnique({
    where: { id },
    include: { shop: true },
  });

  if (!attribute) {
    throw new AppError(status.NOT_FOUND, "Attribute not found");
  }

  // If seller, check ownership
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized: You cannot delete this attribute"
      );
    }
  }

  await prisma.attribute.delete({
    where: { id },
  });

  return { message: "Attribute deleted successfully" };
};

const addAttributeValue = async (
  attributeId: string,
  user: { userId: string; role: Role },
  payload: { value: string }
) => {
  const attribute = await prisma.attribute.findUnique({
    where: { id: attributeId },
    include: { shop: true },
  });

  if (!attribute) {
    throw new AppError(status.NOT_FOUND, "Attribute not found");
  }

  // If seller, check ownership
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized: You cannot manage this attribute's values"
      );
    }
  }

  // Check if value already exists for this attribute
  const existing = await prisma.attributeValue.findUnique({
    where: {
      value_attributeId: {
        value: payload.value,
        attributeId: attributeId,
      },
    },
  });

  if (existing) {
    throw new AppError(
      status.BAD_REQUEST,
      "Value already exists for this attribute"
    );
  }

  const attributeValue = await prisma.attributeValue.create({
    data: {
      value: payload.value,
      attributeId: attributeId,
    },
  });

  return attributeValue;
};

const deleteAttributeValue = async (
  valueId: string,
  user: { userId: string; role: Role }
) => {
  const value = await prisma.attributeValue.findUnique({
    where: { id: valueId },
    include: {
      attribute: {
        include: { shop: true },
      },
    },
  });

  if (!value) {
    throw new AppError(status.NOT_FOUND, "Attribute value not found");
  }

  // If seller, check ownership of parent attribute
  if (user.role === Role.SELLER) {
    if (
      !value.attribute.shop ||
      value.attribute.shop.vendorId !== user.userId
    ) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized: You cannot delete this attribute value"
      );
    }
  }

  await prisma.attributeValue.delete({
    where: { id: valueId },
  });

  return { message: "Attribute value deleted successfully" };
};

const updateAttributeValue = async (
  valueId: string,
  user: { userId: string; role: Role },
  payload: { value: string }
) => {
  const value = await prisma.attributeValue.findUnique({
    where: { id: valueId },
    include: {
      attribute: {
        include: { shop: true },
      },
    },
  });

  if (!value) {
    throw new AppError(status.NOT_FOUND, "Attribute value not found");
  }

  // If seller, check ownership of parent attribute
  if (user.role === Role.SELLER) {
    if (
      !value.attribute.shop ||
      value.attribute.shop.vendorId !== user.userId
    ) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized: You cannot update this attribute value"
      );
    }
  }

  // Check unique constraint for rename within the same attribute
  const existing = await prisma.attributeValue.findFirst({
    where: {
      value: payload.value,
      attributeId: value.attributeId,
      NOT: { id: valueId },
    },
  });

  if (existing) {
    throw new AppError(
      status.BAD_REQUEST,
      "Value already exists for this attribute"
    );
  }

  const updatedValue = await prisma.attributeValue.update({
    where: { id: valueId },
    data: { value: payload.value },
  });

  return updatedValue;
};

export const AttributeService = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
  addAttributeValue,
  deleteAttributeValue,
  updateAttributeValue,
};
