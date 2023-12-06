"use client";

import type { Education } from "@prisma/client";
import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
import EducationIcon from "~/components/icons/custom/education";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type EducationCardProps = Omit<Education, "userId" | "id">;

export default function EducationCard({
  degree,
  description,
  endDate,
  startDate,
  institution,
  location,
}: EducationCardProps) {
  const duration = `${format(startDate, "MMM yyyy")} - ${
    endDate ? format(endDate, "MMM yyyy") : "Present"
  }`;
  return (
    <Card
      variant={"secondary"}
      className="flex flex-col items-start gap-4 p-6 md:flex-row"
    >
      <div>
        <EducationIcon className="h-10 w-10" />
      </div>
      <div className="w-full">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-semibold">{institution}</CardTitle>
          <div className="mt-1 flex w-full flex-wrap-reverse items-end justify-between gap-x-8 text-card-foreground">
            <CardDescription className="text-inherit">
              <span className="flex items-center gap-2">
                {location}
                <span>•</span>
                {degree}
              </span>
            </CardDescription>
            <p className="font-semibold">{duration}</p>
          </div>
        </CardHeader>
        <CardContent className="mt-6 p-0 text-muted-foreground">
          {description}
        </CardContent>
      </div>
    </Card>
  );
}
