import React from 'react';

type SetupProps = {
  setUp: (player: 1 | 2) => void;
};

const Setup = ({ setUp }: SetupProps) => {
  return (
    <section className={'flex flex-col'}>
      <div className="mt-10 flex gap-10 self-center">
        <h2 className="text-2xl font-bold">
          To begin, both players roll off. The winner chooses who deploys first.
          After deployment, the player who finished deploying first can choose
          to take the first or second turn. Which player has priority for the
          first battle round?
        </h2>
        <button
          onClick={() => setUp(1)}
          className="rounded-md bg-sky-900 px-4 py-2 text-white shadow-md"
        >
          Player 1
        </button>
        <button
          onClick={() => setUp(2)}
          className="rounded-md bg-sky-900 px-4 py-2 text-white shadow-md"
        >
          Player 2
        </button>
      </div>
    </section>
  );
};

export default Setup;
