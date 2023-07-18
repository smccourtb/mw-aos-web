import React, { useEffect, useState } from 'react';
import { Battlepack, PlayerArmyUnit } from '@/firestore/types';
import GameUnit from '@/components/GameUnit';

type HeroPhaseProps = {
  battlepack: Battlepack;
  setCommandAbilities: React.Dispatch<React.SetStateAction<any>>;
  playerInfo: {
    [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
  };
  setPlayerInfo: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
    }>
  >;
  currentPlayer: 1 | 2;
  heroicActions: { text: string; name: string }[];
  setBattleTactic: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
};

// player priority goes first
// add command points
// perform heroic actions
// cast spells

const HeroPhase = ({
  currentPlayer,
  setCommandAbilities,
  playerInfo,
  setPlayerInfo,
  heroicActions,
  battlepack,
  setBattleTactic,
}: HeroPhaseProps) => {
  console.log('setCommandAbilities', setCommandAbilities);

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
      {phasePosition === 1 && (
        <>
          <h3 className="text-lg font-bold">Choose your battle tactic</h3>
          <div className="mt-2 flex h-full w-full flex-wrap gap-4">
            {battlepack.battleTactics.map((battleTactic) => (
              <button
                key={battleTactic.name}
                className="min-w-1/4 flex flex-col rounded-md border border-gray-500 p-2 shadow-md"
                onClick={() => {
                  setBattleTactic(battleTactic);
                  setPhasePosition(2);
                }}
              >
                <span className="text-md font-bold">{battleTactic.name}</span>
                <span className="text-sm">{battleTactic.description}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {phasePosition === 2 && (
        <>
          <h3 className="text-lg font-bold">Choose a heroic action</h3>
          <div className="mt-2 flex h-full w-full flex-wrap gap-4">
            {heroicActions.map((heroicAction) => (
              <button
                key={heroicAction.name}
                className="min-w-1/4 flex max-w-fit flex-col rounded-md border border-gray-500 p-2 shadow-md"
                onClick={() => {
                  setPhasePosition(3);
                }}
              >
                <span className="text-md font-bold capitalize">
                  {heroicAction.name}
                </span>
                <span className="text-sm">{heroicAction.text}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {/* gather units with the keyword wizard to cast any spells*/}
      {phasePosition === 3 && (
        <>
          {playerInfo[currentPlayer]!.units.filter((unit) => unit.isWizard).map(
            (unit) => (
              <GameUnit key={unit.name} unit={unit} />
            ),
          )}
        </>
      )}
    </section>
  );
};

export default HeroPhase;
