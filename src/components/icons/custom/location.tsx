import { cn } from "@/lib/utils";
import { IconProps } from "../types";

export default function LocationIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 16"
      fill="none"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M7.0002 8.95338C8.14895 8.95338 9.0802 8.02213 9.0802 6.87338C9.0802 5.72462 8.14895 4.79338 7.0002 4.79338C5.85145 4.79338 4.9202 5.72462 4.9202 6.87338C4.9202 8.02213 5.85145 8.95338 7.0002 8.95338Z"
        stroke="#A1A1AA"
        strokeWidth="1.2"
      />
      <path
        d="M1.41353 5.66004C2.72686 -0.113291 11.2802 -0.106624 12.5869 5.66671C13.3535 9.05338 11.2469 11.92 9.4002 13.6934C8.0602 14.9867 5.9402 14.9867 4.59353 13.6934C2.75353 11.92 0.646864 9.04671 1.41353 5.66004Z"
        stroke="#A1A1AA"
        strokeWidth="1.2"
      />
    </svg>
  );
}
