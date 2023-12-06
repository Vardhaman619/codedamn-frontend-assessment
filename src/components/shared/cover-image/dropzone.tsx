"use client";
import { useDropzone } from "@uploadthing/react/hooks";
import { useEffect, useState, useTransition } from "react";
import EditIcon from "~/components/icons/custom/edit";
import { Button } from "~/components/ui/button";
import { UploadCoverImageAction } from "./action";
import { useToast } from "~/components/ui/use-toast";
import { CheckIcon } from "@radix-ui/react-icons";
import Spinner from "~/components/icons/custom/spinner";
import CloseIcon from "~/components/icons/custom/close";

export default function CoverImageDropzone() {
  const { toast } = useToast();
  const [isPending, startTranstion] = useTransition();
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(() => {
        if (acceptedFiles?.[0])
          return Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          });
        return null;
      });
    },
    disabled: isPending,
  });

  function handelSubmit() {
    if (image && image instanceof File) {
      startTranstion(async () => {
        try {
          const formdata = new FormData();
          formdata.append("image", image);
          const response = await UploadCoverImageAction(formdata);
          if (response?.error) {
            throw Error();
            return;
          }
          toast({
            title: "Cover image uploaded sucessfully!",
          });
        } catch (error) {
          toast({
            title: "Cover image not uploaded!",
            variant: "destructive",
          });
        } finally {
          setImage(null);
        }
      });
    }
  }
  function handelReset() {
    setImage(null);
  }
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image?.preview);
      }
    };
  }, [image, setImage]);
  return (
    // <div
    //   style={{
    //     backgroundImage: image?.preview,
    //   }}
    // >
    <div
      {...getRootProps({
        className:
          " p-6 relative flex flex-row-reverse h-full cursor-pointer bg-cover bg-center ",
        style: {
          ...(image && {
            backgroundImage: `url(${image?.preview})`,
          }),
        },
      })}
    >
      {isPending ? (
        <Button
          className="gap-2 border border-border opacity-70 shadow-sm backdrop-blur-sm"
          variant={"secondary"}
          type="button"
        >
          <Spinner /> Uploading image...
        </Button>
      ) : image != null ? (
        <div className="flex flex-col gap-2">
          <Button
            className="gap-2 border border-border opacity-70 shadow-sm backdrop-blur-sm"
            variant={"secondary"}
            type="button"
            disabled={isPending}
            onClick={handelSubmit}
          >
            <CheckIcon /> Done
          </Button>
          <Button
            className="gap-2 border border-border opacity-70 shadow-sm backdrop-blur-sm"
            variant={"destructive"}
            type="button"
            disabled={isPending}
            onClick={handelReset}
          >
            <CloseIcon /> Reset
          </Button>
        </div>
      ) : (
        <Button
          className="gap-2 border border-border opacity-70 shadow-sm backdrop-blur-sm"
          variant={"secondary"}
          type="button"
        >
          <input {...getInputProps()} />
          <EditIcon className="h-4 w-4 stroke-secondary-foreground" />
          Edit Cover
        </Button>
      )}
    </div>
  );
}
{
  /* </div> */
}
