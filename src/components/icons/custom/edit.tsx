import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function EditIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M7.33331 1.33338H5.99998C2.66665 1.33338 1.33331 2.66671 1.33331 6.00005V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V8.66671M9.93998 2.76671C10.3866 4.36005 11.6333 5.60671 13.2333 6.06005M10.6933 2.01338L5.43998 7.26671C5.23998 7.46671 5.03998 7.86005 4.99998 8.14671L4.71331 10.1534C4.60665 10.88 5.11998 11.3867 5.84665 11.2867L7.85331 11C8.13331 10.96 8.52665 10.76 8.73331 10.56L13.9866 5.30671C14.8933 4.40005 15.32 3.34671 13.9866 2.01338C12.6533 0.680046 11.6 1.10671 10.6933 2.01338Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
