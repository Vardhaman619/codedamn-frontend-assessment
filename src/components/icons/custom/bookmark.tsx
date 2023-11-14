import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function Bookmark({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M8.59332 3.92004H3.40664C2.26664 3.92004 1.33331 4.85337 1.33331 5.99337V13.5667C1.33331 14.5334 2.02664 14.9467 2.87331 14.4734L5.49331 13.0134C5.77331 12.86 6.22665 12.86 6.49998 13.0134L9.11998 14.4734C9.96664 14.9467 10.66 14.5334 10.66 13.5667V5.99337C10.6666 4.85337 9.73332 3.92004 8.59332 3.92004Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6666 5.99337V13.5667C10.6666 14.5334 9.97331 14.94 9.12665 14.4734L6.50665 13.0134C6.22665 12.86 5.77331 12.86 5.49331 13.0134L2.87331 14.4734C2.02664 14.94 1.33331 14.5334 1.33331 13.5667V5.99337C1.33331 4.85337 2.26664 3.92004 3.40664 3.92004H8.59332C9.73332 3.92004 10.6666 4.85337 10.6666 5.99337Z"
        stroke="#18181B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6666 3.4067V10.98C14.6666 11.9467 13.9733 12.3534 13.1266 11.8867L10.6666 10.5134V5.99337C10.6666 4.85337 9.73332 3.92004 8.59332 3.92004H5.33331V3.4067C5.33331 2.2667 6.26664 1.33337 7.40664 1.33337H12.5933C13.7333 1.33337 14.6666 2.2667 14.6666 3.4067Z"
        stroke="#18181B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
