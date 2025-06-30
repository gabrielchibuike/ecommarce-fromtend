import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain a special character");

export const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
  subCategory: z.string().min(1, "Sub category name is required"),
  manufacturarBrand: z.string().min(1, "Manufacturar brand name is required"),
  description: z.string().min(1, "Description name is required"),
  stockQuantity: z.string().min(1, "Quantity is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(1, "Discount is required"),
});

export const billingDetailScheme = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  additionalInfo: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8-20 character"),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8-20 character"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine((data, ctx) => {
    const isPasswordValid = passwordSchema.safeParse(data.password).success;

    if (isPasswordValid && data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirm_password"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
