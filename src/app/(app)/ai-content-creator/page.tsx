import { Header } from "@/components/layout/header";
import { AICreatorForm } from "./ai-creator-form";

export default function AiContentCreatorPage() {
  return (
    <>
      <Header 
        title="AI Content Creator"
        description="Generate blog posts, social media content, ads, and more using our advanced AI."
      />
      <AICreatorForm />
    </>
  );
}
