"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Education } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import format from "date-fns/format";
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
import { Checkbox } from "~/components/ui/checkbox";
import EditIcon from "~/components/icons/custom/edit";
import Spinner from "~/components/icons/custom/spinner";
import SubmitButton from "~/components/shared/submit-button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { type EducationEditSchema, educationEditSchema } from "./schema";
import { EducationEditAction } from "../action";

type EducationEditDialogProps = Pick<
  Education,
  "institution" | "description" | "location" | "degree" | "id"
> & { endDate: string | null; startDate: string };
export default function EducationEditDialog({
  id,
  institution,
  description,
  endDate,
  startDate,
  location,
  degree,
}: EducationEditDialogProps) {
  const [open, setOpen] = useState(false);
  console.log({
    id,
    institution,
    description,
    location,
    startDate,
    degree,
    endDate,
  });
  const form = useForm<EducationEditSchema>({
    resolver: zodResolver(educationEditSchema),
    defaultValues: {
      id,
      institution,
      description: description ?? "",
      location,
      startDate: startDate as unknown as Date,
      degree,
      endDate: (endDate as unknown as Date) ?? "",
    },
  });
  const { toast } = useToast();
  const [isPending, startTranstion] = useTransition();
  const [currentPursuing, setCurrentPursuing] = useState<boolean>(
    endDate ? false : true,
  );
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  // console.log(isPending, errors, currentPursuing, form.getValues());
  function handelFormSubmit(formdata: EducationEditSchema) {
    startTranstion(async () => {
      const result = await EducationEditAction(formdata);

      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof EducationEditSchema, {
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
  // console.log(id, degree, institution);

  useEffect(() => {
    if (currentPursuing) {
      form.setValue("endDate", undefined as unknown as Date, {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }
    if (!currentPursuing) {
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
  }, [currentPursuing, setCurrentPursuing]);

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
          <DialogTitle>Edit Education Details</DialogTitle>
          <DialogDescription>
            Make Changes In Your Educational Details
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
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Degree </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Degree Name"
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
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Institution Name </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" Institution Name"
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
                checked={currentPursuing}
                name="currentWorking"
                id="currentWorking"
                onCheckedChange={(checked: boolean) =>
                  setCurrentPursuing(checked)
                }
              />
              <FormLabel className="mt-0" htmlFor="currentWorking">
                Currently pursuing
              </FormLabel>
            </div>
            {currentPursuing ? null : (
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
