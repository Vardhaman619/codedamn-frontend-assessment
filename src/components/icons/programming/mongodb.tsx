import { cn } from "~/lib/utils";
import type { IconProps } from "../types";

export default function MongoDbIcon({ className, ...props }: IconProps) {
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
        fill="url(#paint0_linear_1244_128287)"
      />
      <g filter="url(#filter0_d_1244_128287)">
        <path
          d="M32.1363 44.4678C31.8938 47.5148 31.72 49.2853 31.104 51.0265C31.104 51.0265 31.5083 53.9273 31.7923 57H32.797C33.0367 54.8362 33.4026 52.6882 33.893 50.567C32.5923 49.927 32.1863 47.1415 32.1363 44.4678Z"
          fill="url(#paint1_linear_1244_128287)"
        />
        <path
          d="M31.252 51.0415C31.7152 49.7197 31.9279 48.378 32.1078 46.4994C32.1737 47.1425 32.27 47.759 32.4052 48.3142C32.5422 48.877 32.7204 49.3826 32.9509 49.7911C33.1592 50.16 33.4144 50.4572 33.7275 50.6418C33.2579 52.6915 32.9041 54.766 32.6677 56.8555H31.924C31.7842 55.3636 31.6179 53.9219 31.4851 52.8433C31.4167 52.2882 31.3573 51.8291 31.3149 51.5088C31.2937 51.3487 31.2768 51.2232 31.2651 51.1377L31.252 51.0415Z"
          stroke="url(#paint2_linear_1244_128287)"
          stroke-opacity="0.12"
          stroke-width="0.289062"
        />
      </g>
      <path
        d="M42.7933 26.8978C40.159 15.2775 34.669 12.184 33.2685 9.99725C32.691 9.03392 32.1794 8.03254 31.7373 7C31.6633 8.0325 31.5273 8.6825 30.6498 9.4655C28.888 11.0363 21.4055 17.1337 20.7758 30.337C20.189 42.6475 29.8258 50.2383 31.0988 51.023C32.0778 51.5047 33.27 51.0332 33.8518 50.591C38.497 47.403 44.844 38.9035 42.7983 26.8978"
        fill="url(#paint3_linear_1244_128287)"
      />
      <path
        d="M33.8913 50.5687C32.5768 49.9615 32.1965 47.1172 32.138 44.4678C32.463 40.097 32.5578 35.7122 32.422 31.3315C32.353 29.033 32.4545 10.042 31.8558 7.2615C32.2654 8.20322 32.7374 9.11657 33.2685 9.9955C34.669 12.184 40.1608 15.2775 42.7933 26.8978C44.844 38.883 38.5315 47.36 33.8913 50.5687Z"
        fill="url(#paint4_linear_1244_128287)"
      />
      <defs>
        <filter
          id="filter0_d_1244_128287"
          x="29.104"
          y="42.4678"
          width="6.789"
          height="16.5322"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.482353 0 0 0 0 0.839216 0 0 0 0 1 0 0 0 0.24 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1244_128287"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1244_128287"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1244_128287"
          x1="45.1282"
          y1="7.76121e-08"
          x2="9.84873"
          y2="55.8363"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#131416" />
          <stop offset="1" stopColor="#1A1B1F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1244_128287"
          x1="31.104"
          y1="44.4678"
          x2="34.3021"
          y2="44.5731"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#048CD7" />
          <stop offset="1" stopColor="#7AD6FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1244_128287"
          x1="30.9967"
          y1="41.9613"
          x2="33.9525"
          y2="42.0018"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stop-opacity="0.37" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1244_128287"
          x1="43.1929"
          y1="7"
          x2="13.7251"
          y2="15.0565"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0FF4D" />
          <stop offset="1" stopColor="#FFE926" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1244_128287"
          x1="43.1929"
          y1="7"
          x2="13.7251"
          y2="15.0565"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0FF4D" />
          <stop offset="1" stopColor="#FFE926" />
        </linearGradient>
      </defs>
    </svg>
  );
}
