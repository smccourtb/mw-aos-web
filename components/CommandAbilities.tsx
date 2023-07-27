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
    <div className="mb-4 flex flex-col gap-3 px-3">
      <h3 className="font-bold">Command Abilities</h3>
      {abilities.map((ability) => (
        <Tooltip>
          <TooltipTrigger>
            <button
              key={ability.name}
              className="flex w-full flex-col rounded-md border border-gray-500 p-2 text-xs shadow-md"
              onClick={() => {
                console.log('clicked');
              }}
            >
              <p className={'font-bold capitalize'}>{ability.name}</p>
              <TooltipContent>
                <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                  {ability?.text || ability?.description}
                </div>
              </TooltipContent>
            </button>
          </TooltipTrigger>
        </Tooltip>
      ))}
    </div>
  );
};

export default CommandAbilities;
