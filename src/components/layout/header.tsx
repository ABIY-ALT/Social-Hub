"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function Header({ title, children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-4 mb-6",
        className
      )}
    >
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl flex-1">
        {title}
      </h1>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}
