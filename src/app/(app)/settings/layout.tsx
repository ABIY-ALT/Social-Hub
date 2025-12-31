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
      <div className="grid gap-6 md:grid-cols-[180px_1fr]">
        <nav>
          <Tabs defaultValue={pathname} orientation="vertical" className="w-full">
            <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0">
              <TabsTrigger value="/settings/accounts" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/accounts">Social Accounts</Link>
              </TabsTrigger>
              <TabsTrigger value="/settings/team" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/team">Team & Roles</Link>
              </TabsTrigger>
               <TabsTrigger value="/settings/brand" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/brand">Brand Guidelines</Link>
              </TabsTrigger>
              <TabsTrigger value="/settings/ai" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/ai">AI Rules</Link>
              </TabsTrigger>
              <TabsTrigger value="/settings/notifications" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/notifications">Notifications</Link>
              </TabsTrigger>
              <TabsTrigger value="/settings/security" asChild className="justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">
                <Link href="/settings/security">Security</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        <div className="md:col-span-1">{children}</div>
      </div>
    </>
  );
}
