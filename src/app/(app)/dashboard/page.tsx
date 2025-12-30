import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Dashboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a placeholder page for the dashboard.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
