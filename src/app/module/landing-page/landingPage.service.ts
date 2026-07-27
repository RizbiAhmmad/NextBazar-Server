import status from "http-status";
import { prisma } from "../../lib/prisma";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import AppError from "../../errorHelpers/AppError";
import { generateUniqueSlug } from "../../utils/generateSlug";
import { OrderService } from "../order/order.service";
import { OrderType } from "../../../generated/prisma/enums";

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

const createLandingPage = async (
  vendorId: string,
  payload: {
    productId: string;
    campaignTitle: string;
    bannerImage?: string;
    galleryImages?: string[];
    reviewImages?: string[];
    [key: string]: unknown;
  },
) => {
  const shop = await getShopForVendor(vendorId);

  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product || product.shopId !== shop.id) {
    throw new AppError(
      status.FORBIDDEN,
      "You can only create a landing page for your own product",
    );
  }

  const slug = await generateUniqueSlug(prisma, payload.campaignTitle, "landingPage");

  const landingPage = await prisma.landingPage.create({
    data: {
      ...payload,
      slug,
      shopId: shop.id,
    },
  });

  return landingPage;
};

const getMyLandingPages = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await getShopForVendor(vendorId);

  const query = new QueryBuilder(prisma.landingPage, queryParams, {
    searchableFields: ["campaignTitle"],
    filterableFields: ["isActive"],
  })
    .where({ shopId: shop.id })
    .include({ product: { select: { id: true, name: true, images: true, slug: true } } })
    .search()
    .filter()
    .sort()
    .paginate();

  return await query.execute();
};

const getLandingPageById = async (id: string, vendorId: string) => {
  const shop = await getShopForVendor(vendorId);

  const landingPage = await prisma.landingPage.findUnique({
    where: { id },
    include: { product: true },
  });

  if (!landingPage || landingPage.shopId !== shop.id) {
    throw new AppError(status.NOT_FOUND, "Landing page not found");
  }

  return landingPage;
};

const getLandingPageBySlug = async (slug: string) => {
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug },
    include: {
      product: {
        include: {
          variants: true,
          shop: { select: { id: true, name: true, logo: true } },
        },
      },
    },
  });

  if (!landingPage || !landingPage.isActive) {
    throw new AppError(status.NOT_FOUND, "Landing page not found");
  }

  // Best-effort view counter — failure here should never break the page render
  prisma.landingPage
    .update({ where: { id: landingPage.id }, data: { views: { increment: 1 } } })
    .catch(() => undefined);

  return landingPage;
};

const updateLandingPage = async (
  id: string,
  vendorId: string,
  payload: {
    campaignTitle?: string;
    [key: string]: unknown;
  },
) => {
  const shop = await getShopForVendor(vendorId);

  const existing = await prisma.landingPage.findUnique({ where: { id } });
  if (!existing || existing.shopId !== shop.id) {
    throw new AppError(status.NOT_FOUND, "Landing page not found");
  }

  if (payload.productId) {
    const product = await prisma.product.findUnique({
      where: { id: payload.productId as string },
    });
    if (!product || product.shopId !== shop.id) {
      throw new AppError(
        status.FORBIDDEN,
        "You can only link a landing page to your own product",
      );
    }
  }

  let slug: string | undefined;
  if (payload.campaignTitle && payload.campaignTitle !== existing.campaignTitle) {
    slug = await generateUniqueSlug(prisma, payload.campaignTitle, "landingPage", id);
  }

  const updated = await prisma.landingPage.update({
    where: { id },
    data: { ...payload, ...(slug && { slug }) },
    include: { product: true },
  });

  return updated;
};

const deleteLandingPage = async (id: string, vendorId: string) => {
  const shop = await getShopForVendor(vendorId);

  const existing = await prisma.landingPage.findUnique({ where: { id } });
  if (!existing || existing.shopId !== shop.id) {
    throw new AppError(status.NOT_FOUND, "Landing page not found");
  }

  await prisma.landingPage.delete({ where: { id } });

  return { message: "Landing page deleted successfully" };
};

const createGuestOrder = async (
  slug: string,
  payload: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    productVariantId?: string | null;
    quantity: number;
    shippingFee?: number;
  },
) => {
  const landingPage = await prisma.landingPage.findUnique({ where: { slug } });

  if (!landingPage || !landingPage.isActive) {
    throw new AppError(status.NOT_FOUND, "Landing page not found");
  }

  const order = await OrderService.createOrder(null, {
    fullName: payload.fullName,
    phone: payload.phone,
    address: payload.address,
    district: payload.district,
    shippingFee: payload.shippingFee,
    orderType: OrderType.LANDING_PAGE,
    items: [
      {
        productId: landingPage.productId,
        productVariantId: payload.productVariantId || undefined,
        quantity: payload.quantity,
      },
    ],
  });

  return order;
};

export const LandingPageService = {
  createLandingPage,
  getMyLandingPages,
  getLandingPageById,
  getLandingPageBySlug,
  updateLandingPage,
  deleteLandingPage,
  createGuestOrder,
};
