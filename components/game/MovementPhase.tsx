import React, { useEffect, useState } from 'react';
import { Battlepack, PlayerArmyUnit } from '@/firestore/types';
import GameUnit from '@/components/GameUnit';

type HeroPhaseProps = {
  battlepack: Battlepack;
  playerInfo: {
    [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
  };
  setPlayerInfo: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
    }>
  >;
  currentPlayer: 1 | 2;
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

// player priority goes first
// add command points
// perform heroic actions
// cast spells

const HeroPhase = ({
  currentPlayer,
  playerInfo,
  setPlayerInfo,
  endPhase,
}: HeroPhaseProps) => {
  const [phasePosition, setPhasePosition] = useState(0);
  // add 1 command point if general is on the battlefield. maybe a popup to ask if they want to use it?
  // get all hero unit possible heroic actions
  // get all generic heroic actions
  // choose a battle tactic
  // TODO: add in reserve to units for heroes -> they cannot perform heroic actions if they are in reserve

  useEffect(() => {
    if (phasePosition === 0) {
      // add 1 command point to each player
      setPlayerInfo((prev) => ({
        ...prev!,
        1: {
          ...prev[1]!,
          commandPoints: prev[currentPlayer]!.commandPoints + 1,
        },
        2: {
          ...prev[2]!,
          commandPoints: prev[currentPlayer]!.commandPoints + 1,
        },
      }));
      setPhasePosition(1);
    }
  }, [phasePosition]);

  return (
    <section className="flex w-full flex-col">
      <h3 className="text-lg font-bold">
        Choose units to move, run, or retreat
      </h3>
      <div className="mt-2 flex h-full w-full flex-wrap gap-4">
        {currentPlayer && (
          <div>
            {playerInfo[currentPlayer]?.units?.map((unit) => (
              <GameUnit unit={unit} />
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

export default HeroPhase;
