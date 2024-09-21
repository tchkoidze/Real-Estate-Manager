import { z } from "zod";

export const addListingSchema = z.object({
  address: z.string().trim().min(2),
  zip_code: z.preprocess((val) => {
    const parsed = parseInt(val as string, 10);
    // Check if the entire value is numeric by using a regex
    if (/^\d+$/.test(val as string)) {
      return parsed; // Only return the parsed number if it's fully numeric
    }
    return NaN; // Return NaN if non-numeric characters are found
  }, z.number().min(1)),
  //z.number().int(),
  price: z.preprocess((val) => {
    if (typeof val === "string" && /^([0-9]*[.])?[0-9]+$/.test(val)) {
      const parsed = parseFloat(val);
      // Return the parsed number if it is finite
      if (isFinite(parsed)) {
        return parsed;
      }
    }
    return NaN; // Return NaN if the value is not valid
  }, z.number().min(0)),

  area: z.preprocess((val) => {
    if (typeof val === "string" && /^([0-9]*[.])?[0-9]+$/.test(val)) {
      const parsed = parseFloat(val);
      // Return the parsed number if it is finite
      if (isFinite(parsed)) {
        return parsed;
      }
    }
    return NaN; // Return NaN if the value is not valid
  }, z.number().min(0)),
  bedrooms: z.preprocess((val) => {
    const parsed = parseInt(val as string, 10);
    // Check if the entire value is numeric by using a regex
    if (/^\d+$/.test(val as string)) {
      return parsed; // Only return the parsed number if it's fully numeric
    }
    return NaN; // Return NaN if non-numeric characters are found
  }, z.number().int().min(1)),
  description: z.string().trim().min(5),
  region: z.object({
    region_id: z.number().nullable(),
    name: z.string().min(1, "მიუთითე რეგიონი"),
  }),
  city: z.object({
    city_id: z.number().nullable(),
    name: z.string().min(1, "მიუთითე რეგიონი"),
  }),
  agent: z.object({
    agent_id: z.number().nullable(),
    name: z.string().min(1, "Agent name is required"),
    surname: z.string().min(1, "Agent surname is required"),
  }),
});
