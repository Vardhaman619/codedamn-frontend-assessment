import { z } from "zod";

export const coverImageSchema = z.object({
  image: z
    .custom<FileWithPreview>()
    .refine(
      (file) =>
        file != null && typeof window === "undefined"
          ? true
          : file instanceof File,
      "Image is required.",
    )
    .refine((file) => file?.size <= 400000, `Max file size is 4MB.`)
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
});
