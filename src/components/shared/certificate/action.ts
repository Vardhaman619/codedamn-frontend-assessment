"use server";
import { getServerAuthSession } from "~/server/auth";
import {
  type CertificateDeleteSchema,
  certificateCreateSchema,
  certificateDeleteSchema,
} from "./schema";
import { redirect } from "next/navigation";
import { uploadThing } from "~/server/uploadthing";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function certificateCreateAction(formdata: FormData) {
  try {
    const data = Object.fromEntries(formdata);
    const validationResult = certificateCreateSchema.safeParse(data);
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
      data: { image, ...rest },
    } = validationResult;
    const imageUploadResponse = await uploadThing.uploadFiles(image);
    if (imageUploadResponse.error) {
      return {
        error: true,
        message: imageUploadResponse.error.message,
      } as const;
    }

    try {
      await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          certificates: {
            create: {
              ...rest,
              image: imageUploadResponse.data.url,
              imageKey: imageUploadResponse.data.key,
            },
          },
        },
      });
    } catch (error) {
      await uploadThing.deleteFiles([imageUploadResponse.data.key]);
      throw error;
    }
    revalidatePath("/");
    return {
      success: true,
      message: "Certificate Added Successfully",
    };
  } catch (error) {
    console.error("Error in certificateCreateAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
export async function certificateDeleteAction(id: CertificateDeleteSchema) {
  try {
    const validationResult = certificateDeleteSchema.safeParse(id);
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

    const { data: certificateId } = validationResult;

    await db.$transaction(async (tx) => {
      try {
        const deletedCertificate = await tx.certificate.delete({
          where: {
            id: certificateId,
          },
          select: {
            imageKey: true,
          },
        });
        const result = await uploadThing.deleteFiles([
          deletedCertificate.imageKey,
        ]);
        if (!result) {
          throw Error("Image Not Deleted Sucessfully");
        }
      } catch (error) {
        throw error;
      }
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Certificate Deleted Sucessfully",
    };
  } catch (error) {
    console.error("Error in certificateDeleteAction:", error);
    return {
      error: true,
      message: "Something Went Wrong! Try Again",
    } as const;
  }
}
