import z from "zod";

export const createShopZodSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().optional(),
  // logo and banner will be handled via multer/cloudinary
});

export const updateShopZodSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "ACTIVE", "BLOCKED"]).optional(),
});

export const updateShopStatusZodSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "BLOCKED"]),
});
