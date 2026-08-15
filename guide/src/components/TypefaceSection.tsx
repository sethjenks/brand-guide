"use client";

import { Button } from "@astryxdesign/core/Button";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { SectionStatus } from "@/lib/section-status-ui";
import "@/styles/flourish/type-specimens.css";

const SPECIMEN_LINES = [
  "ABCDEFGHIJKLMNO",
  "PQRSTUVWXYZ",
  "abcdefghijklmnopqrs",
  "tuvwxyz",
  "0123456789",
  "!@#$%^&*()?+",
] as const;

type TypefaceSectionProps = {
  id: string;
  title: string;
  /** Short context beside the label (qualities / use cases). */
  context: string;
  /** Face name shown in the meta column and specimen. */
  faceName: string;
  /** Foundry / designer credit under the face name. */
  foundry: string;
  /** Zip of the type specimen / font files. */
  downloadHref: string;
  /** Optional CSS font-family stack for the live specimen. */
  fontFamily?: string;
  /** Optional CSS font-style for the live specimen (e.g. italic). */
  fontStyle?: string;
  /** Optional CSS font-weight for the live specimen. */
  specimenWeight?: string | number;
  /** Optional CSS font-style applied via style (alias of fontStyle for clarity). */
  specimenStyle?: string;
  className?: string;
  status?: SectionStatus;
};

function downloadFile(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Typeface leaf: clothesline (label + context + Download) above a
 * live character specimen — meta left, glyph set right.
 */
export function TypefaceSection({
  id,
  title,
  context,
  faceName,
  foundry,
  downloadHref,
  fontFamily,
  fontStyle,
  specimenWeight,
  specimenStyle,
  className,
  status,
}: TypefaceSectionProps) {
  const resolvedStyle = specimenStyle ?? fontStyle;
  const specimenStyleProps =
    fontFamily || resolvedStyle || specimenWeight
      ? ({
          ...(fontFamily
            ? { "--typeface-specimen-font": fontFamily }
            : undefined),
          ...(resolvedStyle
            ? { "--typeface-specimen-style": resolvedStyle }
            : undefined),
          ...(specimenWeight != null
            ? { "--typeface-specimen-weight": String(specimenWeight) }
            : undefined),
        } as CSSProperties)
      : undefined;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      gap={6}
      className={["typeface-section", className].filter(Boolean).join(" ")}
      action={
        <Button
          label="Download"
          variant="primary"
          clickAction={() => downloadFile(downloadHref)}
        />
      }
    >
      <ClotheslineRow
        className="typeface-body"
        label={
          <VStack gap={1} className="typeface-meta">
            <Text
              weight="semibold"
              color="primary"
              display="block"
              className="clothesline-title"
            >
              {faceName}
            </Text>
            {foundry ? (
              <Text type="supporting" color="secondary" display="block">
                {foundry}
              </Text>
            ) : null}
          </VStack>
        }
      >
        <VStack
          gap={1}
          width="100%"
          className="typeface-specimen"
          style={specimenStyleProps}
          aria-label={`${faceName} character set`}
        >
          <Text
            weight="bold"
            color="primary"
            display="block"
            className="typeface-specimen-line typeface-specimen-name"
          >
            {faceName}
          </Text>
          {SPECIMEN_LINES.map((line) => (
            <Text
              key={line}
              weight="bold"
              color="primary"
              display="block"
              className="typeface-specimen-line"
            >
              {line}
            </Text>
          ))}
        </VStack>
      </ClotheslineRow>
    </ClotheslineLeaf>
  );
}
