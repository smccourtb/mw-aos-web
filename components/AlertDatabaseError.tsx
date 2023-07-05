import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

type AlertDatabaseErrorProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};
const AlertDatabaseError = ({ isOpen, setIsOpen }: AlertDatabaseErrorProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full w-fit transform flex-col items-center gap-4 overflow-hidden rounded bg-white p-2 text-left align-middle shadow-xl transition-all md:flex-row">
                <Dialog.Title
                  as="h3"
                  className="flex items-center gap-1 self-start font-medium leading-6 text-gray-900"
                >
                  {<ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                  {` `}
                  Error
                </Dialog.Title>
                <p className="text-sm text-gray-500">
                  There was an error connecting to the database. Please try
                  again later.
                </p>

                <button
                  type="button"
                  className="inline-flex justify-center self-end rounded-md px-2 py-1 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  OK
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertDatabaseError;
