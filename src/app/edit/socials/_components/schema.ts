import { z } from "zod";

export const socialsFormSchema = z.object({
  githubProfile: z
    .string()
    .url("Please provide correct url for githubProfile.")
    .optional(),
  linkedinProfile: z
    .string()
    .url("Please provide correct url for linkedinProfile.")
    .optional(),
  facebookProfile: z
    .string()
    .url("Please provide correct url for facebookProfile.")
    .optional(),
  instagramProfile: z
    .string()
    .url("Please provide correct url for instagramProfile.")
    .optional(),
  youtubeProfile: z
    .string()
    .url("Please provide correct url for youtubeProfile.")
    .optional(),
  dribbleProfile: z
    .string()
    .url("Please provide correct url for dribbleProfile.")
    .optional(),
  behanceProfile: z
    .string()
    .url("Please provide correct url for behanceProfile.")
    .optional(),
});

export type SocialsFormSchema = z.infer<typeof socialsFormSchema>;
