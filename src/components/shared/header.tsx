import Link from "next/link";
import ThunderIcon from "../icons/custom/thunder";
import NotificationBellIcon from "../icons/custom/notification-bell";
import { Button } from "../ui/button";
import Search from "./search";
import UserAvatarDropDown from "./user-avatar-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserIcon from "../icons/custom/user";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { STREAK } from "~/constants";

async function getUserAvatarImage(userId: string) {
  return await db.user.findUnique({
    select: {
      image: true,
    },
    where: {
      id: userId,
    },
  });
}

export default async function Header() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
    return;
  }

  const userAvatarImageData = await getUserAvatarImage(session.user.id);
  return (
    <header>
      <nav className="flex h-[52px] w-full justify-between">
        <Link href={"/"} className="self-center text-2xl font-bold">
          codedamn
        </Link>
        <div className="flex items-center gap-6">
          <div>
            <Search />
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"ghost"} className="gap-1">
              <ThunderIcon className="h-6 w-6 fill-primary" />
              <span className="text-muted-foreground">{STREAK}</span>
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="relative h-10 w-10"
            >
              <NotificationBellIcon className="h-6 w-6" />
              <span className="absolute right-1 top-0.5 inline-block h-4 w-4 rounded-full bg-pink-500 text-xs font-bold text-white">
                0
              </span>
            </Button>
          </div>
          <div>
            <UserAvatarDropDown>
              <Avatar role="button">
                <AvatarImage src={userAvatarImageData?.image ?? ""} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </UserAvatarDropDown>
          </div>
        </div>
      </nav>
    </header>
  );
}
