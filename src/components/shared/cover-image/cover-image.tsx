import { cn } from "~/lib/utils";
import { db } from "~/server/db";

import CoverImageDropzone from "./dropzone";
async function getCoverImage(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      coverImage: true,
    },
  });
  return data?.coverImage;
}
type CoverImageContainerProps = {
  userId: string;
};
export default async function CoverImageContainer({
  userId,
}: CoverImageContainerProps) {
  const coverImage = await getCoverImage(userId);

  return (
    <div
      className={cn(
        ` h-44 overflow-hidden rounded-t-2xl border bg-cover bg-center`,
        {
          "bg-gradient-to-r from-blue-500 via-sky-500 to-purple-600 to-90% ":
            !coverImage,
        },
      )}
      style={{
        ...(coverImage && {
          backgroundImage: `url('${coverImage}')`,
        }),
      }}
    >
      <CoverImageDropzone />
    </div>
  );
}
