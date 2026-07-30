import {
  ARCHETYPE_MOTIVES,
  ARCHETYPE_SEGMENTS,
  type ArchetypeId,
} from "@/lib/archetype-wheel";
import type { ArchetypeProfile, ArchetypeRole } from "@/lib/brand-types";

/** Shell-owned baseline copy for exploring the wheel (brand profiles override). */
export type CatalogArchetype = {
  id: ArchetypeId;
  name: string;
  motivations: string;
  personality: string;
  quote: string;
  drive: readonly string[];
  fears: readonly string[];
  strategy: readonly string[];
  voice: readonly string[];
  seeks: string;
  mottos: readonly string[];
  audienceFeels: readonly string[];
  brands: readonly string[];
  atBest: readonly string[];
  atWorst: readonly string[];
  characters: readonly string[];
  types: readonly string[];
};

export const ARCHETYPE_CATALOG: Record<ArchetypeId, CatalogArchetype> = {
  innocent: {
    id: "innocent",
    name: "Innocent",
    motivations: "Explore spirituality",
    personality:
      "The Innocent wants a simple, honest life and trusts that good things are possible. They offer optimism and clarity — and can seem naive when the world refuses to cooperate.",
    quote: "Free to be you and me.",
    drive: ["Safety", "Happiness", "Simplicity", "Optimism", "Purity"],
    fears: ["Punishment", "Corruption", "Doing wrong", "Cynicism"],
    strategy: ["Do the right thing", "Keep it simple", "Offer hope"],
    voice: ["Optimistic", "Honest", "Humble", "Clear"],
    seeks: "Safety",
    mottos: ["Free to be you and me.", "Life can be simple."],
    audienceFeels: ["Safe", "Hopeful", "Clean", "Trusted"],
    brands: ["Dove", "Coca-Cola", "Innocent Drinks"],
    atBest: ["Optimistic", "Honest", "Humble"],
    atWorst: ["Naive", "Boring", "Dependent"],
    characters: ["Forrest Gump", "Dorothy Gale"],
    types: ["Idealist", "Traditionalist", "Dreamer"],
  },
  sage: {
    id: "sage",
    name: "Sage",
    motivations: "Seeking understanding",
    personality:
      "The Sage wants truth that lasts — cutting noise so the useful thing remains. They distrust jargon and theater, and believe restraint is a form of respect.",
    quote: "The truth will set you free.",
    drive: ["Knowledge", "Truth", "Clarity", "Wisdom", "Understanding"],
    fears: ["Ignorance", "Misinformation", "Illusion", "Being duped"],
    strategy: ["Seek truth", "Share insight", "Think deeply"],
    voice: ["Knowledgeable", "Assured", "Guiding", "Direct", "Calm"],
    seeks: "Understanding",
    mottos: ["The truth will set you free.", "Say the useful thing, then stop."],
    audienceFeels: ["Oriented", "Respected", "Clear-headed", "Steady"],
    brands: ["Google", "BBC", "TED", "The Economist"],
    atBest: ["Wise", "Accessible", "Calm", "Grounded", "Trustworthy"],
    atWorst: ["Aloof", "Detached", "Pedantic", "Dismissive"],
    characters: ["Yoda", "Sherlock Holmes", "The careful editor"],
    types: ["Expert", "Mentor", "Investigator", "Editor"],
  },
  explorer: {
    id: "explorer",
    name: "Explorer",
    motivations: "Explore spirituality",
    personality:
      "The Explorer wants autonomy and discovery. They push past the familiar to find what is authentic — and can struggle to settle or commit.",
    quote: "Don't fence me in.",
    drive: ["Freedom", "Discovery", "Authenticity", "Adventure"],
    fears: ["Conformity", "Entrapment", "Inner emptiness", "Boredom"],
    strategy: ["Wander", "Seek new experiences", "Escape the ordinary"],
    voice: ["Restless", "Authentic", "Independent", "Curious"],
    seeks: "Freedom",
    mottos: ["Don't fence me in.", "The journey is the destination."],
    audienceFeels: ["Free", "Curious", "Alive", "Uncommon"],
    brands: ["Patagonia", "Jeep", "The North Face", "Starbucks"],
    atBest: ["Independent", "Ambitious", "Authentic"],
    atWorst: ["Aimless", "Commitment-phobic", "Alienating"],
    characters: ["Indiana Jones", "Moana"],
    types: ["Wanderer", "Individualist", "Pilgrim"],
  },
  hero: {
    id: "hero",
    name: "Hero / Warrior / Champion",
    motivations: "Leave legacy",
    personality:
      "The Hero rises to challenges and proves worth through courage and competence. They inspire mastery — and can tip into arrogance or burnout.",
    quote: "Where there's a will, there's a way.",
    drive: ["Mastery", "Courage", "Achievement", "Strength", "Honor"],
    fears: ["Weakness", "Vulnerability", "Cowardice", "Failure"],
    strategy: ["Be strong", "Prove yourself", "Win through effort"],
    voice: ["Bold", "Determined", "Motivational", "Direct"],
    seeks: "Mastery",
    mottos: ["Where there's a will, there's a way.", "Just do it."],
    audienceFeels: ["Capable", "Inspired", "Proud", "Ready"],
    brands: ["Nike", "FedEx", "US Army", "BMW"],
    atBest: ["Courageous", "Competent", "Determined"],
    atWorst: ["Arrogant", "Ruthless", "Burned out"],
    characters: ["Odysseus", "Wonder Woman", "Beowulf"],
    types: ["Warrior", "Competitor", "Rescuer"],
  },
  magician: {
    id: "magician",
    name: "Magician",
    motivations: "Leave legacy",
    personality:
      "The Magician strives to make dreams come true through transformation. They take people on a journey of change — and can become manipulative when the ends justify any means.",
    quote:
      "Any sufficiently advanced technology is indistinguishable from magic. — Arthur C. Clarke",
    drive: ["Transformation", "Vision", "Belief", "Discovery", "Knowledge"],
    fears: [
      "Unintended consequences",
      "Stagnation",
      "Ignorance",
      "Doubt",
      "Uncertainty",
    ],
    strategy: ["Develop a vision and live by it", "Transformation"],
    voice: ["Informed", "Reassuring", "Mystical", "Visionary"],
    seeks: "Power",
    mottos: ["It can happen.", "Anything is possible."],
    audienceFeels: [
      "I want to experience that",
      "I'm on the cutting edge",
      "Fascinated",
      "Enchanted",
    ],
    brands: ["Disney", "Dyson", "TED", "MAC", "Lululemon"],
    atBest: ["Charismatic", "Healing", "Driven"],
    atWorst: ["Dishonest", "Manipulative", "Distant"],
    characters: ["Gandalf", "Tony Robbins", "Oprah", "Morpheus"],
    types: ["Alchemist", "Scientist", "Engineer", "Innovator"],
  },
  rebel: {
    id: "rebel",
    name: "Outlaw / Revolutionary / Maverick",
    motivations: "Leave legacy",
    personality:
      "The Outlaw wants revolution — partly to change the world for the better, partly for the anarchy involved. They disdain rules that remove freedom of choice. Without a fight, they are lost.",
    quote: "Rules are made to be broken.",
    drive: [
      "Liberation",
      "Change",
      "Righteousness",
      "Revenge",
      "Independence",
    ],
    fears: [
      "Servitude",
      "Conformity",
      "Complacency",
      "Acceptance",
      "Dependence",
    ],
    strategy: ["Denounce status quo", "Disrupt + shock", "Revolution"],
    voice: ["Disruptive", "Rebellious", "Combative", "Candid", "Raw", "Honest"],
    seeks: "Liberation",
    mottos: [
      "Rules are made to be broken.",
      "You don't have to settle for the status quo.",
    ],
    audienceFeels: [
      "Rebellious",
      "Stimulated",
      "Thrilled",
      "Tenacious",
      "Uncommon",
    ],
    brands: [
      "Tesla",
      "Harley-Davidson",
      "Netflix",
      "MTV",
      "Red Bull",
      "Virgin",
    ],
    atBest: ["Sharp", "Free-spirited", "Brave"],
    atWorst: ["Destructive", "Out of control", "Nihilistic"],
    characters: ["Robin Hood", "Jack Sparrow", "Lady Gaga", "Richard Branson"],
    types: ["Activist", "Gambler", "Maverick", "Reformer"],
  },
  lover: {
    id: "lover",
    name: "Lover",
    motivations: "Pursue connection",
    personality:
      "The Lover seeks intimacy, beauty, and deep connection. They make people feel special — and can lose themselves in pleasing others.",
    quote: "You're the only one.",
    drive: ["Intimacy", "Passion", "Beauty", "Sensuality", "Commitment"],
    fears: ["Being alone", "Unloved", "Ordinary", "Rejection"],
    strategy: ["Become more attractive", "Follow desire", "Build closeness"],
    voice: ["Warm", "Sensual", "Appreciative", "Intimate"],
    seeks: "Intimacy",
    mottos: ["You're the only one.", "Love is everything."],
    audienceFeels: ["Desired", "Beautiful", "Close", "Seen"],
    brands: ["Chanel", "Victoria's Secret", "Godiva", "Häagen-Dazs"],
    atBest: ["Passionate", "Appreciative", "Committed"],
    atWorst: ["Jealous", "Indulgent", "People-pleasing"],
    characters: ["Romeo", "Juliet"],
    types: ["Partner", "Friend", "Sensualist"],
  },
  jester: {
    id: "jester",
    name: "Jester",
    motivations: "Pursue connection",
    personality:
      "The Jester lives in the moment and uses humor to connect. They lighten heavy rooms — and can avoid seriousness when it matters.",
    quote: "You only live once.",
    drive: ["Pleasure", "Humor", "Play", "Joy", "Living in the moment"],
    fears: ["Boredom", "Being boring", "Humorlessness"],
    strategy: ["Play", "Make a joke", "Have fun"],
    voice: ["Playful", "Irreverent", "Witty", "Light"],
    seeks: "Enjoyment",
    mottos: ["You only live once.", "If I can't dance, it's not my revolution."],
    audienceFeels: ["Amused", "Light", "Included", "Surprised"],
    brands: ["M&M's", "Old Spice", "Ben & Jerry's", "Dollar Shave Club"],
    atBest: ["Joyful", "Funny", "Present"],
    atWorst: ["Frivolous", "Irresponsible", "Cruel"],
    characters: ["The Fool", "Deadpool"],
    types: ["Entertainer", "Clown", "Prankster"],
  },
  citizen: {
    id: "citizen",
    name: "Citizen / Everyman",
    motivations: "Pursue connection",
    personality:
      "The Citizen wants belonging without pretension. They are solid, empathetic, and real — and can fear standing out.",
    quote: "All people are created equal.",
    drive: ["Belonging", "Equality", "Realism", "Empathy"],
    fears: ["Standing out", "Exclusion", "Looking foolish", "Elitism"],
    strategy: ["Develop ordinary solid virtues", "Be down-to-earth", "Blend in"],
    voice: ["Friendly", "Authentic", "Humble", "Relatable"],
    seeks: "Belonging",
    mottos: ["All people are created equal.", "We're in this together."],
    audienceFeels: ["Included", "Understood", "Normal", "Welcome"],
    brands: ["IKEA", "Target", "Levi's", "Home Depot"],
    atBest: ["Empathetic", "Solid", "Realistic"],
    atWorst: ["Victimized", "Bland", "Cynical"],
    characters: ["The Dude", "Homer Simpson"],
    types: ["Good neighbor", "Realist", "Working stiff"],
  },
  ruler: {
    id: "ruler",
    name: "Ruler",
    motivations: "Provide structure",
    personality:
      "The Ruler creates order and prosperity through leadership and standards. They bring stability — and can become controlling or status-obsessed.",
    quote: "Power isn't everything. It's the only thing.",
    drive: ["Control", "Order", "Status", "Responsibility", "Leadership"],
    fears: ["Chaos", "Being overthrown", "Losing power", "Disorder"],
    strategy: ["Exercise power", "Set standards", "Lead"],
    voice: ["Authoritative", "Composed", "Commanding", "Refined"],
    seeks: "Control",
    mottos: ["Power isn't everything. It's the only thing.", "Order creates freedom."],
    audienceFeels: ["Secure", "Important", "Assured", "Premium"],
    brands: ["Mercedes-Benz", "Rolex", "Microsoft", "American Express"],
    atBest: ["Responsible", "Organized", "Leaderly"],
    atWorst: ["Controlling", "Rigid", "Snobbish"],
    characters: ["King Arthur", "Miranda Priestly"],
    types: ["Boss", "Aristocrat", "Leader"],
  },
  caregiver: {
    id: "caregiver",
    name: "Caregiver",
    motivations: "Provide structure",
    personality:
      "The Caregiver protects and nurtures others. They make people feel safe and supported — and can neglect themselves or enable dependence.",
    quote: "Love your neighbor as yourself.",
    drive: ["Service", "Compassion", "Protection", "Generosity"],
    fears: ["Selfishness", "Ingratitude", "Harm to others", "Helplessness"],
    strategy: ["Help others", "Protect the vulnerable", "Care"],
    voice: ["Warm", "Supportive", "Reassuring", "Patient"],
    seeks: "Service",
    mottos: ["Love your neighbor as yourself.", "We're here for you."],
    audienceFeels: ["Cared for", "Safe", "Supported", "Grateful"],
    brands: ["Johnson & Johnson", "Volvo", "UNICEF", "Campbell's"],
    atBest: ["Compassionate", "Generous", "Protective"],
    atWorst: ["Martyring", "Intrusive", "Enabling"],
    characters: ["Mother Teresa", "Molly Weasley"],
    types: ["Helper", "Parent", "Guardian"],
  },
  creator: {
    id: "creator",
    name: "Creator / Maker",
    motivations: "Seeking innovation",
    personality:
      "The Creator wants to make something new and exceptional that wasn't there before. They express vision through craft — and are often stifled by their own desire for perfection.",
    quote: "If it can be dreamt, it can be done.",
    drive: [
      "Creation",
      "Originality",
      "Self-expression",
      "Vision",
      "Imagination",
    ],
    fears: [
      "Stagnation",
      "Duplication",
      "Familiarity",
      "Disillusion",
      "Indifference",
    ],
    strategy: [
      "Inspire to unlock imagination",
      "Encourage the pursuit of originality",
    ],
    voice: [
      "Inspirational",
      "Daring",
      "Provocative",
      "Descriptive",
      "Visual",
      "Metaphor-rich",
    ],
    seeks: "Innovation",
    mottos: [
      "If it can be dreamt, it can be done.",
      "Make a mark.",
      "Creating tomorrow today.",
    ],
    audienceFeels: [
      "I want to be able to do what they can",
      "Amazed",
      "Inspired",
    ],
    brands: ["LEGO", "Apple", "Adobe", "Pinterest", "Pixar", "Crayola"],
    atBest: ["Expressive", "Imaginative", "Innovative"],
    atWorst: ["Narcissistic", "Perfectionist", "Melodramatic"],
    characters: ["Tony Stark", "Willy Wonka", "Doc Brown"],
    types: ["Visionary", "Storyteller", "Artist", "Entrepreneur"],
  },
};

