import React, { useState } from 'react';
import GameUnit from '@/components/GameUnit';
import { Player } from '@/types/firestore/firestore';

type ShootingPhaseProps = {
  playerInfo: {
    [key in 1 | 2]: Player;
  };
  currentPlayer: 1 | 2;
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

const ShootingPhase = ({
  currentPlayer,
  playerInfo,
  endPhase,
}: ShootingPhaseProps) => {
  return (
    <section className="flex w-full flex-col">
      <h3 className="text-lg font-bold">
        You may shoot with any of the following units:
      </h3>
      <div className="mt-2 flex h-full w-full flex-wrap gap-4">
        {currentPlayer && (
          <div>
            {playerInfo[currentPlayer]?.units
              ?.filter((unit) => {
                const validMove = !unit.movement || unit.movement === 'move';
                const hasMissileWeapon = unit.weapons.some(
                  (weapon) => weapon.type === 'missile',
                );
                return validMove && hasMissileWeapon;
              })
              .map((unit, i) => (
                <GameUnit key={unit.name + i} unit={unit} />
              ))}
          </div>
        )}

        <button
          className="self-center rounded-md bg-green-500 p-2 text-white hover:bg-green-700"
          onClick={() => {
            endPhase((prev) => prev + 1);
          }}
        >
          Complete
        </button>
      </div>
    </section>
  );
};

export default ShootingPhase;
