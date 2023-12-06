"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { type PlaygroundCreateSchema, playgroundCreateSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function PlaygroundCreateAction(data: PlaygroundCreateSchema) {
  try {
    const validationResult = playgroundCreateSchema.safeParse(data);
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
