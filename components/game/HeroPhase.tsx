import React, { useMemo, useState } from 'react';
import GameUnit from '@/components/GameUnit';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';
import { useGameContext } from '@/context/GameContext';
import { Player } from '@/types/firestore/firestore';

type HeroPhaseProps = {
  heroicActions: { description: string; name: string }[];
  endPhase: React.Dispatch<React.SetStateAction<number>>;
};

// player priority goes first
// add command points
// perform heroic actions
// cast spells

const HeroPhase = ({ heroicActions, endPhase }: HeroPhaseProps) => {
  const { gameInfo, playerInfo, setPlayerInfo } = useGameContext();
  const currentPlayer = gameInfo.priority as 1 | 2;
  const [stage, setStage] = useState(1);

  // TODO: add in reserve to units for heroes -> they cannot perform heroic actions if they are in reserve
  const battleTactics = useMemo(() => {
    const player = gameInfo.priority!;
    const playerTactics = playerInfo[player]?.battleTactics ?? [];
    return playerTactics.filter((tactic) => !tactic.chosen);
  }, [gameInfo.priority, playerInfo]);

  const selectBattleTactic = (tactic: {
    name: string;
    description: string;
  }) => {
    const player = gameInfo.priority;
    if (!player) return;
    const playerTactics = playerInfo[player]?.battleTactics ?? [];
    const chosenTactic = playerTactics.find((t) => t.name === tactic.name);
    if (!chosenTactic) return;
    chosenTactic.active = true;
    chosenTactic.chosen = true;
    setPlayerInfo((prev: { [key in 1 | 2]: Player }) => {
      return {
        ...prev,
        [player as 1 | 2]: {
          ...prev[player],
          battleTactics: [...playerTactics],
        },
      };
    });
  };

  return (
    <section className="flex w-full flex-col">
      {stage === 1 && (
        <>
          <h3 className="text-lg font-bold">Choose your battle tactic</h3>
          <div className="mt-2 flex w-full flex-wrap gap-4">
            {battleTactics.map((battleTactic) => (
              <button
                key={battleTactic.name}
                className="min-w-1/4 flex flex-col rounded-md border border-gray-500 p-2 shadow-md"
                onClick={() => {
                  selectBattleTactic(battleTactic);
                  setStage(2);
                }}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-md font-bold">
                      {battleTactic.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                      {battleTactic.description}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </button>
            ))}
          </div>
        </>
      )}
      {stage === 2 && (
        <>
          <h3 className="text-lg font-bold">Choose a heroic action</h3>
          <div className="mt-2 flex h-full w-full flex-wrap gap-4">
            {heroicActions.map((heroicAction) => (
              <button
                key={heroicAction.name}
                className="min-w-1/4 flex max-w-fit flex-col rounded-md border border-gray-500 p-2 shadow-md"
                onClick={() => {
                  setStage(3);
                }}
              >
                <span className="text-md font-bold capitalize">
                  {heroicAction.name}
                </span>
                <span className="text-sm">{heroicAction.description}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {/* gather units with the keyword wizard to cast any spells*/}
      {stage === 3 && (
        <div className="flex flex-col">
          <h3>You may cast a spell with each of the following units:</h3>
          {playerInfo[currentPlayer]!.units.filter((unit) => unit.isWizard).map(
            (unit) => (
              <GameUnit key={unit.name} unit={unit} showSpells />
            ),
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
      )}
    </section>
  );
};

export default HeroPhase;
