"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Menu, LayoutDashboard, Users, Contact, Settings, Package, BarChart3, Flame } from "lucide-react";

const sidebarNavItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "CRM",
    items: [
      { title: "Contacts", href: "/admin/contacts", icon: Contact },
      { title: "Leads", href: "/admin/leads", icon: Users },
      { title: "Products", href: "/admin/products", icon: Package },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Flame className="h-6 w-6 text-orange-600" />
          <span className="text-lg font-semibold">Parampara CRM</span>
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4">
          <nav className="space-y-6">
            {sidebarNavItems.map((group) => (
              <div key={group.title}>
                <h4 className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
                {group !== sidebarNavItems[sidebarNavItems.length - 1] && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
