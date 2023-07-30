'use client';
import React, { useEffect, useState } from 'react';
import Setup from '@/components/game/Setup';
import HeroPhase from '@/components/game/HeroPhase';
import MovementPhase from '@/components/game/MovementPhase';
import ShootingPhase from '@/components/game/ShootingPhase';
import { Phase, Player } from '@/types/firestore/firestore';
import ReceivedCommandPointAlert from '@/components/alerts/ReceivedCommandPointAlert';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import ChargePhase from '@/components/game/ChargePhase';
import PlayerDashboard from '@/components/game/PlayerDashboard';
import { useGameContext } from '@/context/GameContext';

declare module 'notistack' {
  interface VariantOverrides {
    commandPoint: true;
  }
}

type PlayGameProps = {
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
const PlayGame = ({ phaseData }: PlayGameProps) => {
  const { gameInfo, setGameInfo, setPlayerInfo } = useGameContext();

  const [maximizePlayerOne, setMaximizePlayerOne] = useState(false);
  const [maximizePlayerTwo, setMaximizePlayerTwo] = useState(false);

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

  return (
    <SnackbarProvider
      Components={{
        commandPoint: ReceivedCommandPointAlert,
      }}
    >
      <section className="flex h-screen w-full overscroll-none ">
        {gameInfo.phase > 0 && (
          <PlayerDashboard
            maximized={maximizePlayerOne}
            setMaximize={setMaximizePlayerOne}
            player={1}
          />
        )}

        <div
          className={`${
            maximizePlayerOne || maximizePlayerTwo
              ? 'w-0 scale-0 opacity-0'
              : 'w-3/5 flex-shrink-0 scale-100 opacity-100'
          } px-6 transition-all duration-300`}
        >
          {gameInfo.phase === 0 && !gameInfo.priority && (
            <Setup setUp={setUpUnits} />
          )}
          {gameInfo.phase === 1 && (
            <HeroPhase
              heroicActions={
                phaseData.find((phase) => phase.name === 'hero')
                  ?.heroicActions || []
              }
              endPhase={() => incrementPhase()}
            />
          )}
          {gameInfo.phase === 2 && (
            <MovementPhase endPhase={() => incrementPhase()} />
          )}
          {gameInfo.phase === 3 && (
            <ShootingPhase endPhase={() => incrementPhase()} />
          )}
          {gameInfo.phase === 4 && (
            <ChargePhase endPhase={() => incrementPhase()} />
          )}
        </div>
        {gameInfo.phase > 0 && (
          <PlayerDashboard
            maximized={maximizePlayerTwo}
            setMaximize={setMaximizePlayerTwo}
            player={2}
          />
        )}
      </section>
    </SnackbarProvider>
  );
};

export default PlayGame;
