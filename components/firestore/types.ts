export type Faction = {
  ref: string;
  name: string;
};

export type Unit = {
  faction: string;
  keywords: string[];
  name: string;
  baseStats: {
    wounds: number;
    move: number;
    save: number;
    bravery: number;
  };
  isUnique: boolean;
  unitSize: number;
  role: RoleName[];
  points: number;
  weapons: UnitWeapon[];
  specialModels: {
    name: string;
    amount: number;
    effect: {
      modStat: string;
      modAmount: number;
      target: string[];
    };
  };
  canFly: boolean;
  isWizard: boolean;
  isSingle: boolean;
  // NOT INCLUDED YET BELOW //
  factionRef: string;
  ref: string;
  baseSize: {
    width: number;
    length: number;
  };
  battalions: { name: string; ref: string }[];

  conditionalRole: {
    condition: string;
    role: string[];
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

export type SpecialUnitModel = {
  name: string;
  amount: number;
  effect: {
    modStat: string;
    modAmount: number;
    target: string[];
  };
};

export type UnitWeapon = {
  name: string;
  type: 'missile' | 'melee';
  stats: {
    [K in WeaponStatName]: {
      value: string;
      damageTable: {
        damageValues: number[];
        moveValues: number[];
      } | null;
    }[];
  };
  choice: boolean;
};

export type WeaponStatName =
  | 'range'
  | 'attacks'
  | 'to hit'
  | 'to wound'
  | 'rend'
  | 'damage';

export type FactionName =
  | 'seraphon'
  | 'skaven'
  | 'gloomspite gitz'
  | 'maggotkin of nurgle'
  | 'nighthaunt'
  | 'blades of khorne'
  | 'sylvaneth'
  | 'stormcast eternals'
  | 'beasts of chaos'
  | 'flesh-eater courts'
  | 'slaves to darkness'
  | 'disciples of tzeentch'
  | 'kharadron overlords'
  | 'cities of sigmar'
  | 'daughters of khaine'
  | 'hedonites of slaanesh'
  | 'idoneth deepkin'
  | 'fyreslayers'
  | 'lumineth realm-lords'
  | 'soulblight gravelords'
  | 'ossiarch bonereapers'
  | 'orruk warclans'
  | 'sons of behemat';

export type RoleName = 'battleline' | 'leader' | 'behemoth' | 'artillery';
