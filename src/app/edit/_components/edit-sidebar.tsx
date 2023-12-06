"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useState } from "react";
import PortfolioIcon from "~/components/icons/custom/portfolio";
import ResumeIcon from "~/components/icons/custom/resume";
import SocialIdIcon from "~/components/icons/custom/social-id";
import UserIcon from "~/components/icons/custom/user";

import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

const SidebarLinks = [
  { icon: <UserIcon />, name: "Profile", url: "/edit" },
  { icon: <SocialIdIcon />, name: "Socials", url: "/edit/socials" },
  { icon: <PortfolioIcon />, name: "Portfolio", url: "/edit/portfolio" },
  { icon: <ResumeIcon />, name: "Resume", url: "/edit/resume" },
];
function EditSidebar() {
  const pathname = usePathname();
  const [value, setValue] = useState(
    () =>
      SidebarLinks[SidebarLinks.findIndex(({ url }) => pathname == url)]?.url ??
      "",
  );
  const router = useRouter();
  function handelValueChange(value: string) {
    setValue(value);
    router.push(value);
  }

  return (
    <>
      <Card
        variant={"secondary"}
        className="relative hidden w-full space-y-3 overflow-hidden p-6 lg:block"
      >
        <ul className="">
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
      <Select value={value} onValueChange={handelValueChange}>
        <SelectTrigger
          size={"large"}
          className="w-full max-w-screen-md bg-white data-[placeholder]:text-foreground lg:hidden"
        >
          <SelectValue
            placeholder={
              SidebarLinks[SidebarLinks.findIndex(({ url }) => pathname == url)]
                ?.name
            }
          />
        </SelectTrigger>
        <SelectContent>
          {SidebarLinks.map(({ name, url }) => {
            return (
              <SelectItem value={url} key={url}>
                {name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default memo(EditSidebar);
