import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { ChapterHeader } from "@/components/ChapterHeader";
import { chapterSectionStyle } from "@/lib/section-leaf";

type ChapterSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** Chapter content region in the main column. Nav TOC lives only in the SideNav. */
export function ChapterSection({ id, title, children }: ChapterSectionProps) {
  return (
    <VStack
      as="section"
      id={id}
      aria-label={title}
      gap={0}
      width="100%"
      style={chapterSectionStyle}
    >
      <ChapterHeader title={title} titleId={`${id}-title`} />
      {children}
    </VStack>
  );
}
