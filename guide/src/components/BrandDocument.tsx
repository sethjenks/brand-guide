import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import {
  type BrandCompleteness,
  type CompletenessField,
  type FieldGapStatus,
} from "@/lib/brand-completeness";
import type { BrandGuideViewModel } from "@/lib/brand-types";
import { SectionStatusBadge } from "@/components/SectionStatusBadge";
import { sectionLeafStyle } from "@/lib/section-leaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type BrandDocumentProps = {
  brand: BrandGuideViewModel;
  gaps: BrandCompleteness;
};

function GapBadge({ status }: { status: FieldGapStatus }) {
  // FieldGapStatus is a subset of SectionStatus (no "assets" / "partial")
  return <SectionStatusBadge status={status as SectionStatus} />;
}

function FieldRow({ field }: { field: CompletenessField }) {
  const isGap = field.status !== "ok";
  const display = field.value || "—";

  return (
    <VStack
      gap={2}
      width="100%"
      className={
        isGap
          ? `brand-doc-field brand-doc-field-${field.status}`
          : "brand-doc-field"
      }
      id={`brand-doc-field-${field.path.replace(/\./g, "-")}`}
    >
      <HStack gap={2} align="center" wrap="wrap">
        <Text weight="semibold" color="primary" display="block">
          {field.label}
        </Text>
        <GapBadge status={field.status} />
      </HStack>
      <Text
        color={isGap ? "secondary" : "primary"}
        as="p"
        display="block"
        className="measure brand-doc-field-value"
      >
        {display}
      </Text>
      {field.hint && isGap ? (
        <Text type="supporting" color="secondary" as="p" display="block">
          {field.hint}
        </Text>
      ) : null}
    </VStack>
  );
}

/**
 * Utilities → Brand document: HTML constitution view with completeness badges.
 */
export function BrandDocument({ brand, gaps }: BrandDocumentProps) {
  const { summary, sections } = gaps;
  const firstGap = sections
    .flatMap((s) => s.fields)
    .find((f) => f.status !== "ok");
  const firstGapHref = firstGap
    ? `#brand-doc-field-${firstGap.path.replace(/\./g, "-")}`
    : null;

  return (
    <VStack
      as="section"
      id="utilities-brand-document"
      gap={0}
      width="100%"
      className="brand-document"
      aria-labelledby="utilities-brand-document-title"
    >
      <Clothesline
        as="section"
        style={sectionLeafStyle}
        title={
          <Heading
            level={3}
            id="utilities-brand-document-title"
            className="clothesline-title"
          >
            Brand document
          </Heading>
        }
      >
        <VStack gap={4} width="100%" align="start">
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure"
          >
            Structured view of <code>brand.md</code> fields from the compiled
            guide. Gaps show what still needs work to finish the brand guide.
          </Text>
          <Text color="secondary" as="p" display="block" className="measure">
            {summary.attention === 0 ? (
              <>All checked fields look complete.</>
            ) : (
              <>
                <strong>{summary.attention}</strong> need attention
                {summary.empty > 0 ? ` · ${summary.empty} missing` : ""}
                {summary.stub > 0 ? ` · ${summary.stub} stub` : ""}
                {summary.sample > 0 ? ` · ${summary.sample} starter` : ""}
                {" · "}
                {summary.ok} ok
              </>
            )}
          </Text>
          {brand.setup.status === "starter" ? (
            <Text
              type="supporting"
              color="secondary"
              as="p"
              display="block"
              className="measure"
            >
              Setup is still <code>starter</code> — Sample Brand copy is flagged
              as Starter until you replace it and set status to{" "}
              <code>populated</code>.
            </Text>
          ) : null}
          {firstGapHref ? (
            <Text as="p" display="block">
              <a href={firstGapHref}>Jump to first gap</a>
            </Text>
          ) : null}
        </VStack>
      </Clothesline>

      {sections.map((section) => (
        <Clothesline
          key={section.id}
          as="section"
          id={`utilities-brand-doc-${section.id}`}
          style={sectionLeafStyle}
          title={
            <Heading
              level={3}
              id={`utilities-brand-doc-${section.id}-title`}
              className="clothesline-title"
            >
              {section.title}
            </Heading>
          }
        >
          <VStack gap={6} width="100%" align="start">
            {section.fields.map((f) => (
              <FieldRow key={f.path} field={f} />
            ))}
          </VStack>
        </Clothesline>
      ))}
    </VStack>
  );
}
