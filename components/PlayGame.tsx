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
import PlayerDashboard from '@/components/game/dashboard/PlayerDashboard';
import { useGameContext } from '@/context/GameContext';
import AttackPhase from '@/components/game/AttackPhase';
import BattleshockPhase from '@/components/game/BattleshockPhase';
import GameDashboardCard from '@/components/game/dashboard/GameDashboardCard';
import { PuzzleIcon, UserIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';
import FirestoreKeywordForm from '@/components/forms/FirestoreKeywordForm';
import FirestoreFactionForm from '@/components/forms/FirestoreFactionForm';
import FirestoreUnitForm from '@/components/forms/FirestoreUnitForm';
import GameDashboardTab from '@/components/game/dashboard/GameDashboardTab';

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
      <section className="my-10 flex h-screen w-full flex-col gap-2 overscroll-none transition-all duration-300 ease-in-out">
        <Tab.Group>
          <Tab.List className="flex items-center justify-end gap-4">
            <GameDashboardTab>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H461.7c11.6 36 3.1 77-25.4 105.5L320 413.8V448zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
            </GameDashboardTab>
            <GameDashboardTab>
              <UserIcon className="h-5 w-5" />
            </GameDashboardTab>
          </Tab.List>
          <Tab.Panels className="h-full">
            <Tab.Panel className="flex h-full w-full flex-col gap-4">
              <div className="relative flex w-1/12 items-center justify-center self-center overflow-hidden rounded-md bg-white/10 p-2 font-averia text-2xl font-bold uppercase text-white">
                {
                  phaseData.find((phase) => phase.order === gameInfo.phase)
                    ?.name
                }
              </div>
              <GameDashboardCard className="frosted h-full">
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
                {gameInfo.phase === 5 && (
                  <AttackPhase endPhase={() => incrementPhase()} />
                )}
                {gameInfo.phase === 6 && (
                  <BattleshockPhase endPhase={() => incrementPhase()} />
                )}
              </GameDashboardCard>
              <GameDashboardCard className="h-full">
                <div>Rules</div>
              </GameDashboardCard>
            </Tab.Panel>
            <Tab.Panel className="flex h-full gap-4">
              <PlayerDashboard player={1} />
              <PlayerDashboard player={2} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </SnackbarProvider>
  );
};

export default PlayGame;
