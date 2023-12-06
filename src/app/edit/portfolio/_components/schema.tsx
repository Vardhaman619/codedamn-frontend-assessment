import { z } from "zod";

export const portfolioFormSchema = z.object({
  playgrounds: z.array(z.string()),
  projects: z.array(z.string()),
});
export type PortfolioFormSchema = z.infer<typeof portfolioFormSchema>;
