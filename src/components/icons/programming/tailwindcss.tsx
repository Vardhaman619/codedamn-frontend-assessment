import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function TailwindcssIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M49 0H15C6.71573 0 0 6.71573 0 15V49C0 57.2843 6.71573 64 15 64H49C57.2843 64 64 57.2843 64 49V15C64 6.71573 57.2843 0 49 0Z"
        fill="url(#paint0_linear_1244_128538)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.75 27.5C22.25 21.5 26.0002 18.5 32 18.5C41 18.5 42.125 25.25 46.625 26.375C49.6253 27.1252 52.25 26.0002 54.5 23C53.0003 28.9998 49.2497 32 43.25 32C34.25 32 33.125 25.25 28.625 24.125C25.6248 23.375 23 24.5 20.75 27.5ZM9.5 41C11 35.0002 14.75 32 20.75 32C29.75 32 30.875 38.75 35.375 39.875C38.3752 40.6252 41 39.5002 43.25 36.5C41.7503 42.4998 37.9998 45.5 32 45.5C23 45.5 21.875 38.75 17.375 37.625C14.375 36.8748 11.75 37.9998 9.5 41Z"
        fill="url(#paint1_linear_1244_128538)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1244_128538"
          x1="45.1282"
          y1="7.76121e-08"
          x2="9.84873"
          y2="55.8363"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#131416" />
          <stop offset="1" stop-color="#1A1B1F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1244_128538"
          x1="54.5"
          y1="18.5"
          x2="19.3437"
          y2="50.0679"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B0FF4D" />
          <stop offset="1" stop-color="#FFE926" />
        </linearGradient>
      </defs>
    </svg>
  );
}
