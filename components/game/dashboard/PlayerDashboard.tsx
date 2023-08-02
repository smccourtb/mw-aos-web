import React, { useEffect, useState } from 'react';

import { Disclosure, RadioGroup, Transition } from '@headlessui/react';
import {
  ArrowsExpandIcon,
  ChevronUpIcon,
  MinusIcon,
} from '@heroicons/react/outline';

import UnitCard from '@/components/UnitCard';
import { useGameContext } from '@/context/GameContext';
import Abilities from '@/components/Abilities';
import GameDashboardCard from '@/components/game/dashboard/GameDashboardCard';
type PlayerDashboardProps = {
  expanded?: boolean;
  isExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  player: 1 | 2;
};
const PlayerDashboard = ({ player }: PlayerDashboardProps) => {
  const { playerInfo } = useGameContext();
  console.log('playerInfo[player]', playerInfo[player]);

  return (
    <GameDashboardCard>
      <div
        className={`flex flex-col rounded-md border-t-4 ${
          player === 1 ? 'border-sky-400' : 'border-rose-400'
        } py-4 px-1`}
      >
        <div className="mb-20 flex w-full flex-wrap overflow-y-auto transition-all duration-300 ease-in-out scrollbar-none scrollbar-track-gray-900/90 scrollbar-thumb-gray-800 hover:scrollbar-thin">
          <BattleTacticsDisclosure player={player} />
          <CommandAbilitiesDisclosure player={player} />
          <PlayerDashboardSection label={'Army Roster'}>
            <div className="flex w-full min-w-0 flex-col gap-4 overflow-hidden p-4">
              {playerInfo[player].units.map((unit) => {
                return <UnitCard key={unit.id} unit={unit} />;
              })}
            </div>
          </PlayerDashboardSection>
        </div>
      </div>
    </GameDashboardCard>
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

const BattleTacticsDisclosure = ({ player }: { player: 1 | 2 }) => {
  const { playerInfo } = useGameContext();
  return (
    <PlayerDashboardSection label={'Battle Tactics'}>
      <Abilities
        abilities={playerInfo[player].battleTactics ?? []}
        selectHandler={() => {}}
      />
    </PlayerDashboardSection>
  );
};
const CommandAbilitiesDisclosure = ({ player }: { player: 1 | 2 }) => {
  const { playerInfo, gameInfo } = useGameContext();
  const [value, setValue] = React.useState<string | null>(null);
  const [commandAbilities, setCommandAbilities] = useState(
    playerInfo[player].commandAbilities[gameInfo.phase] ?? [],
  );

  useEffect(() => {
    if (value === 'All') {
      setCommandAbilities(
        Object.values(playerInfo[player].commandAbilities).flat(),
      );
    } else {
      setCommandAbilities(
        playerInfo[player].commandAbilities[gameInfo.phase] ?? [],
      );
    }
  }, [value]);

  return (
    <PlayerDashboardSection label={'Command Abilities'}>
      <RadioGroup
        value={value}
        onChange={setValue}
        className="mb-2 self-center"
      >
        <div className="flex w-full items-center justify-center gap-2">
          {['Available', 'All'].map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ checked }) =>
                `${checked ? 'font-bold text-white' : 'text-white/50'}
                    relative flex cursor-pointer px-2 py-1 text-xs focus:outline-none`
              }
            >
              <div className="flex select-none items-center text-sm transition-all duration-300 ease-in-out">
                <RadioGroup.Label
                  as="p"
                  className={`whitespace-nowrap text-xs capitalize`}
                >
                  {option}
                </RadioGroup.Label>
              </div>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <Abilities abilities={commandAbilities} selectHandler={() => {}} />
    </PlayerDashboardSection>
  );
};

const PlayerDashboardSection = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <Disclosure>
    {({ open }) => (
      <div className={`flex w-full flex-col p-2`}>
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
