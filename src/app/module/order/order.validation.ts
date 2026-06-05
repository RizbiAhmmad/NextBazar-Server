import z from "zod";

export const createOrderZodSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      productVariantId: z.string().uuid().optional().nullable(),
      quantity: z.number().int().positive(),
    })
  ).optional(),
});

export const updateOrderStatusZodSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export const updatePaymentStatusZodSchema = z.object({
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
});
