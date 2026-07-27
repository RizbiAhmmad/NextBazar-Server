var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms2 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms2 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms2, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms2, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// src/app.ts
import * as Sentry2 from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express4 from "express";
import path4 from "path";
import qs from "qs";

// src/app/config/env.ts
import dotenv from "dotenv";
import status from "http-status";

// src/app/errorHelpers/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requiredEnvVariable = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "EMAIL_SENDER_SMTP_FROM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FRONTEND_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD"
  ];
  requiredEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${variable} is required but not set in .env file.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    RAG: {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
      OPENROUTER_EMBEDDING_MODEL: process.env.OPENROUTER_EMBEDDING_MODEL,
      OPENROUTER_LLM_MODEL: process.env.OPENROUTER_LLM_MODEL
    },
    SENTRY_DSN: process.env.SENTRY_DSN
  };
};
var envVars = loadEnvVariables();

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [
    "postgresqlExtensions"
  ],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Admin {\n  id            String    @id @default(uuid(7))\n  name          String\n  email         String    @unique\n  profilePhoto  String?\n  contactNumber String?\n  isDeleted     Boolean   @default(false)\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  deletedAt     DateTime?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([email])\n  @@index([isDeleted])\n  @@map("admins")\n}\n\nmodel Attribute {\n  id        String           @id @default(uuid())\n  name      String\n  shopId    String?\n  shop      Shop?            @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  values    AttributeValue[]\n  createdAt DateTime         @default(now())\n  updatedAt DateTime         @updatedAt\n\n  @@unique([name, shopId])\n  @@index([shopId])\n  @@map("attributes")\n}\n\nmodel AttributeValue {\n  id          String    @id @default(uuid())\n  value       String\n  attributeId String\n  attribute   Attribute @relation(fields: [attributeId], references: [id], onDelete: Cascade)\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@unique([value, attributeId])\n  @@index([attributeId])\n  @@map("attribute_values")\n}\n\nmodel User {\n  id                 String     @id\n  name               String\n  email              String\n  emailVerified      Boolean    @default(false)\n  role               Role       @default(USER)\n  status             UserStatus @default(ACTIVE)\n  needPasswordChange Boolean    @default(false)\n  isDeleted          Boolean    @default(false)\n  deletedAt          DateTime?\n  image              String?\n  createdAt          DateTime   @default(now())\n  updatedAt          DateTime   @updatedAt\n\n  // Relations\n  sessions Session[]\n  accounts Account[]\n  admin    Admin?\n  shop     Shop?\n  orders   Order[]\n  cart     Cart?\n  reviews  Review[]\n\n  @@unique([email])\n  @@index([role])\n  @@index([status])\n  @@index([isDeleted])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Cart {\n  id    String     @id @default(uuid())\n  items CartItem[]\n\n  // Relations\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("carts")\n}\n\nmodel CartItem {\n  id       String @id @default(uuid())\n  quantity Int    @default(1)\n\n  // Relations\n  cartId           String\n  cart             Cart            @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  productId        String\n  product          Product         @relation(fields: [productId], references: [id])\n  productVariantId String?\n  productVariant   ProductVariant? @relation(fields: [productVariantId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([cartId, productId, productVariantId]) // prevent duplicate variant in same cart\n  @@index([cartId])\n  @@index([productId])\n  @@index([productVariantId])\n  @@map("cart_items")\n}\n\nmodel Category {\n  id       String  @id @default(uuid())\n  name     String  @unique\n  slug     String  @unique\n  icon     String?\n  image    String?\n  isActive Boolean @default(true)\n\n  // Self-relation for subcategories\n  parentId      String?\n  parent        Category?  @relation("CategoryToSubcategory", fields: [parentId], references: [id])\n  subcategories Category[] @relation("CategoryToSubcategory")\n\n  products Product[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([parentId])\n  @@index([slug])\n  @@map("categories")\n}\n\nenum DiscountType {\n  FLAT\n  PERCENTAGE\n}\n\nmodel Coupon {\n  id                String       @id @default(uuid())\n  code              String       @unique\n  discountType      DiscountType\n  discountAmount    Float\n  maxDiscountAmount Float?\n  minPurchaseAmount Float        @default(0)\n  startDate         DateTime\n  endDate           DateTime\n  isActive          Boolean      @default(true)\n\n  // Relations\n  shopId   String\n  shop     Shop            @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  products CouponProduct[]\n  orders   Order[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([shopId])\n  @@index([code])\n  @@map("coupons")\n}\n\nmodel CouponProduct {\n  id        String  @id @default(uuid())\n  couponId  String\n  productId String\n  coupon    Coupon  @relation(fields: [couponId], references: [id], onDelete: Cascade)\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@unique([couponId, productId])\n  @@map("coupon_products")\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  SELLER\n  USER\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  PENDING\n  DELETED\n}\n\nenum ShopStatus {\n  PENDING\n  ACTIVE\n  BLOCKED\n}\n\nenum ProductStatus {\n  ACTIVE\n  DRAFT\n  OUT_OF_STOCK\n  DELETED\n}\n\nenum OrderStatus {\n  PENDING\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nenum ProductType {\n  SIMPLE\n  VARIABLE\n}\n\nenum OrderType {\n  ONLINE\n  POS\n  LANDING_PAGE\n}\n\nenum VatType {\n  INCLUDED\n  EXCLUDED\n}\n\nmodel HeroSlider {\n  id        String   @id @default(uuid())\n  image     String\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("hero_sliders")\n}\n\nmodel LandingPage {\n  id       String  @id @default(uuid())\n  slug     String  @unique\n  isActive Boolean @default(true)\n\n  // Relations\n  productId String\n  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n  shopId    String\n  shop      Shop    @relation(fields: [shopId], references: [id], onDelete: Cascade)\n\n  // Header\n  campaignTitle            String\n  campaignShortDescription String?\n  bannerImage              String?\n\n  // Price highlight labels (free text set by the seller, e.g. "\u09AA\u09C2\u09B0\u09CD\u09AC\u09C7\u09B0 \u09AE\u09C2\u09B2\u09CD\u09AF" / "Regular Price")\n  regularPriceLabel String?\n  offerPriceLabel   String?\n\n  // Gallery\n  galleryHeading     String?\n  galleryDescription String?\n  galleryImages      String[]\n\n  // About + video\n  aboutHeading     String?\n  aboutDescription String?\n  videoUrl         String?\n\n  // Long description\n  descriptionTitle String?\n  description      String?\n\n  // Reviews\n  reviewHeading String?\n  reviewImages  String[]\n\n  // Order form\n  orderFormHeading String @default("Order Now")\n  orderButtonText  String @default("\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8")\n\n  views Int @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([shopId])\n  @@index([productId])\n  @@map("landing_pages")\n}\n\nmodel Order {\n  id            String        @id @default(uuid())\n  orderType     OrderType     @default(ONLINE)\n  totalAmount   Float\n  paymentStatus PaymentStatus @default(PENDING)\n  paymentMethod String? // cash, card, mfs, other\n  orderStatus   OrderStatus   @default(PENDING)\n\n  // Shipping address (structured)\n  fullName String?\n  phone    String?\n  address  String?\n  district String?\n\n  notes String? // Optional customer notes\n\n  // Relations\n  userId String?\n  user   User?       @relation(fields: [userId], references: [id])\n  shopId String?\n  shop   Shop?       @relation(fields: [shopId], references: [id])\n  items  OrderItem[]\n\n  discountAmount Float   @default(0)\n  shippingFee    Float   @default(0)\n  couponId       String?\n  coupon         Coupon? @relation(fields: [couponId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([shopId])\n  @@index([paymentStatus])\n  @@index([orderStatus])\n  @@index([district])\n  @@index([couponId])\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  quantity Int\n  price    Float // Sell price at time of purchase\n\n  // Vendor payout tracking\n  vendorEarning   Float // price * quantity - commission\n  platformEarning Float // commission amount\n\n  // Item fulfillment status (per vendor)\n  status OrderStatus @default(PENDING)\n\n  // Relations\n  orderId          String\n  order            Order           @relation(fields: [orderId], references: [id])\n  productId        String\n  product          Product         @relation(fields: [productId], references: [id])\n  productVariantId String?\n  productVariant   ProductVariant? @relation(fields: [productVariantId], references: [id])\n  shopId           String\n  shop             Shop            @relation(fields: [shopId], references: [id])\n\n  @@index([orderId])\n  @@index([shopId])\n  @@index([productId])\n  @@index([productVariantId])\n  @@map("order_items")\n}\n\nmodel PosCartItem {\n  id String @id @default(uuid())\n\n  shopId String\n  shop   Shop   @relation(fields: [shopId], references: [id])\n\n  productId String\n  product   Product @relation(fields: [productId], references: [id])\n\n  productVariantId String?\n\n  productName  String\n  price        Float\n  quantity     Int     @default(1)\n  combination  String? // variant label e.g. "XL-Red"\n  productImage String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([shopId])\n  @@index([productId])\n  @@map("pos_cart_items")\n}\n\nmodel Product {\n  id               String        @id @default(uuid())\n  name             String\n  slug             String        @unique\n  description      String\n  shortDescription String\n  images           String[]\n  stock            Int           @default(0)\n  status           ProductStatus @default(DRAFT)\n  type             ProductType   @default(SIMPLE)\n  attributes       Json?\n\n  // Pricing\n  purchasePrice Float // What vendor bought it for (internal cost)\n  regularPrice  Float // Original MRP / crossed-out price shown to customer\n  sellPrice     Float // Actual selling price (what customer pays)\n\n  // Tags / searchability\n  tags String[]\n\n  // Vat, Shipping, Featured configuration\n  vatType       VatType @default(INCLUDED)\n  vatPercentage Float   @default(0)\n  freeShipping  Boolean @default(false)\n  isFeatured    Boolean @default(false)\n\n  // Relations\n  shopId     String\n  shop       Shop     @relation(fields: [shopId], references: [id])\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  variants     ProductVariant[]\n  reviews      Review[]\n  orderItems   OrderItem[]\n  cartItems    CartItem[]\n  coupons      CouponProduct[]\n  posCartItems PosCartItem[]\n  landingPages LandingPage[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([shopId])\n  @@index([categoryId])\n  @@index([status])\n  @@index([slug])\n  @@map("products")\n}\n\nmodel ProductVariant {\n  id          String  @id @default(uuid())\n  productId   String\n  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n  combination String // e.g. "XL-Red-500gm"\n\n  quantity      Int     @default(0)\n  purchasePrice Float\n  regularPrice  Float\n  sellPrice     Float\n  image         String?\n\n  orderItems OrderItem[]\n  cartItems  CartItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([productId])\n  @@map("product_variants")\n}\n\nmodel DocumentEmbedding {\n  id String @id @default(uuid(7))\n\n  chunkKey    String  @unique\n  sourceType  String\n  sourceId    String\n  sourceLabel String?\n  content     String\n  metadata    Json?\n\n  embedding Unsupported("vector(2048)")\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n\n  @@index([sourceType], name: "idx_document_embeddings_sourceType")\n  @@index([sourceId], name: "idx_document_embeddings_sourceId")\n  @@map("document_embeddings")\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int     @default(5) // 1\u20135 scale\n  comment String?\n\n  // Relations\n  userId    String\n  user      User    @relation(fields: [userId], references: [id])\n  productId String\n  product   Product @relation(fields: [productId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, productId]) // one review per product per user\n  @@index([productId])\n  @@index([userId])\n  @@map("reviews")\n}\n\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../../src/generated/prisma"\n  previewFeatures = ["postgresqlExtensions"]\n}\n\ndatasource db {\n  provider   = "postgresql"\n  extensions = [vector]\n}\n\nmodel ShippingSetting {\n  id                      String @id @default("default") // a single row\n  insideDhakaShippingFee  Float  @default(70)\n  outsideDhakaShippingFee Float  @default(130)\n\n  updatedAt DateTime @updatedAt\n\n  @@map("shipping_settings")\n}\n\nmodel Shop {\n  id          String     @id @default(uuid())\n  name        String     @unique\n  description String?\n  logo        String?\n  banner      String?\n  status      ShopStatus @default(PENDING)\n\n  // Commission rate for this specific shop (overrides global if set)\n  commissionRate Float @default(10) // percentage e.g. 10 = 10%\n\n  // Relations\n  vendorId     String        @unique\n  vendor       User          @relation(fields: [vendorId], references: [id])\n  products     Product[]\n  orderItems   OrderItem[]\n  attributes   Attribute[]\n  coupons      Coupon[]\n  posCartItems PosCartItem[]\n  posOrders    Order[]\n  landingPages LandingPage[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@map("shops")\n}\n\nmodel SiteSetting {\n  id          String  @id @default("default") // a single row\n  siteName    String  @default("NextBazar")\n  tagline     String?\n  description String  @default("Your ultimate multivendor marketplace. Discover premium products from verified sellers across the nation.")\n  logo        String?\n  phone       String?\n  email       String?\n  address     String?\n\n  facebook  String?\n  youtube   String?\n  instagram String?\n  linkedin  String?\n  tiktok    String?\n  whatsapp  String?\n\n  copyrightText String @default("All rights reserved.")\n\n  updatedAt DateTime @updatedAt\n\n  @@map("site_settings")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Admin":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AdminToUser"}],"dbName":"admins"},"Attribute":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"AttributeToShop"},{"name":"values","kind":"object","type":"AttributeValue","relationName":"AttributeToAttributeValue"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attributes"},"AttributeValue":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"attributeId","kind":"scalar","type":"String"},{"name":"attribute","kind":"object","type":"Attribute","relationName":"AttributeToAttributeValue"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attribute_values"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"admin","kind":"object","type":"Admin","relationName":"AdminToUser"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productVariant","kind":"object","type":"ProductVariant","relationName":"CartItemToProductVariant"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart_items"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"subcategories","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Coupon":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"discountType","kind":"enum","type":"DiscountType"},{"name":"discountAmount","kind":"scalar","type":"Float"},{"name":"maxDiscountAmount","kind":"scalar","type":"Float"},{"name":"minPurchaseAmount","kind":"scalar","type":"Float"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"CouponToShop"},{"name":"products","kind":"object","type":"CouponProduct","relationName":"CouponToCouponProduct"},{"name":"orders","kind":"object","type":"Order","relationName":"CouponToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"coupons"},"CouponProduct":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"couponId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"coupon","kind":"object","type":"Coupon","relationName":"CouponToCouponProduct"},{"name":"product","kind":"object","type":"Product","relationName":"CouponProductToProduct"}],"dbName":"coupon_products"},"HeroSlider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"hero_sliders"},"LandingPage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"LandingPageToProduct"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"LandingPageToShop"},{"name":"campaignTitle","kind":"scalar","type":"String"},{"name":"campaignShortDescription","kind":"scalar","type":"String"},{"name":"bannerImage","kind":"scalar","type":"String"},{"name":"regularPriceLabel","kind":"scalar","type":"String"},{"name":"offerPriceLabel","kind":"scalar","type":"String"},{"name":"galleryHeading","kind":"scalar","type":"String"},{"name":"galleryDescription","kind":"scalar","type":"String"},{"name":"galleryImages","kind":"scalar","type":"String"},{"name":"aboutHeading","kind":"scalar","type":"String"},{"name":"aboutDescription","kind":"scalar","type":"String"},{"name":"videoUrl","kind":"scalar","type":"String"},{"name":"descriptionTitle","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"reviewHeading","kind":"scalar","type":"String"},{"name":"reviewImages","kind":"scalar","type":"String"},{"name":"orderFormHeading","kind":"scalar","type":"String"},{"name":"orderButtonText","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"landing_pages"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderType","kind":"enum","type":"OrderType"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"orderStatus","kind":"enum","type":"OrderStatus"},{"name":"fullName","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"OrderToShop"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"discountAmount","kind":"scalar","type":"Float"},{"name":"shippingFee","kind":"scalar","type":"Float"},{"name":"couponId","kind":"scalar","type":"String"},{"name":"coupon","kind":"object","type":"Coupon","relationName":"CouponToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"vendorEarning","kind":"scalar","type":"Float"},{"name":"platformEarning","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productVariant","kind":"object","type":"ProductVariant","relationName":"OrderItemToProductVariant"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"OrderItemToShop"}],"dbName":"order_items"},"PosCartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"PosCartItemToShop"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"PosCartItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productName","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"combination","kind":"scalar","type":"String"},{"name":"productImage","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"pos_cart_items"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"ProductStatus"},{"name":"type","kind":"enum","type":"ProductType"},{"name":"attributes","kind":"scalar","type":"Json"},{"name":"purchasePrice","kind":"scalar","type":"Float"},{"name":"regularPrice","kind":"scalar","type":"Float"},{"name":"sellPrice","kind":"scalar","type":"Float"},{"name":"tags","kind":"scalar","type":"String"},{"name":"vatType","kind":"enum","type":"VatType"},{"name":"vatPercentage","kind":"scalar","type":"Float"},{"name":"freeShipping","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ProductToShop"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"variants","kind":"object","type":"ProductVariant","relationName":"ProductToProductVariant"},{"name":"reviews","kind":"object","type":"Review","relationName":"ProductToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProduct"},{"name":"coupons","kind":"object","type":"CouponProduct","relationName":"CouponProductToProduct"},{"name":"posCartItems","kind":"object","type":"PosCartItem","relationName":"PosCartItemToProduct"},{"name":"landingPages","kind":"object","type":"LandingPage","relationName":"LandingPageToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"products"},"ProductVariant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToProductVariant"},{"name":"combination","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"purchasePrice","kind":"scalar","type":"Float"},{"name":"regularPrice","kind":"scalar","type":"Float"},{"name":"sellPrice","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProductVariant"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProductVariant"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"product_variants"},"DocumentEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"chunkKey","kind":"scalar","type":"String"},{"name":"sourceType","kind":"scalar","type":"String"},{"name":"sourceId","kind":"scalar","type":"String"},{"name":"sourceLabel","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"Json"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"document_embeddings"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"ShippingSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"insideDhakaShippingFee","kind":"scalar","type":"Float"},{"name":"outsideDhakaShippingFee","kind":"scalar","type":"Float"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shipping_settings"},"Shop":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"banner","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShopStatus"},{"name":"commissionRate","kind":"scalar","type":"Float"},{"name":"vendorId","kind":"scalar","type":"String"},{"name":"vendor","kind":"object","type":"User","relationName":"ShopToUser"},{"name":"products","kind":"object","type":"Product","relationName":"ProductToShop"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToShop"},{"name":"attributes","kind":"object","type":"Attribute","relationName":"AttributeToShop"},{"name":"coupons","kind":"object","type":"Coupon","relationName":"CouponToShop"},{"name":"posCartItems","kind":"object","type":"PosCartItem","relationName":"PosCartItemToShop"},{"name":"posOrders","kind":"object","type":"Order","relationName":"OrderToShop"},{"name":"landingPages","kind":"object","type":"LandingPage","relationName":"LandingPageToShop"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shops"},"SiteSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"siteName","kind":"scalar","type":"String"},{"name":"tagline","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"facebook","kind":"scalar","type":"String"},{"name":"youtube","kind":"scalar","type":"String"},{"name":"instagram","kind":"scalar","type":"String"},{"name":"linkedin","kind":"scalar","type":"String"},{"name":"tiktok","kind":"scalar","type":"String"},{"name":"whatsapp","kind":"scalar","type":"String"},{"name":"copyrightText","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"site_settings"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","admin","vendor","shop","parent","subcategories","products","_count","category","product","items","coupon","orders","order","productVariant","orderItems","cart","cartItems","variants","reviews","coupons","posCartItems","landingPages","attribute","values","attributes","posOrders","Admin.findUnique","Admin.findUniqueOrThrow","Admin.findFirst","Admin.findFirstOrThrow","Admin.findMany","data","Admin.createOne","Admin.createMany","Admin.createManyAndReturn","Admin.updateOne","Admin.updateMany","Admin.updateManyAndReturn","create","update","Admin.upsertOne","Admin.deleteOne","Admin.deleteMany","having","_min","_max","Admin.groupBy","Admin.aggregate","Attribute.findUnique","Attribute.findUniqueOrThrow","Attribute.findFirst","Attribute.findFirstOrThrow","Attribute.findMany","Attribute.createOne","Attribute.createMany","Attribute.createManyAndReturn","Attribute.updateOne","Attribute.updateMany","Attribute.updateManyAndReturn","Attribute.upsertOne","Attribute.deleteOne","Attribute.deleteMany","Attribute.groupBy","Attribute.aggregate","AttributeValue.findUnique","AttributeValue.findUniqueOrThrow","AttributeValue.findFirst","AttributeValue.findFirstOrThrow","AttributeValue.findMany","AttributeValue.createOne","AttributeValue.createMany","AttributeValue.createManyAndReturn","AttributeValue.updateOne","AttributeValue.updateMany","AttributeValue.updateManyAndReturn","AttributeValue.upsertOne","AttributeValue.deleteOne","AttributeValue.deleteMany","AttributeValue.groupBy","AttributeValue.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","_avg","_sum","CartItem.groupBy","CartItem.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Coupon.findUnique","Coupon.findUniqueOrThrow","Coupon.findFirst","Coupon.findFirstOrThrow","Coupon.findMany","Coupon.createOne","Coupon.createMany","Coupon.createManyAndReturn","Coupon.updateOne","Coupon.updateMany","Coupon.updateManyAndReturn","Coupon.upsertOne","Coupon.deleteOne","Coupon.deleteMany","Coupon.groupBy","Coupon.aggregate","CouponProduct.findUnique","CouponProduct.findUniqueOrThrow","CouponProduct.findFirst","CouponProduct.findFirstOrThrow","CouponProduct.findMany","CouponProduct.createOne","CouponProduct.createMany","CouponProduct.createManyAndReturn","CouponProduct.updateOne","CouponProduct.updateMany","CouponProduct.updateManyAndReturn","CouponProduct.upsertOne","CouponProduct.deleteOne","CouponProduct.deleteMany","CouponProduct.groupBy","CouponProduct.aggregate","HeroSlider.findUnique","HeroSlider.findUniqueOrThrow","HeroSlider.findFirst","HeroSlider.findFirstOrThrow","HeroSlider.findMany","HeroSlider.createOne","HeroSlider.createMany","HeroSlider.createManyAndReturn","HeroSlider.updateOne","HeroSlider.updateMany","HeroSlider.updateManyAndReturn","HeroSlider.upsertOne","HeroSlider.deleteOne","HeroSlider.deleteMany","HeroSlider.groupBy","HeroSlider.aggregate","LandingPage.findUnique","LandingPage.findUniqueOrThrow","LandingPage.findFirst","LandingPage.findFirstOrThrow","LandingPage.findMany","LandingPage.createOne","LandingPage.createMany","LandingPage.createManyAndReturn","LandingPage.updateOne","LandingPage.updateMany","LandingPage.updateManyAndReturn","LandingPage.upsertOne","LandingPage.deleteOne","LandingPage.deleteMany","LandingPage.groupBy","LandingPage.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","PosCartItem.findUnique","PosCartItem.findUniqueOrThrow","PosCartItem.findFirst","PosCartItem.findFirstOrThrow","PosCartItem.findMany","PosCartItem.createOne","PosCartItem.createMany","PosCartItem.createManyAndReturn","PosCartItem.updateOne","PosCartItem.updateMany","PosCartItem.updateManyAndReturn","PosCartItem.upsertOne","PosCartItem.deleteOne","PosCartItem.deleteMany","PosCartItem.groupBy","PosCartItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","ProductVariant.findUnique","ProductVariant.findUniqueOrThrow","ProductVariant.findFirst","ProductVariant.findFirstOrThrow","ProductVariant.findMany","ProductVariant.createOne","ProductVariant.createMany","ProductVariant.createManyAndReturn","ProductVariant.updateOne","ProductVariant.updateMany","ProductVariant.updateManyAndReturn","ProductVariant.upsertOne","ProductVariant.deleteOne","ProductVariant.deleteMany","ProductVariant.groupBy","ProductVariant.aggregate","DocumentEmbedding.findUnique","DocumentEmbedding.findUniqueOrThrow","DocumentEmbedding.findFirst","DocumentEmbedding.findFirstOrThrow","DocumentEmbedding.findMany","DocumentEmbedding.updateOne","DocumentEmbedding.updateMany","DocumentEmbedding.updateManyAndReturn","DocumentEmbedding.deleteOne","DocumentEmbedding.deleteMany","DocumentEmbedding.groupBy","DocumentEmbedding.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","ShippingSetting.findUnique","ShippingSetting.findUniqueOrThrow","ShippingSetting.findFirst","ShippingSetting.findFirstOrThrow","ShippingSetting.findMany","ShippingSetting.createOne","ShippingSetting.createMany","ShippingSetting.createManyAndReturn","ShippingSetting.updateOne","ShippingSetting.updateMany","ShippingSetting.updateManyAndReturn","ShippingSetting.upsertOne","ShippingSetting.deleteOne","ShippingSetting.deleteMany","ShippingSetting.groupBy","ShippingSetting.aggregate","Shop.findUnique","Shop.findUniqueOrThrow","Shop.findFirst","Shop.findFirstOrThrow","Shop.findMany","Shop.createOne","Shop.createMany","Shop.createManyAndReturn","Shop.updateOne","Shop.updateMany","Shop.updateManyAndReturn","Shop.upsertOne","Shop.deleteOne","Shop.deleteMany","Shop.groupBy","Shop.aggregate","SiteSetting.findUnique","SiteSetting.findUniqueOrThrow","SiteSetting.findFirst","SiteSetting.findFirstOrThrow","SiteSetting.findMany","SiteSetting.createOne","SiteSetting.createMany","SiteSetting.createManyAndReturn","SiteSetting.updateOne","SiteSetting.updateMany","SiteSetting.updateManyAndReturn","SiteSetting.upsertOne","SiteSetting.deleteOne","SiteSetting.deleteMany","SiteSetting.groupBy","SiteSetting.aggregate","AND","OR","NOT","id","siteName","tagline","description","logo","phone","email","address","facebook","youtube","instagram","linkedin","tiktok","whatsapp","copyrightText","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","banner","ShopStatus","status","commissionRate","vendorId","createdAt","every","some","none","insideDhakaShippingFee","outsideDhakaShippingFee","rating","comment","userId","productId","chunkKey","sourceType","sourceId","sourceLabel","content","metadata","isDeleted","deletedAt","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","combination","quantity","purchasePrice","regularPrice","sellPrice","image","slug","shortDescription","images","stock","ProductStatus","ProductType","type","tags","VatType","vatType","vatPercentage","freeShipping","isFeatured","shopId","categoryId","has","hasEvery","hasSome","productVariantId","productName","price","productImage","vendorEarning","platformEarning","OrderStatus","orderId","OrderType","orderType","totalAmount","PaymentStatus","paymentStatus","paymentMethod","orderStatus","fullName","district","notes","discountAmount","shippingFee","couponId","isActive","campaignTitle","campaignShortDescription","bannerImage","regularPriceLabel","offerPriceLabel","galleryHeading","galleryDescription","galleryImages","aboutHeading","aboutDescription","videoUrl","descriptionTitle","reviewHeading","reviewImages","orderFormHeading","orderButtonText","views","code","DiscountType","discountType","maxDiscountAmount","minPurchaseAmount","startDate","endDate","icon","parentId","cartId","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","emailVerified","Role","role","UserStatus","needPasswordChange","attributeId","profilePhoto","contactNumber","value_attributeId","name_shopId","userId_productId","cartId_productId_productVariantId","couponId_productId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "qgzfAfwCDgMAALsFACCkAwAAvgYAMKUDAAALABCmAwAAvgYAMKcDAQAAAAGtAwEAAAABtgNAALAFACHCAwEArgUAIcgDQACwBQAh0AMBAAAAAdgDIADTBQAh2QNAANQFACG-BAEArwUAIb8EAQCvBQAhAQAAAAEAIAwDAAC7BQAgpAMAAMAGADClAwAAAwAQpgMAAMAGADCnAwEArgUAIbYDQACwBQAhyANAALAFACHQAwEArgUAIasEQACwBQAhtQQBAK4FACG2BAEArwUAIbcEAQCvBQAhAwMAAIcJACC2BAAAwQYAILcEAADBBgAgDAMAALsFACCkAwAAwAYAMKUDAAADABCmAwAAwAYAMKcDAQAAAAG2A0AAsAUAIcgDQACwBQAh0AMBAK4FACGrBEAAsAUAIbUEAQAAAAG2BAEArwUAIbcEAQCvBQAhAwAAAAMAIAEAAAQAMAIAAAUAIBEDAAC7BQAgpAMAAL8GADClAwAABwAQpgMAAL8GADCnAwEArgUAIbYDQACwBQAhyANAALAFACHQAwEArgUAIawEAQCuBQAhrQQBAK4FACGuBAEArwUAIa8EAQCvBQAhsAQBAK8FACGxBEAA1AUAIbIEQADUBQAhswQBAK8FACG0BAEArwUAIQgDAACHCQAgrgQAAMEGACCvBAAAwQYAILAEAADBBgAgsQQAAMEGACCyBAAAwQYAILMEAADBBgAgtAQAAMEGACARAwAAuwUAIKQDAAC_BgAwpQMAAAcAEKYDAAC_BgAwpwMBAAAAAbYDQACwBQAhyANAALAFACHQAwEArgUAIawEAQCuBQAhrQQBAK4FACGuBAEArwUAIa8EAQCvBQAhsAQBAK8FACGxBEAA1AUAIbIEQADUBQAhswQBAK8FACG0BAEArwUAIQMAAAAHACABAAAIADACAAAJACAOAwAAuwUAIKQDAAC-BgAwpQMAAAsAEKYDAAC-BgAwpwMBAK4FACGtAwEArgUAIbYDQACwBQAhwgMBAK4FACHIA0AAsAUAIdADAQCuBQAh2AMgANMFACHZA0AA1AUAIb4EAQCvBQAhvwQBAK8FACEBAAAACwAgFQcAALsFACALAAC8BQAgFAAAvQUAIBkAAL8FACAaAADABQAgGwAAwgUAIB4AAL4FACAfAADBBQAgpAMAALgFADClAwAADQAQpgMAALgFADCnAwEArgUAIaoDAQCvBQAhqwMBAK8FACG2A0AAsAUAIcIDAQCuBQAhwwMBAK8FACHFAwAAuQXFAyLGAwgAugUAIccDAQCuBQAhyANAALAFACEBAAAADQAgIggAAJcGACANAAC8BgAgFAAAvQUAIBYAAPwFACAXAAC9BgAgGAAAkAYAIBkAAJgGACAaAADABQAgGwAAwgUAIB4AANIFACCkAwAAuAYAMKUDAAAPABCmAwAAuAYAMKcDAQCuBQAhqgMBAK4FACG2A0AAsAUAIcIDAQCuBQAhxQMAALkG6wMiyANAALAFACHiAwgAugUAIeMDCAC6BQAh5AMIALoFACHmAwEArgUAIecDAQCuBQAh6AMAANcFACDpAwIAoAYAIewDAAC6BuwDIu0DAADXBQAg7wMAALsG7wMi8AMIALoFACHxAyAA0wUAIfIDIADTBQAh8wMBAK4FACH0AwEArgUAIQoIAADeCgAgDQAA9woAIBQAAIkJACAWAACBCgAgFwAA-QoAIBgAAOAKACAZAADwCgAgGgAAjAkAIBsAAI4JACAeAADBBgAgIggAAJcGACANAAC8BgAgFAAAvQUAIBYAAPwFACAXAAC9BgAgGAAAkAYAIBkAAJgGACAaAADABQAgGwAAwgUAIB4AANIFACCkAwAAuAYAMKUDAAAPABCmAwAAuAYAMKcDAQAAAAGqAwEArgUAIbYDQACwBQAhwgMBAK4FACHFAwAAuQbrAyLIA0AAsAUAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeYDAQAAAAHnAwEArgUAIegDAADXBQAg6QMCAKAGACHsAwAAugbsAyLtAwAA1wUAIO8DAAC7Bu8DIvADCAC6BQAh8QMgANMFACHyAyAA0wUAIfMDAQCuBQAh9AMBAK4FACEDAAAADwAgAQAAEAAwAgAAEQAgDwkAALYGACAKAAC3BgAgCwAAvAUAIKQDAAC1BgAwpQMAABMAEKYDAAC1BgAwpwMBAK4FACG2A0AAsAUAIcIDAQCuBQAhyANAALAFACHlAwEArwUAIeYDAQCuBQAhjQQgANMFACGmBAEArwUAIacEAQCvBQAhAQAAABMAIAYJAAD3CgAgCgAA-AoAIAsAAIgJACDlAwAAwQYAIKYEAADBBgAgpwQAAMEGACAPCQAAtgYAIAoAALcGACALAAC8BQAgpAMAALUGADClAwAAEwAQpgMAALUGADCnAwEAAAABtgNAALAFACHCAwEAAAAByANAALAFACHlAwEArwUAIeYDAQAAAAGNBCAA0wUAIaYEAQCvBQAhpwQBAK8FACEDAAAAEwAgAQAAFQAwAgAAFgAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAATACABAAAADwAgEA4AAKEGACAUAAC9BQAgFgAA_AUAIKQDAAC0BgAwpQMAABsAEKYDAAC0BgAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh0QMBAK4FACHgAwEArgUAIeEDAgCgBgAh4gMIALoFACHjAwgAugUAIeQDCAC6BQAh5QMBAK8FACEEDgAA8woAIBQAAIkJACAWAACBCgAg5QMAAMEGACAQDgAAoQYAIBQAAL0FACAWAAD8BQAgpAMAALQGADClAwAAGwAQpgMAALQGADCnAwEAAAABtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK4FACHhAwIAoAYAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeUDAQCvBQAhAwAAABsAIAEAABwAMAIAAB0AIBEIAACXBgAgDgAAoQYAIBIAALMGACATAACoBgAgpAMAALIGADClAwAAHwAQpgMAALIGADCnAwEArgUAIcUDAACsBv8DItEDAQCuBQAh4QMCAKAGACHzAwEArgUAIfgDAQCvBQAh-gMIALoFACH8AwgAugUAIf0DCAC6BQAh_wMBAK4FACEFCAAA3goAIA4AAPMKACASAAD2CgAgEwAA9AoAIPgDAADBBgAgEQgAAJcGACAOAAChBgAgEgAAswYAIBMAAKgGACCkAwAAsgYAMKUDAAAfABCmAwAAsgYAMKcDAQAAAAHFAwAArAb_AyLRAwEArgUAIeEDAgCgBgAh8wMBAK4FACH4AwEArwUAIfoDCAC6BQAh_AMIALoFACH9AwgAugUAIf8DAQCuBQAhAwAAAB8AIAEAACAAMAIAACEAIBYEAACLBgAgBQAAjAYAIAYAAI0GACAIAACOBgAgEQAAwQUAIBUAAI8GACAYAACQBgAgpAMAAIgGADClAwAAIwAQpgMAAIgGADCnAwEArgUAIa0DAQCuBQAhtgNAALAFACHCAwEArgUAIcUDAACKBrwEIsgDQACwBQAh2AMgANMFACHZA0AA1AUAIeUDAQCvBQAhuAQgANMFACG6BAAAiQa6BCK8BCAA0wUAIQEAAAAjACABAAAADQAgAwAAAB8AIAEAACAAMAIAACEAIBIIAACXBgAgCwAAmAYAIBEAAMEFACCkAwAAlAYAMKUDAAAnABCmAwAAlAYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIfMDAQCuBQAhigQIALoFACGNBCAA0wUAIZ8EAQCuBQAhoQQAAJUGoQQiogQIAJYGACGjBAgAugUAIaQEQACwBQAhpQRAALAFACEBAAAAJwAgCA4AAKEGACAQAACxBgAgpAMAALAGADClAwAAKQAQpgMAALAGADCnAwEArgUAIdEDAQCuBQAhjAQBAK4FACECDgAA8woAIBAAAPUKACAJDgAAoQYAIBAAALEGACCkAwAAsAYAMKUDAAApABCmAwAAsAYAMKcDAQAAAAHRAwEArgUAIYwEAQCuBQAhxAQAAK8GACADAAAAKQAgAQAAKgAwAgAAKwAgGQMAAK0GACAIAACOBgAgDwAAvQUAIBAAAK4GACCkAwAAqQYAMKUDAAAtABCmAwAAqQYAMKcDAQCuBQAhrAMBAK8FACGuAwEArwUAIbYDQACwBQAhyANAALAFACHQAwEArwUAIfMDAQCvBQAhgQQAAKoGgQQiggQIALoFACGEBAAAqwaEBCKFBAEArwUAIYYEAACsBv8DIocEAQCvBQAhiAQBAK8FACGJBAEArwUAIYoECAC6BQAhiwQIALoFACGMBAEArwUAIQ0DAACHCQAgCAAA3goAIA8AAIkJACAQAAD1CgAgrAMAAMEGACCuAwAAwQYAINADAADBBgAg8wMAAMEGACCFBAAAwQYAIIcEAADBBgAgiAQAAMEGACCJBAAAwQYAIIwEAADBBgAgGQMAAK0GACAIAACOBgAgDwAAvQUAIBAAAK4GACCkAwAAqQYAMKUDAAAtABCmAwAAqQYAMKcDAQAAAAGsAwEArwUAIa4DAQCvBQAhtgNAALAFACHIA0AAsAUAIdADAQCvBQAh8wMBAK8FACGBBAAAqgaBBCKCBAgAugUAIYQEAACrBoQEIoUEAQCvBQAhhgQAAKwG_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AMAAABVACABAABWADACAABXACABAAAADQAgCRwAAJsGACCkAwAAmgYAMKUDAABaABCmAwAAmgYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIaoEAQCuBQAhvQQBAK4FACEBHAAA8QoAIAocAACbBgAgpAMAAJoGADClAwAAWgAQpgMAAJoGADCnAwEAAAABtgNAALAFACHIA0AAsAUAIaoEAQCuBQAhvQQBAK4FACHABAAAmQYAIAMAAABaACABAABbADACAABcACABAAAAWgAgBAgAAN4KACALAADwCgAgEQAAjQkAIKIEAADBBgAgEggAAJcGACALAACYBgAgEQAAwQUAIKQDAACUBgAwpQMAACcAEKYDAACUBgAwpwMBAAAAAbYDQACwBQAhyANAALAFACHzAwEArgUAIYoECAC6BQAhjQQgANMFACGfBAEAAAABoQQAAJUGoQQiogQIAJYGACGjBAgAugUAIaQEQACwBQAhpQRAALAFACEDAAAAJwAgAQAAXwAwAgAAYAAgAwAAAEUAIAEAAEYAMAIAAEcAIAMAAAAtACABAAAuADACAAAvACADAAAASQAgAQAASgAwAgAASwAgAQAAAA8AIAEAAAAfACABAAAAVQAgAQAAACcAIAEAAABFACABAAAALQAgAQAAAEkAIAMAAAAtACABAAAuADACAAAvACAJAwAAuwUAIA8AAPwFACCkAwAA-wUAMKUDAABtABCmAwAA-wUAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdADAQCuBQAhAQAAAG0AIAMAAAA-ACABAAA_ADACAABAACABAAAAAwAgAQAAAAcAIAEAAAAtACABAAAAPgAgAQAAAAEAIAQDAACHCQAg2QMAAMEGACC-BAAAwQYAIL8EAADBBgAgAwAAAAsAIAEAAHUAMAIAAAEAIAMAAAALACABAAB1ADACAAABACADAAAACwAgAQAAdQAwAgAAAQAgCwMAAO8KACCnAwEAAAABrQMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAdADAQAAAAHYAyAAAAAB2QNAAAAAAb4EAQAAAAG_BAEAAAABASUAAHkAIAqnAwEAAAABrQMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAdADAQAAAAHYAyAAAAAB2QNAAAAAAb4EAQAAAAG_BAEAAAABASUAAHsAMAElAAB7ADALAwAA7goAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHQAwEAxQYAIdgDIADhBgAh2QNAAJ4JACG-BAEAxgYAIb8EAQDGBgAhAgAAAAEAICUAAH4AIAqnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcgDQADHBgAh0AMBAMUGACHYAyAA4QYAIdkDQACeCQAhvgQBAMYGACG_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-QEAEKYDAAD_BQAwpwMBAKIFACG2A0AApAUAIcgDQACkBQAh0AMBAKIFACGsBAEAogUAIa0EAQCiBQAhrgQBAKMFACGvBAEAowUAIbAEAQCjBQAhsQRAAMsFACGyBEAAywUAIbMEAQCjBQAhtAQBAKMFACEDAAAABwAgAQAA-AEAMDEAAPkBACADAAAABwAgAQAACAAwAgAACQAgCaQDAAD-BQAwpQMAAP8BABCmAwAA_gUAMKcDAQAAAAG2A0AAsAUAIcgDQACwBQAhqQQBAK4FACGqBAEArgUAIasEQACwBQAhAQAAAPwBACABAAAA_AEAIAmkAwAA_gUAMKUDAAD_AQAQpgMAAP4FADCnAwEArgUAIbYDQACwBQAhyANAALAFACGpBAEArgUAIaoEAQCuBQAhqwRAALAFACEAAwAAAP8BACABAACAAgAwAgAA_AEAIAMAAAD_AQAgAQAAgAIAMAIAAPwBACADAAAA_wEAIAEAAIACADACAAD8AQAgBqcDAQAAAAG2A0AAAAAByANAAAAAAakEAQAAAAGqBAEAAAABqwRAAAAAAQElAACEAgAgBqcDAQAAAAG2A0AAAAAByANAAAAAAakEAQAAAAGqBAEAAAABqwRAAAAAAQElAACGAgAwASUAAIYCADAGpwMBAMUGACG2A0AAxwYAIcgDQADHBgAhqQQBAMUGACGqBAEAxQYAIasEQADHBgAhAgAAAPwBACAlAACJAgAgBqcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIakEAQDFBgAhqgQBAMUGACGrBEAAxwYAIQIAAAD_AQAgJQAAiwIAIAIAAAD_AQAgJQAAiwIAIAMAAAD8AQAgLAAAhAIAIC0AAIkCACABAAAA_AEAIAEAAAD_AQAgAwwAAIIKACAyAACECgAgMwAAgwoAIAmkAwAA_QUAMKUDAACSAgAQpgMAAP0FADCnAwEAogUAIbYDQACkBQAhyANAAKQFACGpBAEAogUAIaoEAQCiBQAhqwRAAKQFACEDAAAA_wEAIAEAAJECADAxAACSAgAgAwAAAP8BACABAACAAgAwAgAA_AEAIAkDAAC7BQAgDwAA_AUAIKQDAAD7BQAwpQMAAG0AEKYDAAD7BQAwpwMBAAAAAbYDQACwBQAhyANAALAFACHQAwEAAAABAQAAAJUCACABAAAAlQIAIAIDAACHCQAgDwAAgQoAIAMAAABtACABAACYAgAwAgAAlQIAIAMAAABtACABAACYAgAwAgAAlQIAIAMAAABtACABAACYAgAwAgAAlQIAIAYDAACACgAgDwAA_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_QIAIAOnAwEAxQYAIdEDAQDFBgAhjAQBAMUGACECAAAAKQAgJQAA_wIAIAIAAAApACAlAAD_AgAgAwAAACsAICwAAPgCACAtAAD9AgAgAQAAACsAIAEAAAApACADDAAAxAkAIDIAAMYJACAzAADFCQAgBqQDAADwBQAwpQMAAIYDABCmAwAA8AUAMKcDAQCiBQAh0QMBAKIFACGMBAEAogUAIQMAAAApACABAACFAwAwMQAAhgMAIAMAAAApACABAAAqADACAAArACAIpAMAAO8FADClAwAAjAMAEKYDAADvBQAwpwMBAAAAAbYDQACwBQAhyANAALAFACHlAwEArgUAIY0EIADTBQAhAQAAAIkDACABAAAAiQMAIAikAwAA7wUAMKUDAACMAwAQpgMAAO8FADCnAwEArgUAIbYDQACwBQAhyANAALAFACHlAwEArgUAIY0EIADTBQAhAAMAAACMAwAgAQAAjQMAMAIAAIkDACADAAAAjAMAIAEAAI0DADACAACJAwAgAwAAAIwDACABAACNAwAwAgAAiQMAIAWnAwEAAAABtgNAAAAAAcgDQAAAAAHlAwEAAAABjQQgAAAAAQElAACRAwAgBacDAQAAAAG2A0AAAAAByANAAAAAAeUDAQAAAAGNBCAAAAABASUAAJMDADABJQAAkwMAMAWnAwEAxQYAIbYDQADHBgAhyANAAMcGACHlAwEAxQYAIY0EIADhBgAhAgAAAIkDACAlAACWAwAgBacDAQDFBgAhtgNAAMcGACHIA0AAxwYAIeUDAQDFBgAhjQQgAOEGACECAAAAjAMAICUAAJgDACACAAAAjAMAICUAAJgDACADAAAAiQMAICwAAJEDACAtAACWAwAgAQAAAIkDACABAAAAjAMAIAMMAADBCQAgMgAAwwkAIDMAAMIJACAIpAMAAO4FADClAwAAnwMAEKYDAADuBQAwpwMBAKIFACG2A0AApAUAIcgDQACkBQAh5QMBAKIFACGNBCAAygUAIQMAAACMAwAgAQAAngMAMDEAAJ8DACADAAAAjAMAIAEAAI0DADACAACJAwAgAQAAAEsAIAEAAABLACADAAAASQAgAQAASgAwAgAASwAgAwAAAEkAIAEAAEoAMAIAAEsAIAMAAABJACABAABKADACAABLACAbCAAAkggAIA4AAOoGACCnAwEAAAABqgMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeYDAQAAAAHzAwEAAAABjQQgAAAAAY4EAQAAAAGPBAEAAAABkAQBAAAAAZEEAQAAAAGSBAEAAAABkwQBAAAAAZQEAQAAAAGVBAAA6AYAIJYEAQAAAAGXBAEAAAABmAQBAAAAAZkEAQAAAAGaBAEAAAABmwQAAOkGACCcBAEAAAABnQQBAAAAAZ4EAgAAAAEBJQAApwMAIBmnAwEAAAABqgMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeYDAQAAAAHzAwEAAAABjQQgAAAAAY4EAQAAAAGPBAEAAAABkAQBAAAAAZEEAQAAAAGSBAEAAAABkwQBAAAAAZQEAQAAAAGVBAAA6AYAIJYEAQAAAAGXBAEAAAABmAQBAAAAAZkEAQAAAAGaBAEAAAABmwQAAOkGACCcBAEAAAABnQQBAAAAAZ4EAgAAAAEBJQAAqQMAMAElAACpAwAwGwgAAJAIACAOAADmBgAgpwMBAMUGACGqAwEAxgYAIbYDQADHBgAhyANAAMcGACHRAwEAxQYAIeYDAQDFBgAh8wMBAMUGACGNBCAA4QYAIY4EAQDFBgAhjwQBAMYGACGQBAEAxgYAIZEEAQDGBgAhkgQBAMYGACGTBAEAxgYAIZQEAQDGBgAhlQQAAOIGACCWBAEAxgYAIZcEAQDGBgAhmAQBAMYGACGZBAEAxgYAIZoEAQDGBgAhmwQAAOMGACCcBAEAxQYAIZ0EAQDFBgAhngQCAOQGACECAAAASwAgJQAArAMAIBmnAwEAxQYAIaoDAQDGBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh5gMBAMUGACHzAwEAxQYAIY0EIADhBgAhjgQBAMUGACGPBAEAxgYAIZAEAQDGBgAhkQQBAMYGACGSBAEAxgYAIZMEAQDGBgAhlAQBAMYGACGVBAAA4gYAIJYEAQDGBgAhlwQBAMYGACGYBAEAxgYAIZkEAQDGBgAhmgQBAMYGACGbBAAA4wYAIJwEAQDFBgAhnQQBAMUGACGeBAIA5AYAIQIAAABJACAlAACuAwAgAgAAAEkAICUAAK4DACADAAAASwAgLAAApwMAIC0AAKwDACABAAAASwAgAQAAAEkAIBEMAAC8CQAgMgAAvwkAIDMAAL4JACC0AQAAvQkAILUBAADACQAgqgMAAMEGACCPBAAAwQYAIJAEAADBBgAgkQQAAMEGACCSBAAAwQYAIJMEAADBBgAglAQAAMEGACCWBAAAwQYAIJcEAADBBgAgmAQAAMEGACCZBAAAwQYAIJoEAADBBgAgHKQDAADtBQAwpQMAALUDABCmAwAA7QUAMKcDAQCiBQAhqgMBAKMFACG2A0AApAUAIcgDQACkBQAh0QMBAKIFACHmAwEAogUAIfMDAQCiBQAhjQQgAMoFACGOBAEAogUAIY8EAQCjBQAhkAQBAKMFACGRBAEAowUAIZIEAQCjBQAhkwQBAKMFACGUBAEAowUAIZUEAADXBQAglgQBAKMFACGXBAEAowUAIZgEAQCjBQAhmQQBAKMFACGaBAEAowUAIZsEAADXBQAgnAQBAKIFACGdBAEAogUAIZ4EAgDGBQAhAwAAAEkAIAEAALQDADAxAAC1AwAgAwAAAEkAIAEAAEoAMAIAAEsAIAEAAAAvACABAAAALwAgAwAAAC0AIAEAAC4AMAIAAC8AIAMAAAAtACABAAAuADACAAAvACADAAAALQAgAQAALgAwAgAALwAgFgMAAI8HACAIAAC5BwAgDwAAkAcAIBAAAJEHACCnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAdADAQAAAAHzAwEAAAABgQQAAACBBAKCBAgAAAABhAQAAACEBAKFBAEAAAABhgQAAAD_AwKHBAEAAAABiAQBAAAAAYkEAQAAAAGKBAgAAAABiwQIAAAAAYwEAQAAAAEBJQAAvQMAIBKnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAdADAQAAAAHzAwEAAAABgQQAAACBBAKCBAgAAAABhAQAAACEBAKFBAEAAAABhgQAAAD_AwKHBAEAAAABiAQBAAAAAYkEAQAAAAGKBAgAAAABiwQIAAAAAYwEAQAAAAEBJQAAvwMAMAElAAC_AwAwAQAAACMAIAEAAAANACABAAAAJwAgFgMAAPkGACAIAAC3BwAgDwAA-gYAIBAAAPsGACCnAwEAxQYAIawDAQDGBgAhrgMBAMYGACG2A0AAxwYAIcgDQADHBgAh0AMBAMYGACHzAwEAxgYAIYEEAAD1BoEEIoIECADOBgAhhAQAAPYGhAQihQQBAMYGACGGBAAA9wb_AyKHBAEAxgYAIYgEAQDGBgAhiQQBAMYGACGKBAgAzgYAIYsECADOBgAhjAQBAMYGACECAAAALwAgJQAAxQMAIBKnAwEAxQYAIawDAQDGBgAhrgMBAMYGACG2A0AAxwYAIcgDQADHBgAh0AMBAMYGACHzAwEAxgYAIYEEAAD1BoEEIoIECADOBgAhhAQAAPYGhAQihQQBAMYGACGGBAAA9wb_AyKHBAEAxgYAIYgEAQDGBgAhiQQBAMYGACGKBAgAzgYAIYsECADOBgAhjAQBAMYGACECAAAALQAgJQAAxwMAIAIAAAAtACAlAADHAwAgAQAAACMAIAEAAAANACABAAAAJwAgAwAAAC8AICwAAL0DACAtAADFAwAgAQAAAC8AIAEAAAAtACAODAAAtwkAIDIAALoJACAzAAC5CQAgtAEAALgJACC1AQAAuwkAIKwDAADBBgAgrgMAAMEGACDQAwAAwQYAIPMDAADBBgAghQQAAMEGACCHBAAAwQYAIIgEAADBBgAgiQQAAMEGACCMBAAAwQYAIBWkAwAA5gUAMKUDAADRAwAQpgMAAOYFADCnAwEAogUAIawDAQCjBQAhrgMBAKMFACG2A0AApAUAIcgDQACkBQAh0AMBAKMFACHzAwEAowUAIYEEAADnBYEEIoIECACzBQAhhAQAAOgFhAQihQQBAKMFACGGBAAA4wX_AyKHBAEAowUAIYgEAQCjBQAhiQQBAKMFACGKBAgAswUAIYsECACzBQAhjAQBAKMFACEDAAAALQAgAQAA0AMAMDEAANEDACADAAAALQAgAQAALgAwAgAALwAgAQAAACEAIAEAAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIAMAAAAfACABAAAgADACAAAhACAOCAAAjQcAIA4AAIsHACASAADvBwAgEwAAjAcAIKcDAQAAAAHFAwAAAP8DAtEDAQAAAAHhAwIAAAAB8wMBAAAAAfgDAQAAAAH6AwgAAAAB_AMIAAAAAf0DCAAAAAH_AwEAAAABASUAANkDACAKpwMBAAAAAcUDAAAA_wMC0QMBAAAAAeEDAgAAAAHzAwEAAAAB-AMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAEBJQAA2wMAMAElAADbAwAwAQAAABsAIA4IAACJBwAgDgAAhwcAIBIAAO0HACATAACIBwAgpwMBAMUGACHFAwAA9wb_AyLRAwEAxQYAIeEDAgDkBgAh8wMBAMUGACH4AwEAxgYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIf8DAQDFBgAhAgAAACEAICUAAN8DACAKpwMBAMUGACHFAwAA9wb_AyLRAwEAxQYAIeEDAgDkBgAh8wMBAMUGACH4AwEAxgYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIf8DAQDFBgAhAgAAAB8AICUAAOEDACACAAAAHwAgJQAA4QMAIAEAAAAbACADAAAAIQAgLAAA2QMAIC0AAN8DACABAAAAIQAgAQAAAB8AIAYMAACyCQAgMgAAtQkAIDMAALQJACC0AQAAswkAILUBAAC2CQAg-AMAAMEGACANpAMAAOIFADClAwAA6QMAEKYDAADiBQAwpwMBAKIFACHFAwAA4wX_AyLRAwEAogUAIeEDAgDGBQAh8wMBAKIFACH4AwEAowUAIfoDCACzBQAh_AMIALMFACH9AwgAswUAIf8DAQCiBQAhAwAAAB8AIAEAAOgDADAxAADpAwAgAwAAAB8AIAEAACAAMAIAACEAIAEAAABHACABAAAARwAgAwAAAEUAIAEAAEYAMAIAAEcAIAMAAABFACABAABGADACAABHACADAAAARQAgAQAARgAwAgAARwAgDQgAAJ0IACAOAACfBwAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeADAQAAAAHhAwIAAAAB8wMBAAAAAfgDAQAAAAH5AwEAAAAB-gMIAAAAAfsDAQAAAAEBJQAA8QMAIAunAwEAAAABtgNAAAAAAcgDQAAAAAHRAwEAAAAB4AMBAAAAAeEDAgAAAAHzAwEAAAAB-AMBAAAAAfkDAQAAAAH6AwgAAAAB-wMBAAAAAQElAADzAwAwASUAAPMDADANCAAAmwgAIA4AAJ0HACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHRAwEAxQYAIeADAQDGBgAh4QMCAOQGACHzAwEAxQYAIfgDAQDGBgAh-QMBAMUGACH6AwgAzgYAIfsDAQDGBgAhAgAAAEcAICUAAPYDACALpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0QMBAMUGACHgAwEAxgYAIeEDAgDkBgAh8wMBAMUGACH4AwEAxgYAIfkDAQDFBgAh-gMIAM4GACH7AwEAxgYAIQIAAABFACAlAAD4AwAgAgAAAEUAICUAAPgDACADAAAARwAgLAAA8QMAIC0AAPYDACABAAAARwAgAQAAAEUAIAgMAACtCQAgMgAAsAkAIDMAAK8JACC0AQAArgkAILUBAACxCQAg4AMAAMEGACD4AwAAwQYAIPsDAADBBgAgDqQDAADhBQAwpQMAAP8DABCmAwAA4QUAMKcDAQCiBQAhtgNAAKQFACHIA0AApAUAIdEDAQCiBQAh4AMBAKMFACHhAwIAxgUAIfMDAQCiBQAh-AMBAKMFACH5AwEAogUAIfoDCACzBQAh-wMBAKMFACEDAAAARQAgAQAA_gMAMDEAAP8DACADAAAARQAgAQAARgAwAgAARwAgAQAAABEAIAEAAAARACADAAAADwAgAQAAEAAwAgAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAPACABAAAQADACAAARACAfCAAArAkAIA0AAPcIACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGQAA_AgAIBoAAP0IACAbAAD-CAAgHoAAAAABpwMBAAAAAaoDAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAA6wMCyANAAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeYDAQAAAAHnAwEAAAAB6AMAAPUIACDpAwIAAAAB7AMAAADsAwLtAwAA9ggAIO8DAAAA7wMC8AMIAAAAAfEDIAAAAAHyAyAAAAAB8wMBAAAAAfQDAQAAAAEBJQAAhwQAIBYegAAAAAGnAwEAAAABqgMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAADrAwLIA0AAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5gMBAAAAAecDAQAAAAHoAwAA9QgAIOkDAgAAAAHsAwAAAOwDAu0DAAD2CAAg7wMAAADvAwLwAwgAAAAB8QMgAAAAAfIDIAAAAAHzAwEAAAAB9AMBAAAAAQElAACJBAAwASUAAIkEADAfCAAAqwkAIA0AAIAIACAUAACDCAAgFgAAhAgAIBcAAIEIACAYAACCCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhAgAAABEAICUAAIwEACAWHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhAgAAAA8AICUAAI4EACACAAAADwAgJQAAjgQAIAMAAAARACAsAACHBAAgLQAAjAQAIAEAAAARACABAAAADwAgBgwAAKYJACAeAADBBgAgMgAAqQkAIDMAAKgJACC0AQAApwkAILUBAACqCQAgGR4AAMkFACCkAwAA1gUAMKUDAACVBAAQpgMAANYFADCnAwEAogUAIaoDAQCiBQAhtgNAAKQFACHCAwEAogUAIcUDAADYBesDIsgDQACkBQAh4gMIALMFACHjAwgAswUAIeQDCACzBQAh5gMBAKIFACHnAwEAogUAIegDAADXBQAg6QMCAMYFACHsAwAA2QXsAyLtAwAA1wUAIO8DAADaBe8DIvADCACzBQAh8QMgAMoFACHyAyAAygUAIfMDAQCiBQAh9AMBAKIFACEDAAAADwAgAQAAlAQAMDEAAJUEACADAAAADwAgAQAAEAAwAgAAEQAgAQAAAB0AIAEAAAAdACADAAAAGwAgAQAAHAAwAgAAHQAgAwAAABsAIAEAABwAMAIAAB0AIAMAAAAbACABAAAcADACAAAdACANDgAApQkAIBQAAPIIACAWAADzCAAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeADAQAAAAHhAwIAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5QMBAAAAAQElAACdBAAgCqcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHgAwEAAAAB4QMCAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeUDAQAAAAEBJQAAnwQAMAElAACfBAAwDQ4AAKQJACAUAADbCAAgFgAA3AgAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4AMBAMUGACHhAwIA5AYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeUDAQDGBgAhAgAAAB0AICUAAKIEACAKpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0QMBAMUGACHgAwEAxQYAIeEDAgDkBgAh4gMIAM4GACHjAwgAzgYAIeQDCADOBgAh5QMBAMYGACECAAAAGwAgJQAApAQAIAIAAAAbACAlAACkBAAgAwAAAB0AICwAAJ0EACAtAACiBAAgAQAAAB0AIAEAAAAbACAGDAAAnwkAIDIAAKIJACAzAAChCQAgtAEAAKAJACC1AQAAowkAIOUDAADBBgAgDaQDAADVBQAwpQMAAKsEABCmAwAA1QUAMKcDAQCiBQAhtgNAAKQFACHIA0AApAUAIdEDAQCiBQAh4AMBAKIFACHhAwIAxgUAIeIDCACzBQAh4wMIALMFACHkAwgAswUAIeUDAQCjBQAhAwAAABsAIAEAAKoEADAxAACrBAAgAwAAABsAIAEAABwAMAIAAB0AIA6kAwAA0QUAMKUDAACxBAAQpgMAANEFADCnAwEAAAABtgNAALAFACHIA0AAsAUAIdIDAQAAAAHTAwEArgUAIdQDAQCuBQAh1QMBAK8FACHWAwEArgUAIdcDAADSBQAg2AMgANMFACHZA0AA1AUAIQEAAACuBAAgAQAAAK4EACAOpAMAANEFADClAwAAsQQAEKYDAADRBQAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh0gMBAK4FACHTAwEArgUAIdQDAQCuBQAh1QMBAK8FACHWAwEArgUAIdcDAADSBQAg2AMgANMFACHZA0AA1AUAIQPVAwAAwQYAINcDAADBBgAg2QMAAMEGACADAAAAsQQAIAEAALIEADACAACuBAAgAwAAALEEACABAACyBAAwAgAArgQAIAMAAACxBAAgAQAAsgQAMAIAAK4EACALpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0gMBAMUGACHTAwEAxQYAIdQDAQDFBgAh1QMBAMYGACHWAwEAxQYAIdcDgAAAAAHYAyAA4QYAIdkDQACeCQAhAgAAAK4EACAlAAC2BAAgC6cDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdIDAQDFBgAh0wMBAMUGACHUAwEAxQYAIdUDAQDGBgAh1gMBAMUGACHXA4AAAAAB2AMgAOEGACHZA0AAngkAIQIAAACxBAAgJQAAuAQAIAIAAACxBAAgJQAAuAQAIAEAAACuBAAgAQAAALEEACAGDAAAmwkAIDIAAJ0JACAzAACcCQAg1QMAAMEGACDXAwAAwQYAINkDAADBBgAgDqQDAADIBQAwpQMAAL4EABCmAwAAyAUAMKcDAQCiBQAhtgNAAKQFACHIA0AApAUAIdIDAQCiBQAh0wMBAKIFACHUAwEAogUAIdUDAQCjBQAh1gMBAKIFACHXAwAAyQUAINgDIADKBQAh2QNAAMsFACEDAAAAsQQAIAEAAL0EADAxAAC-BAAgAwAAALEEACABAACyBAAwAgAArgQAIAEAAABAACABAAAAQAAgAwAAAD4AIAEAAD8AMAIAAEAAIAMAAAA-ACABAAA_ADACAABAACADAAAAPgAgAQAAPwAwAgAAQAAgCQMAAM8IACAOAACaCQAgpwMBAAAAAbYDQAAAAAHIA0AAAAABzgMCAAAAAc8DAQAAAAHQAwEAAAAB0QMBAAAAAQElAADGBAAgB6cDAQAAAAG2A0AAAAAByANAAAAAAc4DAgAAAAHPAwEAAAAB0AMBAAAAAdEDAQAAAAEBJQAAyAQAMAElAADIBAAwCQMAAM0IACAOAACZCQAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAhzgMCAOQGACHPAwEAxgYAIdADAQDFBgAh0QMBAMUGACECAAAAQAAgJQAAywQAIAenAwEAxQYAIbYDQADHBgAhyANAAMcGACHOAwIA5AYAIc8DAQDGBgAh0AMBAMUGACHRAwEAxQYAIQIAAAA-ACAlAADNBAAgAgAAAD4AICUAAM0EACADAAAAQAAgLAAAxgQAIC0AAMsEACABAAAAQAAgAQAAAD4AIAYMAACUCQAgMgAAlwkAIDMAAJYJACC0AQAAlQkAILUBAACYCQAgzwMAAMEGACAKpAMAAMUFADClAwAA1AQAEKYDAADFBQAwpwMBAKIFACG2A0AApAUAIcgDQACkBQAhzgMCAMYFACHPAwEAowUAIdADAQCiBQAh0QMBAKIFACEDAAAAPgAgAQAA0wQAMDEAANQEACADAAAAPgAgAQAAPwAwAgAAQAAgB6QDAADEBQAwpQMAANoEABCmAwAAxAUAMKcDAQAAAAG2A0AAsAUAIcwDCAC6BQAhzQMIALoFACEBAAAA1wQAIAEAAADXBAAgB6QDAADEBQAwpQMAANoEABCmAwAAxAUAMKcDAQCuBQAhtgNAALAFACHMAwgAugUAIc0DCAC6BQAhAAMAAADaBAAgAQAA2wQAMAIAANcEACADAAAA2gQAIAEAANsEADACAADXBAAgAwAAANoEACABAADbBAAwAgAA1wQAIASnAwEAAAABtgNAAAAAAcwDCAAAAAHNAwgAAAABASUAAN8EACAEpwMBAAAAAbYDQAAAAAHMAwgAAAABzQMIAAAAAQElAADhBAAwASUAAOEEADAEpwMBAMUGACG2A0AAxwYAIcwDCADOBgAhzQMIAM4GACECAAAA1wQAICUAAOQEACAEpwMBAMUGACG2A0AAxwYAIcwDCADOBgAhzQMIAM4GACECAAAA2gQAICUAAOYEACACAAAA2gQAICUAAOYEACADAAAA1wQAICwAAN8EACAtAADkBAAgAQAAANcEACABAAAA2gQAIAUMAACPCQAgMgAAkgkAIDMAAJEJACC0AQAAkAkAILUBAACTCQAgB6QDAADDBQAwpQMAAO0EABCmAwAAwwUAMKcDAQCiBQAhtgNAAKQFACHMAwgAswUAIc0DCACzBQAhAwAAANoEACABAADsBAAwMQAA7QQAIAMAAADaBAAgAQAA2wQAMAIAANcEACAVBwAAuwUAIAsAALwFACAUAAC9BQAgGQAAvwUAIBoAAMAFACAbAADCBQAgHgAAvgUAIB8AAMEFACCkAwAAuAUAMKUDAAANABCmAwAAuAUAMKcDAQAAAAGqAwEArwUAIasDAQCvBQAhtgNAALAFACHCAwEAAAABwwMBAK8FACHFAwAAuQXFAyLGAwgAugUAIccDAQAAAAHIA0AAsAUAIQEAAADwBAAgAQAAAPAEACALBwAAhwkAIAsAAIgJACAUAACJCQAgGQAAiwkAIBoAAIwJACAbAACOCQAgHgAAigkAIB8AAI0JACCqAwAAwQYAIKsDAADBBgAgwwMAAMEGACADAAAADQAgAQAA8wQAMAIAAPAEACADAAAADQAgAQAA8wQAMAIAAPAEACADAAAADQAgAQAA8wQAMAIAAPAEACASBwAA_wgAIAsAAIAJACAUAACBCQAgGQAAgwkAIBoAAIQJACAbAACGCQAgHgAAggkAIB8AAIUJACCnAwEAAAABqgMBAAAAAasDAQAAAAG2A0AAAAABwgMBAAAAAcMDAQAAAAHFAwAAAMUDAsYDCAAAAAHHAwEAAAAByANAAAAAAQElAAD3BAAgCqcDAQAAAAGqAwEAAAABqwMBAAAAAbYDQAAAAAHCAwEAAAABwwMBAAAAAcUDAAAAxQMCxgMIAAAAAccDAQAAAAHIA0AAAAABASUAAPkEADABJQAA-QQAMBIHAADPBgAgCwAA0AYAIBQAANEGACAZAADTBgAgGgAA1AYAIBsAANYGACAeAADSBgAgHwAA1QYAIKcDAQDFBgAhqgMBAMYGACGrAwEAxgYAIbYDQADHBgAhwgMBAMUGACHDAwEAxgYAIcUDAADNBsUDIsYDCADOBgAhxwMBAMUGACHIA0AAxwYAIQIAAADwBAAgJQAA_AQAIAqnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACECAAAADQAgJQAA_gQAIAIAAAANACAlAAD-BAAgAwAAAPAEACAsAAD3BAAgLQAA_AQAIAEAAADwBAAgAQAAAA0AIAgMAADIBgAgMgAAywYAIDMAAMoGACC0AQAAyQYAILUBAADMBgAgqgMAAMEGACCrAwAAwQYAIMMDAADBBgAgDaQDAACxBQAwpQMAAIUFABCmAwAAsQUAMKcDAQCiBQAhqgMBAKMFACGrAwEAowUAIbYDQACkBQAhwgMBAKIFACHDAwEAowUAIcUDAACyBcUDIsYDCACzBQAhxwMBAKIFACHIA0AApAUAIQMAAAANACABAACEBQAwMQAAhQUAIAMAAAANACABAADzBAAwAgAA8AQAIBOkAwAArQUAMKUDAACLBQAQpgMAAK0FADCnAwEAAAABqAMBAK4FACGpAwEArwUAIaoDAQCuBQAhqwMBAK8FACGsAwEArwUAIa0DAQCvBQAhrgMBAK8FACGvAwEArwUAIbADAQCvBQAhsQMBAK8FACGyAwEArwUAIbMDAQCvBQAhtAMBAK8FACG1AwEArgUAIbYDQACwBQAhAQAAAIgFACABAAAAiAUAIBOkAwAArQUAMKUDAACLBQAQpgMAAK0FADCnAwEArgUAIagDAQCuBQAhqQMBAK8FACGqAwEArgUAIasDAQCvBQAhrAMBAK8FACGtAwEArwUAIa4DAQCvBQAhrwMBAK8FACGwAwEArwUAIbEDAQCvBQAhsgMBAK8FACGzAwEArwUAIbQDAQCvBQAhtQMBAK4FACG2A0AAsAUAIQupAwAAwQYAIKsDAADBBgAgrAMAAMEGACCtAwAAwQYAIK4DAADBBgAgrwMAAMEGACCwAwAAwQYAILEDAADBBgAgsgMAAMEGACCzAwAAwQYAILQDAADBBgAgAwAAAIsFACABAACMBQAwAgAAiAUAIAMAAACLBQAgAQAAjAUAMAIAAIgFACADAAAAiwUAIAEAAIwFADACAACIBQAgEKcDAQAAAAGoAwEAAAABqQMBAAAAAaoDAQAAAAGrAwEAAAABrAMBAAAAAa0DAQAAAAGuAwEAAAABrwMBAAAAAbADAQAAAAGxAwEAAAABsgMBAAAAAbMDAQAAAAG0AwEAAAABtQMBAAAAAbYDQAAAAAEBJQAAkAUAIBCnAwEAAAABqAMBAAAAAakDAQAAAAGqAwEAAAABqwMBAAAAAawDAQAAAAGtAwEAAAABrgMBAAAAAa8DAQAAAAGwAwEAAAABsQMBAAAAAbIDAQAAAAGzAwEAAAABtAMBAAAAAbUDAQAAAAG2A0AAAAABASUAAJIFADABJQAAkgUAMBCnAwEAxQYAIagDAQDFBgAhqQMBAMYGACGqAwEAxQYAIasDAQDGBgAhrAMBAMYGACGtAwEAxgYAIa4DAQDGBgAhrwMBAMYGACGwAwEAxgYAIbEDAQDGBgAhsgMBAMYGACGzAwEAxgYAIbQDAQDGBgAhtQMBAMUGACG2A0AAxwYAIQIAAACIBQAgJQAAlQUAIBCnAwEAxQYAIagDAQDFBgAhqQMBAMYGACGqAwEAxQYAIasDAQDGBgAhrAMBAMYGACGtAwEAxgYAIa4DAQDGBgAhrwMBAMYGACGwAwEAxgYAIbEDAQDGBgAhsgMBAMYGACGzAwEAxgYAIbQDAQDGBgAhtQMBAMUGACG2A0AAxwYAIQIAAACLBQAgJQAAlwUAIAIAAACLBQAgJQAAlwUAIAMAAACIBQAgLAAAkAUAIC0AAJUFACABAAAAiAUAIAEAAACLBQAgDgwAAMIGACAyAADEBgAgMwAAwwYAIKkDAADBBgAgqwMAAMEGACCsAwAAwQYAIK0DAADBBgAgrgMAAMEGACCvAwAAwQYAILADAADBBgAgsQMAAMEGACCyAwAAwQYAILMDAADBBgAgtAMAAMEGACATpAMAAKEFADClAwAAngUAEKYDAAChBQAwpwMBAKIFACGoAwEAogUAIakDAQCjBQAhqgMBAKIFACGrAwEAowUAIawDAQCjBQAhrQMBAKMFACGuAwEAowUAIa8DAQCjBQAhsAMBAKMFACGxAwEAowUAIbIDAQCjBQAhswMBAKMFACG0AwEAowUAIbUDAQCiBQAhtgNAAKQFACEDAAAAiwUAIAEAAJ0FADAxAACeBQAgAwAAAIsFACABAACMBQAwAgAAiAUAIBOkAwAAoQUAMKUDAACeBQAQpgMAAKEFADCnAwEAogUAIagDAQCiBQAhqQMBAKMFACGqAwEAogUAIasDAQCjBQAhrAMBAKMFACGtAwEAowUAIa4DAQCjBQAhrwMBAKMFACGwAwEAowUAIbEDAQCjBQAhsgMBAKMFACGzAwEAowUAIbQDAQCjBQAhtQMBAKIFACG2A0AApAUAIQ4MAACmBQAgMgAArAUAIDMAAKwFACC3AwEAAAABuAMBAAAABLkDAQAAAAS6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMBAKsFACG_AwEAAAABwAMBAAAAAcEDAQAAAAEODAAAqQUAIDIAAKoFACAzAACqBQAgtwMBAAAAAbgDAQAAAAW5AwEAAAAFugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DAQCoBQAhvwMBAAAAAcADAQAAAAHBAwEAAAABCwwAAKYFACAyAACnBQAgMwAApwUAILcDQAAAAAG4A0AAAAAEuQNAAAAABLoDQAAAAAG7A0AAAAABvANAAAAAAb0DQAAAAAG-A0AApQUAIQsMAACmBQAgMgAApwUAIDMAAKcFACC3A0AAAAABuANAAAAABLkDQAAAAAS6A0AAAAABuwNAAAAAAbwDQAAAAAG9A0AAAAABvgNAAKUFACEItwMCAAAAAbgDAgAAAAS5AwIAAAAEugMCAAAAAbsDAgAAAAG8AwIAAAABvQMCAAAAAb4DAgCmBQAhCLcDQAAAAAG4A0AAAAAEuQNAAAAABLoDQAAAAAG7A0AAAAABvANAAAAAAb0DQAAAAAG-A0AApwUAIQ4MAACpBQAgMgAAqgUAIDMAAKoFACC3AwEAAAABuAMBAAAABbkDAQAAAAW6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMBAKgFACG_AwEAAAABwAMBAAAAAcEDAQAAAAEItwMCAAAAAbgDAgAAAAW5AwIAAAAFugMCAAAAAbsDAgAAAAG8AwIAAAABvQMCAAAAAb4DAgCpBQAhC7cDAQAAAAG4AwEAAAAFuQMBAAAABboDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwEAqgUAIb8DAQAAAAHAAwEAAAABwQMBAAAAAQ4MAACmBQAgMgAArAUAIDMAAKwFACC3AwEAAAABuAMBAAAABLkDAQAAAAS6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMBAKsFACG_AwEAAAABwAMBAAAAAcEDAQAAAAELtwMBAAAAAbgDAQAAAAS5AwEAAAAEugMBAAAAAbsDAQAAAAG8AwEAAAABvQMBAAAAAb4DAQCsBQAhvwMBAAAAAcADAQAAAAHBAwEAAAABE6QDAACtBQAwpQMAAIsFABCmAwAArQUAMKcDAQCuBQAhqAMBAK4FACGpAwEArwUAIaoDAQCuBQAhqwMBAK8FACGsAwEArwUAIa0DAQCvBQAhrgMBAK8FACGvAwEArwUAIbADAQCvBQAhsQMBAK8FACGyAwEArwUAIbMDAQCvBQAhtAMBAK8FACG1AwEArgUAIbYDQACwBQAhC7cDAQAAAAG4AwEAAAAEuQMBAAAABLoDAQAAAAG7AwEAAAABvAMBAAAAAb0DAQAAAAG-AwEArAUAIb8DAQAAAAHAAwEAAAABwQMBAAAAAQu3AwEAAAABuAMBAAAABbkDAQAAAAW6AwEAAAABuwMBAAAAAbwDAQAAAAG9AwEAAAABvgMBAKoFACG_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-AMBAKMFACH5AwEAogUAIfoDCACzBQAh-wMBAKMFACENpAMAAOIFADClAwAA6QMAEKYDAADiBQAwpwMBAKIFACHFAwAA4wX_AyLRAwEAogUAIeEDAgDGBQAh8wMBAKIFACH4AwEAowUAIfoDCACzBQAh_AMIALMFACH9AwgAswUAIf8DAQCiBQAhBwwAAKYFACAyAADlBQAgMwAA5QUAILcDAAAA_wMCuAMAAAD_Awi5AwAAAP8DCL4DAADkBf8DIgcMAACmBQAgMgAA5QUAIDMAAOUFACC3AwAAAP8DArgDAAAA_wMIuQMAAAD_Awi-AwAA5AX_AyIEtwMAAAD_AwK4AwAAAP8DCLkDAAAA_wMIvgMAAOUF_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-wUAMKUDAABtABCmAwAA-wUAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdADAQCuBQAhA8kDAAA1ACDKAwAANQAgywMAADUAIAmkAwAA_QUAMKUDAACSAgAQpgMAAP0FADCnAwEAogUAIbYDQACkBQAhyANAAKQFACGpBAEAogUAIaoEAQCiBQAhqwRAAKQFACEJpAMAAP4FADClAwAA_wEAEKYDAAD-BQAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAhqQQBAK4FACGqBAEArgUAIasEQACwBQAhEKQDAAD_BQAwpQMAAPkBABCmAwAA_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_AUAIBcAAL0GACAYAACQBgAgGQAAmAYAIBoAAMAFACAbAADCBQAgHgAA0gUAIKQDAAC4BgAwpQMAAA8AEKYDAAC4BgAwpwMBAK4FACGqAwEArgUAIbYDQACwBQAhwgMBAK4FACHFAwAAuQbrAyLIA0AAsAUAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeYDAQCuBQAh5wMBAK4FACHoAwAA1wUAIOkDAgCgBgAh7AMAALoG7AMi7QMAANcFACDvAwAAuwbvAyLwAwgAugUAIfEDIADTBQAh8gMgANMFACHzAwEArgUAIfQDAQCuBQAhxQQAAA8AIMYEAAAPACAQCAAAlwYAIA4AAKEGACCkAwAAogYAMKUDAABFABCmAwAAogYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK8FACHhAwIAoAYAIfMDAQCuBQAh-AMBAK8FACH5AwEArgUAIfoDCAC6BQAh-wMBAK8FACEC0AMBAAAAAdEDAQAAAAEMAwAAuwUAIA4AAKEGACCkAwAApAYAMKUDAAA-ABCmAwAApAYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIc4DAgCgBgAhzwMBAK8FACHQAwEArgUAIdEDAQCuBQAhA9EDAQAAAAH4AwEAAAABqAQBAAAAAQ0OAAChBgAgEwAAqAYAIBUAAKcGACCkAwAApgYAMKUDAAA1ABCmAwAApgYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4QMCAKAGACH4AwEArwUAIagEAQCuBQAhCwMAALsFACAPAAD8BQAgpAMAAPsFADClAwAAbQAQpgMAAPsFADCnAwEArgUAIbYDQACwBQAhyANAALAFACHQAwEArgUAIcUEAABtACDGBAAAbQAgEg4AAKEGACAUAAC9BQAgFgAA_AUAIKQDAAC0BgAwpQMAABsAEKYDAAC0BgAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh0QMBAK4FACHgAwEArgUAIeEDAgCgBgAh4gMIALoFACHjAwgAugUAIeQDCAC6BQAh5QMBAK8FACHFBAAAGwAgxgQAABsAIBkDAACtBgAgCAAAjgYAIA8AAL0FACAQAACuBgAgpAMAAKkGADClAwAALQAQpgMAAKkGADCnAwEArgUAIawDAQCvBQAhrgMBAK8FACG2A0AAsAUAIcgDQACwBQAh0AMBAK8FACHzAwEArwUAIYEEAACqBoEEIoIECAC6BQAhhAQAAKsGhAQihQQBAK8FACGGBAAArAb_AyKHBAEArwUAIYgEAQCvBQAhiQQBAK8FACGKBAgAugUAIYsECAC6BQAhjAQBAK8FACEEtwMAAACBBAK4AwAAAIEECLkDAAAAgQQIvgMAAOwFgQQiBLcDAAAAhAQCuAMAAACEBAi5AwAAAIQECL4DAADqBYQEIgS3AwAAAP8DArgDAAAA_wMIuQMAAAD_Awi-AwAA5QX_AyIYBAAAiwYAIAUAAIwGACAGAACNBgAgCAAAjgYAIBEAAMEFACAVAACPBgAgGAAAkAYAIKQDAACIBgAwpQMAACMAEKYDAACIBgAwpwMBAK4FACGtAwEArgUAIbYDQACwBQAhwgMBAK4FACHFAwAAiga8BCLIA0AAsAUAIdgDIADTBQAh2QNAANQFACHlAwEArwUAIbgEIADTBQAhugQAAIkGugQivAQgANMFACHFBAAAIwAgxgQAACMAIBQIAACXBgAgCwAAmAYAIBEAAMEFACCkAwAAlAYAMKUDAAAnABCmAwAAlAYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIfMDAQCuBQAhigQIALoFACGNBCAA0wUAIZ8EAQCuBQAhoQQAAJUGoQQiogQIAJYGACGjBAgAugUAIaQEQACwBQAhpQRAALAFACHFBAAAJwAgxgQAACcAIALRAwEAAAABjAQBAAAAAQgOAAChBgAgEAAAsQYAIKQDAACwBgAwpQMAACkAEKYDAACwBgAwpwMBAK4FACHRAwEArgUAIYwEAQCuBQAhFAgAAJcGACALAACYBgAgEQAAwQUAIKQDAACUBgAwpQMAACcAEKYDAACUBgAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh8wMBAK4FACGKBAgAugUAIY0EIADTBQAhnwQBAK4FACGhBAAAlQahBCKiBAgAlgYAIaMECAC6BQAhpARAALAFACGlBEAAsAUAIcUEAAAnACDGBAAAJwAgEQgAAJcGACAOAAChBgAgEgAAswYAIBMAAKgGACCkAwAAsgYAMKUDAAAfABCmAwAAsgYAMKcDAQCuBQAhxQMAAKwG_wMi0QMBAK4FACHhAwIAoAYAIfMDAQCuBQAh-AMBAK8FACH6AwgAugUAIfwDCAC6BQAh_QMIALoFACH_AwEArgUAIRsDAACtBgAgCAAAjgYAIA8AAL0FACAQAACuBgAgpAMAAKkGADClAwAALQAQpgMAAKkGADCnAwEArgUAIawDAQCvBQAhrgMBAK8FACG2A0AAsAUAIcgDQACwBQAh0AMBAK8FACHzAwEArwUAIYEEAACqBoEEIoIECAC6BQAhhAQAAKsGhAQihQQBAK8FACGGBAAArAb_AyKHBAEArwUAIYgEAQCvBQAhiQQBAK8FACGKBAgAugUAIYsECAC6BQAhjAQBAK8FACHFBAAALQAgxgQAAC0AIBAOAAChBgAgFAAAvQUAIBYAAPwFACCkAwAAtAYAMKUDAAAbABCmAwAAtAYAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK4FACHhAwIAoAYAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeUDAQCvBQAhDwkAALYGACAKAAC3BgAgCwAAvAUAIKQDAAC1BgAwpQMAABMAEKYDAAC1BgAwpwMBAK4FACG2A0AAsAUAIcIDAQCuBQAhyANAALAFACHlAwEArwUAIeYDAQCuBQAhjQQgANMFACGmBAEArwUAIacEAQCvBQAhEQkAALYGACAKAAC3BgAgCwAAvAUAIKQDAAC1BgAwpQMAABMAEKYDAAC1BgAwpwMBAK4FACG2A0AAsAUAIcIDAQCuBQAhyANAALAFACHlAwEArwUAIeYDAQCuBQAhjQQgANMFACGmBAEArwUAIacEAQCvBQAhxQQAABMAIMYEAAATACADyQMAABMAIMoDAAATACDLAwAAEwAgIggAAJcGACANAAC8BgAgFAAAvQUAIBYAAPwFACAXAAC9BgAgGAAAkAYAIBkAAJgGACAaAADABQAgGwAAwgUAIB4AANIFACCkAwAAuAYAMKUDAAAPABCmAwAAuAYAMKcDAQCuBQAhqgMBAK4FACG2A0AAsAUAIcIDAQCuBQAhxQMAALkG6wMiyANAALAFACHiAwgAugUAIeMDCAC6BQAh5AMIALoFACHmAwEArgUAIecDAQCuBQAh6AMAANcFACDpAwIAoAYAIewDAAC6BuwDIu0DAADXBQAg7wMAALsG7wMi8AMIALoFACHxAyAA0wUAIfIDIADTBQAh8wMBAK4FACH0AwEArgUAIQS3AwAAAOsDArgDAAAA6wMIuQMAAADrAwi-AwAA4AXrAyIEtwMAAADsAwK4AwAAAOwDCLkDAAAA7AMIvgMAAN4F7AMiBLcDAAAA7wMCuAMAAADvAwi5AwAAAO8DCL4DAADcBe8DIhEJAAC2BgAgCgAAtwYAIAsAALwFACCkAwAAtQYAMKUDAAATABCmAwAAtQYAMKcDAQCuBQAhtgNAALAFACHCAwEArgUAIcgDQACwBQAh5QMBAK8FACHmAwEArgUAIY0EIADTBQAhpgQBAK8FACGnBAEArwUAIcUEAAATACDGBAAAEwAgA8kDAAAbACDKAwAAGwAgywMAABsAIA4DAAC7BQAgpAMAAL4GADClAwAACwAQpgMAAL4GADCnAwEArgUAIa0DAQCuBQAhtgNAALAFACHCAwEArgUAIcgDQACwBQAh0AMBAK4FACHYAyAA0wUAIdkDQADUBQAhvgQBAK8FACG_BAEArwUAIREDAAC7BQAgpAMAAL8GADClAwAABwAQpgMAAL8GADCnAwEArgUAIbYDQACwBQAhyANAALAFACHQAwEArgUAIawEAQCuBQAhrQQBAK4FACGuBAEArwUAIa8EAQCvBQAhsAQBAK8FACGxBEAA1AUAIbIEQADUBQAhswQBAK8FACG0BAEArwUAIQwDAAC7BQAgpAMAAMAGADClAwAAAwAQpgMAAMAGADCnAwEArgUAIbYDQACwBQAhyANAALAFACHQAwEArgUAIasEQACwBQAhtQQBAK4FACG2BAEArwUAIbcEAQCvBQAhAAAAAAHKBAEAAAABAcoEAQAAAAEBygRAAAAAAQAAAAAAAcoEAAAAxQMCBcoECAAAAAHRBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAABBSwAALgLACAtAACpDAAgxwQAALkLACDIBAAAqAwAIM0EAAC4AQAgCywAAPAHADAtAAD1BwAwxwQAAPEHADDIBAAA8gcAMMkEAADzBwAgygQAAPQHADDLBAAA9AcAMMwEAAD0BwAwzQQAAPQHADDOBAAA9gcAMM8EAAD3BwAwCywAAOUHADAtAADpBwAwxwQAAOYHADDIBAAA5wcAMMkEAADoBwAgygQAAIAHADDLBAAAgAcAMMwEAACABwAwzQQAAIAHADDOBAAA6gcAMM8EAACDBwAwCywAAMsHADAtAADQBwAwxwQAAMwHADDIBAAAzQcAMMkEAADOBwAgygQAAM8HADDLBAAAzwcAMMwEAADPBwAwzQQAAM8HADDOBAAA0QcAMM8EAADSBwAwCywAAKAHADAtAAClBwAwxwQAAKEHADDIBAAAogcAMMkEAACjBwAgygQAAKQHADDLBAAApAcAMMwEAACkBwAwzQQAAKQHADDOBAAApgcAMM8EAACnBwAwCywAAJIHADAtAACXBwAwxwQAAJMHADDIBAAAlAcAMMkEAACVBwAgygQAAJYHADDLBAAAlgcAMMwEAACWBwAwzQQAAJYHADDOBAAAmAcAMM8EAACZBwAwCywAAOsGADAtAADwBgAwxwQAAOwGADDIBAAA7QYAMMkEAADuBgAgygQAAO8GADDLBAAA7wYAMMwEAADvBgAwzQQAAO8GADDOBAAA8QYAMM8EAADyBgAwCywAANcGADAtAADcBgAwxwQAANgGADDI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_AwKHBAEAAAABiAQBAAAAAYkEAQAAAAGKBAgAAAABiwQIAAAAAYwEAQAAAAECAAAALwAgLAAAjgcAIAMAAAAvACAsAACOBwAgLQAA-AYAIAElAAChDAAwGQMAAK0GACAIAACOBgAgDwAAvQUAIBAAAK4GACCkAwAAqQYAMKUDAAAtABCmAwAAqQYAMKcDAQAAAAGsAwEArwUAIa4DAQCvBQAhtgNAALAFACHIA0AAsAUAIdADAQCvBQAh8wMBAK8FACGBBAAAqgaBBCKCBAgAugUAIYQEAACrBoQEIoUEAQCvBQAhhgQAAKwG_wMihwQBAK8FACGIBAEArwUAIYkEAQCvBQAhigQIALoFACGLBAgAugUAIYwEAQCvBQAhAgAAAC8AICUAAPgGACACAAAA8wYAICUAAPQGACAVpAMAAPIGADClAwAA8wYAEKYDAADyBgAwpwMBAK4FACGsAwEArwUAIa4DAQCvBQAhtgNAALAFACHIA0AAsAUAIdADAQCvBQAh8wMBAK8FACGBBAAAqgaBBCKCBAgAugUAIYQEAACrBoQEIoUEAQCvBQAhhgQAAKwG_wMihwQBAK8FACGIBAEArwUAIYkEAQCvBQAhigQIALoFACGLBAgAugUAIYwEAQCvBQAhFaQDAADyBgAwpQMAAPMGABCmAwAA8gYAMKcDAQCuBQAhrAMBAK8FACGuAwEArwUAIbYDQACwBQAhyANAALAFACHQAwEArwUAIfMDAQCvBQAhgQQAAKoGgQQiggQIALoFACGEBAAAqwaEBCKFBAEArwUAIYYEAACsBv8DIocEAQCvBQAhiAQBAK8FACGJBAEArwUAIYoECAC6BQAhiwQIALoFACGMBAEArwUAIRGnAwEAxQYAIawDAQDGBgAhrgMBAMYGACG2A0AAxwYAIcgDQADHBgAh0AMBAMYGACGBBAAA9QaBBCKCBAgAzgYAIYQEAAD2BoQEIoUEAQDGBgAhhgQAAPcG_wMihwQBAMYGACGIBAEAxgYAIYkEAQDGBgAhigQIAM4GACGLBAgAzgYAIYwEAQDGBgAhAcoEAAAAgQQCAcoEAAAAhAQCAcoEAAAA_wMCFAMAAPkGACAPAAD6BgAgEAAA-wYAIKcDAQDFBgAhrAMBAMYGACGuAwEAxgYAIbYDQADHBgAhyANAAMcGACHQAwEAxgYAIYEEAAD1BoEEIoIECADOBgAhhAQAAPYGhAQihQQBAMYGACGGBAAA9wb_AyKHBAEAxgYAIYgEAQDGBgAhiQQBAMYGACGKBAgAzgYAIYsECADOBgAhjAQBAMYGACEHLAAAiQwAIC0AAJ8MACDHBAAAigwAIMgEAACeDAAgywQAACMAIMwEAAAjACDNBAAAuAEAIAssAAD8BgAwLQAAgQcAMMcEAAD9BgAwyAQAAP4GADDJBAAA_wYAIMoEAACABwAwywQAAIAHADDMBAAAgAcAMM0EAACABwAwzgQAAIIHADDPBAAAgwcAMAcsAACHDAAgLQAAnAwAIMcEAACIDAAgyAQAAJsMACDLBAAAJwAgzAQAACcAIM0EAABgACAMCAAAjQcAIA4AAIsHACATAACMBwAgpwMBAAAAAcUDAAAA_wMC0QMBAAAAAeEDAgAAAAHzAwEAAAAB-AMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAQIAAAAhACAsAACKBwAgAwAAACEAICwAAIoHACAtAACGBwAgASUAAJoMADARCAAAlwYAIA4AAKEGACASAACzBgAgEwAAqAYAIKQDAACyBgAwpQMAAB8AEKYDAACyBgAwpwMBAAAAAcUDAACsBv8DItEDAQCuBQAh4QMCAKAGACHzAwEArgUAIfgDAQCvBQAh-gMIALoFACH8AwgAugUAIf0DCAC6BQAh_wMBAK4FACECAAAAIQAgJQAAhgcAIAIAAACEBwAgJQAAhQcAIA2kAwAAgwcAMKUDAACEBwAQpgMAAIMHADCnAwEArgUAIcUDAACsBv8DItEDAQCuBQAh4QMCAKAGACHzAwEArgUAIfgDAQCvBQAh-gMIALoFACH8AwgAugUAIf0DCAC6BQAh_wMBAK4FACENpAMAAIMHADClAwAAhAcAEKYDAACDBwAwpwMBAK4FACHFAwAArAb_AyLRAwEArgUAIeEDAgCgBgAh8wMBAK4FACH4AwEArwUAIfoDCAC6BQAh_AMIALoFACH9AwgAugUAIf8DAQCuBQAhCacDAQDFBgAhxQMAAPcG_wMi0QMBAMUGACHhAwIA5AYAIfMDAQDFBgAh-AMBAMYGACH6AwgAzgYAIfwDCADOBgAh_QMIAM4GACEMCAAAiQcAIA4AAIcHACATAACIBwAgpwMBAMUGACHFAwAA9wb_AyLRAwEAxQYAIeEDAgDkBgAh8wMBAMUGACH4AwEAxgYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIQUsAACPDAAgLQAAmAwAIMcEAACQDAAgyAQAAJcMACDNBAAAEQAgBywAAI0MACAtAACVDAAgxwQAAI4MACDIBAAAlAwAIMsEAAAbACDMBAAAGwAgzQQAAB0AIAUsAACLDAAgLQAAkgwAIMcEAACMDAAgyAQAAJEMACDNBAAA8AQAIAwIAACNBwAgDgAAiwcAIBMAAIwHACCnAwEAAAABxQMAAAD_AwLRAwEAAAAB4QMCAAAAAfMDAQAAAAH4AwEAAAAB-gMIAAAAAfwDCAAAAAH9AwgAAAABAywAAI8MACDHBAAAkAwAIM0EAAARACADLAAAjQwAIMcEAACODAAgzQQAAB0AIAMsAACLDAAgxwQAAIwMACDNBAAA8AQAIBQDAACPBwAgDwAAkAcAIBAAAJEHACCnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAdADAQAAAAGBBAAAAIEEAoIECAAAAAGEBAAAAIQEAoUEAQAAAAGGBAAAAP8DAocEAQAAAAGIBAEAAAABiQQBAAAAAYoECAAAAAGLBAgAAAABjAQBAAAAAQMsAACJDAAgxwQAAIoMACDNBAAAuAEAIAQsAAD8BgAwxwQAAP0GADDJBAAA_wYAIM0EAACABwAwAywAAIcMACDHBAAAiAwAIM0EAABgACALDgAAnwcAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHgAwEAAAAB4QMCAAAAAfgDAQAAAAH5AwEAAAAB-gMIAAAAAfsDAQAAAAECAAAARwAgLAAAngcAIAMAAABHACAsAACeBwAgLQAAnAcAIAElAACGDAAwEAgAAJcGACAOAAChBgAgpAMAAKIGADClAwAARQAQpgMAAKIGADCnAwEAAAABtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK8FACHhAwIAoAYAIfMDAQCuBQAh-AMBAK8FACH5AwEArgUAIfoDCAC6BQAh-wMBAK8FACECAAAARwAgJQAAnAcAIAIAAACaBwAgJQAAmwcAIA6kAwAAmQcAMKUDAACaBwAQpgMAAJkHADCnAwEArgUAIbYDQACwBQAhyANAALAFACHRAwEArgUAIeADAQCvBQAh4QMCAKAGACHzAwEArgUAIfgDAQCvBQAh-QMBAK4FACH6AwgAugUAIfsDAQCvBQAhDqQDAACZBwAwpQMAAJoHABCmAwAAmQcAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK8FACHhAwIAoAYAIfMDAQCuBQAh-AMBAK8FACH5AwEArgUAIfoDCAC6BQAh-wMBAK8FACEKpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0QMBAMUGACHgAwEAxgYAIeEDAgDkBgAh-AMBAMYGACH5AwEAxQYAIfoDCADOBgAh-wMBAMYGACELDgAAnQcAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4AMBAMYGACHhAwIA5AYAIfgDAQDGBgAh-QMBAMUGACH6AwgAzgYAIfsDAQDGBgAhBSwAAIEMACAtAACEDAAgxwQAAIIMACDIBAAAgwwAIM0EAAARACALDgAAnwcAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHgAwEAAAAB4QMCAAAAAfgDAQAAAAH5AwEAAAAB-gMIAAAAAfsDAQAAAAEDLAAAgQwAIMcEAACCDAAgzQQAABEAIA0LAADJBwAgEQAAygcAIKcDAQAAAAG2A0AAAAAByANAAAAAAYoECAAAAAGNBCAAAAABnwQBAAAAAaEEAAAAoQQCogQIAAAAAaMECAAAAAGkBEAAAAABpQRAAAAAAQIAAABgACAsAADIBwAgAwAAAGAAICwAAMgHACAtAACsBwAgASUAAIAMADASCAAAlwYAIAsAAJgGACARAADBBQAgpAMAAJQGADClAwAAJwAQpgMAAJQGADCnAwEAAAABtgNAALAFACHIA0AAsAUAIfMDAQCuBQAhigQIALoFACGNBCAA0wUAIZ8EAQAAAAGhBAAAlQahBCKiBAgAlgYAIaMECAC6BQAhpARAALAFACGlBEAAsAUAIQIAAABgACAlAACsBwAgAgAAAKgHACAlAACpBwAgD6QDAACnBwAwpQMAAKgHABCmAwAApwcAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIfMDAQCuBQAhigQIALoFACGNBCAA0wUAIZ8EAQCuBQAhoQQAAJUGoQQiogQIAJYGACGjBAgAugUAIaQEQACwBQAhpQRAALAFACEPpAMAAKcHADClAwAAqAcAEKYDAACnBwAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh8wMBAK4FACGKBAgAugUAIY0EIADTBQAhnwQBAK4FACGhBAAAlQahBCKiBAgAlgYAIaMECAC6BQAhpARAALAFACGlBEAAsAUAIQunAwEAxQYAIbYDQADHBgAhyANAAMcGACGKBAgAzgYAIY0EIADhBgAhnwQBAMUGACGhBAAAqgehBCKiBAgAqwcAIaMECADOBgAhpARAAMcGACGlBEAAxwYAIQHKBAAAAKEEAgXKBAgAAAAB0QQIAAAAAdIECAAAAAHTBAgAAAAB1AQIAAAAAQ0LAACtBwAgEQAArgcAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIYoECADOBgAhjQQgAOEGACGfBAEAxQYAIaEEAACqB6EEIqIECACrBwAhowQIAM4GACGkBEAAxwYAIaUEQADHBgAhCywAALoHADAtAAC_BwAwxwQAALsHADDIBAAAvAcAMMkEAAC9BwAgygQAAL4HADDLBAAAvgcAMMwEAAC-BwAwzQQAAL4HADDOBAAAwAcAMM8EAADBBwAwCywAAK8HADAtAACzBwAwxwQAALAHADDIBAAAsQcAMMkEAACyBwAgygQAAO8GADDLBAAA7wYAMMwEAADvBgAwzQQAAO8GADDOBAAAtAcAMM8EAADyBgAwFAMAAI8HACAIAAC5BwAgDwAAkAcAIKcDAQAAAAGsAwEAAAABrgMBAAAAAbYDQAAAAAHIA0AAAAAB0AMBAAAAAfMDAQAAAAGBBAAAAIEEAoIECAAAAAGEBAAAAIQEAoUEAQAAAAGGBAAAAP8DAocEAQAAAAGIBAEAAAABiQQBAAAAAYoECAAAAAGLBAgAAAABAgAAAC8AICwAALgHACADAAAALwAgLAAAuAcAIC0AALYHACABJQAA_wsAMAIAAAAvACAlAAC2BwAgAgAAAPMGACAlAAC1BwAgEacDAQDFBgAhrAMBAMYGACGuAwEAxgYAIbYDQADHBgAhyANAAMcGACHQAwEAxgYAIfMDAQDGBgAhgQQAAPUGgQQiggQIAM4GACGEBAAA9gaEBCKFBAEAxgYAIYYEAAD3Bv8DIocEAQDGBgAhiAQBAMYGACGJBAEAxgYAIYoECADOBgAhiwQIAM4GACEUAwAA-QYAIAgAALcHACAPAAD6BgAgpwMBAMUGACGsAwEAxgYAIa4DAQDGBgAhtgNAAMcGACHIA0AAxwYAIdADAQDGBgAh8wMBAMYGACGBBAAA9QaBBCKCBAgAzgYAIYQEAAD2BoQEIoUEAQDGBgAhhgQAAPcG_wMihwQBAMYGACGIBAEAxgYAIYkEAQDGBgAhigQIAM4GACGLBAgAzgYAIQcsAAD6CwAgLQAA_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-AMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAECAAAAIQAgLAAA7gcAIAMAAAAhACAsAADuBwAgLQAA7AcAIAElAADxCwAwAgAAACEAICUAAOwHACACAAAAhAcAICUAAOsHACAJpwMBAMUGACHFAwAA9wb_AyLRAwEAxQYAIeEDAgDkBgAh-AMBAMYGACH6AwgAzgYAIfwDCADOBgAh_QMIAM4GACH_AwEAxQYAIQwOAACHBwAgEgAA7QcAIBMAAIgHACCnAwEAxQYAIcUDAAD3Bv8DItEDAQDFBgAh4QMCAOQGACH4AwEAxgYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIf8DAQDFBgAhBSwAAOwLACAtAADvCwAgxwQAAO0LACDIBAAA7gsAIM0EAAAvACAMDgAAiwcAIBIAAO8HACATAACMBwAgpwMBAAAAAcUDAAAA_wMC0QMBAAAAAeEDAgAAAAH4AwEAAAAB-gMIAAAAAfwDCAAAAAH9AwgAAAAB_wMBAAAAAQMsAADsCwAgxwQAAO0LACDNBAAALwAgHQ0AAPcIACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGQAA_AgAIBoAAP0IACAbAAD-CAAgHoAAAAABpwMBAAAAAaoDAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAA6wMCyANAAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeYDAQAAAAHnAwEAAAAB6AMAAPUIACDpAwIAAAAB7AMAAADsAwLtAwAA9ggAIO8DAAAA7wMC8AMIAAAAAfEDIAAAAAHyAyAAAAAB9AMBAAAAAQIAAAARACAsAAD0CAAgAwAAABEAICwAAPQIACAtAAD_BwAgASUAAOsLADAiCAAAlwYAIA0AALwGACAUAAC9BQAgFgAA_AUAIBcAAL0GACAYAACQBgAgGQAAmAYAIBoAAMAFACAbAADCBQAgHgAA0gUAIKQDAAC4BgAwpQMAAA8AEKYDAAC4BgAwpwMBAAAAAaoDAQCuBQAhtgNAALAFACHCAwEArgUAIcUDAAC5BusDIsgDQACwBQAh4gMIALoFACHjAwgAugUAIeQDCAC6BQAh5gMBAAAAAecDAQCuBQAh6AMAANcFACDpAwIAoAYAIewDAAC6BuwDIu0DAADXBQAg7wMAALsG7wMi8AMIALoFACHxAyAA0wUAIfIDIADTBQAh8wMBAK4FACH0AwEArgUAIQIAAAARACAlAAD_BwAgAgAAAPgHACAlAAD5BwAgGR4AANIFACCkAwAA9wcAMKUDAAD4BwAQpgMAAPcHADCnAwEArgUAIaoDAQCuBQAhtgNAALAFACHCAwEArgUAIcUDAAC5BusDIsgDQACwBQAh4gMIALoFACHjAwgAugUAIeQDCAC6BQAh5gMBAK4FACHnAwEArgUAIegDAADXBQAg6QMCAKAGACHsAwAAugbsAyLtAwAA1wUAIO8DAAC7Bu8DIvADCAC6BQAh8QMgANMFACHyAyAA0wUAIfMDAQCuBQAh9AMBAK4FACEZHgAA0gUAIKQDAAD3BwAwpQMAAPgHABCmAwAA9wcAMKcDAQCuBQAhqgMBAK4FACG2A0AAsAUAIcIDAQCuBQAhxQMAALkG6wMiyANAALAFACHiAwgAugUAIeMDCAC6BQAh5AMIALoFACHmAwEArgUAIecDAQCuBQAh6AMAANcFACDpAwIAoAYAIewDAAC6BuwDIu0DAADXBQAg7wMAALsG7wMi8AMIALoFACHxAyAA0wUAIfIDIADTBQAh8wMBAK4FACH0AwEArgUAIRUegAAAAAGnAwEAxQYAIaoDAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAAD7B-sDIsgDQADHBgAh4gMIAM4GACHjAwgAzgYAIeQDCADOBgAh5gMBAMUGACHnAwEAxQYAIegDAAD6BwAg6QMCAOQGACHsAwAA_AfsAyLtAwAA_QcAIO8DAAD-B-8DIvADCADOBgAh8QMgAOEGACHyAyAA4QYAIfQDAQDFBgAhAsoEAQAAAATQBAEAAAAFAcoEAAAA6wMCAcoEAAAA7AMCAsoEAQAAAATQBAEAAAAFAcoEAAAA7wMCHQ0AAIAIACAUAACDCAAgFgAAhAgAIBcAAIEIACAYAACCCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_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-AMBAMYGACH5AwEAxQYAIfoDCADOBgAh-wMBAMYGACELCAAAmwgAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIeADAQDGBgAh4QMCAOQGACHzAwEAxQYAIfgDAQDGBgAh-QMBAMUGACH6AwgAzgYAIfsDAQDGBgAhBSwAANwLACAtAADfCwAgxwQAAN0LACDIBAAA3gsAIM0EAADwBAAgCwgAAJ0IACCnAwEAAAABtgNAAAAAAcgDQAAAAAHgAwEAAAAB4QMCAAAAAfMDAQAAAAH4AwEAAAAB-QMBAAAAAfoDCAAAAAH7AwEAAAABAywAANwLACDHBAAA3QsAIM0EAADwBAAgAxAAAKgIACCnAwEAAAABjAQBAAAAAQIAAAArACAsAACnCAAgAwAAACsAICwAAKcIACAtAAClCAAgASUAANsLADACAAAAKwAgJQAApQgAIAIAAADCBwAgJQAApAgAIAKnAwEAxQYAIYwEAQDFBgAhAxAAAKYIACCnAwEAxQYAIYwEAQDFBgAhBSwAANYLACAtAADZCwAgxwQAANcLACDIBAAA2AsAIM0EAABgACADEAAAqAgAIKcDAQAAAAGMBAEAAAABAywAANYLACDHBAAA1wsAIM0EAABgACAIEwAAuAgAIBUAALcIACCnAwEAAAABtgNAAAAAAcgDQAAAAAHhAwIAAAAB-AMBAAAAAagEAQAAAAECAAAANwAgLAAAtggAIAMAAAA3ACAsAAC2CAAgLQAAswgAIAElAADVCwAwDg4AAKEGACATAACoBgAgFQAApwYAIKQDAACmBgAwpQMAADUAEKYDAACmBgAwpwMBAAAAAbYDQACwBQAhyANAALAFACHRAwEArgUAIeEDAgCgBgAh-AMBAK8FACGoBAEArgUAIcMEAAClBgAgAgAAADcAICUAALMIACACAAAAsQgAICUAALIIACAKpAMAALAIADClAwAAsQgAEKYDAACwCAAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh0QMBAK4FACHhAwIAoAYAIfgDAQCvBQAhqAQBAK4FACEKpAMAALAIADClAwAAsQgAEKYDAACwCAAwpwMBAK4FACG2A0AAsAUAIcgDQACwBQAh0QMBAK4FACHhAwIAoAYAIfgDAQCvBQAhqAQBAK4FACEGpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh4QMCAOQGACH4AwEAxgYAIagEAQDFBgAhCBMAALUIACAVAAC0CAAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh4QMCAOQGACH4AwEAxgYAIagEAQDFBgAhBSwAAM0LACAtAADTCwAgxwQAAM4LACDIBAAA0gsAIM0EAACVAgAgBywAAMsLACAtAADQCwAgxwQAAMwLACDIBAAAzwsAIMsEAAAbACDMBAAAGwAgzQQAAB0AIAgTAAC4CAAgFQAAtwgAIKcDAQAAAAG2A0AAAAAByANAAAAAAeEDAgAAAAH4AwEAAAABqAQBAAAAAQMsAADNCwAgxwQAAM4LACDNBAAAlQIAIAMsAADLCwAgxwQAAMwLACDNBAAAHQAgDAgAAI0HACASAADvBwAgEwAAjAcAIKcDAQAAAAHFAwAAAP8DAuEDAgAAAAHzAwEAAAAB-AMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAECAAAAIQAgLAAAwQgAIAMAAAAhACAsAADBCAAgLQAAwAgAIAElAADKCwAwAgAAACEAICUAAMAIACACAAAAhAcAICUAAL8IACAJpwMBAMUGACHFAwAA9wb_AyLhAwIA5AYAIfMDAQDFBgAh-AMBAMYGACH6AwgAzgYAIfwDCADOBgAh_QMIAM4GACH_AwEAxQYAIQwIAACJBwAgEgAA7QcAIBMAAIgHACCnAwEAxQYAIcUDAAD3Bv8DIuEDAgDkBgAh8wMBAMUGACH4AwEAxgYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIf8DAQDFBgAhDAgAAI0HACASAADvBwAgEwAAjAcAIKcDAQAAAAHFAwAAAP8DAuEDAgAAAAHzAwEAAAAB-AMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAEHAwAAzwgAIKcDAQAAAAG2A0AAAAAByANAAAAAAc4DAgAAAAHPAwEAAAAB0AMBAAAAAQIAAABAACAsAADOCAAgAwAAAEAAICwAAM4IACAtAADMCAAgASUAAMkLADANAwAAuwUAIA4AAKEGACCkAwAApAYAMKUDAAA-ABCmAwAApAYAMKcDAQAAAAG2A0AAsAUAIcgDQACwBQAhzgMCAKAGACHPAwEArwUAIdADAQCuBQAh0QMBAK4FACHCBAAAowYAIAIAAABAACAlAADMCAAgAgAAAMoIACAlAADLCAAgCqQDAADJCAAwpQMAAMoIABCmAwAAyQgAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIc4DAgCgBgAhzwMBAK8FACHQAwEArgUAIdEDAQCuBQAhCqQDAADJCAAwpQMAAMoIABCmAwAAyQgAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIc4DAgCgBgAhzwMBAK8FACHQAwEArgUAIdEDAQCuBQAhBqcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIc4DAgDkBgAhzwMBAMYGACHQAwEAxQYAIQcDAADNCAAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAhzgMCAOQGACHPAwEAxgYAIdADAQDFBgAhBSwAAMQLACAtAADHCwAgxwQAAMULACDIBAAAxgsAIM0EAAC4AQAgBwMAAM8IACCnAwEAAAABtgNAAAAAAcgDQAAAAAHOAwIAAAABzwMBAAAAAdADAQAAAAEDLAAAxAsAIMcEAADFCwAgzQQAALgBACALFAAA8ggAIBYAAPMIACCnAwEAAAABtgNAAAAAAcgDQAAAAAHgAwEAAAAB4QMCAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeUDAQAAAAECAAAAHQAgLAAA8QgAIAMAAAAdACAsAADxCAAgLQAA2ggAIAElAADDCwAwEA4AAKEGACAUAAC9BQAgFgAA_AUAIKQDAAC0BgAwpQMAABsAEKYDAAC0BgAwpwMBAAAAAbYDQACwBQAhyANAALAFACHRAwEArgUAIeADAQCuBQAh4QMCAKAGACHiAwgAugUAIeMDCAC6BQAh5AMIALoFACHlAwEArwUAIQIAAAAdACAlAADaCAAgAgAAANgIACAlAADZCAAgDaQDAADXCAAwpQMAANgIABCmAwAA1wgAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK4FACHhAwIAoAYAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeUDAQCvBQAhDaQDAADXCAAwpQMAANgIABCmAwAA1wgAMKcDAQCuBQAhtgNAALAFACHIA0AAsAUAIdEDAQCuBQAh4AMBAK4FACHhAwIAoAYAIeIDCAC6BQAh4wMIALoFACHkAwgAugUAIeUDAQCvBQAhCacDAQDFBgAhtgNAAMcGACHIA0AAxwYAIeADAQDFBgAh4QMCAOQGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHlAwEAxgYAIQsUAADbCAAgFgAA3AgAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIeADAQDFBgAh4QMCAOQGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHlAwEAxgYAIQssAADoCAAwLQAA7AgAMMcEAADpCAAwyAQAAOoIADDJBAAA6wgAIMoEAACABwAwywQAAIAHADDMBAAAgAcAMM0EAACABwAwzgQAAO0IADDPBAAAgwcAMAssAADdCAAwLQAA4QgAMMcEAADeCAAwyAQAAN8IADDJBAAA4AgAIMoEAACtCAAwywQAAK0IADDMBAAArQgAMM0EAACtCAAwzgQAAOIIADDPBAAAsAgAMAgOAADnCAAgFQAAtwgAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHhAwIAAAABqAQBAAAAAQIAAAA3ACAsAADmCAAgAwAAADcAICwAAOYIACAtAADkCAAgASUAAMILADACAAAANwAgJQAA5AgAIAIAAACxCAAgJQAA4wgAIAanAwEAxQYAIbYDQADHBgAhyANAAMcGACHRAwEAxQYAIeEDAgDkBgAhqAQBAMUGACEIDgAA5QgAIBUAALQIACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHRAwEAxQYAIeEDAgDkBgAhqAQBAMUGACEFLAAAvQsAIC0AAMALACDHBAAAvgsAIMgEAAC_CwAgzQQAABEAIAgOAADnCAAgFQAAtwgAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHhAwIAAAABqAQBAAAAAQMsAAC9CwAgxwQAAL4LACDNBAAAEQAgDAgAAI0HACAOAACLBwAgEgAA7wcAIKcDAQAAAAHFAwAAAP8DAtEDAQAAAAHhAwIAAAAB8wMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAECAAAAIQAgLAAA8AgAIAMAAAAhACAsAADwCAAgLQAA7wgAIAElAAC8CwAwAgAAACEAICUAAO8IACACAAAAhAcAICUAAO4IACAJpwMBAMUGACHFAwAA9wb_AyLRAwEAxQYAIeEDAgDkBgAh8wMBAMUGACH6AwgAzgYAIfwDCADOBgAh_QMIAM4GACH_AwEAxQYAIQwIAACJBwAgDgAAhwcAIBIAAO0HACCnAwEAxQYAIcUDAAD3Bv8DItEDAQDFBgAh4QMCAOQGACHzAwEAxQYAIfoDCADOBgAh_AMIAM4GACH9AwgAzgYAIf8DAQDFBgAhDAgAAI0HACAOAACLBwAgEgAA7wcAIKcDAQAAAAHFAwAAAP8DAtEDAQAAAAHhAwIAAAAB8wMBAAAAAfoDCAAAAAH8AwgAAAAB_QMIAAAAAf8DAQAAAAELFAAA8ggAIBYAAPMIACCnAwEAAAABtgNAAAAAAcgDQAAAAAHgAwEAAAAB4QMCAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeUDAQAAAAEELAAA6AgAMMcEAADpCAAwyQQAAOsIACDNBAAAgAcAMAQsAADdCAAwxwQAAN4IADDJBAAA4AgAIM0EAACtCAAwHQ0AAPcIACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGQAA_AgAIBoAAP0IACAbAAD-CAAgHoAAAAABpwMBAAAAAaoDAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAA6wMCyANAAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeYDAQAAAAHnAwEAAAAB6AMAAPUIACDpAwIAAAAB7AMAAADsAwLtAwAA9ggAIO8DAAAA7wMC8AMIAAAAAfEDIAAAAAHyAyAAAAAB9AMBAAAAAQHKBAEAAAAEAcoEAQAAAAQDLAAAugsAIMcEAAC7CwAgzQQAABYAIAQsAADQCAAwxwQAANEIADDJBAAA0wgAIM0EAADUCAAwBCwAAMIIADDHBAAAwwgAMMkEAADFCAAgzQQAAMYIADAELAAAuQgAMMcEAAC6CAAwyQQAALwIACDNBAAAgAcAMAQsAACpCAAwxwQAAKoIADDJBAAArAgAIM0EAACtCAAwBCwAAJ4IADDHBAAAnwgAMMkEAAChCAAgzQQAAL4HADAELAAAkwgAMMcEAACUCAAwyQQAAJYIACDNBAAAlgcAMAQsAACICAAwxwQAAIkIADDJBAAAiwgAIM0EAADbBgAwAywAALgLACDHBAAAuQsAIM0EAAC4AQAgBCwAAPAHADDHBAAA8QcAMMkEAADzBwAgzQQAAPQHADAELAAA5QcAMMcEAADmBwAwyQQAAOgHACDNBAAAgAcAMAQsAADLBwAwxwQAAMwHADDJBAAAzgcAIM0EAADPBwAwBCwAAKAHADDHBAAAoQcAMMkEAACjBwAgzQQAAKQHADAELAAAkgcAMMcEAACTBwAwyQQAAJUHACDNBAAAlgcAMAQsAADrBgAwxwQAAOwGADDJBAAA7gYAIM0EAADvBgAwBCwAANcGADDHBAAA2AYAMMkEAADaBgAgzQQAANsGADAJBAAA2woAIAUAANwKACAGAADdCgAgCAAA3goAIBEAAI0JACAVAADfCgAgGAAA4AoAINkDAADBBgAg5QMAAMEGACAAAAAAAAAAAAAAAAAAAAAAAAUsAACzCwAgLQAAtgsAIMcEAAC0CwAgyAQAALULACDNBAAAEQAgAywAALMLACDHBAAAtAsAIM0EAAARACAAAAABygRAAAAAAQAAAAAABSwAAK4LACAtAACxCwAgxwQAAK8LACDIBAAAsAsAIM0EAAARACADLAAArgsAIMcEAACvCwAgzQQAABEAIAAAAAAABSwAAKkLACAtAACsCwAgxwQAAKoLACDIBAAAqwsAIM0EAADwBAAgAywAAKkLACDHBAAAqgsAIM0EAADwBAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUsAACkCwAgLQAApwsAIMcEAAClCwAgyAQAAKYLACDNBAAA8AQAIAMsAACkCwAgxwQAAKULACDNBAAA8AQAIAAAAAcsAACdCwAgLQAAogsAIMcEAACeCwAgyAQAAKELACDLBAAAEwAgzAQAABMAIM0EAAAWACALLAAA3QkAMC0AAOIJADDHBAAA3gkAMMgEAADfCQAwyQQAAOAJACDKBAAA4QkAMMsEAADhCQAwzAQAAOEJADDNBAAA4QkAMM4EAADjCQAwzwQAAOQJADALLAAA1AkAMC0AANgJADDHBAAA1QkAMMgEAADWCQAwyQQAANcJACDKBAAA9AcAMMsEAAD0BwAwzAQAAPQHADDNBAAA9AcAMM4EAADZCQAwzwQAAPcHADAdCAAArAkAIBQAAPoIACAWAAD7CAAgFwAA-AgAIBgAAPkIACAZAAD8CAAgGgAA_QgAIBsAAP4IACAegAAAAAGnAwEAAAABqgMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAADrAwLIA0AAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5gMBAAAAAecDAQAAAAHoAwAA9QgAIOkDAgAAAAHsAwAAAOwDAu0DAAD2CAAg7wMAAADvAwLwAwgAAAAB8QMgAAAAAfIDIAAAAAHzAwEAAAABAgAAABEAICwAANwJACADAAAAEQAgLAAA3AkAIC0AANsJACABJQAAoAsAMAIAAAARACAlAADbCQAgAgAAAPgHACAlAADaCQAgFR6AAAAAAacDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACEdCAAAqwkAIBQAAIMIACAWAACECAAgFwAAgQgAIBgAAIIIACAZAACFCAAgGgAAhggAIBsAAIcIACAegAAAAAGnAwEAxQYAIaoDAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAAD7B-sDIsgDQADHBgAh4gMIAM4GACHjAwgAzgYAIeQDCADOBgAh5gMBAMUGACHnAwEAxQYAIegDAAD6BwAg6QMCAOQGACHsAwAA_AfsAyLtAwAA_QcAIO8DAAD-B-8DIvADCADOBgAh8QMgAOEGACHyAyAA4QYAIfMDAQDFBgAhHQgAAKwJACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGQAA_AgAIBoAAP0IACAbAAD-CAAgHoAAAAABpwMBAAAAAaoDAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAA6wMCyANAAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeYDAQAAAAHnAwEAAAAB6AMAAPUIACDpAwIAAAAB7AMAAADsAwLtAwAA9ggAIO8DAAAA7wMC8AMIAAAAAfEDIAAAAAHyAyAAAAAB8wMBAAAAAQoKAADpCQAgCwAA6gkAIKcDAQAAAAG2A0AAAAABwgMBAAAAAcgDQAAAAAHlAwEAAAAB5gMBAAAAAY0EIAAAAAGmBAEAAAABAgAAABYAICwAAOgJACADAAAAFgAgLAAA6AkAIC0AAOcJACABJQAAnwsAMA8JAAC2BgAgCgAAtwYAIAsAALwFACCkAwAAtQYAMKUDAAATABCmAwAAtQYAMKcDAQAAAAG2A0AAsAUAIcIDAQAAAAHIA0AAsAUAIeUDAQCvBQAh5gMBAAAAAY0EIADTBQAhpgQBAK8FACGnBAEArwUAIQIAAAAWACAlAADnCQAgAgAAAOUJACAlAADmCQAgDKQDAADkCQAwpQMAAOUJABCmAwAA5AkAMKcDAQCuBQAhtgNAALAFACHCAwEArgUAIcgDQACwBQAh5QMBAK8FACHmAwEArgUAIY0EIADTBQAhpgQBAK8FACGnBAEArwUAIQykAwAA5AkAMKUDAADlCQAQpgMAAOQJADCnAwEArgUAIbYDQACwBQAhwgMBAK4FACHIA0AAsAUAIeUDAQCvBQAh5gMBAK4FACGNBCAA0wUAIaYEAQCvBQAhpwQBAK8FACEIpwMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHlAwEAxgYAIeYDAQDFBgAhjQQgAOEGACGmBAEAxgYAIQoKAADSCQAgCwAA0wkAIKcDAQDFBgAhtgNAAMcGACHCAwEAxQYAIcgDQADHBgAh5QMBAMYGACHmAwEAxQYAIY0EIADhBgAhpgQBAMYGACEKCgAA6QkAIAsAAOoJACCnAwEAAAABtgNAAAAAAcIDAQAAAAHIA0AAAAAB5QMBAAAAAeYDAQAAAAGNBCAAAAABpgQBAAAAAQQsAADdCQAwxwQAAN4JADDJBAAA4AkAIM0EAADhCQAwBCwAANQJADDHBAAA1QkAMMkEAADXCQAgzQQAAPQHADADLAAAnQsAIMcEAACeCwAgzQQAABYAIAAAAAAAAAAACywAAPYJADAtAAD6CQAwxwQAAPcJADDIBAAA-AkAMMkEAAD5CQAgygQAAK0IADDLBAAArQgAMMwEAACtCAAwzQQAAK0IADDOBAAA-wkAMM8EAACwCAAwBSwAAJcLACAtAACbCwAgxwQAAJgLACDIBAAAmgsAIM0EAAC4AQAgCA4AAOcIACATAAC4CAAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeEDAgAAAAH4AwEAAAABAgAAADcAICwAAP4JACADAAAANwAgLAAA_gkAIC0AAP0JACABJQAAmQsAMAIAAAA3ACAlAAD9CQAgAgAAALEIACAlAAD8CQAgBqcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4QMCAOQGACH4AwEAxgYAIQgOAADlCAAgEwAAtQgAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4QMCAOQGACH4AwEAxgYAIQgOAADnCAAgEwAAuAgAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHhAwIAAAAB-AMBAAAAAQQsAAD2CQAwxwQAAPcJADDJBAAA-QkAIM0EAACtCAAwAywAAJcLACDHBAAAmAsAIM0EAAC4AQAgAAAAAAAAAAUsAACSCwAgLQAAlQsAIMcEAACTCwAgyAQAAJQLACDNBAAAuAEAIAMsAACSCwAgxwQAAJMLACDNBAAAuAEAIAAAAAUsAACNCwAgLQAAkAsAIMcEAACOCwAgyAQAAI8LACDNBAAAuAEAIAMsAACNCwAgxwQAAI4LACDNBAAAuAEAIAAAAAHKBAAAALoEAgHKBAAAALwEAgssAADICgAwLQAAzQoAMMcEAADJCgAwyAQAAMoKADDJBAAAywoAIMoEAADMCgAwywQAAMwKADDMBAAAzAoAMM0EAADMCgAwzgQAAM4KADDPBAAAzwoAMAssAAC8CgAwLQAAwQoAMMcEAAC9CgAwyAQAAL4KADDJBAAAvwoAIMoEAADACgAwywQAAMAKADDMBAAAwAoAMM0EAADACgAwzgQAAMIKADDPBAAAwwoAMAcsAAC3CgAgLQAAugoAIMcEAAC4CgAgyAQAALkKACDLBAAACwAgzAQAAAsAIM0EAAABACAHLAAAsgoAIC0AALUKACDHBAAAswoAIMgEAAC0CgAgywQAAA0AIMwEAAANACDNBAAA8AQAIAssAACpCgAwLQAArQoAMMcEAACqCgAwyAQAAKsKADDJBAAArAoAIMoEAADvBgAwywQAAO8GADDMBAAA7wYAMM0EAADvBgAwzgQAAK4KADDPBAAA8gYAMAcsAACkCgAgLQAApwoAIMcEAAClCgAgyAQAAKYKACDLBAAAbQAgzAQAAG0AIM0EAACVAgAgCywAAJsKADAtAACfCgAwxwQAAJwKADDIBAAAnQoAMMkEAACeCgAgygQAAMYIADDLBAAAxggAMMwEAADGCAAwzQQAAMYIADDOBAAAoAoAMM8EAADJCAAwBw4AAJoJACCnAwEAAAABtgNAAAAAAcgDQAAAAAHOAwIAAAABzwMBAAAAAdEDAQAAAAECAAAAQAAgLAAAowoAIAMAAABAACAsAACjCgAgLQAAogoAIAElAACMCwAwAgAAAEAAICUAAKIKACACAAAAyggAICUAAKEKACAGpwMBAMUGACG2A0AAxwYAIcgDQADHBgAhzgMCAOQGACHPAwEAxgYAIdEDAQDFBgAhBw4AAJkJACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHOAwIA5AYAIc8DAQDGBgAh0QMBAMUGACEHDgAAmgkAIKcDAQAAAAG2A0AAAAAByANAAAAAAc4DAgAAAAHPAwEAAAAB0QMBAAAAAQQPAAD_CQAgpwMBAAAAAbYDQAAAAAHIA0AAAAABAgAAAJUCACAsAACkCgAgAwAAAG0AICwAAKQKACAtAACoCgAgBgAAAG0AIA8AAPQJACAlAACoCgAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAhBA8AAPQJACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACEUCAAAuQcAIA8AAJAHACAQAACRBwAgpwMBAAAAAawDAQAAAAGuAwEAAAABtgNAAAAAAcgDQAAAAAHzAwEAAAABgQQAAACBBAKCBAgAAAABhAQAAACEBAKFBAEAAAABhgQAAAD_AwKHBAEAAAABiAQBAAAAAYkEAQAAAAGKBAgAAAABiwQIAAAAAYwEAQAAAAECAAAALwAgLAAAsQoAIAMAAAAvACAsAACxCgAgLQAAsAoAIAElAACLCwAwAgAAAC8AICUAALAKACACAAAA8wYAICUAAK8KACARpwMBAMUGACGsAwEAxgYAIa4DAQDGBgAhtgNAAMcGACHIA0AAxwYAIfMDAQDGBgAhgQQAAPUGgQQiggQIAM4GACGEBAAA9gaEBCKFBAEAxgYAIYYEAAD3Bv8DIocEAQDGBgAhiAQBAMYGACGJBAEAxgYAIYoECADOBgAhiwQIAM4GACGMBAEAxgYAIRQIAAC3BwAgDwAA-gYAIBAAAPsGACCnAwEAxQYAIawDAQDGBgAhrgMBAMYGACG2A0AAxwYAIcgDQADHBgAh8wMBAMYGACGBBAAA9QaBBCKCBAgAzgYAIYQEAAD2BoQEIoUEAQDGBgAhhgQAAPcG_wMihwQBAMYGACGIBAEAxgYAIYkEAQDGBgAhigQIAM4GACGLBAgAzgYAIYwEAQDGBgAhFAgAALkHACAPAACQBwAgEAAAkQcAIKcDAQAAAAGsAwEAAAABrgMBAAAAAbYDQAAAAAHIA0AAAAAB8wMBAAAAAYEEAAAAgQQCggQIAAAAAYQEAAAAhAQChQQBAAAAAYYEAAAA_wMChwQBAAAAAYgEAQAAAAGJBAEAAAABigQIAAAAAYsECAAAAAGMBAEAAAABEAsAAIAJACAUAACBCQAgGQAAgwkAIBoAAIQJACAbAACGCQAgHgAAggkAIB8AAIUJACCnAwEAAAABqgMBAAAAAasDAQAAAAG2A0AAAAABwgMBAAAAAcMDAQAAAAHFAwAAAMUDAsYDCAAAAAHIA0AAAAABAgAAAPAEACAsAACyCgAgAwAAAA0AICwAALIKACAtAAC2CgAgEgAAAA0AIAsAANAGACAUAADRBgAgGQAA0wYAIBoAANQGACAbAADWBgAgHgAA0gYAIB8AANUGACAlAAC2CgAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHIA0AAxwYAIRALAADQBgAgFAAA0QYAIBkAANMGACAaAADUBgAgGwAA1gYAIB4AANIGACAfAADVBgAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHIA0AAxwYAIQmnAwEAAAABrQMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAdgDIAAAAAHZA0AAAAABvgQBAAAAAb8EAQAAAAECAAAAAQAgLAAAtwoAIAMAAAALACAsAAC3CgAgLQAAuwoAIAsAAAALACAlAAC7CgAgpwMBAMUGACGtAwEAxQYAIbYDQADHBgAhwgMBAMUGACHIA0AAxwYAIdgDIADhBgAh2QNAAJ4JACG-BAEAxgYAIb8EAQDGBgAhCacDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHYAyAA4QYAIdkDQACeCQAhvgQBAMYGACG_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_CgAgLQAAggsAIMcEAACACwAgyAQAAIELACDLBAAADQAgzAQAAA0AIM0EAADwBAAgAywAAP8KACDHBAAAgAsAIM0EAADwBAAgAAAABSwAAPoKACAtAAD9CgAgxwQAAPsKACDIBAAA_AoAIM0EAAC4AQAgAywAAPoKACDHBAAA-woAIM0EAAC4AQAgAAMIAADeCgAgHQAA8goAIPMDAADBBgAgAAoIAADeCgAgDQAA9woAIBQAAIkJACAWAACBCgAgFwAA-QoAIBgAAOAKACAZAADwCgAgGgAAjAkAIBsAAI4JACAeAADBBgAgBA4AAPMKACAUAACJCQAgFgAAgQoAIOUDAADBBgAgBAgAAN4KACALAADwCgAgEQAAjQkAIKIEAADBBgAgDQMAAIcJACAIAADeCgAgDwAAiQkAIBAAAPUKACCsAwAAwQYAIK4DAADBBgAg0AMAAMEGACDzAwAAwQYAIIUEAADBBgAghwQAAMEGACCIBAAAwQYAIIkEAADBBgAgjAQAAMEGACAGCQAA9woAIAoAAPgKACALAACICQAg5QMAAMEGACCmBAAAwQYAIKcEAADBBgAgAAASBAAA1AoAIAUAANUKACAIAADXCgAgEQAA2AoAIBUAANkKACAYAADaCgAgpwMBAAAAAa0DAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAAvAQCyANAAAAAAdgDIAAAAAHZA0AAAAAB5QMBAAAAAbgEIAAAAAG6BAAAALoEArwEIAAAAAECAAAAuAEAICwAAPoKACADAAAAIwAgLAAA-goAIC0AAP4KACAUAAAAIwAgBAAAlAoAIAUAAJUKACAIAACXCgAgEQAAmAoAIBUAAJkKACAYAACaCgAgJQAA_goAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEgQAAJQKACAFAACVCgAgCAAAlwoAIBEAAJgKACAVAACZCgAgGAAAmgoAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEQcAAP8IACALAACACQAgFAAAgQkAIBkAAIMJACAaAACECQAgGwAAhgkAIB8AAIUJACCnAwEAAAABqgMBAAAAAasDAQAAAAG2A0AAAAABwgMBAAAAAcMDAQAAAAHFAwAAAMUDAsYDCAAAAAHHAwEAAAAByANAAAAAAQIAAADwBAAgLAAA_woAIAMAAAANACAsAAD_CgAgLQAAgwsAIBMAAAANACAHAADPBgAgCwAA0AYAIBQAANEGACAZAADTBgAgGgAA1AYAIBsAANYGACAfAADVBgAgJQAAgwsAIKcDAQDFBgAhqgMBAMYGACGrAwEAxgYAIbYDQADHBgAhwgMBAMUGACHDAwEAxgYAIcUDAADNBsUDIsYDCADOBgAhxwMBAMUGACHIA0AAxwYAIREHAADPBgAgCwAA0AYAIBQAANEGACAZAADTBgAgGgAA1AYAIBsAANYGACAfAADVBgAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHHAwEAxQYAIcgDQADHBgAhBggAAOoKACCnAwEAAAABtgNAAAAAAcIDAQAAAAHIA0AAAAAB8wMBAAAAAQIAAABXACAsAACECwAgAwAAAFUAICwAAIQLACAtAACICwAgCAAAAFUAIAgAAOkKACAlAACICwAgpwMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHzAwEAxgYAIQYIAADpCgAgpwMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHzAwEAxgYAIQenAwEAAAABtgNAAAAAAcgDQAAAAAGrBEAAAAABtQQBAAAAAbYEAQAAAAG3BAEAAAABDKcDAQAAAAG2A0AAAAAByANAAAAAAawEAQAAAAGtBAEAAAABrgQBAAAAAa8EAQAAAAGwBAEAAAABsQRAAAAAAbIEQAAAAAGzBAEAAAABtAQBAAAAARGnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAfMDAQAAAAGBBAAAAIEEAoIECAAAAAGEBAAAAIQEAoUEAQAAAAGGBAAAAP8DAocEAQAAAAGIBAEAAAABiQQBAAAAAYoECAAAAAGLBAgAAAABjAQBAAAAAQanAwEAAAABtgNAAAAAAcgDQAAAAAHOAwIAAAABzwMBAAAAAdEDAQAAAAESBQAA1QoAIAYAANYKACAIAADXCgAgEQAA2AoAIBUAANkKACAYAADaCgAgpwMBAAAAAa0DAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAAvAQCyANAAAAAAdgDIAAAAAHZA0AAAAAB5QMBAAAAAbgEIAAAAAG6BAAAALoEArwEIAAAAAECAAAAuAEAICwAAI0LACADAAAAIwAgLAAAjQsAIC0AAJELACAUAAAAIwAgBQAAlQoAIAYAAJYKACAIAACXCgAgEQAAmAoAIBUAAJkKACAYAACaCgAgJQAAkQsAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEgUAAJUKACAGAACWCgAgCAAAlwoAIBEAAJgKACAVAACZCgAgGAAAmgoAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEgQAANQKACAGAADWCgAgCAAA1woAIBEAANgKACAVAADZCgAgGAAA2goAIKcDAQAAAAGtAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAALwEAsgDQAAAAAHYAyAAAAAB2QNAAAAAAeUDAQAAAAG4BCAAAAABugQAAAC6BAK8BCAAAAABAgAAALgBACAsAACSCwAgAwAAACMAICwAAJILACAtAACWCwAgFAAAACMAIAQAAJQKACAGAACWCgAgCAAAlwoAIBEAAJgKACAVAACZCgAgGAAAmgoAICUAAJYLACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIRIEAACUCgAgBgAAlgoAIAgAAJcKACARAACYCgAgFQAAmQoAIBgAAJoKACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIRIEAADUCgAgBQAA1QoAIAYAANYKACAIAADXCgAgEQAA2AoAIBgAANoKACCnAwEAAAABrQMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAAC8BALIA0AAAAAB2AMgAAAAAdkDQAAAAAHlAwEAAAABuAQgAAAAAboEAAAAugQCvAQgAAAAAQIAAAC4AQAgLAAAlwsAIAanAwEAAAABtgNAAAAAAcgDQAAAAAHRAwEAAAAB4QMCAAAAAfgDAQAAAAEDAAAAIwAgLAAAlwsAIC0AAJwLACAUAAAAIwAgBAAAlAoAIAUAAJUKACAGAACWCgAgCAAAlwoAIBEAAJgKACAYAACaCgAgJQAAnAsAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEgQAAJQKACAFAACVCgAgBgAAlgoAIAgAAJcKACARAACYCgAgGAAAmgoAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhCwkAAOsJACALAADqCQAgpwMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAeUDAQAAAAHmAwEAAAABjQQgAAAAAaYEAQAAAAGnBAEAAAABAgAAABYAICwAAJ0LACAIpwMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAeUDAQAAAAHmAwEAAAABjQQgAAAAAaYEAQAAAAEVHoAAAAABpwMBAAAAAaoDAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAA6wMCyANAAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeYDAQAAAAHnAwEAAAAB6AMAAPUIACDpAwIAAAAB7AMAAADsAwLtAwAA9ggAIO8DAAAA7wMC8AMIAAAAAfEDIAAAAAHyAyAAAAAB8wMBAAAAAQMAAAATACAsAACdCwAgLQAAowsAIA0AAAATACAJAADRCQAgCwAA0wkAICUAAKMLACCnAwEAxQYAIbYDQADHBgAhwgMBAMUGACHIA0AAxwYAIeUDAQDGBgAh5gMBAMUGACGNBCAA4QYAIaYEAQDGBgAhpwQBAMYGACELCQAA0QkAIAsAANMJACCnAwEAxQYAIbYDQADHBgAhwgMBAMUGACHIA0AAxwYAIeUDAQDGBgAh5gMBAMUGACGNBCAA4QYAIaYEAQDGBgAhpwQBAMYGACERBwAA_wgAIAsAAIAJACAUAACBCQAgGgAAhAkAIBsAAIYJACAeAACCCQAgHwAAhQkAIKcDAQAAAAGqAwEAAAABqwMBAAAAAbYDQAAAAAHCAwEAAAABwwMBAAAAAcUDAAAAxQMCxgMIAAAAAccDAQAAAAHIA0AAAAABAgAAAPAEACAsAACkCwAgAwAAAA0AICwAAKQLACAtAACoCwAgEwAAAA0AIAcAAM8GACALAADQBgAgFAAA0QYAIBoAANQGACAbAADWBgAgHgAA0gYAIB8AANUGACAlAACoCwAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHHAwEAxQYAIcgDQADHBgAhEQcAAM8GACALAADQBgAgFAAA0QYAIBoAANQGACAbAADWBgAgHgAA0gYAIB8AANUGACCnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACERBwAA_wgAIBQAAIEJACAZAACDCQAgGgAAhAkAIBsAAIYJACAeAACCCQAgHwAAhQkAIKcDAQAAAAGqAwEAAAABqwMBAAAAAbYDQAAAAAHCAwEAAAABwwMBAAAAAcUDAAAAxQMCxgMIAAAAAccDAQAAAAHIA0AAAAABAgAAAPAEACAsAACpCwAgAwAAAA0AICwAAKkLACAtAACtCwAgEwAAAA0AIAcAAM8GACAUAADRBgAgGQAA0wYAIBoAANQGACAbAADWBgAgHgAA0gYAIB8AANUGACAlAACtCwAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHHAwEAxQYAIcgDQADHBgAhEQcAAM8GACAUAADRBgAgGQAA0wYAIBoAANQGACAbAADWBgAgHgAA0gYAIB8AANUGACCnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACEeCAAArAkAIA0AAPcIACAUAAD6CAAgFgAA-wgAIBgAAPkIACAZAAD8CAAgGgAA_QgAIBsAAP4IACAegAAAAAGnAwEAAAABqgMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAADrAwLIA0AAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5gMBAAAAAecDAQAAAAHoAwAA9QgAIOkDAgAAAAHsAwAAAOwDAu0DAAD2CAAg7wMAAADvAwLwAwgAAAAB8QMgAAAAAfIDIAAAAAHzAwEAAAAB9AMBAAAAAQIAAAARACAsAACuCwAgAwAAAA8AICwAAK4LACAtAACyCwAgIAAAAA8AIAgAAKsJACANAACACAAgFAAAgwgAIBYAAIQIACAYAACCCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABJQAAsgsAIKcDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIR4IAACrCQAgDQAAgAgAIBQAAIMIACAWAACECAAgGAAAgggAIBkAAIUIACAaAACGCAAgGwAAhwgAIB6AAAAAAacDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIR4IAACsCQAgDQAA9wgAIBQAAPoIACAWAAD7CAAgFwAA-AgAIBkAAPwIACAaAAD9CAAgGwAA_ggAIB6AAAAAAacDAQAAAAGqAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAAOsDAsgDQAAAAAHiAwgAAAAB4wMIAAAAAeQDCAAAAAHmAwEAAAAB5wMBAAAAAegDAAD1CAAg6QMCAAAAAewDAAAA7AMC7QMAAPYIACDvAwAAAO8DAvADCAAAAAHxAyAAAAAB8gMgAAAAAfMDAQAAAAH0AwEAAAABAgAAABEAICwAALMLACADAAAADwAgLAAAswsAIC0AALcLACAgAAAADwAgCAAAqwkAIA0AAIAIACAUAACDCAAgFgAAhAgAIBcAAIEIACAZAACFCAAgGgAAhggAIBsAAIcIACAegAAAAAElAAC3CwAgpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhHggAAKsJACANAACACAAgFAAAgwgAIBYAAIQIACAXAACBCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhEgQAANQKACAFAADVCgAgBgAA1goAIBEAANgKACAVAADZCgAgGAAA2goAIKcDAQAAAAGtAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAALwEAsgDQAAAAAHYAyAAAAAB2QNAAAAAAeUDAQAAAAG4BCAAAAABugQAAAC6BAK8BCAAAAABAgAAALgBACAsAAC4CwAgCwkAAOsJACAKAADpCQAgpwMBAAAAAbYDQAAAAAHCAwEAAAAByANAAAAAAeUDAQAAAAHmAwEAAAABjQQgAAAAAaYEAQAAAAGnBAEAAAABAgAAABYAICwAALoLACAJpwMBAAAAAcUDAAAA_wMC0QMBAAAAAeEDAgAAAAHzAwEAAAAB-gMIAAAAAfwDCAAAAAH9AwgAAAAB_wMBAAAAAR4IAACsCQAgDQAA9wgAIBQAAPoIACAXAAD4CAAgGAAA-QgAIBkAAPwIACAaAAD9CAAgGwAA_ggAIB6AAAAAAacDAQAAAAGqAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAAOsDAsgDQAAAAAHiAwgAAAAB4wMIAAAAAeQDCAAAAAHmAwEAAAAB5wMBAAAAAegDAAD1CAAg6QMCAAAAAewDAAAA7AMC7QMAAPYIACDvAwAAAO8DAvADCAAAAAHxAyAAAAAB8gMgAAAAAfMDAQAAAAH0AwEAAAABAgAAABEAICwAAL0LACADAAAADwAgLAAAvQsAIC0AAMELACAgAAAADwAgCAAAqwkAIA0AAIAIACAUAACDCAAgFwAAgQgAIBgAAIIIACAZAACFCAAgGgAAhggAIBsAAIcIACAegAAAAAElAADBCwAgpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhHggAAKsJACANAACACAAgFAAAgwgAIBcAAIEIACAYAACCCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhBqcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHhAwIAAAABqAQBAAAAAQmnAwEAAAABtgNAAAAAAcgDQAAAAAHgAwEAAAAB4QMCAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeUDAQAAAAESBAAA1AoAIAUAANUKACAGAADWCgAgCAAA1woAIBEAANgKACAVAADZCgAgpwMBAAAAAa0DAQAAAAG2A0AAAAABwgMBAAAAAcUDAAAAvAQCyANAAAAAAdgDIAAAAAHZA0AAAAAB5QMBAAAAAbgEIAAAAAG6BAAAALoEArwEIAAAAAECAAAAuAEAICwAAMQLACADAAAAIwAgLAAAxAsAIC0AAMgLACAUAAAAIwAgBAAAlAoAIAUAAJUKACAGAACWCgAgCAAAlwoAIBEAAJgKACAVAACZCgAgJQAAyAsAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhEgQAAJQKACAFAACVCgAgBgAAlgoAIAgAAJcKACARAACYCgAgFQAAmQoAIKcDAQDFBgAhrQMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAJMKvAQiyANAAMcGACHYAyAA4QYAIdkDQACeCQAh5QMBAMYGACG4BCAA4QYAIboEAACSCroEIrwEIADhBgAhBqcDAQAAAAG2A0AAAAAByANAAAAAAc4DAgAAAAHPAwEAAAAB0AMBAAAAAQmnAwEAAAABxQMAAAD_AwLhAwIAAAAB8wMBAAAAAfgDAQAAAAH6AwgAAAAB_AMIAAAAAf0DCAAAAAH_AwEAAAABDA4AAKUJACAUAADyCAAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB0QMBAAAAAeADAQAAAAHhAwIAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5QMBAAAAAQIAAAAdACAsAADLCwAgBQMAAIAKACCnAwEAAAABtgNAAAAAAcgDQAAAAAHQAwEAAAABAgAAAJUCACAsAADNCwAgAwAAABsAICwAAMsLACAtAADRCwAgDgAAABsAIA4AAKQJACAUAADbCAAgJQAA0QsAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4AMBAMUGACHhAwIA5AYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeUDAQDGBgAhDA4AAKQJACAUAADbCAAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0QMBAMUGACHgAwEAxQYAIeEDAgDkBgAh4gMIAM4GACHjAwgAzgYAIeQDCADOBgAh5QMBAMYGACEDAAAAbQAgLAAAzQsAIC0AANQLACAHAAAAbQAgAwAA9QkAICUAANQLACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHQAwEAxQYAIQUDAAD1CQAgpwMBAMUGACG2A0AAxwYAIcgDQADHBgAh0AMBAMUGACEGpwMBAAAAAbYDQAAAAAHIA0AAAAAB4QMCAAAAAfgDAQAAAAGoBAEAAAABDggAAM0JACARAADKBwAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB8wMBAAAAAYoECAAAAAGNBCAAAAABnwQBAAAAAaEEAAAAoQQCogQIAAAAAaMECAAAAAGkBEAAAAABpQRAAAAAAQIAAABgACAsAADWCwAgAwAAACcAICwAANYLACAtAADaCwAgEAAAACcAIAgAAMwJACARAACuBwAgJQAA2gsAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIfMDAQDFBgAhigQIAM4GACGNBCAA4QYAIZ8EAQDFBgAhoQQAAKoHoQQiogQIAKsHACGjBAgAzgYAIaQEQADHBgAhpQRAAMcGACEOCAAAzAkAIBEAAK4HACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHzAwEAxQYAIYoECADOBgAhjQQgAOEGACGfBAEAxQYAIaEEAACqB6EEIqIECACrBwAhowQIAM4GACGkBEAAxwYAIaUEQADHBgAhAqcDAQAAAAGMBAEAAAABEQcAAP8IACALAACACQAgFAAAgQkAIBkAAIMJACAbAACGCQAgHgAAggkAIB8AAIUJACCnAwEAAAABqgMBAAAAAasDAQAAAAG2A0AAAAABwgMBAAAAAcMDAQAAAAHFAwAAAMUDAsYDCAAAAAHHAwEAAAAByANAAAAAAQIAAADwBAAgLAAA3AsAIAMAAAANACAsAADcCwAgLQAA4AsAIBMAAAANACAHAADPBgAgCwAA0AYAIBQAANEGACAZAADTBgAgGwAA1gYAIB4AANIGACAfAADVBgAgJQAA4AsAIKcDAQDFBgAhqgMBAMYGACGrAwEAxgYAIbYDQADHBgAhwgMBAMUGACHDAwEAxgYAIcUDAADNBsUDIsYDCADOBgAhxwMBAMUGACHIA0AAxwYAIREHAADPBgAgCwAA0AYAIBQAANEGACAZAADTBgAgGwAA1gYAIB4AANIGACAfAADVBgAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHHAwEAxQYAIcgDQADHBgAhCqcDAQAAAAG2A0AAAAAByANAAAAAAeADAQAAAAHhAwIAAAAB8wMBAAAAAfgDAQAAAAH5AwEAAAAB-gMIAAAAAfsDAQAAAAERBwAA_wgAIAsAAIAJACAUAACBCQAgGQAAgwkAIBoAAIQJACAeAACCCQAgHwAAhQkAIKcDAQAAAAGqAwEAAAABqwMBAAAAAbYDQAAAAAHCAwEAAAABwwMBAAAAAcUDAAAAxQMCxgMIAAAAAccDAQAAAAHIA0AAAAABAgAAAPAEACAsAADiCwAgAwAAAA0AICwAAOILACAtAADmCwAgEwAAAA0AIAcAAM8GACALAADQBgAgFAAA0QYAIBkAANMGACAaAADUBgAgHgAA0gYAIB8AANUGACAlAADmCwAgpwMBAMUGACGqAwEAxgYAIasDAQDGBgAhtgNAAMcGACHCAwEAxQYAIcMDAQDGBgAhxQMAAM0GxQMixgMIAM4GACHHAwEAxQYAIcgDQADHBgAhEQcAAM8GACALAADQBgAgFAAA0QYAIBkAANMGACAaAADUBgAgHgAA0gYAIB8AANUGACCnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACEYpwMBAAAAAaoDAQAAAAG2A0AAAAAByANAAAAAAeYDAQAAAAHzAwEAAAABjQQgAAAAAY4EAQAAAAGPBAEAAAABkAQBAAAAAZEEAQAAAAGSBAEAAAABkwQBAAAAAZQEAQAAAAGVBAAA6AYAIJYEAQAAAAGXBAEAAAABmAQBAAAAAZkEAQAAAAGaBAEAAAABmwQAAOkGACCcBAEAAAABnQQBAAAAAZ4EAgAAAAEDAAAAEwAgLAAAugsAIC0AAOoLACANAAAAEwAgCQAA0QkAIAoAANIJACAlAADqCwAgpwMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHlAwEAxgYAIeYDAQDFBgAhjQQgAOEGACGmBAEAxgYAIacEAQDGBgAhCwkAANEJACAKAADSCQAgpwMBAMUGACG2A0AAxwYAIcIDAQDFBgAhyANAAMcGACHlAwEAxgYAIeYDAQDFBgAhjQQgAOEGACGmBAEAxgYAIacEAQDGBgAhFR6AAAAAAacDAQAAAAGqAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAAOsDAsgDQAAAAAHiAwgAAAAB4wMIAAAAAeQDCAAAAAHmAwEAAAAB5wMBAAAAAegDAAD1CAAg6QMCAAAAAewDAAAA7AMC7QMAAPYIACDvAwAAAO8DAvADCAAAAAHxAyAAAAAB8gMgAAAAAfQDAQAAAAEVAwAAjwcAIAgAALkHACAQAACRBwAgpwMBAAAAAawDAQAAAAGuAwEAAAABtgNAAAAAAcgDQAAAAAHQAwEAAAAB8wMBAAAAAYEEAAAAgQQCggQIAAAAAYQEAAAAhAQChQQBAAAAAYYEAAAA_wMChwQBAAAAAYgEAQAAAAGJBAEAAAABigQIAAAAAYsECAAAAAGMBAEAAAABAgAAAC8AICwAAOwLACADAAAALQAgLAAA7AsAIC0AAPALACAXAAAALQAgAwAA-QYAIAgAALcHACAQAAD7BgAgJQAA8AsAIKcDAQDFBgAhrAMBAMYGACGuAwEAxgYAIbYDQADHBgAhyANAAMcGACHQAwEAxgYAIfMDAQDGBgAhgQQAAPUGgQQiggQIAM4GACGEBAAA9gaEBCKFBAEAxgYAIYYEAAD3Bv8DIocEAQDGBgAhiAQBAMYGACGJBAEAxgYAIYoECADOBgAhiwQIAM4GACGMBAEAxgYAIRUDAAD5BgAgCAAAtwcAIBAAAPsGACCnAwEAxQYAIawDAQDGBgAhrgMBAMYGACG2A0AAxwYAIcgDQADHBgAh0AMBAMYGACHzAwEAxgYAIYEEAAD1BoEEIoIECADOBgAhhAQAAPYGhAQihQQBAMYGACGGBAAA9wb_AyKHBAEAxgYAIYgEAQDGBgAhiQQBAMYGACGKBAgAzgYAIYsECADOBgAhjAQBAMYGACEJpwMBAAAAAcUDAAAA_wMC0QMBAAAAAeEDAgAAAAH4AwEAAAAB-gMIAAAAAfwDCAAAAAH9AwgAAAAB_wMBAAAAAQSnAwEAAAABtgNAAAAAAcgDQAAAAAGqBAEAAAABBKcDAQAAAAG2A0AAAAABwgMBAAAAAcgDQAAAAAEeCAAArAkAIA0AAPcIACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGgAA_QgAIBsAAP4IACAegAAAAAGnAwEAAAABqgMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAADrAwLIA0AAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5gMBAAAAAecDAQAAAAHoAwAA9QgAIOkDAgAAAAHsAwAAAOwDAu0DAAD2CAAg7wMAAADvAwLwAwgAAAAB8QMgAAAAAfIDIAAAAAHzAwEAAAAB9AMBAAAAAQIAAAARACAsAAD0CwAgAwAAAA8AICwAAPQLACAtAAD4CwAgIAAAAA8AIAgAAKsJACANAACACAAgFAAAgwgAIBYAAIQIACAXAACBCAAgGAAAgggAIBoAAIYIACAbAACHCAAgHoAAAAABJQAA-AsAIKcDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIR4IAACrCQAgDQAAgAgAIBQAAIMIACAWAACECAAgFwAAgQgAIBgAAIIIACAaAACGCAAgGwAAhwgAIB6AAAAAAacDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIQKnAwEAAAAB0QMBAAAAAREHAAD_CAAgCwAAgAkAIBQAAIEJACAZAACDCQAgGgAAhAkAIBsAAIYJACAeAACCCQAgpwMBAAAAAaoDAQAAAAGrAwEAAAABtgNAAAAAAcIDAQAAAAHDAwEAAAABxQMAAADFAwLGAwgAAAABxwMBAAAAAcgDQAAAAAECAAAA8AQAICwAAPoLACADAAAADQAgLAAA-gsAIC0AAP4LACATAAAADQAgBwAAzwYAIAsAANAGACAUAADRBgAgGQAA0wYAIBoAANQGACAbAADWBgAgHgAA0gYAICUAAP4LACCnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACERBwAAzwYAIAsAANAGACAUAADRBgAgGQAA0wYAIBoAANQGACAbAADWBgAgHgAA0gYAIKcDAQDFBgAhqgMBAMYGACGrAwEAxgYAIbYDQADHBgAhwgMBAMUGACHDAwEAxgYAIcUDAADNBsUDIsYDCADOBgAhxwMBAMUGACHIA0AAxwYAIRGnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAdADAQAAAAHzAwEAAAABgQQAAACBBAKCBAgAAAABhAQAAACEBAKFBAEAAAABhgQAAAD_AwKHBAEAAAABiAQBAAAAAYkEAQAAAAGKBAgAAAABiwQIAAAAAQunAwEAAAABtgNAAAAAAcgDQAAAAAGKBAgAAAABjQQgAAAAAZ8EAQAAAAGhBAAAAKEEAqIECAAAAAGjBAgAAAABpARAAAAAAaUEQAAAAAEeCAAArAkAIA0AAPcIACAUAAD6CAAgFgAA-wgAIBcAAPgIACAYAAD5CAAgGQAA_AgAIBsAAP4IACAegAAAAAGnAwEAAAABqgMBAAAAAbYDQAAAAAHCAwEAAAABxQMAAADrAwLIA0AAAAAB4gMIAAAAAeMDCAAAAAHkAwgAAAAB5gMBAAAAAecDAQAAAAHoAwAA9QgAIOkDAgAAAAHsAwAAAOwDAu0DAAD2CAAg7wMAAADvAwLwAwgAAAAB8QMgAAAAAfIDIAAAAAHzAwEAAAAB9AMBAAAAAQIAAAARACAsAACBDAAgAwAAAA8AICwAAIEMACAtAACFDAAgIAAAAA8AIAgAAKsJACANAACACAAgFAAAgwgAIBYAAIQIACAXAACBCAAgGAAAgggAIBkAAIUIACAbAACHCAAgHoAAAAABJQAAhQwAIKcDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIR4IAACrCQAgDQAAgAgAIBQAAIMIACAWAACECAAgFwAAgQgAIBgAAIIIACAZAACFCAAgGwAAhwgAIB6AAAAAAacDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIQqnAwEAAAABtgNAAAAAAcgDQAAAAAHRAwEAAAAB4AMBAAAAAeEDAgAAAAH4AwEAAAAB-QMBAAAAAfoDCAAAAAH7AwEAAAABDggAAM0JACALAADJBwAgpwMBAAAAAbYDQAAAAAHIA0AAAAAB8wMBAAAAAYoECAAAAAGNBCAAAAABnwQBAAAAAaEEAAAAoQQCogQIAAAAAaMECAAAAAGkBEAAAAABpQRAAAAAAQIAAABgACAsAACHDAAgEgQAANQKACAFAADVCgAgBgAA1goAIAgAANcKACAVAADZCgAgGAAA2goAIKcDAQAAAAGtAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAALwEAsgDQAAAAAHYAyAAAAAB2QNAAAAAAeUDAQAAAAG4BCAAAAABugQAAAC6BAK8BCAAAAABAgAAALgBACAsAACJDAAgEQcAAP8IACALAACACQAgGQAAgwkAIBoAAIQJACAbAACGCQAgHgAAggkAIB8AAIUJACCnAwEAAAABqgMBAAAAAasDAQAAAAG2A0AAAAABwgMBAAAAAcMDAQAAAAHFAwAAAMUDAsYDCAAAAAHHAwEAAAAByANAAAAAAQIAAADwBAAgLAAAiwwAIAwOAAClCQAgFgAA8wgAIKcDAQAAAAG2A0AAAAAByANAAAAAAdEDAQAAAAHgAwEAAAAB4QMCAAAAAeIDCAAAAAHjAwgAAAAB5AMIAAAAAeUDAQAAAAECAAAAHQAgLAAAjQwAIB4IAACsCQAgDQAA9wgAIBYAAPsIACAXAAD4CAAgGAAA-QgAIBkAAPwIACAaAAD9CAAgGwAA_ggAIB6AAAAAAacDAQAAAAGqAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAAOsDAsgDQAAAAAHiAwgAAAAB4wMIAAAAAeQDCAAAAAHmAwEAAAAB5wMBAAAAAegDAAD1CAAg6QMCAAAAAewDAAAA7AMC7QMAAPYIACDvAwAAAO8DAvADCAAAAAHxAyAAAAAB8gMgAAAAAfMDAQAAAAH0AwEAAAABAgAAABEAICwAAI8MACADAAAADQAgLAAAiwwAIC0AAJMMACATAAAADQAgBwAAzwYAIAsAANAGACAZAADTBgAgGgAA1AYAIBsAANYGACAeAADSBgAgHwAA1QYAICUAAJMMACCnAwEAxQYAIaoDAQDGBgAhqwMBAMYGACG2A0AAxwYAIcIDAQDFBgAhwwMBAMYGACHFAwAAzQbFAyLGAwgAzgYAIccDAQDFBgAhyANAAMcGACERBwAAzwYAIAsAANAGACAZAADTBgAgGgAA1AYAIBsAANYGACAeAADSBgAgHwAA1QYAIKcDAQDFBgAhqgMBAMYGACGrAwEAxgYAIbYDQADHBgAhwgMBAMUGACHDAwEAxgYAIcUDAADNBsUDIsYDCADOBgAhxwMBAMUGACHIA0AAxwYAIQMAAAAbACAsAACNDAAgLQAAlgwAIA4AAAAbACAOAACkCQAgFgAA3AgAICUAAJYMACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHRAwEAxQYAIeADAQDFBgAh4QMCAOQGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHlAwEAxgYAIQwOAACkCQAgFgAA3AgAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIdEDAQDFBgAh4AMBAMUGACHhAwIA5AYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeUDAQDGBgAhAwAAAA8AICwAAI8MACAtAACZDAAgIAAAAA8AIAgAAKsJACANAACACAAgFgAAhAgAIBcAAIEIACAYAACCCAAgGQAAhQgAIBoAAIYIACAbAACHCAAgHoAAAAABJQAAmQwAIKcDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIR4IAACrCQAgDQAAgAgAIBYAAIQIACAXAACBCAAgGAAAgggAIBkAAIUIACAaAACGCAAgGwAAhwgAIB6AAAAAAacDAQDFBgAhqgMBAMUGACG2A0AAxwYAIcIDAQDFBgAhxQMAAPsH6wMiyANAAMcGACHiAwgAzgYAIeMDCADOBgAh5AMIAM4GACHmAwEAxQYAIecDAQDFBgAh6AMAAPoHACDpAwIA5AYAIewDAAD8B-wDIu0DAAD9BwAg7wMAAP4H7wMi8AMIAM4GACHxAyAA4QYAIfIDIADhBgAh8wMBAMUGACH0AwEAxQYAIQmnAwEAAAABxQMAAAD_AwLRAwEAAAAB4QMCAAAAAfMDAQAAAAH4AwEAAAAB-gMIAAAAAfwDCAAAAAH9AwgAAAABAwAAACcAICwAAIcMACAtAACdDAAgEAAAACcAIAgAAMwJACALAACtBwAgJQAAnQwAIKcDAQDFBgAhtgNAAMcGACHIA0AAxwYAIfMDAQDFBgAhigQIAM4GACGNBCAA4QYAIZ8EAQDFBgAhoQQAAKoHoQQiogQIAKsHACGjBAgAzgYAIaQEQADHBgAhpQRAAMcGACEOCAAAzAkAIAsAAK0HACCnAwEAxQYAIbYDQADHBgAhyANAAMcGACHzAwEAxQYAIYoECADOBgAhjQQgAOEGACGfBAEAxQYAIaEEAACqB6EEIqIECACrBwAhowQIAM4GACGkBEAAxwYAIaUEQADHBgAhAwAAACMAICwAAIkMACAtAACgDAAgFAAAACMAIAQAAJQKACAFAACVCgAgBgAAlgoAIAgAAJcKACAVAACZCgAgGAAAmgoAICUAAKAMACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIRIEAACUCgAgBQAAlQoAIAYAAJYKACAIAACXCgAgFQAAmQoAIBgAAJoKACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIRGnAwEAAAABrAMBAAAAAa4DAQAAAAG2A0AAAAAByANAAAAAAdADAQAAAAGBBAAAAIEEAoIECAAAAAGEBAAAAIQEAoUEAQAAAAGGBAAAAP8DAocEAQAAAAGIBAEAAAABiQQBAAAAAYoECAAAAAGLBAgAAAABjAQBAAAAAR4IAACsCQAgDQAA9wgAIBQAAPoIACAWAAD7CAAgFwAA-AgAIBgAAPkIACAZAAD8CAAgGgAA_QgAIB6AAAAAAacDAQAAAAGqAwEAAAABtgNAAAAAAcIDAQAAAAHFAwAAAOsDAsgDQAAAAAHiAwgAAAAB4wMIAAAAAeQDCAAAAAHmAwEAAAAB5wMBAAAAAegDAAD1CAAg6QMCAAAAAewDAAAA7AMC7QMAAPYIACDvAwAAAO8DAvADCAAAAAHxAyAAAAAB8gMgAAAAAfMDAQAAAAH0AwEAAAABAgAAABEAICwAAKIMACADAAAADwAgLAAAogwAIC0AAKYMACAgAAAADwAgCAAAqwkAIA0AAIAIACAUAACDCAAgFgAAhAgAIBcAAIEIACAYAACCCAAgGQAAhQgAIBoAAIYIACAegAAAAAElAACmDAAgpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhHggAAKsJACANAACACAAgFAAAgwgAIBYAAIQIACAXAACBCAAgGAAAgggAIBkAAIUIACAaAACGCAAgHoAAAAABpwMBAMUGACGqAwEAxQYAIbYDQADHBgAhwgMBAMUGACHFAwAA-wfrAyLIA0AAxwYAIeIDCADOBgAh4wMIAM4GACHkAwgAzgYAIeYDAQDFBgAh5wMBAMUGACHoAwAA-gcAIOkDAgDkBgAh7AMAAPwH7AMi7QMAAP0HACDvAwAA_gfvAyLwAwgAzgYAIfEDIADhBgAh8gMgAOEGACHzAwEAxQYAIfQDAQDFBgAhGKcDAQAAAAGqAwEAAAABtgNAAAAAAcgDQAAAAAHRAwEAAAAB5gMBAAAAAY0EIAAAAAGOBAEAAAABjwQBAAAAAZAEAQAAAAGRBAEAAAABkgQBAAAAAZMEAQAAAAGUBAEAAAABlQQAAOgGACCWBAEAAAABlwQBAAAAAZgEAQAAAAGZBAEAAAABmgQBAAAAAZsEAADpBgAgnAQBAAAAAZ0EAQAAAAGeBAIAAAABAwAAACMAICwAALgLACAtAACqDAAgFAAAACMAIAQAAJQKACAFAACVCgAgBgAAlgoAIBEAAJgKACAVAACZCgAgGAAAmgoAICUAAKoMACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIRIEAACUCgAgBQAAlQoAIAYAAJYKACARAACYCgAgFQAAmQoAIBgAAJoKACCnAwEAxQYAIa0DAQDFBgAhtgNAAMcGACHCAwEAxQYAIcUDAACTCrwEIsgDQADHBgAh2AMgAOEGACHZA0AAngkAIeUDAQDGBgAhuAQgAOEGACG6BAAAkgq6BCK8BCAA4QYAIQEDAAIIBAYDBQoEBgwBCA4FDAAcEWwLFW4RGG8UAQMAAgEDAAIJBwACCxIGDAAbFFQKGWEMGmIVG2QWHlgYH2MLCggABQwAFw0ABxRCChZDEBceCRhBFBlEDRpIFRtMFgQJFAcKFwcLGAYMAAgCChkACxoABAwAEw4ABhQiChY4EAQIAAUOAAYSAAsTNAkFAyQCCCUFDAAPDyYKECgMBAgABQssDQwADhEwCwIOAAYQAAwCCzEAETIAAQ8zAAMOAAYTOwkVABEDAwACDAASDzkQAQ86AAIUPAAWPQACAwACDgAGAggABQ4ABgIIAAUOAAYHFE8AFlAAF00AGE4AGVEAGlIAG1MAAwhZBQwAGh1dGQEcABgBHV4ABwtlABRmABloABppABtrAB5nAB9qAAQEcAAFcQARcgAYcwAAAQMAAgEDAAIDDAAhMgAiMwAjAAAAAwwAITIAIjMAIwEIlAEFAQiaAQUDDAAoMgApMwAqAAAAAwwAKDIAKTMAKgEcABgBHAAYAwwALzIAMDMAMQAAAAMMAC8yADAzADEAAAMMADYyADczADgAAAADDAA2MgA3MwA4AQMAAgEDAAIDDAA9MgA-MwA_AAAAAwwAPTIAPjMAPwEDAAIBAwACAwwARDIARTMARgAAAAMMAEQyAEUzAEYAAAADDABMMgBNMwBOAAAAAwwATDIATTMATgEDAAIBAwACAwwAUzIAVDMAVQAAAAMMAFMyAFQzAFUDDgAGE7cCCRUAEQMOAAYTvQIJFQARBQwAWjIAXTMAXrQBAFu1AQBcAAAAAAAFDABaMgBdMwBetAEAW7UBAFwBCc8CBwEJ1QIHAwwAYzIAZDMAZQAAAAMMAGMyAGQzAGUBCAAFAQgABQUMAGoyAG0zAG60AQBrtQEAbAAAAAAABQwAajIAbTMAbrQBAGu1AQBsAg4ABhAADAIOAAYQAAwDDABzMgB0MwB1AAAAAwwAczIAdDMAdQAAAAMMAHsyAHwzAH0AAAADDAB7MgB8MwB9AggABQ4ABgIIAAUOAAYFDACCATIAhQEzAIYBtAEAgwG1AQCEAQAAAAAABQwAggEyAIUBMwCGAbQBAIMBtQEAhAEDA8IDAgjDAwUQxAMMAwPKAwIIywMFEMwDDAUMAIsBMgCOATMAjwG0AQCMAbUBAI0BAAAAAAAFDACLATIAjgEzAI8BtAEAjAG1AQCNAQQIAAUOAAYSAAsT3gMJBAgABQ4ABhIACxPkAwkFDACUATIAlwEzAJgBtAEAlQG1AQCWAQAAAAAABQwAlAEyAJcBMwCYAbQBAJUBtQEAlgECCAAFDgAGAggABQ4ABgUMAJ0BMgCgATMAoQG0AQCeAbUBAJ8BAAAAAAAFDACdATIAoAEzAKEBtAEAngG1AQCfAQIIAAUNAAcCCAAFDQAHBQwApgEyAKkBMwCqAbQBAKcBtQEAqAEAAAAAAAUMAKYBMgCpATMAqgG0AQCnAbUBAKgBAQ4ABgEOAAYFDACvATIAsgEzALMBtAEAsAG1AQCxAQAAAAAABQwArwEyALIBMwCzAbQBALABtQEAsQEAAAMMALgBMgC5ATMAugEAAAADDAC4ATIAuQEzALoBAgMAAg4ABgIDAAIOAAYFDAC_ATIAwgEzAMMBtAEAwAG1AQDBAQAAAAAABQwAvwEyAMIBMwDDAbQBAMABtQEAwQEAAAAFDADJATIAzAEzAM0BtAEAygG1AQDLAQAAAAAABQwAyQEyAMwBMwDNAbQBAMoBtQEAywEBBwACAQcAAgUMANIBMgDVATMA1gG0AQDTAbUBANQBAAAAAAAFDADSATIA1QEzANYBtAEA0wG1AQDUAQAAAAMMANwBMgDdATMA3gEAAAADDADcATIA3QEzAN4BIAIBIXQBInYBI3cBJHgBJnoBJ3wdKH0eKX8BKoEBHSuCAR8ugwEBL4QBATCFAR00iAEgNYkBJDaKARg3iwEYOIwBGDmNARg6jgEYO5ABGDySAR09kwElPpYBGD-YAR1AmQEmQZsBGEKcARhDnQEdRKABJ0WhAStGogEZR6MBGUikARlJpQEZSqYBGUuoARlMqgEdTasBLE6tARlPrwEdULABLVGxARlSsgEZU7MBHVS2AS5VtwEyVrkBAle6AQJYvAECWb0BAlq-AQJbwAECXMIBHV3DATNexQECX8cBHWDIATRhyQECYsoBAmPLAR1kzgE1Zc8BOWbQAQNn0QEDaNIBA2nTAQNq1AEDa9YBA2zYAR1t2QE6btsBA2_dAR1w3gE7cd8BA3LgAQNz4QEddOQBPHXlAUB25gEEd-cBBHjoAQR56QEEeuoBBHvsAQR87gEdfe8BQX7xAQR_8wEdgAH0AUKBAfUBBIIB9gEEgwH3AR2EAfoBQ4UB-wFHhgH9AUiHAf4BSIgBgQJIiQGCAkiKAYMCSIsBhQJIjAGHAh2NAYgCSY4BigJIjwGMAh2QAY0CSpEBjgJIkgGPAkiTAZACHZQBkwJLlQGUAk-WAZYCEZcBlwIRmAGZAhGZAZoCEZoBmwIRmwGdAhGcAZ8CHZ0BoAJQngGiAhGfAaQCHaABpQJRoQGmAhGiAacCEaMBqAIdpAGrAlKlAawCVqYBrQIQpwGuAhCoAa8CEKkBsAIQqgGxAhCrAbMCEKwBtQIdrQG2AleuAbkCEK8BuwIdsAG8AlixAb4CELIBvwIQswHAAh22AcMCWbcBxAJfuAHFAge5AcYCB7oBxwIHuwHIAge8AckCB70BywIHvgHNAh2_Ac4CYMAB0QIHwQHTAh3CAdQCYcMB1gIHxAHXAgfFAdgCHcYB2wJixwHcAmbIAd0CDMkB3gIMygHfAgzLAeACDMwB4QIMzQHjAgzOAeUCHc8B5gJn0AHoAgzRAeoCHdIB6wJo0wHsAgzUAe0CDNUB7gId1gHxAmnXAfICb9gB8wIN2QH0Ag3aAfUCDdsB9gIN3AH3Ag3dAfkCDd4B-wId3wH8AnDgAf4CDeEBgAMd4gGBA3HjAYIDDeQBgwMN5QGEAx3mAYcDcucBiAN26AGKA3fpAYsDd-oBjgN36wGPA3fsAZADd-0BkgN37gGUAx3vAZUDePABlwN38QGZAx3yAZoDefMBmwN39AGcA3f1AZ0DHfYBoAN69wGhA374AaIDFvkBowMW-gGkAxb7AaUDFvwBpgMW_QGoAxb-AaoDHf8BqwN_gAKtAxaBAq8DHYICsAOAAYMCsQMWhAKyAxaFArMDHYYCtgOBAYcCtwOHAYgCuAMLiQK5AwuKAroDC4sCuwMLjAK8AwuNAr4DC44CwAMdjwLBA4gBkALGAwuRAsgDHZICyQOJAZMCzQMLlALOAwuVAs8DHZYC0gOKAZcC0wOQAZgC1AMKmQLVAwqaAtYDCpsC1wMKnALYAwqdAtoDCp4C3AMdnwLdA5EBoALgAwqhAuIDHaIC4wOSAaMC5QMKpALmAwqlAucDHaYC6gOTAacC6wOZAagC7AMVqQLtAxWqAu4DFasC7wMVrALwAxWtAvIDFa4C9AMdrwL1A5oBsAL3AxWxAvkDHbIC-gObAbMC-wMVtAL8AxW1Av0DHbYCgAScAbcCgQSiAbgCggQGuQKDBAa6AoQEBrsChQQGvAKGBAa9AogEBr4CigQdvwKLBKMBwAKNBAbBAo8EHcICkASkAcMCkQQGxAKSBAbFApMEHcYClgSlAccClwSrAcgCmAQJyQKZBAnKApoECcsCmwQJzAKcBAnNAp4ECc4CoAQdzwKhBKwB0AKjBAnRAqUEHdICpgStAdMCpwQJ1AKoBAnVAqkEHdYCrASuAdcCrQS0AdgCrwS1AdkCsAS1AdoCswS1AdsCtAS1AdwCtQS1Ad0CtwS1Ad4CuQQd3wK6BLYB4AK7BLUB4QK8BB3iAr8EtwHjAsAEuwHkAsEEFOUCwgQU5gLDBBTnAsQEFOgCxQQU6QLHBBTqAskEHesCygS8AewCzAQU7QLOBB3uAs8EvQHvAtAEFPAC0QQU8QLSBB3yAtUEvgHzAtYExAH0AtgExQH1AtkExQH2AtwExQH3At0ExQH4At4ExQH5AuAExQH6AuIEHfsC4wTGAfwC5QTFAf0C5wQd_gLoBMcB_wLpBMUBgAPqBMUBgQPrBB2CA-4EyAGDA-8EzgGEA_EEBYUD8gQFhgP0BAWHA_UEBYgD9gQFiQP4BAWKA_oEHYsD-wTPAYwD_QQFjQP_BB2OA4AF0AGPA4EFBZADggUFkQODBR2SA4YF0QGTA4cF1wGUA4kF2AGVA4oF2AGWA40F2AGXA44F2AGYA48F2AGZA5EF2AGaA5MFHZsDlAXZAZwDlgXYAZ0DmAUdngOZBdoBnwOaBdgBoAObBdgBoQOcBR2iA58F2wGjA6AF3wE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AdminScalarFieldEnum: () => AdminScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AttributeScalarFieldEnum: () => AttributeScalarFieldEnum,
  AttributeValueScalarFieldEnum: () => AttributeValueScalarFieldEnum,
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  CouponProductScalarFieldEnum: () => CouponProductScalarFieldEnum,
  CouponScalarFieldEnum: () => CouponScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DocumentEmbeddingScalarFieldEnum: () => DocumentEmbeddingScalarFieldEnum,
  HeroSliderScalarFieldEnum: () => HeroSliderScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  LandingPageScalarFieldEnum: () => LandingPageScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PosCartItemScalarFieldEnum: () => PosCartItemScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  ProductVariantScalarFieldEnum: () => ProductVariantScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  ShippingSettingScalarFieldEnum: () => ShippingSettingScalarFieldEnum,
  ShopScalarFieldEnum: () => ShopScalarFieldEnum,
  SiteSettingScalarFieldEnum: () => SiteSettingScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Admin: "Admin",
  Attribute: "Attribute",
  AttributeValue: "AttributeValue",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Cart: "Cart",
  CartItem: "CartItem",
  Category: "Category",
  Coupon: "Coupon",
  CouponProduct: "CouponProduct",
  HeroSlider: "HeroSlider",
  LandingPage: "LandingPage",
  Order: "Order",
  OrderItem: "OrderItem",
  PosCartItem: "PosCartItem",
  Product: "Product",
  ProductVariant: "ProductVariant",
  DocumentEmbedding: "DocumentEmbedding",
  Review: "Review",
  ShippingSetting: "ShippingSetting",
  Shop: "Shop",
  SiteSetting: "SiteSetting"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AdminScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  profilePhoto: "profilePhoto",
  contactNumber: "contactNumber",
  isDeleted: "isDeleted",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deletedAt",
  userId: "userId"
};
var AttributeScalarFieldEnum = {
  id: "id",
  name: "name",
  shopId: "shopId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AttributeValueScalarFieldEnum = {
  id: "id",
  value: "value",
  attributeId: "attributeId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartScalarFieldEnum = {
  id: "id",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartItemScalarFieldEnum = {
  id: "id",
  quantity: "quantity",
  cartId: "cartId",
  productId: "productId",
  productVariantId: "productVariantId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  icon: "icon",
  image: "image",
  isActive: "isActive",
  parentId: "parentId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CouponScalarFieldEnum = {
  id: "id",
  code: "code",
  discountType: "discountType",
  discountAmount: "discountAmount",
  maxDiscountAmount: "maxDiscountAmount",
  minPurchaseAmount: "minPurchaseAmount",
  startDate: "startDate",
  endDate: "endDate",
  isActive: "isActive",
  shopId: "shopId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CouponProductScalarFieldEnum = {
  id: "id",
  couponId: "couponId",
  productId: "productId"
};
var HeroSliderScalarFieldEnum = {
  id: "id",
  image: "image",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var LandingPageScalarFieldEnum = {
  id: "id",
  slug: "slug",
  isActive: "isActive",
  productId: "productId",
  shopId: "shopId",
  campaignTitle: "campaignTitle",
  campaignShortDescription: "campaignShortDescription",
  bannerImage: "bannerImage",
  regularPriceLabel: "regularPriceLabel",
  offerPriceLabel: "offerPriceLabel",
  galleryHeading: "galleryHeading",
  galleryDescription: "galleryDescription",
  galleryImages: "galleryImages",
  aboutHeading: "aboutHeading",
  aboutDescription: "aboutDescription",
  videoUrl: "videoUrl",
  descriptionTitle: "descriptionTitle",
  description: "description",
  reviewHeading: "reviewHeading",
  reviewImages: "reviewImages",
  orderFormHeading: "orderFormHeading",
  orderButtonText: "orderButtonText",
  views: "views",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  orderType: "orderType",
  totalAmount: "totalAmount",
  paymentStatus: "paymentStatus",
  paymentMethod: "paymentMethod",
  orderStatus: "orderStatus",
  fullName: "fullName",
  phone: "phone",
  address: "address",
  district: "district",
  notes: "notes",
  userId: "userId",
  shopId: "shopId",
  discountAmount: "discountAmount",
  shippingFee: "shippingFee",
  couponId: "couponId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  quantity: "quantity",
  price: "price",
  vendorEarning: "vendorEarning",
  platformEarning: "platformEarning",
  status: "status",
  orderId: "orderId",
  productId: "productId",
  productVariantId: "productVariantId",
  shopId: "shopId"
};
var PosCartItemScalarFieldEnum = {
  id: "id",
  shopId: "shopId",
  productId: "productId",
  productVariantId: "productVariantId",
  productName: "productName",
  price: "price",
  quantity: "quantity",
  combination: "combination",
  productImage: "productImage",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  shortDescription: "shortDescription",
  images: "images",
  stock: "stock",
  status: "status",
  type: "type",
  attributes: "attributes",
  purchasePrice: "purchasePrice",
  regularPrice: "regularPrice",
  sellPrice: "sellPrice",
  tags: "tags",
  vatType: "vatType",
  vatPercentage: "vatPercentage",
  freeShipping: "freeShipping",
  isFeatured: "isFeatured",
  shopId: "shopId",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductVariantScalarFieldEnum = {
  id: "id",
  productId: "productId",
  combination: "combination",
  quantity: "quantity",
  purchasePrice: "purchasePrice",
  regularPrice: "regularPrice",
  sellPrice: "sellPrice",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var DocumentEmbeddingScalarFieldEnum = {
  id: "id",
  chunkKey: "chunkKey",
  sourceType: "sourceType",
  sourceId: "sourceId",
  sourceLabel: "sourceLabel",
  content: "content",
  metadata: "metadata",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  userId: "userId",
  productId: "productId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ShippingSettingScalarFieldEnum = {
  id: "id",
  insideDhakaShippingFee: "insideDhakaShippingFee",
  outsideDhakaShippingFee: "outsideDhakaShippingFee",
  updatedAt: "updatedAt"
};
var ShopScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  logo: "logo",
  banner: "banner",
  status: "status",
  commissionRate: "commissionRate",
  vendorId: "vendorId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SiteSettingScalarFieldEnum = {
  id: "id",
  siteName: "siteName",
  tagline: "tagline",
  description: "description",
  logo: "logo",
  phone: "phone",
  email: "email",
  address: "address",
  facebook: "facebook",
  youtube: "youtube",
  instagram: "instagram",
  linkedin: "linkedin",
  tiktok: "tiktok",
  whatsapp: "whatsapp",
  copyrightText: "copyrightText",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  USER: "USER"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  PENDING: "PENDING",
  DELETED: "DELETED"
};
var ShopStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED"
};
var ProductStatus = {
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DELETED: "DELETED"
};
var OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED"
};
var OrderType = {
  ONLINE: "ONLINE",
  POS: "POS",
  LANDING_PAGE: "LANDING_PAGE"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/auth.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { bearer, emailOTP } from "better-auth/plugins";

// src/app/utils/email.ts
import ejs from "ejs";
import status2 from "http-status";
import nodemailer from "nodemailer";
import path2 from "path";
var transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  },
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT)
});
var sendEmail = async ({
  subject,
  templateData,
  templateName,
  to,
  attachments
}) => {
  try {
    const templatePath = path2.resolve(
      process.cwd(),
      `src/app/templates/${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType
      }))
    });
    console.log(`Email sent to ${to} : ${info.messageId}`);
  } catch (error) {
    console.log("Email Sending Error", error.message);
    throw new AppError_default(status2.INTERNAL_SERVER_ERROR, "Failed to send email");
  }
};

// src/app/lib/auth.ts
var adapter = new PrismaPg({ connectionString: envVars.DATABASE_URL });
var prisma = new PrismaClient({ adapter });
var auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      // callbackUrl: envVars.GOOGLE_CALLBACK_URL,
      mapProfileToUser: () => {
        return {
          role: Role.USER,
          status: UserStatus.ACTIVE,
          needPasswordChange: false,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER"
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE"
      },
      isDeleted: {
        type: "boolean",
        required: false,
        defaultValue: false
      },
      needPasswordChange: {
        type: "boolean",
        required: false,
        defaultValue: false
      }
    }
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (!user) {
            console.error(
              `User with email ${email} not found. Cannot send verification OTP.`
            );
            return;
          }
          if (user && user.role === Role.SUPER_ADMIN) {
            console.log(
              `User with email ${email} is a super admin. Skipping sending verification OTP.`
            );
            return;
          }
          if (user && !user.emailVerified) {
            sendEmail({
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user) {
            sendEmail({
              to: email,
              subject: "Password Reset OTP",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        }
      },
      expiresIn: 2 * 60,
      // 2 minutes in seconds
      otpLength: 6
    })
  ],
  session: {
    expiresIn: 60 * 60 * 60 * 24,
    // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24,
    // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24
      // 1 day in seconds
    }
  },
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:5000",
    envVars.FRONTEND_URL
  ],
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          path: "/"
        }
      }
    }
  }
});

// src/app/routes/index.ts
import { Router as Router16 } from "express";

// src/app/module/auth/auth.router.ts
import { Router } from "express";

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

// src/app/module/auth/auth.service.ts
import status3 from "http-status";

// src/app/lib/prisma.ts
import { PrismaPg as PrismaPg2 } from "@prisma/adapter-pg";
var connectionString = envVars.DATABASE_URL;
var adapter2 = new PrismaPg2({ connectionString });
var prisma2 = new PrismaClient({ adapter: adapter2 });

// src/app/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //7d
    maxAge: 60 * 60 * 24 * 1e3 * 7
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie
};

// src/app/module/auth/auth.service.ts
var registerUser = async (payload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
      //default values
      // needsPasswordChange: false,
      // role: Role.USER
    }
  });
  if (!data.user) {
    throw new AppError_default(status3.BAD_REQUEST, "Failed to register user");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError_default(status3.FORBIDDEN, "User is blocked");
  }
  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError_default(status3.NOT_FOUND, "User is deleted");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (user) => {
  const isUserExists = await prisma2.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var getNewToken = async (refreshToken, sessionToken) => {
  if (!sessionToken) {
    throw new AppError_default(status3.UNAUTHORIZED, "Session token is missing");
  }
  const isSessionTokenExists = await prisma2.session.findUnique({
    where: {
      token: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError_default(status3.UNAUTHORIZED, "Invalid session token");
  }
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET
  );
  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError_default(status3.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const newAccessToken = tokenUtils.getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const newRefreshToken = tokenUtils.getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const { token } = await prisma2.session.update({
    where: {
      token: sessionToken
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1e3),
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token
  };
};
var changePassword = async (payload, sessionToken) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!session) {
    throw new AppError_default(status3.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (session.user.needPasswordChange) {
    await prisma2.user.update({
      where: {
        id: session.user.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  return {
    ...result,
    accessToken,
    refreshToken
  };
};
var logoutUser = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};
var verifyEmail = async (email, otp) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp
    }
  });
  if (result.status && !result.user.emailVerified) {
    await prisma2.user.update({
      where: {
        email
      },
      data: {
        emailVerified: true
      }
    });
  }
};
var forgetPassword = async (email) => {
  const isUserExist = await prisma2.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status3.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
};
var resetPassword = async (email, otp, newPassword) => {
  const isUserExist = await prisma2.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status3.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  if (isUserExist.needPasswordChange) {
    await prisma2.user.update({
      where: {
        id: isUserExist.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  await prisma2.session.deleteMany({
    where: {
      userId: isUserExist.id
    }
  });
};
var googleLoginSuccess = async (session) => {
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  return {
    accessToken,
    refreshToken
  };
};
var updateProfile = async (user, payload) => {
  const isUserExists = await prisma2.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError_default(status3.NOT_FOUND, "User not found");
  }
  const result = await prisma2.user.update({
    where: {
      id: user.userId
    },
    data: payload
  });
  return result;
};
var AuthService = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logoutUser,
  googleLoginSuccess,
  verifyEmail,
  forgetPassword,
  resetPassword,
  updateProfile
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data, meta } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/app/module/auth/auth.controller.ts
import status4 from "http-status";
var import_ms = __toESM(require_ms(), 1);
var registerUser2 = catchAsync(async (req, res) => {
  const maxAge = (0, import_ms.default)(envVars.ACCESS_TOKEN_EXPIRES_IN);
  console.log({ maxAge });
  const payload = req.body;
  console.log(payload);
  const result = await AuthService.registerUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status4.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  console.log({ user });
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var getNewToken2 = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  if (!refreshToken) {
    throw new AppError_default(status4.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await AuthService.getNewToken(
    refreshToken,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken
    }
  });
});
var changePassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.changePassword(
    payload,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "Password changed successfully",
    data: result
  });
});
var logoutUser2 = catchAsync(async (req, res) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);
  CookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "User logged out successfully",
    data: result
  });
});
var verifyEmail2 = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  await AuthService.verifyEmail(email, otp);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "Email verified successfully"
  });
});
var forgetPassword2 = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthService.forgetPassword(email);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "Password reset OTP sent to email successfully"
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await AuthService.resetPassword(email, otp, newPassword);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "Password reset successfully"
  });
});
var googleLogin = catchAsync((req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const encodedRedirectPath = encodeURIComponent(redirectPath);
  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
  res.render("googleRedirect", {
    callbackURL,
    betterAuthUrl: envVars.BETTER_AUTH_URL
  });
});
var googleLoginSuccess2 = catchAsync(async (req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`
    }
  });
  if (!session) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
  }
  if (session && !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
  }
  const result = await AuthService.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
  res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});
var handleOAuthError = catchAsync((req, res) => {
  const error = req.query.error || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});
var updateProfile2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.file?.path ? { ...req.body, image: req.file.path } : req.body;
  const result = await AuthService.updateProfile(user, payload);
  sendResponse(res, {
    httpStatusCode: status4.OK,
    success: true,
    message: "User profile updated successfully",
    data: result
  });
});
var AuthController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getMe: getMe2,
  getNewToken: getNewToken2,
  changePassword: changePassword2,
  logoutUser: logoutUser2,
  googleLogin,
  googleLoginSuccess: googleLoginSuccess2,
  handleOAuthError,
  verifyEmail: verifyEmail2,
  forgetPassword: forgetPassword2,
  resetPassword: resetPassword2,
  updateProfile: updateProfile2
};

// src/app/middleware/checkAuth.ts
import status5 from "http-status";
var checkAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = CookieUtils.getCookie(
      req,
      "better-auth.session_token"
    );
    if (!sessionToken) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! No session token provided."
      );
    }
    if (sessionToken) {
      const sessionExists = await prisma2.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: /* @__PURE__ */ new Date()
          }
        },
        include: {
          user: true
        }
      });
      if (sessionExists && sessionExists.user) {
        const user = sessionExists.user;
        const now = /* @__PURE__ */ new Date();
        const expiresAt = new Date(sessionExists.expiresAt);
        const createdAt = new Date(sessionExists.createdAt);
        const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
        const timeRemaining = expiresAt.getTime() - now.getTime();
        const percentRemaining = timeRemaining / sessionLifeTime * 100;
        if (percentRemaining < 20) {
          res.setHeader("X-Session-Refresh", "true");
          res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
          res.setHeader("X-Time-Remaining", timeRemaining.toString());
          console.log("Session Expiring Soon!!");
        }
        if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
          throw new AppError_default(
            status5.UNAUTHORIZED,
            "Unauthorized access! User is not active."
          );
        }
        if (user.isDeleted) {
          throw new AppError_default(
            status5.UNAUTHORIZED,
            "Unauthorized access! User is deleted."
          );
        }
        if (authRoles.length > 0 && !authRoles.includes(user.role)) {
          throw new AppError_default(
            status5.FORBIDDEN,
            "Forbidden access! You do not have permission to access this resource."
          );
        }
        req.user = {
          userId: user.id,
          role: user.role,
          email: user.email
        };
      }
      const accessToken2 = CookieUtils.getCookie(req, "accessToken");
      if (!accessToken2) {
        throw new AppError_default(
          status5.UNAUTHORIZED,
          "Unauthorized access! No access token provided."
        );
      }
    }
    const accessToken = CookieUtils.getCookie(req, "accessToken");
    if (!accessToken) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! No access token provided."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      envVars.ACCESS_TOKEN_SECRET
    );
    if (!verifiedToken.success) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! Invalid access token."
      );
    }
    if (!req.user) {
      req.user = {
        userId: verifiedToken.data.userId,
        role: verifiedToken.data.role,
        email: verifiedToken.data.email
      };
    }
    if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role)) {
      throw new AppError_default(
        status5.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

// src/app/config/multer.config.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// src/app/config/cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import status6 from "http-status";
cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
});
var deleteFileFromCloudinary = async (url) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image"
      });
      console.log(`File ${publicId} deleted from cloudinary`);
    }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new AppError_default(
      status6.INTERNAL_SERVER_ERROR,
      "Failed to delete file from Cloudinary"
    );
  }
};
var cloudinaryUpload = cloudinary;

// src/app/config/multer.config.ts
var storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop()?.toLocaleLowerCase();
    const fileNameWithoutExtension = originalName.split(".").slice(0, -1).join(".").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtension;
    const folder = extension === "pdf" ? "pdfs" : "images";
    return {
      folder: `nextbazar/${folder}`,
      public_id: uniqueName,
      resource_type: "auto"
    };
  }
});
var multerUpload = multer({ storage });

// src/app/module/auth/auth.router.ts
var router = Router();
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get(
  "/me",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER, Role.SELLER),
  AuthController.getMe
);
router.post("/refresh-token", AuthController.getNewToken);
router.post(
  "/change-password",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER, Role.SELLER),
  AuthController.changePassword
);
router.post(
  "/logout",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER, Role.SELLER),
  AuthController.logoutUser
);
router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);
router.patch(
  "/update-profile",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER, Role.SELLER),
  multerUpload.single("file"),
  AuthController.updateProfile
);
var AuthRoutes = router;

// src/app/module/category/category.route.ts
import { Router as Router2 } from "express";

// src/app/middleware/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    console.log(req.body);
    const parsedResult = zodSchema.safeParse(req.body);
    if (!parsedResult.success) {
      next(parsedResult.error);
    }
    req.body = parsedResult.data;
    next();
  };
};

// src/app/module/category/category.controller.ts
import status8 from "http-status";

// src/app/module/category/category.service.ts
import status7 from "http-status";

// src/app/utils/QueryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10
    };
    this.countQuery = {
      where: {}
    };
  }
  model;
  queryParams;
  config;
  query;
  countQuery;
  page = 1;
  limit = 10;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields;
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            if (parts.length === 2) {
              const [relation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  [nestedField]: stringFilter2
                }
              };
            } else if (parts.length === 3) {
              const [relation, nestedRelation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter2
                    }
                  }
                }
              };
            }
          }
          const stringFilter = {
            contains: searchTerm,
            mode: "insensitive"
          };
          return {
            [field]: stringFilter
          };
        }
      );
      const whereConditions = this.query.where;
      whereConditions.OR = searchConditions;
      const countWhereConditions = this.countQuery.where;
      countWhereConditions.OR = searchConditions;
    }
    return this;
  }
  filter() {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "sort",
      "fields",
      "include"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === void 0 || value === "") {
        return;
      }
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (key.includes(".")) {
        const parts = key.split(".");
        if (filterableFields && !filterableFields.includes(key)) {
          return;
        }
        if (parts.length === 2) {
          const [relation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {};
            countQueryWhere[relation] = {};
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          queryRelation[nestedField] = this.parseFilterValue(value);
          countRelation[nestedField] = this.parseFilterValue(value);
          return;
        } else if (parts.length === 3) {
          const [relation, nestedRelation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {
              some: {}
            };
            countQueryWhere[relation] = {
              some: {}
            };
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          if (!queryRelation.some) {
            queryRelation.some = {};
          }
          if (!countRelation.some) {
            countRelation.some = {};
          }
          const querySome = queryRelation.some;
          const countSome = countRelation.some;
          if (!querySome[nestedRelation]) {
            querySome[nestedRelation] = {};
          }
          if (!countSome[nestedRelation]) {
            countSome[nestedRelation] = {};
          }
          const queryNestedRelation = querySome[nestedRelation];
          const countNestedRelation = countSome[nestedRelation];
          queryNestedRelation[nestedField] = this.parseFilterValue(value);
          countNestedRelation[nestedField] = this.parseFilterValue(value);
          return;
        }
      }
      if (!isAllowedField) {
        return;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queryWhere[key] = this.parseRangeFilter(
          value
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");
      if (parts.length === 2) {
        const [relation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedField]: sortOrder
          }
        };
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedRelation]: {
              [nestedField]: sortOrder
            }
          }
        };
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};
      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (this.selectFields) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude) {
    if (this.selectFields) {
      return this;
    }
    const result = {};
    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.include;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim());
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

// src/app/utils/generateSlug.ts
var toSlug = (text) => {
  const slug = text.toLowerCase().trim().replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "").replace(/[\s_]+/g, "-").replace(/--+/g, "-").replace(/^-+|-+$/g, "");
  return slug || `item-${Date.now().toString(36)}`;
};
var generateUniqueSlug = async (prisma3, name, model, excludeId) => {
  const baseSlug = toSlug(name);
  let slug = baseSlug;
  let counter = 2;
  while (true) {
    let existing = null;
    if (model === "product") {
      existing = await prisma3.product.findUnique({
        where: { slug },
        select: { id: true }
      });
    } else if (model === "category") {
      existing = await prisma3.category.findUnique({
        where: { slug },
        select: { id: true }
      });
    } else if (model === "landingPage") {
      existing = await prisma3.landingPage.findUnique({
        where: { slug },
        select: { id: true }
      });
    }
    if (!existing) break;
    if (excludeId && existing.id === excludeId) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

// src/app/module/category/category.service.ts
var createCategory = async (payload) => {
  if (payload.parentId) {
    const parent = await prisma2.category.findUnique({
      where: { id: payload.parentId }
    });
    if (!parent) {
      throw new AppError_default(status7.NOT_FOUND, "Parent category not found");
    }
  }
  const slug = await generateUniqueSlug(prisma2, payload.name, "category");
  const category = await prisma2.category.create({
    data: { ...payload, slug },
    include: { parent: true, subcategories: true }
  });
  return category;
};
var getAllCategories = async (queryParams) => {
  const result = await new QueryBuilder(prisma2.category, queryParams, {
    searchableFields: ["name", "slug"],
    filterableFields: ["isActive", "parentId"]
  }).search().filter().sort().paginate().include({ parent: true, subcategories: true }).execute();
  return result;
};
var getAllSubcategories = async (parentId, queryParams) => {
  const parent = await prisma2.category.findUnique({ where: { id: parentId } });
  if (!parent) {
    throw new AppError_default(status7.NOT_FOUND, "Parent category not found");
  }
  const result = await new QueryBuilder(prisma2.category, queryParams, {
    searchableFields: ["name", "slug"]
  }).search().filter().where({ parentId }).sort().paginate().execute();
  return result;
};
var getCategoryById = async (id) => {
  const category = await prisma2.category.findUnique({
    where: { id },
    include: { parent: true, subcategories: true }
  });
  if (!category) {
    throw new AppError_default(status7.NOT_FOUND, "Category not found");
  }
  return category;
};
var updateCategory = async (id, payload) => {
  const existing = await prisma2.category.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError_default(status7.NOT_FOUND, "Category not found");
  }
  let slug;
  if (payload.name && payload.name !== existing.name) {
    slug = await generateUniqueSlug(prisma2, payload.name, "category", id);
  }
  const updated = await prisma2.category.update({
    where: { id },
    data: { ...payload, ...slug && { slug } },
    include: { parent: true, subcategories: true }
  });
  return updated;
};
var deleteCategory = async (id) => {
  const existing = await prisma2.category.findUnique({
    where: { id },
    include: { subcategories: true, products: { take: 1 } }
  });
  if (!existing) {
    throw new AppError_default(status7.NOT_FOUND, "Category not found");
  }
  if (existing.products.length > 0) {
    throw new AppError_default(
      status7.BAD_REQUEST,
      "Cannot delete category with associated products"
    );
  }
  if (existing.subcategories.length > 0) {
    throw new AppError_default(
      status7.BAD_REQUEST,
      "Cannot delete category that has subcategories. Delete subcategories first."
    );
  }
  await prisma2.category.delete({ where: { id } });
  return { message: "Category deleted successfully" };
};
var CategoryService = {
  createCategory,
  getAllCategories,
  getAllSubcategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// src/app/module/category/category.controller.ts
var createCategory2 = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.image && files.image[0]) {
      payload.image = files.image[0].path;
    }
    if (files.icon && files.icon[0]) {
      payload.icon = files.icon[0].path;
    }
  }
  const result = await CategoryService.createCategory(payload);
  sendResponse(res, {
    httpStatusCode: status8.CREATED,
    success: true,
    message: "Category created successfully",
    data: result
  });
});
var getAllCategories2 = catchAsync(async (req, res) => {
  const { data, meta } = await CategoryService.getAllCategories(
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Categories fetched successfully",
    data,
    meta
  });
});
var getAllSubcategories2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { data, meta } = await CategoryService.getAllSubcategories(
    id,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Subcategories fetched successfully",
    data,
    meta
  });
});
var getCategoryById2 = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategoryById(req.params.id);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Category fetched successfully",
    data: result
  });
});
var updateCategory2 = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.image && files.image[0]) {
      payload.image = files.image[0].path;
    }
    if (files.icon && files.icon[0]) {
      payload.icon = files.icon[0].path;
    }
  }
  const result = await CategoryService.updateCategory(
    req.params.id,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Category updated successfully",
    data: result
  });
});
var deleteCategory2 = catchAsync(async (req, res) => {
  const result = await CategoryService.deleteCategory(req.params.id);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getAllSubcategories: getAllSubcategories2,
  getCategoryById: getCategoryById2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/app/module/category/category.validation.ts
import z from "zod";
var createCategoryZodSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().nullable().optional()
  // for subcategory
});
var updateCategoryZodSchema = z.object({
  name: z.string().min(1).optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  parentId: z.string().nullable().optional()
});

// src/app/module/category/category.route.ts
var router2 = Router2();
router2.get("/", CategoryController.getAllCategories);
router2.get("/:id", CategoryController.getCategoryById);
router2.get("/:id/subcategories", CategoryController.getAllSubcategories);
router2.post(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 }
  ]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createCategoryZodSchema),
  CategoryController.createCategory
);
router2.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 }
  ]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateCategoryZodSchema),
  CategoryController.updateCategory
);
router2.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  CategoryController.deleteCategory
);
var CategoryRoutes = router2;

// src/app/module/shop/shop.route.ts
import { Router as Router3 } from "express";

// src/app/module/shop/shop.controller.ts
import status10 from "http-status";

// src/app/module/shop/shop.service.ts
import status9 from "http-status";
var createShop = async (vendorId, payload) => {
  const existingShop = await prisma2.shop.findUnique({
    where: { vendorId }
  });
  if (existingShop) {
    throw new AppError_default(status9.BAD_REQUEST, "You already have a shop registered");
  }
  const shop = await prisma2.shop.create({
    data: {
      ...payload,
      vendorId,
      status: ShopStatus.PENDING
      // Always pending initially
    }
  });
  return shop;
};
var getAllShops = async (queryParams) => {
  const shopQuery = new QueryBuilder(prisma2.shop, queryParams, {
    searchableFields: ["name"],
    filterableFields: ["status"]
  }).include({
    vendor: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    }
  }).search().filter().sort().paginate();
  const result = await shopQuery.execute();
  return result;
};
var getShopById = async (id) => {
  const shop = await prisma2.shop.findUnique({
    where: { id },
    include: {
      vendor: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
  if (!shop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  return shop;
};
var getMyShop = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({
    where: { vendorId }
  });
  if (!shop) {
    throw new AppError_default(status9.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var updateShop = async (id, vendorId, payload) => {
  const shop = await prisma2.shop.findUnique({
    where: { id }
  });
  if (!shop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  if (shop.vendorId !== vendorId) {
    throw new AppError_default(status9.FORBIDDEN, "You are not the owner of this shop");
  }
  const updatedShop = await prisma2.shop.update({
    where: { id },
    data: payload
  });
  return updatedShop;
};
var changeShopStatus = async (id, shopStatus) => {
  const shop = await prisma2.shop.findUnique({
    where: { id }
  });
  if (!shop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  const updatedShop = await prisma2.shop.update({
    where: { id },
    data: { status: shopStatus }
  });
  return updatedShop;
};
var ShopService = {
  createShop,
  getAllShops,
  getShopById,
  getMyShop,
  updateShop,
  changeShopStatus
};

// src/app/module/shop/shop.controller.ts
var createShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.logo && files.logo[0]) {
      payload.logo = files.logo[0].path;
    }
    if (files.banner && files.banner[0]) {
      payload.banner = files.banner[0].path;
    }
  }
  const result = await ShopService.createShop(user.userId, payload);
  sendResponse(res, {
    httpStatusCode: status10.CREATED,
    success: true,
    message: "Shop registered successfully and is pending approval",
    data: result
  });
});
var getAllShops2 = catchAsync(async (req, res) => {
  const { data, meta } = await ShopService.getAllShops(
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shops fetched successfully",
    data,
    meta
  });
});
var getShopById2 = catchAsync(async (req, res) => {
  const result = await ShopService.getShopById(req.params.id);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop details fetched successfully",
    data: result
  });
});
var getMyShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ShopService.getMyShop(user.userId);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "My shop details fetched successfully",
    data: result
  });
});
var updateShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.logo && files.logo[0]) {
      payload.logo = files.logo[0].path;
    }
    if (files.banner && files.banner[0]) {
      payload.banner = files.banner[0].path;
    }
  }
  const result = await ShopService.updateShop(
    id,
    user.userId,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop updated successfully",
    data: result
  });
});
var changeShopStatus2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status: shopStatus } = req.body;
  const result = await ShopService.changeShopStatus(
    id,
    shopStatus
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop status updated successfully",
    data: result
  });
});
var ShopController = {
  createShop: createShop2,
  getAllShops: getAllShops2,
  getShopById: getShopById2,
  getMyShop: getMyShop2,
  updateShop: updateShop2,
  changeShopStatus: changeShopStatus2
};

// src/app/module/shop/shop.validation.ts
import z2 from "zod";
var createShopZodSchema = z2.object({
  name: z2.string().min(1, "Shop name is required"),
  description: z2.string().optional()
  // logo and banner will be handled via multer/cloudinary
});
var updateShopZodSchema = z2.object({
  name: z2.string().min(1).optional(),
  description: z2.string().optional(),
  status: z2.enum(["PENDING", "ACTIVE", "BLOCKED"]).optional()
});
var updateShopStatusZodSchema = z2.object({
  status: z2.enum(["PENDING", "ACTIVE", "BLOCKED"])
});

// src/app/module/shop/shop.route.ts
var router3 = Router3();
router3.post(
  "/",
  checkAuth(Role.SELLER, Role.USER),
  multerUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createShopZodSchema),
  ShopController.createShop
);
router3.get(
  "/my-shop",
  checkAuth(Role.SELLER),
  ShopController.getMyShop
);
router3.get("/:id", ShopController.getShopById);
router3.patch(
  "/:id",
  checkAuth(Role.SELLER),
  multerUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateShopZodSchema),
  ShopController.updateShop
);
router3.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ShopController.getAllShops
);
router3.patch(
  "/:id/status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateShopStatusZodSchema),
  ShopController.changeShopStatus
);
var ShopRoutes = router3;

// src/app/module/product/product.route.ts
import { Router as Router4 } from "express";

// src/app/module/product/product.controller.ts
import status12 from "http-status";

// src/app/module/product/product.service.ts
import status11 from "http-status";
var createProduct = async (vendorId, payload) => {
  const shop = await prisma2.shop.findUnique({
    where: { id: payload.shopId }
  });
  if (!shop || shop.vendorId !== vendorId) {
    throw new AppError_default(status11.FORBIDDEN, "Unauthorized: This shop does not belong to you");
  }
  const category = await prisma2.category.findUnique({
    where: { id: payload.categoryId }
  });
  if (!category) {
    throw new AppError_default(status11.NOT_FOUND, "Category not found");
  }
  const slug = await generateUniqueSlug(prisma2, payload.name, "product");
  const { variants, ...productData } = payload;
  const product = await prisma2.product.create({
    data: {
      ...productData,
      slug,
      status: ProductStatus.ACTIVE,
      ...variants && variants.length > 0 && {
        variants: {
          create: variants
        }
      }
    },
    include: {
      category: true,
      shop: true,
      variants: true
    }
  });
  return product;
};
var getAllProducts = async (queryParams) => {
  const { minPrice, maxPrice, categoryId, sortBy, ...remainingQuery } = queryParams;
  const filter = { ...remainingQuery };
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
  const productQuery = new QueryBuilder(prisma2.product, filter, {
    searchableFields: ["name", "description"],
    filterableFields: ["categoryId", "shopId", "status", "sellPrice"]
  }).search().filter().sort().paginate().include({
    category: true,
    shop: true,
    variants: true
  });
  const result = await productQuery.execute();
  return result;
};
var getProductById = async (id) => {
  const product = await prisma2.product.findUnique({
    where: { id },
    include: {
      category: true,
      shop: true,
      variants: true,
      reviews: {
        include: {
          user: true
        }
      }
    }
  });
  if (!product) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  return product;
};
var getProductBySlug = async (slug) => {
  const product = await prisma2.product.findUnique({
    where: { slug },
    include: {
      category: true,
      shop: true,
      variants: true,
      reviews: true
    }
  });
  if (!product) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  return product;
};
var updateProduct = async (id, vendorId, payload) => {
  const existingProduct = await prisma2.product.findUnique({
    where: { id },
    include: { shop: true }
  });
  if (!existingProduct) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  if (existingProduct.shop.vendorId !== vendorId) {
    throw new AppError_default(status11.FORBIDDEN, "Unauthorized: You are not the owner of this product");
  }
  let slug;
  if (payload.name && payload.name !== existingProduct.name) {
    slug = await generateUniqueSlug(prisma2, payload.name, "product", id);
  }
  const { variants, ...productData } = payload;
  const updatedProduct = await prisma2.$transaction(async (tx) => {
    if (variants !== void 0) {
      await tx.productVariant.deleteMany({
        where: { productId: id }
      });
      if (variants && variants.length > 0) {
        await tx.productVariant.createMany({
          data: variants.map((v) => ({
            ...v,
            productId: id
          }))
        });
      }
    }
    return await tx.product.update({
      where: { id },
      data: {
        ...productData,
        ...slug && { slug }
      },
      include: {
        category: true,
        shop: true,
        variants: true
      }
    });
  });
  return updatedProduct;
};
var getProductVariants = async (productId) => {
  const product = await prisma2.product.findUnique({
    where: { id: productId },
    include: { variants: true }
  });
  if (!product) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  return product.variants;
};
var uploadVariantImage = async (productId, variantId, vendorId, imageUrl) => {
  const product = await prisma2.product.findUnique({
    where: { id: productId },
    include: { shop: true }
  });
  if (!product) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  if (product.shop.vendorId !== vendorId) {
    throw new AppError_default(status11.FORBIDDEN, "Unauthorized: This product does not belong to you");
  }
  const variant = await prisma2.productVariant.findUnique({
    where: { id: variantId }
  });
  if (!variant || variant.productId !== productId) {
    throw new AppError_default(status11.NOT_FOUND, "Variant not found for this product");
  }
  const updated = await prisma2.productVariant.update({
    where: { id: variantId },
    data: { image: imageUrl }
  });
  return updated;
};
var deleteProduct = async (id, vendorId) => {
  const product = await prisma2.product.findUnique({
    where: { id },
    include: { shop: true }
  });
  if (!product) {
    throw new AppError_default(status11.NOT_FOUND, "Product not found");
  }
  if (product.shop.vendorId !== vendorId) {
    throw new AppError_default(status11.FORBIDDEN, "Unauthorized");
  }
  await prisma2.product.update({
    where: { id },
    data: { status: ProductStatus.DELETED }
  });
  return { message: "Product deleted successfully" };
};
var ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getProductVariants,
  uploadVariantImage
};

// src/app/module/product/product.controller.ts
var createProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = { ...req.body };
  if (req.files && Array.isArray(req.files)) {
    payload.images = req.files.map((file) => file.path);
  }
  const result = await ProductService.createProduct(user.userId, payload);
  sendResponse(res, {
    httpStatusCode: status12.CREATED,
    success: true,
    message: "Product created successfully",
    data: result
  });
});
var getAllProducts2 = catchAsync(async (req, res) => {
  const { data, meta } = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Products fetched successfully",
    data,
    meta
  });
});
var getProductById2 = catchAsync(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Product fetched successfully",
    data: result
  });
});
var getProductBySlug2 = catchAsync(async (req, res) => {
  const result = await ProductService.getProductBySlug(req.params.slug);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Product fetched successfully",
    data: result
  });
});
var updateProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const payload = { ...req.body };
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    payload.images = req.files.map((file) => file.path);
  }
  const result = await ProductService.updateProduct(id, user.userId, payload);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Product updated successfully",
    data: result
  });
});
var deleteProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id, user.userId);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var getProductVariants2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getProductVariants(id);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Product variants fetched successfully",
    data: result
  });
});
var uploadVariantImage2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { productId, variantId } = req.params;
  if (!req.file) {
    return sendResponse(res, {
      httpStatusCode: status12.BAD_REQUEST,
      success: false,
      message: "No image file uploaded",
      data: null
    });
  }
  const imageUrl = req.file.path;
  const result = await ProductService.uploadVariantImage(
    productId,
    variantId,
    user.userId,
    imageUrl
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Variant image uploaded successfully",
    data: result
  });
});
var ProductController = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  getProductById: getProductById2,
  getProductBySlug: getProductBySlug2,
  updateProduct: updateProduct2,
  deleteProduct: deleteProduct2,
  getProductVariants: getProductVariants2,
  uploadVariantImage: uploadVariantImage2
};

// src/app/module/product/product.validation.ts
import z3 from "zod";
var variantSchema = z3.object({
  combination: z3.string().min(1, "Combination is required"),
  quantity: z3.number().int().nonnegative("Quantity cannot be negative"),
  purchasePrice: z3.number().positive("Purchase price must be positive"),
  regularPrice: z3.number().positive("Regular price must be positive"),
  sellPrice: z3.number().positive("Sell price must be positive"),
  image: z3.string().optional().nullable()
});
var createProductZodSchema = z3.object({
  name: z3.string().min(1, "Product name is required"),
  description: z3.string().min(1, "Description is required"),
  shortDescription: z3.string().min(1, "Short description is required"),
  stock: z3.number().int().nonnegative("Stock cannot be negative"),
  purchasePrice: z3.number().positive("Purchase price must be positive"),
  regularPrice: z3.number().positive("Regular price must be positive"),
  sellPrice: z3.number().positive("Sell price must be positive"),
  categoryId: z3.string().uuid("Invalid category ID"),
  shopId: z3.string().uuid("Invalid shop ID"),
  tags: z3.array(z3.string()).optional(),
  type: z3.enum(["SIMPLE", "VARIABLE"]).optional().default("SIMPLE"),
  attributes: z3.any().optional(),
  variants: z3.array(variantSchema).optional(),
  vatType: z3.enum(["INCLUDED", "EXCLUDED"]).optional().default("INCLUDED"),
  vatPercentage: z3.coerce.number().nonnegative().optional().default(0),
  freeShipping: z3.coerce.boolean().optional().default(false),
  isFeatured: z3.coerce.boolean().optional().default(false)
});
var updateProductZodSchema = z3.object({
  name: z3.string().optional(),
  description: z3.string().optional(),
  shortDescription: z3.string().optional(),
  stock: z3.number().int().nonnegative().optional(),
  purchasePrice: z3.number().positive().optional(),
  regularPrice: z3.number().positive().optional(),
  sellPrice: z3.number().positive().optional(),
  categoryId: z3.string().uuid().optional(),
  status: z3.enum(["ACTIVE", "DRAFT", "OUT_OF_STOCK", "DELETED"]).optional(),
  tags: z3.array(z3.string()).optional(),
  type: z3.enum(["SIMPLE", "VARIABLE"]).optional(),
  attributes: z3.any().optional(),
  variants: z3.array(variantSchema).optional(),
  vatType: z3.enum(["INCLUDED", "EXCLUDED"]).optional(),
  vatPercentage: z3.coerce.number().nonnegative().optional(),
  freeShipping: z3.coerce.boolean().optional(),
  isFeatured: z3.coerce.boolean().optional()
});

// src/app/module/product/product.route.ts
var router4 = Router4();
router4.get("/", ProductController.getAllProducts);
router4.get("/:id", ProductController.getProductById);
router4.get("/slug/:slug", ProductController.getProductBySlug);
router4.post(
  "/",
  checkAuth(Role.SELLER),
  multerUpload.array("images", 5),
  // allow up to 5 images
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createProductZodSchema),
  ProductController.createProduct
);
router4.patch(
  "/:id",
  checkAuth(Role.SELLER),
  multerUpload.array("images", 5),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateProductZodSchema),
  ProductController.updateProduct
);
router4.delete(
  "/:id",
  checkAuth(Role.SELLER),
  ProductController.deleteProduct
);
router4.get(
  "/:id/variants",
  ProductController.getProductVariants
);
router4.patch(
  "/:productId/variants/:variantId/image",
  checkAuth(Role.SELLER),
  multerUpload.single("image"),
  ProductController.uploadVariantImage
);
var ProductRoutes = router4;

// src/app/module/cart/cart.route.ts
import { Router as Router5 } from "express";

// src/app/module/cart/cart.controller.ts
import status14 from "http-status";

// src/app/module/cart/cart.service.ts
import status13 from "http-status";
var getCart = async (userId) => {
  let cart = await prisma2.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              shop: true
            }
          },
          productVariant: true
        }
      }
    }
  });
  if (!cart) {
    cart = await prisma2.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                shop: true
              }
            },
            productVariant: true
          }
        }
      }
    });
  }
  return cart;
};
var addToCart = async (userId, payload) => {
  const product = await prisma2.product.findUnique({
    where: { id: payload.productId },
    include: { variants: true }
  });
  if (!product) {
    throw new AppError_default(status13.NOT_FOUND, "Product not found");
  }
  if (product.type === "VARIABLE" && payload.productVariantId) {
    const variant = product.variants.find((v) => v.id === payload.productVariantId);
    if (!variant) {
      throw new AppError_default(status13.NOT_FOUND, "Product variant not found");
    }
    if (variant.quantity < payload.quantity) {
      throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock for this variation");
    }
  } else {
    if (product.stock < payload.quantity) {
      throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock");
    }
  }
  let cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma2.cart.create({ data: { userId } });
  }
  const existingItem = await prisma2.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: payload.productId,
      productVariantId: payload.productVariantId || null
    }
  });
  if (existingItem) {
    const targetQuantity = existingItem.quantity + payload.quantity;
    if (product.type === "VARIABLE" && payload.productVariantId) {
      const variant = product.variants.find((v) => v.id === payload.productVariantId);
      if (variant && variant.quantity < targetQuantity) {
        throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock for this variation");
      }
    } else {
      if (product.stock < targetQuantity) {
        throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock");
      }
    }
    return await prisma2.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: targetQuantity }
    });
  } else {
    return await prisma2.cartItem.create({
      data: {
        cartId: cart.id,
        productId: payload.productId,
        productVariantId: payload.productVariantId || null,
        quantity: payload.quantity
      }
    });
  }
};
var updateCartItemQuantity = async (userId, payload) => {
  const cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError_default(status13.NOT_FOUND, "Cart not found");
  const existingItem = await prisma2.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: payload.productId,
      productVariantId: payload.productVariantId || null
    }
  });
  if (!existingItem) throw new AppError_default(status13.NOT_FOUND, "Item not found in cart");
  if (payload.quantity <= 0) {
    return await prisma2.cartItem.delete({ where: { id: existingItem.id } });
  }
  const product = await prisma2.product.findUnique({
    where: { id: payload.productId },
    include: { variants: true }
  });
  if (product) {
    if (product.type === "VARIABLE" && payload.productVariantId) {
      const variant = product.variants.find((v) => v.id === payload.productVariantId);
      if (variant && variant.quantity < payload.quantity) {
        throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock for this variation");
      }
    } else {
      if (product.stock < payload.quantity) {
        throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock");
      }
    }
  }
  return await prisma2.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity: payload.quantity }
  });
};
var removeFromCart = async (userId, productId, productVariantId) => {
  const cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError_default(status13.NOT_FOUND, "Cart not found");
  const existingItem = await prisma2.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      productVariantId: productVariantId || null
    }
  });
  if (!existingItem) throw new AppError_default(status13.NOT_FOUND, "Item not found in cart");
  await prisma2.cartItem.delete({ where: { id: existingItem.id } });
  return { message: "Item removed from cart" };
};
var clearCart = async (userId) => {
  const cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError_default(status13.NOT_FOUND, "Cart not found");
  await prisma2.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
  return { message: "Cart cleared" };
};
var CartService = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
};

// src/app/module/cart/cart.controller.ts
var getCart2 = catchAsync(async (req, res) => {
  const result = await CartService.getCart(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Cart fetched successfully",
    data: result
  });
});
var addToCart2 = catchAsync(async (req, res) => {
  const result = await CartService.addToCart(req.user.userId, req.body);
  sendResponse(res, {
    httpStatusCode: status14.CREATED,
    success: true,
    message: "Item added to cart",
    data: result
  });
});
var updateCartItemQuantity2 = catchAsync(async (req, res) => {
  const result = await CartService.updateCartItemQuantity(
    req.user.userId,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Cart updated",
    data: result
  });
});
var removeFromCart2 = catchAsync(async (req, res) => {
  const result = await CartService.removeFromCart(
    req.user.userId,
    req.params.productId,
    req.query.productVariantId
  );
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var clearCart2 = catchAsync(async (req, res) => {
  const result = await CartService.clearCart(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var CartController = {
  getCart: getCart2,
  addToCart: addToCart2,
  updateCartItemQuantity: updateCartItemQuantity2,
  removeFromCart: removeFromCart2,
  clearCart: clearCart2
};

// src/app/module/cart/cart.validation.ts
import z4 from "zod";
var addToCartZodSchema = z4.object({
  productId: z4.string().uuid("Invalid product ID"),
  productVariantId: z4.string().uuid("Invalid product variant ID").optional().nullable(),
  quantity: z4.number().int().positive("Quantity must be at least 1")
});
var updateCartItemZodSchema = z4.object({
  productId: z4.string().uuid("Invalid product ID"),
  productVariantId: z4.string().uuid("Invalid product variant ID").optional().nullable(),
  quantity: z4.number().int().nonnegative("Quantity cannot be negative")
});

// src/app/module/cart/cart.route.ts
var router5 = Router5();
router5.use(checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN));
router5.get("/", CartController.getCart);
router5.post(
  "/add",
  validateRequest(addToCartZodSchema),
  CartController.addToCart
);
router5.patch(
  "/update",
  validateRequest(updateCartItemZodSchema),
  CartController.updateCartItemQuantity
);
router5.delete("/remove/:productId", CartController.removeFromCart);
router5.delete("/clear", CartController.clearCart);
var CartRoutes = router5;

// src/app/module/order/order.route.ts
import { Router as Router6 } from "express";

// src/app/module/order/order.controller.ts
import status16 from "http-status";

// src/app/module/order/order.service.ts
import status15 from "http-status";
var COMMISSION_RATE = 0.1;
var createOrder = async (userId, payload) => {
  let orderItemsToProcess = [];
  let isFromCart = false;
  if (payload.items && payload.items.length > 0) {
    for (const item of payload.items) {
      const product = await prisma2.product.findUnique({
        where: { id: item.productId },
        include: { variants: true }
      });
      if (!product) throw new AppError_default(status15.NOT_FOUND, `Product not found: ${item.productId}`);
      let sellPrice = product.sellPrice;
      let variant = null;
      if (product.type === "VARIABLE" && item.productVariantId) {
        variant = product.variants.find((v) => v.id === item.productVariantId);
        if (!variant) throw new AppError_default(status15.NOT_FOUND, `Product variant not found: ${item.productVariantId}`);
        sellPrice = variant.sellPrice;
      }
      orderItemsToProcess.push({
        productId: item.productId,
        productVariantId: item.productVariantId || null,
        quantity: item.quantity,
        product,
        variant,
        sellPrice
      });
    }
  } else {
    if (!userId) {
      throw new AppError_default(status15.BAD_REQUEST, "No items provided for order");
    }
    const cart = await prisma2.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true
              }
            },
            productVariant: true
          }
        }
      }
    });
    if (!cart || cart.items.length === 0) {
      throw new AppError_default(status15.BAD_REQUEST, "Your cart is empty");
    }
    orderItemsToProcess = cart.items.map((item) => {
      let sellPrice = item.product.sellPrice;
      if (item.product.type === "VARIABLE" && item.productVariant) {
        sellPrice = item.productVariant.sellPrice;
      }
      return {
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        product: item.product,
        variant: item.productVariant,
        sellPrice
      };
    });
    isFromCart = true;
  }
  return await prisma2.$transaction(async (tx) => {
    let totalAmount = 0;
    for (const item of orderItemsToProcess) {
      if (item.variant) {
        if (item.variant.quantity < item.quantity) {
          throw new AppError_default(
            status15.BAD_REQUEST,
            `Insufficient stock for variation of product: ${item.product.name}`
          );
        }
      } else {
        if (item.product.stock < item.quantity) {
          throw new AppError_default(
            status15.BAD_REQUEST,
            `Insufficient stock for product: ${item.product.name}`
          );
        }
      }
      totalAmount += item.sellPrice * item.quantity;
    }
    const discountAmount = payload.discountAmount || 0;
    const shippingFee = payload.shippingFee || 0;
    const finalTotalAmount = Math.max(0, totalAmount + shippingFee - discountAmount);
    const order = await tx.order.create({
      data: {
        userId,
        orderType: payload.orderType || OrderType.ONLINE,
        totalAmount: finalTotalAmount,
        discountAmount,
        shippingFee,
        couponId: payload.couponId || null,
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address,
        district: payload.district,
        notes: payload.notes,
        orderStatus: OrderStatus.PENDING
      }
    });
    for (const item of orderItemsToProcess) {
      const itemTotal = item.sellPrice * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - itemCommission;
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.sellPrice,
          shopId: item.product.shopId,
          platformEarning: itemCommission,
          vendorEarning
        }
      });
      if (item.productVariantId) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        });
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }
    }
    const cart = userId ? await tx.cart.findUnique({ where: { userId } }) : null;
    if (cart) {
      if (isFromCart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id }
        });
      } else {
        for (const item of orderItemsToProcess) {
          await tx.cartItem.deleteMany({
            where: {
              cartId: cart.id,
              productId: item.productId,
              productVariantId: item.productVariantId || null
            }
          });
        }
      }
    }
    return order;
  });
};
var getAllOrders = async (queryParams) => {
  const orderQuery = new QueryBuilder(prisma2.order, queryParams, {
    searchableFields: ["address", "district", "fullName", "phone"],
    filterableFields: ["orderStatus", "paymentStatus", "userId", "orderType"]
  }).search().filter().sort().paginate().include({
    items: {
      include: {
        product: true,
        productVariant: true,
        shop: true
      }
    },
    user: {
      select: { id: true, name: true, email: true }
    }
  });
  return await orderQuery.execute();
};
var getOrderById = async (id, userId, role) => {
  const order = await prisma2.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
          productVariant: true,
          shop: true
        }
      },
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  });
  if (!order) {
    throw new AppError_default(status15.NOT_FOUND, "Order not found");
  }
  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && order.userId !== userId) {
    const isVendorOfItem = order.items.some((item) => item.shop.vendorId === userId);
    if (!isVendorOfItem) {
      throw new AppError_default(status15.FORBIDDEN, "Access denied");
    }
  }
  return order;
};
var updateOrderStatus = async (id, statusValue) => {
  return await prisma2.order.update({
    where: { id },
    data: { orderStatus: statusValue }
  });
};
var updatePaymentStatus = async (id, paymentStatus) => {
  return await prisma2.order.update({
    where: { id },
    data: { paymentStatus }
  });
};
var updateOrderItemStatus = async (itemId, statusValue, vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError_default(status15.NOT_FOUND, "Shop not found");
  const orderItem = await prisma2.orderItem.findUnique({
    where: { id: itemId }
  });
  if (!orderItem || orderItem.shopId !== shop.id) {
    throw new AppError_default(status15.FORBIDDEN, "Access denied to this order item");
  }
  const updatedItem = await prisma2.orderItem.update({
    where: { id: itemId },
    data: { status: statusValue }
  });
  await prisma2.order.update({
    where: { id: orderItem.orderId },
    data: { orderStatus: statusValue }
  });
  return updatedItem;
};
var getVendorOrders = async (vendorId, queryParams) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError_default(status15.NOT_FOUND, "Shop not found");
  const orderType = Object.values(OrderType).includes(
    queryParams.orderType
  ) ? queryParams.orderType : void 0;
  const orderItems = await prisma2.orderItem.findMany({
    where: {
      shopId: shop.id,
      ...orderType ? { order: { orderType } } : {}
    },
    include: {
      order: true,
      product: true,
      productVariant: true
    },
    orderBy: {
      order: { createdAt: "desc" }
    }
  });
  return orderItems;
};
var deleteOrder = async (id) => {
  return await prisma2.$transaction(async (tx) => {
    await tx.orderItem.deleteMany({
      where: { orderId: id }
    });
    return await tx.order.delete({
      where: { id }
    });
  });
};
var OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  getVendorOrders,
  deleteOrder,
  updateOrderItemStatus
};

// src/app/module/order/order.controller.ts
var createOrder2 = catchAsync(async (req, res) => {
  const result = await OrderService.createOrder(req.user.userId, req.body);
  sendResponse(res, {
    httpStatusCode: status16.CREATED,
    success: true,
    message: "Order placed successfully",
    data: result
  });
});
var getAllOrders2 = catchAsync(async (req, res) => {
  const { data, meta } = await OrderService.getAllOrders(req.query);
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Orders fetched successfully",
    data,
    meta
  });
});
var getMyOrders = catchAsync(async (req, res) => {
  const { data, meta } = await OrderService.getAllOrders({
    ...req.query,
    userId: req.user.userId
  });
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "My orders fetched successfully",
    data,
    meta
  });
});
var getOrderById2 = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderById(
    req.params.id,
    req.user.userId,
    req.user.role
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Order details fetched successfully",
    data: result
  });
});
var updateOrderStatus2 = catchAsync(async (req, res) => {
  const result = await OrderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Order status updated successfully",
    data: result
  });
});
var updatePaymentStatus2 = catchAsync(async (req, res) => {
  const result = await OrderService.updatePaymentStatus(
    req.params.id,
    req.body.paymentStatus
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Payment status updated successfully",
    data: result
  });
});
var getVendorOrders2 = catchAsync(async (req, res) => {
  const result = await OrderService.getVendorOrders(
    req.user.userId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Vendor orders fetched successfully",
    data: result
  });
});
var deleteOrder2 = catchAsync(async (req, res) => {
  const result = await OrderService.deleteOrder(req.params.id);
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Order deleted successfully",
    data: result
  });
});
var updateOrderItemStatus2 = catchAsync(async (req, res) => {
  const result = await OrderService.updateOrderItemStatus(
    req.params.id,
    req.body.status,
    req.user.userId
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Order item status updated successfully",
    data: result
  });
});
var OrderController = {
  createOrder: createOrder2,
  getAllOrders: getAllOrders2,
  getMyOrders,
  getOrderById: getOrderById2,
  updateOrderStatus: updateOrderStatus2,
  updatePaymentStatus: updatePaymentStatus2,
  getVendorOrders: getVendorOrders2,
  deleteOrder: deleteOrder2,
  updateOrderItemStatus: updateOrderItemStatus2
};

// src/app/module/order/order.validation.ts
import z5 from "zod";
var createOrderZodSchema = z5.object({
  fullName: z5.string().min(1, "Full name is required"),
  phone: z5.string().min(1, "Phone number is required"),
  address: z5.string().min(1, "Address is required"),
  district: z5.string().min(1, "District is required"),
  notes: z5.string().optional(),
  items: z5.array(
    z5.object({
      productId: z5.string().uuid(),
      productVariantId: z5.string().uuid().optional().nullable(),
      quantity: z5.number().int().positive()
    })
  ).optional(),
  couponId: z5.string().uuid().optional().nullable(),
  discountAmount: z5.number().optional(),
  shippingFee: z5.number().optional()
});
var updateOrderStatusZodSchema = z5.object({
  status: z5.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
});
var updatePaymentStatusZodSchema = z5.object({
  paymentStatus: z5.enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
});

// src/app/module/order/order.route.ts
var router6 = Router6();
router6.post(
  "/",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createOrderZodSchema),
  OrderController.createOrder
);
router6.get(
  "/my-orders",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getMyOrders
);
router6.get(
  "/vendor-orders",
  checkAuth(Role.SELLER),
  OrderController.getVendorOrders
);
router6.patch(
  "/items/:id/status",
  checkAuth(Role.SELLER),
  validateRequest(updateOrderStatusZodSchema),
  OrderController.updateOrderItemStatus
);
router6.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getAllOrders
);
router6.patch(
  "/:id/status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateOrderStatusZodSchema),
  OrderController.updateOrderStatus
);
router6.patch(
  "/:id/payment-status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updatePaymentStatusZodSchema),
  OrderController.updatePaymentStatus
);
router6.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.deleteOrder
);
router6.get(
  "/:id",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getOrderById
);
var OrderRoutes = router6;

// src/app/module/review/review.route.ts
import { Router as Router7 } from "express";

// src/app/module/review/review.controller.ts
import status18 from "http-status";

// src/app/module/review/review.service.ts
import status17 from "http-status";
var createReview = async (userId, payload) => {
  const hasPurchased = await prisma2.order.findFirst({
    where: {
      userId,
      orderStatus: OrderStatus.DELIVERED,
      items: {
        some: {
          productId: payload.productId
        }
      }
    }
  });
  if (!hasPurchased) {
    throw new AppError_default(
      status17.FORBIDDEN,
      "You can only review products you have purchased and received"
    );
  }
  const existingReview = await prisma2.review.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: payload.productId
      }
    }
  });
  if (existingReview) {
    throw new AppError_default(status17.BAD_REQUEST, "You have already reviewed this product");
  }
  const review = await prisma2.review.create({
    data: {
      userId,
      productId: payload.productId,
      rating: payload.rating,
      comment: payload.comment
    },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });
  return review;
};
var getProductReviews = async (productId) => {
  return await prisma2.review.findMany({
    where: { productId },
    include: {
      user: {
        select: { name: true, image: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getMyReviews = async (userId) => {
  return await prisma2.review.findMany({
    where: { userId },
    include: {
      product: {
        select: { name: true, images: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var deleteReview = async (userId, reviewId, role) => {
  const review = await prisma2.review.findUnique({
    where: { id: reviewId }
  });
  if (!review) {
    throw new AppError_default(status17.NOT_FOUND, "Review not found");
  }
  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && review.userId !== userId) {
    throw new AppError_default(status17.FORBIDDEN, "Access denied");
  }
  await prisma2.review.delete({ where: { id: reviewId } });
  return { message: "Review deleted successfully" };
};
var ReviewService = {
  createReview,
  getProductReviews,
  deleteReview,
  getMyReviews
};

// src/app/module/review/review.controller.ts
var createReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.createReview(
    req.user.userId,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status18.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: result
  });
});
var getProductReviews2 = catchAsync(async (req, res) => {
  const result = await ReviewService.getProductReviews(
    req.params.productId
  );
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result
  });
});
var getMyReviews2 = catchAsync(async (req, res) => {
  const result = await ReviewService.getMyReviews(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Your reviews fetched successfully",
    data: result
  });
});
var deleteReview2 = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteReview(
    req.user.userId,
    req.params.id,
    req.user.role
  );
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var ReviewController = {
  createReview: createReview2,
  getProductReviews: getProductReviews2,
  deleteReview: deleteReview2,
  getMyReviews: getMyReviews2
};

// src/app/module/review/review.validation.ts
import z6 from "zod";
var createReviewZodSchema = z6.object({
  productId: z6.string().uuid("Invalid product ID"),
  rating: z6.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z6.string().min(1, "Comment is required")
});
var updateReviewZodSchema = z6.object({
  rating: z6.number().int().min(1).max(5).optional(),
  comment: z6.string().min(1).optional()
});

// src/app/module/review/review.route.ts
var router7 = Router7();
router7.get("/product/:productId", ReviewController.getProductReviews);
router7.get(
  "/my-reviews",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.getMyReviews
);
router7.post(
  "/",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createReviewZodSchema),
  ReviewController.createReview
);
router7.delete(
  "/:id",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.deleteReview
);
var ReviewRoutes = router7;

// src/app/module/analytics/analytics.route.ts
import { Router as Router8 } from "express";

// src/app/module/analytics/analytics.controller.ts
import status19 from "http-status";

// src/app/module/analytics/analytics.service.ts
var getAdminAnalytics = async () => {
  const [
    totalUsers,
    totalVendors,
    totalShops,
    totalProducts,
    totalOrders,
    orderStats
  ] = await Promise.all([
    prisma2.user.count({ where: { role: Role.USER } }),
    prisma2.user.count({ where: { role: Role.SELLER } }),
    prisma2.shop.count(),
    prisma2.product.count(),
    prisma2.order.count(),
    prisma2.order.aggregate({
      _sum: {
        totalAmount: true
      }
    })
  ]);
  const sixMonthsAgo = /* @__PURE__ */ new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const monthlyRevenue = await prisma2.order.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo
      }
    },
    select: {
      totalAmount: true,
      createdAt: true
    }
  });
  const categoryDistribution = await prisma2.category.findMany({
    select: {
      name: true,
      _count: {
        select: {
          products: true
        }
      }
    }
  });
  return {
    summary: {
      totalUsers,
      totalVendors,
      totalShops,
      totalProducts,
      totalOrders,
      totalRevenue: orderStats._sum.totalAmount || 0
    },
    monthlyRevenue,
    categoryDistribution
  };
};
var getVendorAnalytics = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({
    where: { vendorId }
  });
  if (!shop) {
    return { message: "No shop found for this vendor" };
  }
  const [totalProducts, orderItemsStats] = await Promise.all([
    prisma2.product.count({ where: { shopId: shop.id } }),
    prisma2.orderItem.aggregate({
      where: { shopId: shop.id },
      _sum: {
        vendorEarning: true,
        quantity: true
      },
      _count: {
        id: true
      }
    })
  ]);
  const recentSales = await prisma2.orderItem.findMany({
    where: { shopId: shop.id },
    include: {
      product: { select: { name: true, images: true } },
      order: { select: { createdAt: true, orderStatus: true } }
    },
    orderBy: { order: { createdAt: "desc" } },
    take: 5
  });
  return {
    summary: {
      totalProducts,
      totalSales: orderItemsStats._count.id,
      totalEarnings: orderItemsStats._sum.vendorEarning || 0,
      itemsSold: orderItemsStats._sum.quantity || 0
    },
    recentSales
  };
};
var getUserAnalytics = async (userId) => {
  const [totalOrders, orderStats, recentOrders] = await Promise.all([
    prisma2.order.count({ where: { userId } }),
    prisma2.order.aggregate({
      where: { userId },
      _sum: {
        totalAmount: true
      }
    }),
    prisma2.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);
  return {
    summary: {
      totalOrders,
      totalSpending: orderStats._sum.totalAmount || 0
    },
    recentOrders
  };
};
var AnalyticsService = {
  getAdminAnalytics,
  getVendorAnalytics,
  getUserAnalytics
};

// src/app/module/analytics/analytics.controller.ts
var getAdminAnalytics2 = catchAsync(async (req, res) => {
  const result = await AnalyticsService.getAdminAnalytics();
  sendResponse(res, {
    httpStatusCode: status19.OK,
    success: true,
    message: "Admin analytics fetched successfully",
    data: result
  });
});
var getVendorAnalytics2 = catchAsync(async (req, res) => {
  const result = await AnalyticsService.getVendorAnalytics(
    req.user.userId
  );
  sendResponse(res, {
    httpStatusCode: status19.OK,
    success: true,
    message: "Vendor analytics fetched successfully",
    data: result
  });
});
var getUserAnalytics2 = catchAsync(async (req, res) => {
  const result = await AnalyticsService.getUserAnalytics(
    req.user.userId
  );
  sendResponse(res, {
    httpStatusCode: status19.OK,
    success: true,
    message: "User analytics fetched successfully",
    data: result
  });
});
var AnalyticsController = {
  getAdminAnalytics: getAdminAnalytics2,
  getVendorAnalytics: getVendorAnalytics2,
  getUserAnalytics: getUserAnalytics2
};

// src/app/module/analytics/analytics.route.ts
var router8 = Router8();
router8.get(
  "/admin",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AnalyticsController.getAdminAnalytics
);
router8.get(
  "/vendor",
  checkAuth(Role.SELLER),
  AnalyticsController.getVendorAnalytics
);
router8.get(
  "/user",
  checkAuth(Role.USER),
  AnalyticsController.getUserAnalytics
);
var AnalyticsRoutes = router8;

// src/app/module/rag/rag.route.ts
import { Router as Router9 } from "express";

// src/app/module/rag/rag.controller.ts
import status20 from "http-status";

// src/app/module/rag/embedding.service.ts
var EmbeddingService = class {
  apikey;
  apiUrl = "https://openrouter.ai/api/v1";
  embeddingModel;
  constructor() {
    this.apikey = envVars.RAG.OPENROUTER_API_KEY || "";
    this.embeddingModel = envVars.RAG.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
    if (!this.apikey) {
      throw new Error("OPENROUTER_API_KEY is not set in .env");
    }
  }
  async generateEmbedding(text) {
    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apikey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: text,
          model: this.embeddingModel
        })
      });
      if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data || data.data.length == 0) {
        throw new Error("No embedding data returned");
      }
      return data.data[0].embedding;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

// src/app/module/rag/indexing.service.ts
var toVectorLiteral = (vector) => `[${vector.join(",")}]`;
var IndexingService = class {
  embeddingService;
  constructor() {
    this.embeddingService = new EmbeddingService();
  }
  async indexDocument(chunkKey, sourceType, sourceId, content, sourceLabel, metadata) {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);
      await prisma2.$executeRaw(prismaNamespace_exports.sql`
        INSERT INTO "document_embeddings"
        (
          "id",
          "chunkKey",
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metadata",
          "embedding",
          "updatedAt"
        )
        VALUES
        (
          gen_random_uuid(),
          ${chunkKey},
          ${sourceType},
          ${sourceId},
          ${sourceLabel || null},
          ${content},
          ${JSON.stringify(metadata || {})} :: jsonb,
          CAST(${vectorLiteral} AS vector(2048)),
          NOW()
        )
        ON CONFLICT ("chunkKey")
        DO UPDATE SET
          "sourceType" = EXCLUDED."sourceType",
          "sourceId" = EXCLUDED."sourceId",
          "sourceLabel" = EXCLUDED."sourceLabel",
          "content" = EXCLUDED."content",
          "metadata" = EXCLUDED."metadata",
          "embedding" = EXCLUDED."embedding",
          "isDeleted" = false,
          "deletedAt" = null,
          "updatedAt" = NOW()
        `);
    } catch (error) {
      console.log("Error in indexDocument:", error);
      throw error;
    }
  }
  async indexNextBazarData() {
    try {
      console.log("Fetching NextBazar data for indexing....");
      const products = await prisma2.product.findMany({
        include: {
          category: true,
          shop: true,
          reviews: true
        }
      });
      for (const product of products) {
        const reviewsText = product.reviews.length > 0 ? product.reviews.map((r) => `- Rating: ${r.rating}/5. Comment: ${r.comment}`).join("\n") : "No reviews yet.";
        const content = `Product Name: ${product.name}
            Description: ${product.description}
            Category: ${product.category.name}
            Shop: ${product.shop.name}
            Price: $${product.sellPrice} (Regular: $${product.regularPrice})
            Stock Status: ${product.stock > 0 ? "In Stock" : "Out of Stock"}
            Tags: ${product.tags.join(", ")}
            User Reviews:
            ${reviewsText}`;
        const metadata = {
          productId: product.id,
          name: product.name,
          shopName: product.shop.name,
          categoryName: product.category.name
        };
        await this.indexDocument(
          `product-${product.id}`,
          "PRODUCT",
          product.id,
          content,
          product.name,
          metadata
        );
      }
      const shops = await prisma2.shop.findMany();
      for (const shop of shops) {
        const content = `Shop Name: ${shop.name}
            Description: ${shop.description}
            Status: ${shop.status}
            Created At: ${shop.createdAt}`;
        await this.indexDocument(
          `shop-${shop.id}`,
          "SHOP",
          shop.id,
          content,
          shop.name,
          { shopId: shop.id, name: shop.name }
        );
      }
      return {
        success: true,
        message: `Indexed ${products.length} products and ${shops.length} shops.`
      };
    } catch (error) {
      console.log("Error in indexNextBazarData:", error);
      throw error;
    }
  }
};

// src/app/module/rag/llm.service.ts
var LLMService = class {
  apiKey;
  apiUrl = "https://openrouter.ai/api/v1";
  model;
  constructor() {
    this.apiKey = envVars.RAG.OPENROUTER_API_KEY || "";
    this.model = envVars.RAG.OPENROUTER_LLM_MODEL || "google/gemini-2.0-flash-001";
    if (!this.apiKey) {
      throw new Error("OpenRouter API key is missing...");
    }
  }
  async generateResponse(prompt, context = [], asJson = false) {
    try {
      let fullPrompt = context.length > 0 ? `Context information:
${context.join("\n\n")}

Question: ${prompt}

Answer based on the context above.` : prompt;
      if (asJson) {
        fullPrompt += `

Return ONLY a valid JSON object. Do not include any markdown formatting like \`\`\`json.`;
      }
      const systemMessage = asJson ? "You are a helpful assistant for NextBazar, an e-commerce platform. Answer questions based on the provided context. You MUST respond with ONLY valid JSON format. Do not include markdown tags." : "You are a helpful assistant for NextBazar, an e-commerce platform. Answer questions based on the provided context. If the context does not contain the answer, say you don't have enough information.";
      const bodyPayload = {
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user",
            content: fullPrompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1500
      };
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://nextbazar.com",
          "X-Title": "NextBazar RAG System"
        },
        body: JSON.stringify(bodyPayload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenRouter API error: ${response.status} - ${errorData.error?.message || "unknown error"}`
        );
      }
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating LLM response:", error);
      throw error;
    }
  }
};

// src/app/module/rag/rag.service.ts
var RAGService = class {
  embeddingService;
  llmService;
  indexingService;
  constructor() {
    this.embeddingService = new EmbeddingService();
    this.indexingService = new IndexingService();
    this.llmService = new LLMService();
  }
  async ingestData() {
    return this.indexingService.indexNextBazarData();
  }
  async retrieveRelevantDocuments(query, limit = 5, sourceType) {
    try {
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);
      const vectorLiteral = `[${queryEmbedding.join(",")}]`;
      const results = await prisma2.$queryRaw(prismaNamespace_exports.sql`
          SELECT id, "chunkKey", "sourceType", "sourceId", "sourceLabel", content, metadata, 1 - (embedding <=> CAST(${vectorLiteral} AS vector(2048))) as similarity
          FROM "document_embeddings"
          WHERE "isDeleted" = false
          ${sourceType ? prismaNamespace_exports.sql`AND "sourceType" = ${sourceType}` : prismaNamespace_exports.empty}
          ORDER BY embedding <=> CAST(${vectorLiteral} AS vector(2048))
          Limit ${limit}
          `);
      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async generateAnswer(query, limit = 5, sourceType, asJson = false) {
    try {
      const relevantDocs = await this.retrieveRelevantDocuments(
        query,
        limit,
        sourceType
      );
      const context = relevantDocs.filter((doc) => doc.content).map((doc) => doc.content);
      let answer = await this.llmService.generateResponse(
        query,
        context,
        asJson
      );
      if (asJson && typeof answer === "string") {
        answer = answer.replace(/```json\n?/, "").replace(/```$/, "").trim();
        try {
          answer = JSON.parse(answer);
        } catch (e) {
          console.error("JSON Parse failed, returning raw string");
        }
      }
      return {
        answer,
        sources: relevantDocs.map((doc) => ({
          id: doc.id,
          sourceType: doc.sourceType,
          sourceLabel: doc.sourceLabel,
          similarity: doc.similarity
        })),
        contextUsed: context.length > 0
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getStats() {
    const totalDocuments = await prisma2.$queryRaw(prismaNamespace_exports.sql`
        SELECT COUNT(*) as count FROM "document_embeddings" WHERE "isDeleted" = false;
    `);
    return {
      totalActiveDocuments: Number(totalDocuments[0]?.count ?? 0),
      timestamp: /* @__PURE__ */ new Date()
    };
  }
};

// src/app/module/rag/rag.controller.ts
var ragService = new RAGService();
var getStats = catchAsync(async (req, res) => {
  const result = await ragService.getStats();
  sendResponse(res, {
    success: true,
    httpStatusCode: status20.OK,
    message: "RAG stats retrieved successfully",
    data: result
  });
});
var ingestData = catchAsync(async (req, res) => {
  const result = await ragService.ingestData();
  sendResponse(res, {
    success: true,
    httpStatusCode: status20.OK,
    message: "Data ingestion completed",
    data: result
  });
});
var queryRag = catchAsync(async (req, res) => {
  const { query, limit, sourceType } = req.body;
  if (!query) {
    throw new Error("Query is required");
  }
  const result = await ragService.generateAnswer(
    query,
    limit ?? 5,
    sourceType,
    false
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status20.OK,
    message: "Answer generated successfully",
    data: result
  });
});
var RagController = {
  getStats,
  ingestData,
  queryRag
};

// src/app/module/rag/rag.route.ts
var router9 = Router9();
router9.get("/stats", RagController.getStats);
router9.post("/ingest", RagController.ingestData);
router9.post("/query", RagController.queryRag);
var RagRoutes = router9;

// src/app/module/admin/admin.route.ts
import { Router as Router10 } from "express";

// src/app/module/admin/admin.controller.ts
import status22 from "http-status";

// src/app/module/admin/admin.service.ts
import status21 from "http-status";
var getAllAdmins = async () => {
  const admins = await prisma2.admin.findMany({
    include: {
      user: true
    }
  });
  return admins;
};
var getAllUsers = async () => {
  const users = await prisma2.user.findMany({
    where: {
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return users;
};
var getAdminById = async (id) => {
  const admin = await prisma2.admin.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
  return admin;
};
var updateAdmin = async (id, payload) => {
  const isAdminExist = await prisma2.admin.findUnique({
    where: {
      id
    }
  });
  if (!isAdminExist) {
    throw new AppError_default(status21.NOT_FOUND, "Admin Or Super Admin not found");
  }
  const { admin } = payload;
  const updatedAdmin = await prisma2.admin.update({
    where: {
      id
    },
    data: {
      ...admin
    }
  });
  return updatedAdmin;
};
var deleteAdmin = async (id, user) => {
  const isAdminExist = await prisma2.admin.findUnique({
    where: {
      id
    }
  });
  if (!isAdminExist) {
    throw new AppError_default(status21.NOT_FOUND, "Admin Or Super Admin not found");
  }
  if (isAdminExist.id === user.userId) {
    throw new AppError_default(status21.BAD_REQUEST, "You cannot delete yourself");
  }
  const result = await prisma2.$transaction(async (tx) => {
    await tx.admin.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: /* @__PURE__ */ new Date()
      }
    });
    await tx.user.update({
      where: { id: isAdminExist.userId },
      data: {
        isDeleted: true,
        deletedAt: /* @__PURE__ */ new Date(),
        status: UserStatus.DELETED
      }
    });
    await tx.session.deleteMany({
      where: { userId: isAdminExist.userId }
    });
    await tx.account.deleteMany({
      where: { userId: isAdminExist.userId }
    });
    const admin = await getAdminById(id);
    return admin;
  });
  return result;
};
var deleteUser = async (id, adminUser) => {
  const userToDelete = await prisma2.user.findUnique({
    where: { id }
  });
  if (!userToDelete) {
    throw new AppError_default(status21.NOT_FOUND, "User not found");
  }
  if (userToDelete.id === adminUser.userId) {
    throw new AppError_default(status21.BAD_REQUEST, "You cannot delete yourself");
  }
  const requester = await prisma2.user.findUnique({
    where: { id: adminUser.userId }
  });
  if (requester?.role === Role.ADMIN && (userToDelete.role === Role.ADMIN || userToDelete.role === Role.SUPER_ADMIN)) {
    throw new AppError_default(
      status21.FORBIDDEN,
      "Admin cannot delete another Admin or Super Admin"
    );
  }
  const result = await prisma2.$transaction(async (tx) => {
    const deletedUser = await tx.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: /* @__PURE__ */ new Date(),
        status: UserStatus.DELETED
      }
    });
    await tx.session.deleteMany({ where: { userId: id } });
    await tx.account.deleteMany({ where: { userId: id } });
    return deletedUser;
  });
  return result;
};
var changeUserStatus = async (user, payload) => {
  const isAdminExists = await prisma2.admin.findUniqueOrThrow({
    where: {
      email: user.email
    },
    include: {
      user: true
    }
  });
  const { userId, userStatus } = payload;
  const userToChangeStatus = await prisma2.user.findUniqueOrThrow({
    where: {
      id: userId
    }
  });
  const selfStatusChange = isAdminExists.userId === userId;
  if (selfStatusChange) {
    throw new AppError_default(status21.BAD_REQUEST, "You cannot change your own status");
  }
  if (isAdminExists.user.role === Role.ADMIN && userToChangeStatus.role === Role.SUPER_ADMIN) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "You cannot change the status of super admin. Only super admin can change the status of another super admin"
    );
  }
  if (isAdminExists.user.role === Role.ADMIN && userToChangeStatus.role === Role.ADMIN) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "You cannot change the status of another admin. Only super admin can change the status of another admin"
    );
  }
  if (userStatus === UserStatus.DELETED) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "You cannot set user status to deleted."
    );
  }
  const updatedUser = await prisma2.user.update({
    where: {
      id: userId
    },
    data: {
      status: userStatus
    }
  });
  return updatedUser;
};
var changeUserRole = async (user, payload) => {
  const actingAdmin = await prisma2.admin.findUniqueOrThrow({
    where: { email: user.email },
    include: { user: true }
  });
  if (actingAdmin.user.role !== Role.SUPER_ADMIN) {
    throw new AppError_default(
      status21.FORBIDDEN,
      "Only Super Admin can change user roles"
    );
  }
  const { userId, role } = payload;
  const userToChangeRole = await prisma2.user.findUniqueOrThrow({
    where: { id: userId },
    include: { admin: true }
  });
  const selfRoleChange = actingAdmin.userId === userId;
  if (selfRoleChange) {
    throw new AppError_default(status21.BAD_REQUEST, "You cannot change your own role");
  }
  const result = await prisma2.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { role }
    });
    if (role === Role.ADMIN || role === Role.SUPER_ADMIN) {
      if (!userToChangeRole.admin) {
        await tx.admin.create({
          data: {
            userId: userToChangeRole.id,
            name: userToChangeRole.name,
            email: userToChangeRole.email,
            profilePhoto: userToChangeRole.image
          }
        });
      }
    } else if (role === Role.USER) {
      if (userToChangeRole.admin) {
        await tx.admin.delete({
          where: { userId: userToChangeRole.id }
        });
      }
    }
    return updatedUser;
  });
  return result;
};
var getStats2 = async () => {
  const [adminCount, superAdminCount, userCount] = await Promise.all([
    prisma2.user.count({ where: { role: Role.ADMIN, isDeleted: false } }),
    prisma2.user.count({ where: { role: Role.SUPER_ADMIN, isDeleted: false } }),
    prisma2.user.count({ where: { role: Role.USER, isDeleted: false } })
  ]);
  return {
    adminCount,
    superAdminCount,
    userCount
  };
};
var AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changeUserStatus,
  changeUserRole,
  getAllUsers,
  deleteUser,
  getStats: getStats2
};

// src/app/module/admin/admin.controller.ts
var getAllAdmins2 = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmins();
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Admins fetched successfully",
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUsers();
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Users fetched successfully",
    data: result
  });
});
var getAdminById2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const admin = await AdminService.getAdminById(id);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Admin fetched successfully",
    data: admin
  });
});
var updateAdmin2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedAdmin = await AdminService.updateAdmin(id, payload);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Admin updated successfully",
    data: updatedAdmin
  });
});
var deleteAdmin2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await AdminService.deleteAdmin(id, user);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result
  });
});
var deleteUser2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const adminUser = req.user;
  const result = await AdminService.deleteUser(id, adminUser);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "User deleted successfully",
    data: result
  });
});
var changeUserStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await AdminService.changeUserStatus(user, payload);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "User status changed successfully",
    data: result
  });
});
var changeUserRole2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await AdminService.changeUserRole(user, payload);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "User role changed successfully",
    data: result
  });
});
var getStats3 = catchAsync(async (req, res) => {
  const result = await AdminService.getStats();
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Admin stats fetched successfully",
    data: result
  });
});
var AdminController = {
  getAllAdmins: getAllAdmins2,
  updateAdmin: updateAdmin2,
  deleteAdmin: deleteAdmin2,
  getAdminById: getAdminById2,
  changeUserStatus: changeUserStatus2,
  changeUserRole: changeUserRole2,
  getAllUsers: getAllUsers2,
  deleteUser: deleteUser2,
  getStats: getStats3
};

// src/app/module/admin/admin.validation.ts
import z7 from "zod";
var updateAdminZodSchema = z7.object({
  admin: z7.object({
    name: z7.string("Name must be a string").optional(),
    profilePhoto: z7.url("Profile photo must be a valid URL").optional(),
    contactNumber: z7.string("Contact number must be a string").min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 15 characters").optional()
  }).optional()
});

// src/app/module/admin/admin.route.ts
var router10 = Router10();
router10.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllAdmins
);
router10.get(
  "/stats",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getStats
);
router10.get(
  "/users/all",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllUsers
);
router10.patch(
  "/change-user-status",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  AdminController.changeUserStatus
);
router10.patch(
  "/change-user-role",
  checkAuth(Role.SUPER_ADMIN),
  AdminController.changeUserRole
);
router10.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAdminById
);
router10.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin
);
router10.delete("/:id", checkAuth(Role.SUPER_ADMIN), AdminController.deleteAdmin);
router10.delete(
  "/users/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  AdminController.deleteUser
);
var AdminRoutes = router10;

// src/app/module/ai/ai.route.ts
import express from "express";

// src/app/module/ai/ai.controller.ts
import status24 from "http-status";

// src/app/module/ai/ai.service.ts
import status23 from "http-status";
var generateProductData = async (title) => {
  const llmService = new LLMService();
  const prompt = `You are an expert e-commerce copywriter. Based on the product title '${title}', generate a detailed and engaging product description and SEO tags.
  
  Return the response as a JSON object with the following fields:
  1. 'description': A detailed HTML formatted description (using <p>, <ul>, <li>, <strong> tags) including features and benefits.
  2. 'shortDescription': A catchy 1-2 sentence summary for social media or preview.
  3. 'tags': An array of 5 SEO-friendly search keywords.
  
  Return ONLY the JSON object. Do not include markdown code blocks.`;
  const response = await llmService.generateResponse(prompt, [], true);
  const cleanedResponse = response.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedResponse);
};
var getRecommendations = async (productId) => {
  const currentProduct = await prisma2.product.findUnique({
    where: { id: productId },
    include: { category: true }
  });
  if (!currentProduct) {
    throw new AppError_default(status23.NOT_FOUND, "Product not found");
  }
  const candidateProducts = await prisma2.product.findMany({
    where: {
      categoryId: currentProduct.categoryId,
      id: { not: productId },
      stock: { gt: 0 }
    },
    take: 20,
    select: {
      id: true,
      name: true,
      shortDescription: true,
      sellPrice: true,
      images: true,
      tags: true
    }
  });
  if (candidateProducts.length === 0) {
    return [];
  }
  const llmService = new LLMService();
  const candidateList = candidateProducts.map(
    (p, i) => `${i + 1}. ID: ${p.id} | Name: ${p.name} | Tags: ${p.tags?.join(", ")}`
  ).join("\n");
  const prompt = `You are an AI recommendation engine for an e-commerce platform.

A customer is viewing this product:
- Name: "${currentProduct.name}"
- Category: "${currentProduct.category?.name}"
- Tags: "${currentProduct.tags?.join(", ")}"

From the following candidate products in the same category, select the TOP 4 most relevant recommendations.
Prioritize similarity in use-case, tags, and complementary items.

Candidates:
${candidateList}

Return ONLY a JSON array of exactly 4 product IDs (strings), like this:
["id1", "id2", "id3", "id4"]

Return ONLY the JSON array. No explanation, no markdown.`;
  const response = await llmService.generateResponse(prompt, [], true);
  const cleanedResponse = response.replace(/```json|```/g, "").trim();
  const recommendedIds = JSON.parse(cleanedResponse);
  const recommendations = await prisma2.product.findMany({
    where: { id: { in: recommendedIds } },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      sellPrice: true,
      regularPrice: true,
      images: true,
      category: { select: { name: true } }
    }
  });
  return recommendedIds.map((id) => recommendations.find((p) => p.id === id)).filter(Boolean);
};
var analyzeBusiness = async () => {
  const [orderStats, categorySales, topProducts, sellerPerformance, summary] = await Promise.all([
    // Revenue Summary
    prisma2.order.aggregate({
      _sum: { totalAmount: true },
      _count: { id: true }
    }),
    // Sales by Category
    prisma2.category.findMany({
      include: {
        products: {
          select: {
            orderItems: {
              select: {
                price: true,
                quantity: true
              }
            }
          }
        }
      }
    }),
    // Top 5 Products by Quantity
    prisma2.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5
    }),
    // Seller Performance (Shops with order counts)
    prisma2.shop.findMany({
      select: {
        name: true,
        _count: {
          select: { orderItems: true }
        }
      },
      orderBy: { orderItems: { _count: "asc" } },
      take: 5
    }),
    // Total counts
    prisma2.$transaction([
      prisma2.user.count({ where: { role: Role.USER } }),
      prisma2.user.count({ where: { role: Role.SELLER } })
    ])
  ]);
  const processedCategorySales = categorySales.map((cat) => ({
    name: cat.name,
    totalRevenue: cat.products.reduce(
      (acc, p) => acc + p.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      0
    )
  })).sort((a, b) => b.totalRevenue - a.totalRevenue);
  const topProductDetails = await prisma2.product.findMany({
    where: { id: { in: topProducts.map((p) => p.productId) } },
    select: { name: true }
  });
  const llmService = new LLMService();
  const context = {
    totalRevenue: orderStats._sum.totalAmount || 0,
    totalOrders: orderStats._count.id,
    totalCustomers: summary[0],
    totalSellers: summary[1],
    categoryPerformance: processedCategorySales,
    topSellingProducts: topProductDetails.map((p) => p.name),
    lowPerformingSellers: sellerPerformance.map(
      (s) => `${s.name} (${s._count.orderItems} sales)`
    )
  };
  const prompt = `You are a Business Analyst. Analyze this data:
  ${JSON.stringify(context, null, 2)}
  
  Return ONLY a JSON object: {"analysis": "HTML_STRING"}
  The HTML_STRING must use <h3>, <p>, <ul>, <li> tags for structure.
  Do not include any other text or markdown code blocks.`;
  const response = await llmService.generateResponse(prompt, [], true);
  let finalHTML = "";
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      finalHTML = parsedResponse.analysis || response;
    } else {
      finalHTML = response;
    }
  } catch (error) {
    finalHTML = response.replace(/```json|```/g, "").trim();
  }
  return {
    insights: finalHTML,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
};
var AIService = {
  generateProductData,
  getRecommendations,
  analyzeBusiness
};

// src/app/module/ai/ai.controller.ts
var generateProductData2 = catchAsync(async (req, res) => {
  const { title } = req.body;
  const result = await AIService.generateProductData(title);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Product data generated successfully",
    data: result
  });
});
var getRecommendations2 = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const result = await AIService.getRecommendations(productId);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Recommendations fetched successfully",
    data: result
  });
});
var analyzeBusiness2 = catchAsync(async (req, res) => {
  const result = await AIService.analyzeBusiness();
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Business insights generated successfully",
    data: result
  });
});
var AIController = {
  generateProductData: generateProductData2,
  getRecommendations: getRecommendations2,
  analyzeBusiness: analyzeBusiness2
};

// src/app/module/ai/ai.route.ts
var router11 = express.Router();
router11.post(
  "/generate-product-data",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  AIController.generateProductData
);
router11.post("/recommendations", AIController.getRecommendations);
router11.post(
  "/analyze-business",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AIController.analyzeBusiness
);
var AIRoutes = router11;

// src/app/module/attribute/attribute.route.ts
import { Router as Router11 } from "express";

// src/app/module/attribute/attribute.controller.ts
import status26 from "http-status";

// src/app/module/attribute/attribute.service.ts
import status25 from "http-status";
var createAttribute = async (user, payload) => {
  let shopId = payload.shopId || null;
  if (user.role === Role.SELLER) {
    const shop = await prisma2.shop.findUnique({
      where: { vendorId: user.userId }
    });
    if (!shop) {
      throw new AppError_default(status25.NOT_FOUND, "Seller shop not found");
    }
    shopId = shop.id;
  }
  const existing = await prisma2.attribute.findFirst({
    where: {
      name: payload.name,
      shopId
    }
  });
  if (existing) {
    throw new AppError_default(
      status25.BAD_REQUEST,
      "Attribute with this name already exists"
    );
  }
  const attribute = await prisma2.attribute.create({
    data: {
      name: payload.name,
      shopId
    },
    include: {
      values: true,
      shop: true
    }
  });
  return attribute;
};
var getAllAttributes = async (user) => {
  if (user && user.role === Role.SELLER) {
    const shop = await prisma2.shop.findUnique({
      where: { vendorId: user.userId }
    });
    if (shop) {
      return await prisma2.attribute.findMany({
        where: {
          OR: [{ shopId: null }, { shopId: shop.id }]
        },
        include: {
          values: true,
          shop: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    }
  }
  return await prisma2.attribute.findMany({
    include: {
      values: true,
      shop: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getAttributeById = async (id) => {
  const attribute = await prisma2.attribute.findUnique({
    where: { id },
    include: {
      values: true,
      shop: true
    }
  });
  if (!attribute) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute not found");
  }
  return attribute;
};
var updateAttribute = async (id, user, payload) => {
  const attribute = await prisma2.attribute.findUnique({
    where: { id },
    include: { shop: true }
  });
  if (!attribute) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute not found");
  }
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError_default(
        status25.FORBIDDEN,
        "Unauthorized: You cannot edit this attribute"
      );
    }
  }
  const existing = await prisma2.attribute.findFirst({
    where: {
      name: payload.name,
      shopId: attribute.shopId,
      NOT: { id }
    }
  });
  if (existing) {
    throw new AppError_default(
      status25.BAD_REQUEST,
      "Attribute with this name already exists"
    );
  }
  const updated = await prisma2.attribute.update({
    where: { id },
    data: { name: payload.name },
    include: {
      values: true,
      shop: true
    }
  });
  return updated;
};
var deleteAttribute = async (id, user) => {
  const attribute = await prisma2.attribute.findUnique({
    where: { id },
    include: { shop: true }
  });
  if (!attribute) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute not found");
  }
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError_default(
        status25.FORBIDDEN,
        "Unauthorized: You cannot delete this attribute"
      );
    }
  }
  await prisma2.attribute.delete({
    where: { id }
  });
  return { message: "Attribute deleted successfully" };
};
var addAttributeValue = async (attributeId, user, payload) => {
  const attribute = await prisma2.attribute.findUnique({
    where: { id: attributeId },
    include: { shop: true }
  });
  if (!attribute) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute not found");
  }
  if (user.role === Role.SELLER) {
    if (!attribute.shop || attribute.shop.vendorId !== user.userId) {
      throw new AppError_default(
        status25.FORBIDDEN,
        "Unauthorized: You cannot manage this attribute's values"
      );
    }
  }
  const existing = await prisma2.attributeValue.findUnique({
    where: {
      value_attributeId: {
        value: payload.value,
        attributeId
      }
    }
  });
  if (existing) {
    throw new AppError_default(
      status25.BAD_REQUEST,
      "Value already exists for this attribute"
    );
  }
  const attributeValue = await prisma2.attributeValue.create({
    data: {
      value: payload.value,
      attributeId
    }
  });
  return attributeValue;
};
var deleteAttributeValue = async (valueId, user) => {
  const value = await prisma2.attributeValue.findUnique({
    where: { id: valueId },
    include: {
      attribute: {
        include: { shop: true }
      }
    }
  });
  if (!value) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute value not found");
  }
  if (user.role === Role.SELLER) {
    if (!value.attribute.shop || value.attribute.shop.vendorId !== user.userId) {
      throw new AppError_default(
        status25.FORBIDDEN,
        "Unauthorized: You cannot delete this attribute value"
      );
    }
  }
  await prisma2.attributeValue.delete({
    where: { id: valueId }
  });
  return { message: "Attribute value deleted successfully" };
};
var updateAttributeValue = async (valueId, user, payload) => {
  const value = await prisma2.attributeValue.findUnique({
    where: { id: valueId },
    include: {
      attribute: {
        include: { shop: true }
      }
    }
  });
  if (!value) {
    throw new AppError_default(status25.NOT_FOUND, "Attribute value not found");
  }
  if (user.role === Role.SELLER) {
    if (!value.attribute.shop || value.attribute.shop.vendorId !== user.userId) {
      throw new AppError_default(
        status25.FORBIDDEN,
        "Unauthorized: You cannot update this attribute value"
      );
    }
  }
  const existing = await prisma2.attributeValue.findFirst({
    where: {
      value: payload.value,
      attributeId: value.attributeId,
      NOT: { id: valueId }
    }
  });
  if (existing) {
    throw new AppError_default(
      status25.BAD_REQUEST,
      "Value already exists for this attribute"
    );
  }
  const updatedValue = await prisma2.attributeValue.update({
    where: { id: valueId },
    data: { value: payload.value }
  });
  return updatedValue;
};
var AttributeService = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
  addAttributeValue,
  deleteAttributeValue,
  updateAttributeValue
};

// src/app/module/attribute/attribute.controller.ts
var createAttribute2 = catchAsync(async (req, res) => {
  const result = await AttributeService.createAttribute(req.user, req.body);
  sendResponse(res, {
    httpStatusCode: status26.CREATED,
    success: true,
    message: "Attribute created successfully",
    data: result
  });
});
var getAllAttributes2 = catchAsync(async (req, res) => {
  const result = await AttributeService.getAllAttributes(req.user);
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: "Attributes fetched successfully",
    data: result
  });
});
var getAttributeById2 = catchAsync(async (req, res) => {
  const result = await AttributeService.getAttributeById(req.params.id);
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: "Attribute fetched successfully",
    data: result
  });
});
var updateAttribute2 = catchAsync(async (req, res) => {
  const result = await AttributeService.updateAttribute(
    req.params.id,
    req.user,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: "Attribute updated successfully",
    data: result
  });
});
var deleteAttribute2 = catchAsync(async (req, res) => {
  const result = await AttributeService.deleteAttribute(req.params.id, req.user);
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var addAttributeValue2 = catchAsync(async (req, res) => {
  const result = await AttributeService.addAttributeValue(
    req.params.id,
    req.user,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status26.CREATED,
    success: true,
    message: "Attribute value added successfully",
    data: result
  });
});
var deleteAttributeValue2 = catchAsync(async (req, res) => {
  const result = await AttributeService.deleteAttributeValue(
    req.params.valueId,
    req.user
  );
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var updateAttributeValue2 = catchAsync(async (req, res) => {
  const result = await AttributeService.updateAttributeValue(
    req.params.valueId,
    req.user,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status26.OK,
    success: true,
    message: "Attribute value updated successfully",
    data: result
  });
});
var AttributeController = {
  createAttribute: createAttribute2,
  getAllAttributes: getAllAttributes2,
  getAttributeById: getAttributeById2,
  updateAttribute: updateAttribute2,
  deleteAttribute: deleteAttribute2,
  addAttributeValue: addAttributeValue2,
  deleteAttributeValue: deleteAttributeValue2,
  updateAttributeValue: updateAttributeValue2
};

// src/app/module/attribute/attribute.validation.ts
import z8 from "zod";
var createAttributeZodSchema = z8.object({
  name: z8.string().min(1, "Attribute name is required"),
  shopId: z8.string().optional().nullable()
});
var updateAttributeZodSchema = z8.object({
  name: z8.string().min(1, "Attribute name is required")
});
var addAttributeValueZodSchema = z8.object({
  value: z8.string().min(1, "Attribute value is required")
});

// src/app/module/attribute/attribute.route.ts
var router12 = Router11();
router12.get("/", AttributeController.getAllAttributes);
router12.get("/:id", AttributeController.getAttributeById);
router12.post(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  validateRequest(createAttributeZodSchema),
  AttributeController.createAttribute
);
router12.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  validateRequest(updateAttributeZodSchema),
  AttributeController.updateAttribute
);
router12.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  AttributeController.deleteAttribute
);
router12.post(
  "/:id/values",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  validateRequest(addAttributeValueZodSchema),
  AttributeController.addAttributeValue
);
router12.delete(
  "/values/:valueId",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  AttributeController.deleteAttributeValue
);
router12.patch(
  "/values/:valueId",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SELLER),
  validateRequest(addAttributeValueZodSchema),
  AttributeController.updateAttributeValue
);
var AttributeRoutes = router12;

// src/app/module/coupon/coupon.route.ts
import { Router as Router12 } from "express";

// src/app/module/coupon/coupon.controller.ts
import status28 from "http-status";

// src/app/module/coupon/coupon.service.ts
import status27 from "http-status";
var createCoupon = async (payload) => {
  const { productIds, ...couponData } = payload;
  const shop = await prisma2.shop.findUnique({ where: { id: couponData.shopId } });
  if (!shop) {
    throw new AppError_default(status27.NOT_FOUND, "Shop not found");
  }
  if (new Date(couponData.endDate) <= new Date(couponData.startDate)) {
    throw new AppError_default(status27.BAD_REQUEST, "End date must be after start date");
  }
  const existing = await prisma2.coupon.findUnique({ where: { code: couponData.code } });
  if (existing) {
    throw new AppError_default(status27.CONFLICT, "Coupon code already exists");
  }
  const products = await prisma2.product.findMany({
    where: { id: { in: productIds }, shopId: couponData.shopId },
    select: { id: true }
  });
  if (products.length !== productIds.length) {
    throw new AppError_default(
      status27.BAD_REQUEST,
      "Some products do not belong to this shop or do not exist"
    );
  }
  const coupon = await prisma2.coupon.create({
    data: {
      ...couponData,
      startDate: new Date(couponData.startDate),
      endDate: new Date(couponData.endDate),
      products: {
        create: productIds.map((productId) => ({ productId }))
      }
    },
    include: {
      products: {
        include: {
          product: {
            select: { id: true, name: true, images: true }
          }
        }
      }
    }
  });
  return coupon;
};
var getMyCoupons = async (shopId, queryParams) => {
  const result = await new QueryBuilder(prisma2.coupon, queryParams, {
    searchableFields: ["code"],
    filterableFields: ["isActive", "discountType"]
  }).search().filter().where({ shopId }).sort().paginate().include({
    products: {
      include: {
        product: {
          select: { id: true, name: true, images: true }
        }
      }
    }
  }).execute();
  return result;
};
var getCouponById = async (id) => {
  const coupon = await prisma2.coupon.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: {
            select: { id: true, name: true, images: true }
          }
        }
      }
    }
  });
  if (!coupon) {
    throw new AppError_default(status27.NOT_FOUND, "Coupon not found");
  }
  return coupon;
};
var toggleCouponStatus = async (id, sellerId) => {
  const coupon = await prisma2.coupon.findUnique({
    where: { id },
    include: { shop: { select: { vendorId: true } } }
  });
  if (!coupon) {
    throw new AppError_default(status27.NOT_FOUND, "Coupon not found");
  }
  if (coupon.shop.vendorId !== sellerId) {
    throw new AppError_default(status27.FORBIDDEN, "You can only update your own coupons");
  }
  const updated = await prisma2.coupon.update({
    where: { id },
    data: { isActive: !coupon.isActive }
  });
  return updated;
};
var deleteCoupon = async (id, sellerId) => {
  const coupon = await prisma2.coupon.findUnique({
    where: { id },
    include: { shop: { select: { vendorId: true } } }
  });
  if (!coupon) {
    throw new AppError_default(status27.NOT_FOUND, "Coupon not found");
  }
  if (coupon.shop.vendorId !== sellerId) {
    throw new AppError_default(status27.FORBIDDEN, "You can only delete your own coupons");
  }
  await prisma2.coupon.delete({ where: { id } });
  return { message: "Coupon deleted successfully" };
};
var validateCoupon = async (payload) => {
  const { code, items } = payload;
  const coupon = await prisma2.coupon.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      products: true
    }
  });
  if (!coupon) {
    throw new AppError_default(status27.NOT_FOUND, "Invalid coupon code");
  }
  if (!coupon.isActive) {
    throw new AppError_default(status27.BAD_REQUEST, "This coupon is inactive");
  }
  const now = /* @__PURE__ */ new Date();
  if (now < new Date(coupon.startDate) || now > new Date(coupon.endDate)) {
    throw new AppError_default(status27.BAD_REQUEST, "This coupon has expired");
  }
  const couponProductIds = coupon.products.map((cp) => cp.productId);
  const eligibleItems = items.filter(
    (item) => couponProductIds.includes(item.productId)
  );
  if (eligibleItems.length === 0) {
    throw new AppError_default(
      status27.BAD_REQUEST,
      "This coupon is not applicable to the products in your cart"
    );
  }
  const eligibleSubtotal = eligibleItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  if (eligibleSubtotal < coupon.minPurchaseAmount) {
    throw new AppError_default(
      status27.BAD_REQUEST,
      `Minimum purchase amount of \u09F3${coupon.minPurchaseAmount} not met for this coupon`
    );
  }
  let discount = 0;
  if (coupon.discountType === "FLAT") {
    discount = Math.min(coupon.discountAmount, eligibleSubtotal);
  } else if (coupon.discountType === "PERCENTAGE") {
    discount = eligibleSubtotal * (coupon.discountAmount / 100);
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  }
  return {
    couponId: coupon.id,
    code: coupon.code,
    discountAmount: parseFloat(discount.toFixed(2)),
    discountType: coupon.discountType
  };
};
var CouponService = {
  createCoupon,
  getMyCoupons,
  getCouponById,
  toggleCouponStatus,
  deleteCoupon,
  validateCoupon
};

// src/app/module/coupon/coupon.controller.ts
var createCoupon2 = catchAsync(async (req, res) => {
  const result = await CouponService.createCoupon(req.body);
  sendResponse(res, {
    httpStatusCode: status28.CREATED,
    success: true,
    message: "Coupon created successfully",
    data: result
  });
});
var getMyCoupons2 = catchAsync(async (req, res) => {
  const { shopId } = req.params;
  const { data, meta } = await CouponService.getMyCoupons(
    shopId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status28.OK,
    success: true,
    message: "Coupons fetched successfully",
    data,
    meta
  });
});
var getCouponById2 = catchAsync(async (req, res) => {
  const result = await CouponService.getCouponById(req.params.id);
  sendResponse(res, {
    httpStatusCode: status28.OK,
    success: true,
    message: "Coupon fetched successfully",
    data: result
  });
});
var toggleCouponStatus2 = catchAsync(async (req, res) => {
  const sellerId = req.user.userId;
  const result = await CouponService.toggleCouponStatus(req.params.id, sellerId);
  sendResponse(res, {
    httpStatusCode: status28.OK,
    success: true,
    message: "Coupon status updated",
    data: result
  });
});
var deleteCoupon2 = catchAsync(async (req, res) => {
  const sellerId = req.user.userId;
  const result = await CouponService.deleteCoupon(req.params.id, sellerId);
  sendResponse(res, {
    httpStatusCode: status28.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var validateCoupon2 = catchAsync(async (req, res) => {
  const result = await CouponService.validateCoupon(req.body);
  sendResponse(res, {
    httpStatusCode: status28.OK,
    success: true,
    message: "Coupon applied successfully",
    data: result
  });
});
var CouponController = {
  createCoupon: createCoupon2,
  getMyCoupons: getMyCoupons2,
  getCouponById: getCouponById2,
  toggleCouponStatus: toggleCouponStatus2,
  deleteCoupon: deleteCoupon2,
  validateCoupon: validateCoupon2
};

// src/app/module/coupon/coupon.validation.ts
import z9 from "zod";
var createCouponZodSchema = z9.object({
  code: z9.string().min(3, "Coupon code must be at least 3 characters").max(30, "Coupon code must be at most 30 characters").regex(
    /^[A-Z0-9_-]+$/,
    "Only uppercase letters, numbers, hyphens and underscores allowed"
  ),
  discountType: z9.enum(["FLAT", "PERCENTAGE"]),
  discountAmount: z9.number().positive("Discount amount must be positive"),
  maxDiscountAmount: z9.number().positive().optional(),
  minPurchaseAmount: z9.number().min(0).default(0),
  startDate: z9.string().datetime({ offset: true }),
  endDate: z9.string().datetime({ offset: true }),
  shopId: z9.string().uuid("Invalid shop ID"),
  productIds: z9.array(z9.string().uuid()).min(1, "At least one product required")
});
var updateCouponZodSchema = z9.object({
  isActive: z9.boolean().optional(),
  endDate: z9.string().datetime({ offset: true }).optional()
});

// src/app/module/coupon/coupon.route.ts
var router13 = Router12();
router13.post(
  "/",
  checkAuth(Role.SELLER),
  validateRequest(createCouponZodSchema),
  CouponController.createCoupon
);
router13.get(
  "/shop/:shopId",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  CouponController.getMyCoupons
);
router13.get(
  "/:id",
  CouponController.getCouponById
);
router13.patch(
  "/:id/status",
  checkAuth(Role.SELLER),
  CouponController.toggleCouponStatus
);
router13.delete(
  "/:id",
  checkAuth(Role.SELLER),
  CouponController.deleteCoupon
);
router13.post("/validate", CouponController.validateCoupon);
var CouponRoutes = router13;

// src/app/module/shipping-setting/shippingSetting.route.ts
import express2 from "express";

// src/app/module/shipping-setting/shippingSetting.service.ts
var getShippingSettings = async () => {
  let settings = await prisma2.shippingSetting.findUnique({
    where: { id: "default" }
  });
  if (!settings) {
    settings = await prisma2.shippingSetting.create({
      data: {
        id: "default",
        insideDhakaShippingFee: 70,
        outsideDhakaShippingFee: 130
      }
    });
  }
  return settings;
};
var updateShippingSettings = async (payload) => {
  await getShippingSettings();
  const result = await prisma2.shippingSetting.update({
    where: { id: "default" },
    data: payload
  });
  return result;
};
var ShippingSettingService = {
  getShippingSettings,
  updateShippingSettings
};

// src/app/module/shipping-setting/shippingSetting.controller.ts
var getShippingSettings2 = catchAsync(async (req, res) => {
  const result = await ShippingSettingService.getShippingSettings();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipping settings retrieved successfully",
    data: result
  });
});
var updateShippingSettings2 = catchAsync(async (req, res) => {
  const result = await ShippingSettingService.updateShippingSettings(req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Shipping settings updated successfully",
    data: result
  });
});
var ShippingSettingController = {
  getShippingSettings: getShippingSettings2,
  updateShippingSettings: updateShippingSettings2
};

// src/app/module/shipping-setting/shippingSetting.validation.ts
import { z as z10 } from "zod";
var updateShippingSettingZodSchema = z10.object({
  insideDhakaShippingFee: z10.number().nonnegative().optional(),
  outsideDhakaShippingFee: z10.number().nonnegative().optional()
});

// src/app/module/shipping-setting/shippingSetting.route.ts
var router14 = express2.Router();
router14.get(
  "/",
  ShippingSettingController.getShippingSettings
);
router14.patch(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateShippingSettingZodSchema),
  ShippingSettingController.updateShippingSettings
);
var ShippingSettingRoutes = router14;

// src/app/module/hero-slider/heroSlider.route.ts
import express3 from "express";

// src/app/module/hero-slider/heroSlider.service.ts
var createHeroSlider = async (req) => {
  const file = req.file;
  if (!file) {
    throw new Error("No image file uploaded");
  }
  const result = await prisma2.heroSlider.create({
    data: {
      image: file.path
    }
  });
  return result;
};
var getHeroSliders = async () => {
  const result = await prisma2.heroSlider.findMany({
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var deleteHeroSlider = async (id) => {
  const result = await prisma2.heroSlider.delete({
    where: { id }
  });
  return result;
};
var HeroSliderService = {
  createHeroSlider,
  getHeroSliders,
  deleteHeroSlider
};

// src/app/module/hero-slider/heroSlider.controller.ts
var createHeroSlider2 = catchAsync(async (req, res) => {
  const result = await HeroSliderService.createHeroSlider(req);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Hero slider created successfully",
    data: result
  });
});
var getHeroSliders2 = catchAsync(async (req, res) => {
  const result = await HeroSliderService.getHeroSliders();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Hero sliders retrieved successfully",
    data: result
  });
});
var deleteHeroSlider2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HeroSliderService.deleteHeroSlider(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Hero slider deleted successfully",
    data: result
  });
});
var HeroSliderController = {
  createHeroSlider: createHeroSlider2,
  getHeroSliders: getHeroSliders2,
  deleteHeroSlider: deleteHeroSlider2
};

// src/app/module/hero-slider/heroSlider.route.ts
var router15 = express3.Router();
router15.get("/", HeroSliderController.getHeroSliders);
router15.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("image"),
  HeroSliderController.createHeroSlider
);
router15.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  HeroSliderController.deleteHeroSlider
);
var HeroSliderRoutes = router15;

// src/app/module/pos/pos.route.ts
import { Router as Router13 } from "express";

// src/app/module/pos/pos.controller.ts
import status30 from "http-status";

// src/app/module/pos/pos.service.ts
import status29 from "http-status";
var COMMISSION_RATE2 = 0.1;
var getShopProducts = async (shopId, queryParams) => {
  const productQuery = new QueryBuilder(prisma2.product, queryParams, {
    searchableFields: ["name", "slug"],
    // Can add barcode if added to schema
    filterableFields: ["status"]
  }).search().filter().sort().paginate().include({
    variants: true,
    category: true
  }).where({
    shopId,
    status: ProductStatus.ACTIVE
  });
  return await productQuery.execute();
};
var getPosCart = async (shopId) => {
  return await prisma2.posCartItem.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" }
  });
};
var addToPosCart = async (shopId, payload) => {
  const existingItem = await prisma2.posCartItem.findFirst({
    where: {
      shopId,
      productId: payload.productId,
      productVariantId: payload.productVariantId || null
    }
  });
  if (existingItem) {
    return await prisma2.posCartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + payload.quantity }
    });
  }
  return await prisma2.posCartItem.create({
    data: {
      shopId,
      productId: payload.productId,
      productVariantId: payload.productVariantId || null,
      productName: payload.productName,
      price: payload.price,
      quantity: payload.quantity,
      combination: payload.combination,
      productImage: payload.productImage
    }
  });
};
var updatePosCartItem = async (shopId, id, quantity) => {
  const item = await prisma2.posCartItem.findUnique({ where: { id } });
  if (!item || item.shopId !== shopId) {
    throw new AppError_default(status29.NOT_FOUND, "Cart item not found");
  }
  return await prisma2.posCartItem.update({
    where: { id },
    data: { quantity }
  });
};
var deletePosCartItem = async (shopId, id) => {
  const item = await prisma2.posCartItem.findUnique({ where: { id } });
  if (!item || item.shopId !== shopId) {
    throw new AppError_default(status29.NOT_FOUND, "Cart item not found");
  }
  return await prisma2.posCartItem.delete({
    where: { id }
  });
};
var clearPosCart = async (shopId) => {
  return await prisma2.posCartItem.deleteMany({
    where: { shopId }
  });
};
var createPosOrder = async (sellerId, shopId, payload) => {
  const cartItems = await prisma2.posCartItem.findMany({
    where: { shopId },
    include: {
      product: { include: { variants: true } }
    }
  });
  if (cartItems.length === 0) {
    throw new AppError_default(status29.BAD_REQUEST, "POS cart is empty");
  }
  const order = await prisma2.$transaction(async (tx) => {
    for (const item of cartItems) {
      if (item.productVariantId) {
        const variant = item.product.variants.find((v) => v.id === item.productVariantId);
        if (!variant || variant.quantity < item.quantity) {
          throw new AppError_default(
            status29.BAD_REQUEST,
            `Not enough stock for variant ${item.combination} of ${item.productName}`
          );
        }
      } else {
        if (item.product.stock < item.quantity) {
          throw new AppError_default(
            status29.BAD_REQUEST,
            `Not enough stock for product ${item.productName}`
          );
        }
      }
    }
    const newOrder = await tx.order.create({
      data: {
        orderType: OrderType.POS,
        shopId,
        // Since POS might not have a registered user, we link it to the seller for tracking, 
        // or leave userId empty. Let's link it to the seller's user ID so it has a valid relation if required by schema, 
        // but we made it optional, so we can leave it null.
        userId: null,
        totalAmount: payload.total,
        discountAmount: payload.discount,
        shippingFee: payload.shippingCharge,
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.DELIVERED,
        paymentMethod: payload.payment.method,
        fullName: payload.customer?.name || "Walk-in Customer",
        phone: payload.customer?.phone || "N/A",
        address: payload.customer?.address || "N/A",
        district: payload.customer?.district || "N/A",
        notes: payload.customer?.note || null
      }
    });
    for (const item of cartItems) {
      const itemTotal = item.price * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE2;
      const vendorEarning = itemTotal - itemCommission;
      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          productVariantId: item.productVariantId,
          shopId,
          quantity: item.quantity,
          price: item.price,
          platformEarning: itemCommission,
          vendorEarning,
          status: OrderStatus.DELIVERED
        }
      });
      if (item.productVariantId) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: { quantity: { decrement: item.quantity } }
        });
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }
    }
    await tx.posCartItem.deleteMany({
      where: { shopId }
    });
    return newOrder;
  });
  return order;
};
var getPosOrders = async (shopId, queryParams) => {
  const orderQuery = new QueryBuilder(prisma2.order, queryParams, {
    searchableFields: ["id", "phone", "fullName"],
    filterableFields: ["paymentMethod"]
  }).search().filter().sort().paginate().include({
    items: {
      include: {
        product: true,
        productVariant: true
      }
    }
  }).where({
    shopId,
    orderType: OrderType.POS
  });
  return await orderQuery.execute();
};
var PosService = {
  getShopProducts,
  getPosCart,
  addToPosCart,
  updatePosCartItem,
  deletePosCartItem,
  clearPosCart,
  createPosOrder,
  getPosOrders
};

// src/app/module/pos/pos.controller.ts
var getSellerShopId = async (userId) => {
  const shop = await prisma2.shop.findUnique({
    where: { vendorId: userId }
  });
  if (!shop) throw new AppError_default(status30.NOT_FOUND, "You don't have a shop");
  return shop.id;
};
var getShopProducts2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const result = await PosService.getShopProducts(shopId, req.query);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Products fetched successfully",
    ...result
  });
});
var getPosCart2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const data = await PosService.getPosCart(shopId);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Cart fetched successfully",
    data
  });
});
var addToPosCart2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const data = await PosService.addToPosCart(shopId, req.body);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "Item added to POS cart",
    data
  });
});
var updatePosCartItem2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const data = await PosService.updatePosCartItem(
    shopId,
    req.params.id,
    req.body.quantity
  );
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Cart item updated successfully",
    data
  });
});
var deletePosCartItem2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const data = await PosService.deletePosCartItem(shopId, req.params.id);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Cart item removed successfully",
    data
  });
});
var clearPosCart2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  await PosService.clearPosCart(shopId);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Cart cleared successfully",
    data: null
  });
});
var createPosOrder2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const data = await PosService.createPosOrder(
    req.user.userId,
    shopId,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status30.CREATED,
    success: true,
    message: "POS Order created successfully",
    data
  });
});
var getPosOrders2 = catchAsync(async (req, res) => {
  const shopId = await getSellerShopId(req.user.userId);
  const result = await PosService.getPosOrders(shopId, req.query);
  sendResponse(res, {
    httpStatusCode: status30.OK,
    success: true,
    message: "POS Orders fetched successfully",
    ...result
  });
});
var PosController = {
  getShopProducts: getShopProducts2,
  getPosCart: getPosCart2,
  addToPosCart: addToPosCart2,
  updatePosCartItem: updatePosCartItem2,
  deletePosCartItem: deletePosCartItem2,
  clearPosCart: clearPosCart2,
  createPosOrder: createPosOrder2,
  getPosOrders: getPosOrders2
};

// src/app/module/pos/pos.validation.ts
import { z as z11 } from "zod";
var addToPosCartZodSchema = z11.object({
  productId: z11.string({ message: "Product ID is required" }).min(1, "Product ID is required"),
  productVariantId: z11.string().optional().nullable(),
  productName: z11.string({ message: "Product Name is required" }).min(1, "Product Name is required"),
  price: z11.number({ message: "Price is required" }).min(0),
  quantity: z11.number().int().min(1).default(1),
  combination: z11.string().optional().nullable(),
  productImage: z11.string().optional().nullable()
});
var updatePosCartItemZodSchema = z11.object({
  quantity: z11.number().int().min(1, "Quantity must be at least 1")
});
var createPosOrderZodSchema = z11.object({
  subtotal: z11.number(),
  discount: z11.number().default(0),
  tax: z11.number().default(0),
  shippingCharge: z11.number().default(0),
  total: z11.number(),
  coupon: z11.string().optional().nullable(),
  customer: z11.object({
    name: z11.string().optional().nullable(),
    phone: z11.string().optional().nullable(),
    address: z11.string().optional().nullable(),
    district: z11.string().optional().nullable(),
    note: z11.string().optional().nullable()
  }).optional(),
  payment: z11.object({
    method: z11.string().default("Cash"),
    amount: z11.number().default(0),
    change: z11.number().default(0)
  })
});

// src/app/module/pos/pos.route.ts
var router16 = Router13();
router16.use(checkAuth(Role.SELLER));
router16.get("/products", PosController.getShopProducts);
router16.get("/cart", PosController.getPosCart);
router16.post(
  "/cart",
  validateRequest(addToPosCartZodSchema),
  PosController.addToPosCart
);
router16.patch(
  "/cart/:id",
  validateRequest(updatePosCartItemZodSchema),
  PosController.updatePosCartItem
);
router16.delete("/cart/:id", PosController.deletePosCartItem);
router16.delete("/cart", PosController.clearPosCart);
router16.post(
  "/orders",
  validateRequest(createPosOrderZodSchema),
  PosController.createPosOrder
);
router16.get("/orders", PosController.getPosOrders);
var PosRoutes = router16;

// src/app/module/site-setting/siteSetting.route.ts
import { Router as Router14 } from "express";

// src/app/module/site-setting/siteSetting.service.ts
var getSiteSettings = async () => {
  let settings = await prisma2.siteSetting.findUnique({
    where: { id: "default" }
  });
  if (!settings) {
    settings = await prisma2.siteSetting.create({
      data: { id: "default" }
    });
  }
  return settings;
};
var updateSiteSettings = async (payload) => {
  await getSiteSettings();
  const result = await prisma2.siteSetting.update({
    where: { id: "default" },
    data: payload
  });
  return result;
};
var SiteSettingService = {
  getSiteSettings,
  updateSiteSettings
};

// src/app/module/site-setting/siteSetting.controller.ts
var getSiteSettings2 = catchAsync(async (req, res) => {
  const result = await SiteSettingService.getSiteSettings();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Site settings retrieved successfully",
    data: result
  });
});
var updateSiteSettings2 = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) {
    payload.logo = req.file.path;
  }
  const result = await SiteSettingService.updateSiteSettings(payload);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Site settings updated successfully",
    data: result
  });
});
var SiteSettingController = {
  getSiteSettings: getSiteSettings2,
  updateSiteSettings: updateSiteSettings2
};

// src/app/module/site-setting/siteSetting.validation.ts
import { z as z12 } from "zod";
var updateSiteSettingZodSchema = z12.object({
  siteName: z12.string().min(1).optional(),
  tagline: z12.string().optional(),
  description: z12.string().optional(),
  phone: z12.string().optional(),
  email: z12.email().optional().or(z12.literal("")),
  address: z12.string().optional(),
  facebook: z12.url().optional().or(z12.literal("")),
  youtube: z12.url().optional().or(z12.literal("")),
  instagram: z12.url().optional().or(z12.literal("")),
  linkedin: z12.url().optional().or(z12.literal("")),
  tiktok: z12.url().optional().or(z12.literal("")),
  whatsapp: z12.string().optional(),
  copyrightText: z12.string().optional()
});

// src/app/module/site-setting/siteSetting.route.ts
var router17 = Router14();
router17.get("/", SiteSettingController.getSiteSettings);
router17.patch(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("logo"),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateSiteSettingZodSchema),
  SiteSettingController.updateSiteSettings
);
var SiteSettingRoutes = router17;

// src/app/module/landing-page/landingPage.route.ts
import { Router as Router15 } from "express";

// src/app/middleware/rateLimiter.ts
import { rateLimit } from "express-rate-limit";
var globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  limit: 1e4,
  // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-8",
  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  }
});
var authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  limit: 1e3,
  // Limit each IP to 10 requests per 15 minutes for auth
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes"
  }
});
var guestOrderRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  limit: 20,
  // Limit each IP to 20 guest orders per 15 minutes
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many orders placed from this device, please try again later"
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  }
});

// src/app/module/landing-page/landingPage.controller.ts
import status32 from "http-status";

// src/app/module/landing-page/landingPage.service.ts
import status31 from "http-status";
var getShopForVendor = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError_default(status31.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var createLandingPage = async (vendorId, payload) => {
  const shop = await getShopForVendor(vendorId);
  const product = await prisma2.product.findUnique({
    where: { id: payload.productId }
  });
  if (!product || product.shopId !== shop.id) {
    throw new AppError_default(
      status31.FORBIDDEN,
      "You can only create a landing page for your own product"
    );
  }
  const slug = await generateUniqueSlug(prisma2, payload.campaignTitle, "landingPage");
  const landingPage = await prisma2.landingPage.create({
    data: {
      ...payload,
      slug,
      shopId: shop.id
    }
  });
  return landingPage;
};
var getMyLandingPages = async (vendorId, queryParams) => {
  const shop = await getShopForVendor(vendorId);
  const query = new QueryBuilder(prisma2.landingPage, queryParams, {
    searchableFields: ["campaignTitle"],
    filterableFields: ["isActive"]
  }).where({ shopId: shop.id }).include({ product: { select: { id: true, name: true, images: true, slug: true } } }).search().filter().sort().paginate();
  return await query.execute();
};
var getLandingPageById = async (id, vendorId) => {
  const shop = await getShopForVendor(vendorId);
  const landingPage = await prisma2.landingPage.findUnique({
    where: { id },
    include: { product: true }
  });
  if (!landingPage || landingPage.shopId !== shop.id) {
    throw new AppError_default(status31.NOT_FOUND, "Landing page not found");
  }
  return landingPage;
};
var getLandingPageBySlug = async (slug) => {
  const landingPage = await prisma2.landingPage.findUnique({
    where: { slug },
    include: {
      product: {
        include: {
          variants: true,
          shop: { select: { id: true, name: true, logo: true } }
        }
      }
    }
  });
  if (!landingPage || !landingPage.isActive) {
    throw new AppError_default(status31.NOT_FOUND, "Landing page not found");
  }
  prisma2.landingPage.update({ where: { id: landingPage.id }, data: { views: { increment: 1 } } }).catch(() => void 0);
  return landingPage;
};
var updateLandingPage = async (id, vendorId, payload) => {
  const shop = await getShopForVendor(vendorId);
  const existing = await prisma2.landingPage.findUnique({ where: { id } });
  if (!existing || existing.shopId !== shop.id) {
    throw new AppError_default(status31.NOT_FOUND, "Landing page not found");
  }
  if (payload.productId) {
    const product = await prisma2.product.findUnique({
      where: { id: payload.productId }
    });
    if (!product || product.shopId !== shop.id) {
      throw new AppError_default(
        status31.FORBIDDEN,
        "You can only link a landing page to your own product"
      );
    }
  }
  let slug;
  if (payload.campaignTitle && payload.campaignTitle !== existing.campaignTitle) {
    slug = await generateUniqueSlug(prisma2, payload.campaignTitle, "landingPage", id);
  }
  const updated = await prisma2.landingPage.update({
    where: { id },
    data: { ...payload, ...slug && { slug } },
    include: { product: true }
  });
  return updated;
};
var deleteLandingPage = async (id, vendorId) => {
  const shop = await getShopForVendor(vendorId);
  const existing = await prisma2.landingPage.findUnique({ where: { id } });
  if (!existing || existing.shopId !== shop.id) {
    throw new AppError_default(status31.NOT_FOUND, "Landing page not found");
  }
  await prisma2.landingPage.delete({ where: { id } });
  return { message: "Landing page deleted successfully" };
};
var createGuestOrder = async (slug, payload) => {
  const landingPage = await prisma2.landingPage.findUnique({ where: { slug } });
  if (!landingPage || !landingPage.isActive) {
    throw new AppError_default(status31.NOT_FOUND, "Landing page not found");
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
        productVariantId: payload.productVariantId || void 0,
        quantity: payload.quantity
      }
    ]
  });
  return order;
};
var LandingPageService = {
  createLandingPage,
  getMyLandingPages,
  getLandingPageById,
  getLandingPageBySlug,
  updateLandingPage,
  deleteLandingPage,
  createGuestOrder
};

// src/app/module/landing-page/landingPage.controller.ts
var createLandingPage2 = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.bannerImage?.[0]) {
      payload.bannerImage = files.bannerImage[0].path;
    }
    if (files.galleryImages?.length) {
      payload.galleryImages = files.galleryImages.map((f) => f.path);
    }
    if (files.reviewImages?.length) {
      payload.reviewImages = files.reviewImages.map((f) => f.path);
    }
  }
  const result = await LandingPageService.createLandingPage(
    req.user.userId,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status32.CREATED,
    success: true,
    message: "Landing page created successfully",
    data: result
  });
});
var getMyLandingPages2 = catchAsync(async (req, res) => {
  const { data, meta } = await LandingPageService.getMyLandingPages(
    req.user.userId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status32.OK,
    success: true,
    message: "Landing pages retrieved successfully",
    data,
    meta
  });
});
var getLandingPageById2 = catchAsync(async (req, res) => {
  const result = await LandingPageService.getLandingPageById(
    req.params.id,
    req.user.userId
  );
  sendResponse(res, {
    httpStatusCode: status32.OK,
    success: true,
    message: "Landing page retrieved successfully",
    data: result
  });
});
var getLandingPageBySlug2 = catchAsync(async (req, res) => {
  const result = await LandingPageService.getLandingPageBySlug(req.params.slug);
  sendResponse(res, {
    httpStatusCode: status32.OK,
    success: true,
    message: "Landing page retrieved successfully",
    data: result
  });
});
var updateLandingPage2 = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files && typeof req.files === "object") {
    const files = req.files;
    if (files.bannerImage?.[0]) {
      payload.bannerImage = files.bannerImage[0].path;
    }
    if (files.galleryImages?.length) {
      const uploaded = files.galleryImages.map((f) => f.path);
      payload.galleryImages = [...payload.galleryImages || [], ...uploaded];
    }
    if (files.reviewImages?.length) {
      const uploaded = files.reviewImages.map((f) => f.path);
      payload.reviewImages = [...payload.reviewImages || [], ...uploaded];
    }
  }
  const result = await LandingPageService.updateLandingPage(
    req.params.id,
    req.user.userId,
    payload
  );
  sendResponse(res, {
    httpStatusCode: status32.OK,
    success: true,
    message: "Landing page updated successfully",
    data: result
  });
});
var deleteLandingPage2 = catchAsync(async (req, res) => {
  const result = await LandingPageService.deleteLandingPage(
    req.params.id,
    req.user.userId
  );
  sendResponse(res, {
    httpStatusCode: status32.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var createGuestOrder2 = catchAsync(async (req, res) => {
  const result = await LandingPageService.createGuestOrder(
    req.params.slug,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status32.CREATED,
    success: true,
    message: "Order placed successfully",
    data: result
  });
});
var LandingPageController = {
  createLandingPage: createLandingPage2,
  getMyLandingPages: getMyLandingPages2,
  getLandingPageById: getLandingPageById2,
  getLandingPageBySlug: getLandingPageBySlug2,
  updateLandingPage: updateLandingPage2,
  deleteLandingPage: deleteLandingPage2,
  createGuestOrder: createGuestOrder2
};

// src/app/module/landing-page/landingPage.validation.ts
import { z as z13 } from "zod";
var createLandingPageZodSchema = z13.object({
  productId: z13.uuid("A valid product must be selected"),
  campaignTitle: z13.string().min(1, "Campaign title is required"),
  campaignShortDescription: z13.string().optional(),
  regularPriceLabel: z13.string().optional(),
  offerPriceLabel: z13.string().optional(),
  galleryHeading: z13.string().optional(),
  galleryDescription: z13.string().optional(),
  aboutHeading: z13.string().optional(),
  aboutDescription: z13.string().optional(),
  videoUrl: z13.url().optional().or(z13.literal("")),
  descriptionTitle: z13.string().optional(),
  description: z13.string().optional(),
  reviewHeading: z13.string().optional(),
  orderFormHeading: z13.string().optional(),
  orderButtonText: z13.string().optional(),
  isActive: z13.boolean().optional()
});
var updateLandingPageZodSchema = z13.object({
  productId: z13.uuid().optional(),
  campaignTitle: z13.string().min(1).optional(),
  campaignShortDescription: z13.string().optional(),
  regularPriceLabel: z13.string().optional(),
  offerPriceLabel: z13.string().optional(),
  galleryHeading: z13.string().optional(),
  galleryDescription: z13.string().optional(),
  // URLs of previously uploaded gallery images to keep (newly uploaded files are appended by the server)
  galleryImages: z13.array(z13.string()).optional(),
  aboutHeading: z13.string().optional(),
  aboutDescription: z13.string().optional(),
  videoUrl: z13.url().optional().or(z13.literal("")),
  descriptionTitle: z13.string().optional(),
  description: z13.string().optional(),
  reviewHeading: z13.string().optional(),
  // URLs of previously uploaded review images to keep (newly uploaded files are appended by the server)
  reviewImages: z13.array(z13.string()).optional(),
  orderFormHeading: z13.string().optional(),
  orderButtonText: z13.string().optional(),
  isActive: z13.boolean().optional()
});
var createGuestLandingOrderZodSchema = z13.object({
  fullName: z13.string().min(1, "Full name is required"),
  phone: z13.string().min(1, "Phone number is required"),
  address: z13.string().min(1, "Address is required"),
  district: z13.string().min(1, "District is required"),
  productVariantId: z13.uuid().optional().nullable(),
  quantity: z13.number().int().positive(),
  shippingFee: z13.number().nonnegative().optional()
});

// src/app/module/landing-page/landingPage.route.ts
var router18 = Router15();
var landingPageFileFields = multerUpload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
  { name: "reviewImages", maxCount: 10 }
]);
var parseJsonBody = (req, res, next) => {
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }
  next();
};
router18.post(
  "/",
  checkAuth(Role.SELLER),
  landingPageFileFields,
  parseJsonBody,
  validateRequest(createLandingPageZodSchema),
  LandingPageController.createLandingPage
);
router18.get(
  "/my-landing-pages",
  checkAuth(Role.SELLER),
  LandingPageController.getMyLandingPages
);
router18.get(
  "/:id",
  checkAuth(Role.SELLER),
  LandingPageController.getLandingPageById
);
router18.patch(
  "/:id",
  checkAuth(Role.SELLER),
  landingPageFileFields,
  parseJsonBody,
  validateRequest(updateLandingPageZodSchema),
  LandingPageController.updateLandingPage
);
router18.delete(
  "/:id",
  checkAuth(Role.SELLER),
  LandingPageController.deleteLandingPage
);
router18.get("/slug/:slug", LandingPageController.getLandingPageBySlug);
router18.post(
  "/slug/:slug/order",
  guestOrderRateLimiter,
  validateRequest(createGuestLandingOrderZodSchema),
  LandingPageController.createGuestOrder
);
var LandingPageRoutes = router18;

// src/app/routes/index.ts
var router19 = Router16();
router19.use("/auth", AuthRoutes);
router19.use("/admin", AdminRoutes);
router19.use("/categories", CategoryRoutes);
router19.use("/shops", ShopRoutes);
router19.use("/products", ProductRoutes);
router19.use("/cart", CartRoutes);
router19.use("/orders", OrderRoutes);
router19.use("/reviews", ReviewRoutes);
router19.use("/analytics", AnalyticsRoutes);
router19.use("/rag", RagRoutes);
router19.use("/ai", AIRoutes);
router19.use("/attributes", AttributeRoutes);
router19.use("/coupons", CouponRoutes);
router19.use("/shipping-settings", ShippingSettingRoutes);
router19.use("/hero-sliders", HeroSliderRoutes);
router19.use("/pos", PosRoutes);
router19.use("/site-settings", SiteSettingRoutes);
router19.use("/landing-pages", LandingPageRoutes);
var IndexRoutes = router19;

// src/app/middleware/requestLogger.ts
import fs from "fs/promises";
import path3 from "path";
var logDir = path3.resolve(process.cwd(), "logs");
var accessLogPath = path3.join(logDir, "access.log");
var ensureLogDir = async () => {
  await fs.mkdir(logDir, { recursive: true });
};
var requestLogger = async (req, res, next) => {
  const startTime = process.hrtime.bigint();
  res.on("finish", async () => {
    try {
      const endTime = process.hrtime.bigint();
      const responseTimeMs = Number(endTime - startTime) / 1e6;
      const logEntry = JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs: Number(responseTimeMs.toFixed(2)),
        ip: req.ip,
        userAgent: req.get("user-agent") || "unknown"
      });
      console.log(logEntry);
      await ensureLogDir();
      await fs.appendFile(accessLogPath, `${logEntry}
`, "utf8");
    } catch (error) {
      console.error("Failed to write access log:", error);
    }
  });
  next();
};

// src/app/middleware/globalErrorHandler.ts
import * as Sentry from "@sentry/node";
import status35 from "http-status";
import z14 from "zod";

// src/app/errorHelpers/handlePrismaErrors.ts
import status33 from "http-status";
var getStatusCodeFromPrismaError = (errorCode) => {
  if (errorCode === "P2002") {
    return status33.CONFLICT;
  }
  if (["P2025", "P2001", "P2015", "P2018"].includes(errorCode)) {
    return status33.NOT_FOUND;
  }
  if (["P1000", "P6002"].includes(errorCode)) {
    return status33.UNAUTHORIZED;
  }
  if (["P1010", "P6010"].includes(errorCode)) {
    return status33.FORBIDDEN;
  }
  if (errorCode === "P6003") {
    return status33.PAYMENT_REQUIRED;
  }
  if (["P1008", "P2004", "P6004"].includes(errorCode)) {
    return status33.GATEWAY_TIMEOUT;
  }
  if (errorCode === "P5011") {
    return status33.TOO_MANY_REQUESTS;
  }
  if (errorCode === "P6009") {
    return 413;
  }
  if (errorCode.startsWith("P1") || ["P2024", "P2037", "P6008"].includes(errorCode)) {
    return status33.SERVICE_UNAVAILABLE;
  }
  if (errorCode.startsWith("P2")) {
    return status33.BAD_REQUEST;
  }
  if (errorCode.startsWith("P3") || errorCode.startsWith("P4")) {
    return status33.INTERNAL_SERVER_ERROR;
  }
  return status33.INTERNAL_SERVER_ERROR;
};
var formatErrorMeta = (meta) => {
  if (!meta) return "";
  const parts = [];
  if (meta.target) {
    parts.push(`Field(s): ${String(meta.target)}`);
  }
  if (meta.field_name) {
    parts.push(`Field: ${String(meta.field_name)}`);
  }
  if (meta.column_name) {
    parts.push(`Column: ${String(meta.column_name)}`);
  }
  if (meta.table) {
    parts.push(`Table: ${String(meta.table)}`);
  }
  if (meta.model_name) {
    parts.push(`Model: ${String(meta.model_name)}`);
  }
  if (meta.relation_name) {
    parts.push(`Relation: ${String(meta.relation_name)}`);
  }
  if (meta.constraint) {
    parts.push(`Constraint: ${String(meta.constraint)}`);
  }
  if (meta.database_error) {
    parts.push(`Database Error: ${String(meta.database_error)}`);
  }
  return parts.length > 0 ? parts.join(" |") : "";
};
var handlePrismaClientKnownRequestError = (error) => {
  const statusCode = getStatusCodeFromPrismaError(error.code);
  const metaInfo = formatErrorMeta(error.meta);
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An error occurred with the database operation.";
  const errorSources = [
    {
      path: error.code,
      message: metaInfo ? `${mainMessage} | ${metaInfo}` : mainMessage
    }
  ];
  if (error.meta?.cause) {
    errorSources.push({
      path: "cause",
      message: String(error.meta.cause)
    });
  }
  return {
    success: false,
    statusCode,
    message: `Prisma Client Known Request Error: ${mainMessage}`,
    errorSources
  };
};
var handlePrismaClientUnknownError = (error) => {
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An unknown error occurred with the database operation.";
  const errorSources = [
    {
      path: "Unknown Prisma Error",
      message: mainMessage
    }
  ];
  return {
    success: false,
    statusCode: status33.INTERNAL_SERVER_ERROR,
    message: `Prisma Client Unknown Request Error: ${mainMessage}`,
    errorSources
  };
};
var handlePrismaClientValidationError = (error) => {
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const errorSources = [];
  const fieldMatch = cleanMessage.match(/Argument `(\w+)`/i);
  const fieldName = fieldMatch ? fieldMatch[1] : "Unknown Field";
  const mainMessage = lines.find(
    (line) => !line.includes("Argument") && !line.includes("\u2192") && line.length > 10
  ) || lines[0] || "Invalid query parameters provided to the database operation.";
  errorSources.push({
    path: fieldName,
    message: mainMessage
  });
  return {
    success: false,
    statusCode: status33.BAD_REQUEST,
    message: `Prisma Client Validation Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientInitializationError = (error) => {
  const statusCode = error.errorCode ? getStatusCodeFromPrismaError(error.errorCode) : status33.SERVICE_UNAVAILABLE;
  const cleanMessage = error.message;
  cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An error occurred while initializing the Prisma Client.";
  const errorSources = [
    {
      path: error.errorCode || "Initialization Error",
      message: mainMessage
    }
  ];
  return {
    success: false,
    statusCode,
    message: `Prisma Client Initialization Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientRustPanicError = () => {
  const errorSources = [
    {
      path: "Rust Engine Crashed",
      message: "The database engine encountered a fatal error and crashed. This is usually due to an internal bug in the Prisma engine or an unexpected edge case in the database operation. Please check the Prisma logs for more details and consider reporting this issue to the Prisma team if it persists."
    }
  ];
  return {
    success: false,
    statusCode: status33.INTERNAL_SERVER_ERROR,
    message: "Prisma Client Rust Panic Error: The database engine crashed due to a fatal error.",
    errorSources
  };
};

// src/app/errorHelpers/handleZodError.ts
import status34 from "http-status";
var handleZodError = (err) => {
  const statusCode = status34.BAD_REQUEST;
  const message = "Zod Validation Error";
  const errorSources = [];
  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" => "),
      message: issue.message
    });
  });
  return {
    success: false,
    message,
    errorSources,
    statusCode
  };
};

// src/app/utils/deleteUploadedFilesFromGlobalErrorHandler.ts
var deleteUploadedFilesFromGlobalErrorHandler = async (req) => {
  try {
    const filesToDelete = [];
    if (req.file && req.file?.path) {
      filesToDelete.push(req.file.path);
    } else if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
      Object.values(req.files).forEach((fileArray) => {
        if (Array.isArray(fileArray)) {
          fileArray.forEach((file) => {
            if (file.path) {
              filesToDelete.push(file.path);
            }
          });
        }
      });
    } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.path) {
          filesToDelete.push(file.path);
        }
      });
    }
    if (filesToDelete.length > 0) {
      await Promise.all(
        filesToDelete.map((url) => deleteFileFromCloudinary(url))
      );
      console.log(
        `
Deleted ${filesToDelete.length} uploaded file(s) from Cloudinary due to an error during request processing.
`
      );
    }
  } catch (error) {
    console.error(
      "Error deleting uploaded files from Global Error Handler",
      error
    );
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, req, res, next) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }
  if (envVars.SENTRY_DSN) {
    Sentry.captureException(err);
  }
  await deleteUploadedFilesFromGlobalErrorHandler(req);
  let errorSources = [];
  let statusCode = status35.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let stack = void 0;
  if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaClientKnownRequestError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    const simplifiedError = handlePrismaClientUnknownError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    const simplifiedError = handlePrismaClientValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    const simplifiedError = handlerPrismaClientRustPanicError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    const simplifiedError = handlerPrismaClientInitializationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof z14.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof AppError_default) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  } else if (err instanceof Error) {
    statusCode = status35.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  }
  const errorResponse = {
    success: false,
    message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? err : void 0,
    stack: envVars.NODE_ENV === "development" ? stack : void 0
  };
  res.status(statusCode).json(errorResponse);
};

// src/app/middleware/notFound.ts
import status36 from "http-status";
var notFound = (req, res) => {
  res.status(status36.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// src/app.ts
var app = express4();
if (envVars.SENTRY_DSN) {
  Sentry2.init({
    dsn: envVars.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1,
    //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1
  });
  Sentry2.setupExpressErrorHandler(app);
}
app.set("view engine", "ejs");
app.set("views", path4.join(process.cwd(), "src/app/templates"));
app.set("query parser", (str) => qs.parse(str));
app.use(requestLogger);
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use("/api/auth", toNodeHandler(auth));
app.use(express4.urlencoded({ extended: true }));
app.use(express4.json());
app.use(cookieParser());
app.use("/api", globalRateLimiter);
app.use("/api/v1", IndexRoutes);
app.get("/", (req, res) => {
  res.send("Hello from Next Bazar Server!");
});
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
