import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';

type GrandStrategyRadioGroupProps = {
  options: { name: string; description: string }[];
  label?: string;
};

const GrandStrategyRadioGroup = (
  props: UseControllerProps<any> & GrandStrategyRadioGroupProps,
) => {
  const { field } = useController(props);
  const { value, onChange } = field;

  return (
    <div className="mx-auto mb-4 flex w-full flex-col items-center">
      <RadioGroup value={value} onChange={onChange} by="name">
        <RadioGroup.Label className="w-full self-center text-lg font-bold">
          {props?.label}
        </RadioGroup.Label>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {props.options.map((option) => (
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <RadioGroup.Option
                  key={option.name}
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
                    relative flex cursor-pointer justify-center rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center">
                        <div className="flex items-center">
                          <div className="flex select-none flex-col items-start gap-2 text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium capitalize ${
                                checked ? 'text-white' : 'text-gray-900'
                              } ${active ? 'text-sky-400' : 'text-gray-500'} `}
                            >
                              {option.name}
                            </RadioGroup.Label>

                            {/*<RadioGroup.Description*/}
                            {/*  as="span"*/}
                            {/*  className={`inline ${*/}
                            {/*    checked ? 'text-sky-100' : 'text-gray-500'*/}
                            {/*  }`}*/}
                            {/*>*/}
                            {/*  <span>{option.description}</span>*/}
                            {/*</RadioGroup.Description>*/}
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
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-gray-100">
                  {option.description}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default GrandStrategyRadioGroup;
