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
    "SUPER_ADMIN_PASSWORD",
    "BDCOURIER_API_BASE_URL",
    "BDCOURIER_API_KEY"
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
    BDCOURIER: {
      API_BASE_URL: process.env.BDCOURIER_API_BASE_URL,
      API_KEY: process.env.BDCOURIER_API_KEY
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
  "inlineSchema": `model Admin {
  id            String    @id @default(uuid(7))
  name          String
  email         String    @unique
  profilePhoto  String?
  contactNumber String?
  isDeleted     Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime?

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([email])
  @@index([isDeleted])
  @@map("admins")
}

model Attribute {
  id        String           @id @default(uuid())
  name      String
  shopId    String?
  shop      Shop?            @relation(fields: [shopId], references: [id], onDelete: Cascade)
  values    AttributeValue[]
  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt

  @@unique([name, shopId])
  @@index([shopId])
  @@map("attributes")
}

model AttributeValue {
  id          String    @id @default(uuid())
  value       String
  attributeId String
  attribute   Attribute @relation(fields: [attributeId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([value, attributeId])
  @@index([attributeId])
  @@map("attribute_values")
}

model User {
  id                 String     @id
  name               String
  email              String
  emailVerified      Boolean    @default(false)
  role               Role       @default(USER)
  status             UserStatus @default(ACTIVE)
  needPasswordChange Boolean    @default(false)
  isDeleted          Boolean    @default(false)
  deletedAt          DateTime?
  image              String?
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt

  // Relations
  sessions            Session[]
  accounts            Account[]
  admin               Admin?
  shop                Shop?
  orders              Order[]
  cart                Cart?
  reviews             Review[]
  notifications       Notification[]
  reviewedWithdrawals WithdrawalRequest[] @relation("WithdrawalReviewedBy")

  @@unique([email])
  @@index([role])
  @@index([status])
  @@index([isDeleted])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@index([userId])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@index([userId])
  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
  @@map("verification")
}

model Cart {
  id    String     @id @default(uuid())
  items CartItem[]

  // Relations
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("carts")
}

model CartItem {
  id       String @id @default(uuid())
  quantity Int    @default(1)

  // Relations
  cartId           String
  cart             Cart            @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId        String
  product          Product         @relation(fields: [productId], references: [id])
  productVariantId String?
  productVariant   ProductVariant? @relation(fields: [productVariantId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, productId, productVariantId]) // prevent duplicate variant in same cart
  @@index([cartId])
  @@index([productId])
  @@index([productVariantId])
  @@map("cart_items")
}

model Category {
  id       String  @id @default(uuid())
  name     String  @unique
  slug     String  @unique
  icon     String?
  image    String?
  isActive Boolean @default(true)

  // Self-relation for subcategories
  parentId      String?
  parent        Category?  @relation("CategoryToSubcategory", fields: [parentId], references: [id])
  subcategories Category[] @relation("CategoryToSubcategory")

  products Product[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([parentId])
  @@index([slug])
  @@map("categories")
}

enum DiscountType {
  FLAT
  PERCENTAGE
}

model Coupon {
  id                String       @id @default(uuid())
  code              String       @unique
  discountType      DiscountType
  discountAmount    Float
  maxDiscountAmount Float?
  minPurchaseAmount Float        @default(0)
  startDate         DateTime
  endDate           DateTime
  isActive          Boolean      @default(true)

  // Relations
  shopId   String
  shop     Shop            @relation(fields: [shopId], references: [id], onDelete: Cascade)
  products CouponProduct[]
  orders   Order[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([code])
  @@map("coupons")
}

model CouponProduct {
  id        String  @id @default(uuid())
  couponId  String
  productId String
  coupon    Coupon  @relation(fields: [couponId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([couponId, productId])
  @@map("coupon_products")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  SELLER
  USER
}

enum UserStatus {
  ACTIVE
  BLOCKED
  PENDING
  DELETED
}

enum ShopStatus {
  PENDING
  ACTIVE
  BLOCKED
}

enum ProductStatus {
  ACTIVE
  DRAFT
  OUT_OF_STOCK
  DELETED
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum ProductType {
  SIMPLE
  VARIABLE
}

enum OrderType {
  ONLINE
  POS
  LANDING_PAGE
}

enum VatType {
  INCLUDED
  EXCLUDED
}

enum WithdrawalStatus {
  PENDING
  APPROVED
  REJECTED
}

enum PayoutMethod {
  MOBILE_BANKING
  BANK_TRANSFER
}

enum MobileBankingProvider {
  BKASH
  NAGAD
}

model ExpenseCategory {
  id       String  @id @default(uuid())
  name     String
  isActive Boolean @default(true)

  shopId   String
  shop     Shop      @relation(fields: [shopId], references: [id], onDelete: Cascade)
  expenses Expense[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@map("expense_categories")
}

model Expense {
  id    String   @id @default(uuid())
  name  String
  price Float
  note  String?
  date  DateTime

  categoryId String
  category   ExpenseCategory @relation(fields: [categoryId], references: [id])
  shopId     String
  shop       Shop            @relation(fields: [shopId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([categoryId])
  @@map("expenses")
}

model HeroSlider {
  id        String   @id @default(uuid())
  image     String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("hero_sliders")
}

model LandingPage {
  id       String  @id @default(uuid())
  slug     String  @unique
  isActive Boolean @default(true)

  // Design \u2014 theme color key (see LANDING_PAGE_THEMES on the client), per-section visibility,
  // and section order (see LANDING_PAGE_SECTION_KEYS on the client)
  themeColor             String   @default("violet")
  showGallerySection     Boolean  @default(true)
  showAboutSection       Boolean  @default(true)
  showDescriptionSection Boolean  @default(true)
  showReviewsSection     Boolean  @default(true)
  sectionOrder           String[] @default(["price", "gallery", "about", "description", "reviews"])

  // Relations
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  shopId    String
  shop      Shop    @relation(fields: [shopId], references: [id], onDelete: Cascade)

  // Header
  campaignTitle            String
  campaignShortDescription String?
  bannerImage              String?

  // Price highlight labels (free text set by the seller, e.g. "\u09AA\u09C2\u09B0\u09CD\u09AC\u09C7\u09B0 \u09AE\u09C2\u09B2\u09CD\u09AF" / "Regular Price")
  regularPriceLabel String?
  offerPriceLabel   String?

  // Gallery
  galleryHeading     String?
  galleryDescription String?
  galleryImages      String[]

  // About + video
  aboutHeading     String?
  aboutDescription String?
  videoUrl         String?

  // Long description
  descriptionTitle String?
  description      String?

  // Reviews
  reviewHeading String?
  reviewImages  String[]

  // Order form
  orderFormHeading String @default("Order Now")
  orderButtonText  String @default("\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8")

  views Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([productId])
  @@map("landing_pages")
}

enum NotificationType {
  ORDER_PLACED
  ORDER_STATUS_CHANGED
  PAYMENT_STATUS_CHANGED
}

model Notification {
  id      String           @id @default(uuid())
  type    NotificationType
  title   String
  message String
  isRead  Boolean          @default(false)

  // Relations
  userId  String
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderId String?
  order   Order?  @relation(fields: [orderId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())

  @@index([userId, isRead])
  @@index([userId, createdAt])
  @@map("notifications")
}

model Order {
  id            String        @id @default(uuid())
  orderSeq      Int           @default(autoincrement())
  orderNumber   String?       @unique
  orderType     OrderType     @default(ONLINE)
  totalAmount   Float
  paymentStatus PaymentStatus @default(PENDING)
  paymentMethod String? // cash, card, mfs, other
  orderStatus   OrderStatus   @default(PENDING)

  // Shipping address (structured)
  fullName String?
  phone    String?
  address  String?
  district String?

  notes String? // Optional customer notes

  // Relations
  userId        String?
  user          User?          @relation(fields: [userId], references: [id])
  shopId        String?
  shop          Shop?          @relation(fields: [shopId], references: [id])
  items         OrderItem[]
  notifications Notification[]

  discountAmount Float   @default(0)
  shippingFee    Float   @default(0)
  couponId       String?
  coupon         Coupon? @relation(fields: [couponId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([shopId])
  @@index([paymentStatus])
  @@index([orderStatus])
  @@index([district])
  @@index([couponId])
  @@map("orders")
}

model OrderItem {
  id        String @id @default(uuid())
  quantity  Int
  price     Float // Sell price at time of purchase
  costPrice Float? // Purchase/cost price at time of purchase (null for orders placed before this field existed)

  // Vendor payout tracking
  vendorEarning   Float // price * quantity - commission
  platformEarning Float // commission amount

  // Item fulfillment status (per vendor)
  status OrderStatus @default(PENDING)

  // Relations
  orderId          String
  order            Order           @relation(fields: [orderId], references: [id])
  productId        String
  product          Product         @relation(fields: [productId], references: [id])
  productVariantId String?
  productVariant   ProductVariant? @relation(fields: [productVariantId], references: [id])
  shopId           String
  shop             Shop            @relation(fields: [shopId], references: [id])

  @@index([orderId])
  @@index([shopId])
  @@index([productId])
  @@index([productVariantId])
  @@map("order_items")
}

model PosCartItem {
  id String @id @default(uuid())

  shopId String
  shop   Shop   @relation(fields: [shopId], references: [id])

  productId String
  product   Product @relation(fields: [productId], references: [id])

  productVariantId String?

  productName  String
  price        Float
  quantity     Int     @default(1)
  combination  String? // variant label e.g. "XL-Red"
  productImage String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([productId])
  @@map("pos_cart_items")
}

model Product {
  id               String        @id @default(uuid())
  name             String
  slug             String        @unique
  description      String
  shortDescription String
  images           String[]
  stock            Int           @default(0)
  status           ProductStatus @default(DRAFT)
  type             ProductType   @default(SIMPLE)
  attributes       Json?

  // SKU / Barcode (SIMPLE products only \u2014 VARIABLE products carry it per-variant)
  sku String? @unique

  // Pricing
  purchasePrice Float // What vendor bought it for (internal cost)
  regularPrice  Float // Original MRP / crossed-out price shown to customer
  sellPrice     Float // Actual selling price (what customer pays)

  // Tags / searchability
  tags String[]

  // Vat, Shipping, Featured configuration
  vatType       VatType @default(INCLUDED)
  vatPercentage Float   @default(0)
  freeShipping  Boolean @default(false)
  isFeatured    Boolean @default(false)

  // Relations
  shopId     String
  shop       Shop     @relation(fields: [shopId], references: [id])
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  variants     ProductVariant[]
  reviews      Review[]
  orderItems   OrderItem[]
  cartItems    CartItem[]
  coupons      CouponProduct[]
  posCartItems PosCartItem[]
  landingPages LandingPage[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([categoryId])
  @@index([status])
  @@index([slug])
  @@map("products")
}

model ProductVariant {
  id          String  @id @default(uuid())
  productId   String
  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  combination String // e.g. "XL-Red-500gm"
  sku         String? @unique

  quantity      Int     @default(0)
  purchasePrice Float
  regularPrice  Float
  sellPrice     Float
  image         String?

  orderItems OrderItem[]
  cartItems  CartItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([productId])
  @@map("product_variants")
}

model DocumentEmbedding {
  id String @id @default(uuid(7))

  chunkKey    String  @unique
  sourceType  String
  sourceId    String
  sourceLabel String?
  content     String
  metadata    Json?

  embedding Unsupported("vector(2048)")

  isDeleted Boolean   @default(false)
  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([sourceType], name: "idx_document_embeddings_sourceType")
  @@index([sourceId], name: "idx_document_embeddings_sourceId")
  @@map("document_embeddings")
}

model Review {
  id      String  @id @default(uuid())
  rating  Int     @default(5) // 1\u20135 scale
  comment String?

  // Relations
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, productId]) // one review per product per user
  @@index([productId])
  @@index([userId])
  @@map("reviews")
}

generator client {
  provider        = "prisma-client"
  output          = "../../src/generated/prisma"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  extensions = [vector]
}

model ShippingSetting {
  id                      String @id @default("default") // a single row
  insideDhakaShippingFee  Float  @default(70)
  outsideDhakaShippingFee Float  @default(130)

  updatedAt DateTime @updatedAt

  @@map("shipping_settings")
}

model Shop {
  id          String     @id @default(uuid())
  name        String     @unique
  description String?
  logo        String?
  banner      String?
  status      ShopStatus @default(PENDING)

  // Commission rate for this specific shop (overrides global if set)
  commissionRate Float @default(10) // percentage e.g. 10 = 10%

  // Relations
  vendorId           String              @unique
  vendor             User                @relation(fields: [vendorId], references: [id])
  products           Product[]
  orderItems         OrderItem[]
  attributes         Attribute[]
  coupons            Coupon[]
  posCartItems       PosCartItem[]
  posOrders          Order[]
  landingPages       LandingPage[]
  expenseCategories  ExpenseCategory[]
  expenses           Expense[]
  withdrawalRequests WithdrawalRequest[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@map("shops")
}

model SiteSetting {
  id          String  @id @default("default") // a single row
  siteName    String  @default("NextBazar")
  tagline     String?
  description String  @default("Your ultimate multivendor marketplace. Discover premium products from verified sellers across the nation.")
  logo        String?
  phone       String?
  email       String?
  address     String?

  facebook  String?
  youtube   String?
  instagram String?
  linkedin  String?
  tiktok    String?
  whatsapp  String?

  copyrightText String @default("All rights reserved.")

  updatedAt DateTime @updatedAt

  @@map("site_settings")
}

model WithdrawalRequest {
  id     String           @id @default(uuid())
  amount Float
  status WithdrawalStatus @default(PENDING)

  // Payout method snapshot (flat fields, mirrors Order's flat address fields)
  payoutMethod          PayoutMethod
  mobileBankingProvider MobileBankingProvider?
  mobileNumber          String?

  bankName          String?
  bankAccountName   String?
  bankAccountNumber String?
  bankBranch        String?
  bankRoutingNumber String?

  adminNote         String?
  reviewedAt        DateTime?
  reviewedByAdminId String?
  reviewedByAdmin   User?     @relation("WithdrawalReviewedBy", fields: [reviewedByAdminId], references: [id])

  shopId String
  shop   Shop   @relation(fields: [shopId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([shopId])
  @@index([status])
  @@index([reviewedByAdminId])
  @@map("withdrawal_requests")
}
`,
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
config.runtimeDataModel = JSON.parse('{"models":{"Admin":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AdminToUser"}],"dbName":"admins"},"Attribute":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"AttributeToShop"},{"name":"values","kind":"object","type":"AttributeValue","relationName":"AttributeToAttributeValue"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attributes"},"AttributeValue":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"attributeId","kind":"scalar","type":"String"},{"name":"attribute","kind":"object","type":"Attribute","relationName":"AttributeToAttributeValue"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"attribute_values"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"admin","kind":"object","type":"Admin","relationName":"AdminToUser"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToUser"},{"name":"reviewedWithdrawals","kind":"object","type":"WithdrawalRequest","relationName":"WithdrawalReviewedBy"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productVariant","kind":"object","type":"ProductVariant","relationName":"CartItemToProductVariant"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart_items"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"subcategories","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Coupon":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"discountType","kind":"enum","type":"DiscountType"},{"name":"discountAmount","kind":"scalar","type":"Float"},{"name":"maxDiscountAmount","kind":"scalar","type":"Float"},{"name":"minPurchaseAmount","kind":"scalar","type":"Float"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"CouponToShop"},{"name":"products","kind":"object","type":"CouponProduct","relationName":"CouponToCouponProduct"},{"name":"orders","kind":"object","type":"Order","relationName":"CouponToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"coupons"},"CouponProduct":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"couponId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"coupon","kind":"object","type":"Coupon","relationName":"CouponToCouponProduct"},{"name":"product","kind":"object","type":"Product","relationName":"CouponProductToProduct"}],"dbName":"coupon_products"},"ExpenseCategory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ExpenseCategoryToShop"},{"name":"expenses","kind":"object","type":"Expense","relationName":"ExpenseToExpenseCategory"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"expense_categories"},"Expense":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"note","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"ExpenseCategory","relationName":"ExpenseToExpenseCategory"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ExpenseToShop"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"expenses"},"HeroSlider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"hero_sliders"},"LandingPage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"themeColor","kind":"scalar","type":"String"},{"name":"showGallerySection","kind":"scalar","type":"Boolean"},{"name":"showAboutSection","kind":"scalar","type":"Boolean"},{"name":"showDescriptionSection","kind":"scalar","type":"Boolean"},{"name":"showReviewsSection","kind":"scalar","type":"Boolean"},{"name":"sectionOrder","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"LandingPageToProduct"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"LandingPageToShop"},{"name":"campaignTitle","kind":"scalar","type":"String"},{"name":"campaignShortDescription","kind":"scalar","type":"String"},{"name":"bannerImage","kind":"scalar","type":"String"},{"name":"regularPriceLabel","kind":"scalar","type":"String"},{"name":"offerPriceLabel","kind":"scalar","type":"String"},{"name":"galleryHeading","kind":"scalar","type":"String"},{"name":"galleryDescription","kind":"scalar","type":"String"},{"name":"galleryImages","kind":"scalar","type":"String"},{"name":"aboutHeading","kind":"scalar","type":"String"},{"name":"aboutDescription","kind":"scalar","type":"String"},{"name":"videoUrl","kind":"scalar","type":"String"},{"name":"descriptionTitle","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"reviewHeading","kind":"scalar","type":"String"},{"name":"reviewImages","kind":"scalar","type":"String"},{"name":"orderFormHeading","kind":"scalar","type":"String"},{"name":"orderButtonText","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"landing_pages"},"Notification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"NotificationType"},{"name":"title","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"NotificationToUser"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"NotificationToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"notifications"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderSeq","kind":"scalar","type":"Int"},{"name":"orderNumber","kind":"scalar","type":"String"},{"name":"orderType","kind":"enum","type":"OrderType"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"orderStatus","kind":"enum","type":"OrderStatus"},{"name":"fullName","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"OrderToShop"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToOrder"},{"name":"discountAmount","kind":"scalar","type":"Float"},{"name":"shippingFee","kind":"scalar","type":"Float"},{"name":"couponId","kind":"scalar","type":"String"},{"name":"coupon","kind":"object","type":"Coupon","relationName":"CouponToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"costPrice","kind":"scalar","type":"Float"},{"name":"vendorEarning","kind":"scalar","type":"Float"},{"name":"platformEarning","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productVariant","kind":"object","type":"ProductVariant","relationName":"OrderItemToProductVariant"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"OrderItemToShop"}],"dbName":"order_items"},"PosCartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"PosCartItemToShop"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"PosCartItemToProduct"},{"name":"productVariantId","kind":"scalar","type":"String"},{"name":"productName","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"combination","kind":"scalar","type":"String"},{"name":"productImage","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"pos_cart_items"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"ProductStatus"},{"name":"type","kind":"enum","type":"ProductType"},{"name":"attributes","kind":"scalar","type":"Json"},{"name":"sku","kind":"scalar","type":"String"},{"name":"purchasePrice","kind":"scalar","type":"Float"},{"name":"regularPrice","kind":"scalar","type":"Float"},{"name":"sellPrice","kind":"scalar","type":"Float"},{"name":"tags","kind":"scalar","type":"String"},{"name":"vatType","kind":"enum","type":"VatType"},{"name":"vatPercentage","kind":"scalar","type":"Float"},{"name":"freeShipping","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ProductToShop"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"variants","kind":"object","type":"ProductVariant","relationName":"ProductToProductVariant"},{"name":"reviews","kind":"object","type":"Review","relationName":"ProductToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProduct"},{"name":"coupons","kind":"object","type":"CouponProduct","relationName":"CouponProductToProduct"},{"name":"posCartItems","kind":"object","type":"PosCartItem","relationName":"PosCartItemToProduct"},{"name":"landingPages","kind":"object","type":"LandingPage","relationName":"LandingPageToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"products"},"ProductVariant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToProductVariant"},{"name":"combination","kind":"scalar","type":"String"},{"name":"sku","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"purchasePrice","kind":"scalar","type":"Float"},{"name":"regularPrice","kind":"scalar","type":"Float"},{"name":"sellPrice","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProductVariant"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProductVariant"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"product_variants"},"DocumentEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"chunkKey","kind":"scalar","type":"String"},{"name":"sourceType","kind":"scalar","type":"String"},{"name":"sourceId","kind":"scalar","type":"String"},{"name":"sourceLabel","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"Json"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"document_embeddings"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"ShippingSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"insideDhakaShippingFee","kind":"scalar","type":"Float"},{"name":"outsideDhakaShippingFee","kind":"scalar","type":"Float"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shipping_settings"},"Shop":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"banner","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShopStatus"},{"name":"commissionRate","kind":"scalar","type":"Float"},{"name":"vendorId","kind":"scalar","type":"String"},{"name":"vendor","kind":"object","type":"User","relationName":"ShopToUser"},{"name":"products","kind":"object","type":"Product","relationName":"ProductToShop"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToShop"},{"name":"attributes","kind":"object","type":"Attribute","relationName":"AttributeToShop"},{"name":"coupons","kind":"object","type":"Coupon","relationName":"CouponToShop"},{"name":"posCartItems","kind":"object","type":"PosCartItem","relationName":"PosCartItemToShop"},{"name":"posOrders","kind":"object","type":"Order","relationName":"OrderToShop"},{"name":"landingPages","kind":"object","type":"LandingPage","relationName":"LandingPageToShop"},{"name":"expenseCategories","kind":"object","type":"ExpenseCategory","relationName":"ExpenseCategoryToShop"},{"name":"expenses","kind":"object","type":"Expense","relationName":"ExpenseToShop"},{"name":"withdrawalRequests","kind":"object","type":"WithdrawalRequest","relationName":"ShopToWithdrawalRequest"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shops"},"SiteSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"siteName","kind":"scalar","type":"String"},{"name":"tagline","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"facebook","kind":"scalar","type":"String"},{"name":"youtube","kind":"scalar","type":"String"},{"name":"instagram","kind":"scalar","type":"String"},{"name":"linkedin","kind":"scalar","type":"String"},{"name":"tiktok","kind":"scalar","type":"String"},{"name":"whatsapp","kind":"scalar","type":"String"},{"name":"copyrightText","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"site_settings"},"WithdrawalRequest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"WithdrawalStatus"},{"name":"payoutMethod","kind":"enum","type":"PayoutMethod"},{"name":"mobileBankingProvider","kind":"enum","type":"MobileBankingProvider"},{"name":"mobileNumber","kind":"scalar","type":"String"},{"name":"bankName","kind":"scalar","type":"String"},{"name":"bankAccountName","kind":"scalar","type":"String"},{"name":"bankAccountNumber","kind":"scalar","type":"String"},{"name":"bankBranch","kind":"scalar","type":"String"},{"name":"bankRoutingNumber","kind":"scalar","type":"String"},{"name":"adminNote","kind":"scalar","type":"String"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"reviewedByAdminId","kind":"scalar","type":"String"},{"name":"reviewedByAdmin","kind":"object","type":"User","relationName":"WithdrawalReviewedBy"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToWithdrawalRequest"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"withdrawal_requests"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","admin","vendor","shop","parent","subcategories","products","_count","category","product","items","order","notifications","coupon","orders","productVariant","orderItems","cart","cartItems","variants","reviews","coupons","posCartItems","landingPages","attribute","values","attributes","posOrders","expenses","expenseCategories","reviewedByAdmin","withdrawalRequests","reviewedWithdrawals","Admin.findUnique","Admin.findUniqueOrThrow","Admin.findFirst","Admin.findFirstOrThrow","Admin.findMany","data","Admin.createOne","Admin.createMany","Admin.createManyAndReturn","Admin.updateOne","Admin.updateMany","Admin.updateManyAndReturn","create","update","Admin.upsertOne","Admin.deleteOne","Admin.deleteMany","having","_min","_max","Admin.groupBy","Admin.aggregate","Attribute.findUnique","Attribute.findUniqueOrThrow","Attribute.findFirst","Attribute.findFirstOrThrow","Attribute.findMany","Attribute.createOne","Attribute.createMany","Attribute.createManyAndReturn","Attribute.updateOne","Attribute.updateMany","Attribute.updateManyAndReturn","Attribute.upsertOne","Attribute.deleteOne","Attribute.deleteMany","Attribute.groupBy","Attribute.aggregate","AttributeValue.findUnique","AttributeValue.findUniqueOrThrow","AttributeValue.findFirst","AttributeValue.findFirstOrThrow","AttributeValue.findMany","AttributeValue.createOne","AttributeValue.createMany","AttributeValue.createManyAndReturn","AttributeValue.updateOne","AttributeValue.updateMany","AttributeValue.updateManyAndReturn","AttributeValue.upsertOne","AttributeValue.deleteOne","AttributeValue.deleteMany","AttributeValue.groupBy","AttributeValue.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","_avg","_sum","CartItem.groupBy","CartItem.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Coupon.findUnique","Coupon.findUniqueOrThrow","Coupon.findFirst","Coupon.findFirstOrThrow","Coupon.findMany","Coupon.createOne","Coupon.createMany","Coupon.createManyAndReturn","Coupon.updateOne","Coupon.updateMany","Coupon.updateManyAndReturn","Coupon.upsertOne","Coupon.deleteOne","Coupon.deleteMany","Coupon.groupBy","Coupon.aggregate","CouponProduct.findUnique","CouponProduct.findUniqueOrThrow","CouponProduct.findFirst","CouponProduct.findFirstOrThrow","CouponProduct.findMany","CouponProduct.createOne","CouponProduct.createMany","CouponProduct.createManyAndReturn","CouponProduct.updateOne","CouponProduct.updateMany","CouponProduct.updateManyAndReturn","CouponProduct.upsertOne","CouponProduct.deleteOne","CouponProduct.deleteMany","CouponProduct.groupBy","CouponProduct.aggregate","ExpenseCategory.findUnique","ExpenseCategory.findUniqueOrThrow","ExpenseCategory.findFirst","ExpenseCategory.findFirstOrThrow","ExpenseCategory.findMany","ExpenseCategory.createOne","ExpenseCategory.createMany","ExpenseCategory.createManyAndReturn","ExpenseCategory.updateOne","ExpenseCategory.updateMany","ExpenseCategory.updateManyAndReturn","ExpenseCategory.upsertOne","ExpenseCategory.deleteOne","ExpenseCategory.deleteMany","ExpenseCategory.groupBy","ExpenseCategory.aggregate","Expense.findUnique","Expense.findUniqueOrThrow","Expense.findFirst","Expense.findFirstOrThrow","Expense.findMany","Expense.createOne","Expense.createMany","Expense.createManyAndReturn","Expense.updateOne","Expense.updateMany","Expense.updateManyAndReturn","Expense.upsertOne","Expense.deleteOne","Expense.deleteMany","Expense.groupBy","Expense.aggregate","HeroSlider.findUnique","HeroSlider.findUniqueOrThrow","HeroSlider.findFirst","HeroSlider.findFirstOrThrow","HeroSlider.findMany","HeroSlider.createOne","HeroSlider.createMany","HeroSlider.createManyAndReturn","HeroSlider.updateOne","HeroSlider.updateMany","HeroSlider.updateManyAndReturn","HeroSlider.upsertOne","HeroSlider.deleteOne","HeroSlider.deleteMany","HeroSlider.groupBy","HeroSlider.aggregate","LandingPage.findUnique","LandingPage.findUniqueOrThrow","LandingPage.findFirst","LandingPage.findFirstOrThrow","LandingPage.findMany","LandingPage.createOne","LandingPage.createMany","LandingPage.createManyAndReturn","LandingPage.updateOne","LandingPage.updateMany","LandingPage.updateManyAndReturn","LandingPage.upsertOne","LandingPage.deleteOne","LandingPage.deleteMany","LandingPage.groupBy","LandingPage.aggregate","Notification.findUnique","Notification.findUniqueOrThrow","Notification.findFirst","Notification.findFirstOrThrow","Notification.findMany","Notification.createOne","Notification.createMany","Notification.createManyAndReturn","Notification.updateOne","Notification.updateMany","Notification.updateManyAndReturn","Notification.upsertOne","Notification.deleteOne","Notification.deleteMany","Notification.groupBy","Notification.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","PosCartItem.findUnique","PosCartItem.findUniqueOrThrow","PosCartItem.findFirst","PosCartItem.findFirstOrThrow","PosCartItem.findMany","PosCartItem.createOne","PosCartItem.createMany","PosCartItem.createManyAndReturn","PosCartItem.updateOne","PosCartItem.updateMany","PosCartItem.updateManyAndReturn","PosCartItem.upsertOne","PosCartItem.deleteOne","PosCartItem.deleteMany","PosCartItem.groupBy","PosCartItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","ProductVariant.findUnique","ProductVariant.findUniqueOrThrow","ProductVariant.findFirst","ProductVariant.findFirstOrThrow","ProductVariant.findMany","ProductVariant.createOne","ProductVariant.createMany","ProductVariant.createManyAndReturn","ProductVariant.updateOne","ProductVariant.updateMany","ProductVariant.updateManyAndReturn","ProductVariant.upsertOne","ProductVariant.deleteOne","ProductVariant.deleteMany","ProductVariant.groupBy","ProductVariant.aggregate","DocumentEmbedding.findUnique","DocumentEmbedding.findUniqueOrThrow","DocumentEmbedding.findFirst","DocumentEmbedding.findFirstOrThrow","DocumentEmbedding.findMany","DocumentEmbedding.updateOne","DocumentEmbedding.updateMany","DocumentEmbedding.updateManyAndReturn","DocumentEmbedding.deleteOne","DocumentEmbedding.deleteMany","DocumentEmbedding.groupBy","DocumentEmbedding.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","ShippingSetting.findUnique","ShippingSetting.findUniqueOrThrow","ShippingSetting.findFirst","ShippingSetting.findFirstOrThrow","ShippingSetting.findMany","ShippingSetting.createOne","ShippingSetting.createMany","ShippingSetting.createManyAndReturn","ShippingSetting.updateOne","ShippingSetting.updateMany","ShippingSetting.updateManyAndReturn","ShippingSetting.upsertOne","ShippingSetting.deleteOne","ShippingSetting.deleteMany","ShippingSetting.groupBy","ShippingSetting.aggregate","Shop.findUnique","Shop.findUniqueOrThrow","Shop.findFirst","Shop.findFirstOrThrow","Shop.findMany","Shop.createOne","Shop.createMany","Shop.createManyAndReturn","Shop.updateOne","Shop.updateMany","Shop.updateManyAndReturn","Shop.upsertOne","Shop.deleteOne","Shop.deleteMany","Shop.groupBy","Shop.aggregate","SiteSetting.findUnique","SiteSetting.findUniqueOrThrow","SiteSetting.findFirst","SiteSetting.findFirstOrThrow","SiteSetting.findMany","SiteSetting.createOne","SiteSetting.createMany","SiteSetting.createManyAndReturn","SiteSetting.updateOne","SiteSetting.updateMany","SiteSetting.updateManyAndReturn","SiteSetting.upsertOne","SiteSetting.deleteOne","SiteSetting.deleteMany","SiteSetting.groupBy","SiteSetting.aggregate","WithdrawalRequest.findUnique","WithdrawalRequest.findUniqueOrThrow","WithdrawalRequest.findFirst","WithdrawalRequest.findFirstOrThrow","WithdrawalRequest.findMany","WithdrawalRequest.createOne","WithdrawalRequest.createMany","WithdrawalRequest.createManyAndReturn","WithdrawalRequest.updateOne","WithdrawalRequest.updateMany","WithdrawalRequest.updateManyAndReturn","WithdrawalRequest.upsertOne","WithdrawalRequest.deleteOne","WithdrawalRequest.deleteMany","WithdrawalRequest.groupBy","WithdrawalRequest.aggregate","AND","OR","NOT","id","amount","WithdrawalStatus","status","PayoutMethod","payoutMethod","MobileBankingProvider","mobileBankingProvider","mobileNumber","bankName","bankAccountName","bankAccountNumber","bankBranch","bankRoutingNumber","adminNote","reviewedAt","reviewedByAdminId","shopId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","siteName","tagline","description","logo","phone","email","address","facebook","youtube","instagram","linkedin","tiktok","whatsapp","copyrightText","name","banner","ShopStatus","commissionRate","vendorId","every","some","none","insideDhakaShippingFee","outsideDhakaShippingFee","rating","comment","userId","productId","chunkKey","sourceType","sourceId","sourceLabel","content","metadata","isDeleted","deletedAt","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","combination","sku","quantity","purchasePrice","regularPrice","sellPrice","image","slug","shortDescription","images","stock","ProductStatus","ProductType","type","tags","VatType","vatType","vatPercentage","freeShipping","isFeatured","categoryId","has","hasEvery","hasSome","productVariantId","productName","price","productImage","costPrice","vendorEarning","platformEarning","OrderStatus","orderId","orderSeq","orderNumber","OrderType","orderType","totalAmount","PaymentStatus","paymentStatus","paymentMethod","orderStatus","fullName","district","notes","discountAmount","shippingFee","couponId","NotificationType","title","message","isRead","isActive","themeColor","showGallerySection","showAboutSection","showDescriptionSection","showReviewsSection","sectionOrder","campaignTitle","campaignShortDescription","bannerImage","regularPriceLabel","offerPriceLabel","galleryHeading","galleryDescription","galleryImages","aboutHeading","aboutDescription","videoUrl","descriptionTitle","reviewHeading","reviewImages","orderFormHeading","orderButtonText","views","note","date","code","DiscountType","discountType","maxDiscountAmount","minPurchaseAmount","startDate","endDate","icon","parentId","cartId","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","emailVerified","Role","role","UserStatus","needPasswordChange","attributeId","profilePhoto","contactNumber","value_attributeId","name_shopId","userId_productId","cartId_productId_productVariantId","couponId_productId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "7A6EArwDDgMAAMAGACDqAwAA1AcAMOsDAAALABDsAwAA1AcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhkQQBAAAAAZoEAQC2BgAhpgQBAAAAAa4EIADYBgAhrwRAANkGACGjBQEAtwYAIaQFAQC3BgAhAQAAAAEAIAwDAADABgAg6gMAANYHADDrAwAAAwAQ7AMAANYHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGmBAEAtgYAIZAFQAC4BgAhmgUBALYGACGbBQEAtwYAIZwFAQC3BgAhAwMAAPYKACCbBQAA1wcAIJwFAADXBwAgDAMAAMAGACDqAwAA1gcAMOsDAAADABDsAwAA1gcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhpgQBALYGACGQBUAAuAYAIZoFAQAAAAGbBQEAtwYAIZwFAQC3BgAhAwAAAAMAIAEAAAQAMAIAAAUAIBEDAADABgAg6gMAANUHADDrAwAABwAQ7AMAANUHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGmBAEAtgYAIZEFAQC2BgAhkgUBALYGACGTBQEAtwYAIZQFAQC3BgAhlQUBALcGACGWBUAA2QYAIZcFQADZBgAhmAUBALcGACGZBQEAtwYAIQgDAAD2CgAgkwUAANcHACCUBQAA1wcAIJUFAADXBwAglgUAANcHACCXBQAA1wcAIJgFAADXBwAgmQUAANcHACARAwAAwAYAIOoDAADVBwAw6wMAAAcAEOwDAADVBwAw7QMBAAAAAf8DQAC4BgAhgARAALgGACGmBAEAtgYAIZEFAQC2BgAhkgUBALYGACGTBQEAtwYAIZQFAQC3BgAhlQUBALcGACGWBUAA2QYAIZcFQADZBgAhmAUBALcGACGZBQEAtwYAIQMAAAAHACABAAAIADACAAAJACAOAwAAwAYAIOoDAADUBwAw6wMAAAsAEOwDAADUBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhkQQBALYGACGaBAEAtgYAIaYEAQC2BgAhrgQgANgGACGvBEAA2QYAIaMFAQC3BgAhpAUBALcGACEBAAAACwAgGAcAAMAGACALAADBBgAgFQAAwgYAIBoAAMQGACAbAADFBgAgHAAAxwYAIB8AAMMGACAgAADGBgAgIQAAyQYAICIAAMgGACAkAADKBgAg6gMAAL0GADDrAwAADQAQ7AMAAL0GADDtAwEAtgYAIfADAAC-Bp0EIv8DQAC4BgAhgARAALgGACGOBAEAtwYAIY8EAQC3BgAhmgQBALYGACGbBAEAtwYAIZ0ECAC_BgAhngQBALYGACEBAAAADQAgIwgAAKUHACANAADSBwAgFQAAwgYAIBcAAIcHACAYAADTBwAgGQAAmwcAIBoAAKwHACAbAADFBgAgHAAAxwYAIB8AANcGACDqAwAAzgcAMOsDAAAPABDsAwAAzgcAMO0DAQC2BgAh8AMAAM8HwgQi_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALYGACGaBAEAtgYAIbcEAQC3BgAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvQQBALYGACG-BAEAtgYAIb8EAADcBgAgwAQCALQHACHDBAAA0AfDBCLEBAAA3AYAIMYEAADRB8YEIscECAC_BgAhyAQgANgGACHJBCAA2AYAIcoEAQC2BgAhCwgAAPQMACANAACPDQAgFQAA-AoAIBcAAIEMACAYAACRDQAgGQAA9gwAIBoAAIgNACAbAAD7CgAgHAAA_QoAIB8AANcHACC3BAAA1wcAICMIAAClBwAgDQAA0gcAIBUAAMIGACAXAACHBwAgGAAA0wcAIBkAAJsHACAaAACsBwAgGwAAxQYAIBwAAMcGACAfAADXBgAg6gMAAM4HADDrAwAADwAQ7AMAAM4HADDtAwEAAAAB8AMAAM8HwgQi_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALYGACGaBAEAtgYAIbcEAQAAAAG5BAgAvwYAIboECAC_BgAhuwQIAL8GACG9BAEAAAABvgQBALYGACG_BAAA3AYAIMAEAgC0BwAhwwQAANAHwwQixAQAANwGACDGBAAA0QfGBCLHBAgAvwYAIcgEIADYBgAhyQQgANgGACHKBAEAtgYAIQMAAAAPACABAAAQADACAAARACAPCQAAzAcAIAoAAM0HACALAADBBgAg6gMAAMsHADDrAwAAEwAQ7AMAAMsHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIbwEAQC3BgAhvQQBALYGACHqBCAA2AYAIYsFAQC3BgAhjAUBALcGACEBAAAAEwAgBgkAAI8NACAKAACQDQAgCwAA9woAILwEAADXBwAgiwUAANcHACCMBQAA1wcAIA8JAADMBwAgCgAAzQcAIAsAAMEGACDqAwAAywcAMOsDAAATABDsAwAAywcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhmgQBAAAAAbwEAQC3BgAhvQQBAAAAAeoEIADYBgAhiwUBALcGACGMBQEAtwYAIQMAAAATACABAAAVADACAAAWACADAAAADwAgAQAAEAAwAgAAEQAgAQAAABMAIAEAAAAPACARDgAAtQcAIBUAAMIGACAXAACHBwAg6gMAAMoHADDrAwAAGwAQ7AMAAMoHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC2BgAhtwQBALcGACG4BAIAtAcAIbkECAC_BgAhugQIAL8GACG7BAgAvwYAIbwEAQC3BgAhBQ4AAIsNACAVAAD4CgAgFwAAgQwAILcEAADXBwAgvAQAANcHACARDgAAtQcAIBUAAMIGACAXAACHBwAg6gMAAMoHADDrAwAAGwAQ7AMAAMoHADDtAwEAAAAB_wNAALgGACGABEAAuAYAIacEAQC2BgAhtgQBALYGACG3BAEAAAABuAQCALQHACG5BAgAvwYAIboECAC_BgAhuwQIAL8GACG8BAEAtwYAIQMAAAAbACABAAAcADACAAAdACASCAAApQcAIA4AALUHACAQAADJBwAgFAAAvAcAIOoDAADIBwAw6wMAAB8AEOwDAADIBwAw7QMBALYGACHwAwAAwAfWBCL-AwEAtgYAIacEAQC2BgAhuAQCALQHACHOBAEAtwYAIdAECAC_BgAh0gQIAKsHACHTBAgAvwYAIdQECAC_BgAh1gQBALYGACEGCAAA9AwAIA4AAIsNACAQAACODQAgFAAAjA0AIM4EAADXBwAg0gQAANcHACASCAAApQcAIA4AALUHACAQAADJBwAgFAAAvAcAIOoDAADIBwAw6wMAAB8AEOwDAADIBwAw7QMBAAAAAfADAADAB9YEIv4DAQC2BgAhpwQBALYGACG4BAIAtAcAIc4EAQC3BgAh0AQIAL8GACHSBAgAqwcAIdMECAC_BgAh1AQIAL8GACHWBAEAtgYAIQMAAAAfACABAAAgADACAAAhACAYBAAAlgcAIAUAAJcHACAGAACYBwAgCAAAmQcAIBEAAJwHACATAADGBgAgFgAAmgcAIBkAAJsHACAlAADKBgAg6gMAAJMHADDrAwAAIwAQ7AMAAJMHADDtAwEAtgYAIfADAACVB6EFIv8DQAC4BgAhgARAALgGACGRBAEAtgYAIZoEAQC2BgAhrgQgANgGACGvBEAA2QYAIbwEAQC3BgAhnQUgANgGACGfBQAAlAefBSKhBSAA2AYAIQEAAAAjACABAAAADQAgAwAAAB8AIAEAACAAMAIAACEAIA0DAADABgAgEAAAxwcAIOoDAADFBwAw6wMAACcAEOwDAADFBwAw7QMBALYGACH_A0AAuAYAIaYEAQC2BgAhwwQAAMYH5wQi1gQBALcGACHnBAEAtgYAIegEAQC2BgAh6QQgANgGACEDAwAA9goAIBAAAI4NACDWBAAA1wcAIA0DAADABgAgEAAAxwcAIOoDAADFBwAw6wMAACcAEOwDAADFBwAw7QMBAAAAAf8DQAC4BgAhpgQBALYGACHDBAAAxgfnBCLWBAEAtwYAIecEAQC2BgAh6AQBALYGACHpBCAA2AYAIQMAAAAnACABAAAoADACAAApACAcAwAApAcAIAgAAJkHACAPAADCBgAgEQAAnAcAIBIAAMEHACDqAwAAvQcAMOsDAAArABDsAwAAvQcAMO0DAQC2BgAh_gMBALcGACH_A0AAuAYAIYAEQAC4BgAhkAQBALcGACGSBAEAtwYAIaYEAQC3BgAh1wQCALQHACHYBAEAtwYAIdoEAAC-B9oEItsECAC_BgAh3QQAAL8H3QQi3gQBALcGACHfBAAAwAfWBCLgBAEAtwYAIeEEAQC3BgAh4gQBALcGACHjBAgAvwYAIeQECAC_BgAh5QQBALcGACEBAAAAKwAgEggAAKUHACALAACsBwAgEwAAxgYAIOoDAACpBwAw6wMAAC0AEOwDAACpBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACHjBAgAvwYAIeoEIADYBgAhhAUBALYGACGGBQAAqgeGBSKHBQgAqwcAIYgFCAC_BgAhiQVAALgGACGKBUAAuAYAIQEAAAAtACAIDgAAtQcAIBIAAMQHACDqAwAAwwcAMOsDAAAvABDsAwAAwwcAMO0DAQC2BgAhpwQBALYGACHlBAEAtgYAIQIOAACLDQAgEgAAjQ0AIAkOAAC1BwAgEgAAxAcAIOoDAADDBwAw6wMAAC8AEOwDAADDBwAw7QMBAAAAAacEAQC2BgAh5QQBALYGACGpBQAAwgcAIAMAAAAvACABAAAwADACAAAxACAPAwAA9goAIAgAAPQMACAPAAD4CgAgEQAA9wwAIBIAAI0NACD-AwAA1wcAIJAEAADXBwAgkgQAANcHACCmBAAA1wcAINgEAADXBwAg3gQAANcHACDgBAAA1wcAIOEEAADXBwAg4gQAANcHACDlBAAA1wcAIBwDAACkBwAgCAAAmQcAIA8AAMIGACARAACcBwAgEgAAwQcAIOoDAAC9BwAw6wMAACsAEOwDAAC9BwAw7QMBAAAAAf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZAEAQC3BgAhkgQBALcGACGmBAEAtwYAIdcEAgC0BwAh2AQBAAAAAdoEAAC-B9oEItsECAC_BgAh3QQAAL8H3QQi3gQBALcGACHfBAAAwAfWBCLgBAEAtwYAIeEEAQC3BgAh4gQBALcGACHjBAgAvwYAIeQECAC_BgAh5QQBALcGACEDAAAAKwAgAQAAMwAwAgAANAAgAQAAAC8AIAEAAAArACABAAAAHwAgAQAAACcAIAEAAAAbACANDgAAtQcAIBQAALwHACAWAAC7BwAg6gMAALoHADDrAwAAOwAQ7AMAALoHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbgEAgC0BwAhzgQBALcGACGNBQEAtgYAIQQOAACLDQAgFAAAjA0AIBYAAPUMACDOBAAA1wcAIA4OAAC1BwAgFAAAvAcAIBYAALsHACDqAwAAugcAMOsDAAA7ABDsAwAAugcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhpwQBALYGACG4BAIAtAcAIc4EAQC3BgAhjQUBALYGACGoBQAAuQcAIAMAAAA7ACABAAA8ADACAAA9ACADAAAAOwAgAQAAPAAwAgAAPQAgAQAAADsAIAEAAAAbACABAAAAHwAgAQAAADsAIAwDAADABgAgDgAAtQcAIOoDAAC4BwAw6wMAAEQAEOwDAAC4BwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpAQCALQHACGlBAEAtwYAIaYEAQC2BgAhpwQBALYGACEDAwAA9goAIA4AAIsNACClBAAA1wcAIA0DAADABgAgDgAAtQcAIOoDAAC4BwAw6wMAAEQAEOwDAAC4BwAw7QMBAAAAAf8DQAC4BgAhgARAALgGACGkBAIAtAcAIaUEAQC3BgAhpgQBALYGACGnBAEAtgYAIacFAAC3BwAgAwAAAEQAIAEAAEUAMAIAAEYAIAMAAAAfACABAAAgADACAAAhACADAAAAOwAgAQAAPAAwAgAAPQAgAwAAAC8AIAEAADAAMAIAADEAIBAIAAClBwAgDgAAtQcAIOoDAAC2BwAw6wMAAEsAEOwDAAC2BwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC3BgAhuAQCALQHACHOBAEAtwYAIc8EAQC2BgAh0AQIAL8GACHRBAEAtwYAIQUIAAD0DAAgDgAAiw0AILYEAADXBwAgzgQAANcHACDRBAAA1wcAIBAIAAClBwAgDgAAtQcAIOoDAAC2BwAw6wMAAEsAEOwDAAC2BwAw7QMBAAAAAf4DAQC2BgAh_wNAALgGACGABEAAuAYAIacEAQC2BgAhtgQBALcGACG4BAIAtAcAIc4EAQC3BgAhzwQBALYGACHQBAgAvwYAIdEEAQC3BgAhAwAAAEsAIAEAAEwAMAIAAE0AICQIAAClBwAgDgAAtQcAIOoDAACzBwAw6wMAAE8AEOwDAACzBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGOBAEAtwYAIacEAQC2BgAhvQQBALYGACHqBCAA2AYAIesEAQC2BgAh7AQgANgGACHtBCAA2AYAIe4EIADYBgAh7wQgANgGACHwBAAA3AYAIPEEAQC2BgAh8gQBALcGACHzBAEAtwYAIfQEAQC3BgAh9QQBALcGACH2BAEAtwYAIfcEAQC3BgAh-AQAANwGACD5BAEAtwYAIfoEAQC3BgAh-wQBALcGACH8BAEAtwYAIf0EAQC3BgAh_gQAANwGACD_BAEAtgYAIYAFAQC2BgAhgQUCALQHACEOCAAA9AwAIA4AAIsNACCOBAAA1wcAIPIEAADXBwAg8wQAANcHACD0BAAA1wcAIPUEAADXBwAg9gQAANcHACD3BAAA1wcAIPkEAADXBwAg-gQAANcHACD7BAAA1wcAIPwEAADXBwAg_QQAANcHACAkCAAApQcAIA4AALUHACDqAwAAswcAMOsDAABPABDsAwAAswcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGOBAEAtwYAIacEAQC2BgAhvQQBAAAAAeoEIADYBgAh6wQBALYGACHsBCAA2AYAIe0EIADYBgAh7gQgANgGACHvBCAA2AYAIfAEAADcBgAg8QQBALYGACHyBAEAtwYAIfMEAQC3BgAh9AQBALcGACH1BAEAtwYAIfYEAQC3BgAh9wQBALcGACH4BAAA3AYAIPkEAQC3BgAh-gQBALcGACH7BAEAtwYAIfwEAQC3BgAh_QQBALcGACH-BAAA3AYAIP8EAQC2BgAhgAUBALYGACGBBQIAtAcAIQMAAABPACABAABQADACAABRACABAAAAGwAgAQAAAEQAIAEAAAAfACABAAAAOwAgAQAAAC8AIAEAAABLACABAAAATwAgAwAAAB8AIAEAACAAMAIAACEAIAoIAACZBwAgHgAAsgcAIOoDAACxBwAw6wMAAFsAEOwDAACxBwAw7QMBALYGACH-AwEAtwYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIQMIAAD0DAAgHgAAig0AIP4DAADXBwAgCwgAAJkHACAeAACyBwAg6gMAALEHADDrAwAAWwAQ7AMAALEHADDtAwEAAAAB_gMBALcGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACGmBQAAsAcAIAMAAABbACABAABcADACAABdACABAAAADQAgCR0AAK8HACDqAwAArgcAMOsDAABgABDsAwAArgcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIY8FAQC2BgAhogUBALYGACEBHQAAiQ0AIAodAACvBwAg6gMAAK4HADDrAwAAYAAQ7AMAAK4HADDtAwEAAAAB_wNAALgGACGABEAAuAYAIY8FAQC2BgAhogUBALYGACGlBQAArQcAIAMAAABgACABAABhADACAABiACABAAAAYAAgBAgAAPQMACALAACIDQAgEwAA_AoAIIcFAADXBwAgEggAAKUHACALAACsBwAgEwAAxgYAIOoDAACpBwAw6wMAAC0AEOwDAACpBwAw7QMBAAAAAf4DAQC2BgAh_wNAALgGACGABEAAuAYAIeMECAC_BgAh6gQgANgGACGEBQEAAAABhgUAAKoHhgUihwUIAKsHACGIBQgAvwYAIYkFQAC4BgAhigVAALgGACEDAAAALQAgAQAAZQAwAgAAZgAgAwAAAEsAIAEAAEwAMAIAAE0AIAMAAAArACABAAAzADACAAA0ACADAAAATwAgAQAAUAAwAgAAUQAgCwgAAKUHACAhAADJBgAg6gMAAKgHADDrAwAAawAQ7AMAAKgHADDtAwEAtgYAIf4DAQC2BgAh_wNAALgGACGABEAAuAYAIZoEAQC2BgAh6gQgANgGACECCAAA9AwAICEAAP8KACALCAAApQcAICEAAMkGACDqAwAAqAcAMOsDAABrABDsAwAAqAcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIeoEIADYBgAhAwAAAGsAIAEAAGwAMAIAAG0AIA4IAAClBwAgDQAApwcAIOoDAACmBwAw6wMAAG8AEOwDAACmBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIcoEAQC2BgAh0AQIAL8GACGCBQEAtwYAIYMFQAC4BgAhAwgAAPQMACANAACHDQAgggUAANcHACAOCAAApQcAIA0AAKcHACDqAwAApgcAMOsDAABvABDsAwAApgcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIcoEAQC2BgAh0AQIAL8GACGCBQEAtwYAIYMFQAC4BgAhAwAAAG8AIAEAAHAAMAIAAHEAIAEAAABvACADAAAAbwAgAQAAcAAwAgAAcQAgFggAAKUHACAjAACkBwAg6gMAAKAHADDrAwAAdQAQ7AMAAKAHADDtAwEAtgYAIe4DCAC_BgAh8AMAAKEH8AMi8gMAAKIH8gMi9AMAAKMH9AMj9QMBALcGACH2AwEAtwYAIfcDAQC3BgAh-AMBALcGACH5AwEAtwYAIfoDAQC3BgAh-wMBALcGACH8A0AA2QYAIf0DAQC3BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhDAgAAPQMACAjAAD2CgAg9AMAANcHACD1AwAA1wcAIPYDAADXBwAg9wMAANcHACD4AwAA1wcAIPkDAADXBwAg-gMAANcHACD7AwAA1wcAIPwDAADXBwAg_QMAANcHACAWCAAApQcAICMAAKQHACDqAwAAoAcAMOsDAAB1ABDsAwAAoAcAMO0DAQAAAAHuAwgAvwYAIfADAAChB_ADIvIDAACiB_IDIvQDAACjB_QDI_UDAQC3BgAh9gMBALcGACH3AwEAtwYAIfgDAQC3BgAh-QMBALcGACH6AwEAtwYAIfsDAQC3BgAh_ANAANkGACH9AwEAtwYAIf4DAQC2BgAh_wNAALgGACGABEAAuAYAIQMAAAB1ACABAAB2ADACAAB3ACABAAAAIwAgAQAAAA8AIAEAAAAfACABAAAAWwAgAQAAAC0AIAEAAABLACABAAAAKwAgAQAAAE8AIAEAAABrACABAAAAbwAgAQAAAHUAIAMAAAArACABAAAzADACAAA0ACAJAwAAwAYAIA8AAIcHACDqAwAAhgcAMOsDAACFAQAQ7AMAAIYHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGmBAEAtgYAIQEAAACFAQAgAwAAAEQAIAEAAEUAMAIAAEYAIAMAAAAnACABAAAoADACAAApACADAAAAdQAgAQAAdgAwAgAAdwAgAQAAAAMAIAEAAAAHACABAAAAKwAgAQAAAEQAIAEAAAAnACABAAAAdQAgAQAAAAEAIAQDAAD2CgAgrwQAANcHACCjBQAA1wcAIKQFAADXBwAgAwAAAAsAIAEAAJEBADACAAABACADAAAACwAgAQAAkQEAMAIAAAEAIAMAAAALACABAACRAQAwAgAAAQAgCwMAAIYNACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGRBAEAAAABmgQBAAAAAaYEAQAAAAGuBCAAAAABrwRAAAAAAaMFAQAAAAGkBQEAAAABASsAAJUBACAK7QMBAAAAAf8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGmBAEAAAABrgQgAAAAAa8EQAAAAAGjBQEAAAABpAUBAAAAAQErAACXAQAwASsAAJcBADALAwAAhQ0AIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGmBAEA3QcAIa4EIAChCAAhrwRAAOMHACGjBQEA4gcAIaQFAQDiBwAhAgAAAAEAICsAAJoBACAK7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIaYEAQDdBwAhrgQgAKEIACGvBEAA4wcAIaMFAQDiBwAhpAUBAOIHACECAAAACwAgKwAAnAEAIAIAAAALACArAACcAQAgAwAAAAEAIDIAAJUBACAzAACaAQAgAQAAAAEAIAEAAAALACAGDAAAgg0AIDgAAIQNACA5AACDDQAgrwQAANcHACCjBQAA1wcAIKQFAADXBwAgDeoDAACfBwAw6wMAAKMBABDsAwAAnwcAMO0DAQCaBgAh_wNAAKEGACGABEAAoQYAIZEEAQCaBgAhmgQBAJoGACGmBAEAmgYAIa4EIADSBgAhrwRAAKAGACGjBQEAnwYAIaQFAQCfBgAhAwAAAAsAIAEAAKIBADA3AACjAQAgAwAAAAsAIAEAAJEBADACAAABACABAAAAXQAgAQAAAF0AIAMAAABbACABAABcADACAABdACADAAAAWwAgAQAAXAAwAgAAXQAgAwAAAFsAIAEAAFwAMAIAAF0AIAcIAACBDQAgHgAA0AkAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABASsAAKsBACAF7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAEBKwAArQEAMAErAACtAQAwAQAAAA0AIAcIAACADQAgHgAAwgkAIO0DAQDdBwAh_gMBAOIHACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACECAAAAXQAgKwAAsQEAIAXtAwEA3QcAIf4DAQDiBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhAgAAAFsAICsAALMBACACAAAAWwAgKwAAswEAIAEAAAANACADAAAAXQAgMgAAqwEAIDMAALEBACABAAAAXQAgAQAAAFsAIAQMAAD9DAAgOAAA_wwAIDkAAP4MACD-AwAA1wcAIAjqAwAAngcAMOsDAAC7AQAQ7AMAAJ4HADDtAwEAmgYAIf4DAQCfBgAh_wNAAKEGACGABEAAoQYAIZoEAQCaBgAhAwAAAFsAIAEAALoBADA3AAC7AQAgAwAAAFsAIAEAAFwAMAIAAF0AIAEAAABiACABAAAAYgAgAwAAAGAAIAEAAGEAMAIAAGIAIAMAAABgACABAABhADACAABiACADAAAAYAAgAQAAYQAwAgAAYgAgBh0AAPwMACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGPBQEAAAABogUBAAAAAQErAADDAQAgBe0DAQAAAAH_A0AAAAABgARAAAAAAY8FAQAAAAGiBQEAAAABASsAAMUBADABKwAAxQEAMAYdAAD7DAAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhjwUBAN0HACGiBQEA3QcAIQIAAABiACArAADIAQAgBe0DAQDdBwAh_wNAAOQHACGABEAA5AcAIY8FAQDdBwAhogUBAN0HACECAAAAYAAgKwAAygEAIAIAAABgACArAADKAQAgAwAAAGIAIDIAAMMBACAzAADIAQAgAQAAAGIAIAEAAABgACADDAAA-AwAIDgAAPoMACA5AAD5DAAgCOoDAACdBwAw6wMAANEBABDsAwAAnQcAMO0DAQCaBgAh_wNAAKEGACGABEAAoQYAIY8FAQCaBgAhogUBAJoGACEDAAAAYAAgAQAA0AEAMDcAANEBACADAAAAYAAgAQAAYQAwAgAAYgAgGAQAAJYHACAFAACXBwAgBgAAmAcAIAgAAJkHACARAACcBwAgEwAAxgYAIBYAAJoHACAZAACbBwAgJQAAygYAIOoDAACTBwAw6wMAACMAEOwDAACTBwAw7QMBAAAAAfADAACVB6EFIv8DQAC4BgAhgARAALgGACGRBAEAAAABmgQBALYGACGuBCAA2AYAIa8EQADZBgAhvAQBALcGACGdBSAA2AYAIZ8FAACUB58FIqEFIADYBgAhAQAAANQBACABAAAA1AEAIAsEAADxDAAgBQAA8gwAIAYAAPMMACAIAAD0DAAgEQAA9wwAIBMAAPwKACAWAAD1DAAgGQAA9gwAICUAAIALACCvBAAA1wcAILwEAADXBwAgAwAAACMAIAEAANcBADACAADUAQAgAwAAACMAIAEAANcBADACAADUAQAgAwAAACMAIAEAANcBADACAADUAQAgFQQAAOgMACAFAADpDAAgBgAA6gwAIAgAAOsMACARAADvDAAgEwAA7AwAIBYAAO0MACAZAADuDAAgJQAA8AwAIO0DAQAAAAHwAwAAAKEFAv8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGuBCAAAAABrwRAAAAAAbwEAQAAAAGdBSAAAAABnwUAAACfBQKhBSAAAAABASsAANsBACAM7QMBAAAAAfADAAAAoQUC_wNAAAAAAYAEQAAAAAGRBAEAAAABmgQBAAAAAa4EIAAAAAGvBEAAAAABvAQBAAAAAZ0FIAAAAAGfBQAAAJ8FAqEFIAAAAAEBKwAA3QEAMAErAADdAQAwFQQAAJQMACAFAACVDAAgBgAAlgwAIAgAAJcMACARAACbDAAgEwAAmAwAIBYAAJkMACAZAACaDAAgJQAAnAwAIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhAgAAANQBACArAADgAQAgDO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhAgAAACMAICsAAOIBACACAAAAIwAgKwAA4gEAIAMAAADUAQAgMgAA2wEAIDMAAOABACABAAAA1AEAIAEAAAAjACAFDAAAjwwAIDgAAJEMACA5AACQDAAgrwQAANcHACC8BAAA1wcAIA_qAwAAjAcAMOsDAADpAQAQ7AMAAIwHADDtAwEAmgYAIfADAACOB6EFIv8DQAChBgAhgARAAKEGACGRBAEAmgYAIZoEAQCaBgAhrgQgANIGACGvBEAAoAYAIbwEAQCfBgAhnQUgANIGACGfBQAAjQefBSKhBSAA0gYAIQMAAAAjACABAADoAQAwNwAA6QEAIAMAAAAjACABAADXAQAwAgAA1AEAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgCQMAAI4MACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGmBAEAAAABkAVAAAAAAZoFAQAAAAGbBQEAAAABnAUBAAAAAQErAADxAQAgCO0DAQAAAAH_A0AAAAABgARAAAAAAaYEAQAAAAGQBUAAAAABmgUBAAAAAZsFAQAAAAGcBQEAAAABASsAAPMBADABKwAA8wEAMAkDAACNDAAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpgQBAN0HACGQBUAA5AcAIZoFAQDdBwAhmwUBAOIHACGcBQEA4gcAIQIAAAAFACArAAD2AQAgCO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIaYEAQDdBwAhkAVAAOQHACGaBQEA3QcAIZsFAQDiBwAhnAUBAOIHACECAAAAAwAgKwAA-AEAIAIAAAADACArAAD4AQAgAwAAAAUAIDIAAPEBACAzAAD2AQAgAQAAAAUAIAEAAAADACAFDAAAigwAIDgAAIwMACA5AACLDAAgmwUAANcHACCcBQAA1wcAIAvqAwAAiwcAMOsDAAD_AQAQ7AMAAIsHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGmBAEAmgYAIZAFQAChBgAhmgUBAJoGACGbBQEAnwYAIZwFAQCfBgAhAwAAAAMAIAEAAP4BADA3AAD_AQAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAAJACABAAAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgDgMAAIkMACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGmBAEAAAABkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZUFAQAAAAGWBUAAAAABlwVAAAAAAZgFAQAAAAGZBQEAAAABASsAAIcCACAN7QMBAAAAAf8DQAAAAAGABEAAAAABpgQBAAAAAZEFAQAAAAGSBQEAAAABkwUBAAAAAZQFAQAAAAGVBQEAAAABlgVAAAAAAZcFQAAAAAGYBQEAAAABmQUBAAAAAQErAACJAgAwASsAAIkCADAOAwAAiAwAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIaYEAQDdBwAhkQUBAN0HACGSBQEA3QcAIZMFAQDiBwAhlAUBAOIHACGVBQEA4gcAIZYFQADjBwAhlwVAAOMHACGYBQEA4gcAIZkFAQDiBwAhAgAAAAkAICsAAIwCACAN7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpgQBAN0HACGRBQEA3QcAIZIFAQDdBwAhkwUBAOIHACGUBQEA4gcAIZUFAQDiBwAhlgVAAOMHACGXBUAA4wcAIZgFAQDiBwAhmQUBAOIHACECAAAABwAgKwAAjgIAIAIAAAAHACArAACOAgAgAwAAAAkAIDIAAIcCACAzAACMAgAgAQAAAAkAIAEAAAAHACAKDAAAhQwAIDgAAIcMACA5AACGDAAgkwUAANcHACCUBQAA1wcAIJUFAADXBwAglgUAANcHACCXBQAA1wcAIJgFAADXBwAgmQUAANcHACAQ6gMAAIoHADDrAwAAlQIAEOwDAACKBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhpgQBAJoGACGRBQEAmgYAIZIFAQCaBgAhkwUBAJ8GACGUBQEAnwYAIZUFAQCfBgAhlgVAAKAGACGXBUAAoAYAIZgFAQCfBgAhmQUBAJ8GACEDAAAABwAgAQAAlAIAMDcAAJUCACADAAAABwAgAQAACAAwAgAACQAgCeoDAACJBwAw6wMAAJsCABDsAwAAiQcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhjgUBALYGACGPBQEAtgYAIZAFQAC4BgAhAQAAAJgCACABAAAAmAIAIAnqAwAAiQcAMOsDAACbAgAQ7AMAAIkHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGOBQEAtgYAIY8FAQC2BgAhkAVAALgGACEAAwAAAJsCACABAACcAgAwAgAAmAIAIAMAAACbAgAgAQAAnAIAMAIAAJgCACADAAAAmwIAIAEAAJwCADACAACYAgAgBu0DAQAAAAH_A0AAAAABgARAAAAAAY4FAQAAAAGPBQEAAAABkAVAAAAAAQErAACgAgAgBu0DAQAAAAH_A0AAAAABgARAAAAAAY4FAQAAAAGPBQEAAAABkAVAAAAAAQErAACiAgAwASsAAKICADAG7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgUBAN0HACGPBQEA3QcAIZAFQADkBwAhAgAAAJgCACArAAClAgAgBu0DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4FAQDdBwAhjwUBAN0HACGQBUAA5AcAIQIAAACbAgAgKwAApwIAIAIAAACbAgAgKwAApwIAIAMAAACYAgAgMgAAoAIAIDMAAKUCACABAAAAmAIAIAEAAACbAgAgAwwAAIIMACA4AACEDAAgOQAAgwwAIAnqAwAAiAcAMOsDAACuAgAQ7AMAAIgHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGOBQEAmgYAIY8FAQCaBgAhkAVAAKEGACEDAAAAmwIAIAEAAK0CADA3AACuAgAgAwAAAJsCACABAACcAgAwAgAAmAIAIAkDAADABgAgDwAAhwcAIOoDAACGBwAw6wMAAIUBABDsAwAAhgcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhpgQBAAAAAQEAAACxAgAgAQAAALECACACAwAA9goAIA8AAIEMACADAAAAhQEAIAEAALQCADACAACxAgAgAwAAAIUBACABAAC0AgAwAgAAsQIAIAMAAACFAQAgAQAAtAIAMAIAALECACAGAwAAgAwAIA8AAP8LACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGmBAEAAAABASsAALgCACAE7QMBAAAAAf8DQAAAAAGABEAAAAABpgQBAAAAAQErAAC6AgAwASsAALoCADAGAwAA9QsAIA8AAPQLACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGmBAEA3QcAIQIAAACxAgAgKwAAvQIAIATtAwEA3QcAIf8DQADkBwAhgARAAOQHACGmBAEA3QcAIQIAAACFAQAgKwAAvwIAIAIAAACFAQAgKwAAvwIAIAMAAACxAgAgMgAAuAIAIDMAAL0CACABAAAAsQIAIAEAAACFAQAgAwwAAPELACA4AADzCwAgOQAA8gsAIAfqAwAAhQcAMOsDAADGAgAQ7AMAAIUHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGmBAEAmgYAIQMAAACFAQAgAQAAxQIAMDcAAMYCACADAAAAhQEAIAEAALQCADACAACxAgAgAQAAAD0AIAEAAAA9ACADAAAAOwAgAQAAPAAwAgAAPQAgAwAAADsAIAEAADwAMAIAAD0AIAMAAAA7ACABAAA8ADACAAA9ACAKDgAA0woAIBQAAKQKACAWAACjCgAg7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbgEAgAAAAHOBAEAAAABjQUBAAAAAQErAADOAgAgB-0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAY0FAQAAAAEBKwAA0AIAMAErAADQAgAwAQAAABsAIAoOAADRCgAgFAAAoQoAIBYAAKAKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbgEAgC-CAAhzgQBAOIHACGNBQEA3QcAIQIAAAA9ACArAADUAgAgB-0DAQDdBwAh_wNAAOQHACGABEAA5AcAIacEAQDdBwAhuAQCAL4IACHOBAEA4gcAIY0FAQDdBwAhAgAAADsAICsAANYCACACAAAAOwAgKwAA1gIAIAEAAAAbACADAAAAPQAgMgAAzgIAIDMAANQCACABAAAAPQAgAQAAADsAIAYMAADsCwAgOAAA7wsAIDkAAO4LACC6AQAA7QsAILsBAADwCwAgzgQAANcHACAK6gMAAIQHADDrAwAA3gIAEOwDAACEBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhpwQBAJoGACG4BAIAzgYAIc4EAQCfBgAhjQUBAJoGACEDAAAAOwAgAQAA3QIAMDcAAN4CACADAAAAOwAgAQAAPAAwAgAAPQAgAQAAABYAIAEAAAAWACADAAAAEwAgAQAAFQAwAgAAFgAgAwAAABMAIAEAABUAMAIAABYAIAMAAAATACABAAAVADACAAAWACAMCQAA6wsAIAoAAOkLACALAADqCwAg7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAbwEAQAAAAG9BAEAAAAB6gQgAAAAAYsFAQAAAAGMBQEAAAABASsAAOYCACAJ7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAbwEAQAAAAG9BAEAAAAB6gQgAAAAAYsFAQAAAAGMBQEAAAABASsAAOgCADABKwAA6AIAMAEAAAATACAMCQAA0QsAIAoAANILACALAADTCwAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhAgAAABYAICsAAOwCACAJ7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhAgAAABMAICsAAO4CACACAAAAEwAgKwAA7gIAIAEAAAATACADAAAAFgAgMgAA5gIAIDMAAOwCACABAAAAFgAgAQAAABMAIAYMAADOCwAgOAAA0AsAIDkAAM8LACC8BAAA1wcAIIsFAADXBwAgjAUAANcHACAM6gMAAIMHADDrAwAA9gIAEOwDAACDBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhmgQBAJoGACG8BAEAnwYAIb0EAQCaBgAh6gQgANIGACGLBQEAnwYAIYwFAQCfBgAhAwAAABMAIAEAAPUCADA3AAD2AgAgAwAAABMAIAEAABUAMAIAABYAIAEAAABmACABAAAAZgAgAwAAAC0AIAEAAGUAMAIAAGYAIAMAAAAtACABAABlADACAABmACADAAAALQAgAQAAZQAwAgAAZgAgDwgAAM0LACALAAC1CQAgEwAAtgkAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAHjBAgAAAAB6gQgAAAAAYQFAQAAAAGGBQAAAIYFAocFCAAAAAGIBQgAAAABiQVAAAAAAYoFQAAAAAEBKwAA_gIAIAztAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAAB4wQIAAAAAeoEIAAAAAGEBQEAAAABhgUAAACGBQKHBQgAAAABiAUIAAAAAYkFQAAAAAGKBUAAAAABASsAAIADADABKwAAgAMAMA8IAADMCwAgCwAAmQkAIBMAAJoJACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIeMECADeBwAh6gQgAKEIACGEBQEA3QcAIYYFAACXCYYFIocFCADxCAAhiAUIAN4HACGJBUAA5AcAIYoFQADkBwAhAgAAAGYAICsAAIMDACAM7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACHjBAgA3gcAIeoEIAChCAAhhAUBAN0HACGGBQAAlwmGBSKHBQgA8QgAIYgFCADeBwAhiQVAAOQHACGKBUAA5AcAIQIAAAAtACArAACFAwAgAgAAAC0AICsAAIUDACADAAAAZgAgMgAA_gIAIDMAAIMDACABAAAAZgAgAQAAAC0AIAYMAADHCwAgOAAAygsAIDkAAMkLACC6AQAAyAsAILsBAADLCwAghwUAANcHACAP6gMAAP8GADDrAwAAjAMAEOwDAAD_BgAw7QMBAJoGACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACHjBAgAmwYAIeoEIADSBgAhhAUBAJoGACGGBQAAgAeGBSKHBQgA6AYAIYgFCACbBgAhiQVAAKEGACGKBUAAoQYAIQMAAAAtACABAACLAwAwNwAAjAMAIAMAAAAtACABAABlADACAABmACABAAAAMQAgAQAAADEAIAMAAAAvACABAAAwADACAAAxACADAAAALwAgAQAAMAAwAgAAMQAgAwAAAC8AIAEAADAAMAIAADEAIAUOAACzCQAgEgAAlAoAIO0DAQAAAAGnBAEAAAAB5QQBAAAAAQErAACUAwAgA-0DAQAAAAGnBAEAAAAB5QQBAAAAAQErAACWAwAwASsAAJYDADAFDgAAsQkAIBIAAJIKACDtAwEA3QcAIacEAQDdBwAh5QQBAN0HACECAAAAMQAgKwAAmQMAIAPtAwEA3QcAIacEAQDdBwAh5QQBAN0HACECAAAALwAgKwAAmwMAIAIAAAAvACArAACbAwAgAwAAADEAIDIAAJQDACAzAACZAwAgAQAAADEAIAEAAAAvACADDAAAxAsAIDgAAMYLACA5AADFCwAgBuoDAAD-BgAw6wMAAKIDABDsAwAA_gYAMO0DAQCaBgAhpwQBAJoGACHlBAEAmgYAIQMAAAAvACABAAChAwAwNwAAogMAIAMAAAAvACABAAAwADACAAAxACABAAAAbQAgAQAAAG0AIAMAAABrACABAABsADACAABtACADAAAAawAgAQAAbAAwAgAAbQAgAwAAAGsAIAEAAGwAMAIAAG0AIAgIAADDCwAgIQAAsAgAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAAB6gQgAAAAAQErAACqAwAgBu0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAAB6gQgAAAAAQErAACsAwAwASsAAKwDADAICAAAwgsAICEAAKMIACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAh6gQgAKEIACECAAAAbQAgKwAArwMAIAbtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAh6gQgAKEIACECAAAAawAgKwAAsQMAIAIAAABrACArAACxAwAgAwAAAG0AIDIAAKoDACAzAACvAwAgAQAAAG0AIAEAAABrACADDAAAvwsAIDgAAMELACA5AADACwAgCeoDAAD9BgAw6wMAALgDABDsAwAA_QYAMO0DAQCaBgAh_gMBAJoGACH_A0AAoQYAIYAEQAChBgAhmgQBAJoGACHqBCAA0gYAIQMAAABrACABAAC3AwAwNwAAuAMAIAMAAABrACABAABsADACAABtACABAAAAcQAgAQAAAHEAIAMAAABvACABAABwADACAABxACADAAAAbwAgAQAAcAAwAgAAcQAgAwAAAG8AIAEAAHAAMAIAAHEAIAsIAACuCAAgDQAAlggAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABygQBAAAAAdAECAAAAAGCBQEAAAABgwVAAAAAAQErAADAAwAgCe0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABygQBAAAAAdAECAAAAAGCBQEAAAABgwVAAAAAAQErAADCAwAwASsAAMIDADALCAAArAgAIA0AAJQIACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhygQBAN0HACHQBAgA3gcAIYIFAQDiBwAhgwVAAOQHACECAAAAcQAgKwAAxQMAIAntAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhygQBAN0HACHQBAgA3gcAIYIFAQDiBwAhgwVAAOQHACECAAAAbwAgKwAAxwMAIAIAAABvACArAADHAwAgAwAAAHEAIDIAAMADACAzAADFAwAgAQAAAHEAIAEAAABvACAGDAAAugsAIDgAAL0LACA5AAC8CwAgugEAALsLACC7AQAAvgsAIIIFAADXBwAgDOoDAAD8BgAw6wMAAM4DABDsAwAA_AYAMO0DAQCaBgAh_gMBAJoGACH_A0AAoQYAIYAEQAChBgAhmgQBAJoGACHKBAEAmgYAIdAECACbBgAhggUBAJ8GACGDBUAAoQYAIQMAAABvACABAADNAwAwNwAAzgMAIAMAAABvACABAABwADACAABxACAI6gMAAPsGADDrAwAA1AMAEOwDAAD7BgAw7QMBAAAAAf8DQAC4BgAhgARAALgGACG8BAEAtgYAIeoEIADYBgAhAQAAANEDACABAAAA0QMAIAjqAwAA-wYAMOsDAADUAwAQ7AMAAPsGADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACG8BAEAtgYAIeoEIADYBgAhAAMAAADUAwAgAQAA1QMAMAIAANEDACADAAAA1AMAIAEAANUDADACAADRAwAgAwAAANQDACABAADVAwAwAgAA0QMAIAXtAwEAAAAB_wNAAAAAAYAEQAAAAAG8BAEAAAAB6gQgAAAAAQErAADZAwAgBe0DAQAAAAH_A0AAAAABgARAAAAAAbwEAQAAAAHqBCAAAAABASsAANsDADABKwAA2wMAMAXtAwEA3QcAIf8DQADkBwAhgARAAOQHACG8BAEA3QcAIeoEIAChCAAhAgAAANEDACArAADeAwAgBe0DAQDdBwAh_wNAAOQHACGABEAA5AcAIbwEAQDdBwAh6gQgAKEIACECAAAA1AMAICsAAOADACACAAAA1AMAICsAAOADACADAAAA0QMAIDIAANkDACAzAADeAwAgAQAAANEDACABAAAA1AMAIAMMAAC3CwAgOAAAuQsAIDkAALgLACAI6gMAAPoGADDrAwAA5wMAEOwDAAD6BgAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhvAQBAJoGACHqBCAA0gYAIQMAAADUAwAgAQAA5gMAMDcAAOcDACADAAAA1AMAIAEAANUDADACAADRAwAgAQAAAFEAIAEAAABRACADAAAATwAgAQAAUAAwAgAAUQAgAwAAAE8AIAEAAFAAMAIAAFEAIAMAAABPACABAABQADACAABRACAhCAAA_gkAIA4AAMUIACDtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAacEAQAAAAG9BAEAAAAB6gQgAAAAAesEAQAAAAHsBCAAAAAB7QQgAAAAAe4EIAAAAAHvBCAAAAAB8AQAAMIIACDxBAEAAAAB8gQBAAAAAfMEAQAAAAH0BAEAAAAB9QQBAAAAAfYEAQAAAAH3BAEAAAAB-AQAAMMIACD5BAEAAAAB-gQBAAAAAfsEAQAAAAH8BAEAAAAB_QQBAAAAAf4EAADECAAg_wQBAAAAAYAFAQAAAAGBBQIAAAABASsAAO8DACAf7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGnBAEAAAABvQQBAAAAAeoEIAAAAAHrBAEAAAAB7AQgAAAAAe0EIAAAAAHuBCAAAAAB7wQgAAAAAfAEAADCCAAg8QQBAAAAAfIEAQAAAAHzBAEAAAAB9AQBAAAAAfUEAQAAAAH2BAEAAAAB9wQBAAAAAfgEAADDCAAg-QQBAAAAAfoEAQAAAAH7BAEAAAAB_AQBAAAAAf0EAQAAAAH-BAAAxAgAIP8EAQAAAAGABQEAAAABgQUCAAAAAQErAADxAwAwASsAAPEDADAhCAAA_AkAIA4AAMAIACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhpwQBAN0HACG9BAEA3QcAIeoEIAChCAAh6wQBAN0HACHsBCAAoQgAIe0EIAChCAAh7gQgAKEIACHvBCAAoQgAIfAEAAC7CAAg8QQBAN0HACHyBAEA4gcAIfMEAQDiBwAh9AQBAOIHACH1BAEA4gcAIfYEAQDiBwAh9wQBAOIHACH4BAAAvAgAIPkEAQDiBwAh-gQBAOIHACH7BAEA4gcAIfwEAQDiBwAh_QQBAOIHACH-BAAAvQgAIP8EAQDdBwAhgAUBAN0HACGBBQIAvggAIQIAAABRACArAAD0AwAgH-0DAQDdBwAh_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGnBAEA3QcAIb0EAQDdBwAh6gQgAKEIACHrBAEA3QcAIewEIAChCAAh7QQgAKEIACHuBCAAoQgAIe8EIAChCAAh8AQAALsIACDxBAEA3QcAIfIEAQDiBwAh8wQBAOIHACH0BAEA4gcAIfUEAQDiBwAh9gQBAOIHACH3BAEA4gcAIfgEAAC8CAAg-QQBAOIHACH6BAEA4gcAIfsEAQDiBwAh_AQBAOIHACH9BAEA4gcAIf4EAAC9CAAg_wQBAN0HACGABQEA3QcAIYEFAgC-CAAhAgAAAE8AICsAAPYDACACAAAATwAgKwAA9gMAIAMAAABRACAyAADvAwAgMwAA9AMAIAEAAABRACABAAAATwAgEQwAALILACA4AAC1CwAgOQAAtAsAILoBAACzCwAguwEAALYLACCOBAAA1wcAIPIEAADXBwAg8wQAANcHACD0BAAA1wcAIPUEAADXBwAg9gQAANcHACD3BAAA1wcAIPkEAADXBwAg-gQAANcHACD7BAAA1wcAIPwEAADXBwAg_QQAANcHACAi6gMAAPkGADDrAwAA_QMAEOwDAAD5BgAw7QMBAJoGACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACGOBAEAnwYAIacEAQCaBgAhvQQBAJoGACHqBCAA0gYAIesEAQCaBgAh7AQgANIGACHtBCAA0gYAIe4EIADSBgAh7wQgANIGACHwBAAA3AYAIPEEAQCaBgAh8gQBAJ8GACHzBAEAnwYAIfQEAQCfBgAh9QQBAJ8GACH2BAEAnwYAIfcEAQCfBgAh-AQAANwGACD5BAEAnwYAIfoEAQCfBgAh-wQBAJ8GACH8BAEAnwYAIf0EAQCfBgAh_gQAANwGACD_BAEAmgYAIYAFAQCaBgAhgQUCAM4GACEDAAAATwAgAQAA_AMAMDcAAP0DACADAAAATwAgAQAAUAAwAgAAUQAgAQAAACkAIAEAAAApACADAAAAJwAgAQAAKAAwAgAAKQAgAwAAACcAIAEAACgAMAIAACkAIAMAAAAnACABAAAoADACAAApACAKAwAA5ggAIBAAALELACDtAwEAAAAB_wNAAAAAAaYEAQAAAAHDBAAAAOcEAtYEAQAAAAHnBAEAAAAB6AQBAAAAAekEIAAAAAEBKwAAhQQAIAjtAwEAAAAB_wNAAAAAAaYEAQAAAAHDBAAAAOcEAtYEAQAAAAHnBAEAAAAB6AQBAAAAAekEIAAAAAEBKwAAhwQAMAErAACHBAAwAQAAACsAIAoDAADkCAAgEAAAsAsAIO0DAQDdBwAh_wNAAOQHACGmBAEA3QcAIcMEAADiCOcEItYEAQDiBwAh5wQBAN0HACHoBAEA3QcAIekEIAChCAAhAgAAACkAICsAAIsEACAI7QMBAN0HACH_A0AA5AcAIaYEAQDdBwAhwwQAAOII5wQi1gQBAOIHACHnBAEA3QcAIegEAQDdBwAh6QQgAKEIACECAAAAJwAgKwAAjQQAIAIAAAAnACArAACNBAAgAQAAACsAIAMAAAApACAyAACFBAAgMwAAiwQAIAEAAAApACABAAAAJwAgBAwAAK0LACA4AACvCwAgOQAArgsAINYEAADXBwAgC-oDAAD1BgAw6wMAAJUEABDsAwAA9QYAMO0DAQCaBgAh_wNAAKEGACGmBAEAmgYAIcMEAAD2BucEItYEAQCfBgAh5wQBAJoGACHoBAEAmgYAIekEIADSBgAhAwAAACcAIAEAAJQEADA3AACVBAAgAwAAACcAIAEAACgAMAIAACkAIAEAAAA0ACABAAAANAAgAwAAACsAIAEAADMAMAIAADQAIAMAAAArACABAAAzADACAAA0ACADAAAAKwAgAQAAMwAwAgAANAAgGQMAAPsIACAIAAClCQAgDwAA_AgAIBEAAP0IACASAAD-CAAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZAEAQAAAAGSBAEAAAABpgQBAAAAAdcEAgAAAAHYBAEAAAAB2gQAAADaBALbBAgAAAAB3QQAAADdBALeBAEAAAAB3wQAAADWBALgBAEAAAAB4QQBAAAAAeIEAQAAAAHjBAgAAAAB5AQIAAAAAeUEAQAAAAEBKwAAnQQAIBTtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABkAQBAAAAAZIEAQAAAAGmBAEAAAAB1wQCAAAAAdgEAQAAAAHaBAAAANoEAtsECAAAAAHdBAAAAN0EAt4EAQAAAAHfBAAAANYEAuAEAQAAAAHhBAEAAAAB4gQBAAAAAeMECAAAAAHkBAgAAAAB5QQBAAAAAQErAACfBAAwASsAAJ8EADABAAAAIwAgAQAAAA0AIAEAAAAtACAZAwAA1AgAIAgAAKMJACAPAADVCAAgEQAA1ggAIBIAANcIACDtAwEA3QcAIf4DAQDiBwAh_wNAAOQHACGABEAA5AcAIZAEAQDiBwAhkgQBAOIHACGmBAEA4gcAIdcEAgC-CAAh2AQBAOIHACHaBAAA0AjaBCLbBAgA3gcAId0EAADRCN0EIt4EAQDiBwAh3wQAANII1gQi4AQBAOIHACHhBAEA4gcAIeIEAQDiBwAh4wQIAN4HACHkBAgA3gcAIeUEAQDiBwAhAgAAADQAICsAAKUEACAU7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIQIAAAArACArAACnBAAgAgAAACsAICsAAKcEACABAAAAIwAgAQAAAA0AIAEAAAAtACADAAAANAAgMgAAnQQAIDMAAKUEACABAAAANAAgAQAAACsAIA8MAACoCwAgOAAAqwsAIDkAAKoLACC6AQAAqQsAILsBAACsCwAg_gMAANcHACCQBAAA1wcAIJIEAADXBwAgpgQAANcHACDYBAAA1wcAIN4EAADXBwAg4AQAANcHACDhBAAA1wcAIOIEAADXBwAg5QQAANcHACAX6gMAAO4GADDrAwAAsQQAEOwDAADuBgAw7QMBAJoGACH-AwEAnwYAIf8DQAChBgAhgARAAKEGACGQBAEAnwYAIZIEAQCfBgAhpgQBAJ8GACHXBAIAzgYAIdgEAQCfBgAh2gQAAO8G2gQi2wQIAJsGACHdBAAA8AbdBCLeBAEAnwYAId8EAADpBtYEIuAEAQCfBgAh4QQBAJ8GACHiBAEAnwYAIeMECACbBgAh5AQIAJsGACHlBAEAnwYAIQMAAAArACABAACwBAAwNwAAsQQAIAMAAAArACABAAAzADACAAA0ACABAAAAIQAgAQAAACEAIAMAAAAfACABAAAgADACAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIA8IAAD5CAAgDgAA9wgAIBAAANsJACAUAAD4CAAg7QMBAAAAAfADAAAA1gQC_gMBAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAdAECAAAAAHSBAgAAAAB0wQIAAAAAdQECAAAAAHWBAEAAAABASsAALkEACAL7QMBAAAAAfADAAAA1gQC_gMBAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAdAECAAAAAHSBAgAAAAB0wQIAAAAAdQECAAAAAHWBAEAAAABASsAALsEADABKwAAuwQAMAEAAAAbACAPCAAA9QgAIA4AAPMIACAQAADZCQAgFAAA9AgAIO0DAQDdBwAh8AMAANII1gQi_gMBAN0HACGnBAEA3QcAIbgEAgC-CAAhzgQBAOIHACHQBAgA3gcAIdIECADxCAAh0wQIAN4HACHUBAgA3gcAIdYEAQDdBwAhAgAAACEAICsAAL8EACAL7QMBAN0HACHwAwAA0gjWBCL-AwEA3QcAIacEAQDdBwAhuAQCAL4IACHOBAEA4gcAIdAECADeBwAh0gQIAPEIACHTBAgA3gcAIdQECADeBwAh1gQBAN0HACECAAAAHwAgKwAAwQQAIAIAAAAfACArAADBBAAgAQAAABsAIAMAAAAhACAyAAC5BAAgMwAAvwQAIAEAAAAhACABAAAAHwAgBwwAAKMLACA4AACmCwAgOQAApQsAILoBAACkCwAguwEAAKcLACDOBAAA1wcAINIEAADXBwAgDuoDAADnBgAw6wMAAMkEABDsAwAA5wYAMO0DAQCaBgAh8AMAAOkG1gQi_gMBAJoGACGnBAEAmgYAIbgEAgDOBgAhzgQBAJ8GACHQBAgAmwYAIdIECADoBgAh0wQIAJsGACHUBAgAmwYAIdYEAQCaBgAhAwAAAB8AIAEAAMgEADA3AADJBAAgAwAAAB8AIAEAACAAMAIAACEAIAEAAABNACABAAAATQAgAwAAAEsAIAEAAEwAMAIAAE0AIAMAAABLACABAABMADACAABNACADAAAASwAgAQAATAAwAgAATQAgDQgAAIkKACAOAACMCQAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG2BAEAAAABuAQCAAAAAc4EAQAAAAHPBAEAAAAB0AQIAAAAAdEEAQAAAAEBKwAA0QQAIAvtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbYEAQAAAAG4BAIAAAABzgQBAAAAAc8EAQAAAAHQBAgAAAAB0QQBAAAAAQErAADTBAAwASsAANMEADANCAAAhwoAIA4AAIoJACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIacEAQDdBwAhtgQBAOIHACG4BAIAvggAIc4EAQDiBwAhzwQBAN0HACHQBAgA3gcAIdEEAQDiBwAhAgAAAE0AICsAANYEACAL7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbYEAQDiBwAhuAQCAL4IACHOBAEA4gcAIc8EAQDdBwAh0AQIAN4HACHRBAEA4gcAIQIAAABLACArAADYBAAgAgAAAEsAICsAANgEACADAAAATQAgMgAA0QQAIDMAANYEACABAAAATQAgAQAAAEsAIAgMAACeCwAgOAAAoQsAIDkAAKALACC6AQAAnwsAILsBAACiCwAgtgQAANcHACDOBAAA1wcAINEEAADXBwAgDuoDAADmBgAw6wMAAN8EABDsAwAA5gYAMO0DAQCaBgAh_gMBAJoGACH_A0AAoQYAIYAEQAChBgAhpwQBAJoGACG2BAEAnwYAIbgEAgDOBgAhzgQBAJ8GACHPBAEAmgYAIdAECACbBgAh0QQBAJ8GACEDAAAASwAgAQAA3gQAMDcAAN8EACADAAAASwAgAQAATAAwAgAATQAgAQAAABEAIAEAAAARACADAAAADwAgAQAAEAAwAgAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAPACABAAAQADACAAARACAgCAAAnQsAIA0AAOMKACAVAADmCgAgFwAA5woAIBgAAOQKACAZAADlCgAgGgAA6AoAIBsAAOkKACAcAADqCgAgH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABASsAAOcEACAXH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABASsAAOkEADABKwAA6QQAMCAIAACcCwAgDQAA7AkAIBUAAO8JACAXAADwCQAgGAAA7QkAIBkAAO4JACAaAADxCQAgGwAA8gkAIBwAAPMJACAfgAAAAAHtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIQIAAAARACArAADsBAAgFx-AAAAAAe0DAQDdBwAh8AMAAOcJwgQi_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAN0HACGaBAEA3QcAIbcEAQDiBwAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvQQBAN0HACG-BAEA3QcAIb8EAADmCQAgwAQCAL4IACHDBAAA6AnDBCLEBAAA6QkAIMYEAADqCcYEIscECADeBwAhyAQgAKEIACHJBCAAoQgAIcoEAQDdBwAhAgAAAA8AICsAAO4EACACAAAADwAgKwAA7gQAIAMAAAARACAyAADnBAAgMwAA7AQAIAEAAAARACABAAAADwAgBwwAAJcLACAfAADXBwAgOAAAmgsAIDkAAJkLACC6AQAAmAsAILsBAACbCwAgtwQAANcHACAaHwAA0QYAIOoDAADbBgAw6wMAAPUEABDsAwAA2wYAMO0DAQCaBgAh8AMAAN0GwgQi_gMBAJoGACH_A0AAoQYAIYAEQAChBgAhjgQBAJoGACGaBAEAmgYAIbcEAQCfBgAhuQQIAJsGACG6BAgAmwYAIbsECACbBgAhvQQBAJoGACG-BAEAmgYAIb8EAADcBgAgwAQCAM4GACHDBAAA3gbDBCLEBAAA3AYAIMYEAADfBsYEIscECACbBgAhyAQgANIGACHJBCAA0gYAIcoEAQCaBgAhAwAAAA8AIAEAAPQEADA3AAD1BAAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAAdACABAAAAHQAgAwAAABsAIAEAABwAMAIAAB0AIAMAAAAbACABAAAcADACAAAdACADAAAAGwAgAQAAHAAwAgAAHQAgDg4AAJYLACAVAADeCgAgFwAA3woAIO0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG2BAEAAAABtwQBAAAAAbgEAgAAAAG5BAgAAAABugQIAAAAAbsECAAAAAG8BAEAAAABASsAAP0EACAL7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbYEAQAAAAG3BAEAAAABuAQCAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAbwEAQAAAAEBKwAA_wQAMAErAAD_BAAwDg4AAJULACAVAADHCgAgFwAAyAoAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIacEAQDdBwAhtgQBAN0HACG3BAEA4gcAIbgEAgC-CAAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvAQBAOIHACECAAAAHQAgKwAAggUAIAvtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbYEAQDdBwAhtwQBAOIHACG4BAIAvggAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIbwEAQDiBwAhAgAAABsAICsAAIQFACACAAAAGwAgKwAAhAUAIAMAAAAdACAyAAD9BAAgMwAAggUAIAEAAAAdACABAAAAGwAgBwwAAJALACA4AACTCwAgOQAAkgsAILoBAACRCwAguwEAAJQLACC3BAAA1wcAILwEAADXBwAgDuoDAADaBgAw6wMAAIsFABDsAwAA2gYAMO0DAQCaBgAh_wNAAKEGACGABEAAoQYAIacEAQCaBgAhtgQBAJoGACG3BAEAnwYAIbgEAgDOBgAhuQQIAJsGACG6BAgAmwYAIbsECACbBgAhvAQBAJ8GACEDAAAAGwAgAQAAigUAMDcAAIsFACADAAAAGwAgAQAAHAAwAgAAHQAgDuoDAADWBgAw6wMAAJEFABDsAwAA1gYAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhqAQBAAAAAakEAQC2BgAhqgQBALYGACGrBAEAtwYAIawEAQC2BgAhrQQAANcGACCuBCAA2AYAIa8EQADZBgAhAQAAAI4FACABAAAAjgUAIA7qAwAA1gYAMOsDAACRBQAQ7AMAANYGADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGoBAEAtgYAIakEAQC2BgAhqgQBALYGACGrBAEAtwYAIawEAQC2BgAhrQQAANcGACCuBCAA2AYAIa8EQADZBgAhA6sEAADXBwAgrQQAANcHACCvBAAA1wcAIAMAAACRBQAgAQAAkgUAMAIAAI4FACADAAAAkQUAIAEAAJIFADACAACOBQAgAwAAAJEFACABAACSBQAwAgAAjgUAIAvtAwEA3QcAIf8DQADkBwAhgARAAOQHACGoBAEA3QcAIakEAQDdBwAhqgQBAN0HACGrBAEA4gcAIawEAQDdBwAhrQSAAAAAAa4EIAChCAAhrwRAAOMHACECAAAAjgUAICsAAJYFACAL7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhqAQBAN0HACGpBAEA3QcAIaoEAQDdBwAhqwQBAOIHACGsBAEA3QcAIa0EgAAAAAGuBCAAoQgAIa8EQADjBwAhAgAAAJEFACArAACYBQAgAgAAAJEFACArAACYBQAgAQAAAI4FACABAAAAkQUAIAYMAACNCwAgOAAAjwsAIDkAAI4LACCrBAAA1wcAIK0EAADXBwAgrwQAANcHACAO6gMAANAGADDrAwAAngUAEOwDAADQBgAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhqAQBAJoGACGpBAEAmgYAIaoEAQCaBgAhqwQBAJ8GACGsBAEAmgYAIa0EAADRBgAgrgQgANIGACGvBEAAoAYAIQMAAACRBQAgAQAAnQUAMDcAAJ4FACADAAAAkQUAIAEAAJIFADACAACOBQAgAQAAAEYAIAEAAABGACADAAAARAAgAQAARQAwAgAARgAgAwAAAEQAIAEAAEUAMAIAAEYAIAMAAABEACABAABFADACAABGACAJAwAAuwoAIA4AAIwLACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGkBAIAAAABpQQBAAAAAaYEAQAAAAGnBAEAAAABASsAAKYFACAH7QMBAAAAAf8DQAAAAAGABEAAAAABpAQCAAAAAaUEAQAAAAGmBAEAAAABpwQBAAAAAQErAACoBQAwASsAAKgFADAJAwAAuQoAIA4AAIsLACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGkBAIAvggAIaUEAQDiBwAhpgQBAN0HACGnBAEA3QcAIQIAAABGACArAACrBQAgB-0DAQDdBwAh_wNAAOQHACGABEAA5AcAIaQEAgC-CAAhpQQBAOIHACGmBAEA3QcAIacEAQDdBwAhAgAAAEQAICsAAK0FACACAAAARAAgKwAArQUAIAMAAABGACAyAACmBQAgMwAAqwUAIAEAAABGACABAAAARAAgBgwAAIYLACA4AACJCwAgOQAAiAsAILoBAACHCwAguwEAAIoLACClBAAA1wcAIArqAwAAzQYAMOsDAAC0BQAQ7AMAAM0GADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGkBAIAzgYAIaUEAQCfBgAhpgQBAJoGACGnBAEAmgYAIQMAAABEACABAACzBQAwNwAAtAUAIAMAAABEACABAABFADACAABGACAH6gMAAMwGADDrAwAAugUAEOwDAADMBgAw7QMBAAAAAYAEQAC4BgAhogQIAL8GACGjBAgAvwYAIQEAAAC3BQAgAQAAALcFACAH6gMAAMwGADDrAwAAugUAEOwDAADMBgAw7QMBALYGACGABEAAuAYAIaIECAC_BgAhowQIAL8GACEAAwAAALoFACABAAC7BQAwAgAAtwUAIAMAAAC6BQAgAQAAuwUAMAIAALcFACADAAAAugUAIAEAALsFADACAAC3BQAgBO0DAQAAAAGABEAAAAABogQIAAAAAaMECAAAAAEBKwAAvwUAIATtAwEAAAABgARAAAAAAaIECAAAAAGjBAgAAAABASsAAMEFADABKwAAwQUAMATtAwEA3QcAIYAEQADkBwAhogQIAN4HACGjBAgA3gcAIQIAAAC3BQAgKwAAxAUAIATtAwEA3QcAIYAEQADkBwAhogQIAN4HACGjBAgA3gcAIQIAAAC6BQAgKwAAxgUAIAIAAAC6BQAgKwAAxgUAIAMAAAC3BQAgMgAAvwUAIDMAAMQFACABAAAAtwUAIAEAAAC6BQAgBQwAAIELACA4AACECwAgOQAAgwsAILoBAACCCwAguwEAAIULACAH6gMAAMsGADDrAwAAzQUAEOwDAADLBgAw7QMBAJoGACGABEAAoQYAIaIECACbBgAhowQIAJsGACEDAAAAugUAIAEAAMwFADA3AADNBQAgAwAAALoFACABAAC7BQAwAgAAtwUAIBgHAADABgAgCwAAwQYAIBUAAMIGACAaAADEBgAgGwAAxQYAIBwAAMcGACAfAADDBgAgIAAAxgYAICEAAMkGACAiAADIBgAgJAAAygYAIOoDAAC9BgAw6wMAAA0AEOwDAAC9BgAw7QMBAAAAAfADAAC-Bp0EIv8DQAC4BgAhgARAALgGACGOBAEAtwYAIY8EAQC3BgAhmgQBAAAAAZsEAQC3BgAhnQQIAL8GACGeBAEAAAABAQAAANAFACABAAAA0AUAIA4HAAD2CgAgCwAA9woAIBUAAPgKACAaAAD6CgAgGwAA-woAIBwAAP0KACAfAAD5CgAgIAAA_AoAICEAAP8KACAiAAD-CgAgJAAAgAsAII4EAADXBwAgjwQAANcHACCbBAAA1wcAIAMAAAANACABAADTBQAwAgAA0AUAIAMAAAANACABAADTBQAwAgAA0AUAIAMAAAANACABAADTBQAwAgAA0AUAIBUHAADrCgAgCwAA7AoAIBUAAO0KACAaAADvCgAgGwAA8AoAIBwAAPIKACAfAADuCgAgIAAA8QoAICEAAPQKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAGeBAEAAAABASsAANcFACAK7QMBAAAAAfADAAAAnQQC_wNAAAAAAYAEQAAAAAGOBAEAAAABjwQBAAAAAZoEAQAAAAGbBAEAAAABnQQIAAAAAZ4EAQAAAAEBKwAA2QUAMAErAADZBQAwFQcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIQAA-wcAICIAAPoHACAkAAD8BwAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhAgAAANAFACArAADcBQAgCu0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIQIAAAANACArAADeBQAgAgAAAA0AICsAAN4FACADAAAA0AUAIDIAANcFACAzAADcBQAgAQAAANAFACABAAAADQAgCAwAAOwHACA4AADvBwAgOQAA7gcAILoBAADtBwAguwEAAPAHACCOBAAA1wcAII8EAADXBwAgmwQAANcHACAN6gMAALkGADDrAwAA5QUAEOwDAAC5BgAw7QMBAJoGACHwAwAAugadBCL_A0AAoQYAIYAEQAChBgAhjgQBAJ8GACGPBAEAnwYAIZoEAQCaBgAhmwQBAJ8GACGdBAgAmwYAIZ4EAQCaBgAhAwAAAA0AIAEAAOQFADA3AADlBQAgAwAAAA0AIAEAANMFADACAADQBQAgE-oDAAC1BgAw6wMAAOsFABDsAwAAtQYAMO0DAQAAAAGABEAAuAYAIYwEAQC2BgAhjQQBALcGACGOBAEAtgYAIY8EAQC3BgAhkAQBALcGACGRBAEAtwYAIZIEAQC3BgAhkwQBALcGACGUBAEAtwYAIZUEAQC3BgAhlgQBALcGACGXBAEAtwYAIZgEAQC3BgAhmQQBALYGACEBAAAA6AUAIAEAAADoBQAgE-oDAAC1BgAw6wMAAOsFABDsAwAAtQYAMO0DAQC2BgAhgARAALgGACGMBAEAtgYAIY0EAQC3BgAhjgQBALYGACGPBAEAtwYAIZAEAQC3BgAhkQQBALcGACGSBAEAtwYAIZMEAQC3BgAhlAQBALcGACGVBAEAtwYAIZYEAQC3BgAhlwQBALcGACGYBAEAtwYAIZkEAQC2BgAhC40EAADXBwAgjwQAANcHACCQBAAA1wcAIJEEAADXBwAgkgQAANcHACCTBAAA1wcAIJQEAADXBwAglQQAANcHACCWBAAA1wcAIJcEAADXBwAgmAQAANcHACADAAAA6wUAIAEAAOwFADACAADoBQAgAwAAAOsFACABAADsBQAwAgAA6AUAIAMAAADrBQAgAQAA7AUAMAIAAOgFACAQ7QMBAAAAAYAEQAAAAAGMBAEAAAABjQQBAAAAAY4EAQAAAAGPBAEAAAABkAQBAAAAAZEEAQAAAAGSBAEAAAABkwQBAAAAAZQEAQAAAAGVBAEAAAABlgQBAAAAAZcEAQAAAAGYBAEAAAABmQQBAAAAAQErAADwBQAgEO0DAQAAAAGABEAAAAABjAQBAAAAAY0EAQAAAAGOBAEAAAABjwQBAAAAAZAEAQAAAAGRBAEAAAABkgQBAAAAAZMEAQAAAAGUBAEAAAABlQQBAAAAAZYEAQAAAAGXBAEAAAABmAQBAAAAAZkEAQAAAAEBKwAA8gUAMAErAADyBQAwEO0DAQDdBwAhgARAAOQHACGMBAEA3QcAIY0EAQDiBwAhjgQBAN0HACGPBAEA4gcAIZAEAQDiBwAhkQQBAOIHACGSBAEA4gcAIZMEAQDiBwAhlAQBAOIHACGVBAEA4gcAIZYEAQDiBwAhlwQBAOIHACGYBAEA4gcAIZkEAQDdBwAhAgAAAOgFACArAAD1BQAgEO0DAQDdBwAhgARAAOQHACGMBAEA3QcAIY0EAQDiBwAhjgQBAN0HACGPBAEA4gcAIZAEAQDiBwAhkQQBAOIHACGSBAEA4gcAIZMEAQDiBwAhlAQBAOIHACGVBAEA4gcAIZYEAQDiBwAhlwQBAOIHACGYBAEA4gcAIZkEAQDdBwAhAgAAAOsFACArAAD3BQAgAgAAAOsFACArAAD3BQAgAwAAAOgFACAyAADwBQAgMwAA9QUAIAEAAADoBQAgAQAAAOsFACAODAAA6QcAIDgAAOsHACA5AADqBwAgjQQAANcHACCPBAAA1wcAIJAEAADXBwAgkQQAANcHACCSBAAA1wcAIJMEAADXBwAglAQAANcHACCVBAAA1wcAIJYEAADXBwAglwQAANcHACCYBAAA1wcAIBPqAwAAtAYAMOsDAAD-BQAQ7AMAALQGADDtAwEAmgYAIYAEQAChBgAhjAQBAJoGACGNBAEAnwYAIY4EAQCaBgAhjwQBAJ8GACGQBAEAnwYAIZEEAQCfBgAhkgQBAJ8GACGTBAEAnwYAIZQEAQCfBgAhlQQBAJ8GACGWBAEAnwYAIZcEAQCfBgAhmAQBAJ8GACGZBAEAmgYAIQMAAADrBQAgAQAA_QUAMDcAAP4FACADAAAA6wUAIAEAAOwFADACAADoBQAgAQAAAHcAIAEAAAB3ACADAAAAdQAgAQAAdgAwAgAAdwAgAwAAAHUAIAEAAHYAMAIAAHcAIAMAAAB1ACABAAB2ADACAAB3ACATCAAA6AcAICMAAOcHACDtAwEAAAAB7gMIAAAAAfADAAAA8AMC8gMAAADyAwL0AwAAAPQDA_UDAQAAAAH2AwEAAAAB9wMBAAAAAfgDAQAAAAH5AwEAAAAB-gMBAAAAAfsDAQAAAAH8A0AAAAAB_QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAQErAACGBgAgEe0DAQAAAAHuAwgAAAAB8AMAAADwAwLyAwAAAPIDAvQDAAAA9AMD9QMBAAAAAfYDAQAAAAH3AwEAAAAB-AMBAAAAAfkDAQAAAAH6AwEAAAAB-wMBAAAAAfwDQAAAAAH9AwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABASsAAIgGADABKwAAiAYAMAEAAAAjACATCAAA5gcAICMAAOUHACDtAwEA3QcAIe4DCADeBwAh8AMAAN8H8AMi8gMAAOAH8gMi9AMAAOEH9AMj9QMBAOIHACH2AwEA4gcAIfcDAQDiBwAh-AMBAOIHACH5AwEA4gcAIfoDAQDiBwAh-wMBAOIHACH8A0AA4wcAIf0DAQDiBwAh_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhAgAAAHcAICsAAIwGACAR7QMBAN0HACHuAwgA3gcAIfADAADfB_ADIvIDAADgB_IDIvQDAADhB_QDI_UDAQDiBwAh9gMBAOIHACH3AwEA4gcAIfgDAQDiBwAh-QMBAOIHACH6AwEA4gcAIfsDAQDiBwAh_ANAAOMHACH9AwEA4gcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIQIAAAB1ACArAACOBgAgAgAAAHUAICsAAI4GACABAAAAIwAgAwAAAHcAIDIAAIYGACAzAACMBgAgAQAAAHcAIAEAAAB1ACAPDAAA2AcAIDgAANsHACA5AADaBwAgugEAANkHACC7AQAA3AcAIPQDAADXBwAg9QMAANcHACD2AwAA1wcAIPcDAADXBwAg-AMAANcHACD5AwAA1wcAIPoDAADXBwAg-wMAANcHACD8AwAA1wcAIP0DAADXBwAgFOoDAACZBgAw6wMAAJYGABDsAwAAmQYAMO0DAQCaBgAh7gMIAJsGACHwAwAAnAbwAyLyAwAAnQbyAyL0AwAAngb0AyP1AwEAnwYAIfYDAQCfBgAh9wMBAJ8GACH4AwEAnwYAIfkDAQCfBgAh-gMBAJ8GACH7AwEAnwYAIfwDQACgBgAh_QMBAJ8GACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACEDAAAAdQAgAQAAlQYAMDcAAJYGACADAAAAdQAgAQAAdgAwAgAAdwAgFOoDAACZBgAw6wMAAJYGABDsAwAAmQYAMO0DAQCaBgAh7gMIAJsGACHwAwAAnAbwAyLyAwAAnQbyAyL0AwAAngb0AyP1AwEAnwYAIfYDAQCfBgAh9wMBAJ8GACH4AwEAnwYAIfkDAQCfBgAh-gMBAJ8GACH7AwEAnwYAIfwDQACgBgAh_QMBAJ8GACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACEODAAAowYAIDgAALMGACA5AACzBgAggQQBAAAAAYIEAQAAAASDBAEAAAAEhAQBAAAAAYUEAQAAAAGGBAEAAAABhwQBAAAAAYgEAQCyBgAhiQQBAAAAAYoEAQAAAAGLBAEAAAABDQwAAKMGACA4AACxBgAgOQAAsQYAILoBAACxBgAguwEAALEGACCBBAgAAAABggQIAAAABIMECAAAAASEBAgAAAABhQQIAAAAAYYECAAAAAGHBAgAAAABiAQIALAGACEHDAAAowYAIDgAAK8GACA5AACvBgAggQQAAADwAwKCBAAAAPADCIMEAAAA8AMIiAQAAK4G8AMiBwwAAKMGACA4AACtBgAgOQAArQYAIIEEAAAA8gMCggQAAADyAwiDBAAAAPIDCIgEAACsBvIDIgcMAACmBgAgOAAAqwYAIDkAAKsGACCBBAAAAPQDA4IEAAAA9AMJgwQAAAD0AwmIBAAAqgb0AyMODAAApgYAIDgAAKkGACA5AACpBgAggQQBAAAAAYIEAQAAAAWDBAEAAAAFhAQBAAAAAYUEAQAAAAGGBAEAAAABhwQBAAAAAYgEAQCoBgAhiQQBAAAAAYoEAQAAAAGLBAEAAAABCwwAAKYGACA4AACnBgAgOQAApwYAIIEEQAAAAAGCBEAAAAAFgwRAAAAABYQEQAAAAAGFBEAAAAABhgRAAAAAAYcEQAAAAAGIBEAApQYAIQsMAACjBgAgOAAApAYAIDkAAKQGACCBBEAAAAABggRAAAAABIMEQAAAAASEBEAAAAABhQRAAAAAAYYEQAAAAAGHBEAAAAABiARAAKIGACELDAAAowYAIDgAAKQGACA5AACkBgAggQRAAAAAAYIEQAAAAASDBEAAAAAEhARAAAAAAYUEQAAAAAGGBEAAAAABhwRAAAAAAYgEQACiBgAhCIEEAgAAAAGCBAIAAAAEgwQCAAAABIQEAgAAAAGFBAIAAAABhgQCAAAAAYcEAgAAAAGIBAIAowYAIQiBBEAAAAABggRAAAAABIMEQAAAAASEBEAAAAABhQRAAAAAAYYEQAAAAAGHBEAAAAABiARAAKQGACELDAAApgYAIDgAAKcGACA5AACnBgAggQRAAAAAAYIEQAAAAAWDBEAAAAAFhARAAAAAAYUEQAAAAAGGBEAAAAABhwRAAAAAAYgEQAClBgAhCIEEAgAAAAGCBAIAAAAFgwQCAAAABYQEAgAAAAGFBAIAAAABhgQCAAAAAYcEAgAAAAGIBAIApgYAIQiBBEAAAAABggRAAAAABYMEQAAAAAWEBEAAAAABhQRAAAAAAYYEQAAAAAGHBEAAAAABiARAAKcGACEODAAApgYAIDgAAKkGACA5AACpBgAggQQBAAAAAYIEAQAAAAWDBAEAAAAFhAQBAAAAAYUEAQAAAAGGBAEAAAABhwQBAAAAAYgEAQCoBgAhiQQBAAAAAYoEAQAAAAGLBAEAAAABC4EEAQAAAAGCBAEAAAAFgwQBAAAABYQEAQAAAAGFBAEAAAABhgQBAAAAAYcEAQAAAAGIBAEAqQYAIYkEAQAAAAGKBAEAAAABiwQBAAAAAQcMAACmBgAgOAAAqwYAIDkAAKsGACCBBAAAAPQDA4IEAAAA9AMJgwQAAAD0AwmIBAAAqgb0AyMEgQQAAAD0AwOCBAAAAPQDCYMEAAAA9AMJiAQAAKsG9AMjBwwAAKMGACA4AACtBgAgOQAArQYAIIEEAAAA8gMCggQAAADyAwiDBAAAAPIDCIgEAACsBvIDIgSBBAAAAPIDAoIEAAAA8gMIgwQAAADyAwiIBAAArQbyAyIHDAAAowYAIDgAAK8GACA5AACvBgAggQQAAADwAwKCBAAAAPADCIMEAAAA8AMIiAQAAK4G8AMiBIEEAAAA8AMCggQAAADwAwiDBAAAAPADCIgEAACvBvADIg0MAACjBgAgOAAAsQYAIDkAALEGACC6AQAAsQYAILsBAACxBgAggQQIAAAAAYIECAAAAASDBAgAAAAEhAQIAAAAAYUECAAAAAGGBAgAAAABhwQIAAAAAYgECACwBgAhCIEECAAAAAGCBAgAAAAEgwQIAAAABIQECAAAAAGFBAgAAAABhgQIAAAAAYcECAAAAAGIBAgAsQYAIQ4MAACjBgAgOAAAswYAIDkAALMGACCBBAEAAAABggQBAAAABIMEAQAAAASEBAEAAAABhQQBAAAAAYYEAQAAAAGHBAEAAAABiAQBALIGACGJBAEAAAABigQBAAAAAYsEAQAAAAELgQQBAAAAAYIEAQAAAASDBAEAAAAEhAQBAAAAAYUEAQAAAAGGBAEAAAABhwQBAAAAAYgEAQCzBgAhiQQBAAAAAYoEAQAAAAGLBAEAAAABE-oDAAC0BgAw6wMAAP4FABDsAwAAtAYAMO0DAQCaBgAhgARAAKEGACGMBAEAmgYAIY0EAQCfBgAhjgQBAJoGACGPBAEAnwYAIZAEAQCfBgAhkQQBAJ8GACGSBAEAnwYAIZMEAQCfBgAhlAQBAJ8GACGVBAEAnwYAIZYEAQCfBgAhlwQBAJ8GACGYBAEAnwYAIZkEAQCaBgAhE-oDAAC1BgAw6wMAAOsFABDsAwAAtQYAMO0DAQC2BgAhgARAALgGACGMBAEAtgYAIY0EAQC3BgAhjgQBALYGACGPBAEAtwYAIZAEAQC3BgAhkQQBALcGACGSBAEAtwYAIZMEAQC3BgAhlAQBALcGACGVBAEAtwYAIZYEAQC3BgAhlwQBALcGACGYBAEAtwYAIZkEAQC2BgAhC4EEAQAAAAGCBAEAAAAEgwQBAAAABIQEAQAAAAGFBAEAAAABhgQBAAAAAYcEAQAAAAGIBAEAswYAIYkEAQAAAAGKBAEAAAABiwQBAAAAAQuBBAEAAAABggQBAAAABYMEAQAAAAWEBAEAAAABhQQBAAAAAYYEAQAAAAGHBAEAAAABiAQBAKkGACGJBAEAAAABigQBAAAAAYsEAQAAAAEIgQRAAAAAAYIEQAAAAASDBEAAAAAEhARAAAAAAYUEQAAAAAGGBEAAAAABhwRAAAAAAYgEQACkBgAhDeoDAAC5BgAw6wMAAOUFABDsAwAAuQYAMO0DAQCaBgAh8AMAALoGnQQi_wNAAKEGACGABEAAoQYAIY4EAQCfBgAhjwQBAJ8GACGaBAEAmgYAIZsEAQCfBgAhnQQIAJsGACGeBAEAmgYAIQcMAACjBgAgOAAAvAYAIDkAALwGACCBBAAAAJ0EAoIEAAAAnQQIgwQAAACdBAiIBAAAuwadBCIHDAAAowYAIDgAALwGACA5AAC8BgAggQQAAACdBAKCBAAAAJ0ECIMEAAAAnQQIiAQAALsGnQQiBIEEAAAAnQQCggQAAACdBAiDBAAAAJ0ECIgEAAC8Bp0EIhgHAADABgAgCwAAwQYAIBUAAMIGACAaAADEBgAgGwAAxQYAIBwAAMcGACAfAADDBgAgIAAAxgYAICEAAMkGACAiAADIBgAgJAAAygYAIOoDAAC9BgAw6wMAAA0AEOwDAAC9BgAw7QMBALYGACHwAwAAvgadBCL_A0AAuAYAIYAEQAC4BgAhjgQBALcGACGPBAEAtwYAIZoEAQC2BgAhmwQBALcGACGdBAgAvwYAIZ4EAQC2BgAhBIEEAAAAnQQCggQAAACdBAiDBAAAAJ0ECIgEAAC8Bp0EIgiBBAgAAAABggQIAAAABIMECAAAAASEBAgAAAABhQQIAAAAAYYECAAAAAGHBAgAAAABiAQIALEGACEaBAAAlgcAIAUAAJcHACAGAACYBwAgCAAAmQcAIBEAAJwHACATAADGBgAgFgAAmgcAIBkAAJsHACAlAADKBgAg6gMAAJMHADDrAwAAIwAQ7AMAAJMHADDtAwEAtgYAIfADAACVB6EFIv8DQAC4BgAhgARAALgGACGRBAEAtgYAIZoEAQC2BgAhrgQgANgGACGvBEAA2QYAIbwEAQC3BgAhnQUgANgGACGfBQAAlAefBSKhBSAA2AYAIaoFAAAjACCrBQAAIwAgA58EAAAPACCgBAAADwAgoQQAAA8AIAOfBAAAHwAgoAQAAB8AIKEEAAAfACADnwQAAFsAIKAEAABbACChBAAAWwAgA58EAAAtACCgBAAALQAgoQQAAC0AIAOfBAAASwAgoAQAAEsAIKEEAABLACADnwQAACsAIKAEAAArACChBAAAKwAgA58EAABPACCgBAAATwAgoQQAAE8AIAOfBAAAawAgoAQAAGsAIKEEAABrACADnwQAAG8AIKAEAABvACChBAAAbwAgA58EAAB1ACCgBAAAdQAgoQQAAHUAIAfqAwAAywYAMOsDAADNBQAQ7AMAAMsGADDtAwEAmgYAIYAEQAChBgAhogQIAJsGACGjBAgAmwYAIQfqAwAAzAYAMOsDAAC6BQAQ7AMAAMwGADDtAwEAtgYAIYAEQAC4BgAhogQIAL8GACGjBAgAvwYAIQrqAwAAzQYAMOsDAAC0BQAQ7AMAAM0GADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGkBAIAzgYAIaUEAQCfBgAhpgQBAJoGACGnBAEAmgYAIQ0MAACjBgAgOAAAowYAIDkAAKMGACC6AQAAsQYAILsBAACjBgAggQQCAAAAAYIEAgAAAASDBAIAAAAEhAQCAAAAAYUEAgAAAAGGBAIAAAABhwQCAAAAAYgEAgDPBgAhDQwAAKMGACA4AACjBgAgOQAAowYAILoBAACxBgAguwEAAKMGACCBBAIAAAABggQCAAAABIMEAgAAAASEBAIAAAABhQQCAAAAAYYEAgAAAAGHBAIAAAABiAQCAM8GACEO6gMAANAGADDrAwAAngUAEOwDAADQBgAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhqAQBAJoGACGpBAEAmgYAIaoEAQCaBgAhqwQBAJ8GACGsBAEAmgYAIa0EAADRBgAgrgQgANIGACGvBEAAoAYAIQ8MAACmBgAgOAAA1QYAIDkAANUGACCBBIAAAAABhASAAAAAAYUEgAAAAAGGBIAAAAABhwSAAAAAAYgEgAAAAAGwBAEAAAABsQQBAAAAAbIEAQAAAAGzBIAAAAABtASAAAAAAbUEgAAAAAEFDAAAowYAIDgAANQGACA5AADUBgAggQQgAAAAAYgEIADTBgAhBQwAAKMGACA4AADUBgAgOQAA1AYAIIEEIAAAAAGIBCAA0wYAIQKBBCAAAAABiAQgANQGACEMgQSAAAAAAYQEgAAAAAGFBIAAAAABhgSAAAAAAYcEgAAAAAGIBIAAAAABsAQBAAAAAbEEAQAAAAGyBAEAAAABswSAAAAAAbQEgAAAAAG1BIAAAAABDuoDAADWBgAw6wMAAJEFABDsAwAA1gYAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIagEAQC2BgAhqQQBALYGACGqBAEAtgYAIasEAQC3BgAhrAQBALYGACGtBAAA1wYAIK4EIADYBgAhrwRAANkGACEMgQSAAAAAAYQEgAAAAAGFBIAAAAABhgSAAAAAAYcEgAAAAAGIBIAAAAABsAQBAAAAAbEEAQAAAAGyBAEAAAABswSAAAAAAbQEgAAAAAG1BIAAAAABAoEEIAAAAAGIBCAA1AYAIQiBBEAAAAABggRAAAAABYMEQAAAAAWEBEAAAAABhQRAAAAAAYYEQAAAAAGHBEAAAAABiARAAKcGACEO6gMAANoGADDrAwAAiwUAEOwDAADaBgAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhpwQBAJoGACG2BAEAmgYAIbcEAQCfBgAhuAQCAM4GACG5BAgAmwYAIboECACbBgAhuwQIAJsGACG8BAEAnwYAIRofAADRBgAg6gMAANsGADDrAwAA9QQAEOwDAADbBgAw7QMBAJoGACHwAwAA3QbCBCL-AwEAmgYAIf8DQAChBgAhgARAAKEGACGOBAEAmgYAIZoEAQCaBgAhtwQBAJ8GACG5BAgAmwYAIboECACbBgAhuwQIAJsGACG9BAEAmgYAIb4EAQCaBgAhvwQAANwGACDABAIAzgYAIcMEAADeBsMEIsQEAADcBgAgxgQAAN8GxgQixwQIAJsGACHIBCAA0gYAIckEIADSBgAhygQBAJoGACEEgQQBAAAABcsEAQAAAAHMBAEAAAAEzQQBAAAABAcMAACjBgAgOAAA5QYAIDkAAOUGACCBBAAAAMIEAoIEAAAAwgQIgwQAAADCBAiIBAAA5AbCBCIHDAAAowYAIDgAAOMGACA5AADjBgAggQQAAADDBAKCBAAAAMMECIMEAAAAwwQIiAQAAOIGwwQiBwwAAKMGACA4AADhBgAgOQAA4QYAIIEEAAAAxgQCggQAAADGBAiDBAAAAMYECIgEAADgBsYEIgcMAACjBgAgOAAA4QYAIDkAAOEGACCBBAAAAMYEAoIEAAAAxgQIgwQAAADGBAiIBAAA4AbGBCIEgQQAAADGBAKCBAAAAMYECIMEAAAAxgQIiAQAAOEGxgQiBwwAAKMGACA4AADjBgAgOQAA4wYAIIEEAAAAwwQCggQAAADDBAiDBAAAAMMECIgEAADiBsMEIgSBBAAAAMMEAoIEAAAAwwQIgwQAAADDBAiIBAAA4wbDBCIHDAAAowYAIDgAAOUGACA5AADlBgAggQQAAADCBAKCBAAAAMIECIMEAAAAwgQIiAQAAOQGwgQiBIEEAAAAwgQCggQAAADCBAiDBAAAAMIECIgEAADlBsIEIg7qAwAA5gYAMOsDAADfBAAQ7AMAAOYGADDtAwEAmgYAIf4DAQCaBgAh_wNAAKEGACGABEAAoQYAIacEAQCaBgAhtgQBAJ8GACG4BAIAzgYAIc4EAQCfBgAhzwQBAJoGACHQBAgAmwYAIdEEAQCfBgAhDuoDAADnBgAw6wMAAMkEABDsAwAA5wYAMO0DAQCaBgAh8AMAAOkG1gQi_gMBAJoGACGnBAEAmgYAIbgEAgDOBgAhzgQBAJ8GACHQBAgAmwYAIdIECADoBgAh0wQIAJsGACHUBAgAmwYAIdYEAQCaBgAhDQwAAKYGACA4AADtBgAgOQAA7QYAILoBAADtBgAguwEAAO0GACCBBAgAAAABggQIAAAABYMECAAAAAWEBAgAAAABhQQIAAAAAYYECAAAAAGHBAgAAAABiAQIAOwGACEHDAAAowYAIDgAAOsGACA5AADrBgAggQQAAADWBAKCBAAAANYECIMEAAAA1gQIiAQAAOoG1gQiBwwAAKMGACA4AADrBgAgOQAA6wYAIIEEAAAA1gQCggQAAADWBAiDBAAAANYECIgEAADqBtYEIgSBBAAAANYEAoIEAAAA1gQIgwQAAADWBAiIBAAA6wbWBCINDAAApgYAIDgAAO0GACA5AADtBgAgugEAAO0GACC7AQAA7QYAIIEECAAAAAGCBAgAAAAFgwQIAAAABYQECAAAAAGFBAgAAAABhgQIAAAAAYcECAAAAAGIBAgA7AYAIQiBBAgAAAABggQIAAAABYMECAAAAAWEBAgAAAABhQQIAAAAAYYECAAAAAGHBAgAAAABiAQIAO0GACEX6gMAAO4GADDrAwAAsQQAEOwDAADuBgAw7QMBAJoGACH-AwEAnwYAIf8DQAChBgAhgARAAKEGACGQBAEAnwYAIZIEAQCfBgAhpgQBAJ8GACHXBAIAzgYAIdgEAQCfBgAh2gQAAO8G2gQi2wQIAJsGACHdBAAA8AbdBCLeBAEAnwYAId8EAADpBtYEIuAEAQCfBgAh4QQBAJ8GACHiBAEAnwYAIeMECACbBgAh5AQIAJsGACHlBAEAnwYAIQcMAACjBgAgOAAA9AYAIDkAAPQGACCBBAAAANoEAoIEAAAA2gQIgwQAAADaBAiIBAAA8wbaBCIHDAAAowYAIDgAAPIGACA5AADyBgAggQQAAADdBAKCBAAAAN0ECIMEAAAA3QQIiAQAAPEG3QQiBwwAAKMGACA4AADyBgAgOQAA8gYAIIEEAAAA3QQCggQAAADdBAiDBAAAAN0ECIgEAADxBt0EIgSBBAAAAN0EAoIEAAAA3QQIgwQAAADdBAiIBAAA8gbdBCIHDAAAowYAIDgAAPQGACA5AAD0BgAggQQAAADaBAKCBAAAANoECIMEAAAA2gQIiAQAAPMG2gQiBIEEAAAA2gQCggQAAADaBAiDBAAAANoECIgEAAD0BtoEIgvqAwAA9QYAMOsDAACVBAAQ7AMAAPUGADDtAwEAmgYAIf8DQAChBgAhpgQBAJoGACHDBAAA9gbnBCLWBAEAnwYAIecEAQCaBgAh6AQBAJoGACHpBCAA0gYAIQcMAACjBgAgOAAA-AYAIDkAAPgGACCBBAAAAOcEAoIEAAAA5wQIgwQAAADnBAiIBAAA9wbnBCIHDAAAowYAIDgAAPgGACA5AAD4BgAggQQAAADnBAKCBAAAAOcECIMEAAAA5wQIiAQAAPcG5wQiBIEEAAAA5wQCggQAAADnBAiDBAAAAOcECIgEAAD4BucEIiLqAwAA-QYAMOsDAAD9AwAQ7AMAAPkGADDtAwEAmgYAIf4DAQCaBgAh_wNAAKEGACGABEAAoQYAIY4EAQCfBgAhpwQBAJoGACG9BAEAmgYAIeoEIADSBgAh6wQBAJoGACHsBCAA0gYAIe0EIADSBgAh7gQgANIGACHvBCAA0gYAIfAEAADcBgAg8QQBAJoGACHyBAEAnwYAIfMEAQCfBgAh9AQBAJ8GACH1BAEAnwYAIfYEAQCfBgAh9wQBAJ8GACH4BAAA3AYAIPkEAQCfBgAh-gQBAJ8GACH7BAEAnwYAIfwEAQCfBgAh_QQBAJ8GACH-BAAA3AYAIP8EAQCaBgAhgAUBAJoGACGBBQIAzgYAIQjqAwAA-gYAMOsDAADnAwAQ7AMAAPoGADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACG8BAEAmgYAIeoEIADSBgAhCOoDAAD7BgAw6wMAANQDABDsAwAA-wYAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIbwEAQC2BgAh6gQgANgGACEM6gMAAPwGADDrAwAAzgMAEOwDAAD8BgAw7QMBAJoGACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACGaBAEAmgYAIcoEAQCaBgAh0AQIAJsGACGCBQEAnwYAIYMFQAChBgAhCeoDAAD9BgAw6wMAALgDABDsAwAA_QYAMO0DAQCaBgAh_gMBAJoGACH_A0AAoQYAIYAEQAChBgAhmgQBAJoGACHqBCAA0gYAIQbqAwAA_gYAMOsDAACiAwAQ7AMAAP4GADDtAwEAmgYAIacEAQCaBgAh5QQBAJoGACEP6gMAAP8GADDrAwAAjAMAEOwDAAD_BgAw7QMBAJoGACH-AwEAmgYAIf8DQAChBgAhgARAAKEGACHjBAgAmwYAIeoEIADSBgAhhAUBAJoGACGGBQAAgAeGBSKHBQgA6AYAIYgFCACbBgAhiQVAAKEGACGKBUAAoQYAIQcMAACjBgAgOAAAggcAIDkAAIIHACCBBAAAAIYFAoIEAAAAhgUIgwQAAACGBQiIBAAAgQeGBSIHDAAAowYAIDgAAIIHACA5AACCBwAggQQAAACGBQKCBAAAAIYFCIMEAAAAhgUIiAQAAIEHhgUiBIEEAAAAhgUCggQAAACGBQiDBAAAAIYFCIgEAACCB4YFIgzqAwAAgwcAMOsDAAD2AgAQ7AMAAIMHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGaBAEAmgYAIbwEAQCfBgAhvQQBAJoGACHqBCAA0gYAIYsFAQCfBgAhjAUBAJ8GACEK6gMAAIQHADDrAwAA3gIAEOwDAACEBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhpwQBAJoGACG4BAIAzgYAIc4EAQCfBgAhjQUBAJoGACEH6gMAAIUHADDrAwAAxgIAEOwDAACFBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhpgQBAJoGACEJAwAAwAYAIA8AAIcHACDqAwAAhgcAMOsDAACFAQAQ7AMAAIYHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGmBAEAtgYAIQOfBAAAOwAgoAQAADsAIKEEAAA7ACAJ6gMAAIgHADDrAwAArgIAEOwDAACIBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhjgUBAJoGACGPBQEAmgYAIZAFQAChBgAhCeoDAACJBwAw6wMAAJsCABDsAwAAiQcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIY4FAQC2BgAhjwUBALYGACGQBUAAuAYAIRDqAwAAigcAMOsDAACVAgAQ7AMAAIoHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGmBAEAmgYAIZEFAQCaBgAhkgUBAJoGACGTBQEAnwYAIZQFAQCfBgAhlQUBAJ8GACGWBUAAoAYAIZcFQACgBgAhmAUBAJ8GACGZBQEAnwYAIQvqAwAAiwcAMOsDAAD_AQAQ7AMAAIsHADDtAwEAmgYAIf8DQAChBgAhgARAAKEGACGmBAEAmgYAIZAFQAChBgAhmgUBAJoGACGbBQEAnwYAIZwFAQCfBgAhD-oDAACMBwAw6wMAAOkBABDsAwAAjAcAMO0DAQCaBgAh8AMAAI4HoQUi_wNAAKEGACGABEAAoQYAIZEEAQCaBgAhmgQBAJoGACGuBCAA0gYAIa8EQACgBgAhvAQBAJ8GACGdBSAA0gYAIZ8FAACNB58FIqEFIADSBgAhBwwAAKMGACA4AACSBwAgOQAAkgcAIIEEAAAAnwUCggQAAACfBQiDBAAAAJ8FCIgEAACRB58FIgcMAACjBgAgOAAAkAcAIDkAAJAHACCBBAAAAKEFAoIEAAAAoQUIgwQAAAChBQiIBAAAjwehBSIHDAAAowYAIDgAAJAHACA5AACQBwAggQQAAAChBQKCBAAAAKEFCIMEAAAAoQUIiAQAAI8HoQUiBIEEAAAAoQUCggQAAAChBQiDBAAAAKEFCIgEAACQB6EFIgcMAACjBgAgOAAAkgcAIDkAAJIHACCBBAAAAJ8FAoIEAAAAnwUIgwQAAACfBQiIBAAAkQefBSIEgQQAAACfBQKCBAAAAJ8FCIMEAAAAnwUIiAQAAJIHnwUiGAQAAJYHACAFAACXBwAgBgAAmAcAIAgAAJkHACARAACcBwAgEwAAxgYAIBYAAJoHACAZAACbBwAgJQAAygYAIOoDAACTBwAw6wMAACMAEOwDAACTBwAw7QMBALYGACHwAwAAlQehBSL_A0AAuAYAIYAEQAC4BgAhkQQBALYGACGaBAEAtgYAIa4EIADYBgAhrwRAANkGACG8BAEAtwYAIZ0FIADYBgAhnwUAAJQHnwUioQUgANgGACEEgQQAAACfBQKCBAAAAJ8FCIMEAAAAnwUIiAQAAJIHnwUiBIEEAAAAoQUCggQAAAChBQiDBAAAAKEFCIgEAACQB6EFIgOfBAAAAwAgoAQAAAMAIKEEAAADACADnwQAAAcAIKAEAAAHACChBAAABwAgEAMAAMAGACDqAwAA1AcAMOsDAAALABDsAwAA1AcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIZEEAQC2BgAhmgQBALYGACGmBAEAtgYAIa4EIADYBgAhrwRAANkGACGjBQEAtwYAIaQFAQC3BgAhqgUAAAsAIKsFAAALACAaBwAAwAYAIAsAAMEGACAVAADCBgAgGgAAxAYAIBsAAMUGACAcAADHBgAgHwAAwwYAICAAAMYGACAhAADJBgAgIgAAyAYAICQAAMoGACDqAwAAvQYAMOsDAAANABDsAwAAvQYAMO0DAQC2BgAh8AMAAL4GnQQi_wNAALgGACGABEAAuAYAIY4EAQC3BgAhjwQBALcGACGaBAEAtgYAIZsEAQC3BgAhnQQIAL8GACGeBAEAtgYAIaoFAAANACCrBQAADQAgCwMAAMAGACAPAACHBwAg6gMAAIYHADDrAwAAhQEAEOwDAACGBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpgQBALYGACGqBQAAhQEAIKsFAACFAQAgA58EAABEACCgBAAARAAgoQQAAEQAIAOfBAAAJwAgoAQAACcAIKEEAAAnACAI6gMAAJ0HADDrAwAA0QEAEOwDAACdBwAw7QMBAJoGACH_A0AAoQYAIYAEQAChBgAhjwUBAJoGACGiBQEAmgYAIQjqAwAAngcAMOsDAAC7AQAQ7AMAAJ4HADDtAwEAmgYAIf4DAQCfBgAh_wNAAKEGACGABEAAoQYAIZoEAQCaBgAhDeoDAACfBwAw6wMAAKMBABDsAwAAnwcAMO0DAQCaBgAh_wNAAKEGACGABEAAoQYAIZEEAQCaBgAhmgQBAJoGACGmBAEAmgYAIa4EIADSBgAhrwRAAKAGACGjBQEAnwYAIaQFAQCfBgAhFggAAKUHACAjAACkBwAg6gMAAKAHADDrAwAAdQAQ7AMAAKAHADDtAwEAtgYAIe4DCAC_BgAh8AMAAKEH8AMi8gMAAKIH8gMi9AMAAKMH9AMj9QMBALcGACH2AwEAtwYAIfcDAQC3BgAh-AMBALcGACH5AwEAtwYAIfoDAQC3BgAh-wMBALcGACH8A0AA2QYAIf0DAQC3BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhBIEEAAAA8AMCggQAAADwAwiDBAAAAPADCIgEAACvBvADIgSBBAAAAPIDAoIEAAAA8gMIgwQAAADyAwiIBAAArQbyAyIEgQQAAAD0AwOCBAAAAPQDCYMEAAAA9AMJiAQAAKsG9AMjGgQAAJYHACAFAACXBwAgBgAAmAcAIAgAAJkHACARAACcBwAgEwAAxgYAIBYAAJoHACAZAACbBwAgJQAAygYAIOoDAACTBwAw6wMAACMAEOwDAACTBwAw7QMBALYGACHwAwAAlQehBSL_A0AAuAYAIYAEQAC4BgAhkQQBALYGACGaBAEAtgYAIa4EIADYBgAhrwRAANkGACG8BAEAtwYAIZ0FIADYBgAhnwUAAJQHnwUioQUgANgGACGqBQAAIwAgqwUAACMAIBoHAADABgAgCwAAwQYAIBUAAMIGACAaAADEBgAgGwAAxQYAIBwAAMcGACAfAADDBgAgIAAAxgYAICEAAMkGACAiAADIBgAgJAAAygYAIOoDAAC9BgAw6wMAAA0AEOwDAAC9BgAw7QMBALYGACHwAwAAvgadBCL_A0AAuAYAIYAEQAC4BgAhjgQBALcGACGPBAEAtwYAIZoEAQC2BgAhmwQBALcGACGdBAgAvwYAIZ4EAQC2BgAhqgUAAA0AIKsFAAANACAOCAAApQcAIA0AAKcHACDqAwAApgcAMOsDAABvABDsAwAApgcAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACHKBAEAtgYAIdAECAC_BgAhggUBALcGACGDBUAAuAYAIQ0IAAClBwAgIQAAyQYAIOoDAACoBwAw6wMAAGsAEOwDAACoBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIeoEIADYBgAhqgUAAGsAIKsFAABrACALCAAApQcAICEAAMkGACDqAwAAqAcAMOsDAABrABDsAwAAqAcAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACHqBCAA2AYAIRIIAAClBwAgCwAArAcAIBMAAMYGACDqAwAAqQcAMOsDAAAtABDsAwAAqQcAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAh4wQIAL8GACHqBCAA2AYAIYQFAQC2BgAhhgUAAKoHhgUihwUIAKsHACGIBQgAvwYAIYkFQAC4BgAhigVAALgGACEEgQQAAACGBQKCBAAAAIYFCIMEAAAAhgUIiAQAAIIHhgUiCIEECAAAAAGCBAgAAAAFgwQIAAAABYQECAAAAAGFBAgAAAABhgQIAAAAAYcECAAAAAGIBAgA7QYAIQOfBAAALwAgoAQAAC8AIKEEAAAvACACjwUBAAAAAaIFAQAAAAEJHQAArwcAIOoDAACuBwAw6wMAAGAAEOwDAACuBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhjwUBALYGACGiBQEAtgYAIQwIAACZBwAgHgAAsgcAIOoDAACxBwAw6wMAAFsAEOwDAACxBwAw7QMBALYGACH-AwEAtwYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIaoFAABbACCrBQAAWwAgAv4DAQAAAAGaBAEAAAABCggAAJkHACAeAACyBwAg6gMAALEHADDrAwAAWwAQ7AMAALEHADDtAwEAtgYAIf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZoEAQC2BgAhA58EAABgACCgBAAAYAAgoQQAAGAAICQIAAClBwAgDgAAtQcAIOoDAACzBwAw6wMAAE8AEOwDAACzBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGOBAEAtwYAIacEAQC2BgAhvQQBALYGACHqBCAA2AYAIesEAQC2BgAh7AQgANgGACHtBCAA2AYAIe4EIADYBgAh7wQgANgGACHwBAAA3AYAIPEEAQC2BgAh8gQBALcGACHzBAEAtwYAIfQEAQC3BgAh9QQBALcGACH2BAEAtwYAIfcEAQC3BgAh-AQAANwGACD5BAEAtwYAIfoEAQC3BgAh-wQBALcGACH8BAEAtwYAIf0EAQC3BgAh_gQAANwGACD_BAEAtgYAIYAFAQC2BgAhgQUCALQHACEIgQQCAAAAAYIEAgAAAASDBAIAAAAEhAQCAAAAAYUEAgAAAAGGBAIAAAABhwQCAAAAAYgEAgCjBgAhJQgAAKUHACANAADSBwAgFQAAwgYAIBcAAIcHACAYAADTBwAgGQAAmwcAIBoAAKwHACAbAADFBgAgHAAAxwYAIB8AANcGACDqAwAAzgcAMOsDAAAPABDsAwAAzgcAMO0DAQC2BgAh8AMAAM8HwgQi_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALYGACGaBAEAtgYAIbcEAQC3BgAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvQQBALYGACG-BAEAtgYAIb8EAADcBgAgwAQCALQHACHDBAAA0AfDBCLEBAAA3AYAIMYEAADRB8YEIscECAC_BgAhyAQgANgGACHJBCAA2AYAIcoEAQC2BgAhqgUAAA8AIKsFAAAPACAQCAAApQcAIA4AALUHACDqAwAAtgcAMOsDAABLABDsAwAAtgcAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhpwQBALYGACG2BAEAtwYAIbgEAgC0BwAhzgQBALcGACHPBAEAtgYAIdAECAC_BgAh0QQBALcGACECpgQBAAAAAacEAQAAAAEMAwAAwAYAIA4AALUHACDqAwAAuAcAMOsDAABEABDsAwAAuAcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIaQEAgC0BwAhpQQBALcGACGmBAEAtgYAIacEAQC2BgAhA6cEAQAAAAHOBAEAAAABjQUBAAAAAQ0OAAC1BwAgFAAAvAcAIBYAALsHACDqAwAAugcAMOsDAAA7ABDsAwAAugcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIacEAQC2BgAhuAQCALQHACHOBAEAtwYAIY0FAQC2BgAhCwMAAMAGACAPAACHBwAg6gMAAIYHADDrAwAAhQEAEOwDAACGBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpgQBALYGACGqBQAAhQEAIKsFAACFAQAgEw4AALUHACAVAADCBgAgFwAAhwcAIOoDAADKBwAw6wMAABsAEOwDAADKBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpwQBALYGACG2BAEAtgYAIbcEAQC3BgAhuAQCALQHACG5BAgAvwYAIboECAC_BgAhuwQIAL8GACG8BAEAtwYAIaoFAAAbACCrBQAAGwAgHAMAAKQHACAIAACZBwAgDwAAwgYAIBEAAJwHACASAADBBwAg6gMAAL0HADDrAwAAKwAQ7AMAAL0HADDtAwEAtgYAIf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZAEAQC3BgAhkgQBALcGACGmBAEAtwYAIdcEAgC0BwAh2AQBALcGACHaBAAAvgfaBCLbBAgAvwYAId0EAAC_B90EIt4EAQC3BgAh3wQAAMAH1gQi4AQBALcGACHhBAEAtwYAIeIEAQC3BgAh4wQIAL8GACHkBAgAvwYAIeUEAQC3BgAhBIEEAAAA2gQCggQAAADaBAiDBAAAANoECIgEAAD0BtoEIgSBBAAAAN0EAoIEAAAA3QQIgwQAAADdBAiIBAAA8gbdBCIEgQQAAADWBAKCBAAAANYECIMEAAAA1gQIiAQAAOsG1gQiFAgAAKUHACALAACsBwAgEwAAxgYAIOoDAACpBwAw6wMAAC0AEOwDAACpBwAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACHjBAgAvwYAIeoEIADYBgAhhAUBALYGACGGBQAAqgeGBSKHBQgAqwcAIYgFCAC_BgAhiQVAALgGACGKBUAAuAYAIaoFAAAtACCrBQAALQAgAqcEAQAAAAHlBAEAAAABCA4AALUHACASAADEBwAg6gMAAMMHADDrAwAALwAQ7AMAAMMHADDtAwEAtgYAIacEAQC2BgAh5QQBALYGACEUCAAApQcAIAsAAKwHACATAADGBgAg6gMAAKkHADDrAwAALQAQ7AMAAKkHADDtAwEAtgYAIf4DAQC2BgAh_wNAALgGACGABEAAuAYAIeMECAC_BgAh6gQgANgGACGEBQEAtgYAIYYFAACqB4YFIocFCACrBwAhiAUIAL8GACGJBUAAuAYAIYoFQAC4BgAhqgUAAC0AIKsFAAAtACANAwAAwAYAIBAAAMcHACDqAwAAxQcAMOsDAAAnABDsAwAAxQcAMO0DAQC2BgAh_wNAALgGACGmBAEAtgYAIcMEAADGB-cEItYEAQC3BgAh5wQBALYGACHoBAEAtgYAIekEIADYBgAhBIEEAAAA5wQCggQAAADnBAiDBAAAAOcECIgEAAD4BucEIh4DAACkBwAgCAAAmQcAIA8AAMIGACARAACcBwAgEgAAwQcAIOoDAAC9BwAw6wMAACsAEOwDAAC9BwAw7QMBALYGACH-AwEAtwYAIf8DQAC4BgAhgARAALgGACGQBAEAtwYAIZIEAQC3BgAhpgQBALcGACHXBAIAtAcAIdgEAQC3BgAh2gQAAL4H2gQi2wQIAL8GACHdBAAAvwfdBCLeBAEAtwYAId8EAADAB9YEIuAEAQC3BgAh4QQBALcGACHiBAEAtwYAIeMECAC_BgAh5AQIAL8GACHlBAEAtwYAIaoFAAArACCrBQAAKwAgEggAAKUHACAOAAC1BwAgEAAAyQcAIBQAALwHACDqAwAAyAcAMOsDAAAfABDsAwAAyAcAMO0DAQC2BgAh8AMAAMAH1gQi_gMBALYGACGnBAEAtgYAIbgEAgC0BwAhzgQBALcGACHQBAgAvwYAIdIECACrBwAh0wQIAL8GACHUBAgAvwYAIdYEAQC2BgAhHgMAAKQHACAIAACZBwAgDwAAwgYAIBEAAJwHACASAADBBwAg6gMAAL0HADDrAwAAKwAQ7AMAAL0HADDtAwEAtgYAIf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZAEAQC3BgAhkgQBALcGACGmBAEAtwYAIdcEAgC0BwAh2AQBALcGACHaBAAAvgfaBCLbBAgAvwYAId0EAAC_B90EIt4EAQC3BgAh3wQAAMAH1gQi4AQBALcGACHhBAEAtwYAIeIEAQC3BgAh4wQIAL8GACHkBAgAvwYAIeUEAQC3BgAhqgUAACsAIKsFAAArACARDgAAtQcAIBUAAMIGACAXAACHBwAg6gMAAMoHADDrAwAAGwAQ7AMAAMoHADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC2BgAhtwQBALcGACG4BAIAtAcAIbkECAC_BgAhugQIAL8GACG7BAgAvwYAIbwEAQC3BgAhDwkAAMwHACAKAADNBwAgCwAAwQYAIOoDAADLBwAw6wMAABMAEOwDAADLBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACG8BAEAtwYAIb0EAQC2BgAh6gQgANgGACGLBQEAtwYAIYwFAQC3BgAhEQkAAMwHACAKAADNBwAgCwAAwQYAIOoDAADLBwAw6wMAABMAEOwDAADLBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACG8BAEAtwYAIb0EAQC2BgAh6gQgANgGACGLBQEAtwYAIYwFAQC3BgAhqgUAABMAIKsFAAATACADnwQAABMAIKAEAAATACChBAAAEwAgIwgAAKUHACANAADSBwAgFQAAwgYAIBcAAIcHACAYAADTBwAgGQAAmwcAIBoAAKwHACAbAADFBgAgHAAAxwYAIB8AANcGACDqAwAAzgcAMOsDAAAPABDsAwAAzgcAMO0DAQC2BgAh8AMAAM8HwgQi_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALYGACGaBAEAtgYAIbcEAQC3BgAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvQQBALYGACG-BAEAtgYAIb8EAADcBgAgwAQCALQHACHDBAAA0AfDBCLEBAAA3AYAIMYEAADRB8YEIscECAC_BgAhyAQgANgGACHJBCAA2AYAIcoEAQC2BgAhBIEEAAAAwgQCggQAAADCBAiDBAAAAMIECIgEAADlBsIEIgSBBAAAAMMEAoIEAAAAwwQIgwQAAADDBAiIBAAA4wbDBCIEgQQAAADGBAKCBAAAAMYECIMEAAAAxgQIiAQAAOEGxgQiEQkAAMwHACAKAADNBwAgCwAAwQYAIOoDAADLBwAw6wMAABMAEOwDAADLBwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACG8BAEAtwYAIb0EAQC2BgAh6gQgANgGACGLBQEAtwYAIYwFAQC3BgAhqgUAABMAIKsFAAATACADnwQAABsAIKAEAAAbACChBAAAGwAgDgMAAMAGACDqAwAA1AcAMOsDAAALABDsAwAA1AcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIZEEAQC2BgAhmgQBALYGACGmBAEAtgYAIa4EIADYBgAhrwRAANkGACGjBQEAtwYAIaQFAQC3BgAhEQMAAMAGACDqAwAA1QcAMOsDAAAHABDsAwAA1QcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIaYEAQC2BgAhkQUBALYGACGSBQEAtgYAIZMFAQC3BgAhlAUBALcGACGVBQEAtwYAIZYFQADZBgAhlwVAANkGACGYBQEAtwYAIZkFAQC3BgAhDAMAAMAGACDqAwAA1gcAMOsDAAADABDsAwAA1gcAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIaYEAQC2BgAhkAVAALgGACGaBQEAtgYAIZsFAQC3BgAhnAUBALcGACEAAAAAAAABrwUBAAAAAQWvBQgAAAABtgUIAAAAAbcFCAAAAAG4BQgAAAABuQUIAAAAAQGvBQAAAPADAgGvBQAAAPIDAgGvBQAAAPQDAwGvBQEAAAABAa8FQAAAAAEBrwVAAAAAAQcyAADlDgAgMwAA6w4AIKwFAADmDgAgrQUAAOoOACCwBQAAIwAgsQUAACMAILIFAADUAQAgBTIAAOMOACAzAADoDgAgrAUAAOQOACCtBQAA5w4AILIFAADQBQAgAzIAAOUOACCsBQAA5g4AILIFAADUAQAgAzIAAOMOACCsBQAA5A4AILIFAADQBQAgAAAAAAAAAAABrwUAAACdBAIFMgAA3A0AIDMAAOEOACCsBQAA3Q0AIK0FAADgDgAgsgUAANQBACALMgAA3AkAMDMAAOEJADCsBQAA3QkAMK0FAADeCQAwrgUAAN8JACCvBQAA4AkAMLAFAADgCQAwsQUAAOAJADCyBQAA4AkAMLMFAADiCQAwtAUAAOMJADALMgAA0QkAMDMAANUJADCsBQAA0gkAMK0FAADTCQAwrgUAANQJACCvBQAA6wgAMLAFAADrCAAwsQUAAOsIADCyBQAA6wgAMLMFAADWCQAwtAUAAO4IADALMgAAtwkAMDMAALwJADCsBQAAuAkAMK0FAAC5CQAwrgUAALoJACCvBQAAuwkAMLAFAAC7CQAwsQUAALsJADCyBQAAuwkAMLMFAAC9CQAwtAUAAL4JADALMgAAjQkAMDMAAJIJADCsBQAAjgkAMK0FAACPCQAwrgUAAJAJACCvBQAAkQkAMLAFAACRCQAwsQUAAJEJADCyBQAAkQkAMLMFAACTCQAwtAUAAJQJADALMgAA_wgAMDMAAIQJADCsBQAAgAkAMK0FAACBCQAwrgUAAIIJACCvBQAAgwkAMLAFAACDCQAwsQUAAIMJADCyBQAAgwkAMLMFAACFCQAwtAUAAIYJADALMgAAxggAMDMAAMsIADCsBQAAxwgAMK0FAADICAAwrgUAAMkIACCvBQAAyggAMLAFAADKCAAwsQUAAMoIADCyBQAAyggAMLMFAADMCAAwtAUAAM0IADALMgAAsQgAMDMAALYIADCsBQAAsggAMK0FAACzCAAwrgUAALQIACCvBQAAtQgAMLAFAAC1CAAwsQUAALUIADCyBQAAtQgAMLMFAAC3CAAwtAUAALgIADALMgAAlwgAMDMAAJwIADCsBQAAmAgAMK0FAACZCAAwrgUAAJoIACCvBQAAmwgAMLAFAACbCAAwsQUAAJsIADCyBQAAmwgAMLMFAACdCAAwtAUAAJ4IADALMgAAiQgAMDMAAI4IADCsBQAAiggAMK0FAACLCAAwrgUAAIwIACCvBQAAjQgAMLAFAACNCAAwsQUAAI0IADCyBQAAjQgAMLMFAACPCAAwtAUAAJAIADALMgAA_QcAMDMAAIIIADCsBQAA_gcAMK0FAAD_BwAwrgUAAIAIACCvBQAAgQgAMLAFAACBCAAwsQUAAIEIADCyBQAAgQgAMLMFAACDCAAwtAUAAIQIADARIwAA5wcAIO0DAQAAAAHuAwgAAAAB8AMAAADwAwLyAwAAAPIDAvQDAAAA9AMD9QMBAAAAAfYDAQAAAAH3AwEAAAAB-AMBAAAAAfkDAQAAAAH6AwEAAAAB-wMBAAAAAfwDQAAAAAH9AwEAAAAB_wNAAAAAAYAEQAAAAAECAAAAdwAgMgAAiAgAIAMAAAB3ACAyAACICAAgMwAAhwgAIAErAADfDgAwFggAAKUHACAjAACkBwAg6gMAAKAHADDrAwAAdQAQ7AMAAKAHADDtAwEAAAAB7gMIAL8GACHwAwAAoQfwAyLyAwAAogfyAyL0AwAAowf0AyP1AwEAtwYAIfYDAQC3BgAh9wMBALcGACH4AwEAtwYAIfkDAQC3BgAh-gMBALcGACH7AwEAtwYAIfwDQADZBgAh_QMBALcGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACECAAAAdwAgKwAAhwgAIAIAAACFCAAgKwAAhggAIBTqAwAAhAgAMOsDAACFCAAQ7AMAAIQIADDtAwEAtgYAIe4DCAC_BgAh8AMAAKEH8AMi8gMAAKIH8gMi9AMAAKMH9AMj9QMBALcGACH2AwEAtwYAIfcDAQC3BgAh-AMBALcGACH5AwEAtwYAIfoDAQC3BgAh-wMBALcGACH8A0AA2QYAIf0DAQC3BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhFOoDAACECAAw6wMAAIUIABDsAwAAhAgAMO0DAQC2BgAh7gMIAL8GACHwAwAAoQfwAyLyAwAAogfyAyL0AwAAowf0AyP1AwEAtwYAIfYDAQC3BgAh9wMBALcGACH4AwEAtwYAIfkDAQC3BgAh-gMBALcGACH7AwEAtwYAIfwDQADZBgAh_QMBALcGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACEQ7QMBAN0HACHuAwgA3gcAIfADAADfB_ADIvIDAADgB_IDIvQDAADhB_QDI_UDAQDiBwAh9gMBAOIHACH3AwEA4gcAIfgDAQDiBwAh-QMBAOIHACH6AwEA4gcAIfsDAQDiBwAh_ANAAOMHACH9AwEA4gcAIf8DQADkBwAhgARAAOQHACERIwAA5QcAIO0DAQDdBwAh7gMIAN4HACHwAwAA3wfwAyLyAwAA4AfyAyL0AwAA4Qf0AyP1AwEA4gcAIfYDAQDiBwAh9wMBAOIHACH4AwEA4gcAIfkDAQDiBwAh-gMBAOIHACH7AwEA4gcAIfwDQADjBwAh_QMBAOIHACH_A0AA5AcAIYAEQADkBwAhESMAAOcHACDtAwEAAAAB7gMIAAAAAfADAAAA8AMC8gMAAADyAwL0AwAAAPQDA_UDAQAAAAH2AwEAAAAB9wMBAAAAAfgDAQAAAAH5AwEAAAAB-gMBAAAAAfsDAQAAAAH8A0AAAAAB_QMBAAAAAf8DQAAAAAGABEAAAAABCQ0AAJYIACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABygQBAAAAAdAECAAAAAGCBQEAAAABgwVAAAAAAQIAAABxACAyAACVCAAgAwAAAHEAIDIAAJUIACAzAACTCAAgASsAAN4OADAOCAAApQcAIA0AAKcHACDqAwAApgcAMOsDAABvABDsAwAApgcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIcoEAQC2BgAh0AQIAL8GACGCBQEAtwYAIYMFQAC4BgAhAgAAAHEAICsAAJMIACACAAAAkQgAICsAAJIIACAM6gMAAJAIADDrAwAAkQgAEOwDAACQCAAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIcoEAQC2BgAh0AQIAL8GACGCBQEAtwYAIYMFQAC4BgAhDOoDAACQCAAw6wMAAJEIABDsAwAAkAgAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACHKBAEAtgYAIdAECAC_BgAhggUBALcGACGDBUAAuAYAIQjtAwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIcoEAQDdBwAh0AQIAN4HACGCBQEA4gcAIYMFQADkBwAhCQ0AAJQIACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIcoEAQDdBwAh0AQIAN4HACGCBQEA4gcAIYMFQADkBwAhBTIAANkOACAzAADcDgAgrAUAANoOACCtBQAA2w4AILIFAABtACAJDQAAlggAIO0DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHKBAEAAAAB0AQIAAAAAYIFAQAAAAGDBUAAAAABAzIAANkOACCsBQAA2g4AILIFAABtACAGIQAAsAgAIO0DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHqBCAAAAABAgAAAG0AIDIAAK8IACADAAAAbQAgMgAArwgAIDMAAKIIACABKwAA2A4AMAsIAAClBwAgIQAAyQYAIOoDAACoBwAw6wMAAGsAEOwDAACoBwAw7QMBAAAAAf4DAQC2BgAh_wNAALgGACGABEAAuAYAIZoEAQC2BgAh6gQgANgGACECAAAAbQAgKwAAoggAIAIAAACfCAAgKwAAoAgAIAnqAwAAnggAMOsDAACfCAAQ7AMAAJ4IADDtAwEAtgYAIf4DAQC2BgAh_wNAALgGACGABEAAuAYAIZoEAQC2BgAh6gQgANgGACEJ6gMAAJ4IADDrAwAAnwgAEOwDAACeCAAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIeoEIADYBgAhBe0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAh6gQgAKEIACEBrwUgAAAAAQYhAACjCAAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACHqBCAAoQgAIQsyAACkCAAwMwAAqAgAMKwFAAClCAAwrQUAAKYIADCuBQAApwgAIK8FAACNCAAwsAUAAI0IADCxBQAAjQgAMLIFAACNCAAwswUAAKkIADC0BQAAkAgAMAkIAACuCAAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHQBAgAAAABggUBAAAAAYMFQAAAAAECAAAAcQAgMgAArQgAIAMAAABxACAyAACtCAAgMwAAqwgAIAErAADXDgAwAgAAAHEAICsAAKsIACACAAAAkQgAICsAAKoIACAI7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIdAECADeBwAhggUBAOIHACGDBUAA5AcAIQkIAACsCAAg7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIdAECADeBwAhggUBAOIHACGDBUAA5AcAIQUyAADSDgAgMwAA1Q4AIKwFAADTDgAgrQUAANQOACCyBQAA0AUAIAkIAACuCAAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHQBAgAAAABggUBAAAAAYMFQAAAAAEDMgAA0g4AIKwFAADTDgAgsgUAANAFACAGIQAAsAgAIO0DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHqBCAAAAABBDIAAKQIADCsBQAApQgAMK4FAACnCAAgsgUAAI0IADAfDgAAxQgAIO0DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGnBAEAAAABvQQBAAAAAeoEIAAAAAHrBAEAAAAB7AQgAAAAAe0EIAAAAAHuBCAAAAAB7wQgAAAAAfAEAADCCAAg8QQBAAAAAfIEAQAAAAHzBAEAAAAB9AQBAAAAAfUEAQAAAAH2BAEAAAAB9wQBAAAAAfgEAADDCAAg-QQBAAAAAfoEAQAAAAH7BAEAAAAB_AQBAAAAAf0EAQAAAAH-BAAAxAgAIP8EAQAAAAGABQEAAAABgQUCAAAAAQIAAABRACAyAADBCAAgAwAAAFEAIDIAAMEIACAzAAC_CAAgASsAANEOADAkCAAApQcAIA4AALUHACDqAwAAswcAMOsDAABPABDsAwAAswcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGOBAEAtwYAIacEAQC2BgAhvQQBAAAAAeoEIADYBgAh6wQBALYGACHsBCAA2AYAIe0EIADYBgAh7gQgANgGACHvBCAA2AYAIfAEAADcBgAg8QQBALYGACHyBAEAtwYAIfMEAQC3BgAh9AQBALcGACH1BAEAtwYAIfYEAQC3BgAh9wQBALcGACH4BAAA3AYAIPkEAQC3BgAh-gQBALcGACH7BAEAtwYAIfwEAQC3BgAh_QQBALcGACH-BAAA3AYAIP8EAQC2BgAhgAUBALYGACGBBQIAtAcAIQIAAABRACArAAC_CAAgAgAAALkIACArAAC6CAAgIuoDAAC4CAAw6wMAALkIABDsAwAAuAgAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALcGACGnBAEAtgYAIb0EAQC2BgAh6gQgANgGACHrBAEAtgYAIewEIADYBgAh7QQgANgGACHuBCAA2AYAIe8EIADYBgAh8AQAANwGACDxBAEAtgYAIfIEAQC3BgAh8wQBALcGACH0BAEAtwYAIfUEAQC3BgAh9gQBALcGACH3BAEAtwYAIfgEAADcBgAg-QQBALcGACH6BAEAtwYAIfsEAQC3BgAh_AQBALcGACH9BAEAtwYAIf4EAADcBgAg_wQBALYGACGABQEAtgYAIYEFAgC0BwAhIuoDAAC4CAAw6wMAALkIABDsAwAAuAgAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALcGACGnBAEAtgYAIb0EAQC2BgAh6gQgANgGACHrBAEAtgYAIewEIADYBgAh7QQgANgGACHuBCAA2AYAIe8EIADYBgAh8AQAANwGACDxBAEAtgYAIfIEAQC3BgAh8wQBALcGACH0BAEAtwYAIfUEAQC3BgAh9gQBALcGACH3BAEAtwYAIfgEAADcBgAg-QQBALcGACH6BAEAtwYAIfsEAQC3BgAh_AQBALcGACH9BAEAtwYAIf4EAADcBgAg_wQBALYGACGABQEAtgYAIYEFAgC0BwAhHu0DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhpwQBAN0HACG9BAEA3QcAIeoEIAChCAAh6wQBAN0HACHsBCAAoQgAIe0EIAChCAAh7gQgAKEIACHvBCAAoQgAIfAEAAC7CAAg8QQBAN0HACHyBAEA4gcAIfMEAQDiBwAh9AQBAOIHACH1BAEA4gcAIfYEAQDiBwAh9wQBAOIHACH4BAAAvAgAIPkEAQDiBwAh-gQBAOIHACH7BAEA4gcAIfwEAQDiBwAh_QQBAOIHACH-BAAAvQgAIP8EAQDdBwAhgAUBAN0HACGBBQIAvggAIQKvBQEAAAAEtQUBAAAABQKvBQEAAAAEtQUBAAAABQKvBQEAAAAEtQUBAAAABQWvBQIAAAABtgUCAAAAAbcFAgAAAAG4BQIAAAABuQUCAAAAAR8OAADACAAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGnBAEA3QcAIb0EAQDdBwAh6gQgAKEIACHrBAEA3QcAIewEIAChCAAh7QQgAKEIACHuBCAAoQgAIe8EIAChCAAh8AQAALsIACDxBAEA3QcAIfIEAQDiBwAh8wQBAOIHACH0BAEA4gcAIfUEAQDiBwAh9gQBAOIHACH3BAEA4gcAIfgEAAC8CAAg-QQBAOIHACH6BAEA4gcAIfsEAQDiBwAh_AQBAOIHACH9BAEA4gcAIf4EAAC9CAAg_wQBAN0HACGABQEA3QcAIYEFAgC-CAAhBTIAAMwOACAzAADPDgAgrAUAAM0OACCtBQAAzg4AILIFAAARACAfDgAAxQgAIO0DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGnBAEAAAABvQQBAAAAAeoEIAAAAAHrBAEAAAAB7AQgAAAAAe0EIAAAAAHuBCAAAAAB7wQgAAAAAfAEAADCCAAg8QQBAAAAAfIEAQAAAAHzBAEAAAAB9AQBAAAAAfUEAQAAAAH2BAEAAAAB9wQBAAAAAfgEAADDCAAg-QQBAAAAAfoEAQAAAAH7BAEAAAAB_AQBAAAAAf0EAQAAAAH-BAAAxAgAIP8EAQAAAAGABQEAAAABgQUCAAAAAQGvBQEAAAAEAa8FAQAAAAQBrwUBAAAABAMyAADMDgAgrAUAAM0OACCyBQAAEQAgFwMAAPsIACAPAAD8CAAgEQAA_QgAIBIAAP4IACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAaYEAQAAAAHXBAIAAAAB2AQBAAAAAdoEAAAA2gQC2wQIAAAAAd0EAAAA3QQC3gQBAAAAAd8EAAAA1gQC4AQBAAAAAeEEAQAAAAHiBAEAAAAB4wQIAAAAAeQECAAAAAHlBAEAAAABAgAAADQAIDIAAPoIACADAAAANAAgMgAA-ggAIDMAANMIACABKwAAyw4AMBwDAACkBwAgCAAAmQcAIA8AAMIGACARAACcBwAgEgAAwQcAIOoDAAC9BwAw6wMAACsAEOwDAAC9BwAw7QMBAAAAAf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZAEAQC3BgAhkgQBALcGACGmBAEAtwYAIdcEAgC0BwAh2AQBAAAAAdoEAAC-B9oEItsECAC_BgAh3QQAAL8H3QQi3gQBALcGACHfBAAAwAfWBCLgBAEAtwYAIeEEAQC3BgAh4gQBALcGACHjBAgAvwYAIeQECAC_BgAh5QQBALcGACECAAAANAAgKwAA0wgAIAIAAADOCAAgKwAAzwgAIBfqAwAAzQgAMOsDAADOCAAQ7AMAAM0IADDtAwEAtgYAIf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZAEAQC3BgAhkgQBALcGACGmBAEAtwYAIdcEAgC0BwAh2AQBALcGACHaBAAAvgfaBCLbBAgAvwYAId0EAAC_B90EIt4EAQC3BgAh3wQAAMAH1gQi4AQBALcGACHhBAEAtwYAIeIEAQC3BgAh4wQIAL8GACHkBAgAvwYAIeUEAQC3BgAhF-oDAADNCAAw6wMAAM4IABDsAwAAzQgAMO0DAQC2BgAh_gMBALcGACH_A0AAuAYAIYAEQAC4BgAhkAQBALcGACGSBAEAtwYAIaYEAQC3BgAh1wQCALQHACHYBAEAtwYAIdoEAAC-B9oEItsECAC_BgAh3QQAAL8H3QQi3gQBALcGACHfBAAAwAfWBCLgBAEAtwYAIeEEAQC3BgAh4gQBALcGACHjBAgAvwYAIeQECAC_BgAh5QQBALcGACET7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhkAQBAOIHACGSBAEA4gcAIaYEAQDiBwAh1wQCAL4IACHYBAEA4gcAIdoEAADQCNoEItsECADeBwAh3QQAANEI3QQi3gQBAOIHACHfBAAA0gjWBCLgBAEA4gcAIeEEAQDiBwAh4gQBAOIHACHjBAgA3gcAIeQECADeBwAh5QQBAOIHACEBrwUAAADaBAIBrwUAAADdBAIBrwUAAADWBAIXAwAA1AgAIA8AANUIACARAADWCAAgEgAA1wgAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZAEAQDiBwAhkgQBAOIHACGmBAEA4gcAIdcEAgC-CAAh2AQBAOIHACHaBAAA0AjaBCLbBAgA3gcAId0EAADRCN0EIt4EAQDiBwAh3wQAANII1gQi4AQBAOIHACHhBAEA4gcAIeIEAQDiBwAh4wQIAN4HACHkBAgA3gcAIeUEAQDiBwAhBzIAAK0OACAzAADJDgAgrAUAAK4OACCtBQAAyA4AILAFAAAjACCxBQAAIwAgsgUAANQBACALMgAA5wgAMDMAAOwIADCsBQAA6AgAMK0FAADpCAAwrgUAAOoIACCvBQAA6wgAMLAFAADrCAAwsQUAAOsIADCyBQAA6wgAMLMFAADtCAAwtAUAAO4IADALMgAA2AgAMDMAAN0IADCsBQAA2QgAMK0FAADaCAAwrgUAANsIACCvBQAA3AgAMLAFAADcCAAwsQUAANwIADCyBQAA3AgAMLMFAADeCAAwtAUAAN8IADAHMgAAqw4AIDMAAMYOACCsBQAArA4AIK0FAADFDgAgsAUAAC0AILEFAAAtACCyBQAAZgAgCAMAAOYIACDtAwEAAAAB_wNAAAAAAaYEAQAAAAHDBAAAAOcEAucEAQAAAAHoBAEAAAAB6QQgAAAAAQIAAAApACAyAADlCAAgAwAAACkAIDIAAOUIACAzAADjCAAgASsAAMQOADANAwAAwAYAIBAAAMcHACDqAwAAxQcAMOsDAAAnABDsAwAAxQcAMO0DAQAAAAH_A0AAuAYAIaYEAQC2BgAhwwQAAMYH5wQi1gQBALcGACHnBAEAtgYAIegEAQC2BgAh6QQgANgGACECAAAAKQAgKwAA4wgAIAIAAADgCAAgKwAA4QgAIAvqAwAA3wgAMOsDAADgCAAQ7AMAAN8IADDtAwEAtgYAIf8DQAC4BgAhpgQBALYGACHDBAAAxgfnBCLWBAEAtwYAIecEAQC2BgAh6AQBALYGACHpBCAA2AYAIQvqAwAA3wgAMOsDAADgCAAQ7AMAAN8IADDtAwEAtgYAIf8DQAC4BgAhpgQBALYGACHDBAAAxgfnBCLWBAEAtwYAIecEAQC2BgAh6AQBALYGACHpBCAA2AYAIQftAwEA3QcAIf8DQADkBwAhpgQBAN0HACHDBAAA4gjnBCLnBAEA3QcAIegEAQDdBwAh6QQgAKEIACEBrwUAAADnBAIIAwAA5AgAIO0DAQDdBwAh_wNAAOQHACGmBAEA3QcAIcMEAADiCOcEIucEAQDdBwAh6AQBAN0HACHpBCAAoQgAIQUyAAC_DgAgMwAAwg4AIKwFAADADgAgrQUAAMEOACCyBQAA1AEAIAgDAADmCAAg7QMBAAAAAf8DQAAAAAGmBAEAAAABwwQAAADnBALnBAEAAAAB6AQBAAAAAekEIAAAAAEDMgAAvw4AIKwFAADADgAgsgUAANQBACANCAAA-QgAIA4AAPcIACAUAAD4CAAg7QMBAAAAAfADAAAA1gQC_gMBAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAdAECAAAAAHSBAgAAAAB0wQIAAAAAdQECAAAAAECAAAAIQAgMgAA9ggAIAMAAAAhACAyAAD2CAAgMwAA8ggAIAErAAC-DgAwEggAAKUHACAOAAC1BwAgEAAAyQcAIBQAALwHACDqAwAAyAcAMOsDAAAfABDsAwAAyAcAMO0DAQAAAAHwAwAAwAfWBCL-AwEAtgYAIacEAQC2BgAhuAQCALQHACHOBAEAtwYAIdAECAC_BgAh0gQIAKsHACHTBAgAvwYAIdQECAC_BgAh1gQBALYGACECAAAAIQAgKwAA8ggAIAIAAADvCAAgKwAA8AgAIA7qAwAA7ggAMOsDAADvCAAQ7AMAAO4IADDtAwEAtgYAIfADAADAB9YEIv4DAQC2BgAhpwQBALYGACG4BAIAtAcAIc4EAQC3BgAh0AQIAL8GACHSBAgAqwcAIdMECAC_BgAh1AQIAL8GACHWBAEAtgYAIQ7qAwAA7ggAMOsDAADvCAAQ7AMAAO4IADDtAwEAtgYAIfADAADAB9YEIv4DAQC2BgAhpwQBALYGACG4BAIAtAcAIc4EAQC3BgAh0AQIAL8GACHSBAgAqwcAIdMECAC_BgAh1AQIAL8GACHWBAEAtgYAIQrtAwEA3QcAIfADAADSCNYEIv4DAQDdBwAhpwQBAN0HACG4BAIAvggAIc4EAQDiBwAh0AQIAN4HACHSBAgA8QgAIdMECADeBwAh1AQIAN4HACEFrwUIAAAAAbYFCAAAAAG3BQgAAAABuAUIAAAAAbkFCAAAAAENCAAA9QgAIA4AAPMIACAUAAD0CAAg7QMBAN0HACHwAwAA0gjWBCL-AwEA3QcAIacEAQDdBwAhuAQCAL4IACHOBAEA4gcAIdAECADeBwAh0gQIAPEIACHTBAgA3gcAIdQECADeBwAhBTIAALMOACAzAAC8DgAgrAUAALQOACCtBQAAuw4AILIFAAARACAHMgAAsQ4AIDMAALkOACCsBQAAsg4AIK0FAAC4DgAgsAUAABsAILEFAAAbACCyBQAAHQAgBTIAAK8OACAzAAC2DgAgrAUAALAOACCtBQAAtQ4AILIFAADQBQAgDQgAAPkIACAOAAD3CAAgFAAA-AgAIO0DAQAAAAHwAwAAANYEAv4DAQAAAAGnBAEAAAABuAQCAAAAAc4EAQAAAAHQBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAABAzIAALMOACCsBQAAtA4AILIFAAARACADMgAAsQ4AIKwFAACyDgAgsgUAAB0AIAMyAACvDgAgrAUAALAOACCyBQAA0AUAIBcDAAD7CAAgDwAA_AgAIBEAAP0IACASAAD-CAAg7QMBAAAAAf8DQAAAAAGABEAAAAABkAQBAAAAAZIEAQAAAAGmBAEAAAAB1wQCAAAAAdgEAQAAAAHaBAAAANoEAtsECAAAAAHdBAAAAN0EAt4EAQAAAAHfBAAAANYEAuAEAQAAAAHhBAEAAAAB4gQBAAAAAeMECAAAAAHkBAgAAAAB5QQBAAAAAQMyAACtDgAgrAUAAK4OACCyBQAA1AEAIAQyAADnCAAwrAUAAOgIADCuBQAA6ggAILIFAADrCAAwBDIAANgIADCsBQAA2QgAMK4FAADbCAAgsgUAANwIADADMgAAqw4AIKwFAACsDgAgsgUAAGYAIAsOAACMCQAg7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbYEAQAAAAG4BAIAAAABzgQBAAAAAc8EAQAAAAHQBAgAAAAB0QQBAAAAAQIAAABNACAyAACLCQAgAwAAAE0AIDIAAIsJACAzAACJCQAgASsAAKoOADAQCAAApQcAIA4AALUHACDqAwAAtgcAMOsDAABLABDsAwAAtgcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC3BgAhuAQCALQHACHOBAEAtwYAIc8EAQC2BgAh0AQIAL8GACHRBAEAtwYAIQIAAABNACArAACJCQAgAgAAAIcJACArAACICQAgDuoDAACGCQAw6wMAAIcJABDsAwAAhgkAMO0DAQC2BgAh_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhpwQBALYGACG2BAEAtwYAIbgEAgC0BwAhzgQBALcGACHPBAEAtgYAIdAECAC_BgAh0QQBALcGACEO6gMAAIYJADDrAwAAhwkAEOwDAACGCQAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC3BgAhuAQCALQHACHOBAEAtwYAIc8EAQC2BgAh0AQIAL8GACHRBAEAtwYAIQrtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbYEAQDiBwAhuAQCAL4IACHOBAEA4gcAIc8EAQDdBwAh0AQIAN4HACHRBAEA4gcAIQsOAACKCQAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpwQBAN0HACG2BAEA4gcAIbgEAgC-CAAhzgQBAOIHACHPBAEA3QcAIdAECADeBwAh0QQBAOIHACEFMgAApQ4AIDMAAKgOACCsBQAApg4AIK0FAACnDgAgsgUAABEAIAsOAACMCQAg7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbYEAQAAAAG4BAIAAAABzgQBAAAAAc8EAQAAAAHQBAgAAAAB0QQBAAAAAQMyAAClDgAgrAUAAKYOACCyBQAAEQAgDQsAALUJACATAAC2CQAg7QMBAAAAAf8DQAAAAAGABEAAAAAB4wQIAAAAAeoEIAAAAAGEBQEAAAABhgUAAACGBQKHBQgAAAABiAUIAAAAAYkFQAAAAAGKBUAAAAABAgAAAGYAIDIAALQJACADAAAAZgAgMgAAtAkAIDMAAJgJACABKwAApA4AMBIIAAClBwAgCwAArAcAIBMAAMYGACDqAwAAqQcAMOsDAAAtABDsAwAAqQcAMO0DAQAAAAH-AwEAtgYAIf8DQAC4BgAhgARAALgGACHjBAgAvwYAIeoEIADYBgAhhAUBAAAAAYYFAACqB4YFIocFCACrBwAhiAUIAL8GACGJBUAAuAYAIYoFQAC4BgAhAgAAAGYAICsAAJgJACACAAAAlQkAICsAAJYJACAP6gMAAJQJADDrAwAAlQkAEOwDAACUCQAw7QMBALYGACH-AwEAtgYAIf8DQAC4BgAhgARAALgGACHjBAgAvwYAIeoEIADYBgAhhAUBALYGACGGBQAAqgeGBSKHBQgAqwcAIYgFCAC_BgAhiQVAALgGACGKBUAAuAYAIQ_qAwAAlAkAMOsDAACVCQAQ7AMAAJQJADDtAwEAtgYAIf4DAQC2BgAh_wNAALgGACGABEAAuAYAIeMECAC_BgAh6gQgANgGACGEBQEAtgYAIYYFAACqB4YFIocFCACrBwAhiAUIAL8GACGJBUAAuAYAIYoFQAC4BgAhC-0DAQDdBwAh_wNAAOQHACGABEAA5AcAIeMECADeBwAh6gQgAKEIACGEBQEA3QcAIYYFAACXCYYFIocFCADxCAAhiAUIAN4HACGJBUAA5AcAIYoFQADkBwAhAa8FAAAAhgUCDQsAAJkJACATAACaCQAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAh4wQIAN4HACHqBCAAoQgAIYQFAQDdBwAhhgUAAJcJhgUihwUIAPEIACGIBQgA3gcAIYkFQADkBwAhigVAAOQHACELMgAApgkAMDMAAKsJADCsBQAApwkAMK0FAACoCQAwrgUAAKkJACCvBQAAqgkAMLAFAACqCQAwsQUAAKoJADCyBQAAqgkAMLMFAACsCQAwtAUAAK0JADALMgAAmwkAMDMAAJ8JADCsBQAAnAkAMK0FAACdCQAwrgUAAJ4JACCvBQAAyggAMLAFAADKCAAwsQUAAMoIADCyBQAAyggAMLMFAACgCQAwtAUAAM0IADAXAwAA-wgAIAgAAKUJACAPAAD8CAAgEQAA_QgAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAaYEAQAAAAHXBAIAAAAB2AQBAAAAAdoEAAAA2gQC2wQIAAAAAd0EAAAA3QQC3gQBAAAAAd8EAAAA1gQC4AQBAAAAAeEEAQAAAAHiBAEAAAAB4wQIAAAAAeQECAAAAAECAAAANAAgMgAApAkAIAMAAAA0ACAyAACkCQAgMwAAogkAIAErAACjDgAwAgAAADQAICsAAKIJACACAAAAzggAICsAAKEJACAT7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACEXAwAA1AgAIAgAAKMJACAPAADVCAAgEQAA1ggAIO0DAQDdBwAh_gMBAOIHACH_A0AA5AcAIYAEQADkBwAhkAQBAOIHACGSBAEA4gcAIaYEAQDiBwAh1wQCAL4IACHYBAEA4gcAIdoEAADQCNoEItsECADeBwAh3QQAANEI3QQi3gQBAOIHACHfBAAA0gjWBCLgBAEA4gcAIeEEAQDiBwAh4gQBAOIHACHjBAgA3gcAIeQECADeBwAhBzIAAJ4OACAzAAChDgAgrAUAAJ8OACCtBQAAoA4AILAFAAANACCxBQAADQAgsgUAANAFACAXAwAA-wgAIAgAAKUJACAPAAD8CAAgEQAA_QgAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAaYEAQAAAAHXBAIAAAAB2AQBAAAAAdoEAAAA2gQC2wQIAAAAAd0EAAAA3QQC3gQBAAAAAd8EAAAA1gQC4AQBAAAAAeEEAQAAAAHiBAEAAAAB4wQIAAAAAeQECAAAAAEDMgAAng4AIKwFAACfDgAgsgUAANAFACADDgAAswkAIO0DAQAAAAGnBAEAAAABAgAAADEAIDIAALIJACADAAAAMQAgMgAAsgkAIDMAALAJACABKwAAnQ4AMAkOAAC1BwAgEgAAxAcAIOoDAADDBwAw6wMAAC8AEOwDAADDBwAw7QMBAAAAAacEAQC2BgAh5QQBALYGACGpBQAAwgcAIAIAAAAxACArAACwCQAgAgAAAK4JACArAACvCQAgBuoDAACtCQAw6wMAAK4JABDsAwAArQkAMO0DAQC2BgAhpwQBALYGACHlBAEAtgYAIQbqAwAArQkAMOsDAACuCQAQ7AMAAK0JADDtAwEAtgYAIacEAQC2BgAh5QQBALYGACEC7QMBAN0HACGnBAEA3QcAIQMOAACxCQAg7QMBAN0HACGnBAEA3QcAIQUyAACYDgAgMwAAmw4AIKwFAACZDgAgrQUAAJoOACCyBQAAEQAgAw4AALMJACDtAwEAAAABpwQBAAAAAQMyAACYDgAgrAUAAJkOACCyBQAAEQAgDQsAALUJACATAAC2CQAg7QMBAAAAAf8DQAAAAAGABEAAAAAB4wQIAAAAAeoEIAAAAAGEBQEAAAABhgUAAACGBQKHBQgAAAABiAUIAAAAAYkFQAAAAAGKBUAAAAABBDIAAKYJADCsBQAApwkAMK4FAACpCQAgsgUAAKoJADAEMgAAmwkAMKwFAACcCQAwrgUAAJ4JACCyBQAAyggAMAUeAADQCQAg7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAQIAAABdACAyAADPCQAgAwAAAF0AIDIAAM8JACAzAADBCQAgASsAAJcOADALCAAAmQcAIB4AALIHACDqAwAAsQcAMOsDAABbABDsAwAAsQcAMO0DAQAAAAH-AwEAtwYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIaYFAACwBwAgAgAAAF0AICsAAMEJACACAAAAvwkAICsAAMAJACAI6gMAAL4JADDrAwAAvwkAEOwDAAC-CQAw7QMBALYGACH-AwEAtwYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIQjqAwAAvgkAMOsDAAC_CQAQ7AMAAL4JADDtAwEAtgYAIf4DAQC3BgAh_wNAALgGACGABEAAuAYAIZoEAQC2BgAhBO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhBR4AAMIJACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIQsyAADDCQAwMwAAyAkAMKwFAADECQAwrQUAAMUJADCuBQAAxgkAIK8FAADHCQAwsAUAAMcJADCxBQAAxwkAMLIFAADHCQAwswUAAMkJADC0BQAAygkAMATtAwEAAAAB_wNAAAAAAYAEQAAAAAGPBQEAAAABAgAAAGIAIDIAAM4JACADAAAAYgAgMgAAzgkAIDMAAM0JACABKwAAlg4AMAodAACvBwAg6gMAAK4HADDrAwAAYAAQ7AMAAK4HADDtAwEAAAAB_wNAALgGACGABEAAuAYAIY8FAQC2BgAhogUBALYGACGlBQAArQcAIAIAAABiACArAADNCQAgAgAAAMsJACArAADMCQAgCOoDAADKCQAw6wMAAMsJABDsAwAAygkAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIY8FAQC2BgAhogUBALYGACEI6gMAAMoJADDrAwAAywkAEOwDAADKCQAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhjwUBALYGACGiBQEAtgYAIQTtAwEA3QcAIf8DQADkBwAhgARAAOQHACGPBQEA3QcAIQTtAwEA3QcAIf8DQADkBwAhgARAAOQHACGPBQEA3QcAIQTtAwEAAAAB_wNAAAAAAYAEQAAAAAGPBQEAAAABBR4AANAJACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABBDIAAMMJADCsBQAAxAkAMK4FAADGCQAgsgUAAMcJADANDgAA9wgAIBAAANsJACAUAAD4CAAg7QMBAAAAAfADAAAA1gQCpwQBAAAAAbgEAgAAAAHOBAEAAAAB0AQIAAAAAdIECAAAAAHTBAgAAAAB1AQIAAAAAdYEAQAAAAECAAAAIQAgMgAA2gkAIAMAAAAhACAyAADaCQAgMwAA2AkAIAErAACVDgAwAgAAACEAICsAANgJACACAAAA7wgAICsAANcJACAK7QMBAN0HACHwAwAA0gjWBCKnBAEA3QcAIbgEAgC-CAAhzgQBAOIHACHQBAgA3gcAIdIECADxCAAh0wQIAN4HACHUBAgA3gcAIdYEAQDdBwAhDQ4AAPMIACAQAADZCQAgFAAA9AgAIO0DAQDdBwAh8AMAANII1gQipwQBAN0HACG4BAIAvggAIc4EAQDiBwAh0AQIAN4HACHSBAgA8QgAIdMECADeBwAh1AQIAN4HACHWBAEA3QcAIQUyAACQDgAgMwAAkw4AIKwFAACRDgAgrQUAAJIOACCyBQAANAAgDQ4AAPcIACAQAADbCQAgFAAA-AgAIO0DAQAAAAHwAwAAANYEAqcEAQAAAAG4BAIAAAABzgQBAAAAAdAECAAAAAHSBAgAAAAB0wQIAAAAAdQECAAAAAHWBAEAAAABAzIAAJAOACCsBQAAkQ4AILIFAAA0ACAeDQAA4woAIBUAAOYKACAXAADnCgAgGAAA5AoAIBkAAOUKACAaAADoCgAgGwAA6QoAIBwAAOoKACAfgAAAAAHtAwEAAAAB8AMAAADCBAL_A0AAAAABgARAAAAAAY4EAQAAAAGaBAEAAAABtwQBAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAb0EAQAAAAG-BAEAAAABvwQAAOEKACDABAIAAAABwwQAAADDBALEBAAA4goAIMYEAAAAxgQCxwQIAAAAAcgEIAAAAAHJBCAAAAABygQBAAAAAQIAAAARACAyAADgCgAgAwAAABEAIDIAAOAKACAzAADrCQAgASsAAI8OADAjCAAApQcAIA0AANIHACAVAADCBgAgFwAAhwcAIBgAANMHACAZAACbBwAgGgAArAcAIBsAAMUGACAcAADHBgAgHwAA1wYAIOoDAADOBwAw6wMAAA8AEOwDAADOBwAw7QMBAAAAAfADAADPB8IEIv4DAQC2BgAh_wNAALgGACGABEAAuAYAIY4EAQC2BgAhmgQBALYGACG3BAEAAAABuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvQQBAAAAAb4EAQC2BgAhvwQAANwGACDABAIAtAcAIcMEAADQB8MEIsQEAADcBgAgxgQAANEHxgQixwQIAL8GACHIBCAA2AYAIckEIADYBgAhygQBALYGACECAAAAEQAgKwAA6wkAIAIAAADkCQAgKwAA5QkAIBofAADXBgAg6gMAAOMJADDrAwAA5AkAEOwDAADjCQAw7QMBALYGACHwAwAAzwfCBCL-AwEAtgYAIf8DQAC4BgAhgARAALgGACGOBAEAtgYAIZoEAQC2BgAhtwQBALcGACG5BAgAvwYAIboECAC_BgAhuwQIAL8GACG9BAEAtgYAIb4EAQC2BgAhvwQAANwGACDABAIAtAcAIcMEAADQB8MEIsQEAADcBgAgxgQAANEHxgQixwQIAL8GACHIBCAA2AYAIckEIADYBgAhygQBALYGACEaHwAA1wYAIOoDAADjCQAw6wMAAOQJABDsAwAA4wkAMO0DAQC2BgAh8AMAAM8HwgQi_gMBALYGACH_A0AAuAYAIYAEQAC4BgAhjgQBALYGACGaBAEAtgYAIbcEAQC3BgAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvQQBALYGACG-BAEAtgYAIb8EAADcBgAgwAQCALQHACHDBAAA0AfDBCLEBAAA3AYAIMYEAADRB8YEIscECAC_BgAhyAQgANgGACHJBCAA2AYAIcoEAQC2BgAhFh-AAAAAAe0DAQDdBwAh8AMAAOcJwgQi_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIQKvBQEAAAAEtQUBAAAABQGvBQAAAMIEAgGvBQAAAMMEAgKvBQEAAAAEtQUBAAAABQGvBQAAAMYEAh4NAADsCQAgFQAA7wkAIBcAAPAJACAYAADtCQAgGQAA7gkAIBoAAPEJACAbAADyCQAgHAAA8wkAIB-AAAAAAe0DAQDdBwAh8AMAAOcJwgQi_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIQUyAADeDQAgMwAAjQ4AIKwFAADfDQAgrQUAAIwOACCyBQAAFgAgCzIAALwKADAzAADBCgAwrAUAAL0KADCtBQAAvgoAMK4FAAC_CgAgrwUAAMAKADCwBQAAwAoAMLEFAADACgAwsgUAAMAKADCzBQAAwgoAMLQFAADDCgAwCzIAAK4KADAzAACzCgAwrAUAAK8KADCtBQAAsAoAMK4FAACxCgAgrwUAALIKADCwBQAAsgoAMLEFAACyCgAwsgUAALIKADCzBQAAtAoAMLQFAAC1CgAwCzIAAKUKADAzAACpCgAwrAUAAKYKADCtBQAApwoAMK4FAACoCgAgrwUAAOsIADCwBQAA6wgAMLEFAADrCAAwsgUAAOsIADCzBQAAqgoAMLQFAADuCAAwCzIAAJUKADAzAACaCgAwrAUAAJYKADCtBQAAlwoAMK4FAACYCgAgrwUAAJkKADCwBQAAmQoAMLEFAACZCgAwsgUAAJkKADCzBQAAmwoAMLQFAACcCgAwCzIAAIoKADAzAACOCgAwrAUAAIsKADCtBQAAjAoAMK4FAACNCgAgrwUAAKoJADCwBQAAqgkAMLEFAACqCQAwsgUAAKoJADCzBQAAjwoAMLQFAACtCQAwCzIAAP8JADAzAACDCgAwrAUAAIAKADCtBQAAgQoAMK4FAACCCgAgrwUAAIMJADCwBQAAgwkAMLEFAACDCQAwsgUAAIMJADCzBQAAhAoAMLQFAACGCQAwCzIAAPQJADAzAAD4CQAwrAUAAPUJADCtBQAA9gkAMK4FAAD3CQAgrwUAALUIADCwBQAAtQgAMLEFAAC1CAAwsgUAALUIADCzBQAA-QkAMLQFAAC4CAAwHwgAAP4JACDtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAb0EAQAAAAHqBCAAAAAB6wQBAAAAAewEIAAAAAHtBCAAAAAB7gQgAAAAAe8EIAAAAAHwBAAAwggAIPEEAQAAAAHyBAEAAAAB8wQBAAAAAfQEAQAAAAH1BAEAAAAB9gQBAAAAAfcEAQAAAAH4BAAAwwgAIPkEAQAAAAH6BAEAAAAB-wQBAAAAAfwEAQAAAAH9BAEAAAAB_gQAAMQIACD_BAEAAAABgAUBAAAAAYEFAgAAAAECAAAAUQAgMgAA_QkAIAMAAABRACAyAAD9CQAgMwAA-wkAIAErAACLDgAwAgAAAFEAICsAAPsJACACAAAAuQgAICsAAPoJACAe7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA4gcAIb0EAQDdBwAh6gQgAKEIACHrBAEA3QcAIewEIAChCAAh7QQgAKEIACHuBCAAoQgAIe8EIAChCAAh8AQAALsIACDxBAEA3QcAIfIEAQDiBwAh8wQBAOIHACH0BAEA4gcAIfUEAQDiBwAh9gQBAOIHACH3BAEA4gcAIfgEAAC8CAAg-QQBAOIHACH6BAEA4gcAIfsEAQDiBwAh_AQBAOIHACH9BAEA4gcAIf4EAAC9CAAg_wQBAN0HACGABQEA3QcAIYEFAgC-CAAhHwgAAPwJACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhvQQBAN0HACHqBCAAoQgAIesEAQDdBwAh7AQgAKEIACHtBCAAoQgAIe4EIAChCAAh7wQgAKEIACHwBAAAuwgAIPEEAQDdBwAh8gQBAOIHACHzBAEA4gcAIfQEAQDiBwAh9QQBAOIHACH2BAEA4gcAIfcEAQDiBwAh-AQAALwIACD5BAEA4gcAIfoEAQDiBwAh-wQBAOIHACH8BAEA4gcAIf0EAQDiBwAh_gQAAL0IACD_BAEA3QcAIYAFAQDdBwAhgQUCAL4IACEFMgAAhg4AIDMAAIkOACCsBQAAhw4AIK0FAACIDgAgsgUAANAFACAfCAAA_gkAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGOBAEAAAABvQQBAAAAAeoEIAAAAAHrBAEAAAAB7AQgAAAAAe0EIAAAAAHuBCAAAAAB7wQgAAAAAfAEAADCCAAg8QQBAAAAAfIEAQAAAAHzBAEAAAAB9AQBAAAAAfUEAQAAAAH2BAEAAAAB9wQBAAAAAfgEAADDCAAg-QQBAAAAAfoEAQAAAAH7BAEAAAAB_AQBAAAAAf0EAQAAAAH-BAAAxAgAIP8EAQAAAAGABQEAAAABgQUCAAAAAQMyAACGDgAgrAUAAIcOACCyBQAA0AUAIAsIAACJCgAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAbYEAQAAAAG4BAIAAAABzgQBAAAAAc8EAQAAAAHQBAgAAAAB0QQBAAAAAQIAAABNACAyAACICgAgAwAAAE0AIDIAAIgKACAzAACGCgAgASsAAIUOADACAAAATQAgKwAAhgoAIAIAAACHCQAgKwAAhQoAIArtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIbYEAQDiBwAhuAQCAL4IACHOBAEA4gcAIc8EAQDdBwAh0AQIAN4HACHRBAEA4gcAIQsIAACHCgAg7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACG2BAEA4gcAIbgEAgC-CAAhzgQBAOIHACHPBAEA3QcAIdAECADeBwAh0QQBAOIHACEFMgAAgA4AIDMAAIMOACCsBQAAgQ4AIK0FAACCDgAgsgUAANAFACALCAAAiQoAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAG2BAEAAAABuAQCAAAAAc4EAQAAAAHPBAEAAAAB0AQIAAAAAdEEAQAAAAEDMgAAgA4AIKwFAACBDgAgsgUAANAFACADEgAAlAoAIO0DAQAAAAHlBAEAAAABAgAAADEAIDIAAJMKACADAAAAMQAgMgAAkwoAIDMAAJEKACABKwAA_w0AMAIAAAAxACArAACRCgAgAgAAAK4JACArAACQCgAgAu0DAQDdBwAh5QQBAN0HACEDEgAAkgoAIO0DAQDdBwAh5QQBAN0HACEFMgAA-g0AIDMAAP0NACCsBQAA-w0AIK0FAAD8DQAgsgUAAGYAIAMSAACUCgAg7QMBAAAAAeUEAQAAAAEDMgAA-g0AIKwFAAD7DQAgsgUAAGYAIAgUAACkCgAgFgAAowoAIO0DAQAAAAH_A0AAAAABgARAAAAAAbgEAgAAAAHOBAEAAAABjQUBAAAAAQIAAAA9ACAyAACiCgAgAwAAAD0AIDIAAKIKACAzAACfCgAgASsAAPkNADAODgAAtQcAIBQAALwHACAWAAC7BwAg6gMAALoHADDrAwAAOwAQ7AMAALoHADDtAwEAAAAB_wNAALgGACGABEAAuAYAIacEAQC2BgAhuAQCALQHACHOBAEAtwYAIY0FAQC2BgAhqAUAALkHACACAAAAPQAgKwAAnwoAIAIAAACdCgAgKwAAngoAIArqAwAAnAoAMOsDAACdCgAQ7AMAAJwKADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbgEAgC0BwAhzgQBALcGACGNBQEAtgYAIQrqAwAAnAoAMOsDAACdCgAQ7AMAAJwKADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbgEAgC0BwAhzgQBALcGACGNBQEAtgYAIQbtAwEA3QcAIf8DQADkBwAhgARAAOQHACG4BAIAvggAIc4EAQDiBwAhjQUBAN0HACEIFAAAoQoAIBYAAKAKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACG4BAIAvggAIc4EAQDiBwAhjQUBAN0HACEFMgAA8Q0AIDMAAPcNACCsBQAA8g0AIK0FAAD2DQAgsgUAALECACAHMgAA7w0AIDMAAPQNACCsBQAA8A0AIK0FAADzDQAgsAUAABsAILEFAAAbACCyBQAAHQAgCBQAAKQKACAWAACjCgAg7QMBAAAAAf8DQAAAAAGABEAAAAABuAQCAAAAAc4EAQAAAAGNBQEAAAABAzIAAPENACCsBQAA8g0AILIFAACxAgAgAzIAAO8NACCsBQAA8A0AILIFAAAdACANCAAA-QgAIBAAANsJACAUAAD4CAAg7QMBAAAAAfADAAAA1gQC_gMBAAAAAbgEAgAAAAHOBAEAAAAB0AQIAAAAAdIECAAAAAHTBAgAAAAB1AQIAAAAAdYEAQAAAAECAAAAIQAgMgAArQoAIAMAAAAhACAyAACtCgAgMwAArAoAIAErAADuDQAwAgAAACEAICsAAKwKACACAAAA7wgAICsAAKsKACAK7QMBAN0HACHwAwAA0gjWBCL-AwEA3QcAIbgEAgC-CAAhzgQBAOIHACHQBAgA3gcAIdIECADxCAAh0wQIAN4HACHUBAgA3gcAIdYEAQDdBwAhDQgAAPUIACAQAADZCQAgFAAA9AgAIO0DAQDdBwAh8AMAANII1gQi_gMBAN0HACG4BAIAvggAIc4EAQDiBwAh0AQIAN4HACHSBAgA8QgAIdMECADeBwAh1AQIAN4HACHWBAEA3QcAIQ0IAAD5CAAgEAAA2wkAIBQAAPgIACDtAwEAAAAB8AMAAADWBAL-AwEAAAABuAQCAAAAAc4EAQAAAAHQBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAAB1gQBAAAAAQcDAAC7CgAg7QMBAAAAAf8DQAAAAAGABEAAAAABpAQCAAAAAaUEAQAAAAGmBAEAAAABAgAAAEYAIDIAALoKACADAAAARgAgMgAAugoAIDMAALgKACABKwAA7Q0AMA0DAADABgAgDgAAtQcAIOoDAAC4BwAw6wMAAEQAEOwDAAC4BwAw7QMBAAAAAf8DQAC4BgAhgARAALgGACGkBAIAtAcAIaUEAQC3BgAhpgQBALYGACGnBAEAtgYAIacFAAC3BwAgAgAAAEYAICsAALgKACACAAAAtgoAICsAALcKACAK6gMAALUKADDrAwAAtgoAEOwDAAC1CgAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpAQCALQHACGlBAEAtwYAIaYEAQC2BgAhpwQBALYGACEK6gMAALUKADDrAwAAtgoAEOwDAAC1CgAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpAQCALQHACGlBAEAtwYAIaYEAQC2BgAhpwQBALYGACEG7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpAQCAL4IACGlBAEA4gcAIaYEAQDdBwAhBwMAALkKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGkBAIAvggAIaUEAQDiBwAhpgQBAN0HACEFMgAA6A0AIDMAAOsNACCsBQAA6Q0AIK0FAADqDQAgsgUAANQBACAHAwAAuwoAIO0DAQAAAAH_A0AAAAABgARAAAAAAaQEAgAAAAGlBAEAAAABpgQBAAAAAQMyAADoDQAgrAUAAOkNACCyBQAA1AEAIAwVAADeCgAgFwAA3woAIO0DAQAAAAH_A0AAAAABgARAAAAAAbYEAQAAAAG3BAEAAAABuAQCAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAbwEAQAAAAECAAAAHQAgMgAA3QoAIAMAAAAdACAyAADdCgAgMwAAxgoAIAErAADnDQAwEQ4AALUHACAVAADCBgAgFwAAhwcAIOoDAADKBwAw6wMAABsAEOwDAADKBwAw7QMBAAAAAf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC2BgAhtwQBAAAAAbgEAgC0BwAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvAQBALcGACECAAAAHQAgKwAAxgoAIAIAAADECgAgKwAAxQoAIA7qAwAAwwoAMOsDAADECgAQ7AMAAMMKADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGnBAEAtgYAIbYEAQC2BgAhtwQBALcGACG4BAIAtAcAIbkECAC_BgAhugQIAL8GACG7BAgAvwYAIbwEAQC3BgAhDuoDAADDCgAw6wMAAMQKABDsAwAAwwoAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIacEAQC2BgAhtgQBALYGACG3BAEAtwYAIbgEAgC0BwAhuQQIAL8GACG6BAgAvwYAIbsECAC_BgAhvAQBALcGACEK7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhtgQBAN0HACG3BAEA4gcAIbgEAgC-CAAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvAQBAOIHACEMFQAAxwoAIBcAAMgKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACG2BAEA3QcAIbcEAQDiBwAhuAQCAL4IACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG8BAEA4gcAIQsyAADUCgAwMwAA2AoAMKwFAADVCgAwrQUAANYKADCuBQAA1woAIK8FAADrCAAwsAUAAOsIADCxBQAA6wgAMLIFAADrCAAwswUAANkKADC0BQAA7ggAMAsyAADJCgAwMwAAzQoAMKwFAADKCgAwrQUAAMsKADCuBQAAzAoAIK8FAACZCgAwsAUAAJkKADCxBQAAmQoAMLIFAACZCgAwswUAAM4KADC0BQAAnAoAMAgOAADTCgAgFgAAowoAIO0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG4BAIAAAABjQUBAAAAAQIAAAA9ACAyAADSCgAgAwAAAD0AIDIAANIKACAzAADQCgAgASsAAOYNADACAAAAPQAgKwAA0AoAIAIAAACdCgAgKwAAzwoAIAbtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbgEAgC-CAAhjQUBAN0HACEIDgAA0QoAIBYAAKAKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbgEAgC-CAAhjQUBAN0HACEFMgAA4Q0AIDMAAOQNACCsBQAA4g0AIK0FAADjDQAgsgUAABEAIAgOAADTCgAgFgAAowoAIO0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG4BAIAAAABjQUBAAAAAQMyAADhDQAgrAUAAOINACCyBQAAEQAgDQgAAPkIACAOAAD3CAAgEAAA2wkAIO0DAQAAAAHwAwAAANYEAv4DAQAAAAGnBAEAAAABuAQCAAAAAdAECAAAAAHSBAgAAAAB0wQIAAAAAdQECAAAAAHWBAEAAAABAgAAACEAIDIAANwKACADAAAAIQAgMgAA3AoAIDMAANsKACABKwAA4A0AMAIAAAAhACArAADbCgAgAgAAAO8IACArAADaCgAgCu0DAQDdBwAh8AMAANII1gQi_gMBAN0HACGnBAEA3QcAIbgEAgC-CAAh0AQIAN4HACHSBAgA8QgAIdMECADeBwAh1AQIAN4HACHWBAEA3QcAIQ0IAAD1CAAgDgAA8wgAIBAAANkJACDtAwEA3QcAIfADAADSCNYEIv4DAQDdBwAhpwQBAN0HACG4BAIAvggAIdAECADeBwAh0gQIAPEIACHTBAgA3gcAIdQECADeBwAh1gQBAN0HACENCAAA-QgAIA4AAPcIACAQAADbCQAg7QMBAAAAAfADAAAA1gQC_gMBAAAAAacEAQAAAAG4BAIAAAAB0AQIAAAAAdIECAAAAAHTBAgAAAAB1AQIAAAAAdYEAQAAAAEMFQAA3goAIBcAAN8KACDtAwEAAAAB_wNAAAAAAYAEQAAAAAG2BAEAAAABtwQBAAAAAbgEAgAAAAG5BAgAAAABugQIAAAAAbsECAAAAAG8BAEAAAABBDIAANQKADCsBQAA1QoAMK4FAADXCgAgsgUAAOsIADAEMgAAyQoAMKwFAADKCgAwrgUAAMwKACCyBQAAmQoAMB4NAADjCgAgFQAA5goAIBcAAOcKACAYAADkCgAgGQAA5QoAIBoAAOgKACAbAADpCgAgHAAA6goAIB-AAAAAAe0DAQAAAAHwAwAAAMIEAv8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABAa8FAQAAAAQBrwUBAAAABAMyAADeDQAgrAUAAN8NACCyBQAAFgAgBDIAALwKADCsBQAAvQoAMK4FAAC_CgAgsgUAAMAKADAEMgAArgoAMKwFAACvCgAwrgUAALEKACCyBQAAsgoAMAQyAAClCgAwrAUAAKYKADCuBQAAqAoAILIFAADrCAAwBDIAAJUKADCsBQAAlgoAMK4FAACYCgAgsgUAAJkKADAEMgAAigoAMKwFAACLCgAwrgUAAI0KACCyBQAAqgkAMAQyAAD_CQAwrAUAAIAKADCuBQAAggoAILIFAACDCQAwBDIAAPQJADCsBQAA9QkAMK4FAAD3CQAgsgUAALUIADADMgAA3A0AIKwFAADdDQAgsgUAANQBACAEMgAA3AkAMKwFAADdCQAwrgUAAN8JACCyBQAA4AkAMAQyAADRCQAwrAUAANIJADCuBQAA1AkAILIFAADrCAAwBDIAALcJADCsBQAAuAkAMK4FAAC6CQAgsgUAALsJADAEMgAAjQkAMKwFAACOCQAwrgUAAJAJACCyBQAAkQkAMAQyAAD_CAAwrAUAAIAJADCuBQAAggkAILIFAACDCQAwBDIAAMYIADCsBQAAxwgAMK4FAADJCAAgsgUAAMoIADAEMgAAsQgAMKwFAACyCAAwrgUAALQIACCyBQAAtQgAMAQyAACXCAAwrAUAAJgIADCuBQAAmggAILIFAACbCAAwBDIAAIkIADCsBQAAiggAMK4FAACMCAAgsgUAAI0IADAEMgAA_QcAMKwFAAD-BwAwrgUAAIAIACCyBQAAgQgAMAsEAADxDAAgBQAA8gwAIAYAAPMMACAIAAD0DAAgEQAA9wwAIBMAAPwKACAWAAD1DAAgGQAA9gwAICUAAIALACCvBAAA1wcAILwEAADXBwAgAAAAAAAAAAAAAAAAAAAAAAAAAAAFMgAA1w0AIDMAANoNACCsBQAA2A0AIK0FAADZDQAgsgUAABEAIAMyAADXDQAgrAUAANgNACCyBQAAEQAgAAAAAAAAAAAFMgAA0g0AIDMAANUNACCsBQAA0w0AIK0FAADUDQAgsgUAABEAIAMyAADSDQAgrAUAANMNACCyBQAAEQAgAAAAAAAFMgAAzQ0AIDMAANANACCsBQAAzg0AIK0FAADPDQAgsgUAANAFACADMgAAzQ0AIKwFAADODQAgsgUAANAFACAAAAAAAAAAAAAAAAAAAAAAAAAHMgAAyA0AIDMAAMsNACCsBQAAyQ0AIK0FAADKDQAgsAUAACsAILEFAAArACCyBQAANAAgAzIAAMgNACCsBQAAyQ0AILIFAAA0ACAAAAAAAAAAAAAAAAAAAAAABTIAAMMNACAzAADGDQAgrAUAAMQNACCtBQAAxQ0AILIFAADQBQAgAzIAAMMNACCsBQAAxA0AILIFAADQBQAgAAAAAAAAAAAFMgAAvg0AIDMAAMENACCsBQAAvw0AIK0FAADADQAgsgUAANAFACADMgAAvg0AIKwFAAC_DQAgsgUAANAFACAAAAAHMgAAtw0AIDMAALwNACCsBQAAuA0AIK0FAAC7DQAgsAUAABMAILEFAAATACCyBQAAFgAgCzIAAN0LADAzAADiCwAwrAUAAN4LADCtBQAA3wsAMK4FAADgCwAgrwUAAOELADCwBQAA4QsAMLEFAADhCwAwsgUAAOELADCzBQAA4wsAMLQFAADkCwAwCzIAANQLADAzAADYCwAwrAUAANULADCtBQAA1gsAMK4FAADXCwAgrwUAAOAJADCwBQAA4AkAMLEFAADgCQAwsgUAAOAJADCzBQAA2QsAMLQFAADjCQAwHggAAJ0LACAVAADmCgAgFwAA5woAIBgAAOQKACAZAADlCgAgGgAA6AoAIBsAAOkKACAcAADqCgAgH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAECAAAAEQAgMgAA3AsAIAMAAAARACAyAADcCwAgMwAA2wsAIAErAAC6DQAwAgAAABEAICsAANsLACACAAAA5AkAICsAANoLACAWH4AAAAAB7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhHggAAJwLACAVAADvCQAgFwAA8AkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBsAAPIJACAcAADzCQAgH4AAAAAB7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhHggAAJ0LACAVAADmCgAgFwAA5woAIBgAAOQKACAZAADlCgAgGgAA6AoAIBsAAOkKACAcAADqCgAgH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAEKCgAA6QsAIAsAAOoLACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABvAQBAAAAAb0EAQAAAAHqBCAAAAABiwUBAAAAAQIAAAAWACAyAADoCwAgAwAAABYAIDIAAOgLACAzAADnCwAgASsAALkNADAPCQAAzAcAIAoAAM0HACALAADBBgAg6gMAAMsHADDrAwAAEwAQ7AMAAMsHADDtAwEAAAAB_wNAALgGACGABEAAuAYAIZoEAQAAAAG8BAEAtwYAIb0EAQAAAAHqBCAA2AYAIYsFAQC3BgAhjAUBALcGACECAAAAFgAgKwAA5wsAIAIAAADlCwAgKwAA5gsAIAzqAwAA5AsAMOsDAADlCwAQ7AMAAOQLADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGaBAEAtgYAIbwEAQC3BgAhvQQBALYGACHqBCAA2AYAIYsFAQC3BgAhjAUBALcGACEM6gMAAOQLADDrAwAA5QsAEOwDAADkCwAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhmgQBALYGACG8BAEAtwYAIb0EAQC2BgAh6gQgANgGACGLBQEAtwYAIYwFAQC3BgAhCO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhvAQBAOIHACG9BAEA3QcAIeoEIAChCAAhiwUBAOIHACEKCgAA0gsAIAsAANMLACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIbwEAQDiBwAhvQQBAN0HACHqBCAAoQgAIYsFAQDiBwAhCgoAAOkLACALAADqCwAg7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAbwEAQAAAAG9BAEAAAAB6gQgAAAAAYsFAQAAAAEEMgAA3QsAMKwFAADeCwAwrgUAAOALACCyBQAA4QsAMAQyAADUCwAwrAUAANULADCuBQAA1wsAILIFAADgCQAwAzIAALcNACCsBQAAuA0AILIFAAAWACAAAAAAAAAAAAsyAAD2CwAwMwAA-gsAMKwFAAD3CwAwrQUAAPgLADCuBQAA-QsAIK8FAACZCgAwsAUAAJkKADCxBQAAmQoAMLIFAACZCgAwswUAAPsLADC0BQAAnAoAMAUyAACxDQAgMwAAtQ0AIKwFAACyDQAgrQUAALQNACCyBQAA1AEAIAgOAADTCgAgFAAApAoAIO0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAQIAAAA9ACAyAAD-CwAgAwAAAD0AIDIAAP4LACAzAAD9CwAgASsAALMNADACAAAAPQAgKwAA_QsAIAIAAACdCgAgKwAA_AsAIAbtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbgEAgC-CAAhzgQBAOIHACEIDgAA0QoAIBQAAKEKACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGnBAEA3QcAIbgEAgC-CAAhzgQBAOIHACEIDgAA0woAIBQAAKQKACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGnBAEAAAABuAQCAAAAAc4EAQAAAAEEMgAA9gsAMKwFAAD3CwAwrgUAAPkLACCyBQAAmQoAMAMyAACxDQAgrAUAALINACCyBQAA1AEAIAAAAAAAAAAFMgAArA0AIDMAAK8NACCsBQAArQ0AIK0FAACuDQAgsgUAANQBACADMgAArA0AIKwFAACtDQAgsgUAANQBACAAAAAFMgAApw0AIDMAAKoNACCsBQAAqA0AIK0FAACpDQAgsgUAANQBACADMgAApw0AIKwFAACoDQAgsgUAANQBACAAAAABrwUAAACfBQIBrwUAAAChBQILMgAA3AwAMDMAAOEMADCsBQAA3QwAMK0FAADeDAAwrgUAAN8MACCvBQAA4AwAMLAFAADgDAAwsQUAAOAMADCyBQAA4AwAMLMFAADiDAAwtAUAAOMMADALMgAA0AwAMDMAANUMADCsBQAA0QwAMK0FAADSDAAwrgUAANMMACCvBQAA1AwAMLAFAADUDAAwsQUAANQMADCyBQAA1AwAMLMFAADWDAAwtAUAANcMADAHMgAAywwAIDMAAM4MACCsBQAAzAwAIK0FAADNDAAgsAUAAAsAILEFAAALACCyBQAAAQAgBzIAAMYMACAzAADJDAAgrAUAAMcMACCtBQAAyAwAILAFAAANACCxBQAADQAgsgUAANAFACALMgAAvQwAMDMAAMEMADCsBQAAvgwAMK0FAAC_DAAwrgUAAMAMACCvBQAAyggAMLAFAADKCAAwsQUAAMoIADCyBQAAyggAMLMFAADCDAAwtAUAAM0IADAHMgAAuAwAIDMAALsMACCsBQAAuQwAIK0FAAC6DAAgsAUAAIUBACCxBQAAhQEAILIFAACxAgAgCzIAAK8MADAzAACzDAAwrAUAALAMADCtBQAAsQwAMK4FAACyDAAgrwUAALIKADCwBQAAsgoAMLEFAACyCgAwsgUAALIKADCzBQAAtAwAMLQFAAC1CgAwCzIAAKYMADAzAACqDAAwrAUAAKcMADCtBQAAqAwAMK4FAACpDAAgrwUAANwIADCwBQAA3AgAMLEFAADcCAAwsgUAANwIADCzBQAAqwwAMLQFAADfCAAwCzIAAJ0MADAzAAChDAAwrAUAAJ4MADCtBQAAnwwAMK4FAACgDAAgrwUAAIEIADCwBQAAgQgAMLEFAACBCAAwsgUAAIEIADCzBQAAogwAMLQFAACECAAwEQgAAOgHACDtAwEAAAAB7gMIAAAAAfADAAAA8AMC8gMAAADyAwL0AwAAAPQDA_UDAQAAAAH2AwEAAAAB9wMBAAAAAfgDAQAAAAH5AwEAAAAB-gMBAAAAAfsDAQAAAAH8A0AAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABAgAAAHcAIDIAAKUMACADAAAAdwAgMgAApQwAIDMAAKQMACABKwAApg0AMAIAAAB3ACArAACkDAAgAgAAAIUIACArAACjDAAgEO0DAQDdBwAh7gMIAN4HACHwAwAA3wfwAyLyAwAA4AfyAyL0AwAA4Qf0AyP1AwEA4gcAIfYDAQDiBwAh9wMBAOIHACH4AwEA4gcAIfkDAQDiBwAh-gMBAOIHACH7AwEA4gcAIfwDQADjBwAh_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhEQgAAOYHACDtAwEA3QcAIe4DCADeBwAh8AMAAN8H8AMi8gMAAOAH8gMi9AMAAOEH9AMj9QMBAOIHACH2AwEA4gcAIfcDAQDiBwAh-AMBAOIHACH5AwEA4gcAIfoDAQDiBwAh-wMBAOIHACH8A0AA4wcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIREIAADoBwAg7QMBAAAAAe4DCAAAAAHwAwAAAPADAvIDAAAA8gMC9AMAAAD0AwP1AwEAAAAB9gMBAAAAAfcDAQAAAAH4AwEAAAAB-QMBAAAAAfoDAQAAAAH7AwEAAAAB_ANAAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAQgQAACxCwAg7QMBAAAAAf8DQAAAAAHDBAAAAOcEAtYEAQAAAAHnBAEAAAAB6AQBAAAAAekEIAAAAAECAAAAKQAgMgAArgwAIAMAAAApACAyAACuDAAgMwAArQwAIAErAAClDQAwAgAAACkAICsAAK0MACACAAAA4AgAICsAAKwMACAH7QMBAN0HACH_A0AA5AcAIcMEAADiCOcEItYEAQDiBwAh5wQBAN0HACHoBAEA3QcAIekEIAChCAAhCBAAALALACDtAwEA3QcAIf8DQADkBwAhwwQAAOII5wQi1gQBAOIHACHnBAEA3QcAIegEAQDdBwAh6QQgAKEIACEIEAAAsQsAIO0DAQAAAAH_A0AAAAABwwQAAADnBALWBAEAAAAB5wQBAAAAAegEAQAAAAHpBCAAAAABBw4AAIwLACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGkBAIAAAABpQQBAAAAAacEAQAAAAECAAAARgAgMgAAtwwAIAMAAABGACAyAAC3DAAgMwAAtgwAIAErAACkDQAwAgAAAEYAICsAALYMACACAAAAtgoAICsAALUMACAG7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpAQCAL4IACGlBAEA4gcAIacEAQDdBwAhBw4AAIsLACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGkBAIAvggAIaUEAQDiBwAhpwQBAN0HACEHDgAAjAsAIO0DAQAAAAH_A0AAAAABgARAAAAAAaQEAgAAAAGlBAEAAAABpwQBAAAAAQQPAAD_CwAg7QMBAAAAAf8DQAAAAAGABEAAAAABAgAAALECACAyAAC4DAAgAwAAAIUBACAyAAC4DAAgMwAAvAwAIAYAAACFAQAgDwAA9AsAICsAALwMACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACEEDwAA9AsAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIRcIAAClCQAgDwAA_AgAIBEAAP0IACASAAD-CAAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZAEAQAAAAGSBAEAAAAB1wQCAAAAAdgEAQAAAAHaBAAAANoEAtsECAAAAAHdBAAAAN0EAt4EAQAAAAHfBAAAANYEAuAEAQAAAAHhBAEAAAAB4gQBAAAAAeMECAAAAAHkBAgAAAAB5QQBAAAAAQIAAAA0ACAyAADFDAAgAwAAADQAIDIAAMUMACAzAADEDAAgASsAAKMNADACAAAANAAgKwAAxAwAIAIAAADOCAAgKwAAwwwAIBPtAwEA3QcAIf4DAQDiBwAh_wNAAOQHACGABEAA5AcAIZAEAQDiBwAhkgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIRcIAACjCQAgDwAA1QgAIBEAANYIACASAADXCAAg7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAh1wQCAL4IACHYBAEA4gcAIdoEAADQCNoEItsECADeBwAh3QQAANEI3QQi3gQBAOIHACHfBAAA0gjWBCLgBAEA4gcAIeEEAQDiBwAh4gQBAOIHACHjBAgA3gcAIeQECADeBwAh5QQBAOIHACEXCAAApQkAIA8AAPwIACARAAD9CAAgEgAA_ggAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAdcEAgAAAAHYBAEAAAAB2gQAAADaBALbBAgAAAAB3QQAAADdBALeBAEAAAAB3wQAAADWBALgBAEAAAAB4QQBAAAAAeIEAQAAAAHjBAgAAAAB5AQIAAAAAeUEAQAAAAETCwAA7AoAIBUAAO0KACAaAADvCgAgGwAA8AoAIBwAAPIKACAfAADuCgAgIAAA8QoAICEAAPQKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAECAAAA0AUAIDIAAMYMACADAAAADQAgMgAAxgwAIDMAAMoMACAVAAAADQAgCwAA8wcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIAAA-AcAICEAAPsHACAiAAD6BwAgJAAA_AcAICsAAMoMACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhEwsAAPMHACAVAAD0BwAgGgAA9gcAIBsAAPcHACAcAAD5BwAgHwAA9QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhCe0DAQAAAAH_A0AAAAABgARAAAAAAZEEAQAAAAGaBAEAAAABrgQgAAAAAa8EQAAAAAGjBQEAAAABpAUBAAAAAQIAAAABACAyAADLDAAgAwAAAAsAIDIAAMsMACAzAADPDAAgCwAAAAsAICsAAM8MACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIaMFAQDiBwAhpAUBAOIHACEJ7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACGjBQEA4gcAIaQFAQDiBwAhDO0DAQAAAAH_A0AAAAABgARAAAAAAZEFAQAAAAGSBQEAAAABkwUBAAAAAZQFAQAAAAGVBQEAAAABlgVAAAAAAZcFQAAAAAGYBQEAAAABmQUBAAAAAQIAAAAJACAyAADbDAAgAwAAAAkAIDIAANsMACAzAADaDAAgASsAAKINADARAwAAwAYAIOoDAADVBwAw6wMAAAcAEOwDAADVBwAw7QMBAAAAAf8DQAC4BgAhgARAALgGACGmBAEAtgYAIZEFAQC2BgAhkgUBALYGACGTBQEAtwYAIZQFAQC3BgAhlQUBALcGACGWBUAA2QYAIZcFQADZBgAhmAUBALcGACGZBQEAtwYAIQIAAAAJACArAADaDAAgAgAAANgMACArAADZDAAgEOoDAADXDAAw6wMAANgMABDsAwAA1wwAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIaYEAQC2BgAhkQUBALYGACGSBQEAtgYAIZMFAQC3BgAhlAUBALcGACGVBQEAtwYAIZYFQADZBgAhlwVAANkGACGYBQEAtwYAIZkFAQC3BgAhEOoDAADXDAAw6wMAANgMABDsAwAA1wwAMO0DAQC2BgAh_wNAALgGACGABEAAuAYAIaYEAQC2BgAhkQUBALYGACGSBQEAtgYAIZMFAQC3BgAhlAUBALcGACGVBQEAtwYAIZYFQADZBgAhlwVAANkGACGYBQEAtwYAIZkFAQC3BgAhDO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZEFAQDdBwAhkgUBAN0HACGTBQEA4gcAIZQFAQDiBwAhlQUBAOIHACGWBUAA4wcAIZcFQADjBwAhmAUBAOIHACGZBQEA4gcAIQztAwEA3QcAIf8DQADkBwAhgARAAOQHACGRBQEA3QcAIZIFAQDdBwAhkwUBAOIHACGUBQEA4gcAIZUFAQDiBwAhlgVAAOMHACGXBUAA4wcAIZgFAQDiBwAhmQUBAOIHACEM7QMBAAAAAf8DQAAAAAGABEAAAAABkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZUFAQAAAAGWBUAAAAABlwVAAAAAAZgFAQAAAAGZBQEAAAABB-0DAQAAAAH_A0AAAAABgARAAAAAAZAFQAAAAAGaBQEAAAABmwUBAAAAAZwFAQAAAAECAAAABQAgMgAA5wwAIAMAAAAFACAyAADnDAAgMwAA5gwAIAErAAChDQAwDAMAAMAGACDqAwAA1gcAMOsDAAADABDsAwAA1gcAMO0DAQAAAAH_A0AAuAYAIYAEQAC4BgAhpgQBALYGACGQBUAAuAYAIZoFAQAAAAGbBQEAtwYAIZwFAQC3BgAhAgAAAAUAICsAAOYMACACAAAA5AwAICsAAOUMACAL6gMAAOMMADDrAwAA5AwAEOwDAADjDAAw7QMBALYGACH_A0AAuAYAIYAEQAC4BgAhpgQBALYGACGQBUAAuAYAIZoFAQC2BgAhmwUBALcGACGcBQEAtwYAIQvqAwAA4wwAMOsDAADkDAAQ7AMAAOMMADDtAwEAtgYAIf8DQAC4BgAhgARAALgGACGmBAEAtgYAIZAFQAC4BgAhmgUBALYGACGbBQEAtwYAIZwFAQC3BgAhB-0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZAFQADkBwAhmgUBAN0HACGbBQEA4gcAIZwFAQDiBwAhB-0DAQDdBwAh_wNAAOQHACGABEAA5AcAIZAFQADkBwAhmgUBAN0HACGbBQEA4gcAIZwFAQDiBwAhB-0DAQAAAAH_A0AAAAABgARAAAAAAZAFQAAAAAGaBQEAAAABmwUBAAAAAZwFAQAAAAEEMgAA3AwAMKwFAADdDAAwrgUAAN8MACCyBQAA4AwAMAQyAADQDAAwrAUAANEMADCuBQAA0wwAILIFAADUDAAwAzIAAMsMACCsBQAAzAwAILIFAAABACADMgAAxgwAIKwFAADHDAAgsgUAANAFACAEMgAAvQwAMKwFAAC-DAAwrgUAAMAMACCyBQAAyggAMAMyAAC4DAAgrAUAALkMACCyBQAAsQIAIAQyAACvDAAwrAUAALAMADCuBQAAsgwAILIFAACyCgAwBDIAAKYMADCsBQAApwwAMK4FAACpDAAgsgUAANwIADAEMgAAnQwAMKwFAACeDAAwrgUAAKAMACCyBQAAgQgAMAAABAMAAPYKACCvBAAA1wcAIKMFAADXBwAgpAUAANcHACAOBwAA9goAIAsAAPcKACAVAAD4CgAgGgAA-goAIBsAAPsKACAcAAD9CgAgHwAA-QoAICAAAPwKACAhAAD_CgAgIgAA_goAICQAAIALACCOBAAA1wcAII8EAADXBwAgmwQAANcHACACAwAA9goAIA8AAIEMACAAAAAAAAUyAACcDQAgMwAAnw0AIKwFAACdDQAgrQUAAJ4NACCyBQAAXQAgAzIAAJwNACCsBQAAnQ0AILIFAABdACAAAAAHMgAAlw0AIDMAAJoNACCsBQAAmA0AIK0FAACZDQAgsAUAAA0AILEFAAANACCyBQAA0AUAIAMyAACXDQAgrAUAAJgNACCyBQAA0AUAIAAAAAUyAACSDQAgMwAAlQ0AIKwFAACTDQAgrQUAAJQNACCyBQAA1AEAIAMyAACSDQAgrAUAAJMNACCyBQAA1AEAIAIIAAD0DAAgIQAA_woAIAADCAAA9AwAIB4AAIoNACD-AwAA1wcAIAALCAAA9AwAIA0AAI8NACAVAAD4CgAgFwAAgQwAIBgAAJENACAZAAD2DAAgGgAAiA0AIBsAAPsKACAcAAD9CgAgHwAA1wcAILcEAADXBwAgBQ4AAIsNACAVAAD4CgAgFwAAgQwAILcEAADXBwAgvAQAANcHACAECAAA9AwAIAsAAIgNACATAAD8CgAghwUAANcHACAPAwAA9goAIAgAAPQMACAPAAD4CgAgEQAA9wwAIBIAAI0NACD-AwAA1wcAIJAEAADXBwAgkgQAANcHACCmBAAA1wcAINgEAADXBwAg3gQAANcHACDgBAAA1wcAIOEEAADXBwAg4gQAANcHACDlBAAA1wcAIAYJAACPDQAgCgAAkA0AIAsAAPcKACC8BAAA1wcAIIsFAADXBwAgjAUAANcHACAAABQEAADoDAAgBQAA6QwAIAgAAOsMACARAADvDAAgEwAA7AwAIBYAAO0MACAZAADuDAAgJQAA8AwAIO0DAQAAAAHwAwAAAKEFAv8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGuBCAAAAABrwRAAAAAAbwEAQAAAAGdBSAAAAABnwUAAACfBQKhBSAAAAABAgAAANQBACAyAACSDQAgAwAAACMAIDIAAJINACAzAACWDQAgFgAAACMAIAQAAJQMACAFAACVDAAgCAAAlwwAIBEAAJsMACATAACYDAAgFgAAmQwAIBkAAJoMACAlAACcDAAgKwAAlg0AIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhFAQAAJQMACAFAACVDAAgCAAAlwwAIBEAAJsMACATAACYDAAgFgAAmQwAIBkAAJoMACAlAACcDAAg7QMBAN0HACHwAwAAkwyhBSL_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACG8BAEA4gcAIZ0FIAChCAAhnwUAAJIMnwUioQUgAKEIACEUBwAA6woAIAsAAOwKACAVAADtCgAgGgAA7woAIBsAAPAKACAcAADyCgAgIAAA8QoAICEAAPQKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAGeBAEAAAABAgAAANAFACAyAACXDQAgAwAAAA0AIDIAAJcNACAzAACbDQAgFgAAAA0AIAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACArAACbDQAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEGCAAAgQ0AIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABAgAAAF0AIDIAAJwNACADAAAAWwAgMgAAnA0AIDMAAKANACAIAAAAWwAgCAAAgA0AICsAAKANACDtAwEA3QcAIf4DAQDiBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhBggAAIANACDtAwEA3QcAIf4DAQDiBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAhB-0DAQAAAAH_A0AAAAABgARAAAAAAZAFQAAAAAGaBQEAAAABmwUBAAAAAZwFAQAAAAEM7QMBAAAAAf8DQAAAAAGABEAAAAABkQUBAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZUFAQAAAAGWBUAAAAABlwVAAAAAAZgFAQAAAAGZBQEAAAABE-0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAdcEAgAAAAHYBAEAAAAB2gQAAADaBALbBAgAAAAB3QQAAADdBALeBAEAAAAB3wQAAADWBALgBAEAAAAB4QQBAAAAAeIEAQAAAAHjBAgAAAAB5AQIAAAAAeUEAQAAAAEG7QMBAAAAAf8DQAAAAAGABEAAAAABpAQCAAAAAaUEAQAAAAGnBAEAAAABB-0DAQAAAAH_A0AAAAABwwQAAADnBALWBAEAAAAB5wQBAAAAAegEAQAAAAHpBCAAAAABEO0DAQAAAAHuAwgAAAAB8AMAAADwAwLyAwAAAPIDAvQDAAAA9AMD9QMBAAAAAfYDAQAAAAH3AwEAAAAB-AMBAAAAAfkDAQAAAAH6AwEAAAAB-wMBAAAAAfwDQAAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAEUBQAA6QwAIAYAAOoMACAIAADrDAAgEQAA7wwAIBMAAOwMACAWAADtDAAgGQAA7gwAICUAAPAMACDtAwEAAAAB8AMAAAChBQL_A0AAAAABgARAAAAAAZEEAQAAAAGaBAEAAAABrgQgAAAAAa8EQAAAAAG8BAEAAAABnQUgAAAAAZ8FAAAAnwUCoQUgAAAAAQIAAADUAQAgMgAApw0AIAMAAAAjACAyAACnDQAgMwAAqw0AIBYAAAAjACAFAACVDAAgBgAAlgwAIAgAAJcMACARAACbDAAgEwAAmAwAIBYAAJkMACAZAACaDAAgJQAAnAwAICsAAKsNACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRQFAACVDAAgBgAAlgwAIAgAAJcMACARAACbDAAgEwAAmAwAIBYAAJkMACAZAACaDAAgJQAAnAwAIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhFAQAAOgMACAGAADqDAAgCAAA6wwAIBEAAO8MACATAADsDAAgFgAA7QwAIBkAAO4MACAlAADwDAAg7QMBAAAAAfADAAAAoQUC_wNAAAAAAYAEQAAAAAGRBAEAAAABmgQBAAAAAa4EIAAAAAGvBEAAAAABvAQBAAAAAZ0FIAAAAAGfBQAAAJ8FAqEFIAAAAAECAAAA1AEAIDIAAKwNACADAAAAIwAgMgAArA0AIDMAALANACAWAAAAIwAgBAAAlAwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAWAACZDAAgGQAAmgwAICUAAJwMACArAACwDQAg7QMBAN0HACHwAwAAkwyhBSL_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACG8BAEA4gcAIZ0FIAChCAAhnwUAAJIMnwUioQUgAKEIACEUBAAAlAwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAWAACZDAAgGQAAmgwAICUAAJwMACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRQEAADoDAAgBQAA6QwAIAYAAOoMACAIAADrDAAgEQAA7wwAIBMAAOwMACAZAADuDAAgJQAA8AwAIO0DAQAAAAHwAwAAAKEFAv8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGuBCAAAAABrwRAAAAAAbwEAQAAAAGdBSAAAAABnwUAAACfBQKhBSAAAAABAgAAANQBACAyAACxDQAgBu0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG4BAIAAAABzgQBAAAAAQMAAAAjACAyAACxDQAgMwAAtg0AIBYAAAAjACAEAACUDAAgBQAAlQwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAZAACaDAAgJQAAnAwAICsAALYNACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRQEAACUDAAgBQAAlQwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAZAACaDAAgJQAAnAwAIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhCwkAAOsLACALAADqCwAg7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAbwEAQAAAAG9BAEAAAAB6gQgAAAAAYsFAQAAAAGMBQEAAAABAgAAABYAIDIAALcNACAI7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAbwEAQAAAAG9BAEAAAAB6gQgAAAAAYsFAQAAAAEWH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAEDAAAAEwAgMgAAtw0AIDMAAL0NACANAAAAEwAgCQAA0QsAIAsAANMLACArAAC9DQAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhCwkAANELACALAADTCwAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhFAcAAOsKACALAADsCgAgFQAA7QoAIBsAAPAKACAcAADyCgAgHwAA7goAICAAAPEKACAhAAD0CgAgIgAA8woAICQAAPUKACDtAwEAAAAB8AMAAACdBAL_A0AAAAABgARAAAAAAY4EAQAAAAGPBAEAAAABmgQBAAAAAZsEAQAAAAGdBAgAAAABngQBAAAAAQIAAADQBQAgMgAAvg0AIAMAAAANACAyAAC-DQAgMwAAwg0AIBYAAAANACAHAADyBwAgCwAA8wcAIBUAAPQHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIQAA-wcAICIAAPoHACAkAAD8BwAgKwAAwg0AIO0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIRQHAADyBwAgCwAA8wcAIBUAAPQHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIQAA-wcAICIAAPoHACAkAAD8BwAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAOsKACALAADsCgAgFQAA7QoAIBoAAO8KACAbAADwCgAgHAAA8goAIB8AAO4KACAgAADxCgAgIQAA9AoAICQAAPUKACDtAwEAAAAB8AMAAACdBAL_A0AAAAABgARAAAAAAY4EAQAAAAGPBAEAAAABmgQBAAAAAZsEAQAAAAGdBAgAAAABngQBAAAAAQIAAADQBQAgMgAAww0AIAMAAAANACAyAADDDQAgMwAAxw0AIBYAAAANACAHAADyBwAgCwAA8wcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIAAA-AcAICEAAPsHACAkAAD8BwAgKwAAxw0AIO0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIRQHAADyBwAgCwAA8wcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIAAA-AcAICEAAPsHACAkAAD8BwAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhGAMAAPsIACAIAAClCQAgDwAA_AgAIBIAAP4IACDtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABkAQBAAAAAZIEAQAAAAGmBAEAAAAB1wQCAAAAAdgEAQAAAAHaBAAAANoEAtsECAAAAAHdBAAAAN0EAt4EAQAAAAHfBAAAANYEAuAEAQAAAAHhBAEAAAAB4gQBAAAAAeMECAAAAAHkBAgAAAAB5QQBAAAAAQIAAAA0ACAyAADIDQAgAwAAACsAIDIAAMgNACAzAADMDQAgGgAAACsAIAMAANQIACAIAACjCQAgDwAA1QgAIBIAANcIACArAADMDQAg7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIRgDAADUCAAgCAAAowkAIA8AANUIACASAADXCAAg7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIRQHAADrCgAgFQAA7QoAIBoAAO8KACAbAADwCgAgHAAA8goAIB8AAO4KACAgAADxCgAgIQAA9AoAICIAAPMKACAkAAD1CgAg7QMBAAAAAfADAAAAnQQC_wNAAAAAAYAEQAAAAAGOBAEAAAABjwQBAAAAAZoEAQAAAAGbBAEAAAABnQQIAAAAAZ4EAQAAAAECAAAA0AUAIDIAAM0NACADAAAADQAgMgAAzQ0AIDMAANENACAWAAAADQAgBwAA8gcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIAAA-AcAICEAAPsHACAiAAD6BwAgJAAA_AcAICsAANENACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEUBwAA8gcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIAAA-AcAICEAAPsHACAiAAD6BwAgJAAA_AcAIO0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIR8IAACdCwAgDQAA4woAIBUAAOYKACAXAADnCgAgGQAA5QoAIBoAAOgKACAbAADpCgAgHAAA6goAIB-AAAAAAe0DAQAAAAHwAwAAAMIEAv4DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGaBAEAAAABtwQBAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAb0EAQAAAAG-BAEAAAABvwQAAOEKACDABAIAAAABwwQAAADDBALEBAAA4goAIMYEAAAAxgQCxwQIAAAAAcgEIAAAAAHJBCAAAAABygQBAAAAAQIAAAARACAyAADSDQAgAwAAAA8AIDIAANINACAzAADWDQAgIQAAAA8AIAgAAJwLACANAADsCQAgFQAA7wkAIBcAAPAJACAZAADuCQAgGgAA8QkAIBsAAPIJACAcAADzCQAgH4AAAAABKwAA1g0AIO0DAQDdBwAh8AMAAOcJwgQi_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAN0HACGaBAEA3QcAIbcEAQDiBwAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvQQBAN0HACG-BAEA3QcAIb8EAADmCQAgwAQCAL4IACHDBAAA6AnDBCLEBAAA6QkAIMYEAADqCcYEIscECADeBwAhyAQgAKEIACHJBCAAoQgAIcoEAQDdBwAhHwgAAJwLACANAADsCQAgFQAA7wkAIBcAAPAJACAZAADuCQAgGgAA8QkAIBsAAPIJACAcAADzCQAgH4AAAAAB7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhygQBAN0HACEfCAAAnQsAIA0AAOMKACAVAADmCgAgFwAA5woAIBgAAOQKACAaAADoCgAgGwAA6QoAIBwAAOoKACAfgAAAAAHtAwEAAAAB8AMAAADCBAL-AwEAAAAB_wNAAAAAAYAEQAAAAAGOBAEAAAABmgQBAAAAAbcEAQAAAAG5BAgAAAABugQIAAAAAbsECAAAAAG9BAEAAAABvgQBAAAAAb8EAADhCgAgwAQCAAAAAcMEAAAAwwQCxAQAAOIKACDGBAAAAMYEAscECAAAAAHIBCAAAAAByQQgAAAAAcoEAQAAAAECAAAAEQAgMgAA1w0AIAMAAAAPACAyAADXDQAgMwAA2w0AICEAAAAPACAIAACcCwAgDQAA7AkAIBUAAO8JACAXAADwCQAgGAAA7QkAIBoAAPEJACAbAADyCQAgHAAA8wkAIB-AAAAAASsAANsNACDtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIR8IAACcCwAgDQAA7AkAIBUAAO8JACAXAADwCQAgGAAA7QkAIBoAAPEJACAbAADyCQAgHAAA8wkAIB-AAAAAAe0DAQDdBwAh8AMAAOcJwgQi_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAN0HACGaBAEA3QcAIbcEAQDiBwAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvQQBAN0HACG-BAEA3QcAIb8EAADmCQAgwAQCAL4IACHDBAAA6AnDBCLEBAAA6QkAIMYEAADqCcYEIscECADeBwAhyAQgAKEIACHJBCAAoQgAIcoEAQDdBwAhFAQAAOgMACAFAADpDAAgBgAA6gwAIBEAAO8MACATAADsDAAgFgAA7QwAIBkAAO4MACAlAADwDAAg7QMBAAAAAfADAAAAoQUC_wNAAAAAAYAEQAAAAAGRBAEAAAABmgQBAAAAAa4EIAAAAAGvBEAAAAABvAQBAAAAAZ0FIAAAAAGfBQAAAJ8FAqEFIAAAAAECAAAA1AEAIDIAANwNACALCQAA6wsAIAoAAOkLACDtAwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAABvAQBAAAAAb0EAQAAAAHqBCAAAAABiwUBAAAAAYwFAQAAAAECAAAAFgAgMgAA3g0AIArtAwEAAAAB8AMAAADWBAL-AwEAAAABpwQBAAAAAbgEAgAAAAHQBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAAB1gQBAAAAAR8IAACdCwAgDQAA4woAIBUAAOYKACAYAADkCgAgGQAA5QoAIBoAAOgKACAbAADpCgAgHAAA6goAIB-AAAAAAe0DAQAAAAHwAwAAAMIEAv4DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGaBAEAAAABtwQBAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAb0EAQAAAAG-BAEAAAABvwQAAOEKACDABAIAAAABwwQAAADDBALEBAAA4goAIMYEAAAAxgQCxwQIAAAAAcgEIAAAAAHJBCAAAAABygQBAAAAAQIAAAARACAyAADhDQAgAwAAAA8AIDIAAOENACAzAADlDQAgIQAAAA8AIAgAAJwLACANAADsCQAgFQAA7wkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBsAAPIJACAcAADzCQAgH4AAAAABKwAA5Q0AIO0DAQDdBwAh8AMAAOcJwgQi_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAN0HACGaBAEA3QcAIbcEAQDiBwAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvQQBAN0HACG-BAEA3QcAIb8EAADmCQAgwAQCAL4IACHDBAAA6AnDBCLEBAAA6QkAIMYEAADqCcYEIscECADeBwAhyAQgAKEIACHJBCAAoQgAIcoEAQDdBwAhHwgAAJwLACANAADsCQAgFQAA7wkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBsAAPIJACAcAADzCQAgH4AAAAAB7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhygQBAN0HACEG7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbgEAgAAAAGNBQEAAAABCu0DAQAAAAH_A0AAAAABgARAAAAAAbYEAQAAAAG3BAEAAAABuAQCAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAbwEAQAAAAEUBAAA6AwAIAUAAOkMACAGAADqDAAgCAAA6wwAIBEAAO8MACATAADsDAAgFgAA7QwAICUAAPAMACDtAwEAAAAB8AMAAAChBQL_A0AAAAABgARAAAAAAZEEAQAAAAGaBAEAAAABrgQgAAAAAa8EQAAAAAG8BAEAAAABnQUgAAAAAZ8FAAAAnwUCoQUgAAAAAQIAAADUAQAgMgAA6A0AIAMAAAAjACAyAADoDQAgMwAA7A0AIBYAAAAjACAEAACUDAAgBQAAlQwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAWAACZDAAgJQAAnAwAICsAAOwNACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRQEAACUDAAgBQAAlQwAIAYAAJYMACAIAACXDAAgEQAAmwwAIBMAAJgMACAWAACZDAAgJQAAnAwAIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhBu0DAQAAAAH_A0AAAAABgARAAAAAAaQEAgAAAAGlBAEAAAABpgQBAAAAAQrtAwEAAAAB8AMAAADWBAL-AwEAAAABuAQCAAAAAc4EAQAAAAHQBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAAB1gQBAAAAAQ0OAACWCwAgFQAA3goAIO0DAQAAAAH_A0AAAAABgARAAAAAAacEAQAAAAG2BAEAAAABtwQBAAAAAbgEAgAAAAG5BAgAAAABugQIAAAAAbsECAAAAAG8BAEAAAABAgAAAB0AIDIAAO8NACAFAwAAgAwAIO0DAQAAAAH_A0AAAAABgARAAAAAAaYEAQAAAAECAAAAsQIAIDIAAPENACADAAAAGwAgMgAA7w0AIDMAAPUNACAPAAAAGwAgDgAAlQsAIBUAAMcKACArAAD1DQAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpwQBAN0HACG2BAEA3QcAIbcEAQDiBwAhuAQCAL4IACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG8BAEA4gcAIQ0OAACVCwAgFQAAxwoAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIacEAQDdBwAhtgQBAN0HACG3BAEA4gcAIbgEAgC-CAAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvAQBAOIHACEDAAAAhQEAIDIAAPENACAzAAD4DQAgBwAAAIUBACADAAD1CwAgKwAA-A0AIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIaYEAQDdBwAhBQMAAPULACDtAwEA3QcAIf8DQADkBwAhgARAAOQHACGmBAEA3QcAIQbtAwEAAAAB_wNAAAAAAYAEQAAAAAG4BAIAAAABzgQBAAAAAY0FAQAAAAEOCAAAzQsAIBMAALYJACDtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAAB4wQIAAAAAeoEIAAAAAGEBQEAAAABhgUAAACGBQKHBQgAAAABiAUIAAAAAYkFQAAAAAGKBUAAAAABAgAAAGYAIDIAAPoNACADAAAALQAgMgAA-g0AIDMAAP4NACAQAAAALQAgCAAAzAsAIBMAAJoJACArAAD-DQAg7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACHjBAgA3gcAIeoEIAChCAAhhAUBAN0HACGGBQAAlwmGBSKHBQgA8QgAIYgFCADeBwAhiQVAAOQHACGKBUAA5AcAIQ4IAADMCwAgEwAAmgkAIO0DAQDdBwAh_gMBAN0HACH_A0AA5AcAIYAEQADkBwAh4wQIAN4HACHqBCAAoQgAIYQFAQDdBwAhhgUAAJcJhgUihwUIAPEIACGIBQgA3gcAIYkFQADkBwAhigVAAOQHACEC7QMBAAAAAeUEAQAAAAEUBwAA6woAIAsAAOwKACAVAADtCgAgGgAA7woAIBwAAPIKACAfAADuCgAgIAAA8QoAICEAAPQKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAGeBAEAAAABAgAAANAFACAyAACADgAgAwAAAA0AIDIAAIAOACAzAACEDgAgFgAAAA0AIAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAcAAD5BwAgHwAA9QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACArAACEDgAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAcAAD5BwAgHwAA9QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEK7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAbYEAQAAAAG4BAIAAAABzgQBAAAAAc8EAQAAAAHQBAgAAAAB0QQBAAAAARQHAADrCgAgCwAA7AoAIBUAAO0KACAaAADvCgAgGwAA8AoAIB8AAO4KACAgAADxCgAgIQAA9AoAICIAAPMKACAkAAD1CgAg7QMBAAAAAfADAAAAnQQC_wNAAAAAAYAEQAAAAAGOBAEAAAABjwQBAAAAAZoEAQAAAAGbBAEAAAABnQQIAAAAAZ4EAQAAAAECAAAA0AUAIDIAAIYOACADAAAADQAgMgAAhg4AIDMAAIoOACAWAAAADQAgBwAA8gcAIAsAAPMHACAVAAD0BwAgGgAA9gcAIBsAAPcHACAfAAD1BwAgIAAA-AcAICEAAPsHACAiAAD6BwAgJAAA_AcAICsAAIoOACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEUBwAA8gcAIAsAAPMHACAVAAD0BwAgGgAA9gcAIBsAAPcHACAfAAD1BwAgIAAA-AcAICEAAPsHACAiAAD6BwAgJAAA_AcAIO0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIR7tAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAb0EAQAAAAHqBCAAAAAB6wQBAAAAAewEIAAAAAHtBCAAAAAB7gQgAAAAAe8EIAAAAAHwBAAAwggAIPEEAQAAAAHyBAEAAAAB8wQBAAAAAfQEAQAAAAH1BAEAAAAB9gQBAAAAAfcEAQAAAAH4BAAAwwgAIPkEAQAAAAH6BAEAAAAB-wQBAAAAAfwEAQAAAAH9BAEAAAAB_gQAAMQIACD_BAEAAAABgAUBAAAAAYEFAgAAAAEDAAAAEwAgMgAA3g0AIDMAAI4OACANAAAAEwAgCQAA0QsAIAoAANILACArAACODgAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhCwkAANELACAKAADSCwAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhmgQBAN0HACG8BAEA4gcAIb0EAQDdBwAh6gQgAKEIACGLBQEA4gcAIYwFAQDiBwAhFh-AAAAAAe0DAQAAAAHwAwAAAMIEAv8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABGAMAAPsIACAIAAClCQAgEQAA_QgAIBIAAP4IACDtAwEAAAAB_gMBAAAAAf8DQAAAAAGABEAAAAABkAQBAAAAAZIEAQAAAAGmBAEAAAAB1wQCAAAAAdgEAQAAAAHaBAAAANoEAtsECAAAAAHdBAAAAN0EAt4EAQAAAAHfBAAAANYEAuAEAQAAAAHhBAEAAAAB4gQBAAAAAeMECAAAAAHkBAgAAAAB5QQBAAAAAQIAAAA0ACAyAACQDgAgAwAAACsAIDIAAJAOACAzAACUDgAgGgAAACsAIAMAANQIACAIAACjCQAgEQAA1ggAIBIAANcIACArAACUDgAg7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIRgDAADUCAAgCAAAowkAIBEAANYIACASAADXCAAg7QMBAN0HACH-AwEA4gcAIf8DQADkBwAhgARAAOQHACGQBAEA4gcAIZIEAQDiBwAhpgQBAOIHACHXBAIAvggAIdgEAQDiBwAh2gQAANAI2gQi2wQIAN4HACHdBAAA0QjdBCLeBAEA4gcAId8EAADSCNYEIuAEAQDiBwAh4QQBAOIHACHiBAEA4gcAIeMECADeBwAh5AQIAN4HACHlBAEA4gcAIQrtAwEAAAAB8AMAAADWBAKnBAEAAAABuAQCAAAAAc4EAQAAAAHQBAgAAAAB0gQIAAAAAdMECAAAAAHUBAgAAAAB1gQBAAAAAQTtAwEAAAAB_wNAAAAAAYAEQAAAAAGPBQEAAAABBO0DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAEfCAAAnQsAIA0AAOMKACAVAADmCgAgFwAA5woAIBgAAOQKACAZAADlCgAgGwAA6QoAIBwAAOoKACAfgAAAAAHtAwEAAAAB8AMAAADCBAL-AwEAAAAB_wNAAAAAAYAEQAAAAAGOBAEAAAABmgQBAAAAAbcEAQAAAAG5BAgAAAABugQIAAAAAbsECAAAAAG9BAEAAAABvgQBAAAAAb8EAADhCgAgwAQCAAAAAcMEAAAAwwQCxAQAAOIKACDGBAAAAMYEAscECAAAAAHIBCAAAAAByQQgAAAAAcoEAQAAAAECAAAAEQAgMgAAmA4AIAMAAAAPACAyAACYDgAgMwAAnA4AICEAAAAPACAIAACcCwAgDQAA7AkAIBUAAO8JACAXAADwCQAgGAAA7QkAIBkAAO4JACAbAADyCQAgHAAA8wkAIB-AAAAAASsAAJwOACDtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIR8IAACcCwAgDQAA7AkAIBUAAO8JACAXAADwCQAgGAAA7QkAIBkAAO4JACAbAADyCQAgHAAA8wkAIB-AAAAAAe0DAQDdBwAh8AMAAOcJwgQi_gMBAN0HACH_A0AA5AcAIYAEQADkBwAhjgQBAN0HACGaBAEA3QcAIbcEAQDiBwAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvQQBAN0HACG-BAEA3QcAIb8EAADmCQAgwAQCAL4IACHDBAAA6AnDBCLEBAAA6QkAIMYEAADqCcYEIscECADeBwAhyAQgAKEIACHJBCAAoQgAIcoEAQDdBwAhAu0DAQAAAAGnBAEAAAABFAcAAOsKACALAADsCgAgFQAA7QoAIBoAAO8KACAbAADwCgAgHAAA8goAIB8AAO4KACAhAAD0CgAgIgAA8woAICQAAPUKACDtAwEAAAAB8AMAAACdBAL_A0AAAAABgARAAAAAAY4EAQAAAAGPBAEAAAABmgQBAAAAAZsEAQAAAAGdBAgAAAABngQBAAAAAQIAAADQBQAgMgAAng4AIAMAAAANACAyAACeDgAgMwAAog4AIBYAAAANACAHAADyBwAgCwAA8wcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIQAA-wcAICIAAPoHACAkAAD8BwAgKwAAog4AIO0DAQDdBwAh8AMAAPEHnQQi_wNAAOQHACGABEAA5AcAIY4EAQDiBwAhjwQBAOIHACGaBAEA3QcAIZsEAQDiBwAhnQQIAN4HACGeBAEA3QcAIRQHAADyBwAgCwAA8wcAIBUAAPQHACAaAAD2BwAgGwAA9wcAIBwAAPkHACAfAAD1BwAgIQAA-wcAICIAAPoHACAkAAD8BwAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhE-0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAaYEAQAAAAHXBAIAAAAB2AQBAAAAAdoEAAAA2gQC2wQIAAAAAd0EAAAA3QQC3gQBAAAAAd8EAAAA1gQC4AQBAAAAAeEEAQAAAAHiBAEAAAAB4wQIAAAAAeQECAAAAAEL7QMBAAAAAf8DQAAAAAGABEAAAAAB4wQIAAAAAeoEIAAAAAGEBQEAAAABhgUAAACGBQKHBQgAAAABiAUIAAAAAYkFQAAAAAGKBUAAAAABHwgAAJ0LACANAADjCgAgFQAA5goAIBcAAOcKACAYAADkCgAgGQAA5QoAIBoAAOgKACAcAADqCgAgH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABAgAAABEAIDIAAKUOACADAAAADwAgMgAApQ4AIDMAAKkOACAhAAAADwAgCAAAnAsAIA0AAOwJACAVAADvCQAgFwAA8AkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBwAAPMJACAfgAAAAAErAACpDgAg7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhygQBAN0HACEfCAAAnAsAIA0AAOwJACAVAADvCQAgFwAA8AkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBwAAPMJACAfgAAAAAHtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIQrtAwEAAAAB_wNAAAAAAYAEQAAAAAGnBAEAAAABtgQBAAAAAbgEAgAAAAHOBAEAAAABzwQBAAAAAdAECAAAAAHRBAEAAAABDggAAM0LACALAAC1CQAg7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAeMECAAAAAHqBCAAAAABhAUBAAAAAYYFAAAAhgUChwUIAAAAAYgFCAAAAAGJBUAAAAABigVAAAAAAQIAAABmACAyAACrDgAgFAQAAOgMACAFAADpDAAgBgAA6gwAIAgAAOsMACARAADvDAAgFgAA7QwAIBkAAO4MACAlAADwDAAg7QMBAAAAAfADAAAAoQUC_wNAAAAAAYAEQAAAAAGRBAEAAAABmgQBAAAAAa4EIAAAAAGvBEAAAAABvAQBAAAAAZ0FIAAAAAGfBQAAAJ8FAqEFIAAAAAECAAAA1AEAIDIAAK0OACAUBwAA6woAIAsAAOwKACAaAADvCgAgGwAA8AoAIBwAAPIKACAfAADuCgAgIAAA8QoAICEAAPQKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAGeBAEAAAABAgAAANAFACAyAACvDgAgDQ4AAJYLACAXAADfCgAg7QMBAAAAAf8DQAAAAAGABEAAAAABpwQBAAAAAbYEAQAAAAG3BAEAAAABuAQCAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAbwEAQAAAAECAAAAHQAgMgAAsQ4AIB8IAACdCwAgDQAA4woAIBcAAOcKACAYAADkCgAgGQAA5QoAIBoAAOgKACAbAADpCgAgHAAA6goAIB-AAAAAAe0DAQAAAAHwAwAAAMIEAv4DAQAAAAH_A0AAAAABgARAAAAAAY4EAQAAAAGaBAEAAAABtwQBAAAAAbkECAAAAAG6BAgAAAABuwQIAAAAAb0EAQAAAAG-BAEAAAABvwQAAOEKACDABAIAAAABwwQAAADDBALEBAAA4goAIMYEAAAAxgQCxwQIAAAAAcgEIAAAAAHJBCAAAAABygQBAAAAAQIAAAARACAyAACzDgAgAwAAAA0AIDIAAK8OACAzAAC3DgAgFgAAAA0AIAcAAPIHACALAADzBwAgGgAA9gcAIBsAAPcHACAcAAD5BwAgHwAA9QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACArAAC3DgAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAPIHACALAADzBwAgGgAA9gcAIBsAAPcHACAcAAD5BwAgHwAA9QcAICAAAPgHACAhAAD7BwAgIgAA-gcAICQAAPwHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEDAAAAGwAgMgAAsQ4AIDMAALoOACAPAAAAGwAgDgAAlQsAIBcAAMgKACArAAC6DgAg7QMBAN0HACH_A0AA5AcAIYAEQADkBwAhpwQBAN0HACG2BAEA3QcAIbcEAQDiBwAhuAQCAL4IACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG8BAEA4gcAIQ0OAACVCwAgFwAAyAoAIO0DAQDdBwAh_wNAAOQHACGABEAA5AcAIacEAQDdBwAhtgQBAN0HACG3BAEA4gcAIbgEAgC-CAAhuQQIAN4HACG6BAgA3gcAIbsECADeBwAhvAQBAOIHACEDAAAADwAgMgAAsw4AIDMAAL0OACAhAAAADwAgCAAAnAsAIA0AAOwJACAXAADwCQAgGAAA7QkAIBkAAO4JACAaAADxCQAgGwAA8gkAIBwAAPMJACAfgAAAAAErAAC9DgAg7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhygQBAN0HACEfCAAAnAsAIA0AAOwJACAXAADwCQAgGAAA7QkAIBkAAO4JACAaAADxCQAgGwAA8gkAIBwAAPMJACAfgAAAAAHtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIQrtAwEAAAAB8AMAAADWBAL-AwEAAAABpwQBAAAAAbgEAgAAAAHOBAEAAAAB0AQIAAAAAdIECAAAAAHTBAgAAAAB1AQIAAAAARQEAADoDAAgBQAA6QwAIAYAAOoMACAIAADrDAAgEwAA7AwAIBYAAO0MACAZAADuDAAgJQAA8AwAIO0DAQAAAAHwAwAAAKEFAv8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGuBCAAAAABrwRAAAAAAbwEAQAAAAGdBSAAAAABnwUAAACfBQKhBSAAAAABAgAAANQBACAyAAC_DgAgAwAAACMAIDIAAL8OACAzAADDDgAgFgAAACMAIAQAAJQMACAFAACVDAAgBgAAlgwAIAgAAJcMACATAACYDAAgFgAAmQwAIBkAAJoMACAlAACcDAAgKwAAww4AIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhFAQAAJQMACAFAACVDAAgBgAAlgwAIAgAAJcMACATAACYDAAgFgAAmQwAIBkAAJoMACAlAACcDAAg7QMBAN0HACHwAwAAkwyhBSL_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACG8BAEA4gcAIZ0FIAChCAAhnwUAAJIMnwUioQUgAKEIACEH7QMBAAAAAf8DQAAAAAGmBAEAAAABwwQAAADnBALnBAEAAAAB6AQBAAAAAekEIAAAAAEDAAAALQAgMgAAqw4AIDMAAMcOACAQAAAALQAgCAAAzAsAIAsAAJkJACArAADHDgAg7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACHjBAgA3gcAIeoEIAChCAAhhAUBAN0HACGGBQAAlwmGBSKHBQgA8QgAIYgFCADeBwAhiQVAAOQHACGKBUAA5AcAIQ4IAADMCwAgCwAAmQkAIO0DAQDdBwAh_gMBAN0HACH_A0AA5AcAIYAEQADkBwAh4wQIAN4HACHqBCAAoQgAIYQFAQDdBwAhhgUAAJcJhgUihwUIAPEIACGIBQgA3gcAIYkFQADkBwAhigVAAOQHACEDAAAAIwAgMgAArQ4AIDMAAMoOACAWAAAAIwAgBAAAlAwAIAUAAJUMACAGAACWDAAgCAAAlwwAIBEAAJsMACAWAACZDAAgGQAAmgwAICUAAJwMACArAADKDgAg7QMBAN0HACHwAwAAkwyhBSL_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACG8BAEA4gcAIZ0FIAChCAAhnwUAAJIMnwUioQUgAKEIACEUBAAAlAwAIAUAAJUMACAGAACWDAAgCAAAlwwAIBEAAJsMACAWAACZDAAgGQAAmgwAICUAAJwMACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRPtAwEAAAAB_wNAAAAAAYAEQAAAAAGQBAEAAAABkgQBAAAAAaYEAQAAAAHXBAIAAAAB2AQBAAAAAdoEAAAA2gQC2wQIAAAAAd0EAAAA3QQC3gQBAAAAAd8EAAAA1gQC4AQBAAAAAeEEAQAAAAHiBAEAAAAB4wQIAAAAAeQECAAAAAHlBAEAAAABHwgAAJ0LACANAADjCgAgFQAA5goAIBcAAOcKACAYAADkCgAgGQAA5QoAIBoAAOgKACAbAADpCgAgH4AAAAAB7QMBAAAAAfADAAAAwgQC_gMBAAAAAf8DQAAAAAGABEAAAAABjgQBAAAAAZoEAQAAAAG3BAEAAAABuQQIAAAAAboECAAAAAG7BAgAAAABvQQBAAAAAb4EAQAAAAG_BAAA4QoAIMAEAgAAAAHDBAAAAMMEAsQEAADiCgAgxgQAAADGBALHBAgAAAAByAQgAAAAAckEIAAAAAHKBAEAAAABAgAAABEAIDIAAMwOACADAAAADwAgMgAAzA4AIDMAANAOACAhAAAADwAgCAAAnAsAIA0AAOwJACAVAADvCQAgFwAA8AkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBsAAPIJACAfgAAAAAErAADQDgAg7QMBAN0HACHwAwAA5wnCBCL-AwEA3QcAIf8DQADkBwAhgARAAOQHACGOBAEA3QcAIZoEAQDdBwAhtwQBAOIHACG5BAgA3gcAIboECADeBwAhuwQIAN4HACG9BAEA3QcAIb4EAQDdBwAhvwQAAOYJACDABAIAvggAIcMEAADoCcMEIsQEAADpCQAgxgQAAOoJxgQixwQIAN4HACHIBCAAoQgAIckEIAChCAAhygQBAN0HACEfCAAAnAsAIA0AAOwJACAVAADvCQAgFwAA8AkAIBgAAO0JACAZAADuCQAgGgAA8QkAIBsAAPIJACAfgAAAAAHtAwEA3QcAIfADAADnCcIEIv4DAQDdBwAh_wNAAOQHACGABEAA5AcAIY4EAQDdBwAhmgQBAN0HACG3BAEA4gcAIbkECADeBwAhugQIAN4HACG7BAgA3gcAIb0EAQDdBwAhvgQBAN0HACG_BAAA5gkAIMAEAgC-CAAhwwQAAOgJwwQixAQAAOkJACDGBAAA6gnGBCLHBAgA3gcAIcgEIAChCAAhyQQgAKEIACHKBAEA3QcAIR7tAwEAAAAB_wNAAAAAAYAEQAAAAAGOBAEAAAABpwQBAAAAAb0EAQAAAAHqBCAAAAAB6wQBAAAAAewEIAAAAAHtBCAAAAAB7gQgAAAAAe8EIAAAAAHwBAAAwggAIPEEAQAAAAHyBAEAAAAB8wQBAAAAAfQEAQAAAAH1BAEAAAAB9gQBAAAAAfcEAQAAAAH4BAAAwwgAIPkEAQAAAAH6BAEAAAAB-wQBAAAAAfwEAQAAAAH9BAEAAAAB_gQAAMQIACD_BAEAAAABgAUBAAAAAYEFAgAAAAEUBwAA6woAIAsAAOwKACAVAADtCgAgGgAA7woAIBsAAPAKACAcAADyCgAgHwAA7goAICAAAPEKACAiAADzCgAgJAAA9QoAIO0DAQAAAAHwAwAAAJ0EAv8DQAAAAAGABEAAAAABjgQBAAAAAY8EAQAAAAGaBAEAAAABmwQBAAAAAZ0ECAAAAAGeBAEAAAABAgAAANAFACAyAADSDgAgAwAAAA0AIDIAANIOACAzAADWDgAgFgAAAA0AIAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIgAA-gcAICQAAPwHACArAADWDgAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIgAA-gcAICQAAPwHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEI7QMBAAAAAf4DAQAAAAH_A0AAAAABgARAAAAAAZoEAQAAAAHQBAgAAAABggUBAAAAAYMFQAAAAAEF7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAeoEIAAAAAEHCAAAwwsAIO0DAQAAAAH-AwEAAAAB_wNAAAAAAYAEQAAAAAGaBAEAAAAB6gQgAAAAAQIAAABtACAyAADZDgAgAwAAAGsAIDIAANkOACAzAADdDgAgCQAAAGsAIAgAAMILACArAADdDgAg7QMBAN0HACH-AwEA3QcAIf8DQADkBwAhgARAAOQHACGaBAEA3QcAIeoEIAChCAAhBwgAAMILACDtAwEA3QcAIf4DAQDdBwAh_wNAAOQHACGABEAA5AcAIZoEAQDdBwAh6gQgAKEIACEI7QMBAAAAAf8DQAAAAAGABEAAAAABmgQBAAAAAcoEAQAAAAHQBAgAAAABggUBAAAAAYMFQAAAAAEQ7QMBAAAAAe4DCAAAAAHwAwAAAPADAvIDAAAA8gMC9AMAAAD0AwP1AwEAAAAB9gMBAAAAAfcDAQAAAAH4AwEAAAAB-QMBAAAAAfoDAQAAAAH7AwEAAAAB_ANAAAAAAf0DAQAAAAH_A0AAAAABgARAAAAAAQMAAAAjACAyAADcDQAgMwAA4g4AIBYAAAAjACAEAACUDAAgBQAAlQwAIAYAAJYMACARAACbDAAgEwAAmAwAIBYAAJkMACAZAACaDAAgJQAAnAwAICsAAOIOACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIRQEAACUDAAgBQAAlQwAIAYAAJYMACARAACbDAAgEwAAmAwAIBYAAJkMACAZAACaDAAgJQAAnAwAIO0DAQDdBwAh8AMAAJMMoQUi_wNAAOQHACGABEAA5AcAIZEEAQDdBwAhmgQBAN0HACGuBCAAoQgAIa8EQADjBwAhvAQBAOIHACGdBSAAoQgAIZ8FAACSDJ8FIqEFIAChCAAhFAcAAOsKACALAADsCgAgFQAA7QoAIBoAAO8KACAbAADwCgAgHAAA8goAIB8AAO4KACAgAADxCgAgIQAA9AoAICIAAPMKACDtAwEAAAAB8AMAAACdBAL_A0AAAAABgARAAAAAAY4EAQAAAAGPBAEAAAABmgQBAAAAAZsEAQAAAAGdBAgAAAABngQBAAAAAQIAAADQBQAgMgAA4w4AIBQEAADoDAAgBQAA6QwAIAYAAOoMACAIAADrDAAgEQAA7wwAIBMAAOwMACAWAADtDAAgGQAA7gwAIO0DAQAAAAHwAwAAAKEFAv8DQAAAAAGABEAAAAABkQQBAAAAAZoEAQAAAAGuBCAAAAABrwRAAAAAAbwEAQAAAAGdBSAAAAABnwUAAACfBQKhBSAAAAABAgAAANQBACAyAADlDgAgAwAAAA0AIDIAAOMOACAzAADpDgAgFgAAAA0AIAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIQAA-wcAICIAAPoHACArAADpDgAg7QMBAN0HACHwAwAA8QedBCL_A0AA5AcAIYAEQADkBwAhjgQBAOIHACGPBAEA4gcAIZoEAQDdBwAhmwQBAOIHACGdBAgA3gcAIZ4EAQDdBwAhFAcAAPIHACALAADzBwAgFQAA9AcAIBoAAPYHACAbAAD3BwAgHAAA-QcAIB8AAPUHACAgAAD4BwAgIQAA-wcAICIAAPoHACDtAwEA3QcAIfADAADxB50EIv8DQADkBwAhgARAAOQHACGOBAEA4gcAIY8EAQDiBwAhmgQBAN0HACGbBAEA4gcAIZ0ECADeBwAhngQBAN0HACEDAAAAIwAgMgAA5Q4AIDMAAOwOACAWAAAAIwAgBAAAlAwAIAUAAJUMACAGAACWDAAgCAAAlwwAIBEAAJsMACATAACYDAAgFgAAmQwAIBkAAJoMACArAADsDgAg7QMBAN0HACHwAwAAkwyhBSL_A0AA5AcAIYAEQADkBwAhkQQBAN0HACGaBAEA3QcAIa4EIAChCAAhrwRAAOMHACG8BAEA4gcAIZ0FIAChCAAhnwUAAJIMnwUioQUgAKEIACEUBAAAlAwAIAUAAJUMACAGAACWDAAgCAAAlwwAIBEAAJsMACATAACYDAAgFgAAmQwAIBkAAJoMACDtAwEA3QcAIfADAACTDKEFIv8DQADkBwAhgARAAOQHACGRBAEA3QcAIZoEAQDdBwAhrgQgAKEIACGvBEAA4wcAIbwEAQDiBwAhnQUgAKEIACGfBQAAkgyfBSKhBSAAoQgAIQEDAAIKBAYDBQoEBgwBCA4FDAAhEYgBDBOEAQsWhgESGYcBFSWJAR8BAwACAQMAAgwHAAILEgYMACAVWgoaZw0baBYcahcfXhkgaQshdB0ibhwkeB8KCAAFDAAYDQAHFUgKF0kRGB4JGUcVGkoOG04WHFIXBAkUBwoXBwsYBgwACAIKGQALGgAEDAAUDgAGFSIKFz4RBAgABQ4ABhAACxQ6CQYDJAIIJQUMABAPJgoRKgwSLg0CAwACECwLBAgABQsyDgwADxM1CwIOAAYSAA0CCzYAEzcAAg84ABE5AAMOAAYUQQkWABIDAwACDAATDz8RAQ9AAAIVQgAXQwACAwACDgAGAggABQ4ABgIIAAUOAAYHFVUAF1YAGFMAGVQAGlcAG1gAHFkAAwhfBQwAGx5jGgEdABkBHmQAAwgABQwAHiFyHQIIAAUNABwBIXMAAggABSN5AgoLegAVewAafQAbfgAcgAEAH3wAIH8AIYIBACKBAQAkgwEABgSKAQAFiwEAEY4BABOMAQAZjQEAJY8BAAABAwACAQMAAgMMACY4ACc5ACgAAAADDAAmOAAnOQAoAQiwAQUBCLYBBQMMAC04AC45AC8AAAADDAAtOAAuOQAvAR0AGQEdABkDDAA0OAA1OQA2AAAAAwwANDgANTkANgAAAwwAOzgAPDkAPQAAAAMMADs4ADw5AD0BAwACAQMAAgMMAEI4AEM5AEQAAAADDABCOABDOQBEAQMAAgEDAAIDDABJOABKOQBLAAAAAwwASTgASjkASwAAAAMMAFE4AFI5AFMAAAADDABROABSOQBTAQMAAgEDAAIDDABYOABZOQBaAAAAAwwAWDgAWTkAWgMOAAYU0wIJFgASAw4ABhTZAgkWABIFDABfOABiOQBjugEAYLsBAGEAAAAAAAUMAF84AGI5AGO6AQBguwEAYQEJ6wIHAQnxAgcDDABoOABpOQBqAAAAAwwAaDgAaTkAagEIAAUBCAAFBQwAbzgAcjkAc7oBAHC7AQBxAAAAAAAFDABvOAByOQBzugEAcLsBAHECDgAGEgANAg4ABhIADQMMAHg4AHk5AHoAAAADDAB4OAB5OQB6AQgABQEIAAUDDAB_OACAATkAgQEAAAADDAB_OACAATkAgQECCAAFDQAcAggABQ0AHAUMAIYBOACJATkAigG6AQCHAbsBAIgBAAAAAAAFDACGATgAiQE5AIoBugEAhwG7AQCIAQAAAAMMAJABOACRATkAkgEAAAADDACQATgAkQE5AJIBAggABQ4ABgIIAAUOAAYFDACXATgAmgE5AJsBugEAmAG7AQCZAQAAAAAABQwAlwE4AJoBOQCbAboBAJgBuwEAmQECAwACEIoECwIDAAIQkAQLAwwAoAE4AKEBOQCiAQAAAAMMAKABOAChATkAogEDA6IEAgijBAUSpAQNAwOqBAIIqwQFEqwEDQUMAKcBOACqATkAqwG6AQCoAbsBAKkBAAAAAAAFDACnATgAqgE5AKsBugEAqAG7AQCpAQQIAAUOAAYQAAsUvgQJBAgABQ4ABhAACxTEBAkFDACwATgAswE5ALQBugEAsQG7AQCyAQAAAAAABQwAsAE4ALMBOQC0AboBALEBuwEAsgECCAAFDgAGAggABQ4ABgUMALkBOAC8ATkAvQG6AQC6AbsBALsBAAAAAAAFDAC5ATgAvAE5AL0BugEAugG7AQC7AQIIAAUNAAcCCAAFDQAHBQwAwgE4AMUBOQDGAboBAMMBuwEAxAEAAAAAAAUMAMIBOADFATkAxgG6AQDDAbsBAMQBAQ4ABgEOAAYFDADLATgAzgE5AM8BugEAzAG7AQDNAQAAAAAABQwAywE4AM4BOQDPAboBAMwBuwEAzQEAAAMMANQBOADVATkA1gEAAAADDADUATgA1QE5ANYBAgMAAg4ABgIDAAIOAAYFDADbATgA3gE5AN8BugEA3AG7AQDdAQAAAAAABQwA2wE4AN4BOQDfAboBANwBuwEA3QEAAAAFDADlATgA6AE5AOkBugEA5gG7AQDnAQAAAAAABQwA5QE4AOgBOQDpAboBAOYBuwEA5wEBBwACAQcAAgUMAO4BOADxATkA8gG6AQDvAbsBAPABAAAAAAAFDADuATgA8QE5APIBugEA7wG7AQDwAQAAAAMMAPgBOAD5ATkA-gEAAAADDAD4ATgA-QE5APoBAggABSOLBgICCAAFI5EGAgUMAP8BOACCAjkAgwK6AQCAArsBAIECAAAAAAAFDAD_ATgAggI5AIMCugEAgAK7AQCBAiYCASeQAQEokgEBKZMBASqUAQEslgEBLZgBIi6ZASMvmwEBMJ0BIjGeASQ0nwEBNaABATahASI6pAElO6UBKTymARk9pwEZPqgBGT-pARlAqgEZQawBGUKuASJDrwEqRLIBGUW0ASJGtQErR7cBGUi4ARlJuQEiSrwBLEu9ATBMvgEaTb8BGk7AARpPwQEaUMIBGlHEARpSxgEiU8cBMVTJARpVywEiVswBMlfNARpYzgEaWc8BIlrSATNb0wE3XNUBAl3WAQJe2AECX9kBAmDaAQJh3AECYt4BImPfAThk4QECZeMBImbkATln5QECaOYBAmnnASJq6gE6a-sBPmzsAQNt7QEDbu4BA2_vAQNw8AEDcfIBA3L0ASJz9QE_dPcBA3X5ASJ2-gFAd_sBA3j8AQN5_QEieoACQXuBAkV8ggIEfYMCBH6EAgR_hQIEgAGGAgSBAYgCBIIBigIigwGLAkaEAY0CBIUBjwIihgGQAkeHAZECBIgBkgIEiQGTAiKKAZYCSIsBlwJMjAGZAk2NAZoCTY4BnQJNjwGeAk2QAZ8CTZEBoQJNkgGjAiKTAaQCTpQBpgJNlQGoAiKWAakCT5cBqgJNmAGrAk2ZAawCIpoBrwJQmwGwAlScAbICEp0BswISngG1AhKfAbYCEqABtwISoQG5AhKiAbsCIqMBvAJVpAG-AhKlAcACIqYBwQJWpwHCAhKoAcMCEqkBxAIiqgHHAlerAcgCW6wByQIRrQHKAhGuAcsCEa8BzAIRsAHNAhGxAc8CEbIB0QIiswHSAly0AdUCEbUB1wIitgHYAl23AdoCEbgB2wIRuQHcAiK8Ad8CXr0B4AJkvgHhAge_AeICB8AB4wIHwQHkAgfCAeUCB8MB5wIHxAHpAiLFAeoCZcYB7QIHxwHvAiLIAfACZskB8gIHygHzAgfLAfQCIswB9wJnzQH4AmvOAfkCDc8B-gIN0AH7Ag3RAfwCDdIB_QIN0wH_Ag3UAYEDItUBggNs1gGEAw3XAYYDItgBhwNt2QGIAw3aAYkDDdsBigMi3AGNA27dAY4DdN4BjwMO3wGQAw7gAZEDDuEBkgMO4gGTAw7jAZUDDuQBlwMi5QGYA3XmAZoDDucBnAMi6AGdA3bpAZ4DDuoBnwMO6wGgAyLsAaMDd-0BpAN77gGlAxzvAaYDHPABpwMc8QGoAxzyAakDHPMBqwMc9AGtAyL1Aa4DfPYBsAMc9wGyAyL4AbMDffkBtAMc-gG1Axz7AbYDIvwBuQN-_QG6A4IB_gG7Ax3_AbwDHYACvQMdgQK-Ax2CAr8DHYMCwQMdhALDAyKFAsQDgwGGAsYDHYcCyAMiiALJA4QBiQLKAx2KAssDHYsCzAMijALPA4UBjQLQA4sBjgLSA4wBjwLTA4wBkALWA4wBkQLXA4wBkgLYA4wBkwLaA4wBlALcAyKVAt0DjQGWAt8DjAGXAuEDIpgC4gOOAZkC4wOMAZoC5AOMAZsC5QMinALoA48BnQLpA5MBngLqAxefAusDF6AC7AMXoQLtAxeiAu4DF6MC8AMXpALyAyKlAvMDlAGmAvUDF6cC9wMiqAL4A5UBqQL5AxeqAvoDF6sC-wMirAL-A5YBrQL_A5wBrgKABAyvAoEEDLACggQMsQKDBAyyAoQEDLMChgQMtAKIBCK1AokEnQG2AowEDLcCjgQiuAKPBJ4BuQKRBAy6ApIEDLsCkwQivAKWBJ8BvQKXBKMBvgKYBAu_ApkEC8ACmgQLwQKbBAvCApwEC8MCngQLxAKgBCLFAqEEpAHGAqYEC8cCqAQiyAKpBKUByQKtBAvKAq4EC8sCrwQizAKyBKYBzQKzBKwBzgK0BArPArUECtACtgQK0QK3BArSArgECtMCugQK1AK8BCLVAr0ErQHWAsAECtcCwgQi2ALDBK4B2QLFBAraAsYECtsCxwQi3ALKBK8B3QLLBLUB3gLMBBbfAs0EFuACzgQW4QLPBBbiAtAEFuMC0gQW5ALUBCLlAtUEtgHmAtcEFucC2QQi6ALaBLcB6QLbBBbqAtwEFusC3QQi7ALgBLgB7QLhBL4B7gLiBAbvAuMEBvAC5AQG8QLlBAbyAuYEBvMC6AQG9ALqBCL1AusEvwH2Au0EBvcC7wQi-ALwBMAB-QLxBAb6AvIEBvsC8wQi_AL2BMEB_QL3BMcB_gL4BAn_AvkECYAD-gQJgQP7BAmCA_wECYMD_gQJhAOABSKFA4EFyAGGA4MFCYcDhQUiiAOGBckBiQOHBQmKA4gFCYsDiQUijAOMBcoBjQONBdABjgOPBdEBjwOQBdEBkAOTBdEBkQOUBdEBkgOVBdEBkwOXBdEBlAOZBSKVA5oF0gGWA5sF0QGXA5wFIpgDnwXTAZkDoAXXAZoDoQUVmwOiBRWcA6MFFZ0DpAUVngOlBRWfA6cFFaADqQUioQOqBdgBogOsBRWjA64FIqQDrwXZAaUDsAUVpgOxBRWnA7IFIqgDtQXaAakDtgXgAaoDuAXhAasDuQXhAawDvAXhAa0DvQXhAa4DvgXhAa8DwAXhAbADwgUisQPDBeIBsgPFBeEBswPHBSK0A8gF4wG1A8kF4QG2A8oF4QG3A8sFIrgDzgXkAbkDzwXqAboD0QUFuwPSBQW8A9QFBb0D1QUFvgPWBQW_A9gFBcAD2gUiwQPbBesBwgPdBQXDA98FIsQD4AXsAcUD4QUFxgPiBQXHA-MFIsgD5gXtAckD5wXzAcoD6QX0AcsD6gX0AcwD7QX0Ac0D7gX0Ac4D7wX0Ac8D8QX0AdAD8wUi0QP0BfUB0gP2BfQB0wP4BSLUA_kF9gHVA_oF9AHWA_sF9AHXA_wFItgD_wX3AdkDgAb7AdoDgQYf2wOCBh_cA4MGH90DhAYf3gOFBh_fA4cGH-ADiQYi4QOKBvwB4gONBh_jA48GIuQDkAb9AeUDkgYf5gOTBh_nA5QGIugDlwb-AekDmAaEAg"
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
  ExpenseCategoryScalarFieldEnum: () => ExpenseCategoryScalarFieldEnum,
  ExpenseScalarFieldEnum: () => ExpenseScalarFieldEnum,
  HeroSliderScalarFieldEnum: () => HeroSliderScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  LandingPageScalarFieldEnum: () => LandingPageScalarFieldEnum,
  ModelName: () => ModelName,
  NotificationScalarFieldEnum: () => NotificationScalarFieldEnum,
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
  WithdrawalRequestScalarFieldEnum: () => WithdrawalRequestScalarFieldEnum,
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
  ExpenseCategory: "ExpenseCategory",
  Expense: "Expense",
  HeroSlider: "HeroSlider",
  LandingPage: "LandingPage",
  Notification: "Notification",
  Order: "Order",
  OrderItem: "OrderItem",
  PosCartItem: "PosCartItem",
  Product: "Product",
  ProductVariant: "ProductVariant",
  DocumentEmbedding: "DocumentEmbedding",
  Review: "Review",
  ShippingSetting: "ShippingSetting",
  Shop: "Shop",
  SiteSetting: "SiteSetting",
  WithdrawalRequest: "WithdrawalRequest"
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
var ExpenseCategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  isActive: "isActive",
  shopId: "shopId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ExpenseScalarFieldEnum = {
  id: "id",
  name: "name",
  price: "price",
  note: "note",
  date: "date",
  categoryId: "categoryId",
  shopId: "shopId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
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
  themeColor: "themeColor",
  showGallerySection: "showGallerySection",
  showAboutSection: "showAboutSection",
  showDescriptionSection: "showDescriptionSection",
  showReviewsSection: "showReviewsSection",
  sectionOrder: "sectionOrder",
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
var NotificationScalarFieldEnum = {
  id: "id",
  type: "type",
  title: "title",
  message: "message",
  isRead: "isRead",
  userId: "userId",
  orderId: "orderId",
  createdAt: "createdAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  orderSeq: "orderSeq",
  orderNumber: "orderNumber",
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
  costPrice: "costPrice",
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
  sku: "sku",
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
  sku: "sku",
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
var WithdrawalRequestScalarFieldEnum = {
  id: "id",
  amount: "amount",
  status: "status",
  payoutMethod: "payoutMethod",
  mobileBankingProvider: "mobileBankingProvider",
  mobileNumber: "mobileNumber",
  bankName: "bankName",
  bankAccountName: "bankAccountName",
  bankAccountNumber: "bankAccountNumber",
  bankBranch: "bankBranch",
  bankRoutingNumber: "bankRoutingNumber",
  adminNote: "adminNote",
  reviewedAt: "reviewedAt",
  reviewedByAdminId: "reviewedByAdminId",
  shopId: "shopId",
  createdAt: "createdAt",
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
var NotificationType = {
  ORDER_PLACED: "ORDER_PLACED",
  ORDER_STATUS_CHANGED: "ORDER_STATUS_CHANGED",
  PAYMENT_STATUS_CHANGED: "PAYMENT_STATUS_CHANGED"
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
import { Router as Router22 } from "express";

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

// src/app/utils/generateSku.ts
var randomSixDigits = () => Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
var generateUniqueSku = async (prisma3, excludeProductId, excludeVariantId) => {
  const MAX_ATTEMPTS = 20;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const sku = randomSixDigits();
    const [productMatch, variantMatch] = await Promise.all([
      prisma3.product.findUnique({ where: { sku }, select: { id: true } }),
      prisma3.productVariant.findUnique({ where: { sku }, select: { id: true } })
    ]);
    const productConflict = productMatch && productMatch.id !== excludeProductId;
    const variantConflict = variantMatch && variantMatch.id !== excludeVariantId;
    if (!productConflict && !variantConflict) {
      return sku;
    }
  }
  throw new Error("Failed to generate a unique SKU after multiple attempts");
};

// src/app/module/product/product.service.ts
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
var generateSku = async () => {
  const sku = await generateUniqueSku(prisma2);
  return { sku };
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
  generateSku,
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
var generateSku2 = catchAsync(async (req, res) => {
  const result = await ProductService.generateSku();
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "SKU generated successfully",
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
  generateSku: generateSku2,
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
  sku: z3.string().trim().min(1).optional().nullable(),
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
  sku: z3.string().trim().min(1).optional().nullable(),
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
  sku: z3.string().trim().min(1).optional().nullable(),
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
router4.get(
  "/generate-sku",
  checkAuth(Role.SELLER),
  ProductController.generateSku
);
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

// src/app/utils/generateOrderNumber.ts
var ORDER_NUMBER_PREFIX = {
  ONLINE: "ONL",
  POS: "POS",
  LANDING_PAGE: "LP"
};
var generateOrderNumber = (orderType, orderSeq) => {
  return `${ORDER_NUMBER_PREFIX[orderType]}-${String(orderSeq).padStart(6, "0")}`;
};

// src/app/module/notification/notification.service.ts
var notifyOrderPlaced = async (order, orderItems) => {
  const recipients = /* @__PURE__ */ new Map();
  if (order.userId) {
    recipients.set(order.userId, NotificationType.ORDER_PLACED);
  }
  const uniqueShopIds = [...new Set(orderItems.map((item) => item.product.shopId))];
  if (uniqueShopIds.length > 0) {
    const shops = await prisma2.shop.findMany({
      where: { id: { in: uniqueShopIds } },
      select: { vendorId: true }
    });
    for (const shop of shops) {
      recipients.set(shop.vendorId, NotificationType.ORDER_PLACED);
    }
  }
  const admins = await prisma2.user.findMany({
    where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN] } },
    select: { id: true }
  });
  for (const admin of admins) {
    recipients.set(admin.id, NotificationType.ORDER_PLACED);
  }
  if (recipients.size === 0) return;
  await prisma2.notification.createMany({
    data: [...recipients.keys()].map((userId) => ({
      userId,
      orderId: order.id,
      type: NotificationType.ORDER_PLACED,
      title: userId === order.userId ? "Order Placed Successfully" : "New Order Received",
      message: userId === order.userId ? `Your order #${order.orderNumber} has been placed successfully.` : `A new order #${order.orderNumber} has been placed.`
    }))
  });
};
var notifyOrderStatusChanged = async (order, previousStatus) => {
  if (!order.userId || order.orderStatus === previousStatus) return;
  await prisma2.notification.create({
    data: {
      userId: order.userId,
      orderId: order.id,
      type: NotificationType.ORDER_STATUS_CHANGED,
      title: "Order Status Updated",
      message: `Your order #${order.orderNumber} is now ${order.orderStatus.toLowerCase()}.`
    }
  });
};
var notifyPaymentStatusChanged = async (order, previousPaymentStatus) => {
  if (!order.userId || order.paymentStatus === previousPaymentStatus) return;
  await prisma2.notification.create({
    data: {
      userId: order.userId,
      orderId: order.id,
      type: NotificationType.PAYMENT_STATUS_CHANGED,
      title: "Payment Status Updated",
      message: `Payment for your order #${order.orderNumber} is now ${order.paymentStatus.toLowerCase()}.`
    }
  });
};
var getMyNotifications = async (userId, limit) => {
  const [notifications, unreadCount] = await Promise.all([
    prisma2.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit
    }),
    prisma2.notification.count({ where: { userId, isRead: false } })
  ]);
  return { notifications, unreadCount };
};
var markAsRead = async (userId, id) => {
  await prisma2.notification.updateMany({
    where: { id, userId },
    data: { isRead: true }
  });
};
var markAllAsRead = async (userId) => {
  await prisma2.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
};
var NotificationService = {
  notifyOrderPlaced,
  notifyOrderStatusChanged,
  notifyPaymentStatusChanged,
  getMyNotifications,
  markAsRead,
  markAllAsRead
};

// src/app/module/order/bdCourier.service.ts
var BDCourierService = class {
  apiKey;
  apiUrl;
  constructor() {
    this.apiKey = envVars.BDCOURIER.API_KEY || "";
    this.apiUrl = envVars.BDCOURIER.API_BASE_URL || "https://api.bdcourier.com";
    if (!this.apiKey) {
      throw new Error("BDCourier API key is missing...");
    }
  }
  async checkPhone(phone) {
    try {
      const response = await fetch(`${this.apiUrl}/courier-check`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();
      if (!response.ok || data.status !== "success") {
        throw new Error(
          `BDCourier API error: ${response.status} - ${data.message || "unknown error"}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error checking phone with BDCourier:", error);
      throw error;
    }
  }
};

// src/app/module/order/order.service.ts
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
  const order = await prisma2.$transaction(async (tx) => {
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
    const order2 = await tx.order.create({
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
    const orderWithNumber = await tx.order.update({
      where: { id: order2.id },
      data: { orderNumber: generateOrderNumber(order2.orderType, order2.orderSeq) }
    });
    for (const item of orderItemsToProcess) {
      const itemTotal = item.sellPrice * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - itemCommission;
      await tx.orderItem.create({
        data: {
          orderId: order2.id,
          productId: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.sellPrice,
          costPrice: item.variant?.purchasePrice ?? item.product.purchasePrice,
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
    return orderWithNumber;
  });
  await NotificationService.notifyOrderPlaced(order, orderItemsToProcess);
  return order;
};
var getAllOrders = async (queryParams) => {
  const orderQuery = new QueryBuilder(prisma2.order, queryParams, {
    searchableFields: [
      "orderNumber",
      "address",
      "district",
      "fullName",
      "phone",
      "shop.name",
      "items.shop.name"
    ],
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
    },
    shop: {
      select: { id: true, name: true }
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
var checkOrderFraud = async (id, userId, role) => {
  const order = await getOrderById(id, userId, role);
  const phone = order.phone?.trim();
  const isValidPhone = !!phone && phone.toUpperCase() !== "N/A" && phone.length >= 10;
  if (!isValidPhone) {
    return { hasPhone: false };
  }
  const bdCourierService = new BDCourierService();
  const report = await bdCourierService.checkPhone(phone);
  return { hasPhone: true, phone, report };
};
var updateOrderStatus = async (id, statusValue) => {
  const existingOrder = await prisma2.order.findUnique({ where: { id } });
  if (!existingOrder) throw new AppError_default(status15.NOT_FOUND, "Order not found");
  const updatedOrder = await prisma2.order.update({
    where: { id },
    data: { orderStatus: statusValue }
  });
  await NotificationService.notifyOrderStatusChanged(updatedOrder, existingOrder.orderStatus);
  return updatedOrder;
};
var updatePaymentStatus = async (id, paymentStatus) => {
  const existingOrder = await prisma2.order.findUnique({ where: { id } });
  if (!existingOrder) throw new AppError_default(status15.NOT_FOUND, "Order not found");
  const updatedOrder = await prisma2.order.update({
    where: { id },
    data: { paymentStatus }
  });
  await NotificationService.notifyPaymentStatusChanged(updatedOrder, existingOrder.paymentStatus);
  return updatedOrder;
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
  const existingOrder = await prisma2.order.findUnique({ where: { id: orderItem.orderId } });
  const updatedOrder = await prisma2.order.update({
    where: { id: orderItem.orderId },
    data: { orderStatus: statusValue }
  });
  if (existingOrder) {
    await NotificationService.notifyOrderStatusChanged(updatedOrder, existingOrder.orderStatus);
  }
  return updatedItem;
};
var updateOrderItem = async (itemId, vendorId, payload) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError_default(status15.NOT_FOUND, "Shop not found");
  const orderItem = await prisma2.orderItem.findUnique({
    where: { id: itemId },
    include: { order: true }
  });
  if (!orderItem || orderItem.shopId !== shop.id) {
    throw new AppError_default(status15.FORBIDDEN, "Access denied to this order item");
  }
  const isContentEdit = payload.productId !== void 0 || payload.productVariantId !== void 0 || payload.quantity !== void 0;
  if (!isContentEdit) {
    return updateOrderItemStatus(itemId, payload.status, vendorId);
  }
  if (orderItem.order.orderType !== OrderType.POS) {
    if (orderItem.status !== OrderStatus.PENDING && orderItem.status !== OrderStatus.PROCESSING) {
      throw new AppError_default(
        status15.BAD_REQUEST,
        "This item can no longer be edited once it has shipped"
      );
    }
  }
  const newProductId = payload.productId ?? orderItem.productId;
  const newProductVariantId = payload.productVariantId !== void 0 ? payload.productVariantId : orderItem.productVariantId;
  const newQuantity = payload.quantity ?? orderItem.quantity;
  const product = await prisma2.product.findUnique({
    where: { id: newProductId },
    include: { variants: true }
  });
  if (!product) throw new AppError_default(status15.NOT_FOUND, `Product not found: ${newProductId}`);
  if (product.shopId !== shop.id) {
    throw new AppError_default(status15.FORBIDDEN, "You can only use your own shop's products");
  }
  let variant = null;
  if (newProductVariantId) {
    variant = product.variants.find((v) => v.id === newProductVariantId);
    if (!variant) {
      throw new AppError_default(status15.NOT_FOUND, `Product variant not found: ${newProductVariantId}`);
    }
  }
  const sellPrice = variant?.sellPrice ?? product.sellPrice;
  const costPrice = variant?.purchasePrice ?? product.purchasePrice;
  const updatedItem = await prisma2.$transaction(async (tx) => {
    if (orderItem.productVariantId) {
      await tx.productVariant.update({
        where: { id: orderItem.productVariantId },
        data: { quantity: { increment: orderItem.quantity } }
      });
    }
    await tx.product.update({
      where: { id: orderItem.productId },
      data: { stock: { increment: orderItem.quantity } }
    });
    if (newProductVariantId) {
      const freshVariant = await tx.productVariant.findUnique({
        where: { id: newProductVariantId }
      });
      if (!freshVariant || freshVariant.quantity < newQuantity) {
        throw new AppError_default(
          status15.BAD_REQUEST,
          `Insufficient stock for variation of product: ${product.name}`
        );
      }
      await tx.productVariant.update({
        where: { id: newProductVariantId },
        data: { quantity: { decrement: newQuantity } }
      });
      await tx.product.update({
        where: { id: newProductId },
        data: { stock: { decrement: newQuantity } }
      });
    } else {
      const freshProduct = await tx.product.findUnique({ where: { id: newProductId } });
      if (!freshProduct || freshProduct.stock < newQuantity) {
        throw new AppError_default(status15.BAD_REQUEST, `Insufficient stock for product: ${product.name}`);
      }
      await tx.product.update({
        where: { id: newProductId },
        data: { stock: { decrement: newQuantity } }
      });
    }
    const itemTotal = sellPrice * newQuantity;
    const platformEarning = itemTotal * COMMISSION_RATE;
    const vendorEarning = itemTotal - platformEarning;
    const item = await tx.orderItem.update({
      where: { id: itemId },
      data: {
        productId: newProductId,
        productVariantId: newProductVariantId,
        quantity: newQuantity,
        price: sellPrice,
        costPrice,
        vendorEarning,
        platformEarning,
        ...payload.status !== void 0 && { status: payload.status }
      }
    });
    const allItems = await tx.orderItem.findMany({ where: { orderId: orderItem.orderId } });
    const itemsTotal = allItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const newTotalAmount = Math.max(
      0,
      itemsTotal + orderItem.order.shippingFee - orderItem.order.discountAmount
    );
    await tx.order.update({
      where: { id: orderItem.orderId },
      data: {
        totalAmount: newTotalAmount,
        ...payload.status !== void 0 && { orderStatus: payload.status }
      }
    });
    return item;
  });
  if (payload.status !== void 0) {
    const updatedOrder = await prisma2.order.findUnique({ where: { id: orderItem.orderId } });
    if (updatedOrder) {
      await NotificationService.notifyOrderStatusChanged(updatedOrder, orderItem.order.orderStatus);
    }
  }
  return updatedItem;
};
var getVendorOrders = async (vendorId, queryParams) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError_default(status15.NOT_FOUND, "Shop not found");
  const orderType = Object.values(OrderType).includes(
    queryParams.orderType
  ) ? queryParams.orderType : void 0;
  const searchTerm = typeof queryParams.searchTerm === "string" ? queryParams.searchTerm : void 0;
  const orderItems = await prisma2.orderItem.findMany({
    where: {
      shopId: shop.id,
      ...(orderType || searchTerm) && {
        order: {
          ...orderType && { orderType },
          ...searchTerm && {
            OR: [
              { orderNumber: { contains: searchTerm, mode: "insensitive" } },
              { fullName: { contains: searchTerm, mode: "insensitive" } },
              { phone: { contains: searchTerm, mode: "insensitive" } }
            ]
          }
        }
      }
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
  updateOrderItemStatus,
  updateOrderItem,
  checkOrderFraud
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
var checkOrderFraud2 = catchAsync(async (req, res) => {
  const result = await OrderService.checkOrderFraud(
    req.params.id,
    req.user.userId,
    req.user.role
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Fraud check fetched successfully",
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
var updateOrderItem2 = catchAsync(async (req, res) => {
  const result = await OrderService.updateOrderItem(
    req.params.id,
    req.user.userId,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Order item updated successfully",
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
  updateOrderItemStatus: updateOrderItemStatus2,
  updateOrderItem: updateOrderItem2,
  checkOrderFraud: checkOrderFraud2
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
var updateOrderItemZodSchema = z5.object({
  status: z5.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  productId: z5.string().min(1).optional(),
  productVariantId: z5.string().nullable().optional(),
  quantity: z5.number().int().positive().optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
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
router6.patch(
  "/items/:id",
  checkAuth(Role.SELLER),
  validateRequest(updateOrderItemZodSchema),
  OrderController.updateOrderItem
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
router6.get(
  "/:id/fraud-check",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.checkOrderFraud
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
    const orderWithNumber = await tx.order.update({
      where: { id: newOrder.id },
      data: { orderNumber: generateOrderNumber(newOrder.orderType, newOrder.orderSeq) }
    });
    for (const item of cartItems) {
      const itemTotal = item.price * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE2;
      const vendorEarning = itemTotal - itemCommission;
      const variant = item.productVariantId ? item.product.variants.find((v) => v.id === item.productVariantId) : null;
      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          productVariantId: item.productVariantId,
          shopId,
          quantity: item.quantity,
          price: item.price,
          costPrice: variant?.purchasePrice ?? item.product.purchasePrice,
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
    return orderWithNumber;
  });
  return order;
};
var getPosOrders = async (shopId, queryParams) => {
  const orderQuery = new QueryBuilder(prisma2.order, queryParams, {
    searchableFields: ["orderNumber", "phone", "fullName"],
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
  isActive: z13.boolean().optional(),
  themeColor: z13.string().optional(),
  showGallerySection: z13.boolean().optional(),
  showAboutSection: z13.boolean().optional(),
  showDescriptionSection: z13.boolean().optional(),
  showReviewsSection: z13.boolean().optional(),
  sectionOrder: z13.array(z13.enum(["price", "gallery", "about", "description", "reviews"])).optional()
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
  isActive: z13.boolean().optional(),
  themeColor: z13.string().optional(),
  showGallerySection: z13.boolean().optional(),
  showAboutSection: z13.boolean().optional(),
  showDescriptionSection: z13.boolean().optional(),
  showReviewsSection: z13.boolean().optional(),
  sectionOrder: z13.array(z13.enum(["price", "gallery", "about", "description", "reviews"])).optional()
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

// src/app/module/sales-report/sales-report.route.ts
import { Router as Router16 } from "express";

// src/app/module/sales-report/sales-report.controller.ts
import status34 from "http-status";

// src/app/module/sales-report/sales-report.service.ts
import status33 from "http-status";

// src/app/utils/periodSummary.ts
var sumByPeriod = (entries) => {
  const now = /* @__PURE__ */ new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(startOfToday);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 6);
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const summary = {
    today: 0,
    yesterday: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    lastMonth: 0,
    allTime: 0
  };
  for (const { amount, date } of entries) {
    summary.allTime += amount;
    if (date >= startOfToday && date < tomorrowStart) summary.today += amount;
    if (date >= startOfYesterday && date < startOfToday) summary.yesterday += amount;
    if (date >= startOfWeek && date < tomorrowStart) summary.thisWeek += amount;
    if (date >= startOfLastWeek && date < startOfWeek) summary.lastWeek += amount;
    if (date >= startOfMonth && date < tomorrowStart) summary.thisMonth += amount;
    if (date >= startOfLastMonth && date < startOfMonth) summary.lastMonth += amount;
  }
  return summary;
};

// src/app/module/sales-report/sales-report.service.ts
var getShopForVendor2 = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError_default(status33.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var getSalesSummary = async (vendorId) => {
  const shop = await getShopForVendor2(vendorId);
  const deliveredItems = await prisma2.orderItem.findMany({
    where: { shopId: shop.id, status: OrderStatus.DELIVERED },
    select: {
      price: true,
      quantity: true,
      order: { select: { createdAt: true } }
    }
  });
  return sumByPeriod(
    deliveredItems.map((item) => ({
      amount: item.price * item.quantity,
      date: item.order.createdAt
    }))
  );
};
var getSalesReportItems = async (vendorId, range) => {
  const shop = await getShopForVendor2(vendorId);
  let dateFilter;
  if (range.startDate || range.endDate) {
    dateFilter = {};
    if (range.startDate) dateFilter.gte = new Date(range.startDate);
    if (range.endDate) {
      const end = new Date(range.endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
  }
  const items = await prisma2.orderItem.findMany({
    where: {
      shopId: shop.id,
      status: OrderStatus.DELIVERED,
      ...dateFilter && { order: { createdAt: dateFilter } }
    },
    include: {
      product: { select: { name: true } },
      productVariant: { select: { combination: true } },
      order: { select: { orderNumber: true, orderType: true, createdAt: true } }
    },
    orderBy: { order: { createdAt: "desc" } }
  });
  const productMap = /* @__PURE__ */ new Map();
  let totalSales = 0;
  let totalQuantity = 0;
  let totalEarning = 0;
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    totalSales += lineTotal;
    totalQuantity += item.quantity;
    totalEarning += item.vendorEarning;
    const existing = productMap.get(item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.total += lineTotal;
    } else {
      productMap.set(item.productId, {
        name: item.product.name,
        quantity: item.quantity,
        total: lineTotal
      });
    }
  }
  return {
    items,
    productSummary: Array.from(productMap.values()),
    totals: {
      totalSales,
      totalQuantity,
      totalEarning
    }
  };
};
var SalesReportService = {
  getSalesSummary,
  getSalesReportItems
};

// src/app/module/sales-report/sales-report.controller.ts
var getSalesSummary2 = catchAsync(async (req, res) => {
  const result = await SalesReportService.getSalesSummary(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status34.OK,
    success: true,
    message: "Sales summary fetched successfully",
    data: result
  });
});
var getSalesReportItems2 = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const result = await SalesReportService.getSalesReportItems(req.user.userId, {
    startDate,
    endDate
  });
  sendResponse(res, {
    httpStatusCode: status34.OK,
    success: true,
    message: "Sales report fetched successfully",
    data: result
  });
});
var SalesReportController = {
  getSalesSummary: getSalesSummary2,
  getSalesReportItems: getSalesReportItems2
};

// src/app/module/sales-report/sales-report.route.ts
var router19 = Router16();
router19.get("/summary", checkAuth(Role.SELLER), SalesReportController.getSalesSummary);
router19.get("/items", checkAuth(Role.SELLER), SalesReportController.getSalesReportItems);
var SalesReportRoutes = router19;

// src/app/module/expense/expense.route.ts
import { Router as Router17 } from "express";

// src/app/module/expense/expense.controller.ts
import status36 from "http-status";

// src/app/module/expense/expense.service.ts
import status35 from "http-status";
var getShopForVendor3 = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError_default(status35.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var createCategory3 = async (vendorId, payload) => {
  const shop = await getShopForVendor3(vendorId);
  return prisma2.expenseCategory.create({
    data: { name: payload.name, shopId: shop.id }
  });
};
var getMyCategories = async (vendorId, queryParams) => {
  const shop = await getShopForVendor3(vendorId);
  return new QueryBuilder(prisma2.expenseCategory, queryParams, {
    searchableFields: ["name"],
    filterableFields: ["isActive"]
  }).search().filter().where({ shopId: shop.id }).sort().paginate().execute();
};
var updateCategory3 = async (vendorId, id, payload) => {
  const shop = await getShopForVendor3(vendorId);
  const category = await prisma2.expenseCategory.findUnique({ where: { id } });
  if (!category) throw new AppError_default(status35.NOT_FOUND, "Expense category not found");
  if (category.shopId !== shop.id) {
    throw new AppError_default(status35.FORBIDDEN, "You can only update your own expense categories");
  }
  return prisma2.expenseCategory.update({ where: { id }, data: payload });
};
var deleteCategory3 = async (vendorId, id) => {
  const shop = await getShopForVendor3(vendorId);
  const category = await prisma2.expenseCategory.findUnique({ where: { id } });
  if (!category) throw new AppError_default(status35.NOT_FOUND, "Expense category not found");
  if (category.shopId !== shop.id) {
    throw new AppError_default(status35.FORBIDDEN, "You can only delete your own expense categories");
  }
  const expenseCount = await prisma2.expense.count({ where: { categoryId: id } });
  if (expenseCount > 0) {
    throw new AppError_default(
      status35.BAD_REQUEST,
      "Cannot delete a category that has expenses. Deactivate it instead."
    );
  }
  await prisma2.expenseCategory.delete({ where: { id } });
  return { message: "Expense category deleted successfully" };
};
var createExpense = async (vendorId, payload) => {
  const shop = await getShopForVendor3(vendorId);
  const category = await prisma2.expenseCategory.findUnique({
    where: { id: payload.categoryId }
  });
  if (!category || category.shopId !== shop.id) {
    throw new AppError_default(status35.BAD_REQUEST, "Invalid expense category");
  }
  return prisma2.expense.create({
    data: {
      name: payload.name,
      price: payload.price,
      note: payload.note,
      date: new Date(payload.date),
      categoryId: payload.categoryId,
      shopId: shop.id
    },
    include: { category: { select: { id: true, name: true } } }
  });
};
var getMyExpenses = async (vendorId, queryParams) => {
  const shop = await getShopForVendor3(vendorId);
  const { startDate, endDate, ...rest } = queryParams;
  let dateFilter;
  if (startDate || endDate) {
    dateFilter = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
  }
  return new QueryBuilder(prisma2.expense, rest, {
    searchableFields: ["name", "note"],
    filterableFields: ["categoryId"]
  }).search().filter().where({ shopId: shop.id, ...dateFilter && { date: dateFilter } }).sort().paginate().include({ category: { select: { id: true, name: true } } }).execute();
};
var updateExpense = async (vendorId, id, payload) => {
  const shop = await getShopForVendor3(vendorId);
  const expense = await prisma2.expense.findUnique({ where: { id } });
  if (!expense) throw new AppError_default(status35.NOT_FOUND, "Expense not found");
  if (expense.shopId !== shop.id) {
    throw new AppError_default(status35.FORBIDDEN, "You can only update your own expenses");
  }
  if (payload.categoryId) {
    const category = await prisma2.expenseCategory.findUnique({
      where: { id: payload.categoryId }
    });
    if (!category || category.shopId !== shop.id) {
      throw new AppError_default(status35.BAD_REQUEST, "Invalid expense category");
    }
  }
  return prisma2.expense.update({
    where: { id },
    data: {
      ...payload.name !== void 0 && { name: payload.name },
      ...payload.price !== void 0 && { price: payload.price },
      ...payload.note !== void 0 && { note: payload.note },
      ...payload.date !== void 0 && { date: new Date(payload.date) },
      ...payload.categoryId !== void 0 && { categoryId: payload.categoryId }
    },
    include: { category: { select: { id: true, name: true } } }
  });
};
var deleteExpense = async (vendorId, id) => {
  const shop = await getShopForVendor3(vendorId);
  const expense = await prisma2.expense.findUnique({ where: { id } });
  if (!expense) throw new AppError_default(status35.NOT_FOUND, "Expense not found");
  if (expense.shopId !== shop.id) {
    throw new AppError_default(status35.FORBIDDEN, "You can only delete your own expenses");
  }
  await prisma2.expense.delete({ where: { id } });
  return { message: "Expense deleted successfully" };
};
var getExpenseReportSummary = async (vendorId) => {
  const shop = await getShopForVendor3(vendorId);
  const expenses = await prisma2.expense.findMany({
    where: { shopId: shop.id },
    select: { price: true, date: true }
  });
  return sumByPeriod(expenses.map((expense) => ({ amount: expense.price, date: expense.date })));
};
var ExpenseService = {
  createCategory: createCategory3,
  getMyCategories,
  updateCategory: updateCategory3,
  deleteCategory: deleteCategory3,
  createExpense,
  getMyExpenses,
  updateExpense,
  deleteExpense,
  getExpenseReportSummary
};

// src/app/module/expense/expense.controller.ts
var createCategory4 = catchAsync(async (req, res) => {
  const result = await ExpenseService.createCategory(req.user.userId, req.body);
  sendResponse(res, {
    httpStatusCode: status36.CREATED,
    success: true,
    message: "Expense category created successfully",
    data: result
  });
});
var getMyCategories2 = catchAsync(async (req, res) => {
  const { data, meta } = await ExpenseService.getMyCategories(
    req.user.userId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: "Expense categories fetched successfully",
    data,
    meta
  });
});
var updateCategory4 = catchAsync(async (req, res) => {
  const result = await ExpenseService.updateCategory(
    req.user.userId,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: "Expense category updated successfully",
    data: result
  });
});
var deleteCategory4 = catchAsync(async (req, res) => {
  const result = await ExpenseService.deleteCategory(req.user.userId, req.params.id);
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var createExpense2 = catchAsync(async (req, res) => {
  const result = await ExpenseService.createExpense(req.user.userId, req.body);
  sendResponse(res, {
    httpStatusCode: status36.CREATED,
    success: true,
    message: "Expense added successfully",
    data: result
  });
});
var getMyExpenses2 = catchAsync(async (req, res) => {
  const { data, meta } = await ExpenseService.getMyExpenses(
    req.user.userId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: "Expenses fetched successfully",
    data,
    meta
  });
});
var updateExpense2 = catchAsync(async (req, res) => {
  const result = await ExpenseService.updateExpense(
    req.user.userId,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: "Expense updated successfully",
    data: result
  });
});
var deleteExpense2 = catchAsync(async (req, res) => {
  const result = await ExpenseService.deleteExpense(req.user.userId, req.params.id);
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: result.message,
    data: null
  });
});
var getExpenseReportSummary2 = catchAsync(async (req, res) => {
  const result = await ExpenseService.getExpenseReportSummary(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status36.OK,
    success: true,
    message: "Expense report fetched successfully",
    data: result
  });
});
var ExpenseController = {
  createCategory: createCategory4,
  getMyCategories: getMyCategories2,
  updateCategory: updateCategory4,
  deleteCategory: deleteCategory4,
  createExpense: createExpense2,
  getMyExpenses: getMyExpenses2,
  updateExpense: updateExpense2,
  deleteExpense: deleteExpense2,
  getExpenseReportSummary: getExpenseReportSummary2
};

// src/app/module/expense/expense.validation.ts
import z14 from "zod";
var createExpenseCategoryZodSchema = z14.object({
  name: z14.string().min(1, "Name is required").max(100)
});
var updateExpenseCategoryZodSchema = z14.object({
  name: z14.string().min(1, "Name is required").max(100).optional(),
  isActive: z14.boolean().optional()
});
var createExpenseZodSchema = z14.object({
  categoryId: z14.string().uuid("Invalid expense category"),
  name: z14.string().min(1, "Name is required").max(150),
  price: z14.number().positive("Price must be positive"),
  note: z14.string().max(500).optional(),
  date: z14.string().min(1, "Date is required")
});
var updateExpenseZodSchema = z14.object({
  categoryId: z14.string().uuid("Invalid expense category").optional(),
  name: z14.string().min(1, "Name is required").max(150).optional(),
  price: z14.number().positive("Price must be positive").optional(),
  note: z14.string().max(500).optional(),
  date: z14.string().min(1).optional()
});

// src/app/module/expense/expense.route.ts
var router20 = Router17();
router20.use(checkAuth(Role.SELLER));
router20.post(
  "/categories",
  validateRequest(createExpenseCategoryZodSchema),
  ExpenseController.createCategory
);
router20.get("/categories", ExpenseController.getMyCategories);
router20.patch(
  "/categories/:id",
  validateRequest(updateExpenseCategoryZodSchema),
  ExpenseController.updateCategory
);
router20.delete("/categories/:id", ExpenseController.deleteCategory);
router20.get("/report/summary", ExpenseController.getExpenseReportSummary);
router20.post("/", validateRequest(createExpenseZodSchema), ExpenseController.createExpense);
router20.get("/", ExpenseController.getMyExpenses);
router20.patch("/:id", validateRequest(updateExpenseZodSchema), ExpenseController.updateExpense);
router20.delete("/:id", ExpenseController.deleteExpense);
var ExpenseRoutes = router20;

// src/app/module/profit-loss/profit-loss.route.ts
import { Router as Router18 } from "express";

// src/app/module/profit-loss/profit-loss.controller.ts
import status38 from "http-status";

// src/app/module/profit-loss/profit-loss.service.ts
import status37 from "http-status";
var getShopForVendor4 = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError_default(status37.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var buildOrderSubtotals = (items) => {
  const subtotals = /* @__PURE__ */ new Map();
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    subtotals.set(item.orderId, (subtotals.get(item.orderId) || 0) + lineTotal);
  }
  return subtotals;
};
var getProfitLossSummary = async (vendorId) => {
  const shop = await getShopForVendor4(vendorId);
  const items = await prisma2.orderItem.findMany({
    where: { shopId: shop.id, status: OrderStatus.DELIVERED },
    select: {
      orderId: true,
      price: true,
      quantity: true,
      costPrice: true,
      product: { select: { purchasePrice: true } },
      productVariant: { select: { purchasePrice: true } },
      order: { select: { discountAmount: true, createdAt: true } }
    }
  });
  const orderSubtotals = buildOrderSubtotals(items);
  const salesEntries = [];
  const costEntries = [];
  const profitEntries = [];
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    const unitCost = item.costPrice ?? item.productVariant?.purchasePrice ?? item.product.purchasePrice;
    const lineCost = unitCost * item.quantity;
    const orderSubtotal = orderSubtotals.get(item.orderId) || 0;
    const ratio = orderSubtotal > 0 ? lineTotal / orderSubtotal : 0;
    const lineDiscount = (item.order.discountAmount || 0) * ratio;
    const date = item.order.createdAt;
    salesEntries.push({ amount: lineTotal, date });
    costEntries.push({ amount: lineCost, date });
    profitEntries.push({ amount: lineTotal - lineCost - lineDiscount, date });
  }
  const expenses = await prisma2.expense.findMany({
    where: { shopId: shop.id },
    select: { price: true, date: true }
  });
  const expenseEntries = expenses.map((expense2) => ({ amount: expense2.price, date: expense2.date }));
  const sales = sumByPeriod(salesEntries);
  const cost = sumByPeriod(costEntries);
  const profit = sumByPeriod(profitEntries);
  const expense = sumByPeriod(expenseEntries);
  const periods = Object.keys(profit);
  const netProfit = periods.reduce((acc, period) => {
    acc[period] = profit[period] - expense[period];
    return acc;
  }, {});
  return { sales, cost, profit, expense, netProfit };
};
var getProfitLossItems = async (vendorId, range) => {
  const shop = await getShopForVendor4(vendorId);
  let dateFilter;
  if (range.startDate || range.endDate) {
    dateFilter = {};
    if (range.startDate) dateFilter.gte = new Date(range.startDate);
    if (range.endDate) {
      const end = new Date(range.endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
  }
  const items = await prisma2.orderItem.findMany({
    where: {
      shopId: shop.id,
      status: OrderStatus.DELIVERED,
      ...dateFilter && { order: { createdAt: dateFilter } }
    },
    include: {
      product: { select: { id: true, name: true, purchasePrice: true } },
      productVariant: { select: { id: true, combination: true, purchasePrice: true } },
      order: {
        select: {
          orderNumber: true,
          orderType: true,
          discountAmount: true,
          createdAt: true
        }
      }
    },
    orderBy: { order: { createdAt: "desc" } }
  });
  const orderSubtotals = buildOrderSubtotals(items);
  let totalSales = 0;
  let totalCost = 0;
  let totalDiscount = 0;
  let totalProfit = 0;
  const result = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    const unitCost = item.costPrice ?? item.productVariant?.purchasePrice ?? item.product.purchasePrice;
    const lineCost = unitCost * item.quantity;
    const orderSubtotal = orderSubtotals.get(item.orderId) || 0;
    const ratio = orderSubtotal > 0 ? lineTotal / orderSubtotal : 0;
    const lineDiscount = (item.order.discountAmount || 0) * ratio;
    const lineProfit = lineTotal - lineCost - lineDiscount;
    totalSales += lineTotal;
    totalCost += lineCost;
    totalDiscount += lineDiscount;
    totalProfit += lineProfit;
    return {
      id: item.id,
      product: item.product,
      productVariant: item.productVariant,
      price: item.price,
      quantity: item.quantity,
      unitCost,
      lineTotal,
      lineCost,
      lineDiscount,
      lineProfit,
      order: item.order
    };
  });
  return {
    items: result,
    totals: { totalSales, totalCost, totalDiscount, totalProfit }
  };
};
var ProfitLossService = {
  getProfitLossSummary,
  getProfitLossItems
};

// src/app/module/profit-loss/profit-loss.controller.ts
var getProfitLossSummary2 = catchAsync(async (req, res) => {
  const result = await ProfitLossService.getProfitLossSummary(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status38.OK,
    success: true,
    message: "Profit & loss summary fetched successfully",
    data: result
  });
});
var getProfitLossItems2 = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const result = await ProfitLossService.getProfitLossItems(req.user.userId, {
    startDate,
    endDate
  });
  sendResponse(res, {
    httpStatusCode: status38.OK,
    success: true,
    message: "Profit & loss report fetched successfully",
    data: result
  });
});
var ProfitLossController = {
  getProfitLossSummary: getProfitLossSummary2,
  getProfitLossItems: getProfitLossItems2
};

// src/app/module/profit-loss/profit-loss.route.ts
var router21 = Router18();
router21.use(checkAuth(Role.SELLER));
router21.get("/summary", ProfitLossController.getProfitLossSummary);
router21.get("/items", ProfitLossController.getProfitLossItems);
var ProfitLossRoutes = router21;

// src/app/module/platform-report/platform-report.route.ts
import { Router as Router19 } from "express";

// src/app/module/platform-report/platform-report.controller.ts
import status39 from "http-status";

// src/app/module/platform-report/platform-report.service.ts
var buildDateFilter = (range) => {
  if (!range.startDate && !range.endDate) return void 0;
  const filter = {};
  if (range.startDate) filter.gte = new Date(range.startDate);
  if (range.endDate) {
    const end = new Date(range.endDate);
    end.setHours(23, 59, 59, 999);
    filter.lte = end;
  }
  return filter;
};
var getPlatformSummary = async () => {
  const items = await prisma2.orderItem.findMany({
    where: { status: OrderStatus.DELIVERED },
    select: {
      price: true,
      quantity: true,
      platformEarning: true,
      vendorEarning: true,
      order: { select: { createdAt: true } }
    }
  });
  const gmv = sumByPeriod(
    items.map((item) => ({ amount: item.price * item.quantity, date: item.order.createdAt }))
  );
  const commission = sumByPeriod(
    items.map((item) => ({ amount: item.platformEarning, date: item.order.createdAt }))
  );
  const vendorPayout = sumByPeriod(
    items.map((item) => ({ amount: item.vendorEarning, date: item.order.createdAt }))
  );
  return { gmv, commission, vendorPayout };
};
var getPlatformOverview = async (range) => {
  const dateFilter = buildDateFilter(range);
  const items = await prisma2.orderItem.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      ...dateFilter && { order: { createdAt: dateFilter } }
    },
    select: {
      orderId: true,
      price: true,
      quantity: true,
      platformEarning: true,
      vendorEarning: true,
      productId: true,
      product: { select: { name: true } },
      shopId: true,
      shop: { select: { name: true } },
      order: { select: { orderType: true } }
    }
  });
  let gmv = 0;
  let commission = 0;
  let vendorPayout = 0;
  const orderIds = /* @__PURE__ */ new Set();
  const byOrderTypeMap = /* @__PURE__ */ new Map();
  const shopMap = /* @__PURE__ */ new Map();
  const productMap = /* @__PURE__ */ new Map();
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    gmv += lineTotal;
    commission += item.platformEarning;
    vendorPayout += item.vendorEarning;
    orderIds.add(item.orderId);
    const typeBucket = byOrderTypeMap.get(item.order.orderType) || { gmv: 0, count: 0 };
    typeBucket.gmv += lineTotal;
    typeBucket.count += 1;
    byOrderTypeMap.set(item.order.orderType, typeBucket);
    const shopBucket = shopMap.get(item.shopId) || {
      shopId: item.shopId,
      name: item.shop.name,
      gmv: 0,
      commission: 0,
      orderIds: /* @__PURE__ */ new Set()
    };
    shopBucket.gmv += lineTotal;
    shopBucket.commission += item.platformEarning;
    shopBucket.orderIds.add(item.orderId);
    shopMap.set(item.shopId, shopBucket);
    const productBucket = productMap.get(item.productId) || {
      productId: item.productId,
      name: item.product.name,
      quantity: 0,
      revenue: 0
    };
    productBucket.quantity += item.quantity;
    productBucket.revenue += lineTotal;
    productMap.set(item.productId, productBucket);
  }
  const orderStatusGroups = await prisma2.order.groupBy({
    by: ["orderStatus"],
    _count: { id: true },
    where: dateFilter ? { createdAt: dateFilter } : void 0
  });
  const topShops = Array.from(shopMap.values()).map((s) => ({
    shopId: s.shopId,
    name: s.name,
    gmv: s.gmv,
    commission: s.commission,
    orderCount: s.orderIds.size
  })).sort((a, b) => b.gmv - a.gmv).slice(0, 8);
  const topProducts = Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
  return {
    totals: {
      gmv,
      commission,
      vendorPayout,
      orderCount: orderIds.size,
      avgOrderValue: orderIds.size > 0 ? gmv / orderIds.size : 0
    },
    byOrderType: Array.from(byOrderTypeMap.entries()).map(([orderType, v]) => ({
      orderType,
      ...v
    })),
    byOrderStatus: orderStatusGroups.map((g) => ({
      orderStatus: g.orderStatus,
      count: g._count.id
    })),
    topShops,
    topProducts
  };
};
var getPlatformItems = async (range) => {
  const dateFilter = buildDateFilter(range);
  const orderWhere = {};
  if (dateFilter) orderWhere.createdAt = dateFilter;
  if (range.orderType && Object.values(OrderType).includes(range.orderType)) {
    orderWhere.orderType = range.orderType;
  }
  const items = await prisma2.orderItem.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      ...range.shopId && { shopId: range.shopId },
      ...Object.keys(orderWhere).length > 0 && { order: orderWhere }
    },
    include: {
      product: { select: { id: true, name: true } },
      productVariant: { select: { id: true, combination: true } },
      shop: { select: { id: true, name: true } },
      order: { select: { orderNumber: true, orderType: true, createdAt: true } }
    },
    orderBy: { order: { createdAt: "desc" } }
  });
  let totalGmv = 0;
  let totalCommission = 0;
  let totalVendorPayout = 0;
  let totalQuantity = 0;
  const result = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    totalGmv += lineTotal;
    totalCommission += item.platformEarning;
    totalVendorPayout += item.vendorEarning;
    totalQuantity += item.quantity;
    return {
      id: item.id,
      product: item.product,
      productVariant: item.productVariant,
      shop: item.shop,
      price: item.price,
      quantity: item.quantity,
      lineTotal,
      platformEarning: item.platformEarning,
      vendorEarning: item.vendorEarning,
      order: item.order
    };
  });
  return {
    items: result,
    totals: { totalGmv, totalCommission, totalVendorPayout, totalQuantity }
  };
};
var PlatformReportService = {
  getPlatformSummary,
  getPlatformOverview,
  getPlatformItems
};

// src/app/module/platform-report/platform-report.controller.ts
var getPlatformSummary2 = catchAsync(async (req, res) => {
  const result = await PlatformReportService.getPlatformSummary();
  sendResponse(res, {
    httpStatusCode: status39.OK,
    success: true,
    message: "Platform summary fetched successfully",
    data: result
  });
});
var getPlatformOverview2 = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const result = await PlatformReportService.getPlatformOverview({ startDate, endDate });
  sendResponse(res, {
    httpStatusCode: status39.OK,
    success: true,
    message: "Platform overview fetched successfully",
    data: result
  });
});
var getPlatformItems2 = catchAsync(async (req, res) => {
  const { startDate, endDate, orderType, shopId } = req.query;
  const result = await PlatformReportService.getPlatformItems({
    startDate,
    endDate,
    orderType,
    shopId
  });
  sendResponse(res, {
    httpStatusCode: status39.OK,
    success: true,
    message: "Platform report items fetched successfully",
    data: result
  });
});
var PlatformReportController = {
  getPlatformSummary: getPlatformSummary2,
  getPlatformOverview: getPlatformOverview2,
  getPlatformItems: getPlatformItems2
};

// src/app/module/platform-report/platform-report.route.ts
var router22 = Router19();
router22.use(checkAuth(Role.ADMIN, Role.SUPER_ADMIN));
router22.get("/summary", PlatformReportController.getPlatformSummary);
router22.get("/overview", PlatformReportController.getPlatformOverview);
router22.get("/items", PlatformReportController.getPlatformItems);
var PlatformReportRoutes = router22;

// src/app/module/notification/notification.route.ts
import { Router as Router20 } from "express";

// src/app/module/notification/notification.controller.ts
import status40 from "http-status";
var getMyNotifications2 = catchAsync(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const result = await NotificationService.getMyNotifications(
    req.user.userId,
    limit
  );
  sendResponse(res, {
    httpStatusCode: status40.OK,
    success: true,
    message: "Notifications fetched successfully",
    data: result
  });
});
var markAsRead2 = catchAsync(async (req, res) => {
  await NotificationService.markAsRead(
    req.user.userId,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status40.OK,
    success: true,
    message: "Notification marked as read",
    data: null
  });
});
var markAllAsRead2 = catchAsync(async (req, res) => {
  await NotificationService.markAllAsRead(req.user.userId);
  sendResponse(res, {
    httpStatusCode: status40.OK,
    success: true,
    message: "All notifications marked as read",
    data: null
  });
});
var NotificationController = {
  getMyNotifications: getMyNotifications2,
  markAsRead: markAsRead2,
  markAllAsRead: markAllAsRead2
};

// src/app/module/notification/notification.route.ts
var router23 = Router20();
router23.get(
  "/",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  NotificationController.getMyNotifications
);
router23.patch(
  "/read-all",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  NotificationController.markAllAsRead
);
router23.patch(
  "/:id/read",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  NotificationController.markAsRead
);
var NotificationRoutes = router23;

// src/app/module/withdrawal/withdrawal.route.ts
import { Router as Router21 } from "express";

// src/app/module/withdrawal/withdrawal.controller.ts
import status42 from "http-status";

// src/app/module/withdrawal/withdrawal.service.ts
import status41 from "http-status";
var getShopForVendor5 = async (vendorId) => {
  const shop = await prisma2.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError_default(status41.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};
var computeWalletBalance = async (shopId) => {
  const shopFilter = shopId ? { shopId } : {};
  const [earned, withdrawn, pending] = await Promise.all([
    prisma2.orderItem.aggregate({
      where: {
        ...shopFilter,
        status: { not: "CANCELLED" },
        order: { paymentStatus: "PAID" }
      },
      _sum: { vendorEarning: true }
    }),
    prisma2.withdrawalRequest.aggregate({
      where: { ...shopFilter, status: "APPROVED" },
      _sum: { amount: true }
    }),
    prisma2.withdrawalRequest.aggregate({
      where: { ...shopFilter, status: "PENDING" },
      _sum: { amount: true }
    })
  ]);
  const totalEarned = earned._sum.vendorEarning || 0;
  const totalWithdrawn = withdrawn._sum.amount || 0;
  const totalPending = pending._sum.amount || 0;
  return {
    totalEarned,
    totalWithdrawn,
    totalPending,
    availableBalance: totalEarned - totalWithdrawn - totalPending
  };
};
var createRequest = async (vendorId, payload) => {
  const shop = await getShopForVendor5(vendorId);
  const { availableBalance } = await computeWalletBalance(shop.id);
  if (payload.amount > availableBalance) {
    throw new AppError_default(
      status41.BAD_REQUEST,
      `Requested amount exceeds your available balance (\u09F3${availableBalance.toFixed(2)})`
    );
  }
  return prisma2.withdrawalRequest.create({
    data: {
      ...payload,
      shopId: shop.id
    }
  });
};
var getMyRequests = async (vendorId, queryParams) => {
  const shop = await getShopForVendor5(vendorId);
  return new QueryBuilder(prisma2.withdrawalRequest, queryParams, {
    filterableFields: ["status"]
  }).filter().where({ shopId: shop.id }).sort().paginate().execute();
};
var getMyWalletSummary = async (vendorId) => {
  const shop = await getShopForVendor5(vendorId);
  return computeWalletBalance(shop.id);
};
var getAllRequests = async (queryParams) => {
  return new QueryBuilder(prisma2.withdrawalRequest, queryParams, {
    filterableFields: ["status", "shopId"]
  }).filter().sort().paginate().include({ shop: { select: { id: true, name: true, vendorId: true } } }).execute();
};
var getPlatformWalletSummary = async () => {
  return computeWalletBalance();
};
var approveRequest = async (id, adminUserId, note) => {
  return prisma2.$transaction(async (tx) => {
    const request = await tx.withdrawalRequest.findUnique({ where: { id } });
    if (!request) {
      throw new AppError_default(status41.NOT_FOUND, "Withdrawal request not found");
    }
    if (request.status !== "PENDING") {
      throw new AppError_default(status41.BAD_REQUEST, "This request has already been reviewed");
    }
    const [earnedAgg, withdrawnAgg] = await Promise.all([
      tx.orderItem.aggregate({
        where: {
          shopId: request.shopId,
          status: { not: "CANCELLED" },
          order: { paymentStatus: "PAID" }
        },
        _sum: { vendorEarning: true }
      }),
      tx.withdrawalRequest.aggregate({
        where: { shopId: request.shopId, status: "APPROVED" },
        _sum: { amount: true }
      })
    ]);
    const totalEarned = earnedAgg._sum.vendorEarning || 0;
    const totalWithdrawn = withdrawnAgg._sum.amount || 0;
    if (totalWithdrawn + request.amount > totalEarned) {
      throw new AppError_default(
        status41.BAD_REQUEST,
        "Insufficient available balance to approve this request \u2014 the seller's balance has changed since submission."
      );
    }
    return tx.withdrawalRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        adminNote: note,
        reviewedAt: /* @__PURE__ */ new Date(),
        reviewedByAdminId: adminUserId
      }
    });
  });
};
var rejectRequest = async (id, adminUserId, note) => {
  const request = await prisma2.withdrawalRequest.findUnique({ where: { id } });
  if (!request) {
    throw new AppError_default(status41.NOT_FOUND, "Withdrawal request not found");
  }
  if (request.status !== "PENDING") {
    throw new AppError_default(status41.BAD_REQUEST, "This request has already been reviewed");
  }
  return prisma2.withdrawalRequest.update({
    where: { id },
    data: {
      status: "REJECTED",
      adminNote: note,
      reviewedAt: /* @__PURE__ */ new Date(),
      reviewedByAdminId: adminUserId
    }
  });
};
var WithdrawalService = {
  createRequest,
  getMyRequests,
  getMyWalletSummary,
  getAllRequests,
  getPlatformWalletSummary,
  approveRequest,
  rejectRequest
};

// src/app/module/withdrawal/withdrawal.controller.ts
var createRequest2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await WithdrawalService.createRequest(
    user.userId,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status42.CREATED,
    success: true,
    message: "Withdrawal request submitted successfully",
    data: result
  });
});
var getMyRequests2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { data, meta } = await WithdrawalService.getMyRequests(
    user.userId,
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Withdrawal requests fetched successfully",
    data,
    meta
  });
});
var getMyWalletSummary2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await WithdrawalService.getMyWalletSummary(user.userId);
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Wallet summary fetched successfully",
    data: result
  });
});
var getAllRequests2 = catchAsync(async (req, res) => {
  const { data, meta } = await WithdrawalService.getAllRequests(
    req.query
  );
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Withdrawal requests fetched successfully",
    data,
    meta
  });
});
var getPlatformWalletSummary2 = catchAsync(async (req, res) => {
  const result = await WithdrawalService.getPlatformWalletSummary();
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Platform wallet summary fetched successfully",
    data: result
  });
});
var approveRequest2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { note } = req.body;
  const result = await WithdrawalService.approveRequest(
    id,
    user.userId,
    note
  );
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Withdrawal request approved successfully",
    data: result
  });
});
var rejectRequest2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { note } = req.body;
  const result = await WithdrawalService.rejectRequest(
    id,
    user.userId,
    note
  );
  sendResponse(res, {
    httpStatusCode: status42.OK,
    success: true,
    message: "Withdrawal request rejected successfully",
    data: result
  });
});
var WithdrawalController = {
  createRequest: createRequest2,
  getMyRequests: getMyRequests2,
  getMyWalletSummary: getMyWalletSummary2,
  getAllRequests: getAllRequests2,
  getPlatformWalletSummary: getPlatformWalletSummary2,
  approveRequest: approveRequest2,
  rejectRequest: rejectRequest2
};

// src/app/module/withdrawal/withdrawal.validation.ts
import z15 from "zod";
var createWithdrawalRequestZodSchema = z15.object({
  amount: z15.number().positive("Amount must be greater than 0"),
  payoutMethod: z15.enum(["MOBILE_BANKING", "BANK_TRANSFER"]),
  mobileBankingProvider: z15.enum(["BKASH", "NAGAD"]).optional(),
  mobileNumber: z15.string().min(1).optional(),
  bankName: z15.string().min(1).optional(),
  bankAccountName: z15.string().min(1).optional(),
  bankAccountNumber: z15.string().min(1).optional(),
  bankBranch: z15.string().min(1).optional(),
  bankRoutingNumber: z15.string().min(1).optional()
}).superRefine((data, ctx) => {
  if (data.payoutMethod === "MOBILE_BANKING") {
    if (!data.mobileBankingProvider) {
      ctx.addIssue({
        code: "custom",
        path: ["mobileBankingProvider"],
        message: "Mobile banking provider is required"
      });
    }
    if (!data.mobileNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["mobileNumber"],
        message: "Mobile number is required"
      });
    }
  }
  if (data.payoutMethod === "BANK_TRANSFER") {
    const requiredBankFields = [
      "bankName",
      "bankAccountName",
      "bankAccountNumber",
      "bankBranch"
    ];
    requiredBankFields.forEach((field) => {
      if (!data[field]) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: "This field is required for bank transfer"
        });
      }
    });
  }
});
var approveWithdrawalZodSchema = z15.object({
  note: z15.string().max(500).optional()
});
var rejectWithdrawalZodSchema = z15.object({
  note: z15.string().min(1, "Rejection reason is required").max(500)
});

// src/app/module/withdrawal/withdrawal.route.ts
var router24 = Router21();
router24.post(
  "/",
  checkAuth(Role.SELLER),
  validateRequest(createWithdrawalRequestZodSchema),
  WithdrawalController.createRequest
);
router24.get(
  "/my-requests",
  checkAuth(Role.SELLER),
  WithdrawalController.getMyRequests
);
router24.get(
  "/my-summary",
  checkAuth(Role.SELLER),
  WithdrawalController.getMyWalletSummary
);
router24.get(
  "/summary",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  WithdrawalController.getPlatformWalletSummary
);
router24.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  WithdrawalController.getAllRequests
);
router24.patch(
  "/:id/approve",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(approveWithdrawalZodSchema),
  WithdrawalController.approveRequest
);
router24.patch(
  "/:id/reject",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(rejectWithdrawalZodSchema),
  WithdrawalController.rejectRequest
);
var WithdrawalRoutes = router24;

// src/app/routes/index.ts
var router25 = Router22();
router25.use("/auth", AuthRoutes);
router25.use("/admin", AdminRoutes);
router25.use("/categories", CategoryRoutes);
router25.use("/shops", ShopRoutes);
router25.use("/products", ProductRoutes);
router25.use("/cart", CartRoutes);
router25.use("/orders", OrderRoutes);
router25.use("/reviews", ReviewRoutes);
router25.use("/analytics", AnalyticsRoutes);
router25.use("/rag", RagRoutes);
router25.use("/ai", AIRoutes);
router25.use("/attributes", AttributeRoutes);
router25.use("/coupons", CouponRoutes);
router25.use("/shipping-settings", ShippingSettingRoutes);
router25.use("/hero-sliders", HeroSliderRoutes);
router25.use("/pos", PosRoutes);
router25.use("/site-settings", SiteSettingRoutes);
router25.use("/landing-pages", LandingPageRoutes);
router25.use("/sales-report", SalesReportRoutes);
router25.use("/expenses", ExpenseRoutes);
router25.use("/profit-loss", ProfitLossRoutes);
router25.use("/platform-report", PlatformReportRoutes);
router25.use("/notifications", NotificationRoutes);
router25.use("/withdrawals", WithdrawalRoutes);
var IndexRoutes = router25;

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
import status45 from "http-status";
import z16 from "zod";

// src/app/errorHelpers/handlePrismaErrors.ts
import status43 from "http-status";
var getStatusCodeFromPrismaError = (errorCode) => {
  if (errorCode === "P2002") {
    return status43.CONFLICT;
  }
  if (["P2025", "P2001", "P2015", "P2018"].includes(errorCode)) {
    return status43.NOT_FOUND;
  }
  if (["P1000", "P6002"].includes(errorCode)) {
    return status43.UNAUTHORIZED;
  }
  if (["P1010", "P6010"].includes(errorCode)) {
    return status43.FORBIDDEN;
  }
  if (errorCode === "P6003") {
    return status43.PAYMENT_REQUIRED;
  }
  if (["P1008", "P2004", "P6004"].includes(errorCode)) {
    return status43.GATEWAY_TIMEOUT;
  }
  if (errorCode === "P5011") {
    return status43.TOO_MANY_REQUESTS;
  }
  if (errorCode === "P6009") {
    return 413;
  }
  if (errorCode.startsWith("P1") || ["P2024", "P2037", "P6008"].includes(errorCode)) {
    return status43.SERVICE_UNAVAILABLE;
  }
  if (errorCode.startsWith("P2")) {
    return status43.BAD_REQUEST;
  }
  if (errorCode.startsWith("P3") || errorCode.startsWith("P4")) {
    return status43.INTERNAL_SERVER_ERROR;
  }
  return status43.INTERNAL_SERVER_ERROR;
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
    statusCode: status43.INTERNAL_SERVER_ERROR,
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
    statusCode: status43.BAD_REQUEST,
    message: `Prisma Client Validation Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientInitializationError = (error) => {
  const statusCode = error.errorCode ? getStatusCodeFromPrismaError(error.errorCode) : status43.SERVICE_UNAVAILABLE;
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
    statusCode: status43.INTERNAL_SERVER_ERROR,
    message: "Prisma Client Rust Panic Error: The database engine crashed due to a fatal error.",
    errorSources
  };
};

// src/app/errorHelpers/handleZodError.ts
import status44 from "http-status";
var handleZodError = (err) => {
  const statusCode = status44.BAD_REQUEST;
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
  let statusCode = status45.INTERNAL_SERVER_ERROR;
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
  } else if (err instanceof z16.ZodError) {
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
    statusCode = status45.INTERNAL_SERVER_ERROR;
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
import status46 from "http-status";
var notFound = (req, res) => {
  res.status(status46.NOT_FOUND).json({
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
