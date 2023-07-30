import React from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import {
  ArrowsExpandIcon,
  ChevronUpIcon,
  MinusIcon,
} from '@heroicons/react/outline';
import CommandAbilities from '@/components/CommandAbilities';

import UnitCard from '@/components/UnitCard';
import { useGameContext } from '@/context/GameContext';
type PlayerDashboardProps = {
  maximized: boolean;
  setMaximize: React.Dispatch<React.SetStateAction<boolean>>;
  player: 1 | 2;
};
const PlayerDashboard = ({
  maximized,
  setMaximize,
  player,
}: PlayerDashboardProps) => {
  const { gameInfo, playerInfo } = useGameContext();
  return (
    <div
      className={`${
        maximized ? 'w-4/5' : 'w-1/5 flex-shrink-0'
      } my-10 h-fit max-h-[90%] overflow-hidden rounded-lg bg-gray-800/50 shadow-2xl transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex h-fit max-h-screen flex-col rounded-md border-t-4 ${
          player === 1 ? 'border-sky-400' : 'border-rose-400'
        } py-4 px-1`}
      >
        {/* Expand Button */}
        <button
          className={`${
            player === 1 ? 'mr-2 self-end' : 'ml-2 self-start'
          } mb-2 text-indigo-300`}
          onClick={() => setMaximize((prev) => !prev)}
        >
          {!maximized ? (
            <ArrowsExpandIcon className={'h-5 w-5'} />
          ) : (
            <MinusIcon className={'h-5 w-5 '} />
          )}
        </button>
        {/* Data Disclosures */}
        <div className="mb-20 flex w-full flex-wrap overflow-y-auto transition-all duration-300 ease-in-out scrollbar-none scrollbar-track-gray-900/90 scrollbar-thumb-gray-800 hover:scrollbar-thin">
          <BattleTacticsDisclosure maximized={maximized} player={player} />
          <PlayerDashboardSection
            maximized={maximized}
            label={'Command Abilities'}
          >
            <CommandAbilities
              abilities={
                playerInfo[player].commandAbilities[gameInfo.phase] ?? []
              }
            />
          </PlayerDashboardSection>
          <PlayerDashboardSection maximized={maximized} label={'Army Roster'}>
            <div className="flex w-full min-w-0 flex-col gap-4 overflow-hidden p-4">
              {playerInfo[player].units.map((unit) => (
                <UnitCard unit={unit} />
              ))}
            </div>
          </PlayerDashboardSection>
        </div>
      </div>
    </div>
  );
};

const DisclosureButton = ({
  label,
  open,
}: {
  label: string;
  open: boolean;
}) => (
  <Disclosure.Button
    className={`flex w-full justify-between rounded-lg bg-white/10 p-2 px-4 py-2 text-left text-sm font-medium font-bold text-sky-400 hover:bg-white/20 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
  >
    <span className="font-bold">{label}</span>
    <ChevronUpIcon
      className={`${
        open ? 'rotate-180 transform' : ''
      } h-5 w-5 text-sky-300 transition-all duration-300 ease-in-out`}
    />
  </Disclosure.Button>
);

const BattleTacticsDisclosure = ({
  maximized,
  player,
}: {
  maximized: boolean;
  player: 1 | 2;
}) => {
  const { playerInfo } = useGameContext();
  return (
    <PlayerDashboardSection maximized={maximized} label={'Battle Tactics'}>
      <CommandAbilities abilities={playerInfo[player].battleTactics ?? []} />
    </PlayerDashboardSection>
  );
};

const PlayerDashboardSection = ({
  children,
  maximized,
  label,
}: {
  children: React.ReactNode;
  maximized: boolean;
  label: string;
}) => (
  <Disclosure>
    {({ open }) => (
      <div className={`flex flex-col ${maximized ? 'w-1/2' : 'w-full'} p-2`}>
        <DisclosureButton open={open} label={label} />
        <Transition
          enter="transition duration-300 ease-out pointer-events-none"
          enterFrom="transform scale-y-0 opacity-0 -translate-y-1/2 "
          enterTo="transform scale-y-100 opacity-100 translate-y-0 z-0"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="mx-1 rounded-b-md bg-gray-800/40 px-2 py-4 text-sm">
            {children}
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
);
export default PlayerDashboard;
