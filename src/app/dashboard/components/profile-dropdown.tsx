"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { ChevronsUpDown, User } from "lucide-react";
export const ProfileDropdown = () => {
  const { data: session }: any = useSession();
  return (
    <div className="flex items-center justify-start border-t border-white border-t py-3 gap-2">
      <div className="flex-shrink-0 flex items-center justify-center bg-[#0233A3] text-white rounded-md w-10 h-10">
        <User />
      </div>
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="ghost" className="text-left"> */}
            {/* <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                  {session?.user?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar> */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-bold">
                  {session?.user?.name} {session?.user?.last_name}
                </p>
                <p className="text-white text-xs leading-none">{session?.user?.email}</p>
              </div>
              <ChevronsUpDown className="w-4 h-4 ml-2" />
            </div>
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {session?.user?.name} {session?.user?.last_name}
                </p>
                <p className="text-muted-foreground text-xs leading-none">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
