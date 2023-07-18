import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

type PlayerRadioGroupProps = {
  options: number[];
  label?: string;
  setPlayer: React.Dispatch<React.SetStateAction<1 | 2 | null>>;
  player: 1 | 2 | null;
};

const PlayerRadioGroup = ({
  setPlayer,
  player,
  label,
  options,
}: PlayerRadioGroupProps) => {
  return (
    <div className="flex gap-4">
      <RadioGroup value={player} onChange={setPlayer}>
        <RadioGroup.Label className="text-lg font-bold">
          {label}
        </RadioGroup.Label>
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          {options.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : ''
                }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center ">
                      <div className="flex select-none flex-col items-start gap-2 text-sm  ">
                        <RadioGroup.Label
                          as="p"
                          className={`mr-4 font-medium capitalize ${
                            checked ? 'text-white' : 'text-gray-900'
                          } ${active ? 'text-sky-400' : 'text-gray-500'} `}
                        >
                          {`Player ${option}`}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckCircleIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PlayerRadioGroup;
