import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { TypographySmall } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { memo } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { Languages } from "@prisma/client";
import langToIcon from "~/lib/lang-to-icon";

type PlaygroundCardProps = {
  id: string;
  title: string;
  createdAt: Date;
  language: Languages;
  checked: boolean;
  onCheckedChange: (chekced: CheckedState) => void;
};

function PlaygroundCard({
  checked,
  title,
  language,
  createdAt,
  onCheckedChange,
}: PlaygroundCardProps) {
  const Icon = langToIcon(language);
  return (
    <Card
      className={cn("flex flex-row gap-3 p-4 text-left", {
        "bg-primary/10 outline outline-2 outline-primary": checked,
      })}
      variant={"secondary"}
    >
      <span>
        <Icon className="h-10 w-10" />
      </span>
      <div className="flex flex-1 flex-col gap-1 text-zinc-500">
        <div className="flex items-center justify-between">
          <h4 className="flex items-start justify-between text-xl font-semibold tracking-tight text-card-foreground">
            {title}
          </h4>
          <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
        </div>
        <div className="flex items-center gap-2">
          <TypographySmall className="leading-5">{language}</TypographySmall>
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
          <time
            dateTime={createdAt.toISOString()}
            className={"text-sm font-medium leading-none"}
          >
            {formatDistanceToNow(createdAt, { addSuffix: true })}
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
          <p className="mt-1 text-sm text-muted-foreground">
            Shared with <b> Adam , Anna.. </b> +7 more
          </p>
        </div>
      </div>
    </Card>
  );
}

export default memo(PlaygroundCard);
