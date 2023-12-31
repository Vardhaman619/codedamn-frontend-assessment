"use client";
import { Card } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import langToIcon from "~/lib/lang-to-icon";
import { type CheckedState, Root } from "@radix-ui/react-checkbox";
import { TypographyH4, TypographySmall } from "~/components/ui/typography";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import type { Languages } from "@prisma/client";
import ProjectDeleteDialog from "~/components/shared/project/project-delete-dialog";

type ProjectCardProps = {
  id: string;
  title: string;
  languagesUsed: Languages[];
  createdAt: Date;
  badges: string[];
  image: string;
  checked: boolean;
  onCheckedChange: (checked: CheckedState) => void;
};

export default function ProjectCard({
  checked,
  onCheckedChange,
  badges,
  languagesUsed,
  createdAt,
  title,
  image,
  id,
}: ProjectCardProps) {
  return (
    <Root asChild checked={checked} onCheckedChange={onCheckedChange}>
      <Card
        className="flex max-w-sm cursor-pointer flex-col gap-y-5 p-4 hover:bg-primary/10 data-[state=checked]:border data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:hover:bg-opacity-20"
        role="checkbox"
      >
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            className="aspect-video w-full bg-muted object-cover object-center"
            alt={`${title} project image`}
          />
          {badges?.length ? (
            <div className="absolute bottom-2 flex gap-3 px-2 text-xs">
              {badges.map((badge) => {
                return (
                  <button
                    className="rounded bg-sky-300 px-3 py-0.5 font-semibold text-sky-900"
                    key={badge}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between gap-2">
            <TypographyH4>{title}</TypographyH4>
            <ProjectDeleteDialog id={id} />
          </div>
          <div className="flex flex-wrap items-center gap-2 gap-y-3 text-muted-foreground">
            {languagesUsed?.length &&
              languagesUsed.map((language, index) => {
                const LangIcon = langToIcon(language);
                return (
                  <div key={language} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                    )}
                    <TypographySmall className="flex items-center gap-1">
                      <span>
                        <LangIcon />
                      </span>{" "}
                      {language}
                    </TypographySmall>
                  </div>
                );
              })}
            <time
              dateTime={createdAt.toISOString()}
              className={
                "flex items-center gap-2 text-sm font-medium leading-none"
              }
            >
              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </time>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex -space-x-0.5 [&>*]:outline [&>*]:outline-border">
              <Avatar role="button" variant={"small"}>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Peanut&backgroundColor=d1d4f9,b6e3f4,ffdfbf"
                  alt={`contributor's profile photo`}
                />
                <AvatarFallback>C1</AvatarFallback>
              </Avatar>
              <Avatar role="button" variant={"small"}>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Peanut&backgroundColor=d1d4f9,b6e3f4,ffdfbf"
                  alt={`contributor's profile photo`}
                />
                <AvatarFallback>C2</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              3 contributors
            </p>
          </div>
        </div>
      </Card>
    </Root>
  );
}
