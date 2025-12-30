import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MediaLibraryPage() {
  return (
    <>
      <Header title="Media Library" />
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder page for the Media Library.</p>
        </CardContent>
      </Card>
    </>
  );
}
