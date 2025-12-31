import { Header } from "@/components/layout/header";
import { Composer } from "./composer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function ContentCreationPage() {
  return (
    <>
      <Header title="Post Composer">
        <Button variant="outline" asChild>
          <Link href="/ai-content-creator">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Content Creator
          </Link>
        </Button>
      </Header>
      <Composer />
    </>
  );
}
