import z from "zod";

const variantSchema = z.object({
  combination: z.string().min(1, "Combination is required"),
  quantity: z.number().int().nonnegative("Quantity cannot be negative"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  regularPrice: z.number().positive("Regular price must be positive"),
  sellPrice: z.number().positive("Sell price must be positive"),
  image: z.string().optional().nullable(),
});

export const createProductZodSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  regularPrice: z.number().positive("Regular price must be positive"),
  sellPrice: z.number().positive("Sell price must be positive"),
  categoryId: z.string().uuid("Invalid category ID"),
  shopId: z.string().uuid("Invalid shop ID"),
  tags: z.array(z.string()).optional(),
  type: z.enum(["SIMPLE", "VARIABLE"]).optional().default("SIMPLE"),
  attributes: z.any().optional(),
  variants: z.array(variantSchema).optional(),
  vatType: z.enum(["INCLUDED", "EXCLUDED"]).optional().default("INCLUDED"),
  vatPercentage: z.coerce.number().nonnegative().optional().default(0),
  freeShipping: z.coerce.boolean().optional().default(false),
  isFeatured: z.coerce.boolean().optional().default(false),
});

export const updateProductZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
  purchasePrice: z.number().positive().optional(),
  regularPrice: z.number().positive().optional(),
  sellPrice: z.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  status: z.enum(["ACTIVE", "DRAFT", "OUT_OF_STOCK", "DELETED"]).optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum(["SIMPLE", "VARIABLE"]).optional(),
  attributes: z.any().optional(),
  variants: z.array(variantSchema).optional(),
  vatType: z.enum(["INCLUDED", "EXCLUDED"]).optional(),
  vatPercentage: z.coerce.number().nonnegative().optional(),
  freeShipping: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
});
