import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import type { ArchetypeProfile, ArchetypeRole } from "@/lib/brand-types";

const ROLE_LABEL: Record<ArchetypeRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
};

function Field({
  label,
  items,
  highlighted,
}: {
  label: string;
  items: readonly string[];
  highlighted?: readonly string[];
}) {
  if (!items.length) return null;
  const hi = new Set(
    (highlighted ?? []).map((t) => t.trim().toLowerCase()),
  );
  return (
    <VStack gap={2} className="ap-field">
      <Text
        weight="bold"
        color="primary"
        display="block"
        className="ap-field-label"
      >
        {label}
      </Text>
      <ul className="ap-field-list">
        {items.map((item) => {
          const isHi = hi.has(item.trim().toLowerCase());
          return (
            <li key={item} className={isHi ? "is-highlighted" : undefined}>
              {item}
            </li>
          );
        })}
      </ul>
    </VStack>
  );
}

type ArchetypeProfileCardProps = {
  profile: ArchetypeProfile;
  /** Slim layout for the wheel side panel (no nested clothesline). */
  compact?: boolean;
  badge?: string;
  /** Override role eyebrow (e.g. Exploring). */
  roleLabel?: string;
};

function ProfileFields({ profile }: { profile: ArchetypeProfile }) {
  const typesLabel = profile.types.length
    ? `Types of ${profile.name.split(/\s*\/\s*/)[0]?.trim() || "archetype"}s`
    : "Types";

  return (
    <Grid
      columns={3}
      gap={6}
      columnGap={8}
      align="start"
      className="ap-grid"
    >
      <Field label="Drive" items={profile.drive} />
      <Field label="Fears / Villains" items={profile.fears} />
      <Field label="Strategy" items={profile.strategy} />
      <Field label="Voice" items={profile.voice} />
      <Field label="Seeks" items={profile.seeks ? [profile.seeks] : []} />
      <Field label="Motto" items={profile.mottos} />
      <Field label="Audience feels" items={profile.audienceFeels} />
      <Field label="Brands" items={profile.brands} />
      <Field label="At best" items={profile.atBest} />
      <Field label="At worst" items={profile.atWorst} />
      <Field label="Characters" items={profile.characters} />
      <Field
        label={typesLabel}
        items={profile.types}
        highlighted={profile.typesHighlighted}
      />
    </Grid>
  );
}

/**
 * Archetype profile in clothesline language — rule, label left, narrative + field grid right.
 * Compact mode omits the clothesline chrome (for embedding under ArchetypeExplorer).
 */
export function ArchetypeProfileCard({
  profile,
  compact = false,
  badge,
  roleLabel,
}: ArchetypeProfileCardProps) {
  const eyebrow =
    roleLabel ?? `${ROLE_LABEL[profile.role]} archetype`;
  const titleId = compact
    ? `archetype-preview-${profile.wheel || profile.role}`
    : `archetype-profile-${profile.role}`;

  const lead = (
    <VStack gap={3}>
      <Text
        type="large"
        weight="semibold"
        color="primary"
        as="p"
        display="block"
        id={titleId}
        className="ap-title"
      >
        {profile.name}
      </Text>
      {badge ? (
        <Text color="secondary" type="supporting" display="block">
          {badge}
        </Text>
      ) : null}
      {profile.motivations ? (
        <Text
          type="label"
          weight="semibold"
          color="secondary"
          display="block"
          className="ap-motivations"
        >
          {profile.motivations}
        </Text>
      ) : null}
      {profile.personality ? (
        <Text
          type={compact ? "body" : "large"}
          weight={compact ? "normal" : "semibold"}
          color="primary"
          as="p"
          display="block"
          className="measure ap-narrative"
        >
          {profile.personality}
        </Text>
      ) : null}
      {profile.quote ? (
        <Text as="p" display="block" color="primary" className="measure ap-quote">
          “{profile.quote}”
        </Text>
      ) : null}
    </VStack>
  );

  const compactFields = (
    <Grid
      columns={2}
      gap={5}
      columnGap={6}
      align="start"
      className="ap-compact-grid"
    >
      <Field label="Seeks" items={profile.seeks ? [profile.seeks] : []} />
      <Field label="Drive" items={profile.drive.slice(0, 5)} />
      <Field label="At best" items={profile.atBest} />
      <Field label="At worst" items={profile.atWorst} />
      <Field label="Voice" items={profile.voice} />
      <Field label="Motto" items={profile.mottos.slice(0, 2)} />
    </Grid>
  );

  if (compact) {
    return (
      <VStack
        as="article"
        gap={6}
        className="archetype-profile is-compact"
        aria-labelledby={titleId}
      >
        {lead}
        {compactFields}
      </VStack>
    );
  }

  return (
    <Clothesline
      as="article"
      className={`archetype-profile role-${profile.role}`}
      aria-labelledby={titleId}
      title={
        <Heading level={3} className="clothesline-title">
          {eyebrow}
        </Heading>
      }
    >
      <VStack gap={8}>
        {lead}
        <ProfileFields profile={profile} />
      </VStack>
    </Clothesline>
  );
}
