'use client';
import React, { useEffect, useState } from 'react';
import type { Game, Phase, PlayerArmyUnit } from '@/firestore/types';
import Setup from '@/components/game/Setup';
import HeroPhase from '@/components/game/HeroPhase';
import CommandAbilities from '@/components/CommandAbilities';

type GameProps = {
  gameData: Game;
  phaseData: Phase[];
};

const phases = [
  'setup',
  'hero',
  'movement',
  'shooting',
  'charge',
  'combat',
  'battleshock',
];
const Game = ({ gameData, phaseData }: GameProps) => {
  const [battleRound, setBattleRound] = useState(0);
  const [playerInfo, setPlayerInfo] = useState<{
    [key: number]: { commandPoints: number; units: PlayerArmyUnit[] };
  }>({
    1: {
      commandPoints: 0,
      units: [],
    },
    2: {
      commandPoints: 0,
      units: [],
    },
  });
  const [availableCommandAbilities, setAvailableCommandAbilities] = useState<
    { name: string; text?: string; description?: string }[]
  >([]);
  const [phase, setPhase] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2 | null>(null); // whos turn it is
  const [battleTactic, setBattleTactic] = useState<{
    name: string;
    description: string;
  }>({ name: '', description: '' });

  // start the game after deployment and priority is chosen
  useEffect(() => {
    if (phase === 0 && currentPlayer) {
      setPhase(1);
    }
  }, [currentPlayer]);

  useEffect(() => {
    setPlayerInfo({
      1: {
        commandPoints: 0,
        units: gameData!.playerOne.army.units ?? [],
      },
      2: {
        commandPoints: 0,
        units: gameData?.playerTwo?.army?.units ?? [],
      },
    });
  }, []);

  console.log('playerInfo', gameData!.playerOne);

  useEffect(() => {
    setAvailableCommandAbilities(handleCommandAbilities());
  }, [phase]);

  const handleCommandAbilities = () => {
    const universalAbilities = phaseData[phase - 1]?.commandAbilities || [];
    // search each units abilities object for the type property, and if it equals command return it
    const unitCommandAbilities =
      playerInfo[currentPlayer ?? 1]?.units
        .map((unit) => unit.abilities)
        .flat()
        .filter(
          (ability) =>
            ability?.type === 'command' &&
            (ability?.phase === phases[phase] || ability?.phase === 'all'),
        ) ?? [];

    return [...universalAbilities, ...unitCommandAbilities] as {
      name: string;
      text?: string;
      description?: string;
    }[];
  };

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex items-center gap-4 font-bold">
        <span className="text-xl">Round: {battleRound}</span>
        <span className="flex items-center gap-3 text-xl capitalize">
          Current Phase: {phases[phase]}
        </span>
        <span className="flex items-center gap-3 text-xl capitalize">
          Battle Tactic: {battleTactic?.name}
        </span>
        <button
          className="ml-auto rounded-sm border bg-gray-700 px-2 py-1 text-white"
          onClick={() => setPhase((prev) => prev + 1)}
        >
          Next Phase
        </button>
      </div>
      <div className={'mt-10 flex h-full w-full border-t border-black'}>
        <div className="mt-10 w-2/3 px-6">
          {phase === 0 && !currentPlayer && (
            <Setup currentPlayer={currentPlayer} setPlayer={setCurrentPlayer} />
          )}
          {phase === 1 && (
            <HeroPhase
              battlepack={gameData!.battlepack}
              currentPlayer={currentPlayer as 1 | 2}
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              heroicActions={phaseData[0]?.heroicActions || []}
              setBattleTactic={setBattleTactic}
              endPhase={setPhase}
            />
          )}
          {/*{currentPlayer && (*/}
          {/*  <div>*/}
          {/*    {playerInfo[currentPlayer].units?.map((unit) => (*/}
          {/*      <GameUnit unit={unit} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        {phase > 0 && (
          <div className="flex h-full w-1/3 flex-col border-l border-black py-4">
            <CommandAbilities abilities={availableCommandAbilities} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Game;
