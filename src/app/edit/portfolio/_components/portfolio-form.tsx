"use client";

import { type Playground, type Project } from "@prisma/client";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import format from "date-fns/format";
import { memo, useCallback, useEffect, useMemo, useTransition } from "react";
import { type PortfolioFormSchema, portfolioFormSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useToast } from "~/components/ui/use-toast";
import SubmitButton from "~/components/shared/submit-button";
import CancelButton from "~/components/shared/cancel-button";
import { Form, FormField } from "~/components/ui/form";
import { TypographyH3 } from "~/components/ui/typography";
import PlaygroundCard from "./playground-card";
import { type CheckedState } from "@radix-ui/react-checkbox";
import PlaygroundCreateDialog from "./playground-create-dialog";
import ProjectCard from "./project-card";
import CreateProjectDialog from "./project-create-dialog";
import { PortfolioFormAction } from "../action";
import { useToast } from "~/components/ui/use-toast";
import NoDataIllustration from "~/components/shared/nodata-illustration";

type PortfolioFormProps = {
  playgrounds: Omit<Playground, "userId">[];
  projects: Omit<Project, "userId" | "imageKey">[];
  visibleProjects: { id: string }[];
  visiblePlaygrounds: { id: string }[];
};

function PortfolioForm({
  playgrounds,
  visiblePlaygrounds,
  projects,
  visibleProjects,
}: PortfolioFormProps) {
  const [isPending, startTranstion] = useTransition();
  const form = useForm<PortfolioFormSchema>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      playgrounds: playgrounds
        .filter(
          (playground) =>
            visiblePlaygrounds.findIndex(
              (visiblePlayground) => playground.id == visiblePlayground.id,
            ) >= 0,
        )
        .map(({ id }) => id),
      projects: projects
        .filter(
          (project) =>
            visibleProjects.findIndex(
              (visibleProject) => project.id == visibleProject.id,
            ) >= 0,
        )
        .map(({ id }) => id),
    },
  });

  const { toast } = useToast();
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;

  const onCheckboxChange = useCallback(function (
    field: { onChange: (value: string[]) => void; value: string[] },
    item: { id: string },
  ) {
    return (checked: CheckedState) => {
      return checked
        ? field.onChange([...field.value, item.id])
        : field.onChange(field.value?.filter((value) => value !== item.id));
    };
  }, []);

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handelFormSubmit(formdata: PortfolioFormSchema) {
    startTranstion(async () => {
      const result = await PortfolioFormAction(formdata);
      console.log(result);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof PortfolioFormSchema, {
              message: errors[0],
            });
          }
          toast({
            title: result.message,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: result.message,
          variant: "destructive",
        });
        return;
      }
      if (result.success) {
        toast({
          title: result.message,
          variant: "default",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        name="portfolio-form"
        onSubmit={form.handleSubmit(handelFormSubmit)}
        className="mb-14 max-w-screen-md space-y-10"
      >
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
              Playgrounds
            </h3>

            <PlaygroundCreateDialog />
          </div>
          {playgrounds.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 ">
              <FormField
                control={form.control}
                name="playgrounds"
                render={() => (
                  <>
                    {playgrounds.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="playgrounds"
                        render={({ field }) => (
                          <PlaygroundCard
                            key={item.id}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={onCheckboxChange(field, item)}
                            {...item}
                          />
                        )}
                      />
                    ))}
                  </>
                )}
              />
            </div>
          ) : (
            <div className="flex h-60 flex-col items-center gap-6 rounded bg-muted p-6 text-center">
              <NoDataIllustration />
              <TypographyH3 className="mb-4">No playground found.</TypographyH3>
            </div>
          )}
        </section>
        <section>
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="text-2xl font-semibold tracking-tight">
                Projects
              </h3>
              <CreateProjectDialog />
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 ">
                <FormField
                  control={form.control}
                  name="projects"
                  render={() => (
                    <>
                      {projects.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="playgrounds"
                          render={({ field }) => (
                            <ProjectCard
                              key={item.id}
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={onCheckboxChange(field, item)}
                              {...item}
                            />
                          )}
                        />
                      ))}
                    </>
                  )}
                />
              </div>
            ) : (
              <div className="flex h-60 flex-col items-center gap-6 rounded bg-muted p-6 text-center">
                <NoDataIllustration />
                <TypographyH3 className="mb-4">No Project found.</TypographyH3>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-row-reverse gap-3">
          <SubmitButton
            isLoading={isPending}
            disabled={isFormDisable || !isDirty}
          />
          <CancelButton />
        </section>
      </form>
    </Form>
  );
}
export default memo(PortfolioForm);
