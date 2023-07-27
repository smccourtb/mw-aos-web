'use client';
import React, { useEffect, useState } from 'react';
import Setup from '@/components/game/Setup';
import HeroPhase from '@/components/game/HeroPhase';
import CommandAbilities from '@/components/CommandAbilities';
import MovementPhase from '@/components/game/MovementPhase';
import ShootingPhase from '@/components/game/ShootingPhase';
import { Game, Phase, Player } from '@/types/firestore/firestore';
import ReceivedCommandPointAlert from '@/components/alerts/ReceivedCommandPointAlert';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import ChargePhase from '@/components/game/ChargePhase';
import UnitAbilities from '@/components/UnitAbilities';

declare module 'notistack' {
  interface VariantOverrides {
    commandPoint: true;
  }
}

type PlayGameProps = {
  gameData: Game;
  phaseData: Phase[];
  playerData: { [key in 1 | 2]: Player };
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
const PlayGame = ({ gameData, phaseData, playerData }: PlayGameProps) => {
  const [playerInfo, setPlayerInfo] =
    useState<{ [key in 1 | 2]: Player }>(playerData);
  const [gameInfo, setGameInfo] = useState<Game>(gameData);

  const setUpUnits = (priorityPlayer: 1 | 2) => {
    setGameInfo((prev) => ({
      ...prev,
      priority: priorityPlayer,
      phase: 1,
    }));
    giveCommandPoints(priorityPlayer, 1, 'Priority Player');
    giveCommandPoints(priorityPlayer === 1 ? 2 : 1, 2, 'Non Priority Player');
  };

  useEffect(() => {
    if (!gameInfo.phase) return;
    if (gameInfo.phase === 1) {
      giveCommandPoints(gameInfo.priority as 1 | 2, 1, 'Hero Phase');
    }
  }, [gameInfo.phase]);

  const giveCommandPoints = (
    player: 1 | 2,
    amount: number,
    message: string,
  ) => {
    console.log('message', message);

    setPlayerInfo((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        commandPoints: (prev[player]?.commandPoints ?? 0) + amount,
      } as Player,
    }));
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: 'commandPoint',
    });
  };

  const passPriority = () => {
    setGameInfo((prev) => ({
      ...prev,
      priority: prev.priority === 1 ? 2 : 1,
    }));
  };

  const incrementBattleRound = () => {
    setGameInfo((prev) => ({
      ...prev,
      battleRound: prev.battleRound + 1,
    }));
  };

  const resetCommandAbiltiies = () => {};

  const incrementPhase = () => {
    setGameInfo((prev) => {
      const lastRound = prev.phase === 6;
      if (lastRound) {
        incrementBattleRound();
        resetCommandPoints();
        passPriority();
        return {
          ...prev,
          phase: 1,
          battleRound: prev.battleRound + 1,
        };
      }
      return {
        ...prev,
        phase: prev.phase + 1,
      };
    });
  };

  const resetCommandPoints = () => {
    setPlayerInfo((prev) => ({
      ...prev,
      1: {
        ...prev[1]!,
        commandPoints: 0,
      },
      2: {
        ...prev[2]!,
        commandPoints: 0,
      },
    }));
  };

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

  const getAvailablePlayerBattleTactics = () => {
    const player = gameInfo.priority!;
    const playerTactics = playerInfo[player]?.battleTactics ?? [];
    return playerTactics.filter((tactic) => !tactic.chosen);
  };

  return (
    <SnackbarProvider
      Components={{
        commandPoint: ReceivedCommandPointAlert,
      }}
    >
      <section className="grid h-full w-full grid-cols-12">
        <div className="col-span-3">
          <div
            className={`${
              gameInfo.priority === 1
                ? 'bg-red-500  text-white'
                : 'bg-none text-red-500'
            } font-2xl flex-start -mb-1 flex justify-between rounded-t-lg px-4 pb-0.5 font-bold`}
          >
            <span>Player 1</span>
            <span>
              {playerInfo[1].commandPoints}
              <span className="text-[10px] uppercase">cp</span>
            </span>
          </div>
          {gameInfo.phase > 0 && (
            <div className="flex h-full flex-col rounded-md border-t-4 border-red-500 py-4 shadow-xl">
              <CommandAbilities
                abilities={playerInfo[1].commandAbilities[gameInfo.phase] ?? []}
              />
              <UnitAbilities
                playerUnits={playerInfo[1]?.units ?? []}
                currentPhase={phases[gameInfo.phase] ?? ''}
              />
            </div>
          )}
        </div>
        <div className="col-span-3 col-start-10 flex flex-col">
          <div
            className={`${
              gameInfo.priority === 2
                ? 'bg-blue-500 text-white'
                : 'bg-none text-blue-500'
            } font-2xl -mb-1 w-fit self-end rounded-t-lg px-4 pb-0.5 font-bold`}
          >
            Player 2
          </div>
          {gameInfo.phase > 0 && (
            <div className="flex h-full flex-col rounded-md border-t-4 border-blue-500 py-4 shadow-xl">
              <CommandAbilities
                abilities={playerInfo[2].commandAbilities[gameInfo.phase] ?? []}
              />
              <UnitAbilities
                playerUnits={playerInfo[2]?.units ?? []}
                currentPhase={phases[gameInfo.phase] ?? ''}
              />
            </div>
          )}
        </div>
        <div
          className={
            'col-span-6 col-start-4 row-start-1 mt-[22px] flex w-full px-6'
          }
        >
          {gameInfo.phase === 0 && !gameInfo.priority && (
            <Setup setUp={setUpUnits} />
          )}
          {gameInfo.phase === 1 && (
            <HeroPhase
              currentPlayer={gameInfo.priority as 1 | 2}
              playerInfo={playerInfo}
              heroicActions={
                phaseData.find((phase) => phase.name === 'hero')
                  ?.heroicActions || []
              }
              onBattleTacticSelect={selectBattleTactic}
              battleTactics={getAvailablePlayerBattleTactics()}
              endPhase={() => incrementPhase()}
            />
          )}
          {gameInfo.phase === 2 && (
            <MovementPhase
              currentPlayer={gameInfo.priority as 1 | 2}
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              endPhase={() => incrementPhase()}
            />
          )}
          {gameInfo.phase === 3 && (
            <ShootingPhase
              currentPlayer={gameInfo.priority as 1 | 2}
              playerInfo={playerInfo}
              endPhase={() => incrementPhase()}
            />
          )}
          {gameInfo.phase === 4 && (
            <ChargePhase
              currentPlayer={gameInfo.priority as 1 | 2}
              playerInfo={playerInfo}
              endPhase={() => incrementPhase()}
            />
          )}
        </div>
      </section>
    </SnackbarProvider>
  );
};

export default PlayGame;
