import z from "zod";

export const createWithdrawalRequestZodSchema = z
  .object({
    amount: z.number().positive("Amount must be greater than 0"),
    payoutMethod: z.enum(["MOBILE_BANKING", "BANK_TRANSFER"]),
    mobileBankingProvider: z.enum(["BKASH", "NAGAD"]).optional(),
    mobileNumber: z.string().min(1).optional(),
    bankName: z.string().min(1).optional(),
    bankAccountName: z.string().min(1).optional(),
    bankAccountNumber: z.string().min(1).optional(),
    bankBranch: z.string().min(1).optional(),
    bankRoutingNumber: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payoutMethod === "MOBILE_BANKING") {
      if (!data.mobileBankingProvider) {
        ctx.addIssue({
          code: "custom",
          path: ["mobileBankingProvider"],
          message: "Mobile banking provider is required",
        });
      }
      if (!data.mobileNumber) {
        ctx.addIssue({
          code: "custom",
          path: ["mobileNumber"],
          message: "Mobile number is required",
        });
      }
    }

    if (data.payoutMethod === "BANK_TRANSFER") {
      const requiredBankFields = [
        "bankName",
        "bankAccountName",
        "bankAccountNumber",
        "bankBranch",
      ] as const;

      requiredBankFields.forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "This field is required for bank transfer",
          });
        }
      });
    }
  });

export const approveWithdrawalZodSchema = z.object({
  note: z.string().max(500).optional(),
});

export const rejectWithdrawalZodSchema = z.object({
  note: z.string().min(1, "Rejection reason is required").max(500),
});
