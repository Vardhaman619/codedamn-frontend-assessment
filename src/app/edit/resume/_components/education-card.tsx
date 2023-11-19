"use client";

import type { Education } from "@prisma/client";
import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
import EducationIcon from "~/components/icons/custom/education";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import EducationDeleteDialog from "./education-delete-dialog";
import EducationEditDialog from "./education-edit-dialog";

type EducationCardProps = Omit<Education, "userId">;

export default function EducationCard({
  degree,
  description,
  endDate,
  startDate,
  institution,
  location,
  id,
}: EducationCardProps) {
  const duration = `${format(startDate, "MMM yyyy")} - ${
    endDate ? format(endDate, "MMM yyyy") : "Present"
  }`;
  return (
    <Card variant={"secondary"} className="flex items-start gap-4 p-6 pb-0">
      <div>
        <EducationIcon className="h-10 w-10" />
      </div>
      <div className="w-full">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-semibold">{institution}</CardTitle>
          <div className="mt-1 flex w-full  items-baseline justify-between">
            <CardDescription>
              <span className="flex items-center gap-2">
                {location}
                <span>•</span>
                {degree}
              </span>
            </CardDescription>
            <p className="font-semibold text-card-foreground">{duration}</p>
          </div>
        </CardHeader>
        <CardContent className="mt-6 p-0 text-muted-foreground">
          {description}
        </CardContent>
        <CardFooter className="mt-4 flex flex-row-reverse gap-2 px-0">
          <EducationEditDialog
            id={id}
            degree={degree}
            description={description}
            startDate={format(startDate, "yyyy-MM-dd")}
            endDate={endDate ? format(endDate, "yyyy-MM-dd") : null}
            institution={institution}
            location={location}
          />

          <EducationDeleteDialog id={id} />
        </CardFooter>
      </div>
    </Card>
  );
}
