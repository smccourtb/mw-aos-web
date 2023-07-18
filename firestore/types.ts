export type Faction = {
  ref: string;
  name: string;
  units: Unit[];
  grandStrategies: { name: string; description: string }[];
  battleTactics: { name: string; description: string }[];
  battalions: { name: string }[];
  type: {
    name: string;
    subFactions: {
      name: string;
      ability: { name: string; description: string };
    }[];
    battleTraits: { name: string; description: string }[];
    enhancements: {
      triumphs: { name: string; description: string }[];
      prayer: { name: string; description: string }[];
      commandTraits: {
        name: string;
        description: string;
        applicableKeywords: string[];
      }[];
      artefacts: {
        name: string;
        description: string;
        applicableKeywords: string[];
      }[];
      spellLores: {
        name: string;
        description: string;
        applicableKeywords: string[];
        includeUnique: boolean;
      }[];
    };
  }[];
  monstrousRampages?: { name: string; description: string }[];
};

export interface Unit {
  flavor: string;
  spells:
    | {
        name: string;
        description: string;
        flavor: string;
        range: number;
        castingValue: number;
      }[]
    | null;
  abilities:
    | {
        name: string;
        description: string;
        phase: string;
        flavor: string;
        type?: string;
      }[]
    | null;
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
  equipOptions?: { id: string; weapons: string[] }[];
  specialModels: {
    name: SpecialUnitNames;
    amount: number;
    effect: {
      modStat: string;
      modAmount: number;
      target: string[];
    };
  }[];
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

  conditionalRole?: {
    condition: SubFactionCondition;
  };
}

type SubFactionCondition = {
  name: string;
  description: string;
};

type ExcludedUnitProperties = 'weapons' | 'equipOptions' | 'specialModels';

export interface PlayerArmyUnit extends Omit<Unit, ExcludedUnitProperties> {
  isGeneral: boolean;
  equippedSpecialModels: SpecialUnitModel[];
  weapons: Omit<UnitWeapon, 'choice'>[];
  enhancements: {
    prayer: ArmyBuilderEnhancement | null;
    commandTraits: ArmyBuilderEnhancement | null;
    artefacts: ArmyBuilderEnhancement | null;
    spellLores: ArmyBuilderEnhancement | null;
  };
}

export type ArmyBuilderEnhancement = {
  name: string;
  description: string;
  applicableKeywords?: string[];
  isUnique?: boolean;
  chosen: boolean;
  source: string;
};

export type PlayerArmy = {
  id: string;
  factionName: FactionName;
  units: PlayerArmyUnit[];
  grandStrategy: { name: string; description: string };
  battleTactics: { name: string; description: string }[];
  battleTraits: { name: string; description: string }[];
};

export type SpecialUnitModel = {
  name: SpecialUnitNames;
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
export type SpecialUnitNames = 'champion' | 'standard bearer' | 'musician';

export type Game = {
  id: string;
  points: number;
  battlepack: Battlepack;
  types: string;
  playerOne: { army: PlayerArmy; user: string };
  playerTwo: { army: PlayerArmy; user: string };
};

export type Battlepack = {
  id: string;
  name: string;
  battleTactics: { name: string; description: string }[];
  grandStrategies: { name: string; description: string }[];
  gsPoints: number;
  btPoints: number;
  battalions: {
    core: boolean;
    warscroll: boolean;
  };
  armyRules: {
    points: number;
    leaders: { min: number; max: number };
    battleline: { min: number; max: number };
    behemoths: { min: number; max: number };
    artillery: { min: number; max: number };
    endlessSpells: { min: number; max: number };
    reinforced: { min: number; max: number };
    understrength: { min: number; max: number };
    allied: { min: number; max: number };
    recommendedTerrainCount: number;
  }[];
};

export type EnhancementKeys =
  | 'commandTraits'
  | 'artefacts'
  | 'spellLores'
  | 'triumphs'
  | 'prayer';

export type Enhancements = {
  [k in EnhancementKeys]: {
    name: string;
    description: string;
  }[];
};

export type Enhancement = {
  name: string;
  description: string;
  applicableKeywords?: string[];
  includeUnique?: boolean;
};

export type Phase = {
  name: string;
  commandAbilities: { name: string; description: string }[];
  heroicActions: { name: string; description: string }[];
  beginnerRules: string[];
};
