import { Gender } from "@prisma/client";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(30, { message: "Name must be in 30 characters." }),
  about: z.string().max(200).optional(),
  dob: z.coerce
    .date()
    .min(new Date(1920, 1, 1), "Date of birth must be greater than 1920.")
    .max(new Date(2020, 1, 1), "Date of birth must be smaller than 2020."),
  gender: z.nativeEnum(Gender, {
    invalid_type_error: "Select correct a gender.",
    required_error: "Select correct a gender.",
  }),
  showXP: z.coerce.boolean(),
  showAchievementBadges: z.coerce.boolean(),
  showFollowersFollowing: z.coerce.boolean(),
  profession: z.coerce
    .string()
    .max(30, { message: "Profession must be in 30 characters." })
    .optional(),
  image: z.union([
    z
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
    z.null(),
    z
      .string()
      .url()
      .transform((url) => (typeof window === "undefined" ? undefined : url)),
  ]),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
