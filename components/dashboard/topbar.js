"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, Settings, UserCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardSearch, MobileSidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar({ user }) {
  const displayName = user?.user_metadata?.full_name || user?.email || "RCM Team";

  return (
    <div className="surface sticky top-4 z-20 flex items-center gap-3 px-4 py-3">
      <MobileSidebar />
      <DashboardSearch />
      <div className="ml-auto flex items-center gap-3">
        <Badge variant="success" className="hidden md:inline-flex">
          Live operations
        </Badge>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 gap-3 rounded-2xl px-3">
              <Avatar name={displayName} className="h-8 w-8 rounded-xl" />
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground">Billing operations</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex w-full items-center gap-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/portal" className="flex w-full items-center gap-2">
                <UserCircle2 className="mr-2 h-4 w-4" />
                Patient portal
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex w-full items-center gap-2 text-rose-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
