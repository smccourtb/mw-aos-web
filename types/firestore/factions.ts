import { Unit, UniversalEnhancement } from '@/types/firestore/firestore';

export type Faction = {
  ref: string;
  name: string;
  units: Unit[];
  grandStrategies: { name: string; description: string; source: string[] }[];
  battleTactics: {
    name: string;
    description: string;
    applicableSubfactions: string[];
    source: string[];
  }[];
  battleTraits: {
    name: string;
    description: string;
    flavor: string;
    applicableSubfactions: string[];
  }[];
  heroicActions: {
    name: string;
    description: string;
    applicableKeywords: string[];
    applicableSubfactions: string[];
  }[];
  commandTraits: FactionEnhancement[];

  artefacts: FactionEnhancement[];
  spellLores: FactionEnhancement[];
  prayers: FactionEnhancement[];
  triumphs: FactionEnhancement[];
  monstrousRampages: {
    name: string;
    description: string;
    applicableKeywords: string[];
    applicableSubfactions: string[];
  }[];
  subfactions: { names: string[]; flavorName: string };
  armyTypes: { name: string; subFactions: string[] }[];
  battalions: { name: string }[];
};

export interface FactionEnhancement extends UniversalEnhancement {
  applicableKeywords?: string[];
  applicableSubfaction: string[];
  includeUnique?: boolean;
}
