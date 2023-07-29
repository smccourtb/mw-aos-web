import React from 'react';
import { PlayerArmyUnit } from '@/firestore/types';
import GameUnit from '@/components/GameUnit';
import { useGameContext } from '@/context/GameContext';

type MovementPhaseProps = {
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

// player priority goes first
// add command points
// perform heroic actions
// cast spells

const MovementPhase = ({ endPhase }: MovementPhaseProps) => {
  const { gameInfo, playerInfo, setPlayerInfo } = useGameContext();
  const currentPlayer = gameInfo.priority as 1 | 2;
  const handleUnitMovement = (unit: PlayerArmyUnit, movementAction: string) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        units: prev[currentPlayer].units.map((u) => {
          if (u.id === unit.id) {
            return {
              ...u,
              movement: movementAction === u.movement ? null : movementAction,
            };
          }
          return u;
        }),
      },
    }));
  };

  return (
    <section className="flex w-full flex-col">
      <h3 className="text-lg font-bold">
        Choose units to move, run, or retreat
      </h3>
      <div className="mt-2 flex h-full w-full flex-col gap-4">
        {currentPlayer && (
          <div>
            {playerInfo[currentPlayer]?.units?.map((unit) => (
              <div className="flex w-full items-center justify-between px-2 hover:bg-gray-200">
                <GameUnit unit={unit} />
                <div className="flex w-full items-center justify-end  gap-2">
                  {['move', 'run', 'retreat'].map((movementAction) => (
                    <button
                      onClick={() => handleUnitMovement(unit, movementAction)}
                      className={`${
                        playerInfo[currentPlayer]?.units?.find(
                          (u) =>
                            u.movement === movementAction && u.id === unit.id,
                        )
                          ? 'bg-white text-gray-700 ring-1 ring-gray-700 hover:bg-gray-200'
                          : 'bg-gray-700 text-white hover:bg-gray-500'
                      } gap-2 rounded-md px-2 py-0.5 text-sm font-bold capitalize `}
                    >
                      {movementAction}
                    </button>
                  ))}
                </div>
              </div>
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

export default MovementPhase;
