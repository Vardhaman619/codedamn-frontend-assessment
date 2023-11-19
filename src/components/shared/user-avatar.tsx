"use client";
import { signIn, signOut } from "next-auth/react";
import BadgeIcon from "../icons/custom/badge";
import UserIcon from "../icons/custom/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
type UserAvatarProps = { user: { image?: string | null } | null };

export default function UserAvatar({ user }: UserAvatarProps) {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="absolute z-10 -top-4 -right-6">
          <BadgeIcon className="w-14 h-14 " />
          <span
            className="absolute right-6 text-white text-xs font-bold"
            style={{ top: 17 }}
          >
            2
          </span>
        </div>

        <Avatar role="button">
          {user.image ? (
            <>
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </>
          ) : (
            <Avatar
              role="button"
              className="grid place-items-center bg-secondary"
            >
              <UserIcon />
            </Avatar>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>Signout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Avatar
      role="button"
      className="grid place-items-center bg-secondary"
      onClick={() => signIn()}
    >
      <UserIcon />
    </Avatar>
  );
}
