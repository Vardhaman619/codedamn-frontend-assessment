import { Languages } from "@prisma/client";
import { z } from "zod";

export const playgroundCreateSchema = z.object({
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
export type PlaygroundCreateSchema = z.infer<typeof playgroundCreateSchema>;
