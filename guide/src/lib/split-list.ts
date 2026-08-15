/**
 * Split brand list strings on middot, comma, or newlines.
 * Mirror of scripts/lib/split-list.mjs — keep rules in sync.
 */
export function splitList(s: string | undefined | null): string[] {
  if (!s || typeof s !== "string") return [];
  const trimmed = s.trim();
  if (!trimmed) return [];

  if (trimmed.includes("·")) {
    return trimmed
      .split(/\s*·\s*/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (/\n/.test(trimmed)) {
    return trimmed
      .split(/\n+/)
      .map((x) => x.replace(/^[-*]\s+/, "").trim())
      .filter(Boolean);
  }

  if (trimmed.includes(",")) {
    return trimmed
      .split(/\s*,\s*/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (trimmed.includes(". ") && !trimmed.includes(":")) {
    return trimmed
      .split(/\.\s+/)
      .map((x) => x.replace(/\.$/, "").trim())
      .filter(Boolean);
  }

  return [trimmed];
}
