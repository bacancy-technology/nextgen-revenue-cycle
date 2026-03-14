"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Search, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { appNavigation, cn, quickActions } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {appNavigation.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
              isActive
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              {item.title}
            </span>
            <ChevronRight className="h-4 w-4 opacity-70" />
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-4">
        <BrandLogo />
        <div className="rounded-[28px] border border-primary/10 bg-primary/[0.06] p-4">
          <Badge variant="default" className="mb-3">
            Premium workflow
          </Badge>
          <p className="text-sm font-medium text-foreground">
            Built for billing teams, providers, and patient collections.
          </p>
        </div>
      </div>

      <NavItems />

      <div className="mt-auto space-y-3 rounded-[28px] border border-border bg-background/80 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" />
          Today&apos;s quick actions
        </div>
        <div className="grid gap-2">
          {quickActions.map((action) => (
            <div
              key={action.label}
              className="flex items-center gap-3 rounded-2xl bg-secondary/70 px-3 py-2 text-sm text-muted-foreground"
            >
              <action.icon className="h-4 w-4 text-primary" />
              {action.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="surface sticky top-6 hidden h-[calc(100vh-3rem)] p-5 xl:block">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="xl:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="left-0 top-0 h-full max-w-sm translate-x-0 translate-y-0 rounded-none rounded-r-[28px] p-5">
        <DialogTitle className="sr-only">Mobile navigation</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate through the healthcare RCM workspace.
        </DialogDescription>
        <SidebarContent />
      </DialogContent>
    </Dialog>
  );
}

export function DashboardSearch() {
  return (
    <div className="relative hidden w-full max-w-md lg:block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-10" placeholder="Search claims, patients, appointments..." />
    </div>
  );
}
