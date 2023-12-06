"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PlusIcon from "~/components/icons/custom/plus";
import Spinner from "~/components/icons/custom/spinner";
import { Button } from "~/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  type CertificateCreateSchema,
  certificateCreateSchema,
} from "./schema";
import { memo, useEffect, useState, useTransition } from "react";
import { Input } from "~/components/ui/input";
import format from "date-fns/format";
import SubmitButton from "../submit-button";
import { Card } from "~/components/ui/card";
import { TypographySmall } from "~/components/ui/typography";
import CertificateUploadDropzone from "./certificate-upload-dropzone";
import { certificateCreateAction } from "./action";
import { useToast } from "~/components/ui/use-toast";

export default function CreateCertificateDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTranstion] = useTransition();
  const form = useForm<CertificateCreateSchema>({
    resolver: zodResolver(certificateCreateSchema),
    defaultValues: {
      title: "",
      issuedOn: "" as unknown as Date,
      image: "" as unknown as FileWithPreview,
    },
  });
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  const { toast } = useToast();
  useEffect(() => {
    form.reset();
  }, [open, setOpen, form]);
  function handelFormSubmit(data: CertificateCreateSchema) {
    startTranstion(async () => {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("issuedOn", data.issuedOn.toString());
      formdata.append("image", data.image);
      if (data?.credentialLink) {
        formdata.append("credentialLink", data.credentialLink);
      }
      const result = await certificateCreateAction(formdata);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof CertificateCreateSchema, {
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
              Add New Certificate
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
                  <FormLabel> Certificate Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credentialLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Credential Link Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Credential Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuedOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Issued Date </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={"1950-01-01"}
                      placeholder="Select Start Date"
                      {...(field as unknown as Date)}
                      disabled={isFormDisable}
                      max={format(new Date(), "yyyy-MM-dd")}
                    />
                  </FormControl>
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
                    <CertificateUploadDropzone {...field} />
                  </FormControl>
                  <CertificateImagePreview image={field.value} />

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
type CertificateImagePreviewProps = { image: FileWithPreview };
const CertificateImagePreview = memo(function CertificateImagePreview({
  image,
}: CertificateImagePreviewProps) {
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
