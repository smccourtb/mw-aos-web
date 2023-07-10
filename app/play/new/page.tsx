import React from 'react';
import NewGameForm from '@/components/forms/NewGameForm';
import { getAllUnits } from '@/components/firestore/units';

const getArmyBuilderData = async () => {
  const units = await getAllUnits();
  const factions = Object.keys(units);
  return {
    factions,
    units,
  };
};
export default async function PlayPage() {
  const armyBuilderData = await getArmyBuilderData();
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameForm armyBuilderData={armyBuilderData} />
    </div>
  );
}
