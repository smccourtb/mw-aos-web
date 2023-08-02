import React from 'react';
import { Tab } from '@headlessui/react';
import GameDashboardCard from '@/components/game/dashboard/GameDashboardCard';

type GameDashboardTabProps = {
  children: React.ReactNode;
};
const GameDashboardTab = ({ children }: GameDashboardTabProps) => {
  return (
    <Tab
      className={
        'ui-selected:frosted flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300/20 p-2 text-slate-300 ui-selected:border-sky-400/60 ui-selected:text-sky-400 hover:border-indigo-300/50 hover:text-indigo-400 hover:shadow-[0px_0px_10px_1px_rgba(255,_255,_255,_0.5)] focus:outline-none '
      }
    >
      <GameDashboardCard className="">{children}</GameDashboardCard>
    </Tab>
  );
};

export default GameDashboardTab;
