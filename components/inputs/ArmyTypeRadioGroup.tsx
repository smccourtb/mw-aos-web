import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';

type ArmyTypeRadioGroupProps = {
  options: string[];
  label?: string;
};

const ArmyTypeRadioGroup = (
  props: UseControllerProps<any> & ArmyTypeRadioGroupProps,
) => {
  const { field } = useController(props);
  const { value, onChange } = field;

  return (
    <div className="mx-auto flex items-center gap-2">
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="w-full self-center text-lg font-bold">
          {props?.label}
        </RadioGroup.Label>
        <div className="flex items-center justify-between gap-2">
          {props.options.map((option) => (
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
                    relative flex cursor-pointer rounded-lg px-2 py-1 text-sm shadow-md focus:outline-none`
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
                          {option}
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

export default ArmyTypeRadioGroup;
