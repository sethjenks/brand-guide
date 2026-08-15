/**
 * Map Expressions channel labels onto applications-* nav leaf ids.
 * Unknown channels get applications-<slug>. Keep in sync with section-status.
 */

export type ApplicationNavItem = {
  id: string;
  label: string;
};

/** Known channel label (lowercase) → leaf id. */
const KNOWN_CHANNEL_IDS: Record<string, string> = {
  web: "applications-web",
  social: "applications-social",
  print: "applications-print",
  "business cards": "applications-business-cards",
  "business card": "applications-business-cards",
  merchandise: "applications-merchandise",
  swag: "applications-merchandise",
  packaging: "applications-packaging",
  signage: "applications-signage",
  presentation: "applications-presentation",
  "out of home": "applications-ooh",
  ooh: "applications-ooh",
  "digital ads": "applications-digital-ads",
  "digital-ads": "applications-digital-ads",
  app: "applications-app",
  email: "applications-email",
};

export function slugifyChannel(channel: string): string {
  return channel
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "channel";
}

/**
 * Resolve a channel label to a stable applications leaf id.
 * Always returns an id (known map or applications-<slug>).
 */
export function applicationChannelToLeafId(channel: string): string {
  const key = channel.trim().toLowerCase();
  if (!key) return "applications-channel";
  if (KNOWN_CHANNEL_IDS[key]) return KNOWN_CHANNEL_IDS[key]!;
  // Print variants still map to print when the word Print leads.
  if (key.startsWith("print")) return "applications-print";
  return `applications-${slugifyChannel(channel)}`;
}

/** Display label for a channel (title-case unknown slugs lightly). */
export function applicationChannelLabel(channel: string): string {
  const trimmed = channel.trim();
  if (!trimmed) return "Channel";
  const key = trimmed.toLowerCase();
  if (key === "ooh") return "Out of home";
  return trimmed;
}

/**
 * Build applications nav items from authored expression rows (one row = one leaf).
 * Dedupes by leaf id (first wins).
 */
export function applicationsNavFromExpressions(
  items: readonly { channel: string }[],
): ApplicationNavItem[] {
  const seen = new Set<string>();
  const out: ApplicationNavItem[] = [];
  for (const item of items) {
    const channel = item.channel?.trim();
    if (!channel) continue;
    const id = applicationChannelToLeafId(channel);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ id, label: applicationChannelLabel(channel) });
  }
  return out;
}
