import {
  BattleTrait,
  FactionName,
  SpecialUnitModel,
  Unit,
  UnitWeapon,
} from '@/types/firestore/firestore';

type ExcludedUnitProperties = 'weapons' | 'equipOptions' | 'specialModels';

export interface PlayerArmyUnit extends Omit<Unit, ExcludedUnitProperties> {
  unbindAttempts: number;
  isGeneral: boolean;
  equippedSpecialModels: SpecialUnitModel[];
  weapons: Omit<UnitWeapon, 'choice'>[];
  enhancements: {
    prayers: ArmyBuilderEnhancement | null;
    commandTraits: ArmyBuilderEnhancement | null;
    artefacts: ArmyBuilderEnhancement | null;
    spellLores: ArmyBuilderEnhancement | null;
  };
  id?: string;
  movement?: string | null;
}

export type ArmyBuilderEnhancement = {
  name: string;
  description: string;
  applicableKeywords?: string[];
  isUnique?: boolean;
  chosen: boolean;
  source: string;
  castingValue?: number;
  range?: string;
};

export type PlayerArmy = {
  id: string;
  factionName: FactionName;
  units: PlayerArmyUnit[];
  grandStrategy: { name: string; description: string };
  battleTactics: FirestoreBattleTactic[];
  battleTraits: BattleTrait[];
};

export type FirestoreBattleTactic = {
  name: string;
  description: string;
  source: string;
  applicableSubfactions: string[];
};

export type GameBattleTrait = {
  name: string;
  description: string;
  flavor: string;
};

export type GameBattleTactic = {
  name: string;
  description: string;
  source: string;
  chosen: boolean;
  active: boolean;
};
