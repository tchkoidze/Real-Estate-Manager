import { z } from "zod";

export const addAgentSchema = z.object({
  name: z.string().trim().min(2),
  surname: z.string().trim().min(2),
  email: z
    .string()
    .email("არასწორი მეილის ფორმატი")
    .regex(/@redberry\.ge$/),
  //endsWith("@redberry.ge"),
  phone: z
    .string()
    .length(9, "The number must be exactly 9 digits long.")
    .regex(
      /^5\d{8}$/,
      "The number must start with 5 and be exactly 9 digits long."
    )
    .refine((val) => !isNaN(Number(val))),
});
