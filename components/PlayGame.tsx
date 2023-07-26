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
  const [availableCommandAbilities, setAvailableCommandAbilities] = useState<
    { name: string; description: string; flavor?: string }[]
  >([]);

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
    setAvailableCommandAbilities(handleCommandAbilities());
  }, [gameInfo.phase]);

  const handleCommandAbilities = () => {
    const currentPlayer = gameInfo.priority as 1 | 2;
    if (!currentPlayer) return [];
    const universalAbilities =
      phaseData.find((p) => p.order === gameInfo.phase)?.commandAbilities || [];

    const unitAbilities =
      playerInfo[currentPlayer]?.units
        .map((unit) => unit?.abilities ?? [])
        .flat() ?? [];
    if (unitAbilities.length === 0) return universalAbilities;
    // search each units abilities object for the type property, and if it equals command return it
    const unitCommandAbilities =
      unitAbilities!.filter(
        (ability) =>
          ability?.type === 'command' &&
          (ability?.phase === phases[gameInfo.phase] ||
            ability?.phase === 'all'),
      ) ?? [];

    return [...universalAbilities, ...unitCommandAbilities];
  };

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

  const getActiveBattleTactic = () => {
    const activeTactic = playerInfo[
      gameInfo.priority as 1 | 2
    ]?.battleTactics.find((tactic) => tactic.active);
    return activeTactic?.name ?? '';
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
      <section className="flex h-full w-full flex-col">
        <div className="flex items-center gap-4 font-bold">
          <span className="text-xl">Round: {gameData.battleRound}</span>
          <span className="flex items-center gap-3 text-xl capitalize">
            Current Phase: {phases[gameInfo.phase]}
          </span>
          <span className="flex items-center gap-3 text-xl capitalize">
            Battle Tactic: {getActiveBattleTactic()}
          </span>
          <span className="flex items-center gap-3 text-xl capitalize">
            Command Points: {playerInfo[gameInfo.priority!]?.commandPoints ?? 0}
          </span>
          <button
            className="ml-auto rounded-sm border bg-gray-700 px-2 py-1 text-white"
            onClick={() => incrementPhase()}
          >
            Next Phase
          </button>
        </div>
        <div className={'mt-10 flex h-full w-full border-t border-black'}>
          <div className="mt-10 w-2/3 px-6">
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
                currentPlayer={gameData.priority as 1 | 2}
                playerInfo={playerInfo}
                endPhase={() => incrementPhase()}
              />
            )}
          </div>
          {gameInfo.phase > 0 && (
            <div className="flex h-full w-1/3 flex-col border-l border-black py-4">
              <CommandAbilities abilities={availableCommandAbilities} />
            </div>
          )}
        </div>
      </section>
    </SnackbarProvider>
  );
};

export default PlayGame;
