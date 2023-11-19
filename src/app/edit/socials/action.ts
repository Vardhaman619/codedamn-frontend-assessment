"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileFormSchema } from "../_components/schema";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import type { SocialsFormSchema } from "./_components/schema";
export default async function socialsFormAction(data: SocialsFormSchema) {
  try {
    const validationResult = profileFormSchema.safeParse(data);
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
    revalidatePath("/edit/socials");
    return {
      success: true,
      message: "Information Saved Sucessfully",
    };
  } catch (error) {
    console.error("Error in socialsFormAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
