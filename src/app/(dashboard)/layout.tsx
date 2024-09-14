import NavUserMenu from "@/components/nav-user-menu";
import DesktopSidebar from "@/components/sidebar/desktop-sidear";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { appConfig } from "@/lib/config";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="text-2xl font-semibold">
                  {appConfig.appName}
                </span>
              </Link>
            </div>
            <DesktopSidebar />
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileSidebar />
            <div className="w-full flex-1">
              {/* header bar middle section */}
            </div>
            <ThemeToggle />
            <NavUserMenu />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
