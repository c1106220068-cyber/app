
export interface Skill {
  name: string;
  level: number; // 0-100
  type: 'rational' | 'emotional';
}

export interface Resource {
  id: string;
  type: 'video' | 'book' | 'interview';
  title: string;
  provider: string; // e.g., "Bilibili", "Douban"
  url: string;
  price?: string;
  meta?: string; // e.g., "Library available", "24h trending"
}

export interface TraitRadar {
  visual: number;    // 敏锐度 (Visual/Ideas)
  logic: number;     // 逻辑力 (Logic/Data)
  empathy: number;   // 共情力 (Empathy/People)
  grit: number;      // 抗压力 (Grit/Things)
  ambition: number;  // 企图心 (Ambition/Leadership)
  creativity: number;// 创造力 (Creativity/Ideas)
}

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  salaryValue: number; // For visualization size
  matchScore: number; // 0-100
  requiredTraits: TraitRadar; // New 6-dim matching
  tags: string[];
  rawDescription: string;
  decodedDescription: string;
  pressurePoint: string;
  interviewFocus: string;
  resources: Resource[];
  platformIcon: 'boss' | 'linkedin' | 'job51';
  platformStats: string;
}

export interface CareerGenome {
  primary: string;   // e.g. "Builder"
  secondary: string; // e.g. "Harmonizer"
  hidden: string;    // e.g. "Venturer"
}

export interface UserProfile {
  name: string;
  title: string;
  level: number;
  traits: TraitRadar;
  genome?: CareerGenome;
  hiddenPotential: string[];
  activeMission: string;
}

// NEW: Life Metaphor Scenario Question
export interface ScenarioOption {
  id: string;
  text: string;
  description?: string; // Subtext for the option
  traits: Partial<TraitRadar>;
  keywords: string[]; // Keywords to float in the Job Cloud
}

export interface ScenarioQuestion {
  id: number;
  category: 'O-P-D-I' | 'Personality' | 'Domain';
  question: string;
  context: string; // The "Life Scenario" description
  options: ScenarioOption[];
}

export interface ProjectiveQuestion {
  // Deprecated but kept for type compatibility if needed, 
  // though we are switching to ScenarioQuestion
  id: number;
  question: string;
  abstractVisual: string;
  optionA: { text: string; traits: Partial<TraitRadar> };
  optionB: { text: string; traits: Partial<TraitRadar> };
}
