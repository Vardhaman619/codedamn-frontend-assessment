// import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { UploadThingRouter } from "~/app/api/uploadthing/core";

// export const { UploadButton, UploadDropzone, Uploader } =
//   generateComponents<UploadThingRouter>();
export const { useUploadThing } = generateReactHelpers<UploadThingRouter>();
