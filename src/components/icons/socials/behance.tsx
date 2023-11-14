import { cn } from "~/lib/utils";
import type { IconProps } from "../types";

export default function BehanceIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        d="M7.10972 4.00049C7.82884 4.00049 8.48445 4.06388 9.07667 4.19089C9.66889 4.31779 10.1765 4.52596 10.5994 4.81468C11.0224 5.10377 11.3502 5.48806 11.5829 5.96755C11.8156 6.44704 11.9319 7.03914 11.9319 7.74408C11.9319 8.50558 11.7591 9.14005 11.4137 9.64752C11.0681 10.1551 10.5572 10.571 9.88042 10.8953C10.811 11.1633 11.5053 11.6323 11.9637 12.3018C12.4216 12.9717 12.6512 13.779 12.6512 14.7235C12.6512 15.4848 12.5032 16.1442 12.2069 16.7012C11.911 17.2584 11.5124 17.713 11.0122 18.065C10.5115 18.4177 9.94045 18.6783 9.29901 18.8479C8.65354 19.0174 7.98885 19.1026 7.32149 19.1014H0.00341797V4.00049H7.10972ZM6.68677 10.113C7.27899 10.113 7.76533 9.97202 8.14614 9.68989C8.52682 9.40801 8.71711 8.94965 8.71711 8.31517C8.71711 7.96282 8.65372 7.67361 8.52682 7.44804C8.39993 7.22258 8.23077 7.04598 8.01924 6.91932C7.80771 6.79231 7.56448 6.70455 7.28956 6.65485C7.00678 6.60491 6.72013 6.58016 6.43298 6.5809H3.32397V10.1131H6.68677V10.113ZM6.87706 16.5211C7.2012 16.5211 7.51154 16.4893 7.80759 16.4259C8.10364 16.3624 8.36439 16.2566 8.59021 16.1085C8.81555 15.9607 8.99539 15.7596 9.12949 15.5057C9.26335 15.252 9.33034 14.9278 9.33034 14.5328C9.33034 13.7576 9.1116 13.2042 8.67473 12.8727C8.2375 12.5414 7.65944 12.3756 6.94044 12.3756H3.32397V16.5209L6.87706 16.5211ZM16.8299 16.2039C17.2811 16.6414 17.9297 16.8595 18.7758 16.8595C19.3818 16.8595 19.9037 16.7083 20.3406 16.4049C20.7778 16.1021 21.0457 15.7811 21.1444 15.4426H23.7881C23.3653 16.7538 22.7164 17.6916 21.8424 18.2554C20.9679 18.8195 19.9104 19.1014 18.6697 19.1014C17.8097 19.1014 17.034 18.9639 16.3432 18.6889C15.6522 18.4141 15.067 18.0227 14.5879 17.5152C14.1085 17.0077 13.7383 16.4018 13.4775 15.6965C13.2165 14.9917 13.0863 14.216 13.0863 13.37C13.0863 12.5524 13.2199 11.7911 13.4881 11.086C13.7557 10.3812 14.1363 9.77129 14.6303 9.25639C15.1235 8.74196 15.7124 8.33654 16.3963 8.04037C17.08 7.7442 17.8379 7.5963 18.6699 7.5963C19.6005 7.5963 20.4111 7.77602 21.1023 8.13558C21.7929 8.49501 22.3605 8.97846 22.8049 9.58425C23.2489 10.1906 23.5695 10.8817 23.7673 11.6568C23.9647 12.4325 24.0349 13.2431 23.9789 14.0891H16.0899C16.1321 15.0618 16.3784 15.7671 16.8299 16.2039ZM20.2244 10.4513C19.865 10.0567 19.3184 9.85905 18.5855 9.85905C18.106 9.85905 17.7078 9.94032 17.3906 10.1023C17.0733 10.2647 16.8194 10.4652 16.629 10.7051C16.4388 10.9449 16.3046 11.1988 16.2273 11.4664C16.1496 11.7344 16.1037 11.9741 16.0897 12.1855H20.9752C20.8343 11.4241 20.5841 10.8461 20.2244 10.4513ZM15.5768 4.76726H21.681V6.45976H15.5768V4.76726Z"
        fill="#1769FF"
      />
    </svg>
  );
}