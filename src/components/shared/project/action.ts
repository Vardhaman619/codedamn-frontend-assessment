"use server";

import { uploadThing } from "~/server/uploadthing";
import {
  type ProjectDeleteSchema,
  projectCreateSchema,
  projectDeleteSchema,
} from "./schema";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function ProjectCreateAction(formdata: FormData) {
  try {
    const data = Object.fromEntries(formdata);
    const validationResult = projectCreateSchema.safeParse({
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
