import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useController, UseControllerProps } from 'react-hook-form';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid';

type SelectProps = {
  options: any[];
  multiple?: boolean;
};
const Select = (props: UseControllerProps<any> & SelectProps) => {
  const { field } = useController(props);
  const { value, onChange } = field;
  const label = !props?.multiple
    ? value?.name?.charAt(0).toUpperCase() + value?.name?.slice(1)
    : value
        ?.map(
          (v: { name: string }) =>
            v?.name?.charAt(0).toUpperCase() + v?.name?.slice(1),
        )
        .join(', ');
  return (
    <div className="w-72">
      <Listbox
        value={value}
        onChange={onChange}
        by={'ref'}
        multiple={props?.multiple}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {label || 'Select a faction'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.options.map((option) => (
                <Listbox.Option
                  key={option.ref}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 capitalize ${
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
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
      </Listbox>
    </div>
  );
};

export default Select;