import Link from "next/link";
import ThunderIcon from "../icons/custom/thunder";
import SearchIcon from "../icons/custom/search";
import NotificationBellIcon from "../icons/custom/notification-bell";
import { Button } from "../ui/button";
import { getServerAuthSession } from "~/server/auth";
import UserAvatar from "./user-avatar";

export default async function Header() {
  const session = await getServerAuthSession();
  const streakNumber = 2;
  return (
    <header>
      <nav className="flex h-[52px] w-full justify-between">
        <Link href={"/"} className="self-center text-2xl font-bold">
          codedamn
        </Link>
        <div className="flex items-center gap-6">
          <div>
            <form className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
              <SearchIcon className="" />
              <input
                type="text"
                placeholder="Search"
                className="placeholder:text-muted-foreground text-secondary-foreground focus:outline-0"
              />
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"ghost"} className="gap-1">
              <ThunderIcon className="h-6 w-6 fill-primary" />
              <span className="text-muted-foreground">{streakNumber}</span>
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="relative w-10 h-10"
            >
              <NotificationBellIcon className="h-6 w-6" />
              <span className="absolute right-1 top-0.5 inline-block h-4 w-4 rounded-full bg-pink-500 text-xs font-bold text-white">
                0
              </span>
            </Button>
          </div>
          <div className="relative">
            <UserAvatar user={session?.user ?? null} />
          </div>
        </div>
      </nav>
    </header>
  );
}
