"use client";

import { useState, useTransition, useEffect, useCallback, memo } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogHeader, DialogFooter } from "~/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "~/components/ui/checkbox";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Languages } from "@prisma/client";
import Spinner from "~/components/icons/custom/spinner";

import { type ProjectCreateSchema, projectCreateSchema } from "./schema";
import SubmitButton from "~/components/shared/submit-button";
import { ProjectCreateAction } from "./action";
import { Card } from "~/components/ui/card";
import { type FileWithPath } from "@uploadthing/react";
import { TypographySmall } from "~/components/ui/typography";
import { useDropzone } from "@uploadthing/react/hooks";
import { cn } from "~/lib/utils";
import UploadIcon from "~/components/icons/custom/upload";

export default function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<ProjectCreateSchema>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      image: "" as unknown as FileWithPreview,
      title: "",
      languagesUsed: [],
    },
  });

  const { toast } = useToast();
  const [isPending, startTranstion] = useTransition();
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, setOpen]);

  function handelFormSubmit(formdata: ProjectCreateSchema) {
    startTranstion(async () => {
      const data = new FormData();
      data.append("title", formdata.title);
      data.append("languagesUsed", formdata.languagesUsed.join());
      data.append("image", formdata.image);

      const result = await ProjectCreateAction(data);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof ProjectCreateSchema, {
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
        setTimeout(() => {
          setOpen(false);
        }, 300);
        return;
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="gap-2 text-inherit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Adding data...
            </>
          ) : (
            <>
              <PlusIcon />
              Add New Project
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(event) => {
          isPending && event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Projects</DialogTitle>
          <DialogDescription>Show your skills using project</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            name="playground-create-form"
            className="space-y-4"
            onSubmit={(event) => {
              event.stopPropagation();
              void form.handleSubmit(handelFormSubmit)(event);
            }}
          >
            <FormField
              control={form.control}
              name="title"
              disabled={isFormDisable}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Project Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="languagesUsed"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Languages Used</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.values(Languages).map((langName) => (
                      <FormField
                        key={langName}
                        control={form.control}
                        name="languagesUsed"
                        disabled={isFormDisable}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={langName}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  disabled={isFormDisable}
                                  checked={field.value?.includes(langName)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          langName,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== langName,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal capitalize">
                                {langName}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              disabled={isFormDisable}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref, ...field } }) => (
                <FormItem>
                  <FormLabel> Project Title </FormLabel>
                  <FormControl>
                    <ProjectImageDropzone {...field} />
                  </FormControl>
                  <ProjectImagePreview image={field.value} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5 flex !flex-row-reverse !justify-start gap-2 ">
              <SubmitButton
                type="submit"
                isLoading={isPending}
                disabled={isFormDisable || !isDirty}
              >
                Create Project
              </SubmitButton>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isFormDisable}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type ProjectImagePreviewProps = {
  image?: FileWithPreview;
};
const ProjectImagePreview = memo(function ProjectImagePreview({
  image,
}: ProjectImagePreviewProps) {
  if (!image) {
    return null;
  }
  return (
    <Card className="relative flex gap-5 p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="aspect-video border border-border object-cover object-center"
        style={{ maxWidth: "40%" }}
        src={image.preview}
        alt={"The uploaded image of project"}
      />
      <div className="flex-1">
        <TypographySmall>{image.name}</TypographySmall>
      </div>
    </Card>
  );
});

type ProjectImageDropzoneProps = Omit<
  ControllerRenderProps<{ image?: FileWithPreview }, "image">,
  "ref"
>;
const ProjectImageDropzone = memo(function ProjectImageDropzone({
  onChange,
  value,
  disabled,
  ...props
}: ProjectImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length && acceptedFiles[0]) {
        onChange(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          }),
        );
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (value instanceof File) {
        URL.revokeObjectURL(value?.preview);
      }
    };
  }, [value]);

  return (
    <>
      <Card
        variant={"secondary"}
        className={cn(
          " group flex flex-col items-center rounded-lg border border-dashed border-gray-900/40 px-4 py-8 text-center",
          {
            "bg-primary/10": isDragActive,
            "disabled cursor-not-allowed bg-muted text-muted-foreground ":
              disabled,
          },
        )}
        {...getRootProps({ onClick: (event) => event.preventDefault() })}
      >
        <UploadIcon className="mx-auto h-14 w-14" />
        <div className="mt-4 flex items-center text-sm leading-6">
          <FormLabel className="relative cursor-pointer font-semibold  text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 group-[.disabled]:cursor-not-allowed ">
            {`Choose files`}
            <input
              disabled={disabled}
              className="sr-only"
              {...props}
              {...getInputProps()}
            />
          </FormLabel>
          <p className="pl-1">{`or drag and drop`}</p>
        </div>
        <div className="h-[1.25rem]">
          <p className="text-xs leading-5 text-gray-600">
            Upload Image Upto 4 Mb
          </p>
        </div>
      </Card>
    </>
  );
});
