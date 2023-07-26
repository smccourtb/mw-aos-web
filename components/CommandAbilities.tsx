import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';

type CommandAbilitiesProps = {
  abilities: { name: string; text?: string; description?: string }[];
};
const CommandAbilities = ({ abilities }: CommandAbilitiesProps) => {
  return (
    <div className="flex h-full flex-col gap-3 px-3">
      <h3 className="text-lg font-bold">Command Abilities</h3>
      {abilities.map((ability) => (
        <button
          key={ability.name}
          className="min-w-1/4 flex flex-col rounded-md border border-gray-500 p-2 shadow-md"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <Tooltip>
            <TooltipTrigger>
              <p className={'font-bold capitalize'}>{ability.name}</p>
              <TooltipContent>
                <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                  {ability?.text || ability?.description}
                </div>
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </button>
      ))}
    </div>
  );
};

export default CommandAbilities;
