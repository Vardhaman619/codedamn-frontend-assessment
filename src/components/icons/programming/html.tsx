import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function HtmlIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <g clipPath="url(#clip0_11402_689)">
        <path
          d="M2.5186 1.32416L5.11467 34.5363C5.15365 35.035 5.49123 35.4603 5.96812 35.6115L19.6287 39.9426C19.8703 40.0192 20.1297 40.0192 20.3713 39.9426L34.0319 35.6115C34.5088 35.4603 34.8464 35.035 34.8853 34.5363L37.4814 1.32416C37.5372 0.610116 36.9729 0 36.2568 0H3.74334C3.02718 0 2.46285 0.610116 2.5186 1.32416Z"
          fill="url(#paint0_linear_11402_689)"
        />
        <path
          d="M30.7348 11.8115H13.8157L14.3263 16.5201H30.3668L29.3175 29.9435L19.9109 32.9258L10.5043 29.9435L9.95614 22.9305H14.8934V26.3705L20.0429 27.7525L25.1615 26.3705L25.5586 20.8882H9.79647L8.75 7.5H31.0717L30.7348 11.8115Z"
          fill="url(#paint1_linear_11402_689)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_11402_689"
          x1="27.1734"
          y1="4.85076e-08"
          x2="3.99181"
          y2="32.0759"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#131416" />
          <stop offset="1" stopColor="#1A1B1F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11402_689"
          x1="31.0717"
          y1="7.5"
          x2="5.33088"
          y2="19.6751"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0FF4D" />
          <stop offset="1" stopColor="#FFE926" />
        </linearGradient>
        <clipPath id="clip0_11402_689">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
