import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';

type LoadoutSelectionProps = {
  options: { id: string; weapons: string[] }[];
  placeholder?: string;
};
const LoadoutSelection = (
  props: UseControllerProps<any> & LoadoutSelectionProps,
) => {
  const { field } = useController(props);
  const { value, onChange } = field;
  const label = value?.weapons?.join(', ');

  return (
    <Listbox value={value} onChange={onChange} by="id">
      {({ open }) => (
        <>
          <div className={'relative h-full w-full'}>
            <Listbox.Button className="relative h-full w-full cursor-default rounded-md bg-transparent py-1 px-3 text-left text-xs shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
              <span className="block truncate capitalize">
                {label || props.placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
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
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {props.options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-1 px-1 pr-3 text-left text-xs capitalize ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.weapons.join(', ')}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pl-0.5 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
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

export default LoadoutSelection;
