"use client";

import { Heading } from "@astryxdesign/core/Heading";
import { MediaTheme } from "@astryxdesign/core/theme";
import { VStack } from "@astryxdesign/core/VStack";

type ChapterHeaderProps = {
  title: string;
  /** Optional id for the heading element (chapter region keeps the hash id). */
  titleId?: string;
};

/**
 * Full-bleed inverted chapter opener — large bold title on ink,
 * used at the top of each brand-book chapter.
 */
export function ChapterHeader({ title, titleId }: ChapterHeaderProps) {
  return (
    <VStack
      as="header"
      className="chapter-header"
      gap={0}
      justify="end"
      aria-label={title}
    >
      <MediaTheme mode="dark">
        <Heading
          level={1}
          color="primary"
          id={titleId}
          className="chapter-header-title"
          data-type="h0"
        >
          {title}
        </Heading>
      </MediaTheme>
    </VStack>
  );
}
