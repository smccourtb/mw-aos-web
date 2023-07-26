import React, { useState } from 'react';
import { PlayerArmyUnit } from '@/firestore/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';

type GameUnitProps = {
  unit: PlayerArmyUnit;
  showSpells?: boolean;
};
const GameUnit = ({ unit, showSpells }: GameUnitProps) => {
  const [spellsChosen, setSpellsChosen] = useState<
    { name: string; description: string }[]
  >([]);
  const handleSpellChange = (spell: { name: string; description: string }) => {
    const spellIndex = spellsChosen?.findIndex((s) => s.name === spell.name);

    if (spellIndex === -1) {
      setSpellsChosen((prev) => [...prev!, spell]);
    } else {
      setSpellsChosen((prev) => prev?.filter((s) => s.name !== spell.name));
    }
  };

  return (
    <div
      key={unit.ref}
      className={`relative my-4 flex select-none items-center justify-between rounded-md bg-gray-700 p-2 text-sm text-white`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <span className="lg:text-md relative -left-2 -top-5 flex select-none items-center justify-between whitespace-nowrap rounded-md border-2 border-gray-700 bg-white py-1 px-2 text-left text-xs font-bold text-gray-700 md:text-sm">
          <span>{unit.name}</span>
          <div className="flex gap-2 divide-x divide-gray-700 self-end">
            {Object.entries(unit.baseStats).map((stat) => (
              <div key={stat[0]} className="flex items-baseline gap-0.5 pl-0.5">
                <span className="font-bold capitalize">{stat[0][0]}</span>
                <span className="text-xs lg:text-sm">{stat[1]}</span>
              </div>
            ))}
          </div>
        </span>
        <div className="flex items-center gap-2">
          {showSpells &&
            [...(unit?.spells ?? []), unit.enhancements.spellLores].map(
              (spell, i) => (
                <Tooltip key={spell!.name + i}>
                  <TooltipTrigger asChild={false}>
                    <button
                      onClick={() => handleSpellChange(spell!)}
                      className="rounded-md bg-white px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200"
                    >
                      {spell!.name}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                      {spell!.description}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default GameUnit;
