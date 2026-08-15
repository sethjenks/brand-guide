import { Text } from "@astryxdesign/core/Text";
import type { ReactNode } from "react";

const QUESTIONNAIRE = "Branding Questionnaire";
const GITHUB_PHRASE =
  "Clone the repo on GitHub (https://github.com/sethjenks/brand-guide)";
const GITHUB_URL = "https://github.com/sethjenks/brand-guide";

type Segment =
  | { kind: "text"; value: string }
  | { kind: "questionnaire" }
  | { kind: "github" };

function segmentSetupBody(body: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = body;

  while (remaining.length > 0) {
    const qIndex = remaining.indexOf(QUESTIONNAIRE);
    const gIndex = remaining.indexOf(GITHUB_PHRASE);
    const gUrlOnly = remaining.indexOf(GITHUB_URL);

    const candidates = [
      qIndex === -1 ? null : { at: qIndex, kind: "questionnaire" as const },
      gIndex === -1 ? null : { at: gIndex, kind: "github" as const },
      gIndex === -1 && gUrlOnly !== -1
        ? { at: gUrlOnly, kind: "github" as const, urlOnly: true }
        : null,
    ].filter(Boolean) as {
      at: number;
      kind: "questionnaire" | "github";
      urlOnly?: boolean;
    }[];

    if (candidates.length === 0) {
      segments.push({ kind: "text", value: remaining });
      break;
    }

    candidates.sort((a, b) => a.at - b.at);
    const next = candidates[0]!;

    if (next.at > 0) {
      segments.push({ kind: "text", value: remaining.slice(0, next.at) });
    }

    if (next.kind === "questionnaire") {
      segments.push({ kind: "questionnaire" });
      remaining = remaining.slice(next.at + QUESTIONNAIRE.length);
      continue;
    }

    segments.push({ kind: "github" });
    const length = next.urlOnly ? GITHUB_URL.length : GITHUB_PHRASE.length;
    remaining = remaining.slice(next.at + length);
  }

  return segments;
}

/**
 * Renders setup.body with Questionnaire + GitHub URL enrichment.
 */
export function SetupHeroBody({ body }: { body: string }) {
  const nodes: ReactNode[] = segmentSetupBody(body).map((segment, index) => {
    switch (segment.kind) {
      case "text":
        return <span key={index}>{segment.value}</span>;
      case "questionnaire":
        return (
          <a key={index} href="#utilities-branding-questionnaire">
            {QUESTIONNAIRE}
          </a>
        );
      case "github":
        return (
          <a
            key={index}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Clone the repo on GitHub
          </a>
        );
      default: {
        const _exhaustive: never = segment;
        return _exhaustive;
      }
    }
  });

  return (
    <Text as="p" color="secondary" display="block" className="hero-support">
      {nodes}
    </Text>
  );
}
