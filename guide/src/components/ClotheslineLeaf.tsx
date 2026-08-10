import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { Clothesline } from "@/components/Clothesline";
import { SectionContext } from "@/components/SectionContext";
import { SectionIntro } from "@/components/SectionIntro";
import {
  SectionStatusBlock,
  SectionTitleWithStatus,
} from "@/components/SectionTitleWithStatus";
import { sectionLeafStyle } from "@/lib/section-leaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type ClotheslineLeafGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type ClotheslineLeafProps = {
  id: string;
  title: string;
  status?: SectionStatus;
  trailing?: ReactNode;
  action?: ReactNode;
  /** Large intro in the clothesline content column. */
  intro?: string;
  /** Body context in the clothesline content column. */
  context?: string;
  /** Extra content inside the clothesline after intro/context. */
  headerContent?: ReactNode;
  /** Content below the clothesline. When omitted, Clothesline is the section root. */
  children?: ReactNode;
  className?: string;
  gap?: ClotheslineLeafGap;
};

/**
 * Shared section leaf: clothesline chrome + status title/block, optional
 * body content below.
 */
export function ClotheslineLeaf({
  id,
  title,
  status,
  trailing,
  action,
  intro,
  context,
  headerContent,
  children,
  className,
  gap = 8,
}: ClotheslineLeafProps) {
  const hasBelow = children != null;
  const clotheslineBody = (
    <SectionStatusBlock status={status}>
      {intro || context || headerContent ? (
        <VStack gap={8} width="100%" align="start">
          {intro ? <SectionIntro>{intro}</SectionIntro> : null}
          {context ? <SectionContext>{context}</SectionContext> : null}
          {headerContent}
        </VStack>
      ) : null}
    </SectionStatusBlock>
  );

  const clothesline = (
    <Clothesline
      as={hasBelow ? "div" : "section"}
      id={hasBelow ? undefined : id}
      className={hasBelow ? undefined : className}
      style={hasBelow ? undefined : sectionLeafStyle}
      aria-labelledby={hasBelow ? undefined : `${id}-title`}
      action={action}
      title={
        <SectionTitleWithStatus
          id={id}
          title={title}
          status={status}
          trailing={trailing}
        />
      }
    >
      {clotheslineBody}
    </Clothesline>
  );

  if (!hasBelow) return clothesline;

  return (
    <VStack
      as="section"
      id={id}
      gap={gap}
      className={className}
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      {clothesline}
      {children}
    </VStack>
  );
}