export function catalogToPreviewProfile(
  entry: CatalogArchetype,
  role: ArchetypeRole | "explore" = "explore",
): ArchetypeProfile & { exploreRole: ArchetypeRole | "explore" } {
  const segment = ARCHETYPE_SEGMENTS.find((s) => s.id === entry.id)!;
  const motive = ARCHETYPE_MOTIVES.find((m) => m.id === segment.motive)!;
  return {
    role: role === "explore" ? "primary" : role,
    exploreRole: role,
    name: entry.name,
    wheel: entry.id,
    motivations: entry.motivations || motive.blurb,
    personality: entry.personality,
    quote: entry.quote,
    drive: entry.drive,
    fears: entry.fears,
    strategy: entry.strategy,
    voice: entry.voice,
    seeks: entry.seeks,
    mottos: entry.mottos,
    audienceFeels: entry.audienceFeels,
    brands: entry.brands,
    atBest: entry.atBest,
    atWorst: entry.atWorst,
    characters: entry.characters,
    types: entry.types,
    typesHighlighted: [],
  };
}

export function mergeBrandOverCatalog(
  id: ArchetypeId,
  brandProfiles: readonly ArchetypeProfile[],
): ArchetypeProfile & { exploreRole: ArchetypeRole | "explore" } {
  const catalog = ARCHETYPE_CATALOG[id];
  const brand = brandProfiles.find((p) => {
    const wheel = p.wheel.trim().toLowerCase();
    return (
      wheel === id ||
      p.name.toLowerCase().includes(catalog.name.split(/\s*\/\s*/)[0]!.toLowerCase())
    );
  });

  if (!brand) return catalogToPreviewProfile(catalog, "explore");

  const base = catalogToPreviewProfile(catalog, brand.role);
  return {
    ...base,
    exploreRole: brand.role,
    name: brand.name || base.name,
    motivations: brand.motivations || base.motivations,
    personality: brand.personality || base.personality,
    quote: brand.quote || base.quote,
    drive: brand.drive.length ? brand.drive : base.drive,
    fears: brand.fears.length ? brand.fears : base.fears,
    strategy: brand.strategy.length ? brand.strategy : base.strategy,
    voice: brand.voice.length ? brand.voice : base.voice,
    seeks: brand.seeks || base.seeks,
    mottos: brand.mottos.length ? brand.mottos : base.mottos,
    audienceFeels: brand.audienceFeels.length
      ? brand.audienceFeels
      : base.audienceFeels,
    brands: brand.brands.length ? brand.brands : base.brands,
    atBest: brand.atBest.length ? brand.atBest : base.atBest,
    atWorst: brand.atWorst.length ? brand.atWorst : base.atWorst,
    characters: brand.characters.length ? brand.characters : base.characters,
    types: brand.types.length ? brand.types : base.types,
    typesHighlighted: brand.typesHighlighted,
  };
}
