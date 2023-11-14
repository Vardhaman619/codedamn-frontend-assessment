import { cn } from "~/lib/utils";
import type { IconProps } from "../types";
export default function StarFourIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M22.5563 12C22.5586 12.3076 22.465 12.6082 22.2886 12.8602C22.1122 13.1122 21.8617 13.303 21.572 13.4062L15.5813 15.5812L13.4063 21.5718C13.2998 21.8589 13.1079 22.1065 12.8565 22.2813C12.6052 22.4562 12.3063 22.5499 12.0001 22.5499C11.6939 22.5499 11.395 22.4562 11.1436 22.2813C10.8923 22.1065 10.7004 21.8589 10.5938 21.5718L8.41884 15.5812L2.42822 13.4062C2.14115 13.2997 1.89357 13.1078 1.71874 12.8564C1.54391 12.605 1.4502 12.3062 1.4502 12C1.4502 11.6938 1.54391 11.3949 1.71874 11.1435C1.89357 10.8921 2.14115 10.7003 2.42822 10.5937L8.41884 8.41872L10.5938 2.4281C10.7004 2.14103 10.8923 1.89345 11.1436 1.71862C11.395 1.54378 11.6939 1.45007 12.0001 1.45007C12.3063 1.45007 12.6052 1.54378 12.8565 1.71862C13.1079 1.89345 13.2998 2.14103 13.4063 2.4281L15.5813 8.41872L21.572 10.5937C21.8617 10.6969 22.1122 10.8877 22.2886 11.1397C22.465 11.3917 22.5586 11.6924 22.5563 12Z"
        fill="inherit"
      />
    </svg>
  );
}
