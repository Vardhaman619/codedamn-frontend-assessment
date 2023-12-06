import { type FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback, useEffect } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import UploadIcon from "~/components/icons/custom/upload";
import { Card } from "~/components/ui/card";
import { FormLabel } from "~/components/ui/form";
import { cn } from "~/lib/utils";

type CertificateUploadDropzoneProps = Omit<
  ControllerRenderProps<{ image?: FileWithPreview }, "image">,
  "ref"
>;
export default function CertificateUploadDropzone({
  onChange,
  value,
  disabled,
  ...props
}: CertificateUploadDropzoneProps) {
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
  );
}
