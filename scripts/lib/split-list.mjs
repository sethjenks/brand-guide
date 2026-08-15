/**
 * Split brand list strings on middot, comma, or newlines.
 * Used by compile and mirrored in guide/src/lib/split-list.ts.
 *
 * @param {string} s
 * @returns {string[]}
 */
export function splitList(s) {
  if (!s || typeof s !== "string") return [];
  const trimmed = s.trim();
  if (!trimmed) return [];

  // Prefer middot (common in Sample Brand and populated brands).
  if (trimmed.includes("·")) {
    return trimmed
      .split(/\s*·\s*/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  // Newlines as list separators.
  if (/\n/.test(trimmed)) {
    return trimmed
      .split(/\n+/)
      .map((x) => x.replace(/^[-*]\s+/, "").trim())
      .filter(Boolean);
  }

  // Comma-separated (avoid splitting decimal-looking fragments lightly).
  if (trimmed.includes(",")) {
    return trimmed
      .split(/\s*,\s*/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  // Sentence-style "A. B. C." lists (legacy archetype fields).
  if (trimmed.includes(". ") && !trimmed.includes(":")) {
    return trimmed
      .split(/\.\s+/)
      .map((x) => x.replace(/\.$/, "").trim())
      .filter(Boolean);
  }

  return [trimmed];
}
