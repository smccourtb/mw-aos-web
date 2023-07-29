'use client';
import React, { createContext, useContext, useState } from 'react';
import { Game, Player } from '@/types/firestore/firestore';
import { PlayerArmyUnit } from '@/firestore/types';

const gameContext = createContext<{
  gameInfo: Game;
  playerInfo: { [key in 1 | 2]: Player };
  setGameInfo: React.Dispatch<React.SetStateAction<Game>>;
  setPlayerInfo: React.Dispatch<
    React.SetStateAction<{ [key in 1 | 2]: Player }>
  >;
  getUnits: (player: 1 | 2 | undefined, keywords: string[]) => PlayerArmyUnit[];
}>({
  gameInfo: {} as Game,
  playerInfo: {} as { [key in 1 | 2]: Player },
  setGameInfo: () => {},
  setPlayerInfo: () => {},
  getUnits: () => [],
});

export function GameProvider({
  children,
  game,
  players,
}: {
  children: JSX.Element;
  game: Game;
  players: { [key in 1 | 2]: Player };
}) {
  const [playerInfo, setPlayerInfo] =
    useState<{ [key in 1 | 2]: Player }>(players);
  const [gameInfo, setGameInfo] = useState<Game>(game);
  const getUnits = (player: 1 | 2 | undefined, keywords: string[]) => {
    // TODO: need to implement a way to determine AND OR AND NOT. For right now it is all OR.
    if (!player) return [];
    const playerUnits = playerInfo[player]?.units ?? [];
    console.log('playerUnits', playerUnits);
    if (keywords.length === 0) return playerUnits;
    return playerUnits.filter((unit) => {
      return keywords.some((keyword) => unit.keywords?.includes(keyword));
    });
  };
  return (
    <gameContext.Provider
      value={{ gameInfo, setGameInfo, playerInfo, setPlayerInfo, getUnits }}
    >
      {children}
    </gameContext.Provider>
  );
}
export const useGameContext = () => useContext(gameContext);
