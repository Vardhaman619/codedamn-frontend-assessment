"use client";
import { Fragment } from "react";
import { Card } from "~/components/ui/card";
import langToIcon from "~/lib/lang-to-icon";
import { TypographyH4, TypographySmall } from "~/components/ui/typography";
import type { Project } from "@prisma/client";
import { Badge } from "~/components/ui/badge";

type ProjectCardProps = Omit<Project, "userId" | "imageKey" | "createdAt">;

export default function ProjectCard({
  badges,
  languagesUsed,
  title,
  image,
}: ProjectCardProps) {
  return (
    <Card
      className="flex max-w-sm flex-col gap-y-5 p-4 md:max-w-xl"
      variant={"secondary"}
    >
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          className="aspect-video w-full bg-muted object-cover object-center"
          alt={`${title ?? ""} project image`}
        />
        {badges?.length ? (
          <div className="absolute bottom-2 flex gap-3 px-2 text-xs">
            {badges.map((badge) => {
              return (
                <Badge key={badge} size={"base"}>
                  {badge}
                </Badge>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between gap-2">
          <TypographyH4>{title}</TypographyH4>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          {languagesUsed?.length > 0 &&
            languagesUsed.map((language, index, currentArray) => {
              const LangIcon = langToIcon(language);
              const isLastItem = index == currentArray.length - 1;
              return (
                <Fragment key={language}>
                  <TypographySmall className="flex items-center gap-2">
                    <span>
                      <LangIcon />
                    </span>{" "}
                    {language}
                  </TypographySmall>
                  {!isLastItem && (
                    <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                  )}
                </Fragment>
              );
            })}
        </div>
      </div>
    </Card>
  );
}
