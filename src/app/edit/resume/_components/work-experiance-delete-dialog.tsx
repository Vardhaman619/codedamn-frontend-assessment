"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import Spinner from "~/components/icons/custom/spinner";
import SubmitButton from "~/components/shared/submit-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { WorkExperianceDeleteAction } from "../action";

export default function WorkExperianceDeleteDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTranstion] = useTransition();
  const { toast } = useToast();
  function deleteWorkExperiance() {
    startTranstion(async () => {
      const result = await WorkExperianceDeleteAction(id);
      if (result.error) {
        if (result.errors) {
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

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button variant={"destructive"} size={"icon"} disabled={isPending}>
          {isPending ? <Spinner /> : <TrashIcon className="h-5 w-5" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete education
            details and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              isLoading={isPending}
              disabled={isPending}
              onClick={deleteWorkExperiance}
            >
              Continue
            </SubmitButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
