"use client";

import type { WorkExperience } from "@prisma/client";
import format from "date-fns/format";
import WorkExperianceIcon from "~/components/icons/custom/work-experiance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import WorkExperianceDeleteDialog from "./work-experiance-delete-dialog";
import WorkExperianceEditDialog from "./work-experiance-edit-dialog";

type WorkExperianceCardProps = Omit<WorkExperience, "userId">;
export default function WorkExperianceCard({
  title,
  description,
  company,
  location,
  endDate,
  startDate,
  id,
}: WorkExperianceCardProps) {
  const duration = `${format(startDate, "MMM yyyy")} - ${
    endDate ? format(endDate, "MMM yyyy") : "Present"
  }`;
  return (
    <Card variant={"secondary"} className="flex items-start gap-4 p-6">
      <div>
        <WorkExperianceIcon className="h-10 w-10" />
      </div>
      <div className="w-full">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-semibold">
            {title} at {company}
          </CardTitle>
          <div className="mt-1 flex w-full  items-baseline justify-between">
            <CardDescription>
              <span className="flex items-center gap-2">
                {location}
                <span>•</span>
                {company}
              </span>
            </CardDescription>
            <p className="font-semibold text-card-foreground">{duration}</p>
          </div>
        </CardHeader>
        <CardContent className="mt-6 p-0 text-muted-foreground">
          {description}
        </CardContent>
        <CardFooter className="mt-4 flex flex-row-reverse gap-2 p-0">
          <WorkExperianceEditDialog
            id={id}
            title={title}
            company={company}
            description={description}
            location={location}
            startDate={format(startDate, "yyyy-MM-dd")}
            endDate={endDate ? format(endDate, "yyyy-MM-dd") : null}
          />
          <WorkExperianceDeleteDialog id={id} />
        </CardFooter>
      </div>
    </Card>
  );
}
