import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { ChapterHeader } from "@/components/ChapterHeader";

type ChapterSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** Chapter content region in the main column. Nav TOC lives only in the SideNav. */
export function ChapterSection({ id, title, children }: ChapterSectionProps) {
  return (
    <VStack as="section" id={id} aria-label={title} className="act" gap={0}>
      <ChapterHeader title={title} titleId={`${id}-title`} />
      {children}
    </VStack>
  );
}
