import {
  GameBattleTactic,
  GameBattleTrait,
  PlayerArmy,
  PlayerArmyUnit,
} from '@/firestore/types';

export interface Unit {
  flavor: string;
  spellCastLimit?: number;
  unbindLimit?: number;
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
export type FirestoreGame = {
  id: string;
  points: number;
  battlepack: Battlepack;
  types: string;
  playerOne: { army: PlayerArmy; user: string };
  playerTwo: { army: PlayerArmy; user: string };
};

export type Game = {
  id: string;
  battleRound: number;
  phase: number;
  priority: 1 | 2 | null;
  battleTacticPointAmount: number;
  grandStrategyPointAmount: number;
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

export interface UniversalEnhancement {
  name: string;
  description: string;
  flavor: string;
}

export type EnhancementKeys =
  | 'artefacts'
  | 'commandTraits'
  | 'prayers'
  | 'spellLores'
  | 'triumphs';

export type Phase = {
  name: string;
  order: number;
  commandAbilities: { name: string; description: string }[];
  heroicActions: { name: string; description: string }[];
  beginnerRules: string[];
};

export type BattleTrait = {
  name: string;
  description: string;
  flavor: string;
  applicableSubfactions: string[];
};

export type Player = {
  commandPoints: number;
  units: PlayerArmyUnit[];
  battleTactics: GameBattleTactic[];
  battleTraits: GameBattleTrait[];
  grandStrategy: { name: string; description: string } | null;
  userId: string;
};
