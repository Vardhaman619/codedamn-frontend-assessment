import { useEffect, useState, useTransition } from "react";
import { type PlaygroundSchema, playgroundSchema } from "./schema";
import { useToast } from "~/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogHeader, DialogFooter } from "~/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Languages } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "~/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
// import { PlaygroundCreateAction } from "../action";
import { Input } from "~/components/ui/input";
import Spinner from "~/components/icons/custom/spinner";
import SubmitButton from "~/components/shared/submit-button";
import { PlaygroundCreateAction } from "../action";

export default function PlaygroundCreateDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<PlaygroundSchema>({
    resolver: zodResolver(playgroundSchema),
    defaultValues: {
      title: "",
      language: "" as Languages,
    },
  });
  const [isPending, startTranstion] = useTransition();
  const { toast } = useToast();

  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  useEffect(() => {
    form.reset();
  }, [open, setOpen, form]);

  function handelFormSubmit(formdata: PlaygroundSchema) {
    startTranstion(async () => {
      const result = await PlaygroundCreateAction(formdata);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof PlaygroundSchema, {
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
      <DialogTrigger asChild disabled={isPending}>
        <Button variant={"secondary"} className="gap-2">
          {isPending ? (
            <>
              <Spinner />
              Adding data...
            </>
          ) : (
            <>
              <PlusIcon />
              Add New Playground
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
          <DialogTitle>Create Playground</DialogTitle>
          <DialogDescription>
            Create playground of favourite language
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Playground Title </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Playground Title"
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
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Playground Language </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language Of Playground" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Languages).length &&
                        Object.values(Languages).map((langName) => {
                          return (
                            <SelectItem value={langName} key={langName}>
                              {langName}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5 flex !flex-row-reverse !justify-start gap-2">
              <SubmitButton
                type="submit"
                isLoading={isPending}
                disabled={isFormDisable || !isDirty}
              >
                Create Playground
              </SubmitButton>
              <DialogClose asChild>
                <Button variant={"secondary"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
