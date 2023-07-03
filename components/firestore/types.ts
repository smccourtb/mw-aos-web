export type FirestoreBaseData = {
  ref: string;
  name: string;
};

export type FirestoreUnit = {
  faction: string;
  factionRef: string;
  ref: string;
  keywords: { name: string; ref: string }[];
  baseSize: { width: number; length: number; measurement: string }[];
  baseStats: {
    wounds: number;
    move: number;
    save: number;
    bravery: number;
  };
  isUnique: boolean;
  battalions: { name: string; ref: string }[];
  unitSize: { min: number; max: number };
  role: string[];
  conditionalRole: {
    condition: string;
    role: string[];
  };
  points: number;
  weapons: {
    name: string;
    type: 'ranged' | 'melee';
    stats: {
      value: number;
      name: string;
      unit: string | null;
      damageTable: [{ name: string; damageValues: number[]; move: number }];
    }[];
    choice: boolean;
  }[];
  specialUnits: {
    name: string;
    maxAmount: number;
    bonus: {
      effect: string;
      value: number;
    };
  };
  abilities: {
    name: string;
    description: string;
    round: number;
    phase: string;
    effect: {
      target: string;
      rolls: string[];
      value: number;
      description: string;
    };
  };
  canFly: boolean;
};
