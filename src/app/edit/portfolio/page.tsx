import { db } from "~/server/db";
import PortfolioForm from "./_components/portfolio-form";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

async function getUserProjectsPlaygroundsData(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      playgrounds: {
        select: {
          id: true,
          title: true,
          language: true,
          createdAt: true,
        },
      },
      projects: {
        select: {
          id: true,
          createdAt: true,
          image: true,
          languagesUsed: true,
          title: true,
          badges: true,
        },
      },
      visiblePlaygrounds: {
        select: {
          id: true,
        },
      },
      visibleProjects: {
        select: {
          id: true,
        },
      },
    },
  });
}
export default async function PortfolioPage() {
  // const delay = await new Promise((resolve) => setTimeout(resolve, 10000));
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/sigin");
    return;
  }

  const userProjectsPlaygroundsData = await getUserProjectsPlaygroundsData(
    session.user.id,
  );

  if (!userProjectsPlaygroundsData) {
    redirect("/api/auth/signin");
    return;
  }
  const { playgrounds, visiblePlaygrounds, projects, visibleProjects } =
    userProjectsPlaygroundsData;

  return (
    <PortfolioForm
      playgrounds={playgrounds}
      projects={projects}
      visiblePlaygrounds={visiblePlaygrounds}
      visibleProjects={visibleProjects}
    />
  );
}
