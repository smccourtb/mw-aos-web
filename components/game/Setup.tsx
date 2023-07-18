import React from 'react';
import PlayerRadioGroup from '@/components/inputs/PlayerRadioGroup';

type SetupProps = {
  setPlayer: React.Dispatch<React.SetStateAction<1 | 2 | null>>;
  currentPlayer: 1 | 2 | null;
};

const Setup = ({ setPlayer, currentPlayer }: SetupProps) => {
  return (
    <section className={'flex flex-col'}>
      <PlayerRadioGroup
        options={[1, 2]}
        setPlayer={setPlayer}
        player={currentPlayer}
        label="To begin, both players roll off. The winner chooses who deploys first. After deployment, the player who finished deploying first can choose to take the first or second turn. Which player has priority for the first battle round?"
      />
      <div className="mt-10"></div>
    </section>
  );
};

export default Setup;
