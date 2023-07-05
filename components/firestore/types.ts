export type FirestoreBaseData = {
  ref: string;
  name: string;
};

export type FirestoreUnit = {
  faction: string;
  factionRef: string;
  ref: string;
  keywords: { name: string; ref: string }[];
  baseSize: {
    width: number;
    length: number;
  };
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
    type: 'missile' | 'melee';
    stats: {
      value: number | null;
      name: string;
      damageTable: {
        damageValues: number[];
        moveValues: number[];
      } | null;
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
  specialAttack: {
    name: string;
    targetCondition: string; // 'range',
    dicePerCondition: number | null; // account for target unit role ex. 'monsters' keyword gets 5 dice
    rollThreshold: number;
    range: number;
    mortalWounds: boolean;
    damage: number; // 'models in unit', 'roll result'
    canModify: boolean;
  };
};
