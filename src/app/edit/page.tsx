import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import ProfileForm from "./_components/profile-form";
import format from "date-fns/format";
import type { Gender } from "@prisma/client";

async function getUserProfileData(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      about: true,
      showAchievementBadges: true,
      showFollowersFollowing: true,
      showXP: true,
      image: true,
      dob: true,
      profession: true,
      gender: true,
    },
  });
}

export default async function ProfileEditPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/sigin");
    return;
  }
  const userProfileData = await getUserProfileData(session.user.id);

  if (!userProfileData) {
    redirect("/api/auth/sigin");
    return;
  }
  // console.log({ userProfileData });
  const {
    about,
    dob,
    gender,
    image,
    name,
    profession,
    showAchievementBadges,
    showFollowersFollowing,
    showXP,
  } = userProfileData;

  return (
    <ProfileForm
      name={name!}
      image={image!}
      gender={gender ?? ("" as Gender)}
      about={about ?? ""}
      profession={profession ?? ""}
      dob={dob ? format(dob, "yyyy-MM-dd") : ""}
      showXP={showXP}
      showFollowersFollowing={showFollowersFollowing}
      showAchievementBadges={showAchievementBadges}
    />
  );
}
