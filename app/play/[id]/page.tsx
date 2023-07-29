import React from 'react';
import PlayGame from '@/components/PlayGame';
import { getUserGame } from '@/firestore/user';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { getPhases } from '@/firestore/phases';
import {
  FirestoreBattleTactic,
  GameBattleTactic,
  GameBattleTrait,
  PlayerArmyUnit,
} from '@/firestore/types';
import { BattleTrait, Game, Player } from '@/types/firestore/firestore';
import { GameProvider } from '@/context/GameContext';

type GamePageProps = {
  params: { id: string };
};
export default async function PlayGamePage({ params }: GamePageProps) {
  const user = await userSession();

  const gameData = await getUserGame(user?.uid, params.id);
  if (!gameData) {
    return <div>Game not found</div>;
  }
  const phases = await getPhases();

  const formatUnits = (units: PlayerArmyUnit[] | null) => {
    if (!units) return [];
    return units.map((unit) => ({
      ...unit,
      movement: null,
      id: crypto.randomUUID(),
    }));
  };

  const formatBattleTactics = (
    battleTactics: FirestoreBattleTactic[] | null,
  ) => {
    if (!battleTactics) return [];
    return battleTactics.map((tactic) => ({
      name: tactic.name,
      description: tactic.description,
      source: tactic.source,
      chosen: false,
      active: false,
    })) as GameBattleTactic[];
  };

  const formatBattleTraits = (battleTraits: BattleTrait[] | null) => {
    if (!battleTraits) return [];
    return battleTraits.map((trait) => ({
      name: trait.name,
      description: trait.description,
      flavor: trait.flavor,
    })) as GameBattleTrait[];
  };

  const formatPlayers = () => {
    const players = [gameData.playerOne, gameData.playerTwo];
    return players.map((player) => ({
      commandPoints: 0,
      units: formatUnits(player.army?.units),
      battleTactics: formatBattleTactics(player.army?.battleTactics),
      battleTraits: formatBattleTraits(player.army?.battleTraits),
      grandStrategy: player.army?.grandStrategy,
      userId: player.user ?? '',
      commandAbilities: formatCommandAbilities(player.army?.units ?? []),
    })) as Player[];
  };

  const setUpPlayers = () => {
    const players = formatPlayers();
    return {
      1: players[0],
      2: players[1],
    } as { [key in 1 | 2]: Player };
  };

  const formatCommandAbilities = (playerUnits: PlayerArmyUnit[]) => {
    const formattedAbilities = {} as {
      [key: number]: {
        name: string;
        description: string;
        priority?: string;
        flavor?: string;
        stage?: string;
        active: boolean;
        chosen: boolean;
      }[];
    };

    const unitCommandAbilities =
      playerUnits
        .map((unit) => unit?.abilities ?? [])
        .flat()
        .filter((ability) => ability?.type === 'command') ?? [];

    phases.forEach((phase) => {
      const unitAbilities = unitCommandAbilities.filter(
        (ability) => ability.phase === phase.name || ability.phase === 'all',
      );
      const universalAbilities = phase.commandAbilities ?? [];
      formattedAbilities[phase.order] = [
        ...unitAbilities,
        ...universalAbilities,
      ].map((ability) => ({
        ...ability,
        active: false,
        chosen: false,
      }));
    });

    return formattedAbilities;
  };

  const setUpGame = () => {
    return {
      id: gameData.id,
      battleRound: 0,
      phase: 0,
      priority: null,
      battleTacticPointAmount: gameData.battlepack.btPoints,
      grandStrategyPointAmount: gameData.battlepack.gsPoints,
    } as Game;
  };

  const game = setUpGame();
  const players = setUpPlayers();

  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <GameProvider game={game} players={players}>
        <PlayGame phaseData={phases} />
      </GameProvider>
    </div>
  );
}
