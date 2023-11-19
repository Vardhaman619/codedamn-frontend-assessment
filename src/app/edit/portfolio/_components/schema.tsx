import { z } from "zod";
import { Languages } from "@prisma/client";

export const portfolioFormSchema = z.object({
  playgrounds: z.array(z.string()),
  projects: z.array(z.string()),
});
export type PortfolioFormSchema = z.infer<typeof portfolioFormSchema>;

export const playgroundSchema = z.object({
  title: z
    .string({ required_error: "Title for playground is required." })
    .min(5, "Title must be at least 5 characters long.")
    .max(30, "Title must not exceed 30 characters"),
  language: z.nativeEnum(Languages, {
    errorMap: () => {
      return { message: "Select correct language" };
    },
  }),
});
export type PlaygroundSchema = z.infer<typeof playgroundSchema>;
export const projectSchema = z.object({
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

export type ProjectSchema = z.infer<typeof projectSchema>;

export const projectDeleteSchema = z.string({
  required_error: "Project Id is required",
  invalid_type_error: "invalid project id",
});

export type ProjectDeleteSchema = z.infer<typeof projectDeleteSchema>;
