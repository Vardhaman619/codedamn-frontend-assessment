"use server";

import { getServerAuthSession } from "~/server/auth";
import { coverImageSchema } from "./schema";
import { redirect } from "next/navigation";
import { uploadThing } from "~/server/uploadthing";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function UploadCoverImageAction(formdata: FormData) {
  try {
    const data = Object.fromEntries(formdata);
    const validationResult = coverImageSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        error: true,
        errors: validationResult.error.flatten().fieldErrors,
        message: "Cover Image Not Updated",
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
      data: { image },
    } = validationResult;

    const imageUploadResponse = await uploadThing.uploadFiles(image);
    if (imageUploadResponse.error) {
      return {
        error: true,
        message: imageUploadResponse.error.message,
      } as const;
    }
    try {
      const prevCoverImage = await db.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          coverImageKey: true,
        },
      });
      if (prevCoverImage?.coverImageKey) {
        const imageDelete = await uploadThing.deleteFiles(
          prevCoverImage?.coverImageKey,
        );
        if (!imageDelete.success) {
          throw Error("previous image not deleted sucessfully");
          return;
        }
      }
      await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          coverImage: imageUploadResponse.data.url,
          coverImageKey: imageUploadResponse.data.key,
        },
      });
    } catch (error) {
      await uploadThing.deleteFiles([imageUploadResponse.data.key]);
      throw error;
    }

    revalidatePath("/");
    return {
      success: true,
      message: "Cover Image Updated Successfully",
    };
  } catch (error) {
    console.error("Error in UploadCoverImageAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
