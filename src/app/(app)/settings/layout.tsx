"use client";

import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Users2,
  Palette,
  Bot,
  Bell,
  Lock,
  Cog,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const navItems = [
  { href: "/settings/accounts", label: "Social Accounts", icon: Users },
  { href: "/settings/team", label: "Team & Roles", icon: Users2 },
  { href: "/settings/brand", label: "Brand Guidelines", icon: Palette },
  { href: "/settings/ai", label: "AI Rules", icon: Bot },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/security", label: "Security", icon: Lock },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If we are on the main settings page, show a grid of settings cards.
  // Otherwise, show the standard sidebar and content layout.
  if (pathname === "/settings") {
    return (
      <>
        <Header title="Settings" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Card className="hover:bg-muted/50 transition-colors h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <item.icon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <CardTitle>{item.label}</CardTitle>
                    <CardDescription>Manage {item.label.toLowerCase()}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </>
    );
  }

  // This is the layout for all sub-pages of /settings/*
  return (
    <>
      <Header title="Settings" />
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <nav>
          <Tabs defaultValue={pathname} orientation="vertical" className="w-full">
            <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0">
               <TabsTrigger value="/settings" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings">
                    <Cog className="mr-2 h-4 w-4" />
                    Overview
                </Link>
              </TabsTrigger>
              {navItems.map((item) => (
                 <TabsTrigger key={item.href} value={item.href} asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                    <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </nav>
        <div className="md:col-span-1">{children}</div>
      </div>
    </>
  );
}
