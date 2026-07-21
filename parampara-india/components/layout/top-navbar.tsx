"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Separator } from "@/components/ui/separator";

export function TopNavbar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <MobileSidebar />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />
        <UserMenu />
      </div>
    </header>
  );
}
