"use client";
import Link from "next/link";
import React from "react";
import { SIDEBAR_MENU_ITEM } from "@/lib/constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {SIDEBAR_MENU_ITEM.map((item, index) => {
          const { href, icon: Icon, label, route_group } = item;
          const isPathOpen = route_group.includes(pathname);
          return (
            <Link
              key={index}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 transition-all font-[600] text-[14px]",
                isPathOpen
                  ? "text-muted bg-primary hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-primary ",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopSidebar;
