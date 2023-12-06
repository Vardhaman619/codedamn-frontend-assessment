import { z } from "zod";

export const certificateCreateSchema = z.object({
  credentialLink: z.coerce.string().url().optional(),
  issuedOn: z.coerce
    .date()
    .max(new Date())
    .min(new Date(1950, 1, 1)),
  title: z.coerce.string().min(5).max(30),
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

export type CertificateCreateSchema = z.infer<typeof certificateCreateSchema>;
export const certificateDeleteSchema = z.string({
  required_error: "Certificate Id required",
});
export type CertificateDeleteSchema = z.infer<typeof certificateDeleteSchema>;
