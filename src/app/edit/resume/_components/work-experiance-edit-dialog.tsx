"use client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import { format } from "date-fns/esm";
import Spinner from "~/components/icons/custom/spinner";
import EditIcon from "~/components/icons/custom/edit";
import { useToast } from "~/components/ui/use-toast";
import SubmitButton from "~/components/shared/submit-button";
import type { WorkExperience } from "@prisma/client";
import {
  type WorkExperianceEditSchema,
  workExperianceEditSchema,
} from "./schema";
import { WorkExperianceEditAction } from "../action";

type WorkExperienceEditDialogProps = Pick<
  WorkExperience,
  "company" | "description" | "location" | "title" | "id"
> & { endDate: string | null; startDate: string };
export default function WorkExperianceEditDialog({
  id,
  description,
  endDate,
  startDate,
  location,
  company,
  title,
}: WorkExperienceEditDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<WorkExperianceEditSchema>({
    resolver: zodResolver(workExperianceEditSchema),
    defaultValues: {
      id,
      company: company ?? "",
      description: description ?? "",
      location: location ?? "",
      title,
      startDate: startDate as unknown as Date,
      endDate: (endDate as unknown as Date) ?? "",
    },
  });
  const { toast } = useToast();
  const [isPending, startTranstion] = useTransition();
  const [currentWorking, setCurrentWorking] = useState<boolean>(
    endDate ? false : true,
  );
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  function handelFormSubmit(formdata: WorkExperianceEditSchema) {
    startTranstion(async () => {
      const result = await WorkExperianceEditAction(formdata);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof WorkExperianceEditSchema, {
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
        }, 200);
      }
    });
  }

  useEffect(() => {
    if (currentWorking) {
      form.setValue("endDate", undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }
    if (!currentWorking) {
      form.setValue(
        "endDate",
        (endDate ?? format(new Date(), "yyyy-MM-dd")) as unknown as Date,
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorking, setCurrentWorking]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isPending}>
        <Button variant={"default"} size={"icon"} disabled={isPending}>
          {isPending ? <Spinner /> : <EditIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="mx-auto sm:max-w-screen-sm"
        onPointerDownOutside={(event) => {
          isPending && event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Work Experiance Details</DialogTitle>
          <DialogDescription>
            Make Changes In Your Work Experinace Details
          </DialogDescription>
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Company </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Compnay Name"
                      {...field}
                      disabled={isFormDisable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Work Title </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Work Title"
                      {...field}
                      disabled={isFormDisable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Location </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the location"
                      {...field}
                      disabled={isFormDisable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Start Date </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Select Start Date"
                      {...(field as unknown as Date)}
                      disabled={isFormDisable}
                      min={"1900-01-01"}
                      max={format(new Date(), "yyyy-MM-dd")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <Checkbox
                checked={currentWorking}
                name="currentWorking"
                id="currentWorking"
                onCheckedChange={(checked: boolean) =>
                  setCurrentWorking(checked)
                }
              />
              <FormLabel className="mt-0" htmlFor="currentWorking">
                Currently working
              </FormLabel>
            </div>
            {currentWorking ? null : (
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> End Date </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Select Start Date"
                        disabled={isFormDisable}
                        {...(field as unknown as Date)}
                        min={startDate ?? "1900-01-01"}
                        max={format(new Date(), "yyyy-MM-dd")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Description </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                      rows={4}
                      disabled={isFormDisable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5 flex !flex-row-reverse !justify-start gap-2 ">
              <SubmitButton
                disabled={isFormDisable || !isDirty}
                isLoading={isPending}
              ></SubmitButton>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
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
