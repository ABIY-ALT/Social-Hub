"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Header({ title, description, children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start gap-4 mb-6",
        className
      )}
    >
      <SidebarTrigger className="md:hidden mt-2" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}
