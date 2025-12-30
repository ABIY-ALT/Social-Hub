"use client";

import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Header title="Settings" />
      <Tabs defaultValue={pathname} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="/settings/accounts" asChild>
            <Link href="/settings/accounts">Accounts</Link>
          </TabsTrigger>
          <TabsTrigger value="/settings/team" asChild>
            <Link href="/settings/team">Team</Link>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">{children}</div>
      </Tabs>
    </>
  );
}
