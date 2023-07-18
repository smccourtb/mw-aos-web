import React from 'react';
import { PlayerArmyUnit, Unit } from '@/firestore/types';

type GameUnitProps = {
  unit: PlayerArmyUnit;
};
const GameUnit = ({ unit }: GameUnitProps) => {
  return (
    <div
      key={unit.ref}
      className={`relative my-4 flex select-none items-center justify-between rounded-md bg-gray-700 p-2 text-sm text-white`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <span className="lg:text-md relative -left-2 -top-5 flex select-none items-center justify-between whitespace-nowrap rounded-md border-2 border-gray-700 bg-white py-1 px-2 text-left text-xs font-bold text-gray-700 md:text-sm">
          <span>{unit.name}</span>
        </span>
        <div className="flex gap-4">
          {Object.entries(unit.baseStats).map((stat) => (
            <div key={stat[0]} className="flex gap-1">
              <span className="font-bold capitalize">{stat[0]}</span>
              <span>{stat[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameUnit;
