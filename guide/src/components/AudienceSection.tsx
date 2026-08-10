import { Grid } from "@astryxdesign/core/Grid";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { LabeledField } from "@/components/LabeledField";
import type { SectionStatus } from "@/lib/section-status-ui";

export type AudienceGroup = {
  segments: readonly string[];
  wants: string;
  needs: string;
};

type AudienceSectionProps = {
  id?: string;
  intro: string;
  groups: readonly AudienceGroup[];
  status?: SectionStatus;
};

/**
 * Strategy → Audience leaf: clothesline intro + Group / Wants / Needs grid.
 */
export function AudienceSection({
  id = "strategy-audience",
  intro,
  groups,
  status,
}: AudienceSectionProps) {
  if (!intro && groups.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Audience"
      intro={intro || undefined}
      status={status}
      className="audience-section"
    >
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
                <LabeledField label="Group">
                  <VStack gap={1}>
                    {group.segments.map((segment) => (
                      <Text key={segment} color="primary" display="block">
                        {segment}
                      </Text>
                    ))}
                  </VStack>
                </LabeledField>
                <LabeledField label="Wants">
                  <Text color="primary" display="block" className="measure">
                    {group.wants}
                  </Text>
                </LabeledField>
                <LabeledField label="Needs">
                  <Text color="primary" display="block" className="measure">
                    {group.needs}
                  </Text>
                </LabeledField>
              </Grid>
            );
          })}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
