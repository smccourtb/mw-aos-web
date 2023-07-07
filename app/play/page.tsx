import React from 'react';
import NewGameButton from '@/components/buttons/NewGameButton';
export default async function PlayPage() {
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameButton>Start a new game</NewGameButton>
    </div>
  );
}
