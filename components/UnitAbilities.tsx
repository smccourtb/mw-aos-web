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
      <h3 className="text-lg font-bold">Unit Abilities</h3>
      {applicableUnitAbilities.map((unit) => (
        <div className="flex flex-col">
          <h3 key={unit.id}>{unit.name}</h3>
          <div className="flex flex-wrap gap-2">
            {unit.abilities?.map((ability) => (
              <button
                key={ability.name}
                className={`${
                  ability.phase === currentPhase
                    ? 'ring-2 ring-green-400'
                    : 'ring-1 ring-gray-500'
                } min-w-1/4 flex flex-col rounded-md p-2 shadow-md `}
                onClick={() => {
                  console.log('clicked');
                }}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <p className={'font-bold capitalize'}>{ability.name}</p>
                    <TooltipContent>
                      <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                        {ability.description}
                      </div>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitAbilities;
