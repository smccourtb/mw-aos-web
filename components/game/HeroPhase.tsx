import React, { useEffect, useMemo, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';
import { useGameContext } from '@/context/GameContext';
import { Player } from '@/types/firestore/firestore';
import Abilities from '@/components/Abilities';
import {
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
  Popover,
} from '@/components/Popover';
import FormSelect from '@/components/inputs/FormSelect';
import Select from '@/components/inputs/Select';
import { PlayerArmyUnit } from '@/firestore/types';
import GameDashboardTab from '@/components/game/dashboard/GameDashboardTab';

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
  const [stage, setStage] = useState<{
    stage: 1 | 2 | 3;
    player: 1 | 2;
  }>({ stage: 1, player: currentPlayer });
  const [heroicActionsTaken, setHeroicActionsTaken] = useState({
    player1: false,
    player2: false,
  });
  const [miscast, setMiscast] = useState(false);
  const [unbound, setUnbound] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PlayerArmyUnit>(null);

  // stages
  // 1. choose battle tactic - current player - stage 1
  // 2. choose heroic action - both players - stage 2 a-b - once
  // 3. cast spells/ unbind spells - current player / other player - stage 3 - a-b - repeat until both players pass
  //    - player casts spell
  //    - other player unbinds spell
  //    - repeat until both players pass

  // TODO: add in reserve to units for heroes -> they cannot perform heroic actions if they are in reserve
  const battleTactics = useMemo(() => {
    const player = gameInfo.priority!;
    const playerTactics = playerInfo[player]?.battleTactics ?? [];
    return playerTactics.filter((tactic) => !tactic.chosen);
  }, [gameInfo.priority, playerInfo]);

  const selectBattleTactic = (tactic: string) => {
    const player = gameInfo.priority;
    if (!player) return;
    const playerTactics = playerInfo[player]?.battleTactics ?? [];
    const chosenTactic = playerTactics.find((t) => t.name === tactic);
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

  useEffect(() => {
    if (stage.stage === 2) {
      if (heroicActionsTaken.player1 && heroicActionsTaken.player2) {
        setStage((prev) => ({ ...prev, stage: 3 }));
      }
    }
  }, [heroicActionsTaken]);

  const handleHeroicAction = (player: 1 | 2) => {
    setHeroicActionsTaken((prev) => ({
      ...prev,
      [`player${player}`]: true,
    }));
  };

  const handleSpellAttempted = (unit, spell, actionType: string) => {
    // TODO: figure out how to prevent popover closing when clicking outside the popover. and prevent the onclick handler from closing the popover in specific cases. floating ui docs
    console.log('spell.name', spell.name);

    setPlayerInfo((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        units: prev[currentPlayer].units.map((u) => {
          if (u.id === unit.id) {
            return {
              ...u,
              spellsAttempted: u.spellsAttempted + 1,
            };
          }
          return u;
        }),
      },
    }));
    setPlayerInfo((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        units: prev[currentPlayer].units.map((u) => {
          if (u.spells.length > 0) {
            return {
              ...u,
              spells: u.spells.map((s) => {
                if (s.name === spell.name) {
                  return {
                    ...s,
                    canCast: false,
                  };
                }
                return s;
              }),
            };
          }
          return u;
        }),
      },
    }));
    if (actionType === 'miscast') {
      setMiscast(true);
      setPlayerInfo((prev) => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          units: prev[currentPlayer].units.map((u) => {
            if (u.id === unit.id) {
              return {
                ...u,
                spellsAttempted: u.spellCastLimit,
              };
            }
            return u;
          }),
        },
      }));
    }
    if (actionType === 'unbound') {
      setUnbound(true);
      setPlayerInfo((prev) => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          units: prev[currentPlayer].units.map((u) => {
            if (u.id === unit.id) {
              return {
                ...u,
                unbindAttempts: u.unbindAttempts + 1,
              };
            }
            return u;
          }),
        },
      }));
      // increase the unbind count for the other player
      // need to loop through the units and figure the total the opponent has
      // display a counter for reference
    }
  };

  const getUnbindCount = () => {
    const opponent = currentPlayer === 1 ? 2 : 1;
    const opponentUnits = playerInfo[opponent]?.units ?? [];
    return opponentUnits.reduce((acc, unit) => {
      return acc + (unit?.unbindAttempts ?? 0);
    }, 0);
  };

  const handleMiscast = (result: number) => {
    const opponent = currentPlayer === 1 ? 2 : 1;
    // playerInfo[opponent]?.units.map((u) => {
    //   if (unit.id)
    // set damage to unit
    setMiscast(false);
  };

  const handleUnbind = () => {
    const opponent = currentPlayer === 1 ? 2 : 1;
    setPlayerInfo((prev) => ({
      ...prev,
      [opponent]: {
        ...prev[opponent],
        units: prev[opponent].units.map((u) => {
          if (u.id === selectedUnit.id) {
            return {
              ...u,
              unbindsAttempted: u.unbindsAttempted + 1,
            };
          }
          return u;
        }),
      },
    }));
    setUnbound(false);
    setSelectedUnit(null);
  };

  const unitsWithUnbinds =
    playerInfo[currentPlayer === 1 ? 2 : 1]?.units.filter(
      (unit) => unit?.unbindAttempts,
    ) ?? [];
  console.log(unbound);

  return (
    <section className="flex h-full w-full flex-col">
      {stage.stage === 1 && (
        <div className="p-4">
          <h3 className="font-averia text-lg font-bold uppercase text-white">
            Battle Tactic
          </h3>
          <div className="mt-2 flex w-full flex-wrap gap-4">
            <Abilities
              abilities={battleTactics}
              selectHandler={(battleTactic: string) => {
                selectBattleTactic(battleTactic);
                setStage((prev) => ({ ...prev, stage: 2 }));
              }}
            />
          </div>
        </div>
      )}
      {stage.stage === 2 && (
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-averia text-lg font-bold uppercase text-white">
            Heroic Action
          </h3>
          <div className="mt-2 flex h-full items-center justify-evenly gap-10">
            <div className="background-blur-2xl playerOne grid grid-cols-2 place-items-center gap-2 p-4 backdrop-filter">
              {heroicActions.map((ability) => (
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      key={ability.name}
                      disabled={ability?.chosen}
                      className={`${
                        ability.active
                          ? 'text-white shadow-inner ring-rose-400'
                          : 'text-sky-400 shadow-md ring-gray-600'
                      } m-1 flex w-full justify-center rounded-md bg-slate-700/40 p-2 text-xs ring-1 backdrop-blur-2xl transition-colors duration-300 ease-in-out hover:bg-sky-400/70 hover:text-white disabled:opacity-50 disabled:hover:bg-white/10`}
                      onClick={() => handleHeroicAction(1)}
                    >
                      <p className={'font-bold capitalize'}>{ability.name}</p>
                      <TooltipContent>
                        <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                          {ability?.description}
                        </div>
                      </TooltipContent>
                    </button>
                  </TooltipTrigger>
                </Tooltip>
              ))}
            </div>
            <div className="background-blur-2xl playerTwo grid grid-cols-2 place-items-center gap-2 p-4 backdrop-filter">
              {heroicActions.map((ability) => (
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      key={ability.name}
                      disabled={ability?.chosen}
                      className={`${
                        ability.active
                          ? 'text-white shadow-inner ring-rose-400'
                          : 'text-sky-400 shadow-md ring-gray-600'
                      } m-1 flex w-full justify-center rounded-md bg-slate-700/40 p-2 text-xs ring-1 backdrop-blur-2xl transition-colors duration-300 ease-in-out hover:bg-sky-400/70 hover:text-white disabled:opacity-50 disabled:hover:bg-white/10`}
                      onClick={() => handleHeroicAction(2)}
                    >
                      <p className={'font-bold capitalize'}>{ability.name}</p>
                      <TooltipContent>
                        <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                          {ability?.description}
                        </div>
                      </TooltipContent>
                    </button>
                  </TooltipTrigger>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* gather units with the keyword wizard to cast any spells*/}
      {stage.stage === 3 && (
        <div className="relative flex flex-1 flex-col px-4 pb-4">
          <h3 className="sticky top-0 w-full  py-4 font-averia text-lg font-bold uppercase text-white ">
            Cast Spells
          </h3>
          <ul className="grid grid-flow-row-dense grid-cols-2 gap-2">
            {playerInfo[currentPlayer]!.units.filter(
              (unit) => unit.isWizard,
            ).map((unit) => (
              // <GameUnit key={unit.name} unit={unit} showSpells />
              <li className="flex items-center justify-between gap-3 border-l-4 border-l-slate-600 p-4 focus-within:border-l-sky-400">
                <div className="flex flex-col">
                  <h4 className="font-averia text-white underline underline-offset-[5.5px]">
                    {unit.name}
                  </h4>
                  <div className="flex w-full justify-around font-averia text-xs text-white">
                    <span className="font-xs font-bold capitalize">Casts</span>
                    <span className="text-sm">{`${unit?.spellsAttempted}/${unit.spellCastLimit}`}</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {unit.spells.map((spell, i) => (
                    <Popover canDismiss={!miscast}>
                      <PopoverTrigger>
                        <Tooltip key={spell!.name + i}>
                          <TooltipTrigger asChild={false}>
                            <button
                              disabled={
                                unit.spellCastLimit <= unit.spellsAttempted ||
                                !spell.canCast
                              }
                              // onClick={() => handleSpell(spell)}
                              className="flex items-center whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                            >
                              {spell!.name}
                              <div className="ml-1 flex gap-0.5">
                                <div className="ml-0.5 flex">
                                  <SpellIcon />
                                  <span>
                                    {spell?.range ? `${spell.range}"` : '-'}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <DiceIcon />
                                  <span>{spell?.castingValue + '+'}</span>
                                </div>
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                              {spell!.description}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </PopoverTrigger>
                      <PopoverContent className="rounded-md bg-slate-700 p-6 text-white">
                        {/*<PopoverHeading>My popover heading</PopoverHeading>*/}
                        {/*<PopoverDescription>*/}
                        {/*  My popover description*/}
                        {/*</PopoverDescription>*/}
                        {!miscast && !unbound && (
                          <div className="flex w-full justify-evenly gap-2">
                            <PopoverClose
                              onClick={() => {
                                handleSpellAttempted(unit, spell, 'success');
                              }}
                              className="rounded-md border border-slate-400 bg-slate-800/20 px-2 py-1 text-slate-400 hover:border-sky-400/30 hover:text-sky-400"
                            >
                              Success
                            </PopoverClose>
                            <button
                              onClick={() => {
                                handleSpellAttempted(unit, spell, 'miscast');
                              }}
                              className="rounded-md border border-slate-400 bg-slate-800/20 px-2 py-1 text-slate-400 hover:border-sky-400/30 hover:text-sky-400"
                            >
                              Miscast
                            </button>
                            <button
                              onClick={() => {
                                handleSpellAttempted(unit, spell, 'unbound');
                              }}
                              className="rounded-md border border-slate-400 bg-slate-800/20 px-2 py-1 text-slate-400 hover:border-sky-400/30 hover:text-sky-400"
                            >
                              Unbound
                            </button>
                          </div>
                        )}
                        {miscast && (
                          <div className="flex w-full flex-col justify-evenly gap-2 font-averia">
                            <p>Result of D3</p>
                            <div className="flex w-full justify-evenly gap-4">
                              <PopoverClose
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300/20 p-2 text-slate-300 transition-colors duration-200 ease-in-out hover:border-red-500/50 hover:text-red-400 hover:shadow-[0px_0px_10px_1px_rgba(255,_0,_0,_0.5)] focus:outline-none
      "
                                onClick={() => handleMiscast(1)}
                              >
                                1
                              </PopoverClose>
                              <PopoverClose
                                onClick={() => handleMiscast(2)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300/20 p-2 text-slate-300 transition-colors duration-200 ease-in-out hover:border-red-500/50 hover:text-red-400 hover:shadow-[0px_0px_10px_1px_rgba(255,_0,_0,_0.5)] focus:outline-none"
                              >
                                2
                              </PopoverClose>
                              <PopoverClose
                                onClick={() => handleMiscast(3)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300/20 p-2 text-slate-300 transition-colors duration-200 ease-in-out hover:border-red-500/50 hover:text-red-400 hover:shadow-[0px_0px_10px_1px_rgba(255,_0,_0,_0.5)] focus:outline-none"
                              >
                                3
                              </PopoverClose>
                            </div>
                          </div>
                        )}
                        {unbound && (
                          <div className="flex max-w-[200px] flex-col items-center gap-4 text-left text-sm">
                            <p>
                              Select the unit the performed the unbind. Make
                              sure they are within range
                            </p>
                            <Select
                              options={unitsWithUnbinds}
                              placeholder={'Select a unit'}
                              value={selectedUnit}
                              setValue={setSelectedUnit}
                            />
                            {selectedUnit && (
                              <PopoverClose onClick={() => handleUnbind()}>
                                OK
                              </PopoverClose>
                            )}
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </li>
            ))}
          </ul>
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

const SpellIcon = () => (
  <svg
    fill="none"
    height="16"
    width="16"
    viewBox="0 0 150 147"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M29.1996 146.766C27.9644 146.892 26.717 146.724 25.5587 146.278C24.4006 145.83 23.3644 145.116 22.5348 144.192C15.8362 137.26 9.21526 130.253 2.67178 123.171C0.688781 121.02 0.971248 119.133 3.15701 116.707C11.0972 107.895 19.0506 99.0952 27.0171 90.3063C48.0494 67.1269 70.9907 45.871 93.5675 24.2471C101.252 16.8868 108.84 9.42604 116.45 1.98859C117.625 0.796834 119.206 0.0901938 120.878 0.00886453C122.55 -0.0724646 124.192 0.477471 125.477 1.54955C128.106 3.75584 130.6 6.13247 133.06 8.53044C137.425 12.7863 141.93 16.9281 145.986 21.467C150.075 26.0421 151.142 30.7138 146.532 35.7785C123.009 61.6289 98.3828 86.3736 72.6537 110.013C59.9772 121.612 47.1424 133.039 34.3848 144.55C32.8838 145.905 31.4268 147.323 29.1996 146.766ZM121.607 7.91006C83.039 45.0259 44.11 80.8232 9.0522 120.783C16.0105 126.78 22.1111 133.892 30.2853 138.737L34.9303 133.709C34.434 133.315 33.8037 132.872 33.2459 132.355C32.5904 131.757 31.9729 131.119 31.397 130.444C29.7969 128.544 29.5449 126.668 30.6624 125.354C31.9133 123.883 33.8678 123.819 36.0393 125.432C37.5242 126.532 38.8094 127.903 40.2826 129.243C40.9764 128.645 41.6657 128.111 42.2831 127.504C42.9503 126.847 43.5502 126.122 43.788 125.859C42.3304 124.162 41.0976 122.735 39.8745 121.301C38.7 119.923 38.1292 118.415 39.2979 116.784C40.2198 115.496 41.9275 115.309 43.7971 116.448C45.7555 117.642 47.5674 119.076 49.6404 120.546L53.703 116.695C52.9414 116.074 52.2279 115.396 51.5684 114.667C49.2272 111.592 46.8969 108.506 44.6723 105.347C44.4587 105.084 44.3011 104.78 44.209 104.455C44.117 104.128 44.0925 103.787 44.137 103.451C44.1816 103.115 44.2943 102.792 44.4683 102.501C44.6421 102.211 44.8736 101.958 45.1485 101.76C46.3521 100.777 47.6555 101.01 48.8054 101.926C49.5756 102.56 50.3014 103.247 50.9776 103.98C53.4879 106.617 55.9756 109.276 58.6608 112.128L60.9217 109.697C59.604 108.13 58.3738 106.847 57.3548 105.412C55.9393 103.419 56.0326 101.551 57.4041 100.304C58.6699 99.1528 60.4073 99.1956 62.2387 100.65C63.706 101.816 65.0193 103.176 66.7585 104.778L70.2846 100.282C69.0511 99.2674 67.8727 98.1886 66.7539 97.0489C65.1675 95.2868 65.0374 93.5953 66.1301 92.2497C67.2405 90.8826 68.9274 90.6994 70.9454 91.8611C71.8854 92.4472 72.7807 93.1019 73.6235 93.82C74.373 94.4139 75.0733 95.0699 75.7665 95.6728L80.3959 90.8658C78.1492 87.997 75.8753 85.1393 73.6585 82.2381C72.9212 81.2739 72.0389 80.2714 71.7584 79.1518C71.4824 78.0315 71.6392 76.8483 72.1963 75.8381C73.032 74.5876 74.5525 74.6433 75.7555 75.5266C76.7933 76.3497 77.7676 77.2485 78.6707 78.2167C81.1597 80.7021 83.624 83.2121 86.2671 85.8833L89.7006 82.5587C89.0249 81.5776 88.5216 80.8678 88.0409 80.1432C87.4546 79.337 86.9182 78.4958 86.4343 77.6241C85.4483 75.651 85.7061 73.6895 86.9732 72.7582C88.265 71.8095 90.1437 72.145 91.7348 73.7296C92.803 74.7923 93.7579 75.9683 94.8858 77.2311L98.2474 74.0417C97.6377 73.0322 97.1804 72.2933 96.7379 71.5395C96.2501 70.8006 95.8128 70.0287 95.428 69.2309C94.5353 67.101 94.9946 65.1317 96.5151 64.1798C97.9902 63.2545 99.6182 63.5803 101.284 65.203C102.134 66.0312 102.912 66.9339 104.03 68.1326L106.464 65.6627C104.446 62.7488 102.649 60.2303 100.94 57.6549C99.5929 55.6254 99.5417 53.8226 100.657 52.7981C101.899 51.6532 103.883 51.885 105.73 53.5273C106.787 54.5061 107.785 55.5467 108.718 56.6434C109.71 57.7637 110.634 58.9455 111.698 60.2375L115.866 55.5814C114.815 53.3797 113.858 51.5107 113.022 49.5886C112.32 47.9736 112.622 46.4668 114.168 45.5175C115.794 44.5182 117.168 45.3115 118.279 46.5484C119.232 47.6098 120.068 48.7748 121.16 50.1515L124.145 47.0082C123.542 46.1391 123.09 45.5187 122.672 44.8711C122.189 44.1283 121.7 43.3869 121.278 42.6092C120.088 40.4107 120.123 38.7172 121.333 37.7524C122.676 36.6832 124.282 37.1514 126.201 39.1965C127.001 40.0493 127.769 40.9319 128.676 41.9382L131.367 38.8643C130.032 36.8018 128.869 35.0481 127.752 33.2672C126.867 31.9964 126.086 30.6563 125.417 29.26C124.843 27.8917 124.791 26.3168 126.235 25.3681C126.844 24.9617 127.571 24.7714 128.299 24.8277C129.029 24.8841 129.718 25.1839 130.256 25.6789C130.941 26.2412 131.581 26.8555 132.171 27.5167C133.744 29.225 135.285 30.9618 137.004 32.8715L140.068 29.4031L121.607 7.91006Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          fill="white"
          height="147"
          transform="translate(0.777344)"
          width="149"
        />
      </clipPath>
    </defs>
  </svg>
);

const DiceIcon = () => (
  <svg
    viewBox="0 0 512 512"
    height="16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <polyline
      fill="none"
      points="69 153.99 256 263.99 443 153.99"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <line
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      x1="256"
      x2="256"
      y1="463.99"
      y2="263.99"
    />
    <ellipse cx="256" cy="152" rx="24" ry="16" />
    <ellipse cx="208" cy="296" rx="16" ry="24" />
    <ellipse cx="112" cy="328" rx="16" ry="24" />
    <ellipse cx="304" cy="296" rx="16" ry="24" />
    <ellipse cx="400" cy="240" rx="16" ry="24" />
    <ellipse cx="304" cy="384" rx="16" ry="24" />
    <ellipse cx="400" cy="328" rx="16" ry="24" />
  </svg>
);

export default HeroPhase;
