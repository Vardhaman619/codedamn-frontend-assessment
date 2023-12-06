"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileFormSchema } from "./_components/schema";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { uploadThing } from "~/server/uploadthing";
async function checkAndDeletePreviousImage(userId: string) {
  const prevImage = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      imageKey: true,
    },
  });
  if (prevImage?.imageKey) {
    const imageDelete = await uploadThing.deleteFiles(prevImage.imageKey);
    if (!imageDelete.success) {
      throw Error("previous image not deleted sucessfully");
      return;
    }
  }
}
export default async function profileFormAction(data: FormData) {
  try {
    const formdata = Object.fromEntries(data);
    const validationResult = profileFormSchema.safeParse(formdata);
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
      data: {
        dob,
        gender,
        name,
        showAchievementBadges,
        showFollowersFollowing,
        showXP,
        about,
        image,
        profession,
      },
    } = validationResult;

    if (image) {
      const imageUploadResponse = await uploadThing.uploadFiles(image);
      if (imageUploadResponse.error) {
        return {
          error: true,
          message: "Image Upload Error",
        } as const;
      }
      try {
        await checkAndDeletePreviousImage(session.user.id);
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            dob,
            gender,
            name,
            showAchievementBadges,
            showFollowersFollowing,
            showXP,
            about,
            image: imageUploadResponse.data.url,
            imageKey: imageUploadResponse.data.key,
            profession,
          },
        });
      } catch (error) {
        await uploadThing.deleteFiles([imageUploadResponse.data.key]);
        throw error;
      }
      revalidatePath("/edit");
      return {
        success: true,
        message: "Information Updated Sucessfully",
      };
    }
    await checkAndDeletePreviousImage(session.user.id);
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        dob,
        gender,
        name,
        showAchievementBadges,
        showFollowersFollowing,
        showXP,
        about,
        image,
        profession,
      },
    });
    revalidatePath("/edit");
    return {
      success: true,
      message: "Information Updated Sucessfully",
    };
  } catch (error) {
    console.error("Error in profileFormAction: ", error);
    return {
      error: true,
      message: "Something went wrong on server. Try again!",
    } as const;
  }
}
