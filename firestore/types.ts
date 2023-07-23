import {
  FactionName,
  SpecialUnitModel,
  Unit,
  UnitWeapon,
} from '@/types/firestore';

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
