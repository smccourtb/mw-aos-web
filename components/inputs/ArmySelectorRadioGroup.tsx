import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';
import type { PlayerArmy } from '@/components/firestore/types';

type ArmySelectorRadioGroupProps = {
  options: PlayerArmy[];
  label?: string;
};

const ArmySelectorRadioGroup = (
  props: UseControllerProps<any> & ArmySelectorRadioGroupProps,
) => {
  const { field } = useController(props);
  const { value, onChange } = field;

  return (
    <div className="mx-auto mb-4 flex w-full max-w-md flex-col items-center">
      <RadioGroup value={value} onChange={onChange} by="id">
        <RadioGroup.Label className="w-full self-center text-lg font-bold">
          {props?.label}
        </RadioGroup.Label>
        <div className="flex flex-col items-center justify-between">
          {props.options.map((option) => (
            <RadioGroup.Option
              key={option.id}
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
                          {option.factionName}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? 'text-sky-100' : 'text-gray-500'
                          }`}
                        >
                          <span>
                            {option.units.reduce(
                              (acc, unit) => acc + unit.points,
                              0,
                            )}
                          </span>
                        </RadioGroup.Description>
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

export default ArmySelectorRadioGroup;
