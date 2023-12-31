import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import ArmyBuilderForm from '@/components/forms/ArmyBuilderForm';
import { FactionName, PlayerArmy, Unit } from '@/components/firestore/types';

type ArmyBuilderModalProps = {
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    armyData: {
      factions: string[];
      units: {
        [K in FactionName]: Unit[];
      };
    };
    pointLimit: number | null;
  };
  setArmies: {
    setArmy: React.Dispatch<React.SetStateAction<PlayerArmy[]>>;
    currentPlayer: 1 | 2;
  };
};
const ArmyBuilderModal = ({
  isOpen,
  closeModal,
  data,
  setArmies,
}: ArmyBuilderModalProps) => {
  const { pointLimit, armyData } = data;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

        <div className="fixed inset-0">
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
              <Dialog.Panel className="md:2/3 h-[700px] w-5/6 transform overflow-y-auto rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <ArmyBuilderForm
                  factionNames={armyData.factions}
                  units={armyData.units}
                  pointLimit={pointLimit}
                  closeModal={closeModal}
                  setArmies={setArmies}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArmyBuilderModal;
