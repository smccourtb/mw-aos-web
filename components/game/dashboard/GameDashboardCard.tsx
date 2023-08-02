import React, { useState } from 'react';

type GameDashboardCardProps = {
  children: React.ReactNode;
  className?: string;
};
const GameDashboardCard = ({ children, className }: GameDashboardCardProps) => {
  return (
    <div
      className={`frosted flex-1 overflow-hidden overflow-y-auto rounded-lg bg-gray-800/50 shadow-2xl backdrop-blur-sm backdrop-filter transition-all duration-200 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

export default GameDashboardCard;
