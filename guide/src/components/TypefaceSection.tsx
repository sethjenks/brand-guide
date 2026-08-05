"use client";

import { Button } from "@astryxdesign/core/Button";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";
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
  className?: string;
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
  className,
}: TypefaceSectionProps) {
  const specimenStyle = fontFamily
    ? ({ "--typeface-specimen-font": fontFamily } as CSSProperties)
    : undefined;

  return (
    <VStack
      as="section"
      id={id}
      gap={6}
      className={["typeface-section", className]
        .filter(Boolean)
        .join(" ")}
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="typeface-clothesline"
        action={
          <Button
            label="Download"
            variant="primary"
            clickAction={() => downloadFile(downloadHref)}
          />
        }
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            {title}
          </Heading>
        }
      >
        <Text
          color="primary"
          as="p"
          display="block"
          className="measure typeface-context"
        >
          {context}
        </Text>
      </Clothesline>

      <Grid
        columns={3}
        gap={4}
        columnGap={6}
        align="start"
        width="100%"
        className="typeface-body"
      >
        <VStack gap={1} className="typeface-meta">
          <Text
            weight="semibold"
            color="primary"
            display="block"
            className="clothesline-title"
          >
            {faceName}
          </Text>
          <Text type="supporting" color="secondary" display="block">
            {foundry}
          </Text>
        </VStack>

        <GridSpan columns={2}>
          <VStack
            gap={1}
            width="100%"
            className="typeface-specimen"
            style={specimenStyle}
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
        </GridSpan>
      </Grid>
    </VStack>
  );
}
