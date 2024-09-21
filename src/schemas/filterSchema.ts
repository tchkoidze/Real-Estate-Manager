import { z } from "zod";

export const priceSchema = z.object({
  // price: z
  //   .string()
  //   .min(1, "Price is required")
  //   .regex(
  //     /^\d+(\.\d{1,2})?$/,
  //     "Price must be a valid number with up to 2 decimal places"
  //   ),
  minPrice: z
    .string()
    .min(1, "Price is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    )
    .transform((val) => parseFloat(val)),
  maxPrice: z
    .string()
    .min(1, "Price is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    )
    .transform((val) => parseFloat(val)),
});

export const areaSchema = z.object({
  minArea: z
    .string()
    .min(1, "Price is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    )
    .transform((val) => parseFloat(val)),
  maxArea: z
    .string()
    .min(1, "Price is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Price must be a valid number with up to 2 decimal places"
    )
    .transform((val) => parseFloat(val)),
});
