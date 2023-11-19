import { getServerAuthSession } from "~/server/auth";
import SocialsForm from "./_components/socials-form";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
async function getUserSocialsData(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      githubProfile: true,
      behanceProfile: true,
      dribbleProfile: true,
      facebookProfile: true,
      instagramProfile: true,
      linkedinProfile: true,
      youtubeProfile: true,
    },
  });
}

export default async function SocialsEditPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/sigin");
    return;
  }
  const userSocialsData = await getUserSocialsData(session.user.id);
  if (!userSocialsData) {
    redirect("/api/auth/sigin");
    return;
  }
  const {
    githubProfile,
    behanceProfile,
    dribbleProfile,
    facebookProfile,
    instagramProfile,
    linkedinProfile,
    youtubeProfile,
  } = userSocialsData;

  return (
    <SocialsForm
      githubProfile={githubProfile ?? ""}
      behanceProfile={behanceProfile ?? ""}
      dribbleProfile={dribbleProfile ?? ""}
      facebookProfile={facebookProfile ?? ""}
      instagramProfile={instagramProfile ?? ""}
      linkedinProfile={linkedinProfile ?? ""}
      youtubeProfile={youtubeProfile ?? ""}
    />
  );
}
