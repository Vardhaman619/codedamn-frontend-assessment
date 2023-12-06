"use server";
import { db } from "~/server/db";
import {
  type PortfolioFormSchema,
  portfolioFormSchema,
} from "./_components/schema";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
