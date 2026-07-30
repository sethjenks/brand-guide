import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { Clothesline } from "@/components/Clothesline";

export type AudienceGroup = {
  segments: readonly string[];
  wants: string;
  needs: string;
};

type AudienceSectionProps = {
  id?: string;
  intro: string;
  groups: readonly AudienceGroup[];
};

function AudienceColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <VStack gap={2}>
      <Text weight="bold" color="primary" display="block">
        {label}
      </Text>
      {children}
    </VStack>
  );
}

/**
 * Strategy → Audience leaf: clothesline intro + Group / Wants / Needs grid.
 */
export function AudienceSection({
  id = "strategy-audience",
  intro,
  groups,
}: AudienceSectionProps) {
  if (!intro && groups.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection audience-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            Audience
          </Heading>
        }
      >
        {intro ? (
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure audience-intro"
          >
            {intro}
          </Text>
        ) : null}
      </Clothesline>

      {groups.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Audience groups">
          {groups.map((group) => {
            const key = group.segments.join(" · ") || group.wants;
            return (
              <Grid
                key={key}
                columns={3}
                gap={6}
                columnGap={8}
                align="start"
                className="audience-row"
                role="listitem"
              >
                <AudienceColumn label="Group">
                  <VStack gap={1}>
                    {group.segments.map((segment) => (
                      <Text key={segment} color="primary" display="block">
                        {segment}
                      </Text>
                    ))}
                  </VStack>
                </AudienceColumn>
                <AudienceColumn label="Wants">
                  <Text color="primary" display="block" className="measure">
                    {group.wants}
                  </Text>
                </AudienceColumn>
                <AudienceColumn label="Needs">
                  <Text color="primary" display="block" className="measure">
                    {group.needs}
                  </Text>
                </AudienceColumn>
              </Grid>
            );
          })}
        </VStack>
      ) : null}
    </VStack>
  );
}
