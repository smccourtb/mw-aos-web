import React from 'react';
import GameUnit from '@/components/GameUnit';
import { Player } from '@/types/firestore/firestore';

type ChargePhaseProps = {
  playerInfo: {
    [key in 1 | 2]: Player;
  };
  currentPlayer: 1 | 2;
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

const ChargePhase = ({
  currentPlayer,
  playerInfo,
  endPhase,
}: ChargePhaseProps) => {
  return (
    <section className="flex w-full flex-col">
      <h3 className="text-lg font-bold">
        You may charge with any of the following units if they are not within 3"
        of any enemy units:
      </h3>
      <div className="mt-2 flex h-full w-full flex-wrap gap-4">
        {currentPlayer && (
          <div>
            {playerInfo[currentPlayer]?.units
              ?.filter((unit) => {
                return !unit.movement || unit.movement === 'move';
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

export default ChargePhase;
