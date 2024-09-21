import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

export const addAgentSchema = z.object({
  name: z.string().trim().min(2),
  surname: z.string().trim().min(2),
  email: z.string().endsWith("@redberry.ge"),
  phone: z
    .string()
    .length(9, "The number must be exactly 9 digits long.")
    .regex(
      /^5\d{8}$/,
      "The number must start with 5 and be exactly 9 digits long."
    )
    .refine((val) => !isNaN(Number(val))),
});
