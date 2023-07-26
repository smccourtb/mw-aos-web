import React, { useState } from 'react';
import { PlayerArmyUnit } from '@/firestore/types';
import GameUnit from '@/components/GameUnit';
import { Player } from '@/types/firestore/firestore';

type MovementPhaseProps = {
  playerInfo: {
    [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
  };
  setPlayerInfo: React.Dispatch<
    React.SetStateAction<{
      [key in 1 | 2]: Player;
    }>
  >;
  currentPlayer: 1 | 2;
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

// player priority goes first
// add command points
// perform heroic actions
// cast spells

const MovementPhase = ({
  currentPlayer,
  playerInfo,
  setPlayerInfo,
  endPhase,
}: MovementPhaseProps) => {
  const [phasePosition, setPhasePosition] = useState(0);
  const [unitsMovementSelected, setUnitsMovementSelected] = useState(
    playerInfo[currentPlayer]?.units?.map((unit) => ({
      id: unit.id,
      movement: unit.movement,
    })),
  );
  // add 1 command point if general is on the battlefield. maybe a popup to ask if they want to use it?
  // get all hero unit possible heroic actions
  // get all generic heroic actions
  // choose a battle tactic
  // TODO: add in reserve to units for heroes -> they cannot perform heroic actions if they are in reserve
  const handleUnitMovement = (unit: PlayerArmyUnit, movementAction: string) => {
    setUnitsMovementSelected((prev) => {
      const unitIndex = prev?.findIndex((u) => u.id === unit.id);
      if (unitIndex === -1) {
        return [...prev!, { id: unit.id, movement: movementAction }];
      } else {
        return prev?.filter((u) => u.id !== unit.id);
      }
    });
    setPlayerInfo((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        units: prev[currentPlayer].units.map((u) => {
          if (u.id === unit.id) {
            return {
              ...u,
              movement: movementAction,
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
                        unitsMovementSelected?.find(
                          (u) => u.movement === movementAction,
                        )
                          ? 'bg-white text-gray-700'
                          : 'bg-gray-700 text-white'
                      } gap-2 rounded-md px-2 py-0.5 text-sm font-bold capitalize`}
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
