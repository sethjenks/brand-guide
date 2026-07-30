#!/usr/bin/env node
/**
 * Compile brand.md (+ examples.md, rules.md, templates.md) → brand.json.
 *
 * Usage: node scripts/compile-brand.mjs
 *        npm run compile   (from guide/)
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BRAND_MD = path.join(root, "brand.md");
const EXAMPLES_MD = path.join(root, "examples.md");
const RULES_MD = path.join(root, "rules.md");
const TEMPLATES_MD = path.join(root, "templates.md");
const BRAND_JSON = path.join(root, "brand.json");
const PUBLIC_BRAND_TXT = path.join(root, "guide/public/brand.txt");
const SPEC_VERSION = "1.1.0";

/** @param {string} s */
function stripQuotes(s) {
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

/**
 * @param {string} md
 * @returns {{ frontmatter: Record<string, string>, body: string }}
 */
function parseFrontmatter(md) {
  if (!md.startsWith("---")) {
    return { frontmatter: {}, body: md };
  }
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, body: md };
  const raw = md.slice(4, end).trim();
  const body = md.slice(end + 4).replace(/^\n/, "");
  /** @type {Record<string, string>} */
  const frontmatter = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    frontmatter[m[1]] = stripQuotes(m[2]);
  }
  return { frontmatter, body };
}

/**
 * Extract **Label.** value lines (value may continue until blank or next **).
 * @param {string} text
 * @returns {Map<string, string>}
 */
function extractLabeled(text) {
  /** @type {Map<string, string>} */
  const map = new Map();
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*\*([^*]+)\.\*\*\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    let value = m[2].trim();
    while (i + 1 < lines.length) {
      const next = lines[i + 1];
      if (!next.trim()) break;
      if (/^\*\*[^*]+\.\*\*/.test(next)) break;
      if (/^#{1,3}\s/.test(next)) break;
      if (/^\|/.test(next)) break;
      if (/^[-*]\s/.test(next) && !value) break;
      if (/^\d+\.\s/.test(next)) break;
      value = value ? `${value} ${next.trim()}` : next.trim();
      i += 1;
    }
    map.set(key, value);
  }
  return map;
}

/**
 * @param {string} text
 * @param {string} heading // e.g. "## Strategy"
 * @returns {string}
 */
