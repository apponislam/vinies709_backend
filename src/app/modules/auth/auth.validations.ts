import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(["VENDOR", "BUYER", "DRIVER", "INVENTORY_MANAGER", "PRICER", "TREASURER", "MANAGER", "CLIENT", "SALES_AGENT"]),
        phone: z.string().optional(),
        location: z.string().optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const verifyEmailSchema = z.object({
    query: z.object({
        token: z.string(),
        email: z.string().email(),
    }),
});

export const resendVerificationSchema = z.object({
    body: z.object({
        email: z.string().email(),
    }),
});

export const updateProfileSchema = z.object({
    body: z.object({
        firstName: z.string().min(2).optional(),
        lastName: z.string().min(2).optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
    }),
});

export const changePasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string(),
        newPassword: z.string().min(6),
    }),
});

export const updateEmailSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>["query"];
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>["body"];
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>["body"];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
export type UpdateEmailInput = z.infer<typeof updateEmailSchema>["body"];
