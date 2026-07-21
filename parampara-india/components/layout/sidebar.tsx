"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Contact, Settings, Package, BarChart3, ChevronLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <Flame className="h-6 w-6 text-orange-600" />
        <span className="text-lg font-semibold">Parampara CRM</span>
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
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
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70"
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
      <div className="border-t border-sidebar-border p-4">
        <p className="text-xs text-muted-foreground">Parampara India CRM</p>
        <p className="text-xs text-muted-foreground">v0.1.0</p>
      </div>
    </aside>
  );
}
