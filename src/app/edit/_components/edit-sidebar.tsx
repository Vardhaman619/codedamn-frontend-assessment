"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import PortfolioIcon from "~/components/icons/custom/portfolio";
import ResumeIcon from "~/components/icons/custom/resume";
import SocialIdIcon from "~/components/icons/custom/social-id";
import UserIcon from "~/components/icons/custom/user";

import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

const SidebarLinks = [
  { icon: <UserIcon />, name: "Profile", url: "/edit" },
  { icon: <SocialIdIcon />, name: "Socials", url: "/edit/socials" },
  { icon: <PortfolioIcon />, name: "Portfolio", url: "/edit/portfolio" },
  { icon: <ResumeIcon />, name: "Resume", url: "/edit/resume" },
];
function EditSidebar() {
  const pathname = usePathname();
  return (
    <Card variant={"secondary"} className="relative overflow-hidden p-6">
      <ul className="space-y-3">
        {SidebarLinks.map(({ name, icon, url }) => {
          const active = url == pathname;
          return (
            <li key={name}>
              <Link
                href={url}
                className={cn(
                  "flex items-center gap-2 py-3 pe-4 ps-0 text-muted-foreground",
                  { "text-card-foreground": active },
                )}
              >
                <span
                  className={cn(
                    "absolute -left-1 hidden w-2.5 rounded-full bg-black",
                    { block: active },
                  )}
                  style={{ height: "35px" }}
                  aria-hidden={true}
                ></span>
                {icon}
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
export default memo(EditSidebar);
