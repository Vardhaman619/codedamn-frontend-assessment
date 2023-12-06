/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditIcon from "~/components/icons/custom/edit";
import LocationIcon from "~/components/icons/custom/location";
import BehanceIcon from "~/components/icons/socials/behance";
import FacebookIcon from "~/components/icons/socials/facebook";
import GithubIcon from "~/components/icons/socials/github";
import InstagramIcon from "~/components/icons/socials/instagram";
import LinkedinIcon from "~/components/icons/socials/linkedin";
import YoutubeIcon from "~/components/icons/socials/youtube";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  TypographyH2,
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
} from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ThunderIcon from "~/components/icons/custom/thunder";
import StarFourIcon from "~/components/icons/custom/star-four";
import TrophyIcon from "~/components/icons/custom/trophy";
import HeartBeatIcon from "~/components/icons/custom/heart-beat";
import { Card, CardContent } from "~/components/ui/card";
import ProjectCard from "./_components/project-card";
import PlaygroundCard from "./_components/playground-card";
import CertificateCard from "./_components/certificate-card";
import EducationCard from "./_components/education-card";
import WorkExperianceCard from "./_components/work-experiance-card";

import NoDataIllustration from "~/components/illustrations/no-data";
import langToIcon from "~/lib/lang-to-icon";
import { type Languages } from "@prisma/client";
import UserIcon from "~/components/icons/custom/user";
import { cn } from "~/lib/utils";
import DribbleIcon from "~/components/icons/socials/dribble";
import BadgeIcon from "~/components/icons/custom/badge";
import CoverImageContainer from "~/components/shared/cover-image/cover-image";
import CreateProjectDialog from "~/components/shared/project/project-create-dialog";
import CreateCertificateDialog from "~/components/shared/certificate/certificate-create-dialog";
import { KARMA_POINTS, LEAGUE, STREAK, XP } from "~/constants";
async function getUserData(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
      about: true,
      profession: true,
      xp: true,
      badges: true,
      githubProfile: true,
      linkedinProfile: true,
      instagramProfile: true,
      facebookProfile: true,
      dribbleProfile: true,
      behanceProfile: true,
      youtubeProfile: true,
      visiblePlaygrounds: {
        select: {
          id: true,
          title: true,
          language: true,
          createdAt: true,
        },
      },

      visibleProjects: {
        select: {
          id: true,
          title: true,
          languagesUsed: true,
          badges: true,
          image: true,
        },
      },

      certificates: {
        select: {
          id: true,
          image: true,
          title: true,
          issuedOn: true,
          credentialLink: true,
        },
      },
      workExperiences: {
        select: {
          id: true,
          title: true,
          location: true,
          startDate: true,
          endDate: true,
          description: true,
          company: true,
        },
      },
      educations: {
        select: {
          id: true,
          institution: true,
          location: true,
          degree: true,
          startDate: true,
          endDate: true,
          description: true,
        },
      },
      techSkills: true,
      interests: true,
      languages: true,
    },
  });
}
const states = [
  {
    name: "Longest streak",
    value: STREAK,
    icon: <ThunderIcon className="h-8 w-8 text-primary" />,
  },
  {
    name: "Experience points",
    value: XP,
    icon: <StarFourIcon className="h-8 w-8 text-sky-500" />,
  },
  {
    name: "Current league",
    value: LEAGUE,
    icon: <TrophyIcon className="h-8 w-8 text-orange-500" />,
  },
  {
    name: "Karma points",
    value: KARMA_POINTS,
    icon: (
      <HeartBeatIcon className="h-14 w-14 -translate-x-3 translate-y-1 text-pink-500" />
    ),
  },
];
export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/sigin");
  }

  const userData = await getUserData(session.user.id);

  if (!userData) {
    redirect("/api/auth/sigin");
  }
  const {
    email,
    name,
    about,
    badges,
    behanceProfile,
    githubProfile,
    certificates,
    dribbleProfile,
    educations,
    facebookProfile,
    image,
    instagramProfile,
    interests,
    languages,
    linkedinProfile,
    profession,
    techSkills,
    visiblePlaygrounds: playgrounds,
    visibleProjects: projects,
    workExperiences,
    xp,
    youtubeProfile,
  } = userData;

  return (
    <main className="mx-auto mb-32 mt-16 flex max-w-screen-md flex-col gap-10">
      <section>
        <CoverImageContainer userId={session.user.id} />
        <div className="relative rounded-b-2xl border border-border pb-8 pe-6 pl-6 pt-24 md:pl-48 md:pt-6">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 overflow-visible md:left-0 md:translate-x-4">
            <Avatar className="h-36 w-36">
              <AvatarImage src={image ?? undefined} />
              <AvatarFallback>
                <UserIcon className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-4">
              <div className="relative grid place-items-center">
                <BadgeIcon className="absolute " style={{ scale: 5.5 }} />
                <span className="relative -top-0.5 z-10 font-bold text-white">
                  {xp}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 ">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="flex flex-col flex-wrap items-center gap-3 md:flex-row">
                <TypographyH2 className="border-0 text-center capitalize md:text-start">
                  {name}
                </TypographyH2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {badges.map((badge) => (
                    <Badge size={"base"} className="text-sm" key={badge}>
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <TypographyMuted className="font-medium">
                {profession}
              </TypographyMuted>
              <TypographyMuted className="inline-flex items-center gap-1 text-zinc-400">
                <LocationIcon className="h-4 w-4" />
                Remote, India
              </TypographyMuted>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {techSkills?.length > 0 &&
                techSkills.map((techSkill) => {
                  return (
                    <Badge
                      variant={"secondary"}
                      size={"large"}
                      className="text-xs"
                      key={techSkill}
                    >
                      {techSkill}
                    </Badge>
                  );
                })}
            </div>
            <hr className="border-border" />
            <div
              className="flex flex-wrap items-start justify-between gap-6
            "
            >
              <div className="flex flex-wrap gap-4">
                {githubProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={githubProfile}>
                      <GithubIcon />
                    </a>
                  </Button>
                ) : null}

                {instagramProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={instagramProfile}>
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}

                {behanceProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={behanceProfile}>
                      <BehanceIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}

                {linkedinProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={linkedinProfile}>
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                {facebookProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={facebookProfile}>
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}

                {youtubeProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={youtubeProfile}>
                      <YoutubeIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                {dribbleProfile ? (
                  <Button size={"icon"} variant={"outline"} asChild>
                    <a href={dribbleProfile}>
                      <DribbleIcon className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
              <div className="flex gap-4">
                <Link
                  href={"/edit"}
                  className={cn(
                    buttonVariants({
                      variant: "secondary",
                      size: "icon",
                      className: "h-10 w-10",
                    }),
                  )}
                >
                  <EditIcon className="h-4 w-4" />
                </Link>
                <Button size={"lg"} asChild>
                  <a href={`mailto:${email}`} target="_blank">
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={"Loading..."}>
        <div>
          <Tabs defaultValue="portfolio">
            <TabsList className="flex gap-6 rounded-xl border border-border bg-transparent px-6 py-2">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>
            <TabsContent value="portfolio" className="mt-10 space-y-10">
              <section className="flex flex-col gap-6">
                <h4 className="text-2xl font-bold">Stats</h4>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {states.map((state) => (
                    <Card key={state.name} variant={"secondary"}>
                      <CardContent className="flex flex-row items-center gap-x-4 px-5 py-5 md:py-3">
                        <div className="w-7">{state.icon}</div>
                        <div className="flex flex-col">
                          <strong className="text-xl leading-7">
                            {state.value}
                          </strong>
                          <p className="text-muted-foreground">{state.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              <section className="pb-4">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Projects</h4>
                  <CreateProjectDialog />
                </div>
                <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2">
                  {projects?.length > 0 ? (
                    projects.map((project) => {
                      return <ProjectCard key={project.id} {...project} />;
                    })
                  ) : (
                    <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                      <NoDataIllustration className="w-56 text-primary" />
                      <TypographyLarge>
                        No Playground Created Yet.
                      </TypographyLarge>
                    </div>
                  )}
                </div>
              </section>
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Playgrounds</h4>
                  <CreateProjectDialog />
                </div>
                <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2">
                  {playgrounds.length > 0 ? (
                    playgrounds.map((playground) => (
                      <PlaygroundCard key={playground.id} {...playground} />
                    ))
                  ) : (
                    <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                      <NoDataIllustration className="w-56 text-primary" />
                      <TypographyLarge>
                        No Playground Created Yet.
                      </TypographyLarge>
                    </div>
                  )}
                </div>
              </section>
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Certificates</h4>
                  <CreateCertificateDialog />
                </div>
                <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2">
                  {certificates.length > 0 ? (
                    certificates.map((certificate, index) => (
                      <CertificateCard key={index} {...certificate} />
                    ))
                  ) : (
                    <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                      <NoDataIllustration className="w-56 text-primary" />
                      <TypographyLarge>
                        No Certificates Added Yet.
                      </TypographyLarge>
                    </div>
                  )}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="resume" className="mt-10 space-y-10">
              <section className="flex flex-col gap-6">
                <TypographyH3>About Me</TypographyH3>
                <Card variant={"secondary"} className="space-y-6 p-6">
                  <CardContent className=" w-full max-w-prose whitespace-pre-wrap p-0 font-medium leading-6">
                    {about && about?.length > 0
                      ? about
                      : "No About Text Added Yet."}
                  </CardContent>
                  {about && about?.length > 0 ? (
                    <Button variant={"secondary"}>Read more</Button>
                  ) : null}
                </Card>
              </section>
              <section className="space-y-6">
                <TypographyH3>Working experience</TypographyH3>
                <div className="space-y-5">
                  {workExperiences.length > 0 ? (
                    workExperiences.map((workExperience) => (
                      <WorkExperianceCard
                        key={workExperience.id}
                        {...workExperience}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                      <NoDataIllustration className="w-56 text-primary" />
                      <TypographyLarge>
                        No Work Experiance Details Added Yet.
                      </TypographyLarge>
                    </div>
                  )}
                </div>
              </section>
              <section className="space-y-6">
                <TypographyH3>Education</TypographyH3>
                {educations.length > 0 ? (
                  <div className="space-y-5">
                    {educations.map((education) => (
                      <EducationCard key={education.id} {...education} />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                    <NoDataIllustration className="w-56 text-primary" />
                    <TypographyLarge>
                      No Education Details Added Yet.
                    </TypographyLarge>
                  </div>
                )}
              </section>
              <section className="space-y-6">
                <TypographyH3>Tech Skills</TypographyH3>
                {techSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-5">
                    {techSkills.map((techSkill) => {
                      const Icon = langToIcon(
                        String(techSkill).trim().toUpperCase() as Languages,
                      );
                      return (
                        <Badge
                          variant={"secondary"}
                          size={"large"}
                          className="text-xs"
                          key={techSkill}
                        >
                          {Icon && <Icon />}
                          {techSkill}
                        </Badge>
                      );
                    })}
                  </div>
                ) : (
                  <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                    <NoDataIllustration className="w-56 text-primary" />
                    <TypographyLarge>No Techskill Added Yet.</TypographyLarge>
                  </div>
                )}
              </section>
              <section className="flex flex-col gap-6">
                <TypographyH3>Interest</TypographyH3>
                {interests.length > 0 ? (
                  <div className="flex flex-wrap gap-5">
                    {interests.map((interest) => (
                      <Badge
                        variant={"secondary"}
                        size={"large"}
                        className="text-xs"
                        key={interest}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                    <NoDataIllustration className="w-56 text-primary" />
                    <TypographyLarge>No Interest Added Yet.</TypographyLarge>
                  </div>
                )}
              </section>
              <section className="flex flex-col gap-6">
                <TypographyH3>Languages</TypographyH3>
                <div className="flex flex-wrap gap-5">
                  {languages.length > 0 ? (
                    languages.map((language) => (
                      <Badge
                        variant={"secondary"}
                        size={"large"}
                        className="text-xs"
                        key={language}
                      >
                        {language}
                      </Badge>
                    ))
                  ) : (
                    <div className="col-span-2 grid w-full place-items-center gap-5 bg-muted p-4">
                      <NoDataIllustration className="w-56 text-primary" />
                      <TypographyLarge>No Languages Added Yet.</TypographyLarge>
                    </div>
                  )}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </main>
  );
}
