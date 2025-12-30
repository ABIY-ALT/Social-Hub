import { Header } from "@/components/layout/header";
import { ContentCreationForm } from "./content-creation-form";

export default function ContentCreationPage() {
  return (
    <>
      <Header title="Post Composer" />
      <ContentCreationForm />
    </>
  );
}
