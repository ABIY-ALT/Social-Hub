import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserProvider } from '@/hooks/use-user';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="min-h-dvh bg-background p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
