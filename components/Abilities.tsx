import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';

type AbilitiesProps = {
  abilities: {
    name: string;
    text?: string;
    description?: string;
    active: boolean;
    chosen: boolean;
  }[];
};
const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <div className="flex flex-wrap justify-start px-1">
      {abilities.map((ability) => (
        <Tooltip>
          <TooltipTrigger>
            <button
              key={ability.name}
              disabled={ability?.chosen}
              className={`${
                ability.active ? 'shadow-inner' : 'shadow-md'
              } m-1 flex rounded-md bg-white/10 p-2 text-xs text-sky-400 ring-1 ring-gray-600 transition-colors duration-300 ease-in-out hover:bg-sky-400/70 hover:text-white disabled:opacity-50`}
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

export default Abilities;
