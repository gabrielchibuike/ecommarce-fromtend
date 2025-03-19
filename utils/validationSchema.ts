import { z } from "zod";

export const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
  subCategory: z.string().min(1, "Sub category name is required"),
  manufacturarBrand: z.string().min(1, "Manufacturar brand name is required"),
  description: z.string().min(1, "Description name is required"),
  stockQuantity: z.string().min(1, "Quantity is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(1, "Discount is required"),
});
