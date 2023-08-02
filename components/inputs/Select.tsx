import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { PlayerArmyUnit } from '@/firestore/types';

type SelectProps = {
  options: PlayerArmyUnit[];
  placeholder?: string;
  value: PlayerArmyUnit | null;
  setValue: (value: PlayerArmyUnit) => void;
};
const Select = ({ options, placeholder, value, setValue }: SelectProps) => {
  const label = value?.name;

  return (
    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <div className={'relative h-full w-full text-black'}>
            <Listbox.Button className="relative h-full w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{label || placeholder}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {open ? (
                  <ChevronUpIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative w-full cursor-default select-none py-2 pl-10 pr-4 capitalize ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex w-full">
                        <span
                          className={`flex w-full justify-between  truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          <span>{option.name}</span>
                          <span>{`${option.unbindsAttempted}/${option.unbindAttempts}`}</span>
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
