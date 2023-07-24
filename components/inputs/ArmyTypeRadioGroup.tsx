import { RadioGroup } from '@headlessui/react';
import React from 'react';
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
    <RadioGroup value={value} onChange={onChange} className="w-full">
      <RadioGroup.Label className="w-full self-center text-lg font-bold">
        {props?.label}
      </RadioGroup.Label>
      <div className="flex w-full items-center justify-between gap-2">
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
                    relative flex cursor-pointer rounded-md px-2 py-1 text-sm shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <div className="flex select-none items-center text-sm">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium capitalize ${
                    checked ? 'text-white' : 'text-gray-500'
                  } ${active ? 'text-sky-400' : ''} `}
                >
                  {option}
                </RadioGroup.Label>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ArmyTypeRadioGroup;
