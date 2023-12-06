import { Languages } from "@prisma/client";
import { z } from "zod";

export const projectCreateSchema = z.object({
  title: z
    .string()
    .min(5, "Title should be at least 5 characters long")
    .max(30, "Title should not exceed 30 characters"),
  languagesUsed: z
    .nativeEnum(Languages, {
      invalid_type_error: "Select correct languages.",
    })
    .array()
    .min(1, "Select atleast one langauge.")
    .max(3, "maximum 3 languages can be select."),
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
export type ProjectCreateSchema = z.infer<typeof projectCreateSchema>;

export const projectDeleteSchema = z.string({
  required_error: "Project Id is required",
  invalid_type_error: "invalid project id",
});

export type ProjectDeleteSchema = z.infer<typeof projectDeleteSchema>;
