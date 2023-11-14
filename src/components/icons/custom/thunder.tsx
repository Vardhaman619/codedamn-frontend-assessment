import { cn } from "@/lib/utils";
import { IconProps } from "../types";

export default function ThunderIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M17.91 10.72H14.82V3.51999C14.82 1.83999 13.91 1.49999 12.8 2.75999L12 3.66999L5.23001 11.37C4.30001 12.42 4.69001 13.28 6.09001 13.28H9.18001V20.48C9.18001 22.16 10.09 22.5 11.2 21.24L12 20.33L18.77 12.63C19.7 11.58 19.31 10.72 17.91 10.72Z"
        fill="inherit"
      />
    </svg>
  );
}
