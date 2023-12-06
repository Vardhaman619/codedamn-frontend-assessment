"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

import { getServerAuthSession } from "~/server/auth";
import {
  type ResumeFormSchema,
  resumeFormSchema,
  type EducationSchema,
  educationSchema,
  type EducationDeleteSchema,
  educationDeleteSchema,
  type EducationEditSchema,
  educationEditSchema,
  type WorkExperianceSchema,
  workExperianceSchema,
  type WorkExperianceDeleteSchema,
  workExperianceDeleteSchema,
  type WorkExperianceEditSchema,
  workExperianceEditSchema,
} from "./_components/schema";
export default async function ResumeFormAction(data: ResumeFormSchema) {
  try {
    const validationResult = resumeFormSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: resultData } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: resultData,
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in ResumeFormAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function EducationAddAction(data: EducationSchema) {
  try {
    const validationResult = educationSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: educationData } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        educations: {
          create: educationData,
        },
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in AddEducationAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function EducationDeleteAction(id: EducationDeleteSchema) {
  try {
    const validationResult = educationDeleteSchema.safeParse(id);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: educationId } = validationResult;
    await db.education.delete({
      where: {
        id: educationId,
        userId: session.user.id,
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in AddEducationAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function EducationEditAction(data: EducationEditSchema) {
  try {
    const validationResult = educationEditSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const {
      data: { id, ...educationData },
    } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        educations: {
          update: {
            where: {
              id: id,
            },
            data: educationData,
          },
        },
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in EducationUpdateAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
export async function WorkExperianceAddAction(data: WorkExperianceSchema) {
  try {
    const validationResult = workExperianceSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: workExperiencesData } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        workExperiences: {
          create: workExperiencesData,
        },
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in AddWorkExperianceAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function WorkExperianceDeleteAction(
  id: WorkExperianceDeleteSchema,
) {
  try {
    const validationResult = workExperianceDeleteSchema.safeParse(id);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: workExperienceDataId } = validationResult;
    await db.workExperience.delete({
      where: {
        userId: session.user.id,
        id: workExperienceDataId,
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Deleted Sucessfully",
    };
  } catch (error) {
    console.error("Error in DeleteWorkExperianceAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function WorkExperianceEditAction(data: WorkExperianceEditSchema) {
  try {
    const validationResult = workExperianceEditSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Submit with correct values",
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/api/auth/signin");
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const {
      data: { id, ...workExperianceData },
    } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        workExperiences: {
          update: {
            where: {
              id,
            },
            data: workExperianceData,
          },
        },
      },
    });
    revalidatePath("/edit/resume");
    return {
      success: true,
      message: "Updated Data Sucessfully",
    };
  } catch (error) {
    console.error("Error in UpdateWorkExperianceAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
