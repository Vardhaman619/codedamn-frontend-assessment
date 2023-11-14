import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function TailwindcssIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M49 0H15C6.71573 0 0 6.71573 0 15V49C0 57.2843 6.71573 64 15 64H49C57.2843 64 64 57.2843 64 49V15C64 6.71573 57.2843 0 49 0Z"
        fill="url(#paint0_linear_1244_128539)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1244_128539"
          x1="45.1282"
          y1="7.76121e-08"
          x2="9.84873"
          y2="55.8363"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#131416" />
          <stop offset="1" stopColor="#1A1B1F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
