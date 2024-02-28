"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function AvatarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <ExitIcon className="w-6 h-6 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
