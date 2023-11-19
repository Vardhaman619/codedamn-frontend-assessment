import { redirect } from "next/navigation";
import { TypographyH3 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import EducationCard from "./_components/education-card";
import NoDataIllustration from "~/components/shared/nodata-illustration";
import WorkExperianceCard from "./_components/work-experiance-card";
import ResumeForm from "./_components/resume-form";
import EducationCreateDialog from "./_components/education-create-dialog";
import WorkExperianceCreateDialog from "./_components/work-experiance-create-dialog";

async function getUserEducationAndWorkData(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      educations: {
        select: {
          degree: true,
          institution: true,
          location: true,
          startDate: true,
          description: true,
          endDate: true,
          id: true,
        },
      },
      workExperiences: {
        select: {
          company: true,
          description: true,
          endDate: true,
          id: true,
          location: true,
          startDate: true,
          title: true,
        },
      },
      techSkills: true,
      interests: true,
      languages: true,
    },
  });
}

export default async function ResumeEditPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/sigin");
    return;
  }
  const userProjectExperianceOthersData = await getUserEducationAndWorkData(
    session.user.id,
  );

  if (!userProjectExperianceOthersData) {
    redirect("/api/auth/sigin");
    return;
  }
  const { educations, interests, languages, techSkills, workExperiences } =
    userProjectExperianceOthersData;
  return (
    <div className=" max-w-screen-md space-y-10">
      <section className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <TypographyH3>Education</TypographyH3>
          <EducationCreateDialog />
        </div>
        <div className="space-y-5">
          {educations.length > 0 ? (
            educations.map((education) => {
              return <EducationCard key={education.id} {...education} />;
            })
          ) : (
            <div className="flex h-60 flex-col items-center gap-6 rounded bg-muted p-6 text-center">
              <NoDataIllustration />
              <TypographyH3 className="mb-4">
                No Education Data Added Yet.
              </TypographyH3>
            </div>
          )}
        </div>
      </section>
      <section className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <TypographyH3>Work Experience</TypographyH3>
          <WorkExperianceCreateDialog />
        </div>
        <div className="space-y-5">
          {workExperiences.length > 0 ? (
            workExperiences.map((workExperience) => {
              return (
                <WorkExperianceCard
                  key={workExperience.id}
                  {...workExperience}
                />
              );
            })
          ) : (
            <div className="flex h-60 flex-col items-center gap-6 rounded bg-muted p-6 text-center">
              <NoDataIllustration />
              <TypographyH3 className="mb-4">
                No Work Experiance Data Added Yet.
              </TypographyH3>
            </div>
          )}
        </div>
      </section>
      <hr className="border-b border-border" />
      <ResumeForm
        languages={languages}
        interests={interests}
        techSkills={techSkills}
      />
    </div>
  );
}
