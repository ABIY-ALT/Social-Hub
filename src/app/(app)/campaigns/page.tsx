import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CampaignsPage() {
  return (
    <>
      <Header title="Campaigns" />
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder page for Campaigns.</p>
        </CardContent>
      </Card>
    </>
  );
}
