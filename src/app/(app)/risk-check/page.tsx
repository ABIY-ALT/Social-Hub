import { Header } from "@/components/layout/header";
import { RiskCheckForm } from "./risk-check-form";

export default function RiskCheckPage() {
  return (
    <>
      <Header title="AI Content Risk Check" />
      <RiskCheckForm />
    </>
  );
}
