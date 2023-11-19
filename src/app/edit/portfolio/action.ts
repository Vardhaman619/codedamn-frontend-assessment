"use server";
import { db } from "~/server/db";
import {
  type PortfolioFormSchema,
  portfolioFormSchema,
  playgroundSchema,
  type PlaygroundSchema,
  projectSchema,
  type ProjectDeleteSchema,
  projectDeleteSchema,
} from "./_components/schema";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadThing } from "~/server/uploadthing";

export async function PortfolioFormAction(data: PortfolioFormSchema) {
  try {
    const validationResult = portfolioFormSchema.safeParse(data);
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
      data: { playgrounds, projects },
    } = validationResult;
    console.log(playgrounds, projects);
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        visiblePlaygrounds: {
          set: playgrounds.map((plygroundId) => ({
            id: plygroundId,
          })),
        },
        visibleProjects: {
          set: projects.map((projectId) => ({ id: projectId })),
        },
      },
    });

    revalidatePath("/edit/portfolio");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in PortfolioFormAction: ", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function PlaygroundCreateAction(data: PlaygroundSchema) {
  try {
    const validationResult = playgroundSchema.safeParse(data);
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

    const { data: playgroundData } = validationResult;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        playgrounds: {
          create: playgroundData,
        },
      },
    });
    revalidatePath("/edit/portfolio");
    return {
      success: true,
      message: "Playground created successfully",
    };
  } catch (error) {
    console.error("Error in PlaygroundCreateAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function ProjectCreateAction(formdata: FormData) {
  try {
    const data = Object.fromEntries(formdata);
    const validationResult = projectSchema.safeParse({
      ...data,
      languagesUsed: (data?.languagesUsed as string)?.split(","),
    });
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
      data: { image, languagesUsed, title },
    } = validationResult;
    const imageUploadResponse = await uploadThing.uploadFiles(image);
    if (imageUploadResponse.error) {
      return {
        error: true,
        message: imageUploadResponse.error.message,
      } as const;
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        projects: {
          create: {
            title,
            languagesUsed,
            image: imageUploadResponse.data.url,
            imageKey: imageUploadResponse.data.key,
          },
        },
      },
    });
    revalidatePath("/edit/portfolio");
    return {
      success: true,
      message: "Project created successfully",
    };
  } catch (error) {
    console.error("Error in ProjectCreateAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}

export async function ProjectDeleteAction(id: ProjectDeleteSchema) {
  try {
    const validationResult = projectDeleteSchema.safeParse(id);
    if (!validationResult.success) {
      return {
        error: true,
        message: validationResult.error.message,
      } as const;
    }
    const session = await getServerAuthSession();

    if (!session) {
      return {
        error: true,
        message: "Sigin to perform this action",
      } as const;
    }

    const { data: projectId } = validationResult;

    await db.$transaction(async (tx) => {
      try {
        const deletedProject = await tx.project.delete({
          where: {
            id: projectId,
          },
          select: {
            imageKey: true,
          },
        });
        const result = await uploadThing.deleteFiles([deletedProject.imageKey]);
        if (!result) {
          throw Error("Image Not Deleted Sucessfully");
        }
        revalidatePath("/edit/portfolio");
        return {
          success: true,
          message: "Project Deleted Sucessfully",
        };
      } catch (error) {
        return {
          error: true,
          message: "Project Not Deleted ! Try Again",
        } as const;
      }
    });
  } catch (error) {
    console.error("Error in ProjectDeleteAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
