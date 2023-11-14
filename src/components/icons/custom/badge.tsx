import { cn } from "@/lib/utils";
import { IconProps } from "../types";

export default function BadgeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 54 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <g filter="url(#filter0_d_167_21271)">
        <path
          d="M25.8735 15.283C26.5706 14.9057 27.4294 14.9057 28.1265 15.283L35.8735 19.4768C36.5706 19.8541 37 20.5515 37 21.3063V29.6937C37 30.4485 36.5706 31.1459 35.8735 31.5232L28.1265 35.717C27.4294 36.0943 26.5706 36.0943 25.8735 35.717L18.1265 31.5232C17.4294 31.1459 17 30.4485 17 29.6937V21.3063C17 20.5515 17.4294 19.8541 18.1265 19.4768L25.8735 15.283Z"
          fill="url(#paint0_radial_167_21271)"
        />
        <path
          d="M28.3646 14.8433C27.519 14.3856 26.481 14.3856 25.6354 14.8433L17.8885 19.037C17.0401 19.4963 16.5 20.3568 16.5 21.3063V29.6937C16.5 30.6432 17.0401 31.5037 17.8885 31.963L25.6354 36.1567C26.481 36.6144 27.519 36.6144 28.3646 36.1567L36.1115 31.963C36.9599 31.5037 37.5 30.6432 37.5 29.6937V21.3063C37.5 20.3568 36.9599 19.4963 36.1115 19.037L28.3646 14.8433Z"
          stroke="#0EA5E9"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_167_21271"
          x="0"
          y="0"
          width="54"
          height="55"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.341176 0 0 0 0 0.27451 0 0 0 0 0.956863 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_167_21271"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_167_21271"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_167_21271"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(27 25.5) rotate(90) scale(10.5 10)"
        >
          <stop />
          <stop offset="1" stopColor="#222023" />
        </radialGradient>
      </defs>
    </svg>
  );
}
