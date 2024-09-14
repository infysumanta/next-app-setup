"use client";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_MENU_ITEM } from "@/lib/constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { appConfig } from "@/lib/config";

const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col"
        aria-describedby="mobile-sidebar"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            {appConfig.appName}
          </SheetTitle>
          <SheetDescription>{appConfig.appDescription}</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          {SIDEBAR_MENU_ITEM.map((item, index) => {
            const { href, icon: Icon, label, route_group } = item;
            const isPathOpen = route_group.includes(pathname);
            return (
              <Link
                key={index}
                href={href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  isPathOpen
                    ? "text-muted bg-primary hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-primary ",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
