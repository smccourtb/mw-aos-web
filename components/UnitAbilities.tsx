import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';
import { PlayerArmyUnit } from '@/firestore/types';

type UnitAbilitiesProps = {
  playerUnits: PlayerArmyUnit[];
  currentPhase: string;
};
const UnitAbilities = ({ playerUnits, currentPhase }: UnitAbilitiesProps) => {
  const applicableUnitAbilities = playerUnits
    .filter((unit) => {
      if (!unit.abilities) return false;
      return unit.abilities.some(
        (ability) => ability.phase === currentPhase || ability.phase === 'all',
      );
    })
    .map((unit) => {
      return {
        name: unit.name,
        id: unit.id,
        abilities: unit.abilities?.filter(
          (ability) =>
            (ability.phase === currentPhase || ability.phase === 'all') &&
            ability.type !== 'command',
        ),
      };
    });

  return (
    <div className="flex h-full flex-col gap-3 px-3">
      <h3 className="font-bold">Unit Abilities</h3>
      {applicableUnitAbilities.map((unit) => (
        <div className="flex flex-col gap-2 text-sm font-medium">
          <h3 key={unit.id} className="w-fit border-b border-black pr-10">
            {unit.name}
          </h3>
          <div className="flex flex-wrap gap-3 text-sm">
            {unit.abilities?.map((ability) => (
              <Tooltip>
                <TooltipTrigger>
                  <button
                    key={ability.name}
                    className={`${
                      ability.phase === currentPhase
                        ? 'ring-2 ring-green-400'
                        : 'ring-1 ring-gray-500'
                    } flex flex-col rounded-md py-1 px-1.5 text-xs shadow-md `}
                    onClick={() => {
                      console.log('clicked');
                    }}
                  >
                    <p className={'capitalize'}>{ability.name}</p>
                    <TooltipContent>
                      <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                        {ability.description}
                      </div>
                    </TooltipContent>
                  </button>
                </TooltipTrigger>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitAbilities;
