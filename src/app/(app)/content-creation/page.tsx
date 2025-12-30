import { Header } from "@/components/layout/header";
import { ContentCreationForm } from "./content-creation-form";

export default function PostComposerPage() {
  return (
    <>
      <Header title="Post Composer" />
      <ContentCreationForm />
    </>
  );
}
