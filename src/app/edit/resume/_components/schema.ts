import { z } from "zod";
export const techSkillSchema = z.string().min(3).max(20);
export const languageSchema = z.string().min(3).max(20);
export const interestSchema = z.string().min(3).max(20);
export const interestArraySchema = z
  .array(interestSchema)
  .max(10, { message: "Maximum 10 interest can be added" })
  .optional()
  .refine((items) => (items ? new Set(items).size === items.length : true), {
    message: "Interest already exists",
  });
export const techSkillArraySchema = z
  .array(techSkillSchema)
  .max(10, { message: "Maximum 10 skills can be added" })
  .optional()
  .refine((items) => (items ? new Set(items).size === items.length : true), {
    message: "Skill already exists",
  });

export const languageArraySchema = z
  .array(languageSchema)
  .max(10, { message: "Maximum 10 langauges can be added" })
  .min(1, { message: "Atleast one language need to be select" })
  .default(["english"])
  .refine(
    (items) =>
      new Set(items.map((item) => item.toLowerCase())).size === items.length,
    {
      message: "Language already exists",
    },
  );
export const resumeFormSchema = z.object({
  techSkills: techSkillArraySchema,
  interests: interestArraySchema,
  languages: languageArraySchema,
});
export type ResumeFormSchema = z.infer<typeof resumeFormSchema>;
function datesValidation({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate?: Date | null;
}) {
  if (!endDate) {
    return true;
  }
  return endDate >= startDate;
}

export const _sharedWorkExperianceSchema = z.object({
  title: z.string().min(3).max(30),
  company: z.string().min(3).max(30),
  location: z.string().min(5).max(50),
  description: z.string().max(200).optional(),
  startDate: z.coerce.date().min(new Date(1900, 1, 1)),
  endDate: z.coerce.date().max(new Date()).optional().nullable(),
});

const _sharedEducationSchema = z.object({
  degree: z.string().min(3).max(30),
  institution: z.string().min(3).max(50),
  location: z.string().min(5).max(50),
  description: z.string().max(200).optional().default(""),
  startDate: z.coerce.date().min(new Date(1900, 1, 1)),
  endDate: z.coerce.date().max(new Date()).optional(),
});
export const educationSchema = _sharedEducationSchema.refine(datesValidation, {
  message: "End date must be larger than start date",
  path: ["endDate"],
});
export type EducationSchema = z.infer<typeof educationSchema>;
export const workExperianceSchema = _sharedWorkExperianceSchema.refine(
  datesValidation,
  { message: "End date must be larger than start date", path: ["endDate"] },
);
export type WorkExperianceSchema = z.infer<typeof workExperianceSchema>;

export const educationEditSchema = _sharedEducationSchema
  .merge(
    z.object({
      id: z.string(),
    }),
  )
  .refine(datesValidation, {
    message: "End date must be larger than start date",

    path: ["endDate"],
  });
export const workExperianceEditSchema = _sharedWorkExperianceSchema
  .merge(
    z.object({
      id: z.string(),
    }),
  )
  .refine(datesValidation, {
    message: "End date must be larger than start date",

    path: ["endDate"],
  });
export type WorkExperianceEditSchema = z.infer<typeof workExperianceEditSchema>;
export type EducationEditSchema = z.infer<typeof educationEditSchema>;

export const workExperianceDeleteSchema = z.string({
  required_error: "Project Id is required",
  invalid_type_error: "invalid project id",
});

export type WorkExperianceDeleteSchema = z.infer<
  typeof workExperianceDeleteSchema
>;

export const educationDeleteSchema = z.string({
  required_error: "Project Id is required",
  invalid_type_error: "invalid project id",
});

export type EducationDeleteSchema = z.infer<typeof educationDeleteSchema>;
