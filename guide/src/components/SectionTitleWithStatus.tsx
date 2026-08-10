import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { SectionStatusBadge } from "@/components/SectionStatusBadge";
import type { SectionStatus } from "@/lib/section-status-ui";
import { sectionNeedsWork } from "@/lib/section-status-ui";

type SectionTitleWithStatusProps = {
  id: string;
  title: string;
  status?: SectionStatus;
  /** Extra chips beside the status badge (e.g. AgentLabel). */
  trailing?: ReactNode;
};

/**
 * Clothesline / section H3 with optional customization status badge.
 */
export function SectionTitleWithStatus({
  id,
  title,
  status,
  trailing,
}: SectionTitleWithStatusProps) {
  return (
    <HStack gap={2} align="center" wrap="wrap">
      <Heading level={3} id={`${id}-title`} className="clothesline-title">
        {title}
      </Heading>
      <SectionStatusBadge status={status} />
      {trailing}
    </HStack>
  );
}

type SectionStatusCalloutProps = {
  status?: SectionStatus;
};

/** Short supporting line under section context when status ≠ ok. */
export function SectionStatusCallout({ status }: SectionStatusCalloutProps) {
  if (!sectionNeedsWork(status)) return null;
  return (
    <Text
      type="supporting"
      color="secondary"
      as="p"
      display="block"
      className="measure section-status-callout"
    >
      Still needs customization.
    </Text>
  );
}

type SectionStatusBlockProps = {
  status?: SectionStatus;
  children?: ReactNode;
};

/**
 * Wraps clothesline body content with an optional status callout above children.
 */
export function SectionStatusBlock({
  status,
  children,
}: SectionStatusBlockProps) {
  if (!sectionNeedsWork(status) && !children) return null;
  if (!sectionNeedsWork(status)) return <>{children}</>;
  return (
    <VStack gap={2} width="100%" align="start">
      <SectionStatusCallout status={status} />
      {children}
    </VStack>
  );
}
