import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { TypographyLarge, TypographySmall } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { memo } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import type { Playground } from "@prisma/client";
import langToIcon from "~/lib/lang-to-icon";

type PlaygroundCardProps = Omit<Playground, "userId">;

function PlaygroundCard({ title, language, createdAt }: PlaygroundCardProps) {
  const Icon = langToIcon(language);
  const formatedCreatedAt = formatDistanceToNow(createdAt, { addSuffix: true });
  return (
    <Card className={cn("flex flex-row gap-3 p-4")} variant={"secondary"}>
      <span>
        <Icon className="h-10 w-10" />
      </span>
      <div className="flex flex-1 flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <TypographyLarge>{title}</TypographyLarge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TypographySmall className="leading-5">{language}</TypographySmall>
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
          <time
            dateTime={createdAt.toISOString()}
            className={"text-sm font-medium capitalize leading-none"}
          >
            {formatedCreatedAt}
          </time>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex -space-x-1">
            <Avatar role="button" variant={"small"}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Garfield&flip=true&backgroundColor=ffd5dc" />
              <AvatarFallback>UZ</AvatarFallback>
            </Avatar>
            <Avatar role="button" variant={"small"}>
              <AvatarImage src="https://api.dicebear.com/7.x/big-smile/svg?seed=Cookie&backgroundColor=b6e3f4" />
              <AvatarFallback>UZ</AvatarFallback>
            </Avatar>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Shared with <b> Adam , Anna.. </b> +7 more
          </p>
        </div>
      </div>
    </Card>
  );
}

export default memo(PlaygroundCard);
