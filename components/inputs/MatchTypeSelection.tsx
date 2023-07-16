import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';

type MatchTypeSelectionProps = {
  options: { value: number | string; label: string }[];
  label?: string;
};

const MatchTypeSelection = (
  props: UseControllerProps<any> & MatchTypeSelectionProps,
) => {
  const { field } = useController(props);
  const { value, onChange } = field;

  return (
    <div className="mx-auto w-full max-w-md">
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="text-lg font-bold">
          {props?.label}
        </RadioGroup.Label>
        <div className="flex items-center justify-between">
          {props.options.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
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
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`select-none font-medium ${
                            checked ? 'text-white' : 'text-gray-900'
                          } ${active ? 'text-sky-400' : 'text-gray-500'} `}
                        >
                          {option.label}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? 'text-sky-100' : 'text-gray-500'
                          }`}
                        ></RadioGroup.Description>
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

export default MatchTypeSelection;
