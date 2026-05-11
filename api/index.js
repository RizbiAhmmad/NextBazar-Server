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
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express2 from "express";
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
    }
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
  "inlineSchema": 'model Admin {\n  id            String    @id @default(uuid(7))\n  name          String\n  email         String    @unique\n  profilePhoto  String?\n  contactNumber String?\n  isDeleted     Boolean   @default(false)\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  deletedAt     DateTime?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([email])\n  @@index([isDeleted])\n  @@map("admins")\n}\n\nmodel User {\n  id                 String     @id\n  name               String\n  email              String\n  emailVerified      Boolean    @default(false)\n  role               Role       @default(USER)\n  status             UserStatus @default(ACTIVE)\n  needPasswordChange Boolean    @default(false)\n  isDeleted          Boolean    @default(false)\n  deletedAt          DateTime?\n  image              String?\n  createdAt          DateTime   @default(now())\n  updatedAt          DateTime   @updatedAt\n\n  // Relations\n  sessions Session[]\n  accounts Account[]\n  admin    Admin?\n  shop     Shop?\n  orders   Order[]\n  cart     Cart?\n  reviews  Review[]\n\n  @@unique([email])\n  @@index([role])\n  @@index([status])\n  @@index([isDeleted])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Cart {\n  id    String     @id @default(uuid())\n  items CartItem[]\n\n  // Relations\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("carts")\n}\n\nmodel CartItem {\n  id       String @id @default(uuid())\n  quantity Int    @default(1)\n\n  // Relations\n  cartId    String\n  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  productId String\n  product   Product @relation(fields: [productId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([cartId, productId]) // prevent duplicate product in same cart\n  @@index([cartId])\n  @@index([productId])\n  @@map("cart_items")\n}\n\nmodel Category {\n  id       String  @id @default(uuid())\n  name     String  @unique\n  slug     String  @unique\n  icon     String?\n  image    String?\n  isActive Boolean @default(true)\n\n  // Self-relation for subcategories\n  parentId      String?\n  parent        Category?  @relation("CategoryToSubcategory", fields: [parentId], references: [id])\n  subcategories Category[] @relation("CategoryToSubcategory")\n\n  products Product[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([parentId])\n  @@index([slug])\n  @@map("categories")\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  SELLER\n  USER\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  PENDING\n  DELETED\n}\n\nenum ShopStatus {\n  PENDING\n  ACTIVE\n  BLOCKED\n}\n\nenum ProductStatus {\n  ACTIVE\n  DRAFT\n  OUT_OF_STOCK\n  DELETED\n}\n\nenum OrderStatus {\n  PENDING\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nmodel Order {\n  id            String        @id @default(uuid())\n  totalAmount   Float\n  paymentStatus PaymentStatus @default(PENDING)\n  orderStatus   OrderStatus   @default(PENDING)\n\n  // Shipping address (structured)\n  fullName String\n  phone    String\n  address  String\n  district String\n\n  notes String? // Optional customer notes\n\n  // Relations\n  userId String\n  user   User        @relation(fields: [userId], references: [id])\n  items  OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([paymentStatus])\n  @@index([orderStatus])\n  @@index([district])\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  quantity Int\n  price    Float // Sell price at time of purchase\n\n  // Vendor payout tracking\n  vendorEarning   Float // price * quantity - commission\n  platformEarning Float // commission amount\n\n  // Item fulfillment status (per vendor)\n  status OrderStatus @default(PENDING)\n\n  // Relations\n  orderId   String\n  order     Order   @relation(fields: [orderId], references: [id])\n  productId String\n  product   Product @relation(fields: [productId], references: [id])\n  shopId    String\n  shop      Shop    @relation(fields: [shopId], references: [id])\n\n  @@index([orderId])\n  @@index([shopId])\n  @@index([productId])\n  @@map("order_items")\n}\n\nmodel Product {\n  id               String        @id @default(uuid())\n  name             String\n  slug             String        @unique\n  description      String\n  shortDescription String\n  images           String[]\n  stock            Int           @default(0)\n  status           ProductStatus @default(DRAFT)\n\n  // Pricing\n  purchasePrice Float // What vendor bought it for (internal cost)\n  regularPrice  Float // Original MRP / crossed-out price shown to customer\n  sellPrice     Float // Actual selling price (what customer pays)\n\n  // Tags / searchability\n  tags String[]\n\n  // Relations\n  shopId     String\n  shop       Shop     @relation(fields: [shopId], references: [id])\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  reviews    Review[]\n  orderItems OrderItem[]\n  cartItems  CartItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([shopId])\n  @@index([categoryId])\n  @@index([status])\n  @@index([slug])\n  @@map("products")\n}\n\nmodel DocumentEmbedding {\n  id String @id @default(uuid(7))\n\n  chunkKey    String  @unique\n  sourceType  String\n  sourceId    String\n  sourceLabel String?\n  content     String\n  metadata    Json?\n\n  embedding Unsupported("vector(2048)")\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n\n  @@index([sourceType], name: "idx_document_embeddings_sourceType")\n  @@index([sourceId], name: "idx_document_embeddings_sourceId")\n  @@map("document_embeddings")\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int     @default(5) // 1\u20135 scale\n  comment String?\n\n  // Relations\n  userId    String\n  user      User    @relation(fields: [userId], references: [id])\n  productId String\n  product   Product @relation(fields: [productId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, productId]) // one review per product per user\n  @@index([productId])\n  @@index([userId])\n  @@map("reviews")\n}\n\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../../src/generated/prisma"\n  previewFeatures = ["postgresqlExtensions"]\n}\n\ndatasource db {\n  provider   = "postgresql"\n  extensions = [vector]\n}\n\nmodel Shop {\n  id          String     @id @default(uuid())\n  name        String     @unique\n  description String?\n  logo        String?\n  banner      String?\n  status      ShopStatus @default(PENDING)\n\n  // Commission rate for this specific shop (overrides global if set)\n  commissionRate Float @default(10) // percentage e.g. 10 = 10%\n\n  // Relations\n  vendorId   String      @unique\n  vendor     User        @relation(fields: [vendorId], references: [id])\n  products   Product[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@map("shops")\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"Admin":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AdminToUser"}],"dbName":"admins"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"admin","kind":"object","type":"Admin","relationName":"AdminToUser"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"CartItemToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart_items"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"subcategories","kind":"object","type":"Category","relationName":"CategoryToSubcategory"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"orderStatus","kind":"enum","type":"OrderStatus"},{"name":"fullName","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"vendorEarning","kind":"scalar","type":"Float"},{"name":"platformEarning","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"OrderItemToShop"}],"dbName":"order_items"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"ProductStatus"},{"name":"purchasePrice","kind":"scalar","type":"Float"},{"name":"regularPrice","kind":"scalar","type":"Float"},{"name":"sellPrice","kind":"scalar","type":"Float"},{"name":"tags","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"shop","kind":"object","type":"Shop","relationName":"ProductToShop"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"reviews","kind":"object","type":"Review","relationName":"ProductToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProduct"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"products"},"DocumentEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"chunkKey","kind":"scalar","type":"String"},{"name":"sourceType","kind":"scalar","type":"String"},{"name":"sourceId","kind":"scalar","type":"String"},{"name":"sourceLabel","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"Json"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"document_embeddings"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"Shop":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"banner","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShopStatus"},{"name":"commissionRate","kind":"scalar","type":"Float"},{"name":"vendorId","kind":"scalar","type":"String"},{"name":"vendor","kind":"object","type":"User","relationName":"ShopToUser"},{"name":"products","kind":"object","type":"Product","relationName":"ProductToShop"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToShop"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shops"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","admin","vendor","shop","parent","subcategories","products","_count","category","product","reviews","items","order","orderItems","cart","cartItems","orders","Admin.findUnique","Admin.findUniqueOrThrow","Admin.findFirst","Admin.findFirstOrThrow","Admin.findMany","data","Admin.createOne","Admin.createMany","Admin.createManyAndReturn","Admin.updateOne","Admin.updateMany","Admin.updateManyAndReturn","create","update","Admin.upsertOne","Admin.deleteOne","Admin.deleteMany","having","_min","_max","Admin.groupBy","Admin.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","_avg","_sum","CartItem.groupBy","CartItem.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","DocumentEmbedding.findUnique","DocumentEmbedding.findUniqueOrThrow","DocumentEmbedding.findFirst","DocumentEmbedding.findFirstOrThrow","DocumentEmbedding.findMany","DocumentEmbedding.updateOne","DocumentEmbedding.updateMany","DocumentEmbedding.updateManyAndReturn","DocumentEmbedding.deleteOne","DocumentEmbedding.deleteMany","DocumentEmbedding.groupBy","DocumentEmbedding.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Shop.findUnique","Shop.findUniqueOrThrow","Shop.findFirst","Shop.findFirstOrThrow","Shop.findMany","Shop.createOne","Shop.createMany","Shop.createManyAndReturn","Shop.updateOne","Shop.updateMany","Shop.updateManyAndReturn","Shop.upsertOne","Shop.deleteOne","Shop.deleteMany","Shop.groupBy","Shop.aggregate","AND","OR","NOT","id","name","description","logo","banner","ShopStatus","status","commissionRate","vendorId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","rating","comment","userId","productId","chunkKey","sourceType","sourceId","sourceLabel","content","metadata","isDeleted","deletedAt","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","slug","shortDescription","images","stock","ProductStatus","purchasePrice","regularPrice","sellPrice","tags","shopId","categoryId","has","hasEvery","hasSome","quantity","price","vendorEarning","platformEarning","OrderStatus","orderId","totalAmount","PaymentStatus","paymentStatus","orderStatus","fullName","phone","address","district","notes","icon","image","isActive","parentId","cartId","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","email","emailVerified","Role","role","UserStatus","needPasswordChange","profilePhoto","contactNumber","cartId_productId","userId_productId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "8QaCAdwBDgMAAJADACD6AQAA3wMAMPsBAAALABD8AQAA3wMAMP0BAQAAAAH-AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAAAABoAIgAKIDACGhAkAAowMAIdkCAQAAAAHfAgEAjAMAIeACAQCMAwAhAQAAAAEAIAwDAACQAwAg-gEAAOEDADD7AQAAAwAQ_AEAAOEDADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIcwCQACPAwAh1gIBAKADACHXAgEAjAMAIdgCAQCMAwAhAwMAAMUEACDXAgAA4gMAINgCAADiAwAgDAMAAJADACD6AQAA4QMAMPsBAAADABD8AQAA4QMAMP0BAQAAAAGGAkAAjwMAIYcCQACPAwAhmAIBAKADACHMAkAAjwMAIdYCAQAAAAHXAgEAjAMAIdgCAQCMAwAhAwAAAAMAIAEAAAQAMAIAAAUAIBEDAACQAwAg-gEAAOADADD7AQAABwAQ_AEAAOADADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIc0CAQCgAwAhzgIBAKADACHPAgEAjAMAIdACAQCMAwAh0QIBAIwDACHSAkAAowMAIdMCQACjAwAh1AIBAIwDACHVAgEAjAMAIQgDAADFBAAgzwIAAOIDACDQAgAA4gMAINECAADiAwAg0gIAAOIDACDTAgAA4gMAINQCAADiAwAg1QIAAOIDACARAwAAkAMAIPoBAADgAwAw-wEAAAcAEPwBAADgAwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIc0CAQCgAwAhzgIBAKADACHPAgEAjAMAIdACAQCMAwAh0QIBAIwDACHSAkAAowMAIdMCQACjAwAh1AIBAIwDACHVAgEAjAMAIQMAAAAHACABAAAIADACAAAJACAOAwAAkAMAIPoBAADfAwAw-wEAAAsAEPwBAADfAwAw_QEBAKADACH-AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIaACIACiAwAhoQJAAKMDACHZAgEAoAMAId8CAQCMAwAh4AIBAIwDACEBAAAACwAgEAcAAJADACALAACRAwAgEgAAkgMAIPoBAACLAwAw-wEAAA0AEPwBAACLAwAw_QEBAKADACH-AQEAoAMAIf8BAQCMAwAhgAIBAIwDACGBAgEAjAMAIYMCAACNA4MCIoQCCACOAwAhhQIBAKADACGGAkAAjwMAIYcCQACPAwAhAQAAAA0AIBgIAADWAwAgDQAA3gMAIA8AAMoDACASAACSAwAgFAAAtQMAIPoBAADcAwAw-wEAAA8AEPwBAADcAwAw_QEBAKADACH-AQEAoAMAIf8BAQCgAwAhgwIAAN0DrQIihgJAAI8DACGHAkAAjwMAIagCAQCgAwAhqQIBAKADACGqAgAApQMAIKsCAgDRAwAhrQIIAI4DACGuAggAjgMAIa8CCACOAwAhsAIAAKUDACCxAgEAoAMAIbICAQCgAwAhBQgAAIgGACANAACTBgAgDwAAiwYAIBIAAMcEACAUAACoBQAgGAgAANYDACANAADeAwAgDwAAygMAIBIAAJIDACAUAAC1AwAg-gEAANwDADD7AQAADwAQ_AEAANwDADD9AQEAAAAB_gEBAKADACH_AQEAoAMAIYMCAADdA60CIoYCQACPAwAhhwJAAI8DACGoAgEAAAABqQIBAKADACGqAgAApQMAIKsCAgDRAwAhrQIIAI4DACGuAggAjgMAIa8CCACOAwAhsAIAAKUDACCxAgEAoAMAIbICAQCgAwAhAwAAAA8AIAEAABAAMAIAABEAIA8JAADaAwAgCgAA2wMAIAsAAJEDACD6AQAA2QMAMPsBAAATABD8AQAA2QMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhqAIBAKADACHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIQEAAAATACAGCQAAkwYAIAoAAJQGACALAADGBAAgxQIAAOIDACDGAgAA4gMAIMgCAADiAwAgDwkAANoDACAKAADbAwAgCwAAkQMAIPoBAADZAwAw-wEAABMAEPwBAADZAwAw_QEBAAAAAf4BAQAAAAGGAkAAjwMAIYcCQACPAwAhqAIBAAAAAcUCAQCMAwAhxgIBAIwDACHHAiAAogMAIcgCAQCMAwAhAwAAABMAIAEAABUAMAIAABYAIAMAAAAPACABAAAQADACAAARACABAAAAEwAgAQAAAA8AIAwDAACQAwAgDgAA0wMAIPoBAADYAwAw-wEAABsAEPwBAADYAwAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhlgICANEDACGXAgEAjAMAIZgCAQCgAwAhmQIBAKADACEDAwAAxQQAIA4AAJEGACCXAgAA4gMAIA0DAACQAwAgDgAA0wMAIPoBAADYAwAw-wEAABsAEPwBAADYAwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACGWAgIA0QMAIZcCAQCMAwAhmAIBAKADACGZAgEAoAMAIeICAADXAwAgAwAAABsAIAEAABwAMAIAAB0AIA8IAADWAwAgDgAA0wMAIBEAANUDACD6AQAA1AMAMPsBAAAfABD8AQAA1AMAMP0BAQCgAwAhgwIAAM4DuwIimQIBAKADACGxAgEAoAMAIbYCAgDRAwAhtwIIAI4DACG4AggAjgMAIbkCCACOAwAhuwIBAKADACEDCAAAiAYAIA4AAJEGACARAACSBgAgDwgAANYDACAOAADTAwAgEQAA1QMAIPoBAADUAwAw-wEAAB8AEPwBAADUAwAw_QEBAAAAAYMCAADOA7sCIpkCAQCgAwAhsQIBAKADACG2AgIA0QMAIbcCCACOAwAhuAIIAI4DACG5AggAjgMAIbsCAQCgAwAhAwAAAB8AIAEAACAAMAIAACEAIAMAAAAfACABAAAgADACAAAhACABAAAAHwAgCw4AANMDACATAADSAwAg-gEAANADADD7AQAAJQAQ_AEAANADADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGZAgEAoAMAIbYCAgDRAwAhyQIBAKADACECDgAAkQYAIBMAAIoGACAMDgAA0wMAIBMAANIDACD6AQAA0AMAMPsBAAAlABD8AQAA0AMAMP0BAQAAAAGGAkAAjwMAIYcCQACPAwAhmQIBAKADACG2AgIA0QMAIckCAQCgAwAh4QIAAM8DACADAAAAJQAgAQAAJgAwAgAAJwAgAwAAACUAIAEAACYAMAIAACcAIAEAAAAlACABAAAAGwAgAQAAAB8AIAEAAAAlACADAAAAHwAgAQAAIAAwAgAAIQAgAQAAAA8AIAEAAAAfACARAwAAkAMAIBAAAJIDACD6AQAAzAMAMPsBAAAxABD8AQAAzAMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhvAIIAI4DACG-AgAAzQO-AiK_AgAAzgO7AiLAAgEAoAMAIcECAQCgAwAhwgIBAKADACHDAgEAoAMAIcQCAQCMAwAhAwMAAMUEACAQAADHBAAgxAIAAOIDACARAwAAkAMAIBAAAJIDACD6AQAAzAMAMPsBAAAxABD8AQAAzAMAMP0BAQAAAAGGAkAAjwMAIYcCQACPAwAhmAIBAKADACG8AggAjgMAIb4CAADNA74CIr8CAADOA7sCIsACAQCgAwAhwQIBAKADACHCAgEAoAMAIcMCAQCgAwAhxAIBAIwDACEDAAAAMQAgAQAAMgAwAgAAMwAgCQMAAJADACAQAAC1AwAg-gEAALQDADD7AQAANQAQ_AEAALQDADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIQEAAAA1ACADAAAAGwAgAQAAHAAwAgAAHQAgAQAAAAMAIAEAAAAHACABAAAAMQAgAQAAABsAIAEAAAABACAEAwAAxQQAIKECAADiAwAg3wIAAOIDACDgAgAA4gMAIAMAAAALACABAAA9ADACAAABACADAAAACwAgAQAAPQAwAgAAAQAgAwAAAAsAIAEAAD0AMAIAAAEAIAsDAACQBgAg_QEBAAAAAf4BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAGgAiAAAAABoQJAAAAAAdkCAQAAAAHfAgEAAAAB4AIBAAAAAQEbAABBACAK_QEBAAAAAf4BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAGgAiAAAAABoQJAAAAAAdkCAQAAAAHfAgEAAAAB4AIBAAAAAQEbAABDADABGwAAQwAwCwMAAI8GACD9AQEA6AMAIf4BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZgCAQDoAwAhoAIgANIEACGhAkAA0wQAIdkCAQDoAwAh3wIBAOkDACHgAgEA6QMAIQIAAAABACAbAABGACAK_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGYAgEA6AMAIaACIADSBAAhoQJAANMEACHZAgEA6AMAId8CAQDpAwAh4AIBAOkDACECAAAACwAgGwAASAAgAgAAAAsAIBsAAEgAIAMAAAABACAiAABBACAjAABGACABAAAAAQAgAQAAAAsAIAYMAACMBgAgKAAAjgYAICkAAI0GACChAgAA4gMAIN8CAADiAwAg4AIAAOIDACAN-gEAAMsDADD7AQAATwAQ_AEAAMsDADD9AQEA-gIAIf4BAQD6AgAhhgJAAP4CACGHAkAA_gIAIZgCAQD6AgAhoAIgAJgDACGhAkAAmQMAIdkCAQD6AgAh3wIBAPsCACHgAgEA-wIAIQMAAAALACABAABOADAnAABPACADAAAACwAgAQAAPQAwAgAAAQAgFgQAAMQDACAFAADFAwAgBgAAxgMAIAgAAMcDACAPAADKAwAgEwAAyQMAIBUAAMgDACD6AQAAwQMAMPsBAABVABD8AQAAwQMAMP0BAQAAAAH-AQEAoAMAIYMCAADDA94CIoYCQACPAwAhhwJAAI8DACGgAiAAogMAIaECQACjAwAhxgIBAIwDACHZAgEAAAAB2gIgAKIDACHcAgAAwgPcAiLeAiAAogMAIQEAAABSACABAAAAUgAgFgQAAMQDACAFAADFAwAgBgAAxgMAIAgAAMcDACAPAADKAwAgEwAAyQMAIBUAAMgDACD6AQAAwQMAMPsBAABVABD8AQAAwQMAMP0BAQCgAwAh_gEBAKADACGDAgAAwwPeAiKGAkAAjwMAIYcCQACPAwAhoAIgAKIDACGhAkAAowMAIcYCAQCMAwAh2QIBAKADACHaAiAAogMAIdwCAADCA9wCIt4CIACiAwAhCQQAAIUGACAFAACGBgAgBgAAhwYAIAgAAIgGACAPAACLBgAgEwAAigYAIBUAAIkGACChAgAA4gMAIMYCAADiAwAgAwAAAFUAIAEAAFYAMAIAAFIAIAMAAABVACABAABWADACAABSACADAAAAVQAgAQAAVgAwAgAAUgAgEwQAAP4FACAFAAD_BQAgBgAAgAYAIAgAAIEGACAPAACEBgAgEwAAgwYAIBUAAIIGACD9AQEAAAAB_gEBAAAAAYMCAAAA3gIChgJAAAAAAYcCQAAAAAGgAiAAAAABoQJAAAAAAcYCAQAAAAHZAgEAAAAB2gIgAAAAAdwCAAAA3AIC3gIgAAAAAQEbAABaACAM_QEBAAAAAf4BAQAAAAGDAgAAAN4CAoYCQAAAAAGHAkAAAAABoAIgAAAAAaECQAAAAAHGAgEAAAAB2QIBAAAAAdoCIAAAAAHcAgAAANwCAt4CIAAAAAEBGwAAXAAwARsAAFwAMBMEAAC7BQAgBQAAvAUAIAYAAL0FACAIAAC-BQAgDwAAwQUAIBMAAMAFACAVAAC_BQAg_QEBAOgDACH-AQEA6AMAIYMCAAC6Bd4CIoYCQADsAwAhhwJAAOwDACGgAiAA0gQAIaECQADTBAAhxgIBAOkDACHZAgEA6AMAIdoCIADSBAAh3AIAALkF3AIi3gIgANIEACECAAAAUgAgGwAAXwAgDP0BAQDoAwAh_gEBAOgDACGDAgAAugXeAiKGAkAA7AMAIYcCQADsAwAhoAIgANIEACGhAkAA0wQAIcYCAQDpAwAh2QIBAOgDACHaAiAA0gQAIdwCAAC5BdwCIt4CIADSBAAhAgAAAFUAIBsAAGEAIAIAAABVACAbAABhACADAAAAUgAgIgAAWgAgIwAAXwAgAQAAAFIAIAEAAABVACAFDAAAtgUAICgAALgFACApAAC3BQAgoQIAAOIDACDGAgAA4gMAIA_6AQAAugMAMPsBAABoABD8AQAAugMAMP0BAQD6AgAh_gEBAPoCACGDAgAAvAPeAiKGAkAA_gIAIYcCQAD-AgAhoAIgAJgDACGhAkAAmQMAIcYCAQD7AgAh2QIBAPoCACHaAiAAmAMAIdwCAAC7A9wCIt4CIACYAwAhAwAAAFUAIAEAAGcAMCcAAGgAIAMAAABVACABAABWADACAABSACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAkDAAC1BQAg_QEBAAAAAYYCQAAAAAGHAkAAAAABmAIBAAAAAcwCQAAAAAHWAgEAAAAB1wIBAAAAAdgCAQAAAAEBGwAAcAAgCP0BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAHMAkAAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAABARsAAHIAMAEbAAByADAJAwAAtAUAIP0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZgCAQDoAwAhzAJAAOwDACHWAgEA6AMAIdcCAQDpAwAh2AIBAOkDACECAAAABQAgGwAAdQAgCP0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZgCAQDoAwAhzAJAAOwDACHWAgEA6AMAIdcCAQDpAwAh2AIBAOkDACECAAAAAwAgGwAAdwAgAgAAAAMAIBsAAHcAIAMAAAAFACAiAABwACAjAAB1ACABAAAABQAgAQAAAAMAIAUMAACxBQAgKAAAswUAICkAALIFACDXAgAA4gMAINgCAADiAwAgC_oBAAC5AwAw-wEAAH4AEPwBAAC5AwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhmAIBAPoCACHMAkAA_gIAIdYCAQD6AgAh1wIBAPsCACHYAgEA-wIAIQMAAAADACABAAB9ADAnAAB-ACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAkAIAEAAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACAOAwAAsAUAIP0BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAHNAgEAAAABzgIBAAAAAc8CAQAAAAHQAgEAAAAB0QIBAAAAAdICQAAAAAHTAkAAAAAB1AIBAAAAAdUCAQAAAAEBGwAAhgEAIA39AQEAAAABhgJAAAAAAYcCQAAAAAGYAgEAAAABzQIBAAAAAc4CAQAAAAHPAgEAAAAB0AIBAAAAAdECAQAAAAHSAkAAAAAB0wJAAAAAAdQCAQAAAAHVAgEAAAABARsAAIgBADABGwAAiAEAMA4DAACvBQAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmAIBAOgDACHNAgEA6AMAIc4CAQDoAwAhzwIBAOkDACHQAgEA6QMAIdECAQDpAwAh0gJAANMEACHTAkAA0wQAIdQCAQDpAwAh1QIBAOkDACECAAAACQAgGwAAiwEAIA39AQEA6AMAIYYCQADsAwAhhwJAAOwDACGYAgEA6AMAIc0CAQDoAwAhzgIBAOgDACHPAgEA6QMAIdACAQDpAwAh0QIBAOkDACHSAkAA0wQAIdMCQADTBAAh1AIBAOkDACHVAgEA6QMAIQIAAAAHACAbAACNAQAgAgAAAAcAIBsAAI0BACADAAAACQAgIgAAhgEAICMAAIsBACABAAAACQAgAQAAAAcAIAoMAACsBQAgKAAArgUAICkAAK0FACDPAgAA4gMAINACAADiAwAg0QIAAOIDACDSAgAA4gMAINMCAADiAwAg1AIAAOIDACDVAgAA4gMAIBD6AQAAuAMAMPsBAACUAQAQ_AEAALgDADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGYAgEA-gIAIc0CAQD6AgAhzgIBAPoCACHPAgEA-wIAIdACAQD7AgAh0QIBAPsCACHSAkAAmQMAIdMCQACZAwAh1AIBAPsCACHVAgEA-wIAIQMAAAAHACABAACTAQAwJwAAlAEAIAMAAAAHACABAAAIADACAAAJACAJ-gEAALcDADD7AQAAmgEAEPwBAAC3AwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACHKAgEAoAMAIcsCAQCgAwAhzAJAAI8DACEBAAAAlwEAIAEAAACXAQAgCfoBAAC3AwAw-wEAAJoBABD8AQAAtwMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIcoCAQCgAwAhywIBAKADACHMAkAAjwMAIQADAAAAmgEAIAEAAJsBADACAACXAQAgAwAAAJoBACABAACbAQAwAgAAlwEAIAMAAACaAQAgAQAAmwEAMAIAAJcBACAG_QEBAAAAAYYCQAAAAAGHAkAAAAABygIBAAAAAcsCAQAAAAHMAkAAAAABARsAAJ8BACAG_QEBAAAAAYYCQAAAAAGHAkAAAAABygIBAAAAAcsCAQAAAAHMAkAAAAABARsAAKEBADABGwAAoQEAMAb9AQEA6AMAIYYCQADsAwAhhwJAAOwDACHKAgEA6AMAIcsCAQDoAwAhzAJAAOwDACECAAAAlwEAIBsAAKQBACAG_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhygIBAOgDACHLAgEA6AMAIcwCQADsAwAhAgAAAJoBACAbAACmAQAgAgAAAJoBACAbAACmAQAgAwAAAJcBACAiAACfAQAgIwAApAEAIAEAAACXAQAgAQAAAJoBACADDAAAqQUAICgAAKsFACApAACqBQAgCfoBAAC2AwAw-wEAAK0BABD8AQAAtgMAMP0BAQD6AgAhhgJAAP4CACGHAkAA_gIAIcoCAQD6AgAhywIBAPoCACHMAkAA_gIAIQMAAACaAQAgAQAArAEAMCcAAK0BACADAAAAmgEAIAEAAJsBADACAACXAQAgCQMAAJADACAQAAC1AwAg-gEAALQDADD7AQAANQAQ_AEAALQDADD9AQEAAAABhgJAAI8DACGHAkAAjwMAIZgCAQAAAAEBAAAAsAEAIAEAAACwAQAgAgMAAMUEACAQAACoBQAgAwAAADUAIAEAALMBADACAACwAQAgAwAAADUAIAEAALMBADACAACwAQAgAwAAADUAIAEAALMBADACAACwAQAgBgMAAKcFACAQAACmBQAg_QEBAAAAAYYCQAAAAAGHAkAAAAABmAIBAAAAAQEbAAC3AQAgBP0BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAEBGwAAuQEAMAEbAAC5AQAwBgMAAJwFACAQAACbBQAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmAIBAOgDACECAAAAsAEAIBsAALwBACAE_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmAIBAOgDACECAAAANQAgGwAAvgEAIAIAAAA1ACAbAAC-AQAgAwAAALABACAiAAC3AQAgIwAAvAEAIAEAAACwAQAgAQAAADUAIAMMAACYBQAgKAAAmgUAICkAAJkFACAH-gEAALMDADD7AQAAxQEAEPwBAACzAwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhmAIBAPoCACEDAAAANQAgAQAAxAEAMCcAAMUBACADAAAANQAgAQAAswEAMAIAALABACABAAAAJwAgAQAAACcAIAMAAAAlACABAAAmADACAAAnACADAAAAJQAgAQAAJgAwAgAAJwAgAwAAACUAIAEAACYAMAIAACcAIAgOAACXBQAgEwAAoQQAIP0BAQAAAAGGAkAAAAABhwJAAAAAAZkCAQAAAAG2AgIAAAAByQIBAAAAAQEbAADNAQAgBv0BAQAAAAGGAkAAAAABhwJAAAAAAZkCAQAAAAG2AgIAAAAByQIBAAAAAQEbAADPAQAwARsAAM8BADAIDgAAlgUAIBMAAJ8EACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGZAgEA6AMAIbYCAgD6AwAhyQIBAOgDACECAAAAJwAgGwAA0gEAIAb9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGZAgEA6AMAIbYCAgD6AwAhyQIBAOgDACECAAAAJQAgGwAA1AEAIAIAAAAlACAbAADUAQAgAwAAACcAICIAAM0BACAjAADSAQAgAQAAACcAIAEAAAAlACAFDAAAkQUAICgAAJQFACApAACTBQAgigEAAJIFACCLAQAAlQUAIAn6AQAAsgMAMPsBAADbAQAQ_AEAALIDADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGZAgEA-gIAIbYCAgCUAwAhyQIBAPoCACEDAAAAJQAgAQAA2gEAMCcAANsBACADAAAAJQAgAQAAJgAwAgAAJwAgAQAAABYAIAEAAAAWACADAAAAEwAgAQAAFQAwAgAAFgAgAwAAABMAIAEAABUAMAIAABYAIAMAAAATACABAAAVADACAAAWACAMCQAAkAUAIAoAAI4FACALAACPBQAg_QEBAAAAAf4BAQAAAAGGAkAAAAABhwJAAAAAAagCAQAAAAHFAgEAAAABxgIBAAAAAccCIAAAAAHIAgEAAAABARsAAOMBACAJ_QEBAAAAAf4BAQAAAAGGAkAAAAABhwJAAAAAAagCAQAAAAHFAgEAAAABxgIBAAAAAccCIAAAAAHIAgEAAAABARsAAOUBADABGwAA5QEAMAEAAAATACAMCQAA9gQAIAoAAPcEACALAAD4BAAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhAgAAABYAIBsAAOkBACAJ_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhAgAAABMAIBsAAOsBACACAAAAEwAgGwAA6wEAIAEAAAATACADAAAAFgAgIgAA4wEAICMAAOkBACABAAAAFgAgAQAAABMAIAYMAADzBAAgKAAA9QQAICkAAPQEACDFAgAA4gMAIMYCAADiAwAgyAIAAOIDACAM-gEAALEDADD7AQAA8wEAEPwBAACxAwAw_QEBAPoCACH-AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGoAgEA-gIAIcUCAQD7AgAhxgIBAPsCACHHAiAAmAMAIcgCAQD7AgAhAwAAABMAIAEAAPIBADAnAADzAQAgAwAAABMAIAEAABUAMAIAABYAIAEAAAAzACABAAAAMwAgAwAAADEAIAEAADIAMAIAADMAIAMAAAAxACABAAAyADACAAAzACADAAAAMQAgAQAAMgAwAgAAMwAgDgMAAPEEACAQAADyBAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABmAIBAAAAAbwCCAAAAAG-AgAAAL4CAr8CAAAAuwICwAIBAAAAAcECAQAAAAHCAgEAAAABwwIBAAAAAcQCAQAAAAEBGwAA-wEAIAz9AQEAAAABhgJAAAAAAYcCQAAAAAGYAgEAAAABvAIIAAAAAb4CAAAAvgICvwIAAAC7AgLAAgEAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAQEbAAD9AQAwARsAAP0BADAOAwAA5gQAIBAAAOcEACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGYAgEA6AMAIbwCCADrAwAhvgIAAOUEvgIivwIAAPsDuwIiwAIBAOgDACHBAgEA6AMAIcICAQDoAwAhwwIBAOgDACHEAgEA6QMAIQIAAAAzACAbAACAAgAgDP0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZgCAQDoAwAhvAIIAOsDACG-AgAA5QS-AiK_AgAA-wO7AiLAAgEA6AMAIcECAQDoAwAhwgIBAOgDACHDAgEA6AMAIcQCAQDpAwAhAgAAADEAIBsAAIICACACAAAAMQAgGwAAggIAIAMAAAAzACAiAAD7AQAgIwAAgAIAIAEAAAAzACABAAAAMQAgBgwAAOAEACAoAADjBAAgKQAA4gQAIIoBAADhBAAgiwEAAOQEACDEAgAA4gMAIA_6AQAArQMAMPsBAACJAgAQ_AEAAK0DADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGYAgEA-gIAIbwCCAD9AgAhvgIAAK4DvgIivwIAAKoDuwIiwAIBAPoCACHBAgEA-gIAIcICAQD6AgAhwwIBAPoCACHEAgEA-wIAIQMAAAAxACABAACIAgAwJwAAiQIAIAMAAAAxACABAAAyADACAAAzACABAAAAIQAgAQAAACEAIAMAAAAfACABAAAgADACAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIAwIAACsBAAgDgAAgQQAIBEAAIAEACD9AQEAAAABgwIAAAC7AgKZAgEAAAABsQIBAAAAAbYCAgAAAAG3AggAAAABuAIIAAAAAbkCCAAAAAG7AgEAAAABARsAAJECACAJ_QEBAAAAAYMCAAAAuwICmQIBAAAAAbECAQAAAAG2AgIAAAABtwIIAAAAAbgCCAAAAAG5AggAAAABuwIBAAAAAQEbAACTAgAwARsAAJMCADAMCAAAqgQAIA4AAP4DACARAAD9AwAg_QEBAOgDACGDAgAA-wO7AiKZAgEA6AMAIbECAQDoAwAhtgICAPoDACG3AggA6wMAIbgCCADrAwAhuQIIAOsDACG7AgEA6AMAIQIAAAAhACAbAACWAgAgCf0BAQDoAwAhgwIAAPsDuwIimQIBAOgDACGxAgEA6AMAIbYCAgD6AwAhtwIIAOsDACG4AggA6wMAIbkCCADrAwAhuwIBAOgDACECAAAAHwAgGwAAmAIAIAIAAAAfACAbAACYAgAgAwAAACEAICIAAJECACAjAACWAgAgAQAAACEAIAEAAAAfACAFDAAA2wQAICgAAN4EACApAADdBAAgigEAANwEACCLAQAA3wQAIAz6AQAAqQMAMPsBAACfAgAQ_AEAAKkDADD9AQEA-gIAIYMCAACqA7sCIpkCAQD6AgAhsQIBAPoCACG2AgIAlAMAIbcCCAD9AgAhuAIIAP0CACG5AggA_QIAIbsCAQD6AgAhAwAAAB8AIAEAAJ4CADAnAACfAgAgAwAAAB8AIAEAACAAMAIAACEAIAEAAAARACABAAAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAPACABAAAQADACAAARACADAAAADwAgAQAAEAAwAgAAEQAgFQgAANoEACANAAC-BAAgDwAAvwQAIBIAAMAEACAUAADBBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgwIAAACtAgKGAkAAAAABhwJAAAAAAagCAQAAAAGpAgEAAAABqgIAALwEACCrAgIAAAABrQIIAAAAAa4CCAAAAAGvAggAAAABsAIAAL0EACCxAgEAAAABsgIBAAAAAQEbAACnAgAgEP0BAQAAAAH-AQEAAAAB_wEBAAAAAYMCAAAArQIChgJAAAAAAYcCQAAAAAGoAgEAAAABqQIBAAAAAaoCAAC8BAAgqwICAAAAAa0CCAAAAAGuAggAAAABrwIIAAAAAbACAAC9BAAgsQIBAAAAAbICAQAAAAEBGwAAqQIAMAEbAACpAgAwFQgAANkEACANAACQBAAgDwAAkQQAIBIAAJIEACAUAACTBAAg_QEBAOgDACH-AQEA6AMAIf8BAQDoAwAhgwIAAI0ErQIihgJAAOwDACGHAkAA7AMAIagCAQDoAwAhqQIBAOgDACGqAgAAjAQAIKsCAgD6AwAhrQIIAOsDACGuAggA6wMAIa8CCADrAwAhsAIAAI4EACCxAgEA6AMAIbICAQDoAwAhAgAAABEAIBsAAKwCACAQ_QEBAOgDACH-AQEA6AMAIf8BAQDoAwAhgwIAAI0ErQIihgJAAOwDACGHAkAA7AMAIagCAQDoAwAhqQIBAOgDACGqAgAAjAQAIKsCAgD6AwAhrQIIAOsDACGuAggA6wMAIa8CCADrAwAhsAIAAI4EACCxAgEA6AMAIbICAQDoAwAhAgAAAA8AIBsAAK4CACACAAAADwAgGwAArgIAIAMAAAARACAiAACnAgAgIwAArAIAIAEAAAARACABAAAADwAgBQwAANQEACAoAADXBAAgKQAA1gQAIIoBAADVBAAgiwEAANgEACAT-gEAAKQDADD7AQAAtQIAEPwBAACkAwAw_QEBAPoCACH-AQEA-gIAIf8BAQD6AgAhgwIAAKYDrQIihgJAAP4CACGHAkAA_gIAIagCAQD6AgAhqQIBAPoCACGqAgAApQMAIKsCAgCUAwAhrQIIAP0CACGuAggA_QIAIa8CCAD9AgAhsAIAAKUDACCxAgEA-gIAIbICAQD6AgAhAwAAAA8AIAEAALQCADAnAAC1AgAgAwAAAA8AIAEAABAAMAIAABEAIA76AQAAnwMAMPsBAAC7AgAQ_AEAAJ8DADD9AQEAAAABhgJAAI8DACGHAkAAjwMAIZoCAQAAAAGbAgEAoAMAIZwCAQCgAwAhnQIBAIwDACGeAgEAoAMAIZ8CAAChAwAgoAIgAKIDACGhAkAAowMAIQEAAAC4AgAgAQAAALgCACAO-gEAAJ8DADD7AQAAuwIAEPwBAACfAwAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhmgIBAKADACGbAgEAoAMAIZwCAQCgAwAhnQIBAIwDACGeAgEAoAMAIZ8CAAChAwAgoAIgAKIDACGhAkAAowMAIQOdAgAA4gMAIJ8CAADiAwAgoQIAAOIDACADAAAAuwIAIAEAALwCADACAAC4AgAgAwAAALsCACABAAC8AgAwAgAAuAIAIAMAAAC7AgAgAQAAvAIAMAIAALgCACAL_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmgIBAOgDACGbAgEA6AMAIZwCAQDoAwAhnQIBAOkDACGeAgEA6AMAIZ8CgAAAAAGgAiAA0gQAIaECQADTBAAhAgAAALgCACAbAADAAgAgC_0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZoCAQDoAwAhmwIBAOgDACGcAgEA6AMAIZ0CAQDpAwAhngIBAOgDACGfAoAAAAABoAIgANIEACGhAkAA0wQAIQIAAAC7AgAgGwAAwgIAIAIAAAC7AgAgGwAAwgIAIAEAAAC4AgAgAQAAALsCACAGDAAAzwQAICgAANEEACApAADQBAAgnQIAAOIDACCfAgAA4gMAIKECAADiAwAgDvoBAACWAwAw-wEAAMgCABD8AQAAlgMAMP0BAQD6AgAhhgJAAP4CACGHAkAA_gIAIZoCAQD6AgAhmwIBAPoCACGcAgEA-gIAIZ0CAQD7AgAhngIBAPoCACGfAgAAlwMAIKACIACYAwAhoQJAAJkDACEDAAAAuwIAIAEAAMcCADAnAADIAgAgAwAAALsCACABAAC8AgAwAgAAuAIAIAEAAAAdACABAAAAHQAgAwAAABsAIAEAABwAMAIAAB0AIAMAAAAbACABAAAcADACAAAdACADAAAAGwAgAQAAHAAwAgAAHQAgCQMAALoEACAOAADOBAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABlgICAAAAAZcCAQAAAAGYAgEAAAABmQIBAAAAAQEbAADQAgAgB_0BAQAAAAGGAkAAAAABhwJAAAAAAZYCAgAAAAGXAgEAAAABmAIBAAAAAZkCAQAAAAEBGwAA0gIAMAEbAADSAgAwCQMAALgEACAOAADNBAAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhlgICAPoDACGXAgEA6QMAIZgCAQDoAwAhmQIBAOgDACECAAAAHQAgGwAA1QIAIAf9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGWAgIA-gMAIZcCAQDpAwAhmAIBAOgDACGZAgEA6AMAIQIAAAAbACAbAADXAgAgAgAAABsAIBsAANcCACADAAAAHQAgIgAA0AIAICMAANUCACABAAAAHQAgAQAAABsAIAYMAADIBAAgKAAAywQAICkAAMoEACCKAQAAyQQAIIsBAADMBAAglwIAAOIDACAK-gEAAJMDADD7AQAA3gIAEPwBAACTAwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhlgICAJQDACGXAgEA-wIAIZgCAQD6AgAhmQIBAPoCACEDAAAAGwAgAQAA3QIAMCcAAN4CACADAAAAGwAgAQAAHAAwAgAAHQAgEAcAAJADACALAACRAwAgEgAAkgMAIPoBAACLAwAw-wEAAA0AEPwBAACLAwAw_QEBAAAAAf4BAQAAAAH_AQEAjAMAIYACAQCMAwAhgQIBAIwDACGDAgAAjQODAiKEAggAjgMAIYUCAQAAAAGGAkAAjwMAIYcCQACPAwAhAQAAAOECACABAAAA4QIAIAYHAADFBAAgCwAAxgQAIBIAAMcEACD_AQAA4gMAIIACAADiAwAggQIAAOIDACADAAAADQAgAQAA5AIAMAIAAOECACADAAAADQAgAQAA5AIAMAIAAOECACADAAAADQAgAQAA5AIAMAIAAOECACANBwAAwgQAIAsAAMMEACASAADEBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgAIBAAAAAYECAQAAAAGDAgAAAIMCAoQCCAAAAAGFAgEAAAABhgJAAAAAAYcCQAAAAAEBGwAA6AIAIAr9AQEAAAAB_gEBAAAAAf8BAQAAAAGAAgEAAAABgQIBAAAAAYMCAAAAgwIChAIIAAAAAYUCAQAAAAGGAkAAAAABhwJAAAAAAQEbAADqAgAwARsAAOoCADANBwAA7QMAIAsAAO4DACASAADvAwAg_QEBAOgDACH-AQEA6AMAIf8BAQDpAwAhgAIBAOkDACGBAgEA6QMAIYMCAADqA4MCIoQCCADrAwAhhQIBAOgDACGGAkAA7AMAIYcCQADsAwAhAgAAAOECACAbAADtAgAgCv0BAQDoAwAh_gEBAOgDACH_AQEA6QMAIYACAQDpAwAhgQIBAOkDACGDAgAA6gODAiKEAggA6wMAIYUCAQDoAwAhhgJAAOwDACGHAkAA7AMAIQIAAAANACAbAADvAgAgAgAAAA0AIBsAAO8CACADAAAA4QIAICIAAOgCACAjAADtAgAgAQAAAOECACABAAAADQAgCAwAAOMDACAoAADmAwAgKQAA5QMAIIoBAADkAwAgiwEAAOcDACD_AQAA4gMAIIACAADiAwAggQIAAOIDACAN-gEAAPkCADD7AQAA9gIAEPwBAAD5AgAw_QEBAPoCACH-AQEA-gIAIf8BAQD7AgAhgAIBAPsCACGBAgEA-wIAIYMCAAD8AoMCIoQCCAD9AgAhhQIBAPoCACGGAkAA_gIAIYcCQAD-AgAhAwAAAA0AIAEAAPUCADAnAAD2AgAgAwAAAA0AIAEAAOQCADACAADhAgAgDfoBAAD5AgAw-wEAAPYCABD8AQAA-QIAMP0BAQD6AgAh_gEBAPoCACH_AQEA-wIAIYACAQD7AgAhgQIBAPsCACGDAgAA_AKDAiKEAggA_QIAIYUCAQD6AgAhhgJAAP4CACGHAkAA_gIAIQ4MAACAAwAgKAAAigMAICkAAIoDACCIAgEAAAABiQIBAAAABIoCAQAAAASLAgEAAAABjAIBAAAAAY0CAQAAAAGOAgEAAAABjwIBAIkDACGQAgEAAAABkQIBAAAAAZICAQAAAAEODAAAhwMAICgAAIgDACApAACIAwAgiAIBAAAAAYkCAQAAAAWKAgEAAAAFiwIBAAAAAYwCAQAAAAGNAgEAAAABjgIBAAAAAY8CAQCGAwAhkAIBAAAAAZECAQAAAAGSAgEAAAABBwwAAIADACAoAACFAwAgKQAAhQMAIIgCAAAAgwICiQIAAACDAgiKAgAAAIMCCI8CAACEA4MCIg0MAACAAwAgKAAAgwMAICkAAIMDACCKAQAAgwMAIIsBAACDAwAgiAIIAAAAAYkCCAAAAASKAggAAAAEiwIIAAAAAYwCCAAAAAGNAggAAAABjgIIAAAAAY8CCACCAwAhCwwAAIADACAoAACBAwAgKQAAgQMAIIgCQAAAAAGJAkAAAAAEigJAAAAABIsCQAAAAAGMAkAAAAABjQJAAAAAAY4CQAAAAAGPAkAA_wIAIQsMAACAAwAgKAAAgQMAICkAAIEDACCIAkAAAAABiQJAAAAABIoCQAAAAASLAkAAAAABjAJAAAAAAY0CQAAAAAGOAkAAAAABjwJAAP8CACEIiAICAAAAAYkCAgAAAASKAgIAAAAEiwICAAAAAYwCAgAAAAGNAgIAAAABjgICAAAAAY8CAgCAAwAhCIgCQAAAAAGJAkAAAAAEigJAAAAABIsCQAAAAAGMAkAAAAABjQJAAAAAAY4CQAAAAAGPAkAAgQMAIQ0MAACAAwAgKAAAgwMAICkAAIMDACCKAQAAgwMAIIsBAACDAwAgiAIIAAAAAYkCCAAAAASKAggAAAAEiwIIAAAAAYwCCAAAAAGNAggAAAABjgIIAAAAAY8CCACCAwAhCIgCCAAAAAGJAggAAAAEigIIAAAABIsCCAAAAAGMAggAAAABjQIIAAAAAY4CCAAAAAGPAggAgwMAIQcMAACAAwAgKAAAhQMAICkAAIUDACCIAgAAAIMCAokCAAAAgwIIigIAAACDAgiPAgAAhAODAiIEiAIAAACDAgKJAgAAAIMCCIoCAAAAgwIIjwIAAIUDgwIiDgwAAIcDACAoAACIAwAgKQAAiAMAIIgCAQAAAAGJAgEAAAAFigIBAAAABYsCAQAAAAGMAgEAAAABjQIBAAAAAY4CAQAAAAGPAgEAhgMAIZACAQAAAAGRAgEAAAABkgIBAAAAAQiIAgIAAAABiQICAAAABYoCAgAAAAWLAgIAAAABjAICAAAAAY0CAgAAAAGOAgIAAAABjwICAIcDACELiAIBAAAAAYkCAQAAAAWKAgEAAAAFiwIBAAAAAYwCAQAAAAGNAgEAAAABjgIBAAAAAY8CAQCIAwAhkAIBAAAAAZECAQAAAAGSAgEAAAABDgwAAIADACAoAACKAwAgKQAAigMAIIgCAQAAAAGJAgEAAAAEigIBAAAABIsCAQAAAAGMAgEAAAABjQIBAAAAAY4CAQAAAAGPAgEAiQMAIZACAQAAAAGRAgEAAAABkgIBAAAAAQuIAgEAAAABiQIBAAAABIoCAQAAAASLAgEAAAABjAIBAAAAAY0CAQAAAAGOAgEAAAABjwIBAIoDACGQAgEAAAABkQIBAAAAAZICAQAAAAEQBwAAkAMAIAsAAJEDACASAACSAwAg-gEAAIsDADD7AQAADQAQ_AEAAIsDADD9AQEAoAMAIf4BAQCgAwAh_wEBAIwDACGAAgEAjAMAIYECAQCMAwAhgwIAAI0DgwIihAIIAI4DACGFAgEAoAMAIYYCQACPAwAhhwJAAI8DACELiAIBAAAAAYkCAQAAAAWKAgEAAAAFiwIBAAAAAYwCAQAAAAGNAgEAAAABjgIBAAAAAY8CAQCIAwAhkAIBAAAAAZECAQAAAAGSAgEAAAABBIgCAAAAgwICiQIAAACDAgiKAgAAAIMCCI8CAACFA4MCIgiIAggAAAABiQIIAAAABIoCCAAAAASLAggAAAABjAIIAAAAAY0CCAAAAAGOAggAAAABjwIIAIMDACEIiAJAAAAAAYkCQAAAAASKAkAAAAAEiwJAAAAAAYwCQAAAAAGNAkAAAAABjgJAAAAAAY8CQACBAwAhGAQAAMQDACAFAADFAwAgBgAAxgMAIAgAAMcDACAPAADKAwAgEwAAyQMAIBUAAMgDACD6AQAAwQMAMPsBAABVABD8AQAAwQMAMP0BAQCgAwAh_gEBAKADACGDAgAAwwPeAiKGAkAAjwMAIYcCQACPAwAhoAIgAKIDACGhAkAAowMAIcYCAQCMAwAh2QIBAKADACHaAiAAogMAIdwCAADCA9wCIt4CIACiAwAh4wIAAFUAIOQCAABVACADkwIAAA8AIJQCAAAPACCVAgAADwAgA5MCAAAfACCUAgAAHwAglQIAAB8AIAr6AQAAkwMAMPsBAADeAgAQ_AEAAJMDADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGWAgIAlAMAIZcCAQD7AgAhmAIBAPoCACGZAgEA-gIAIQ0MAACAAwAgKAAAgAMAICkAAIADACCKAQAAgwMAIIsBAACAAwAgiAICAAAAAYkCAgAAAASKAgIAAAAEiwICAAAAAYwCAgAAAAGNAgIAAAABjgICAAAAAY8CAgCVAwAhDQwAAIADACAoAACAAwAgKQAAgAMAIIoBAACDAwAgiwEAAIADACCIAgIAAAABiQICAAAABIoCAgAAAASLAgIAAAABjAICAAAAAY0CAgAAAAGOAgIAAAABjwICAJUDACEO-gEAAJYDADD7AQAAyAIAEPwBAACWAwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhmgIBAPoCACGbAgEA-gIAIZwCAQD6AgAhnQIBAPsCACGeAgEA-gIAIZ8CAACXAwAgoAIgAJgDACGhAkAAmQMAIQ8MAACHAwAgKAAAngMAICkAAJ4DACCIAoAAAAABiwKAAAAAAYwCgAAAAAGNAoAAAAABjgKAAAAAAY8CgAAAAAGiAgEAAAABowIBAAAAAaQCAQAAAAGlAoAAAAABpgKAAAAAAacCgAAAAAEFDAAAgAMAICgAAJ0DACApAACdAwAgiAIgAAAAAY8CIACcAwAhCwwAAIcDACAoAACbAwAgKQAAmwMAIIgCQAAAAAGJAkAAAAAFigJAAAAABYsCQAAAAAGMAkAAAAABjQJAAAAAAY4CQAAAAAGPAkAAmgMAIQsMAACHAwAgKAAAmwMAICkAAJsDACCIAkAAAAABiQJAAAAABYoCQAAAAAWLAkAAAAABjAJAAAAAAY0CQAAAAAGOAkAAAAABjwJAAJoDACEIiAJAAAAAAYkCQAAAAAWKAkAAAAAFiwJAAAAAAYwCQAAAAAGNAkAAAAABjgJAAAAAAY8CQACbAwAhBQwAAIADACAoAACdAwAgKQAAnQMAIIgCIAAAAAGPAiAAnAMAIQKIAiAAAAABjwIgAJ0DACEMiAKAAAAAAYsCgAAAAAGMAoAAAAABjQKAAAAAAY4CgAAAAAGPAoAAAAABogIBAAAAAaMCAQAAAAGkAgEAAAABpQKAAAAAAaYCgAAAAAGnAoAAAAABDvoBAACfAwAw-wEAALsCABD8AQAAnwMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZoCAQCgAwAhmwIBAKADACGcAgEAoAMAIZ0CAQCMAwAhngIBAKADACGfAgAAoQMAIKACIACiAwAhoQJAAKMDACELiAIBAAAAAYkCAQAAAASKAgEAAAAEiwIBAAAAAYwCAQAAAAGNAgEAAAABjgIBAAAAAY8CAQCKAwAhkAIBAAAAAZECAQAAAAGSAgEAAAABDIgCgAAAAAGLAoAAAAABjAKAAAAAAY0CgAAAAAGOAoAAAAABjwKAAAAAAaICAQAAAAGjAgEAAAABpAIBAAAAAaUCgAAAAAGmAoAAAAABpwKAAAAAAQKIAiAAAAABjwIgAJ0DACEIiAJAAAAAAYkCQAAAAAWKAkAAAAAFiwJAAAAAAYwCQAAAAAGNAkAAAAABjgJAAAAAAY8CQACbAwAhE_oBAACkAwAw-wEAALUCABD8AQAApAMAMP0BAQD6AgAh_gEBAPoCACH_AQEA-gIAIYMCAACmA60CIoYCQAD-AgAhhwJAAP4CACGoAgEA-gIAIakCAQD6AgAhqgIAAKUDACCrAgIAlAMAIa0CCAD9AgAhrgIIAP0CACGvAggA_QIAIbACAAClAwAgsQIBAPoCACGyAgEA-gIAIQSIAgEAAAAFswIBAAAAAbQCAQAAAAS1AgEAAAAEBwwAAIADACAoAACoAwAgKQAAqAMAIIgCAAAArQICiQIAAACtAgiKAgAAAK0CCI8CAACnA60CIgcMAACAAwAgKAAAqAMAICkAAKgDACCIAgAAAK0CAokCAAAArQIIigIAAACtAgiPAgAApwOtAiIEiAIAAACtAgKJAgAAAK0CCIoCAAAArQIIjwIAAKgDrQIiDPoBAACpAwAw-wEAAJ8CABD8AQAAqQMAMP0BAQD6AgAhgwIAAKoDuwIimQIBAPoCACGxAgEA-gIAIbYCAgCUAwAhtwIIAP0CACG4AggA_QIAIbkCCAD9AgAhuwIBAPoCACEHDAAAgAMAICgAAKwDACApAACsAwAgiAIAAAC7AgKJAgAAALsCCIoCAAAAuwIIjwIAAKsDuwIiBwwAAIADACAoAACsAwAgKQAArAMAIIgCAAAAuwICiQIAAAC7AgiKAgAAALsCCI8CAACrA7sCIgSIAgAAALsCAokCAAAAuwIIigIAAAC7AgiPAgAArAO7AiIP-gEAAK0DADD7AQAAiQIAEPwBAACtAwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhmAIBAPoCACG8AggA_QIAIb4CAACuA74CIr8CAACqA7sCIsACAQD6AgAhwQIBAPoCACHCAgEA-gIAIcMCAQD6AgAhxAIBAPsCACEHDAAAgAMAICgAALADACApAACwAwAgiAIAAAC-AgKJAgAAAL4CCIoCAAAAvgIIjwIAAK8DvgIiBwwAAIADACAoAACwAwAgKQAAsAMAIIgCAAAAvgICiQIAAAC-AgiKAgAAAL4CCI8CAACvA74CIgSIAgAAAL4CAokCAAAAvgIIigIAAAC-AgiPAgAAsAO-AiIM-gEAALEDADD7AQAA8wEAEPwBAACxAwAw_QEBAPoCACH-AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGoAgEA-gIAIcUCAQD7AgAhxgIBAPsCACHHAiAAmAMAIcgCAQD7AgAhCfoBAACyAwAw-wEAANsBABD8AQAAsgMAMP0BAQD6AgAhhgJAAP4CACGHAkAA_gIAIZkCAQD6AgAhtgICAJQDACHJAgEA-gIAIQf6AQAAswMAMPsBAADFAQAQ_AEAALMDADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGYAgEA-gIAIQkDAACQAwAgEAAAtQMAIPoBAAC0AwAw-wEAADUAEPwBAAC0AwAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhmAIBAKADACEDkwIAACUAIJQCAAAlACCVAgAAJQAgCfoBAAC2AwAw-wEAAK0BABD8AQAAtgMAMP0BAQD6AgAhhgJAAP4CACGHAkAA_gIAIcoCAQD6AgAhywIBAPoCACHMAkAA_gIAIQn6AQAAtwMAMPsBAACaAQAQ_AEAALcDADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACHKAgEAoAMAIcsCAQCgAwAhzAJAAI8DACEQ-gEAALgDADD7AQAAlAEAEPwBAAC4AwAw_QEBAPoCACGGAkAA_gIAIYcCQAD-AgAhmAIBAPoCACHNAgEA-gIAIc4CAQD6AgAhzwIBAPsCACHQAgEA-wIAIdECAQD7AgAh0gJAAJkDACHTAkAAmQMAIdQCAQD7AgAh1QIBAPsCACEL-gEAALkDADD7AQAAfgAQ_AEAALkDADD9AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGYAgEA-gIAIcwCQAD-AgAh1gIBAPoCACHXAgEA-wIAIdgCAQD7AgAhD_oBAAC6AwAw-wEAAGgAEPwBAAC6AwAw_QEBAPoCACH-AQEA-gIAIYMCAAC8A94CIoYCQAD-AgAhhwJAAP4CACGgAiAAmAMAIaECQACZAwAhxgIBAPsCACHZAgEA-gIAIdoCIACYAwAh3AIAALsD3AIi3gIgAJgDACEHDAAAgAMAICgAAMADACApAADAAwAgiAIAAADcAgKJAgAAANwCCIoCAAAA3AIIjwIAAL8D3AIiBwwAAIADACAoAAC-AwAgKQAAvgMAIIgCAAAA3gICiQIAAADeAgiKAgAAAN4CCI8CAAC9A94CIgcMAACAAwAgKAAAvgMAICkAAL4DACCIAgAAAN4CAokCAAAA3gIIigIAAADeAgiPAgAAvQPeAiIEiAIAAADeAgKJAgAAAN4CCIoCAAAA3gIIjwIAAL4D3gIiBwwAAIADACAoAADAAwAgKQAAwAMAIIgCAAAA3AICiQIAAADcAgiKAgAAANwCCI8CAAC_A9wCIgSIAgAAANwCAokCAAAA3AIIigIAAADcAgiPAgAAwAPcAiIWBAAAxAMAIAUAAMUDACAGAADGAwAgCAAAxwMAIA8AAMoDACATAADJAwAgFQAAyAMAIPoBAADBAwAw-wEAAFUAEPwBAADBAwAw_QEBAKADACH-AQEAoAMAIYMCAADDA94CIoYCQACPAwAhhwJAAI8DACGgAiAAogMAIaECQACjAwAhxgIBAIwDACHZAgEAoAMAIdoCIACiAwAh3AIAAMID3AIi3gIgAKIDACEEiAIAAADcAgKJAgAAANwCCIoCAAAA3AIIjwIAAMAD3AIiBIgCAAAA3gICiQIAAADeAgiKAgAAAN4CCI8CAAC-A94CIgOTAgAAAwAglAIAAAMAIJUCAAADACADkwIAAAcAIJQCAAAHACCVAgAABwAgEAMAAJADACD6AQAA3wMAMPsBAAALABD8AQAA3wMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhmAIBAKADACGgAiAAogMAIaECQACjAwAh2QIBAKADACHfAgEAjAMAIeACAQCMAwAh4wIAAAsAIOQCAAALACASBwAAkAMAIAsAAJEDACASAACSAwAg-gEAAIsDADD7AQAADQAQ_AEAAIsDADD9AQEAoAMAIf4BAQCgAwAh_wEBAIwDACGAAgEAjAMAIYECAQCMAwAhgwIAAI0DgwIihAIIAI4DACGFAgEAoAMAIYYCQACPAwAhhwJAAI8DACHjAgAADQAg5AIAAA0AIAOTAgAAMQAglAIAADEAIJUCAAAxACALAwAAkAMAIBAAALUDACD6AQAAtAMAMPsBAAA1ABD8AQAAtAMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAh4wIAADUAIOQCAAA1ACADkwIAABsAIJQCAAAbACCVAgAAGwAgDfoBAADLAwAw-wEAAE8AEPwBAADLAwAw_QEBAPoCACH-AQEA-gIAIYYCQAD-AgAhhwJAAP4CACGYAgEA-gIAIaACIACYAwAhoQJAAJkDACHZAgEA-gIAId8CAQD7AgAh4AIBAPsCACERAwAAkAMAIBAAAJIDACD6AQAAzAMAMPsBAAAxABD8AQAAzAMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhvAIIAI4DACG-AgAAzQO-AiK_AgAAzgO7AiLAAgEAoAMAIcECAQCgAwAhwgIBAKADACHDAgEAoAMAIcQCAQCMAwAhBIgCAAAAvgICiQIAAAC-AgiKAgAAAL4CCI8CAACwA74CIgSIAgAAALsCAokCAAAAuwIIigIAAAC7AgiPAgAArAO7AiICmQIBAAAAAckCAQAAAAELDgAA0wMAIBMAANIDACD6AQAA0AMAMPsBAAAlABD8AQAA0AMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZkCAQCgAwAhtgICANEDACHJAgEAoAMAIQiIAgIAAAABiQICAAAABIoCAgAAAASLAgIAAAABjAICAAAAAY0CAgAAAAGOAgIAAAABjwICAIADACELAwAAkAMAIBAAALUDACD6AQAAtAMAMPsBAAA1ABD8AQAAtAMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAh4wIAADUAIOQCAAA1ACAaCAAA1gMAIA0AAN4DACAPAADKAwAgEgAAkgMAIBQAALUDACD6AQAA3AMAMPsBAAAPABD8AQAA3AMAMP0BAQCgAwAh_gEBAKADACH_AQEAoAMAIYMCAADdA60CIoYCQACPAwAhhwJAAI8DACGoAgEAoAMAIakCAQCgAwAhqgIAAKUDACCrAgIA0QMAIa0CCACOAwAhrgIIAI4DACGvAggAjgMAIbACAAClAwAgsQIBAKADACGyAgEAoAMAIeMCAAAPACDkAgAADwAgDwgAANYDACAOAADTAwAgEQAA1QMAIPoBAADUAwAw-wEAAB8AEPwBAADUAwAw_QEBAKADACGDAgAAzgO7AiKZAgEAoAMAIbECAQCgAwAhtgICANEDACG3AggAjgMAIbgCCACOAwAhuQIIAI4DACG7AgEAoAMAIRMDAACQAwAgEAAAkgMAIPoBAADMAwAw-wEAADEAEPwBAADMAwAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhmAIBAKADACG8AggAjgMAIb4CAADNA74CIr8CAADOA7sCIsACAQCgAwAhwQIBAKADACHCAgEAoAMAIcMCAQCgAwAhxAIBAIwDACHjAgAAMQAg5AIAADEAIBIHAACQAwAgCwAAkQMAIBIAAJIDACD6AQAAiwMAMPsBAAANABD8AQAAiwMAMP0BAQCgAwAh_gEBAKADACH_AQEAjAMAIYACAQCMAwAhgQIBAIwDACGDAgAAjQODAiKEAggAjgMAIYUCAQCgAwAhhgJAAI8DACGHAkAAjwMAIeMCAAANACDkAgAADQAgApgCAQAAAAGZAgEAAAABDAMAAJADACAOAADTAwAg-gEAANgDADD7AQAAGwAQ_AEAANgDADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGWAgIA0QMAIZcCAQCMAwAhmAIBAKADACGZAgEAoAMAIQ8JAADaAwAgCgAA2wMAIAsAAJEDACD6AQAA2QMAMPsBAAATABD8AQAA2QMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhqAIBAKADACHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIREJAADaAwAgCgAA2wMAIAsAAJEDACD6AQAA2QMAMPsBAAATABD8AQAA2QMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhqAIBAKADACHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIeMCAAATACDkAgAAEwAgA5MCAAATACCUAgAAEwAglQIAABMAIBgIAADWAwAgDQAA3gMAIA8AAMoDACASAACSAwAgFAAAtQMAIPoBAADcAwAw-wEAAA8AEPwBAADcAwAw_QEBAKADACH-AQEAoAMAIf8BAQCgAwAhgwIAAN0DrQIihgJAAI8DACGHAkAAjwMAIagCAQCgAwAhqQIBAKADACGqAgAApQMAIKsCAgDRAwAhrQIIAI4DACGuAggAjgMAIa8CCACOAwAhsAIAAKUDACCxAgEAoAMAIbICAQCgAwAhBIgCAAAArQICiQIAAACtAgiKAgAAAK0CCI8CAACoA60CIhEJAADaAwAgCgAA2wMAIAsAAJEDACD6AQAA2QMAMPsBAAATABD8AQAA2QMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhqAIBAKADACHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIeMCAAATACDkAgAAEwAgDgMAAJADACD6AQAA3wMAMPsBAAALABD8AQAA3wMAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhmAIBAKADACGgAiAAogMAIaECQACjAwAh2QIBAKADACHfAgEAjAMAIeACAQCMAwAhEQMAAJADACD6AQAA4AMAMPsBAAAHABD8AQAA4AMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhzQIBAKADACHOAgEAoAMAIc8CAQCMAwAh0AIBAIwDACHRAgEAjAMAIdICQACjAwAh0wJAAKMDACHUAgEAjAMAIdUCAQCMAwAhDAMAAJADACD6AQAA4QMAMPsBAAADABD8AQAA4QMAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhzAJAAI8DACHWAgEAoAMAIdcCAQCMAwAh2AIBAIwDACEAAAAAAAAB6AIBAAAAAQHoAgEAAAABAegCAAAAgwICBegCCAAAAAHvAggAAAAB8AIIAAAAAfECCAAAAAHyAggAAAABAegCQAAAAAEFIgAAygYAICMAAPAGACDlAgAAywYAIOYCAADvBgAg6wIAAFIAIAsiAACCBAAwIwAAhwQAMOUCAACDBAAw5gIAAIQEADDnAgAAhQQAIOgCAACGBAAw6QIAAIYEADDqAgAAhgQAMOsCAACGBAAw7AIAAIgEADDtAgAAiQQAMAsiAADwAwAwIwAA9QMAMOUCAADxAwAw5gIAAPIDADDnAgAA8wMAIOgCAAD0AwAw6QIAAPQDADDqAgAA9AMAMOsCAAD0AwAw7AIAAPYDADDtAgAA9wMAMAoOAACBBAAgEQAAgAQAIP0BAQAAAAGDAgAAALsCApkCAQAAAAG2AgIAAAABtwIIAAAAAbgCCAAAAAG5AggAAAABuwIBAAAAAQIAAAAhACAiAAD_AwAgAwAAACEAICIAAP8DACAjAAD8AwAgARsAAO4GADAPCAAA1gMAIA4AANMDACARAADVAwAg-gEAANQDADD7AQAAHwAQ_AEAANQDADD9AQEAAAABgwIAAM4DuwIimQIBAKADACGxAgEAoAMAIbYCAgDRAwAhtwIIAI4DACG4AggAjgMAIbkCCACOAwAhuwIBAKADACECAAAAIQAgGwAA_AMAIAIAAAD4AwAgGwAA-QMAIAz6AQAA9wMAMPsBAAD4AwAQ_AEAAPcDADD9AQEAoAMAIYMCAADOA7sCIpkCAQCgAwAhsQIBAKADACG2AgIA0QMAIbcCCACOAwAhuAIIAI4DACG5AggAjgMAIbsCAQCgAwAhDPoBAAD3AwAw-wEAAPgDABD8AQAA9wMAMP0BAQCgAwAhgwIAAM4DuwIimQIBAKADACGxAgEAoAMAIbYCAgDRAwAhtwIIAI4DACG4AggAjgMAIbkCCACOAwAhuwIBAKADACEI_QEBAOgDACGDAgAA-wO7AiKZAgEA6AMAIbYCAgD6AwAhtwIIAOsDACG4AggA6wMAIbkCCADrAwAhuwIBAOgDACEF6AICAAAAAe8CAgAAAAHwAgIAAAAB8QICAAAAAfICAgAAAAEB6AIAAAC7AgIKDgAA_gMAIBEAAP0DACD9AQEA6AMAIYMCAAD7A7sCIpkCAQDoAwAhtgICAPoDACG3AggA6wMAIbgCCADrAwAhuQIIAOsDACG7AgEA6AMAIQUiAADmBgAgIwAA7AYAIOUCAADnBgAg5gIAAOsGACDrAgAAMwAgBSIAAOQGACAjAADpBgAg5QIAAOUGACDmAgAA6AYAIOsCAAARACAKDgAAgQQAIBEAAIAEACD9AQEAAAABgwIAAAC7AgKZAgEAAAABtgICAAAAAbcCCAAAAAG4AggAAAABuQIIAAAAAbsCAQAAAAEDIgAA5gYAIOUCAADnBgAg6wIAADMAIAMiAADkBgAg5QIAAOUGACDrAgAAEQAgEw0AAL4EACAPAAC_BAAgEgAAwAQAIBQAAMEEACD9AQEAAAAB_gEBAAAAAf8BAQAAAAGDAgAAAK0CAoYCQAAAAAGHAkAAAAABqAIBAAAAAakCAQAAAAGqAgAAvAQAIKsCAgAAAAGtAggAAAABrgIIAAAAAa8CCAAAAAGwAgAAvQQAILICAQAAAAECAAAAEQAgIgAAuwQAIAMAAAARACAiAAC7BAAgIwAAjwQAIAEbAADjBgAwGAgAANYDACANAADeAwAgDwAAygMAIBIAAJIDACAUAAC1AwAg-gEAANwDADD7AQAADwAQ_AEAANwDADD9AQEAAAAB_gEBAKADACH_AQEAoAMAIYMCAADdA60CIoYCQACPAwAhhwJAAI8DACGoAgEAAAABqQIBAKADACGqAgAApQMAIKsCAgDRAwAhrQIIAI4DACGuAggAjgMAIa8CCACOAwAhsAIAAKUDACCxAgEAoAMAIbICAQCgAwAhAgAAABEAIBsAAI8EACACAAAAigQAIBsAAIsEACAT-gEAAIkEADD7AQAAigQAEPwBAACJBAAw_QEBAKADACH-AQEAoAMAIf8BAQCgAwAhgwIAAN0DrQIihgJAAI8DACGHAkAAjwMAIagCAQCgAwAhqQIBAKADACGqAgAApQMAIKsCAgDRAwAhrQIIAI4DACGuAggAjgMAIa8CCACOAwAhsAIAAKUDACCxAgEAoAMAIbICAQCgAwAhE_oBAACJBAAw-wEAAIoEABD8AQAAiQQAMP0BAQCgAwAh_gEBAKADACH_AQEAoAMAIYMCAADdA60CIoYCQACPAwAhhwJAAI8DACGoAgEAoAMAIakCAQCgAwAhqgIAAKUDACCrAgIA0QMAIa0CCACOAwAhrgIIAI4DACGvAggAjgMAIbACAAClAwAgsQIBAKADACGyAgEAoAMAIQ_9AQEA6AMAIf4BAQDoAwAh_wEBAOgDACGDAgAAjQStAiKGAkAA7AMAIYcCQADsAwAhqAIBAOgDACGpAgEA6AMAIaoCAACMBAAgqwICAPoDACGtAggA6wMAIa4CCADrAwAhrwIIAOsDACGwAgAAjgQAILICAQDoAwAhAugCAQAAAATuAgEAAAAFAegCAAAArQICAugCAQAAAATuAgEAAAAFEw0AAJAEACAPAACRBAAgEgAAkgQAIBQAAJMEACD9AQEA6AMAIf4BAQDoAwAh_wEBAOgDACGDAgAAjQStAiKGAkAA7AMAIYcCQADsAwAhqAIBAOgDACGpAgEA6AMAIaoCAACMBAAgqwICAPoDACGtAggA6wMAIa4CCADrAwAhrwIIAOsDACGwAgAAjgQAILICAQDoAwAhBSIAAMwGACAjAADhBgAg5QIAAM0GACDmAgAA4AYAIOsCAAAWACALIgAArQQAMCMAALIEADDlAgAArgQAMOYCAACvBAAw5wIAALAEACDoAgAAsQQAMOkCAACxBAAw6gIAALEEADDrAgAAsQQAMOwCAACzBAAw7QIAALQEADALIgAAogQAMCMAAKYEADDlAgAAowQAMOYCAACkBAAw5wIAAKUEACDoAgAA9AMAMOkCAAD0AwAw6gIAAPQDADDrAgAA9AMAMOwCAACnBAAw7QIAAPcDADALIgAAlAQAMCMAAJkEADDlAgAAlQQAMOYCAACWBAAw5wIAAJcEACDoAgAAmAQAMOkCAACYBAAw6gIAAJgEADDrAgAAmAQAMOwCAACaBAAw7QIAAJsEADAGEwAAoQQAIP0BAQAAAAGGAkAAAAABhwJAAAAAAbYCAgAAAAHJAgEAAAABAgAAACcAICIAAKAEACADAAAAJwAgIgAAoAQAICMAAJ4EACABGwAA3wYAMAwOAADTAwAgEwAA0gMAIPoBAADQAwAw-wEAACUAEPwBAADQAwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACGZAgEAoAMAIbYCAgDRAwAhyQIBAKADACHhAgAAzwMAIAIAAAAnACAbAACeBAAgAgAAAJwEACAbAACdBAAgCfoBAACbBAAw-wEAAJwEABD8AQAAmwQAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZkCAQCgAwAhtgICANEDACHJAgEAoAMAIQn6AQAAmwQAMPsBAACcBAAQ_AEAAJsEADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGZAgEAoAMAIbYCAgDRAwAhyQIBAKADACEF_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhtgICAPoDACHJAgEA6AMAIQYTAACfBAAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhtgICAPoDACHJAgEA6AMAIQUiAADaBgAgIwAA3QYAIOUCAADbBgAg5gIAANwGACDrAgAAsAEAIAYTAAChBAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABtgICAAAAAckCAQAAAAEDIgAA2gYAIOUCAADbBgAg6wIAALABACAKCAAArAQAIBEAAIAEACD9AQEAAAABgwIAAAC7AgKxAgEAAAABtgICAAAAAbcCCAAAAAG4AggAAAABuQIIAAAAAbsCAQAAAAECAAAAIQAgIgAAqwQAIAMAAAAhACAiAACrBAAgIwAAqQQAIAEbAADZBgAwAgAAACEAIBsAAKkEACACAAAA-AMAIBsAAKgEACAI_QEBAOgDACGDAgAA-wO7AiKxAgEA6AMAIbYCAgD6AwAhtwIIAOsDACG4AggA6wMAIbkCCADrAwAhuwIBAOgDACEKCAAAqgQAIBEAAP0DACD9AQEA6AMAIYMCAAD7A7sCIrECAQDoAwAhtgICAPoDACG3AggA6wMAIbgCCADrAwAhuQIIAOsDACG7AgEA6AMAIQUiAADUBgAgIwAA1wYAIOUCAADVBgAg5gIAANYGACDrAgAA4QIAIAoIAACsBAAgEQAAgAQAIP0BAQAAAAGDAgAAALsCArECAQAAAAG2AgIAAAABtwIIAAAAAbgCCAAAAAG5AggAAAABuwIBAAAAAQMiAADUBgAg5QIAANUGACDrAgAA4QIAIAcDAAC6BAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABlgICAAAAAZcCAQAAAAGYAgEAAAABAgAAAB0AICIAALkEACADAAAAHQAgIgAAuQQAICMAALcEACABGwAA0wYAMA0DAACQAwAgDgAA0wMAIPoBAADYAwAw-wEAABsAEPwBAADYAwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACGWAgIA0QMAIZcCAQCMAwAhmAIBAKADACGZAgEAoAMAIeICAADXAwAgAgAAAB0AIBsAALcEACACAAAAtQQAIBsAALYEACAK-gEAALQEADD7AQAAtQQAEPwBAAC0BAAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhlgICANEDACGXAgEAjAMAIZgCAQCgAwAhmQIBAKADACEK-gEAALQEADD7AQAAtQQAEPwBAAC0BAAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhlgICANEDACGXAgEAjAMAIZgCAQCgAwAhmQIBAKADACEG_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhlgICAPoDACGXAgEA6QMAIZgCAQDoAwAhBwMAALgEACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGWAgIA-gMAIZcCAQDpAwAhmAIBAOgDACEFIgAAzgYAICMAANEGACDlAgAAzwYAIOYCAADQBgAg6wIAAFIAIAcDAAC6BAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABlgICAAAAAZcCAQAAAAGYAgEAAAABAyIAAM4GACDlAgAAzwYAIOsCAABSACATDQAAvgQAIA8AAL8EACASAADABAAgFAAAwQQAIP0BAQAAAAH-AQEAAAAB_wEBAAAAAYMCAAAArQIChgJAAAAAAYcCQAAAAAGoAgEAAAABqQIBAAAAAaoCAAC8BAAgqwICAAAAAa0CCAAAAAGuAggAAAABrwIIAAAAAbACAAC9BAAgsgIBAAAAAQHoAgEAAAAEAegCAQAAAAQDIgAAzAYAIOUCAADNBgAg6wIAABYAIAQiAACtBAAw5QIAAK4EADDnAgAAsAQAIOsCAACxBAAwBCIAAKIEADDlAgAAowQAMOcCAAClBAAg6wIAAPQDADAEIgAAlAQAMOUCAACVBAAw5wIAAJcEACDrAgAAmAQAMAMiAADKBgAg5QIAAMsGACDrAgAAUgAgBCIAAIIEADDlAgAAgwQAMOcCAACFBAAg6wIAAIYEADAEIgAA8AMAMOUCAADxAwAw5wIAAPMDACDrAgAA9AMAMAkEAACFBgAgBQAAhgYAIAYAAIcGACAIAACIBgAgDwAAiwYAIBMAAIoGACAVAACJBgAgoQIAAOIDACDGAgAA4gMAIAAAAAAAAAAFIgAAxQYAICMAAMgGACDlAgAAxgYAIOYCAADHBgAg6wIAABEAIAMiAADFBgAg5QIAAMYGACDrAgAAEQAgAAAAAegCIAAAAAEB6AJAAAAAAQAAAAAABSIAAMAGACAjAADDBgAg5QIAAMEGACDmAgAAwgYAIOsCAADhAgAgAyIAAMAGACDlAgAAwQYAIOsCAADhAgAgAAAAAAAAAAAAAAHoAgAAAL4CAgUiAAC6BgAgIwAAvgYAIOUCAAC7BgAg5gIAAL0GACDrAgAAUgAgCyIAAOgEADAjAADsBAAw5QIAAOkEADDmAgAA6gQAMOcCAADrBAAg6AIAAPQDADDpAgAA9AMAMOoCAAD0AwAw6wIAAPQDADDsAgAA7QQAMO0CAAD3AwAwCggAAKwEACAOAACBBAAg_QEBAAAAAYMCAAAAuwICmQIBAAAAAbECAQAAAAG2AgIAAAABtwIIAAAAAbgCCAAAAAG5AggAAAABAgAAACEAICIAAPAEACADAAAAIQAgIgAA8AQAICMAAO8EACABGwAAvAYAMAIAAAAhACAbAADvBAAgAgAAAPgDACAbAADuBAAgCP0BAQDoAwAhgwIAAPsDuwIimQIBAOgDACGxAgEA6AMAIbYCAgD6AwAhtwIIAOsDACG4AggA6wMAIbkCCADrAwAhCggAAKoEACAOAAD-AwAg_QEBAOgDACGDAgAA-wO7AiKZAgEA6AMAIbECAQDoAwAhtgICAPoDACG3AggA6wMAIbgCCADrAwAhuQIIAOsDACEKCAAArAQAIA4AAIEEACD9AQEAAAABgwIAAAC7AgKZAgEAAAABsQIBAAAAAbYCAgAAAAG3AggAAAABuAIIAAAAAbkCCAAAAAEDIgAAugYAIOUCAAC7BgAg6wIAAFIAIAQiAADoBAAw5QIAAOkEADDnAgAA6wQAIOsCAAD0AwAwAAAAByIAALMGACAjAAC4BgAg5QIAALQGACDmAgAAtwYAIOkCAAATACDqAgAAEwAg6wIAABYAIAsiAACCBQAwIwAAhwUAMOUCAACDBQAw5gIAAIQFADDnAgAAhQUAIOgCAACGBQAw6QIAAIYFADDqAgAAhgUAMOsCAACGBQAw7AIAAIgFADDtAgAAiQUAMAsiAAD5BAAwIwAA_QQAMOUCAAD6BAAw5gIAAPsEADDnAgAA_AQAIOgCAACGBAAw6QIAAIYEADDqAgAAhgQAMOsCAACGBAAw7AIAAP4EADDtAgAAiQQAMBMIAADaBAAgDwAAvwQAIBIAAMAEACAUAADBBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgwIAAACtAgKGAkAAAAABhwJAAAAAAagCAQAAAAGpAgEAAAABqgIAALwEACCrAgIAAAABrQIIAAAAAa4CCAAAAAGvAggAAAABsAIAAL0EACCxAgEAAAABAgAAABEAICIAAIEFACADAAAAEQAgIgAAgQUAICMAAIAFACABGwAAtgYAMAIAAAARACAbAACABQAgAgAAAIoEACAbAAD_BAAgD_0BAQDoAwAh_gEBAOgDACH_AQEA6AMAIYMCAACNBK0CIoYCQADsAwAhhwJAAOwDACGoAgEA6AMAIakCAQDoAwAhqgIAAIwEACCrAgIA-gMAIa0CCADrAwAhrgIIAOsDACGvAggA6wMAIbACAACOBAAgsQIBAOgDACETCAAA2QQAIA8AAJEEACASAACSBAAgFAAAkwQAIP0BAQDoAwAh_gEBAOgDACH_AQEA6AMAIYMCAACNBK0CIoYCQADsAwAhhwJAAOwDACGoAgEA6AMAIakCAQDoAwAhqgIAAIwEACCrAgIA-gMAIa0CCADrAwAhrgIIAOsDACGvAggA6wMAIbACAACOBAAgsQIBAOgDACETCAAA2gQAIA8AAL8EACASAADABAAgFAAAwQQAIP0BAQAAAAH-AQEAAAAB_wEBAAAAAYMCAAAArQIChgJAAAAAAYcCQAAAAAGoAgEAAAABqQIBAAAAAaoCAAC8BAAgqwICAAAAAa0CCAAAAAGuAggAAAABrwIIAAAAAbACAAC9BAAgsQIBAAAAAQoKAACOBQAgCwAAjwUAIP0BAQAAAAH-AQEAAAABhgJAAAAAAYcCQAAAAAGoAgEAAAABxQIBAAAAAcYCAQAAAAHHAiAAAAABAgAAABYAICIAAI0FACADAAAAFgAgIgAAjQUAICMAAIwFACABGwAAtQYAMA8JAADaAwAgCgAA2wMAIAsAAJEDACD6AQAA2QMAMPsBAAATABD8AQAA2QMAMP0BAQAAAAH-AQEAAAABhgJAAI8DACGHAkAAjwMAIagCAQAAAAHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIQIAAAAWACAbAACMBQAgAgAAAIoFACAbAACLBQAgDPoBAACJBQAw-wEAAIoFABD8AQAAiQUAMP0BAQCgAwAh_gEBAKADACGGAkAAjwMAIYcCQACPAwAhqAIBAKADACHFAgEAjAMAIcYCAQCMAwAhxwIgAKIDACHIAgEAjAMAIQz6AQAAiQUAMPsBAACKBQAQ_AEAAIkFADD9AQEAoAMAIf4BAQCgAwAhhgJAAI8DACGHAkAAjwMAIagCAQCgAwAhxQIBAIwDACHGAgEAjAMAIccCIACiAwAhyAIBAIwDACEI_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIQoKAAD3BAAgCwAA-AQAIP0BAQDoAwAh_gEBAOgDACGGAkAA7AMAIYcCQADsAwAhqAIBAOgDACHFAgEA6QMAIcYCAQDpAwAhxwIgANIEACEKCgAAjgUAIAsAAI8FACD9AQEAAAAB_gEBAAAAAYYCQAAAAAGHAkAAAAABqAIBAAAAAcUCAQAAAAHGAgEAAAABxwIgAAAAAQQiAACCBQAw5QIAAIMFADDnAgAAhQUAIOsCAACGBQAwBCIAAPkEADDlAgAA-gQAMOcCAAD8BAAg6wIAAIYEADADIgAAswYAIOUCAAC0BgAg6wIAABYAIAAAAAAABSIAAK4GACAjAACxBgAg5QIAAK8GACDmAgAAsAYAIOsCAAARACADIgAArgYAIOUCAACvBgAg6wIAABEAIAAAAAsiAACdBQAwIwAAoQUAMOUCAACeBQAw5gIAAJ8FADDnAgAAoAUAIOgCAACYBAAw6QIAAJgEADDqAgAAmAQAMOsCAACYBAAw7AIAAKIFADDtAgAAmwQAMAUiAACoBgAgIwAArAYAIOUCAACpBgAg5gIAAKsGACDrAgAAUgAgBg4AAJcFACD9AQEAAAABhgJAAAAAAYcCQAAAAAGZAgEAAAABtgICAAAAAQIAAAAnACAiAAClBQAgAwAAACcAICIAAKUFACAjAACkBQAgARsAAKoGADACAAAAJwAgGwAApAUAIAIAAACcBAAgGwAAowUAIAX9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGZAgEA6AMAIbYCAgD6AwAhBg4AAJYFACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGZAgEA6AMAIbYCAgD6AwAhBg4AAJcFACD9AQEAAAABhgJAAAAAAYcCQAAAAAGZAgEAAAABtgICAAAAAQQiAACdBQAw5QIAAJ4FADDnAgAAoAUAIOsCAACYBAAwAyIAAKgGACDlAgAAqQYAIOsCAABSACAAAAAAAAAABSIAAKMGACAjAACmBgAg5QIAAKQGACDmAgAApQYAIOsCAABSACADIgAAowYAIOUCAACkBgAg6wIAAFIAIAAAAAUiAACeBgAgIwAAoQYAIOUCAACfBgAg5gIAAKAGACDrAgAAUgAgAyIAAJ4GACDlAgAAnwYAIOsCAABSACAAAAAB6AIAAADcAgIB6AIAAADeAgILIgAA8gUAMCMAAPcFADDlAgAA8wUAMOYCAAD0BQAw5wIAAPUFACDoAgAA9gUAMOkCAAD2BQAw6gIAAPYFADDrAgAA9gUAMOwCAAD4BQAw7QIAAPkFADALIgAA5gUAMCMAAOsFADDlAgAA5wUAMOYCAADoBQAw5wIAAOkFACDoAgAA6gUAMOkCAADqBQAw6gIAAOoFADDrAgAA6gUAMOwCAADsBQAw7QIAAO0FADAHIgAA4QUAICMAAOQFACDlAgAA4gUAIOYCAADjBQAg6QIAAAsAIOoCAAALACDrAgAAAQAgByIAANwFACAjAADfBQAg5QIAAN0FACDmAgAA3gUAIOkCAAANACDqAgAADQAg6wIAAOECACALIgAA0AUAMCMAANUFADDlAgAA0QUAMOYCAADSBQAw5wIAANMFACDoAgAA1AUAMOkCAADUBQAw6gIAANQFADDrAgAA1AUAMOwCAADWBQAw7QIAANcFADAHIgAAywUAICMAAM4FACDlAgAAzAUAIOYCAADNBQAg6QIAADUAIOoCAAA1ACDrAgAAsAEAIAsiAADCBQAwIwAAxgUAMOUCAADDBQAw5gIAAMQFADDnAgAAxQUAIOgCAACxBAAw6QIAALEEADDqAgAAsQQAMOsCAACxBAAw7AIAAMcFADDtAgAAtAQAMAcOAADOBAAg_QEBAAAAAYYCQAAAAAGHAkAAAAABlgICAAAAAZcCAQAAAAGZAgEAAAABAgAAAB0AICIAAMoFACADAAAAHQAgIgAAygUAICMAAMkFACABGwAAnQYAMAIAAAAdACAbAADJBQAgAgAAALUEACAbAADIBQAgBv0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIZYCAgD6AwAhlwIBAOkDACGZAgEA6AMAIQcOAADNBAAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhlgICAPoDACGXAgEA6QMAIZkCAQDoAwAhBw4AAM4EACD9AQEAAAABhgJAAAAAAYcCQAAAAAGWAgIAAAABlwIBAAAAAZkCAQAAAAEEEAAApgUAIP0BAQAAAAGGAkAAAAABhwJAAAAAAQIAAACwAQAgIgAAywUAIAMAAAA1ACAiAADLBQAgIwAAzwUAIAYAAAA1ACAQAACbBQAgGwAAzwUAIP0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIQQQAACbBQAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhDBAAAPIEACD9AQEAAAABhgJAAAAAAYcCQAAAAAG8AggAAAABvgIAAAC-AgK_AgAAALsCAsACAQAAAAHBAgEAAAABwgIBAAAAAcMCAQAAAAHEAgEAAAABAgAAADMAICIAANsFACADAAAAMwAgIgAA2wUAICMAANoFACABGwAAnAYAMBEDAACQAwAgEAAAkgMAIPoBAADMAwAw-wEAADEAEPwBAADMAwAw_QEBAAAAAYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIbwCCACOAwAhvgIAAM0DvgIivwIAAM4DuwIiwAIBAKADACHBAgEAoAMAIcICAQCgAwAhwwIBAKADACHEAgEAjAMAIQIAAAAzACAbAADaBQAgAgAAANgFACAbAADZBQAgD_oBAADXBQAw-wEAANgFABD8AQAA1wUAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhvAIIAI4DACG-AgAAzQO-AiK_AgAAzgO7AiLAAgEAoAMAIcECAQCgAwAhwgIBAKADACHDAgEAoAMAIcQCAQCMAwAhD_oBAADXBQAw-wEAANgFABD8AQAA1wUAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhvAIIAI4DACG-AgAAzQO-AiK_AgAAzgO7AiLAAgEAoAMAIcECAQCgAwAhwgIBAKADACHDAgEAoAMAIcQCAQCMAwAhC_0BAQDoAwAhhgJAAOwDACGHAkAA7AMAIbwCCADrAwAhvgIAAOUEvgIivwIAAPsDuwIiwAIBAOgDACHBAgEA6AMAIcICAQDoAwAhwwIBAOgDACHEAgEA6QMAIQwQAADnBAAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhvAIIAOsDACG-AgAA5QS-AiK_AgAA-wO7AiLAAgEA6AMAIcECAQDoAwAhwgIBAOgDACHDAgEA6AMAIcQCAQDpAwAhDBAAAPIEACD9AQEAAAABhgJAAAAAAYcCQAAAAAG8AggAAAABvgIAAAC-AgK_AgAAALsCAsACAQAAAAHBAgEAAAABwgIBAAAAAcMCAQAAAAHEAgEAAAABCwsAAMMEACASAADEBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgAIBAAAAAYECAQAAAAGDAgAAAIMCAoQCCAAAAAGGAkAAAAABhwJAAAAAAQIAAADhAgAgIgAA3AUAIAMAAAANACAiAADcBQAgIwAA4AUAIA0AAAANACALAADuAwAgEgAA7wMAIBsAAOAFACD9AQEA6AMAIf4BAQDoAwAh_wEBAOkDACGAAgEA6QMAIYECAQDpAwAhgwIAAOoDgwIihAIIAOsDACGGAkAA7AMAIYcCQADsAwAhCwsAAO4DACASAADvAwAg_QEBAOgDACH-AQEA6AMAIf8BAQDpAwAhgAIBAOkDACGBAgEA6QMAIYMCAADqA4MCIoQCCADrAwAhhgJAAOwDACGHAkAA7AMAIQn9AQEAAAAB_gEBAAAAAYYCQAAAAAGHAkAAAAABoAIgAAAAAaECQAAAAAHZAgEAAAAB3wIBAAAAAeACAQAAAAECAAAAAQAgIgAA4QUAIAMAAAALACAiAADhBQAgIwAA5QUAIAsAAAALACAbAADlBQAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGgAiAA0gQAIaECQADTBAAh2QIBAOgDACHfAgEA6QMAIeACAQDpAwAhCf0BAQDoAwAh_gEBAOgDACGGAkAA7AMAIYcCQADsAwAhoAIgANIEACGhAkAA0wQAIdkCAQDoAwAh3wIBAOkDACHgAgEA6QMAIQz9AQEAAAABhgJAAAAAAYcCQAAAAAHNAgEAAAABzgIBAAAAAc8CAQAAAAHQAgEAAAAB0QIBAAAAAdICQAAAAAHTAkAAAAAB1AIBAAAAAdUCAQAAAAECAAAACQAgIgAA8QUAIAMAAAAJACAiAADxBQAgIwAA8AUAIAEbAACbBgAwEQMAAJADACD6AQAA4AMAMPsBAAAHABD8AQAA4AMAMP0BAQAAAAGGAkAAjwMAIYcCQACPAwAhmAIBAKADACHNAgEAoAMAIc4CAQCgAwAhzwIBAIwDACHQAgEAjAMAIdECAQCMAwAh0gJAAKMDACHTAkAAowMAIdQCAQCMAwAh1QIBAIwDACECAAAACQAgGwAA8AUAIAIAAADuBQAgGwAA7wUAIBD6AQAA7QUAMPsBAADuBQAQ_AEAAO0FADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIc0CAQCgAwAhzgIBAKADACHPAgEAjAMAIdACAQCMAwAh0QIBAIwDACHSAkAAowMAIdMCQACjAwAh1AIBAIwDACHVAgEAjAMAIRD6AQAA7QUAMPsBAADuBQAQ_AEAAO0FADD9AQEAoAMAIYYCQACPAwAhhwJAAI8DACGYAgEAoAMAIc0CAQCgAwAhzgIBAKADACHPAgEAjAMAIdACAQCMAwAh0QIBAIwDACHSAkAAowMAIdMCQACjAwAh1AIBAIwDACHVAgEAjAMAIQz9AQEA6AMAIYYCQADsAwAhhwJAAOwDACHNAgEA6AMAIc4CAQDoAwAhzwIBAOkDACHQAgEA6QMAIdECAQDpAwAh0gJAANMEACHTAkAA0wQAIdQCAQDpAwAh1QIBAOkDACEM_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhzQIBAOgDACHOAgEA6AMAIc8CAQDpAwAh0AIBAOkDACHRAgEA6QMAIdICQADTBAAh0wJAANMEACHUAgEA6QMAIdUCAQDpAwAhDP0BAQAAAAGGAkAAAAABhwJAAAAAAc0CAQAAAAHOAgEAAAABzwIBAAAAAdACAQAAAAHRAgEAAAAB0gJAAAAAAdMCQAAAAAHUAgEAAAAB1QIBAAAAAQf9AQEAAAABhgJAAAAAAYcCQAAAAAHMAkAAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAABAgAAAAUAICIAAP0FACADAAAABQAgIgAA_QUAICMAAPwFACABGwAAmgYAMAwDAACQAwAg-gEAAOEDADD7AQAAAwAQ_AEAAOEDADD9AQEAAAABhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhzAJAAI8DACHWAgEAAAAB1wIBAIwDACHYAgEAjAMAIQIAAAAFACAbAAD8BQAgAgAAAPoFACAbAAD7BQAgC_oBAAD5BQAw-wEAAPoFABD8AQAA-QUAMP0BAQCgAwAhhgJAAI8DACGHAkAAjwMAIZgCAQCgAwAhzAJAAI8DACHWAgEAoAMAIdcCAQCMAwAh2AIBAIwDACEL-gEAAPkFADD7AQAA-gUAEPwBAAD5BQAw_QEBAKADACGGAkAAjwMAIYcCQACPAwAhmAIBAKADACHMAkAAjwMAIdYCAQCgAwAh1wIBAIwDACHYAgEAjAMAIQf9AQEA6AMAIYYCQADsAwAhhwJAAOwDACHMAkAA7AMAIdYCAQDoAwAh1wIBAOkDACHYAgEA6QMAIQf9AQEA6AMAIYYCQADsAwAhhwJAAOwDACHMAkAA7AMAIdYCAQDoAwAh1wIBAOkDACHYAgEA6QMAIQf9AQEAAAABhgJAAAAAAYcCQAAAAAHMAkAAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAABBCIAAPIFADDlAgAA8wUAMOcCAAD1BQAg6wIAAPYFADAEIgAA5gUAMOUCAADnBQAw5wIAAOkFACDrAgAA6gUAMAMiAADhBQAg5QIAAOIFACDrAgAAAQAgAyIAANwFACDlAgAA3QUAIOsCAADhAgAgBCIAANAFADDlAgAA0QUAMOcCAADTBQAg6wIAANQFADADIgAAywUAIOUCAADMBQAg6wIAALABACAEIgAAwgUAMOUCAADDBQAw5wIAAMUFACDrAgAAsQQAMAAABAMAAMUEACChAgAA4gMAIN8CAADiAwAg4AIAAOIDACAGBwAAxQQAIAsAAMYEACASAADHBAAg_wEAAOIDACCAAgAA4gMAIIECAADiAwAgAAIDAADFBAAgEAAAqAUAIAAAAAAFIgAAlQYAICMAAJgGACDlAgAAlgYAIOYCAACXBgAg6wIAAFIAIAMiAACVBgAg5QIAAJYGACDrAgAAUgAgBQgAAIgGACANAACTBgAgDwAAiwYAIBIAAMcEACAUAACoBQAgAwMAAMUEACAQAADHBAAgxAIAAOIDACAGCQAAkwYAIAoAAJQGACALAADGBAAgxQIAAOIDACDGAgAA4gMAIMgCAADiAwAgABIEAAD-BQAgBQAA_wUAIAgAAIEGACAPAACEBgAgEwAAgwYAIBUAAIIGACD9AQEAAAAB_gEBAAAAAYMCAAAA3gIChgJAAAAAAYcCQAAAAAGgAiAAAAABoQJAAAAAAcYCAQAAAAHZAgEAAAAB2gIgAAAAAdwCAAAA3AIC3gIgAAAAAQIAAABSACAiAACVBgAgAwAAAFUAICIAAJUGACAjAACZBgAgFAAAAFUAIAQAALsFACAFAAC8BQAgCAAAvgUAIA8AAMEFACATAADABQAgFQAAvwUAIBsAAJkGACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAC7BQAgBQAAvAUAIAgAAL4FACAPAADBBQAgEwAAwAUAIBUAAL8FACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIQf9AQEAAAABhgJAAAAAAYcCQAAAAAHMAkAAAAAB1gIBAAAAAdcCAQAAAAHYAgEAAAABDP0BAQAAAAGGAkAAAAABhwJAAAAAAc0CAQAAAAHOAgEAAAABzwIBAAAAAdACAQAAAAHRAgEAAAAB0gJAAAAAAdMCQAAAAAHUAgEAAAAB1QIBAAAAAQv9AQEAAAABhgJAAAAAAYcCQAAAAAG8AggAAAABvgIAAAC-AgK_AgAAALsCAsACAQAAAAHBAgEAAAABwgIBAAAAAcMCAQAAAAHEAgEAAAABBv0BAQAAAAGGAkAAAAABhwJAAAAAAZYCAgAAAAGXAgEAAAABmQIBAAAAARIFAAD_BQAgBgAAgAYAIAgAAIEGACAPAACEBgAgEwAAgwYAIBUAAIIGACD9AQEAAAAB_gEBAAAAAYMCAAAA3gIChgJAAAAAAYcCQAAAAAGgAiAAAAABoQJAAAAAAcYCAQAAAAHZAgEAAAAB2gIgAAAAAdwCAAAA3AIC3gIgAAAAAQIAAABSACAiAACeBgAgAwAAAFUAICIAAJ4GACAjAACiBgAgFAAAAFUAIAUAALwFACAGAAC9BQAgCAAAvgUAIA8AAMEFACATAADABQAgFQAAvwUAIBsAAKIGACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIFAAC8BQAgBgAAvQUAIAgAAL4FACAPAADBBQAgEwAAwAUAIBUAAL8FACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAD-BQAgBgAAgAYAIAgAAIEGACAPAACEBgAgEwAAgwYAIBUAAIIGACD9AQEAAAAB_gEBAAAAAYMCAAAA3gIChgJAAAAAAYcCQAAAAAGgAiAAAAABoQJAAAAAAcYCAQAAAAHZAgEAAAAB2gIgAAAAAdwCAAAA3AIC3gIgAAAAAQIAAABSACAiAACjBgAgAwAAAFUAICIAAKMGACAjAACnBgAgFAAAAFUAIAQAALsFACAGAAC9BQAgCAAAvgUAIA8AAMEFACATAADABQAgFQAAvwUAIBsAAKcGACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAC7BQAgBgAAvQUAIAgAAL4FACAPAADBBQAgEwAAwAUAIBUAAL8FACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAD-BQAgBQAA_wUAIAYAAIAGACAIAACBBgAgDwAAhAYAIBUAAIIGACD9AQEAAAAB_gEBAAAAAYMCAAAA3gIChgJAAAAAAYcCQAAAAAGgAiAAAAABoQJAAAAAAcYCAQAAAAHZAgEAAAAB2gIgAAAAAdwCAAAA3AIC3gIgAAAAAQIAAABSACAiAACoBgAgBf0BAQAAAAGGAkAAAAABhwJAAAAAAZkCAQAAAAG2AgIAAAABAwAAAFUAICIAAKgGACAjAACtBgAgFAAAAFUAIAQAALsFACAFAAC8BQAgBgAAvQUAIAgAAL4FACAPAADBBQAgFQAAvwUAIBsAAK0GACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAC7BQAgBQAAvAUAIAYAAL0FACAIAAC-BQAgDwAAwQUAIBUAAL8FACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRQIAADaBAAgDQAAvgQAIA8AAL8EACASAADABAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgwIAAACtAgKGAkAAAAABhwJAAAAAAagCAQAAAAGpAgEAAAABqgIAALwEACCrAgIAAAABrQIIAAAAAa4CCAAAAAGvAggAAAABsAIAAL0EACCxAgEAAAABsgIBAAAAAQIAAAARACAiAACuBgAgAwAAAA8AICIAAK4GACAjAACyBgAgFgAAAA8AIAgAANkEACANAACQBAAgDwAAkQQAIBIAAJIEACAbAACyBgAg_QEBAOgDACH-AQEA6AMAIf8BAQDoAwAhgwIAAI0ErQIihgJAAOwDACGHAkAA7AMAIagCAQDoAwAhqQIBAOgDACGqAgAAjAQAIKsCAgD6AwAhrQIIAOsDACGuAggA6wMAIa8CCADrAwAhsAIAAI4EACCxAgEA6AMAIbICAQDoAwAhFAgAANkEACANAACQBAAgDwAAkQQAIBIAAJIEACD9AQEA6AMAIf4BAQDoAwAh_wEBAOgDACGDAgAAjQStAiKGAkAA7AMAIYcCQADsAwAhqAIBAOgDACGpAgEA6AMAIaoCAACMBAAgqwICAPoDACGtAggA6wMAIa4CCADrAwAhrwIIAOsDACGwAgAAjgQAILECAQDoAwAhsgIBAOgDACELCQAAkAUAIAsAAI8FACD9AQEAAAAB_gEBAAAAAYYCQAAAAAGHAkAAAAABqAIBAAAAAcUCAQAAAAHGAgEAAAABxwIgAAAAAcgCAQAAAAECAAAAFgAgIgAAswYAIAj9AQEAAAAB_gEBAAAAAYYCQAAAAAGHAkAAAAABqAIBAAAAAcUCAQAAAAHGAgEAAAABxwIgAAAAAQ_9AQEAAAAB_gEBAAAAAf8BAQAAAAGDAgAAAK0CAoYCQAAAAAGHAkAAAAABqAIBAAAAAakCAQAAAAGqAgAAvAQAIKsCAgAAAAGtAggAAAABrgIIAAAAAa8CCAAAAAGwAgAAvQQAILECAQAAAAEDAAAAEwAgIgAAswYAICMAALkGACANAAAAEwAgCQAA9gQAIAsAAPgEACAbAAC5BgAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhCwkAAPYEACALAAD4BAAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhEgQAAP4FACAFAAD_BQAgBgAAgAYAIAgAAIEGACAPAACEBgAgEwAAgwYAIP0BAQAAAAH-AQEAAAABgwIAAADeAgKGAkAAAAABhwJAAAAAAaACIAAAAAGhAkAAAAABxgIBAAAAAdkCAQAAAAHaAiAAAAAB3AIAAADcAgLeAiAAAAABAgAAAFIAICIAALoGACAI_QEBAAAAAYMCAAAAuwICmQIBAAAAAbECAQAAAAG2AgIAAAABtwIIAAAAAbgCCAAAAAG5AggAAAABAwAAAFUAICIAALoGACAjAAC_BgAgFAAAAFUAIAQAALsFACAFAAC8BQAgBgAAvQUAIAgAAL4FACAPAADBBQAgEwAAwAUAIBsAAL8GACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAC7BQAgBQAAvAUAIAYAAL0FACAIAAC-BQAgDwAAwQUAIBMAAMAFACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIQwHAADCBAAgEgAAxAQAIP0BAQAAAAH-AQEAAAAB_wEBAAAAAYACAQAAAAGBAgEAAAABgwIAAACDAgKEAggAAAABhQIBAAAAAYYCQAAAAAGHAkAAAAABAgAAAOECACAiAADABgAgAwAAAA0AICIAAMAGACAjAADEBgAgDgAAAA0AIAcAAO0DACASAADvAwAgGwAAxAYAIP0BAQDoAwAh_gEBAOgDACH_AQEA6QMAIYACAQDpAwAhgQIBAOkDACGDAgAA6gODAiKEAggA6wMAIYUCAQDoAwAhhgJAAOwDACGHAkAA7AMAIQwHAADtAwAgEgAA7wMAIP0BAQDoAwAh_gEBAOgDACH_AQEA6QMAIYACAQDpAwAhgQIBAOkDACGDAgAA6gODAiKEAggA6wMAIYUCAQDoAwAhhgJAAOwDACGHAkAA7AMAIRQIAADaBAAgDQAAvgQAIBIAAMAEACAUAADBBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgwIAAACtAgKGAkAAAAABhwJAAAAAAagCAQAAAAGpAgEAAAABqgIAALwEACCrAgIAAAABrQIIAAAAAa4CCAAAAAGvAggAAAABsAIAAL0EACCxAgEAAAABsgIBAAAAAQIAAAARACAiAADFBgAgAwAAAA8AICIAAMUGACAjAADJBgAgFgAAAA8AIAgAANkEACANAACQBAAgEgAAkgQAIBQAAJMEACAbAADJBgAg_QEBAOgDACH-AQEA6AMAIf8BAQDoAwAhgwIAAI0ErQIihgJAAOwDACGHAkAA7AMAIagCAQDoAwAhqQIBAOgDACGqAgAAjAQAIKsCAgD6AwAhrQIIAOsDACGuAggA6wMAIa8CCADrAwAhsAIAAI4EACCxAgEA6AMAIbICAQDoAwAhFAgAANkEACANAACQBAAgEgAAkgQAIBQAAJMEACD9AQEA6AMAIf4BAQDoAwAh_wEBAOgDACGDAgAAjQStAiKGAkAA7AMAIYcCQADsAwAhqAIBAOgDACGpAgEA6AMAIaoCAACMBAAgqwICAPoDACGtAggA6wMAIa4CCADrAwAhrwIIAOsDACGwAgAAjgQAILECAQDoAwAhsgIBAOgDACESBAAA_gUAIAUAAP8FACAGAACABgAgDwAAhAYAIBMAAIMGACAVAACCBgAg_QEBAAAAAf4BAQAAAAGDAgAAAN4CAoYCQAAAAAGHAkAAAAABoAIgAAAAAaECQAAAAAHGAgEAAAAB2QIBAAAAAdoCIAAAAAHcAgAAANwCAt4CIAAAAAECAAAAUgAgIgAAygYAIAsJAACQBQAgCgAAjgUAIP0BAQAAAAH-AQEAAAABhgJAAAAAAYcCQAAAAAGoAgEAAAABxQIBAAAAAcYCAQAAAAHHAiAAAAAByAIBAAAAAQIAAAAWACAiAADMBgAgEgQAAP4FACAFAAD_BQAgBgAAgAYAIAgAAIEGACATAACDBgAgFQAAggYAIP0BAQAAAAH-AQEAAAABgwIAAADeAgKGAkAAAAABhwJAAAAAAaACIAAAAAGhAkAAAAABxgIBAAAAAdkCAQAAAAHaAiAAAAAB3AIAAADcAgLeAiAAAAABAgAAAFIAICIAAM4GACADAAAAVQAgIgAAzgYAICMAANIGACAUAAAAVQAgBAAAuwUAIAUAALwFACAGAAC9BQAgCAAAvgUAIBMAAMAFACAVAAC_BQAgGwAA0gYAIP0BAQDoAwAh_gEBAOgDACGDAgAAugXeAiKGAkAA7AMAIYcCQADsAwAhoAIgANIEACGhAkAA0wQAIcYCAQDpAwAh2QIBAOgDACHaAiAA0gQAIdwCAAC5BdwCIt4CIADSBAAhEgQAALsFACAFAAC8BQAgBgAAvQUAIAgAAL4FACATAADABQAgFQAAvwUAIP0BAQDoAwAh_gEBAOgDACGDAgAAugXeAiKGAkAA7AMAIYcCQADsAwAhoAIgANIEACGhAkAA0wQAIcYCAQDpAwAh2QIBAOgDACHaAiAA0gQAIdwCAAC5BdwCIt4CIADSBAAhBv0BAQAAAAGGAkAAAAABhwJAAAAAAZYCAgAAAAGXAgEAAAABmAIBAAAAAQwHAADCBAAgCwAAwwQAIP0BAQAAAAH-AQEAAAAB_wEBAAAAAYACAQAAAAGBAgEAAAABgwIAAACDAgKEAggAAAABhQIBAAAAAYYCQAAAAAGHAkAAAAABAgAAAOECACAiAADUBgAgAwAAAA0AICIAANQGACAjAADYBgAgDgAAAA0AIAcAAO0DACALAADuAwAgGwAA2AYAIP0BAQDoAwAh_gEBAOgDACH_AQEA6QMAIYACAQDpAwAhgQIBAOkDACGDAgAA6gODAiKEAggA6wMAIYUCAQDoAwAhhgJAAOwDACGHAkAA7AMAIQwHAADtAwAgCwAA7gMAIP0BAQDoAwAh_gEBAOgDACH_AQEA6QMAIYACAQDpAwAhgQIBAOkDACGDAgAA6gODAiKEAggA6wMAIYUCAQDoAwAhhgJAAOwDACGHAkAA7AMAIQj9AQEAAAABgwIAAAC7AgKxAgEAAAABtgICAAAAAbcCCAAAAAG4AggAAAABuQIIAAAAAbsCAQAAAAEFAwAApwUAIP0BAQAAAAGGAkAAAAABhwJAAAAAAZgCAQAAAAECAAAAsAEAICIAANoGACADAAAANQAgIgAA2gYAICMAAN4GACAHAAAANQAgAwAAnAUAIBsAAN4GACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGYAgEA6AMAIQUDAACcBQAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmAIBAOgDACEF_QEBAAAAAYYCQAAAAAGHAkAAAAABtgICAAAAAckCAQAAAAEDAAAAEwAgIgAAzAYAICMAAOIGACANAAAAEwAgCQAA9gQAIAoAAPcEACAbAADiBgAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhCwkAAPYEACAKAAD3BAAg_QEBAOgDACH-AQEA6AMAIYYCQADsAwAhhwJAAOwDACGoAgEA6AMAIcUCAQDpAwAhxgIBAOkDACHHAiAA0gQAIcgCAQDpAwAhD_0BAQAAAAH-AQEAAAAB_wEBAAAAAYMCAAAArQIChgJAAAAAAYcCQAAAAAGoAgEAAAABqQIBAAAAAaoCAAC8BAAgqwICAAAAAa0CCAAAAAGuAggAAAABrwIIAAAAAbACAAC9BAAgsgIBAAAAARQIAADaBAAgDQAAvgQAIA8AAL8EACAUAADBBAAg_QEBAAAAAf4BAQAAAAH_AQEAAAABgwIAAACtAgKGAkAAAAABhwJAAAAAAagCAQAAAAGpAgEAAAABqgIAALwEACCrAgIAAAABrQIIAAAAAa4CCAAAAAGvAggAAAABsAIAAL0EACCxAgEAAAABsgIBAAAAAQIAAAARACAiAADkBgAgDQMAAPEEACD9AQEAAAABhgJAAAAAAYcCQAAAAAGYAgEAAAABvAIIAAAAAb4CAAAAvgICvwIAAAC7AgLAAgEAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAQIAAAAzACAiAADmBgAgAwAAAA8AICIAAOQGACAjAADqBgAgFgAAAA8AIAgAANkEACANAACQBAAgDwAAkQQAIBQAAJMEACAbAADqBgAg_QEBAOgDACH-AQEA6AMAIf8BAQDoAwAhgwIAAI0ErQIihgJAAOwDACGHAkAA7AMAIagCAQDoAwAhqQIBAOgDACGqAgAAjAQAIKsCAgD6AwAhrQIIAOsDACGuAggA6wMAIa8CCADrAwAhsAIAAI4EACCxAgEA6AMAIbICAQDoAwAhFAgAANkEACANAACQBAAgDwAAkQQAIBQAAJMEACD9AQEA6AMAIf4BAQDoAwAh_wEBAOgDACGDAgAAjQStAiKGAkAA7AMAIYcCQADsAwAhqAIBAOgDACGpAgEA6AMAIaoCAACMBAAgqwICAPoDACGtAggA6wMAIa4CCADrAwAhrwIIAOsDACGwAgAAjgQAILECAQDoAwAhsgIBAOgDACEDAAAAMQAgIgAA5gYAICMAAO0GACAPAAAAMQAgAwAA5gQAIBsAAO0GACD9AQEA6AMAIYYCQADsAwAhhwJAAOwDACGYAgEA6AMAIbwCCADrAwAhvgIAAOUEvgIivwIAAPsDuwIiwAIBAOgDACHBAgEA6AMAIcICAQDoAwAhwwIBAOgDACHEAgEA6QMAIQ0DAADmBAAg_QEBAOgDACGGAkAA7AMAIYcCQADsAwAhmAIBAOgDACG8AggA6wMAIb4CAADlBL4CIr8CAAD7A7sCIsACAQDoAwAhwQIBAOgDACHCAgEA6AMAIcMCAQDoAwAhxAIBAOkDACEI_QEBAAAAAYMCAAAAuwICmQIBAAAAAbYCAgAAAAG3AggAAAABuAIIAAAAAbkCCAAAAAG7AgEAAAABAwAAAFUAICIAAMoGACAjAADxBgAgFAAAAFUAIAQAALsFACAFAAC8BQAgBgAAvQUAIA8AAMEFACATAADABQAgFQAAvwUAIBsAAPEGACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIRIEAAC7BQAgBQAAvAUAIAYAAL0FACAPAADBBQAgEwAAwAUAIBUAAL8FACD9AQEA6AMAIf4BAQDoAwAhgwIAALoF3gIihgJAAOwDACGHAkAA7AMAIaACIADSBAAhoQJAANMEACHGAgEA6QMAIdkCAQDoAwAh2gIgANIEACHcAgAAuQXcAiLeAiAA0gQAIQEDAAIIBAYDBQoEBgwBCA4FDAASDzcJEzYOFTQLAQMAAgEDAAIEBwACCxIGDAAREi4KBggABQwAEA0ABw8eCRIiChQoDQQJFAcKFwcLGAYMAAgCChkACxoAAgMAAg4ABgMIAAUOAAYRAAsDAwACDAAMECMKARAkAAIOAAYTAA4DAwACDAAPECkNARAqAAMPKwASLAAULQACCy8AEjAABAQ4AAU5AA87ABU6AAABAwACAQMAAgMMABcoABgpABkAAAADDAAXKAAYKQAZAAADDAAeKAAfKQAgAAAAAwwAHigAHykAIAEDAAIBAwACAwwAJSgAJikAJwAAAAMMACUoACYpACcBAwACAQMAAgMMACwoAC0pAC4AAAADDAAsKAAtKQAuAAAAAwwANCgANSkANgAAAAMMADQoADUpADYBAwACAQMAAgMMADsoADwpAD0AAAADDAA7KAA8KQA9Ag4ABhMADgIOAAYTAA4FDABCKABFKQBGigEAQ4sBAEQAAAAAAAUMAEIoAEUpAEaKAQBDiwEARAEJ6AEHAQnuAQcDDABLKABMKQBNAAAAAwwASygATCkATQEDAAIBAwACBQwAUigAVSkAVooBAFOLAQBUAAAAAAAFDABSKABVKQBWigEAU4sBAFQDCAAFDgAGEQALAwgABQ4ABhEACwUMAFsoAF4pAF-KAQBciwEAXQAAAAAABQwAWygAXikAX4oBAFyLAQBdAggABQ0ABwIIAAUNAAcFDABkKABnKQBoigEAZYsBAGYAAAAAAAUMAGQoAGcpAGiKAQBliwEAZgAAAwwAbSgAbikAbwAAAAMMAG0oAG4pAG8CAwACDgAGAgMAAg4ABgUMAHQoAHcpAHiKAQB1iwEAdgAAAAAABQwAdCgAdykAeIoBAHWLAQB2AQcAAgEHAAIFDAB9KACAASkAgQGKAQB-iwEAfwAAAAAABQwAfSgAgAEpAIEBigEAfosBAH8WAgEXPAEYPgEZPwEaQAEcQgEdRBMeRRQfRwEgSRMhShUkSwElTAEmTRMqUBYrURosUwItVAIuVwIvWAIwWQIxWwIyXRMzXhs0YAI1YhM2Yxw3ZAI4ZQI5ZhM6aR07aiE8awM9bAM-bQM_bgNAbwNBcQNCcxNDdCJEdgNFeBNGeSNHegNIewNJfBNKfyRLgAEoTIEBBE2CAQROgwEET4QBBFCFAQRRhwEEUokBE1OKASlUjAEEVY4BE1aPASpXkAEEWJEBBFmSARNalQErW5YBL1yYATBdmQEwXpwBMF-dATBgngEwYaABMGKiARNjowExZKUBMGWnARNmqAEyZ6kBMGiqATBpqwETaq4BM2uvATdssQEObbIBDm60AQ5vtQEOcLYBDnG4AQ5yugETc7sBOHS9AQ51vwETdsABOXfBAQ54wgEOecMBE3rGATp7xwE-fMgBDX3JAQ1-ygENf8sBDYABzAENgQHOAQ2CAdABE4MB0QE_hAHTAQ2FAdUBE4YB1gFAhwHXAQ2IAdgBDYkB2QETjAHcAUGNAd0BR44B3gEHjwHfAQeQAeABB5EB4QEHkgHiAQeTAeQBB5QB5gETlQHnAUiWAeoBB5cB7AETmAHtAUmZAe8BB5oB8AEHmwHxAROcAfQBSp0B9QFOngH2AQufAfcBC6AB-AELoQH5AQuiAfoBC6MB_AELpAH-AROlAf8BT6YBgQILpwGDAhOoAYQCUKkBhQILqgGGAgurAYcCE6wBigJRrQGLAleuAYwCCq8BjQIKsAGOAgqxAY8CCrIBkAIKswGSAgq0AZQCE7UBlQJYtgGXAgq3AZkCE7gBmgJZuQGbAgq6AZwCCrsBnQITvAGgAlq9AaECYL4BogIGvwGjAgbAAaQCBsEBpQIGwgGmAgbDAagCBsQBqgITxQGrAmHGAa0CBscBrwITyAGwAmLJAbECBsoBsgIGywGzAhPMAbYCY80BtwJpzgG5AmrPAboCatABvQJq0QG-AmrSAb8CatMBwQJq1AHDAhPVAcQCa9YBxQJq1wHGAhPYAckCbNkBygJw2gHLAgnbAcwCCdwBzQIJ3QHOAgneAc8CCd8B0QIJ4AHTAhPhAdQCceIB1gIJ4wHYAhPkAdkCcuUB2gIJ5gHbAgnnAdwCE-gB3wJz6QHgAnnqAeICBesB4wIF7AHlAgXtAeYCBe4B5wIF7wHpAgXwAesCE_EB7AJ68gHuAgXzAfACE_QB8QJ79QHyAgX2AfMCBfcB9AIT-AH3Anz5AfgCggE"
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
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DocumentEmbeddingScalarFieldEnum: () => DocumentEmbeddingScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  ShopScalarFieldEnum: () => ShopScalarFieldEnum,
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
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Cart: "Cart",
  CartItem: "CartItem",
  Category: "Category",
  Order: "Order",
  OrderItem: "OrderItem",
  Product: "Product",
  DocumentEmbedding: "DocumentEmbedding",
  Review: "Review",
  Shop: "Shop"
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
var OrderScalarFieldEnum = {
  id: "id",
  totalAmount: "totalAmount",
  paymentStatus: "paymentStatus",
  orderStatus: "orderStatus",
  fullName: "fullName",
  phone: "phone",
  address: "address",
  district: "district",
  notes: "notes",
  userId: "userId",
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
  shopId: "shopId"
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
  purchasePrice: "purchasePrice",
  regularPrice: "regularPrice",
  sellPrice: "sellPrice",
  tags: "tags",
  shopId: "shopId",
  categoryId: "categoryId",
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
import { Router as Router11 } from "express";

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
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/--+/g, "-").replace(/^-+|-+$/g, "");
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
  const product = await prisma2.product.create({
    data: {
      ...payload,
      slug,
      status: ProductStatus.ACTIVE
    },
    include: {
      category: true,
      shop: true
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
    shop: true
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
  const updatedProduct = await prisma2.product.update({
    where: { id },
    data: {
      ...payload,
      ...slug && { slug }
    }
  });
  return updatedProduct;
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
  deleteProduct
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
var ProductController = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  getProductById: getProductById2,
  getProductBySlug: getProductBySlug2,
  updateProduct: updateProduct2,
  deleteProduct: deleteProduct2
};

// src/app/module/product/product.validation.ts
import z3 from "zod";
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
  tags: z3.array(z3.string()).optional()
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
  tags: z3.array(z3.string()).optional()
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
          }
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
            }
          }
        }
      }
    });
  }
  return cart;
};
var addToCart = async (userId, payload) => {
  const product = await prisma2.product.findUnique({
    where: { id: payload.productId }
  });
  if (!product) {
    throw new AppError_default(status13.NOT_FOUND, "Product not found");
  }
  if (product.stock < payload.quantity) {
    throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock");
  }
  let cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma2.cart.create({ data: { userId } });
  }
  const existingItem = await prisma2.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: payload.productId
    }
  });
  if (existingItem) {
    return await prisma2.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + payload.quantity }
    });
  } else {
    return await prisma2.cartItem.create({
      data: {
        cartId: cart.id,
        productId: payload.productId,
        quantity: payload.quantity
      }
    });
  }
};
var updateCartItemQuantity = async (userId, payload) => {
  const cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError_default(status13.NOT_FOUND, "Cart not found");
  const existingItem = await prisma2.cartItem.findFirst({
    where: { cartId: cart.id, productId: payload.productId }
  });
  if (!existingItem) throw new AppError_default(status13.NOT_FOUND, "Item not found in cart");
  if (payload.quantity <= 0) {
    return await prisma2.cartItem.delete({ where: { id: existingItem.id } });
  }
  const product = await prisma2.product.findUnique({ where: { id: payload.productId } });
  if (product && product.stock < payload.quantity) {
    throw new AppError_default(status13.BAD_REQUEST, "Insufficient stock");
  }
  return await prisma2.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity: payload.quantity }
  });
};
var removeFromCart = async (userId, productId) => {
  const cart = await prisma2.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError_default(status13.NOT_FOUND, "Cart not found");
  const existingItem = await prisma2.cartItem.findFirst({
    where: { cartId: cart.id, productId }
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
    req.params.productId
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
  quantity: z4.number().int().positive("Quantity must be at least 1")
});
var updateCartItemZodSchema = z4.object({
  productId: z4.string().uuid("Invalid product ID"),
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
        where: { id: item.productId }
      });
      if (!product) throw new AppError_default(status15.NOT_FOUND, `Product not found: ${item.productId}`);
      orderItemsToProcess.push({
        productId: item.productId,
        quantity: item.quantity,
        product
      });
    }
  } else {
    const cart = await prisma2.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    if (!cart || cart.items.length === 0) {
      throw new AppError_default(status15.BAD_REQUEST, "Your cart is empty");
    }
    orderItemsToProcess = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      product: item.product
    }));
    isFromCart = true;
  }
  return await prisma2.$transaction(async (tx) => {
    let totalAmount = 0;
    for (const item of orderItemsToProcess) {
      if (item.product.stock < item.quantity) {
        throw new AppError_default(
          status15.BAD_REQUEST,
          `Insufficient stock for product: ${item.product.name}`
        );
      }
      totalAmount += item.product.sellPrice * item.quantity;
    }
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: totalAmount + 60,
        // Adding 60 TK shipping charge
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address,
        district: payload.district,
        notes: payload.notes,
        orderStatus: OrderStatus.PENDING
      }
    });
    for (const item of orderItemsToProcess) {
      const itemTotal = item.product.sellPrice * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - itemCommission;
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.sellPrice,
          shopId: item.product.shopId,
          platformEarning: itemCommission,
          vendorEarning
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
    }
    if (isFromCart) {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id }
        });
      }
    }
    return order;
  });
};
var getAllOrders = async (queryParams) => {
  const orderQuery = new QueryBuilder(prisma2.order, queryParams, {
    searchableFields: ["address", "district", "fullName", "phone"],
    filterableFields: ["orderStatus", "paymentStatus", "userId"]
  }).search().filter().sort().paginate().include({
    items: {
      include: {
        product: true,
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
  const orderItems = await prisma2.orderItem.findMany({
    where: { shopId: shop.id },
    include: {
      order: true,
      product: true
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
      quantity: z5.number().int().positive()
    })
  ).optional()
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
import status23 from "http-status";

// src/app/module/ai/ai.service.ts
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
var AIService = {
  generateProductData
};

// src/app/module/ai/ai.controller.ts
var generateProductData2 = catchAsync(async (req, res) => {
  const { title } = req.body;
  const result = await AIService.generateProductData(title);
  sendResponse(res, {
    httpStatusCode: status23.OK,
    success: true,
    message: "Product data generated successfully",
    data: result
  });
});
var AIController = {
  generateProductData: generateProductData2
};

// src/app/module/ai/ai.route.ts
var router11 = express.Router();
router11.post(
  "/generate-product-data",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  AIController.generateProductData
);
var AIRoutes = router11;

// src/app/routes/index.ts
var router12 = Router11();
router12.use("/auth", AuthRoutes);
router12.use("/admin", AdminRoutes);
router12.use("/categories", CategoryRoutes);
router12.use("/shops", ShopRoutes);
router12.use("/products", ProductRoutes);
router12.use("/cart", CartRoutes);
router12.use("/orders", OrderRoutes);
router12.use("/reviews", ReviewRoutes);
router12.use("/analytics", AnalyticsRoutes);
router12.use("/rag", RagRoutes);
router12.use("/ai", AIRoutes);
var IndexRoutes = router12;

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
import status26 from "http-status";
import z8 from "zod";

// src/app/errorHelpers/handlePrismaErrors.ts
import status24 from "http-status";
var getStatusCodeFromPrismaError = (errorCode) => {
  if (errorCode === "P2002") {
    return status24.CONFLICT;
  }
  if (["P2025", "P2001", "P2015", "P2018"].includes(errorCode)) {
    return status24.NOT_FOUND;
  }
  if (["P1000", "P6002"].includes(errorCode)) {
    return status24.UNAUTHORIZED;
  }
  if (["P1010", "P6010"].includes(errorCode)) {
    return status24.FORBIDDEN;
  }
  if (errorCode === "P6003") {
    return status24.PAYMENT_REQUIRED;
  }
  if (["P1008", "P2004", "P6004"].includes(errorCode)) {
    return status24.GATEWAY_TIMEOUT;
  }
  if (errorCode === "P5011") {
    return status24.TOO_MANY_REQUESTS;
  }
  if (errorCode === "P6009") {
    return 413;
  }
  if (errorCode.startsWith("P1") || ["P2024", "P2037", "P6008"].includes(errorCode)) {
    return status24.SERVICE_UNAVAILABLE;
  }
  if (errorCode.startsWith("P2")) {
    return status24.BAD_REQUEST;
  }
  if (errorCode.startsWith("P3") || errorCode.startsWith("P4")) {
    return status24.INTERNAL_SERVER_ERROR;
  }
  return status24.INTERNAL_SERVER_ERROR;
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
    statusCode: status24.INTERNAL_SERVER_ERROR,
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
    statusCode: status24.BAD_REQUEST,
    message: `Prisma Client Validation Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientInitializationError = (error) => {
  const statusCode = error.errorCode ? getStatusCodeFromPrismaError(error.errorCode) : status24.SERVICE_UNAVAILABLE;
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
    statusCode: status24.INTERNAL_SERVER_ERROR,
    message: "Prisma Client Rust Panic Error: The database engine crashed due to a fatal error.",
    errorSources
  };
};

// src/app/errorHelpers/handleZodError.ts
import status25 from "http-status";
var handleZodError = (err) => {
  const statusCode = status25.BAD_REQUEST;
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
  await deleteUploadedFilesFromGlobalErrorHandler(req);
  let errorSources = [];
  let statusCode = status26.INTERNAL_SERVER_ERROR;
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
  } else if (err instanceof z8.ZodError) {
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
    statusCode = status26.INTERNAL_SERVER_ERROR;
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
import status27 from "http-status";
var notFound = (req, res) => {
  res.status(status27.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// src/app.ts
var app = express2();
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
app.use(express2.urlencoded({ extended: true }));
app.use(express2.json());
app.use(cookieParser());
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
