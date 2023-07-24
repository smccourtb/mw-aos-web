import React from 'react';

type CommandAbilitiesProps = {
  abilities: { name: string; text?: string; description?: string }[];
};
const CommandAbilities = ({ abilities }: CommandAbilitiesProps) => {
  return (
    <div className="flex h-full flex-col gap-3 px-3">
      <h3 className="text-lg font-bold">Command Abilities</h3>
      {abilities.map((ability) => (
        <div
          key={ability.name}
          className={'flex flex-col border-b border-gray-400 pb-2'}
        >
          <p className={'font-bold capitalize'}>{ability.name}</p>
          <p className="pl-2 text-sm">
            {ability?.text || ability?.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommandAbilities;