function sectionAfter(text, heading) {
  const re = new RegExp(
    `^${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
    "im",
  );
  const m = text.match(re);
  if (!m || m.index === undefined) return "";
  const start = m.index + m[0].length;
  const rest = text.slice(start);
  const next = rest.search(/^##\s/m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

/**
 * @param {string} text
 * @param {string} heading // e.g. "### Overview"
 */
function subsection(text, heading) {
  return sectionAfter(text, heading);
}

/**
 * Extract #### heading blocks (stops at next #### or ###).
 * @param {string} text
 * @returns {{ title: string, body: string }[]}
 */
function h4Blocks(text) {
  /** @type {{ title: string, body: string }[]} */
  const blocks = [];
  const re = /^####\s+(.+)\s*$/gm;
  const matches = [...text.matchAll(re)];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const title = (m[1] || "").trim();
    const start = (m.index ?? 0) + m[0].length;
    const end =
      i + 1 < matches.length
        ? (matches[i + 1].index ?? text.length)
        : text.length;
    let body = text.slice(start, end);
    const nextH3 = body.search(/^###\s/m);
    if (nextH3 !== -1) body = body.slice(0, nextH3);
    // Drop HTML comments (template stubs)
    body = body.replace(/<!--[\s\S]*?-->/g, "").trim();
    if (!body) continue;
    blocks.push({ title, body });
  }
  return blocks;
}

/**
 * @param {string} personalityText
 * @returns {object[]}
 */
function parseArchetypeProfiles(personalityText) {
  const cleaned = personalityText.replace(/<!--[\s\S]*?-->/g, "");
  const roleFromTitle = (title) => {
    const t = title.toLowerCase();
    if (t.startsWith("primary")) return "primary";
    if (t.startsWith("secondary")) return "secondary";
    if (t.startsWith("tertiary")) return "tertiary";
    return null;
  };

  /** @type {object[]} */
  const profiles = [];
  for (const block of h4Blocks(cleaned)) {
    const role = roleFromTitle(block.title);
    if (!role) continue;
    if (!/archetype/i.test(block.title)) continue;
    const L = extractLabeled(block.body);
    const mottos = splitList(L.get("motto") || "");
    profiles.push({
      role,
      name: L.get("name") || "",
      wheel: L.get("wheel") || "",
      motivations: L.get("motivations") || "",
      personality: L.get("personality narrative") || L.get("personality") || "",
      quote: L.get("quote") || "",
      drive: splitList(L.get("drive") || ""),
      fears: splitList(L.get("fears") || L.get("fears/villains") || ""),
      strategy: splitList(L.get("strategy") || ""),
      voice: splitList(L.get("voice") || ""),
      seeks: L.get("seeks") || "",
      mottos,
      audienceFeels: splitList(
        L.get("audience feels") || L.get("audience feel") || "",
      ),
      brands: splitList(L.get("brands") || ""),
      atBest: splitList(L.get("at best") || ""),
      atWorst: splitList(L.get("at worst") || ""),
      characters: splitList(L.get("characters") || ""),
      types: splitList(L.get("types") || ""),
      typesHighlighted: splitList(L.get("types highlighted") || ""),
    });
  }
  return profiles;
}

/** Shell-owned Brand Voice spectrum scales (keep in sync with guide/src/lib/voice-spectrum.ts). */
const VOICE_SPECTRUM_DIMENSIONS = [
  {
    id: "volume",
    label: "Volume",
    steps: [
      "Whispers",
      "Inside voices",
      "Hanging out",
      "At the game",
      "Explosive",
    ],
  },
  {
    id: "energy",
    label: "Energy",
    steps: [
      "Monk-like",
      "Relaxed",
      "Going for a stroll",
      "Pumped",
      "Crazed",
    ],
  },
  {
    id: "sociability",
    label: "Sociability",
    steps: [
      "Lives alone",
      "Just in the family",
      "Friends & family",
      "Neighborhood",
      "Everyone's invited",
    ],
  },
  {
    id: "attitude",
    label: "Attitude",
    steps: [
      "Completely PC",
      "Traditional",
      "Opinionated when needed",
      "No filter",
      "Polarizing",
    ],
  },
];

/**
 * @param {string[]} steps
 * @param {string} label
 */
function findSpectrumStepIndex(steps, label) {
  const key = (label || "").trim().toLowerCase();
  if (!key) return -1;
  const exact = steps.findIndex((s) => s.toLowerCase() === key);
  if (exact >= 0) return exact;
  return steps.findIndex(
    (s) => s.toLowerCase().includes(key) || key.includes(s.toLowerCase()),
  );
}

/**
 * @param {string} identityText
 * @returns {{ intro: string, rows: object[] }}
 */
function parseVoiceSpectrum(identityText) {
  const block = h4Blocks(identityText).find((b) =>
    /voice\s+spectrum/i.test(b.title),
  );
  const body = block?.body || "";
  const intro = extractLabeled(body).get("spectrum intro") || "";
  const rows = block ? parseTables(body) : [];

  return {
    intro,
    rows: VOICE_SPECTRUM_DIMENSIONS.map((dim) => {
      const row = rows.find(
        (r) =>
          (r.dimension || r.dim || "")
            .replace(/\*\*/g, "")
            .trim()
            .toLowerCase() === dim.label.toLowerCase(),
      );
      let start = findSpectrumStepIndex(dim.steps, row?.from || "");
      let end = findSpectrumStepIndex(dim.steps, row?.to || "");
      if (start < 0 && end < 0) {
        start = 0;
        end = -1; // no highlight
      } else if (start < 0) {
        start = end;
      } else if (end < 0) {
        end = start;
      }
      if (end < start) {
        const tmp = start;
        start = end;
        end = tmp;
      }
      return {
        id: dim.id,
        label: dim.label,
        steps: [...dim.steps],
        start,
        end,
        notes: (row?.notes || "").trim(),
      };
    }),
  };
}

/** Split "A · B · C" or "A. B. C." into parts */
/** @param {string} s */
function splitList(s) {
  if (!s) return [];
  if (s.includes(" · ")) {
    return s.split(/\s*·\s*/).map((x) => x.trim()).filter(Boolean);
  }
  if (s.includes(". ") && !s.includes(":")) {
    return s
      .split(/\.\s+/)
      .map((x) => x.replace(/\.$/, "").trim())
      .filter(Boolean);
  }
  return [s.trim()].filter(Boolean);
}

/**
 * Parse markdown table into array of row objects keyed by header.
 * @param {string} text
 * @returns {Record<string, string>[]}
 */
function parseTables(text) {
  const rows = [];
  const lines = text.split("\n");
  let headers = null;
  for (const line of lines) {
    if (!/^\|/.test(line)) {
      headers = null;
      continue;
    }
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    if (!headers) {
      headers = cells.map((h) =>
        h.replace(/\*\*/g, "").trim().toLowerCase(),
      );
      continue;
    }
    /** @type {Record<string, string>} */
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cells[i] || "").replace(/\*\*/g, "").trim();
    });
    rows.push(row);
  }
  return rows;
}

/**
 * Minimal YAML list parser for examples fences.
 * @param {string} yaml
 * @returns {Record<string, string>[]}
 */
function parseSimpleYamlList(yaml) {
  /** @type {Record<string, string>[]} */
  const items = [];
  /** @type {Record<string, string> | null} */
  let current = null;
  for (const line of yaml.split("\n")) {
    if (/^\s*-\s+id:/.test(line) || /^\s*-\s+\w+:/.test(line)) {
      if (current) items.push(current);
      current = {};
      const rest = line.replace(/^\s*-\s+/, "");
      const m = rest.match(/^(\w+):\s*(.*)$/);
      if (m && current) current[m[1]] = stripQuotes(m[2]);
      continue;
    }
    const m = line.match(/^\s+(\w+):\s*(.*)$/);
    if (m && current) {
      current[m[1]] = stripQuotes(m[2]);
    }
  }
  if (current) items.push(current);
  return items;
}

/**
 * @param {string} md
 * @param {string} heading
 */
function yamlFenceAfterHeading(md, heading) {
  const sec = sectionAfter(md, heading);
  const m = sec.match(/```yaml\s*([\s\S]*?)```/i);
  return m ? m[1] : "";
}

/**
 * @param {string} md
 */
function parseTemplates(md) {
  /** @type {Record<string, unknown>} */
  const templates = {};
  const re = /^##\s+(\w+)\s*$/gm;
  let match;
  const indices = [];
  while ((match = re.exec(md)) !== null) {
    indices.push({ name: match[1], index: match.index + match[0].length });
  }
  for (let i = 0; i < indices.length; i++) {
    const { name, index } = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1].index : md.length;
    const block = md.slice(index, end);
    const fence = block.match(/```\s*([\s\S]*?)```/);
    if (!fence) continue;
    const body = fence[1];
    const structure = body.match(/structure:\s*"([^"]+)"/);
    const maxChars = body.match(/max_chars:\s*(\d+)/);
    const maxSentences = body.match(/max_sentences:\s*(\d+)/);
    /** @type {Record<string, string>} */
    const example = {};
    const exBlock = body.match(/example:\s*([\s\S]*)/);
    if (exBlock) {
      for (const line of exBlock[1].split("\n")) {
        const em = line.match(/^\s+(\w+):\s*"(.*)"\s*$/);
        if (em) example[em[1]] = em[2];
      }
    }
    /** @type {Record<string, unknown>} */
    const constraints = {};
    if (maxChars) constraints.max_chars = Number(maxChars[1]);
    if (maxSentences) constraints.max_sentences = Number(maxSentences[1]);
    templates[name] = {
      structure: structure ? structure[1] : "",
      constraints,
      example,
    };
  }
  return templates;
}

/**
 * @param {string} rulesMd
 */
function parseRules(rulesMd) {
  const vocab = sectionAfter(rulesMd, "## Vocabulary");
  const blocklistLine = vocab.match(/\*\*Blocklist:\*\*\s*(.+)/i);
  const preferLine = vocab.match(/\*\*Prefer:\*\*\s*(.+)/i);
  const blocklist = blocklistLine
    ? blocklistLine[1]
        .split(",")
        .map((s) => s.replace(/\(.*?\)/g, "").trim())
        .filter(Boolean)
    : [];
  const prefer = preferLine
    ? preferLine[1].split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const color = sectionAfter(rulesMd, "## Color");
  const delta = color.match(/ΔE[^:]*:\s*`?([\d.]+)`?/i);
  const contrast = color.match(/contrast[^:]*:\s*`?([\d.]+)`?/i);

  return {
    vocabulary: {
      blocklist,
      allowlist_preferred: prefer,
    },
    color_rules: {
      compliance_delta_e_threshold: delta ? Number(delta[1]) : 5,
      min_contrast_body_text: contrast ? Number(contrast[1]) : 4.5,
      palette: "grayscale_only",
    },
    conflict_resolution: {
      precedence: [
        "rules.md",
        "active_variant",
        "brand.md_guardrails_voice",
        "brand.json",
        "personality",
      ],
    },
  };
}

function main() {
  if (!fs.existsSync(BRAND_MD)) {
    console.error(`Missing ${BRAND_MD}`);
    process.exit(1);
  }

  const brandRaw = fs.readFileSync(BRAND_MD, "utf8");
  const examplesRaw = fs.existsSync(EXAMPLES_MD)
    ? fs.readFileSync(EXAMPLES_MD, "utf8")
    : "";
  const rulesRaw = fs.existsSync(RULES_MD)
    ? fs.readFileSync(RULES_MD, "utf8")
    : "";
  const templatesRaw = fs.existsSync(TEMPLATES_MD)
    ? fs.readFileSync(TEMPLATES_MD, "utf8")
    : "";

  const { frontmatter, body } = parseFrontmatter(brandRaw);
  const name = frontmatter.name || "Brand";
  const tagline = frontmatter.tagline || "";
  const version = frontmatter.version || "0.1.0";

  const strategy = sectionAfter(body, "## Strategy");
  const voiceSec = sectionAfter(body, "## Voice");
  const visual = sectionAfter(body, "## Visual");
  const expressions = sectionAfter(body, "## Expressions");
  const agentSec = sectionAfter(body, "## Agent");

  const overview = subsection(strategy, "### Overview");
  const positioning = subsection(strategy, "### Positioning");
  const audienceSecRaw = subsection(strategy, "### Audience");
  const audienceSec = (() => {
    const nextH3 = audienceSecRaw.search(/^###\s/m);
    return nextH3 === -1 ? audienceSecRaw : audienceSecRaw.slice(0, nextH3).trim();
  })();
  const personality = subsection(strategy, "### Personality");
  const personalityLead = (() => {
    const nextH4 = personality.search(/^####\s/m);
    return nextH4 === -1 ? personality : personality.slice(0, nextH4).trim();
  })();
  const promise = subsection(strategy, "### Promise");
  const pillarsSec = subsection(strategy, "### Message Pillars");
  const guardrails = subsection(strategy, "### Guardrails");

  const L = (sec) => extractLabeled(sec);
  const o = L(overview);
  const p = L(positioning);
  const audienceL = L(audienceSec);
  const per = L(personality);
  const pillarsL = L(pillarsSec);
  const pr = L(promise);
  const g = L(guardrails);

  const personalityTraitRows = parseTables(personalityLead).filter(
    (r) => r.trait || r.description,
  );

  const audienceIntro =
    audienceL.get("audience intro") ||
    p.get("audience") ||
    "";
  const audienceGroupRows = parseTables(audienceSec).filter(
    (r) => r.segments || r.group || r.wants || r.needs,
  );
  const audienceGroups =
    audienceGroupRows.length > 0
      ? audienceGroupRows.map((r) => ({
          segments: splitList(r.segments || r.group || ""),
          wants: (r.wants || "").trim(),
          needs: (r.needs || "").trim(),
        }))
      : [
          p.get("audience primary")
            ? {
                segments: splitList(p.get("audience primary") || ""),
                wants: "",
                needs: "",
              }
            : null,
          p.get("audience secondary")
            ? {
                segments: splitList(p.get("audience secondary") || ""),
                wants: "",
                needs: "",
              }
            : null,
        ].filter(Boolean);
  const vId = L(subsection(voiceSec, "### Identity"));
  const identitySec = subsection(voiceSec, "### Identity");
  const voiceSpectrum = parseVoiceSpectrum(identitySec);
  const principlesSec = subsection(voiceSec, "### Principles");
  const principlesL = L(principlesSec);
  const principlesIntro = principlesL.get("principles intro") || "";
  const principleRows = parseTables(principlesSec).filter(
    (r) => r.principle || r.title,
  );
  const principles = {
    intro: principlesIntro,
    items: principleRows.map((r) => ({
      title: (r.principle || r.title || "").trim(),
      body: (r.description || r.body || "").trim(),
      do: (r.do || "").trim(),
      dont: (r.dont || r["don't"] || r["don’t"] || "").trim(),
    })),
  };
  const taglineSec = subsection(voiceSec, "### Tagline & Slogans");
  const taglineL = L(taglineSec);
  const voiceTagline = {
    intro: taglineL.get("tagline intro") || "",
    statement: tagline,
  };
  const storySec = subsection(voiceSec, "### Story");
  const storyL = L(storySec);
  const voiceStory = {
    intro: storyL.get("story intro") || "",
    long: storyL.get("story long") || "",
    medium: storyL.get("story medium") || "",
    short: storyL.get("story short") || "",
  };
  const vRules = L(subsection(voiceSec, "### Tonal Rules"));
  const visColors = L(subsection(visual, "### Colors"));
  const visType = L(subsection(visual, "### Typography"));
  const visImg = L(
    subsection(visual, "### Photography / Imagery") ||
      subsection(visual, "### Imagery"),
  );
  const visLogo = L(subsection(visual, "### Logo / Wordmark"));
  const exprL = L(expressions);
  const agentL = L(agentSec);
  const strategyL = L(strategy);
  const voiceTopL = L(voiceSec);
  const visualTopL = L(visual);

  const logoDonts = splitList(visLogo.get("logo donts") || "");
  const actStrategy =
    strategyL.get("act label") || o.get("act label") || "Strategy";
  const actVoice = voiceTopL.get("act label") || "Language";
  const actVisual = visualTopL.get("act label") || "Visual";
  const actExpressions = exprL.get("act label") || "Applications";

  const pillarRows = parseTables(pillarsSec);
  const tonalRulesSec = subsection(voiceSec, "### Tonal Rules");
  const andYetChunk =
    tonalRulesSec.split(/\*\*And \/ yet pairs\*\*/i)[1]?.split(/\*\*Rules\*\*/i)[0] ||
    "";
  const weSayChunk =
    tonalRulesSec.split(/\*\*Identity boundaries\.\*\*/i)[1] ||
    tonalRulesSec.split(/\| We Say \|/i)[0] ||
    "";
  const weSayTableMatch = tonalRulesSec.match(
    /\| We Say \| We Never Say \|[\s\S]*?(?=\n###|\n##|$)/i,
  );
  const andYetL = extractLabeled(andYetChunk);
  const andYetRows = parseTables(andYetChunk).filter(
    (r) => r.lean && (r["and yet"] || r.andyet),
  );
  const voiceAndYet = {
    intro: andYetL.get("and yet intro") || "",
    pairs: andYetRows.map((r) => {
      const bridgeRaw = (r.bridge || "yet").trim().toLowerCase();
      const bridge = bridgeRaw === "and" ? "and" : "yet";
      const phrase = (r.phrase || "").trim();
      return {
        lean: r.lean,
        yet: r["and yet"] || r.andyet || "",
        bridge,
        ...(phrase ? { phrase } : {}),
      };
    }),
  };
  const weSayRows = parseTables(weSayTableMatch ? weSayTableMatch[0] : weSayChunk).filter(
    (r) => r["we say"] || r.wesay,
  );
  const contextSec = subsection(voiceSec, "### Tone by context");
  const contextL = L(contextSec);
  const contextRows = parseTables(contextSec);
  const voiceContexts = {
    intro: contextL.get("context intro") || "",
    items: contextRows.map((r) => ({
      context: r.context || "",
      guidance: (r.guidance || "").replace(/\.$/, "") + ".",
      example: (r.example || "").replace(/^[“"]|[”"]$/g, ""),
    })),
  };
  const expressionRows = parseTables(expressions).filter((r) => r.channel);

  const headlinesSec = subsection(voiceSec, "### Headlines");
  const headlinesL = L(headlinesSec);
  const headlineItems = headlinesSec
    .split("\n")
    .filter((l) => /^-\s+/.test(l))
    .map((l) => l.replace(/^-\s+/, "").trim())
    .filter(Boolean);
  const voiceHeadlines = {
    intro: headlinesL.get("headlines intro") || "",
    items: headlineItems,
  };
  const ctaSec =
    subsection(voiceSec, "### Calls to action") ||
    subsection(voiceSec, "### Calls to Action");
  const ctaL = L(ctaSec);
  const ctaRows = parseTables(ctaSec).filter((r) => r.do || r.dont || r["don't"] || r["don’t"]);
  const voiceCta = {
    intro: ctaL.get("cta intro") || ctaL.get("calls to action intro") || "",
    do: ctaRows.map((r) => (r.do || "").trim()).filter(Boolean),
    dont: ctaRows
      .map((r) => (r.dont || r["don't"] || r["don’t"] || "").trim())
      .filter(Boolean),
  };
  const phrasesSec = subsection(voiceSec, "### Phrases");
  const phrases = phrasesSec
    .split("\n")
    .filter((l) => /^-\s+/.test(l))
    .map((l) => l.replace(/^-\s+/, "").trim());

  const traitScores = {};
  const scoresRaw = per.get("trait scores") || "";
  for (const part of scoresRaw.split(/\s*·\s*/)) {
    const m = part.match(/(\w+)\s*:\s*(\d+)/);
    if (m) traitScores[m[1]] = Number(m[2]);
  }

  const copyExamples = parseSimpleYamlList(
    yamlFenceAfterHeading(examplesRaw, "## Copy examples"),
  );
  const colorExamples = parseSimpleYamlList(
    yamlFenceAfterHeading(examplesRaw, "## Color examples"),
  );
  const imageryExamples = parseSimpleYamlList(
    yamlFenceAfterHeading(examplesRaw, "## Imagery examples"),
  );

  const rules = parseRules(rulesRaw);
  const templates = parseTemplates(templatesRaw);

  const archetypeName = per.get("archetype") || "Archetype";
  const weAre = splitList(per.get("we are") || "");
  const weAreNot = splitList(per.get("we are not") || "").map((s) =>
    s.replace(/^Performatively\s+[“"]?premium[”"]?/i, "Performatively premium"),
  );
  const attributes = splitList(per.get("attributes") || "");
  const cannotBe = splitList(g.get("the brand cannot be") || "");

  let archetypeProfiles = parseArchetypeProfiles(personality);
  if (archetypeProfiles.length === 0 && per.get("archetype")) {
    // Legacy flat fields → single primary profile
    archetypeProfiles = [
      {
        role: "primary",
        name: archetypeName.replace(/^The\s+/i, ""),
        wheel: archetypeName.replace(/^The\s+/i, "").split(/\s+[—–-]/)[0].trim(),
        motivations: "",
        personality: "",
        quote: "",
        drive: splitList(per.get("archetype drive") || ""),
        fears: [],
        strategy: [],
        voice: splitList(per.get("archetype voice") || ""),
        seeks: per.get("archetype seeks") || "",
        mottos: splitList(per.get("archetype motto") || ""),
        audienceFeels: [],
        brands: [],
        atBest: splitList(per.get("archetype at best") || ""),
        atWorst: splitList(per.get("archetype at worst") || ""),
        characters: [],
        types: [],
        typesHighlighted: [],
      },
    ];
  }

  const primaryProfile =
    archetypeProfiles.find((p) => p.role === "primary") ||
    archetypeProfiles[0] ||
    null;

  const contextKey = (c) =>
    c
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/product_ui|product ui/i, "product_ui");

  const guide = {
    name,
    tagline,
    strategy: {
      actLabel: actStrategy,
      overview: {
        what: o.get("what") || "",
        problem: o.get("problem") || "",
        current: o.get("current") || "",
        opportunity: o.get("opportunity") || "",
        solution: o.get("solution") || "",
      },
      promise: {
        mission: pr.get("mission") || "",
        purpose: pr.get("purpose") || "",
        position: pr.get("position") || "",
        promise: pr.get("promise") || "",
      },
      audience: {
        intro: audienceIntro,
        groups: audienceGroups,
      },
      positioning: {
        intro: p.get("positioning intro") || "",
        statement: pr.get("position") || p.get("category") || "",
      },
      vision: {
        intro: o.get("vision intro") || "",
        statement: o.get("long-term ambition") || "",
      },
      mission: {
        intro: pr.get("mission intro") || "",
        statement: pr.get("mission") || "",
      },
      values: {
        intro: pillarsL.get("values intro") || "",
        items: pillarRows.map((r) => {
          const summary = (r.summary || "").trim();
          const summaryLine = summary
            ? summary.endsWith(".")
              ? summary
              : `${summary}.`
            : "";
          const trust = (r["trust message"] || r.trust || "")
            .replace(/^[“"]|[”"]$/g, "")
            .trim();
          return {
            title: r.pillar || "",
            body: [summaryLine, trust].filter(Boolean).join(" "),
          };
        }),
      },
      pillars: {
        intro: pillarsL.get("pillars intro") || "",
        items: pillarRows.map((r) => {
          const summary = (r.summary || "").trim();
          return {
            name: r.pillar || "",
            summary: summary.endsWith(".") ? summary : `${summary}.`,
            emotional: r["emotional driver"] || r.emotional || "",
            functional: r["functional value"] || r.functional || "",
            trust: (r["trust message"] || r.trust || "")
              .replace(/^[“"]|[”"]$/g, "")
              .trim(),
          };
        }),
      },
      archetype: {
        name: primaryProfile
          ? primaryProfile.name.startsWith("The ")
            ? primaryProfile.name
            : `The ${primaryProfile.name.split(/\s*\/\s*/)[0].trim()}`
          : archetypeName.startsWith("The ")
            ? archetypeName
            : `The ${archetypeName}`,
        drive:
          (primaryProfile?.drive || []).join(" · ") ||
          per.get("archetype drive") ||
          "",
        seeks: primaryProfile?.seeks || per.get("archetype seeks") || "",
        atBest:
          primaryProfile?.atBest?.length > 0
            ? primaryProfile.atBest
            : splitList(per.get("archetype at best") || ""),
        atWorst:
          primaryProfile?.atWorst?.length > 0
            ? primaryProfile.atWorst
            : splitList(per.get("archetype at worst") || ""),
        motto:
          (primaryProfile?.mottos || [])[0] ||
          per.get("archetype motto") ||
          "",
        voice:
          primaryProfile?.voice?.length > 0
            ? primaryProfile.voice
            : splitList(per.get("archetype voice") || ""),
      },
      archetypeProfiles,
      personality: {
        intro: per.get("personality intro") || "",
        items:
          personalityTraitRows.length > 0
            ? personalityTraitRows.map((r) => ({
                title: (r.trait || "").trim(),
                body: (r.description || "").trim(),
              }))
            : attributes.map((trait) => ({
                title: trait,
                body: "",
              })),
        traits: attributes,
        weAre,
        weAreNot: splitList(per.get("we are not") || ""),
      },
      guardrails: {
        intro: g.get("guardrails intro") || "",
        tone: g.get("tone summary") || "",
        cannotBe,
        litmus: g.get("litmus test") || "",
      },
    },
    voice: {
      actLabel: actVoice,
      identity: vId.get("identity") || "",
      essence: vId.get("essence") || "",
      principles,
      tagline: voiceTagline,
      story: voiceStory,
      headlines: voiceHeadlines,
      cta: voiceCta,
      spectrum: voiceSpectrum,
      phrases,
      andYet: voiceAndYet,
      weSay: weSayRows.map((r) => ({
        say: (r["we say"] || r.wesay || "").replace(/^[“"]|[”"]$/g, ""),
        never: (r["we never say"] || r.weneversay || "").replace(
          /^[“"]|[”"]$/g,
          "",
        ),
      })),
      contexts: voiceContexts,
    },
    visual: {
      actLabel: actVisual,
      colors: {
        // Swatches rebuilt from brand.md Design system by compile-design.mjs
        intro: visColors.get("colors intro") || "",
        brand: [],
        secondary: [],
        interface: [],
      },
      typography: {
        family: visType.get("type family") || "Geist",
        note: visType.get("type note") || "",
        faces: {
          primary: visType.get("type primary") || "",
          fallback: visType.get("type fallback") || "",
        },
        specimens: [
          {
            label: "Display",
            sample: visType.get("type specimen display") || name,
            size: "display",
          },
          {
            label: "Section",
            sample: visType.get("type specimen section") || "Section",
            size: "xl",
          },
          {
            label: "Lead",
            sample: visType.get("type specimen lead") || tagline,
            size: "lg",
          },
          {
            label: "Body",
            sample:
              visType.get("type specimen body") ||
              pr.get("synthesizing phrase") ||
              tagline,
            size: "base",
          },
        ],
      },
      logo: {
        description: visLogo.get("logo description") || "",
        donts: logoDonts,
      },
      imagery: {
        tone: visImg.get("imagery tone") || "",
        subjects: visImg.get("imagery subjects") || "",
        settings: visImg.get("imagery settings") || "",
        avoid: visImg.get("imagery avoid") || "",
      },
    },
    expressions: {
      actLabel: actExpressions,
      items: expressionRows.map((r) => ({
        channel: r.channel || "",
        title: r.title || "",
        copy: r.copy || "",
        sample: r.sample || "",
      })),
    },
  };

  const antiPersonality = splitList(per.get("we are not") || "").map((s) =>
    s
      .replace(/[“”"]/g, "")
      .replace(/^Performatively\s+premium\.?$/i, "Performatively premium"),
  );

  const compiledAt = new Date().toISOString();
  const day = compiledAt.slice(0, 10);

  const brandJson = {
    _hash: "",
    _spec_version: SPEC_VERSION,
    _compiled: compiledAt,
    _last_material_change: day,
    _sanitized: true,
    meta: {
      name,
      version: String(version).includes(".") ? String(version) : "0.1.0",
      files: [
        {
          file: "brand",
          version: "0.1.0",
          status: "draft",
          priority: 1,
          summary:
            "Strategy / Voice / Visual constitution plus Design system tokens.",
          relates_to: ["examples", "rules"],
          compliance: true,
          compliance_weight: "high",
          visibility: "public",
          cache_ttl: "30d",
        },
      ],
    },
    identity: {
      mission: pr.get("mission") || "",
      vision: o.get("long-term ambition") || "",
      values: pillarRows.map((r) => r.pillar).filter(Boolean),
      origin: o.get("origin") || "",
    },
    positioning: {
      audience: p.get("audience") || "",
      differentiation: p.get("differentiation") || "",
      only_we: [p.get("only we") || ""].filter(Boolean),
    },
    personality: {
      archetypes: (
        archetypeProfiles.length > 0
          ? archetypeProfiles.map(
              (p) =>
                p.wheel ||
                p.name.replace(/^The\s+/i, "").split(/\s*\/\s*/)[0].trim(),
            )
          : [
              archetypeName
                .replace(/^The\s+/i, "")
                .split(/\s+[—–-]/)[0]
                .trim(),
            ]
      ).filter(Boolean),
      traits:
        Object.keys(traitScores).length > 0
          ? traitScores
          : { direct: 5, warm: 3, playful: 1 },
      anti_personality: antiPersonality,
    },
    voice: {
      default: {
        pillars: splitList(vRules.get("voice pillars") || "Direct · Calm · Specific"),
        do: splitList(vRules.get("do") || ""),
        dont: splitList(vRules.get("don't") || vRules.get("don’t") || ""),
        vocabulary: {
          use: splitList(vRules.get("vocabulary use") || ""),
          never: splitList(vRules.get("vocabulary never") || ""),
        },
        phrases,
        we_say: weSayRows.map((r) =>
          (r["we say"] || "").replace(/^[“"]|[”"]$/g, ""),
        ),
        we_never_say: weSayRows.map((r) =>
          (r["we never say"] || "").replace(/^[“"]|[”"]$/g, ""),
        ),
      },
    },
    tone: {
      default: {
        contexts: contextRows.map((r) => ({
          context: contextKey(r.context || "other"),
          guidance: (r.guidance || "").replace(/\.$/, "") + ".",
          example: (r.example || "")
            .replace(/^[“"]|[”"]$/g, "")
            .replace(/\s+not\s+.*/i, "")
            .trim(),
        })),
      },
    },
    messaging: {
      default: {
        core: pr.get("synthesizing phrase") || "",
        pillars: pillarRows.map((r) => r.pillar).filter(Boolean),
        taglines: [tagline].filter(Boolean),
        boilerplate: {
          short: pr.get("boilerplate short") || "",
          long: pr.get("boilerplate long") || "",
        },
      },
    },
    color: {
      // tokens + palettes rebuilt from brand.md Design system by compile-design.mjs
      tokens: {},
      palettes: {
        primary: [],
        neutral: [],
        semantic: { success: "", error: "" },
      },
      compliance_threshold_delta_e: rules.color_rules.compliance_delta_e_threshold,
    },
    typography: {
      tokens: {
        "font-family-primary": {
          value: visType.get("type family") || "Geist",
          type: "fontFamily",
        },
        "font-size-base": { value: "16px", type: "fontSize" },
        "font-size-display": { value: "48px", type: "fontSize" },
      },
      scale: {
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "28px",
        display: "48px",
      },
      hierarchy: {
        display: "Brand name, cover",
        xl: "Section titles",
        lg: "Subsection titles",
        base: "Body",
        sm: "Captions",
      },
      accessibility: {
        min_body_size: "16px",
        min_line_height: 1.5,
        min_contrast_ratio: 4.5,
      },
    },
    imagery: {
      style: visImg.get("imagery style") || "",
      mood: visImg.get("imagery mood") || "",
      prompts: {
        product_photography: visImg.get("imagery prompt product") || "",
        lifestyle: visImg.get("imagery prompt lifestyle") || "",
      },
      negative_prompts: splitList(visImg.get("imagery negative") || ""),
      references: [],
    },
    logo: {
      wordmark: name,
      clearspace: visLogo.get("logo clearspace") || "",
      donts: logoDonts,
    },
    audience: {
      default: {
        primary: p.get("audience primary") || p.get("audience") || "",
        secondary: p.get("audience secondary") || "",
        intro: audienceIntro,
        groups: audienceGroups,
      },
    },
    channels: {
      web: exprL.get("channel web") || "",
      social: exprL.get("channel social") || "",
      print: exprL.get("channel print") || "",
      email: exprL.get("channel email") || "",
    },
    agent: {
      // Shell defaults (not brand-edited). See UPSTREAM.md → agent.md ownership.
      // Brand tone: brand.md → Agent → **System prompt base.**
      compliance_threshold: Number(agentL.get("compliance threshold") || 0.85),
      roles: {
        copywriter: {
          required: [
            "identity",
            "voice",
            "tone",
            "messaging",
            "examples",
            "templates",
          ],
          optional: ["personality", "channels"],
        },
        designer: {
          required: [
            "personality",
            "color",
            "typography",
            "imagery",
            "logo",
            "examples",
          ],
          optional: ["voice"],
        },
        developer: {
          required: ["color", "typography"],
          optional: ["logo"],
        },
      },
      system_prompts: {
        base:
          agentL.get("system prompt base") ||
          `You work on behalf of ${name}. Prefer plain language.`,
      },
      permissions: {
        autonomous: ["fill_template_slots", "run_compliance_check"],
        requires_approval: ["create_new_tagline", "extend_color_palette"],
        never: ["modify_brand_json_silently", "override_compliance_fail"],
      },
      connector_scopes: {
        public: [
          "color.tokens",
          "typography.tokens",
          "messaging.default.boilerplate",
        ],
        cursor: [
          "color.tokens",
          "typography.tokens",
          "voice.default",
          "examples",
        ],
      },
    },
    rules,
    examples: {
      copy: copyExamples.map((e) => ({
        id: e.id,
        type: e.type,
        label: e.label,
        input: e.input,
        reason: e.reason,
      })),
      color: colorExamples.map((e) => ({
        id: e.id,
        label: e.label,
        input: e.input,
        reason: e.reason,
      })),
      imagery: imageryExamples.map((e) => ({
        id: e.id,
        label: e.label,
        input: e.input,
        reason: e.reason,
      })),
    },
    templates,
    guide,
  };

  const withoutHash = { ...brandJson, _hash: "" };
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(withoutHash))
    .digest("hex");
  brandJson._hash = `sha256:${hash}`;

  /** @type {{ path: string, hint: string }[]} */
  const missing = [];
  const need = (ok, pathLabel, hint) => {
    if (!ok) missing.push({ path: pathLabel, hint });
  };

  need(!!name, "frontmatter.name", "Set name in brand.md YAML frontmatter");
  need(!!tagline, "frontmatter.tagline", "Set tagline in brand.md YAML frontmatter");
  need(!!o.get("what"), "Strategy › Overview › **What.**", "Labeled overview field");
  need(!!o.get("problem"), "Strategy › Overview › **Problem.**", "Labeled overview field");
  need(!!o.get("current"), "Strategy › Overview › **Current.**", "Labeled overview field");
  need(!!o.get("opportunity"), "Strategy › Overview › **Opportunity.**", "Labeled overview field");
  need(!!o.get("solution"), "Strategy › Overview › **Solution.**", "Labeled overview field");
  need(!!pr.get("mission"), "Strategy › Promise › **Mission.**", "Labeled promise field");
  need(!!pr.get("purpose"), "Strategy › Promise › **Purpose.**", "Labeled promise field");
  need(!!pr.get("position"), "Strategy › Promise › **Position.**", "Labeled promise field");
  need(!!pr.get("promise"), "Strategy › Promise › **Promise.**", "Labeled promise field");
  need(pillarRows.length > 0, "Strategy › Message Pillars table", "At least one pillar row");
  need(!!per.get("archetype"), "Strategy › Personality › **Archetype.**", "Labeled personality field");
  need(attributes.length > 0, "Strategy › Personality › **Attributes.**", "·-separated list");
  need(weAre.length > 0, "Strategy › Personality › **We are.**", "·-separated list");
  need(
    splitList(per.get("we are not") || "").length > 0,
    "Strategy › Personality › **We are not.**",
    "·-separated list",
  );
  need(!!g.get("tone summary"), "Strategy › Guardrails › **Tone summary.**", "Labeled guardrails field");
  need(!!g.get("litmus test"), "Strategy › Guardrails › **Litmus test.**", "Labeled guardrails field");
  need(!!vId.get("identity"), "Voice › Identity › **Identity.**", "Labeled voice field");
  need(!!vId.get("essence"), "Voice › Identity › **Essence.**", "Labeled voice field");
  need(
    principles.items.length > 0,
    "Voice › Principles table",
    "Principle | Description | Do | Don't",
  );
  need(!!voiceStory.long, "Voice › Story › **Story long.**", "Labeled story field");
  need(!!voiceStory.short, "Voice › Story › **Story short.**", "Labeled story field");
  need(
    voiceHeadlines.items.length > 0,
    "Voice › Headlines",
    "Bullet list of headlines",
  );
  need(
    voiceCta.do.length > 0 || voiceCta.dont.length > 0,
    "Voice › Calls to action table",
    "Do | Don't",
  );
  need(phrases.length > 0, "Voice › Phrases", "Bullet list of phrases");
  need(andYetRows.length > 0, "Voice › And / yet table", "Lean | And yet rows");
  need(weSayRows.length > 0, "Voice › We Say / We Never Say table", "Table rows");
  need(contextRows.length > 0, "Voice › Tone by context table", "Context | Guidance | Example");
  need(!!visColors.get("colors intro"), "Visual › Colors › **Colors intro.**", "Labeled colors field");
  need(!!visType.get("type note"), "Visual › Typography › **Type note.**", "Labeled type field");
  need(!!visLogo.get("logo description"), "Visual › Logo › **Logo description.**", "Labeled logo field");
  need(logoDonts.length > 0, "Visual › Logo › **Logo donts.**", "·-separated list");
  need(expressionRows.length > 0, "Expressions table", "Channel | Title | Copy | Sample");
  need(!!strategyL.get("act label"), "Strategy › **Act label.**", "Guide section label");
  need(!!voiceTopL.get("act label"), "Voice › **Act label.**", "Guide section label");
  need(!!visualTopL.get("act label"), "Visual › **Act label.**", "Guide section label");
  need(!!exprL.get("act label"), "Expressions › **Act label.**", "Guide section label");

  if (missing.length > 0) {
    console.error("compile-brand: missing required brand.md labels/fields:\n");
    for (const m of missing) {
      console.error(`  - ${m.path}`);
      console.error(`      ${m.hint}`);
    }
    console.error(
      `\nFix brand.md, then re-run npm run compile. See UPSTREAM.md for the edit→compile contract.`,
    );
    process.exit(1);
  }

  fs.writeFileSync(BRAND_JSON, `${JSON.stringify(brandJson, null, 2)}\n`, "utf8");
  console.log(`Wrote ${path.relative(root, BRAND_JSON)} (_spec_version ${SPEC_VERSION})`);
  fs.mkdirSync(path.dirname(PUBLIC_BRAND_TXT), { recursive: true });
  fs.copyFileSync(BRAND_MD, PUBLIC_BRAND_TXT);
  console.log(`Copied brand.md → ${path.relative(root, PUBLIC_BRAND_TXT)}`);
}

main();
