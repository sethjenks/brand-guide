import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { CreateWorkspace } from "@/components/CreateWorkspace";
import { GuideColumn } from "@/components/GuideColumn";
import { loadBrand } from "@/lib/load-brand";
import { CREATE_NAV } from "@/lib/nav";

export function generateMetadata(): Metadata {
  const brand = loadBrand();
  return {
    title: `${brand.name} — Create`,
    description: `Create assets from the ${brand.name} brand.`,
  };
}

export default function CreatePage() {
  const brand = loadBrand();

  return (
    <AppShell brandName={brand.name} groups={CREATE_NAV} mode="create">
      <GuideColumn data-setup={brand.setup.status}>
        <CreateWorkspace brandName={brand.name} />
      </GuideColumn>
    </AppShell>
  );
}
