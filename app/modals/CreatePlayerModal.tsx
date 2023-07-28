import React, { useState } from 'react';
import ModalWrapper from '@/app/modals/ModalWrapper';
import FirebaseSignUpForm from '@/components/forms/FirebaseSignUpForm';
import { PlayerArmy } from '@/firestore/types';

type CreatePlayerModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpponent: (player: {
    user: string;
    isLocal: boolean;
    armies: PlayerArmy[];
  }) => void;
};
const CreatePlayerModal = ({
  isOpen,
  setIsOpen,
  handleOpponent,
}: CreatePlayerModalProps) => {
  const [createNewPlayer, setCreateNewPlayer] = useState<boolean>(false);
  return (
    <ModalWrapper isOpen={isOpen} closeModal={setIsOpen}>
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6">
        An opponent has not been set yet.
        {!createNewPlayer && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCreateNewPlayer(true)}
              className="rounded-md bg-green-500 px-2 py-1 text-white"
            >
              Create New User
            </button>
            <button
              onClick={() => {
                const player = createLocalPlayer();
                handleOpponent(player);
                setIsOpen(false);
              }}
              className="rounded-md bg-red-500 px-2 py-1 text-white"
            >
              Create Guest User
            </button>
          </div>
        )}
        {createNewPlayer && (
          <div className="h-52 overflow-y-auto">
            <FirebaseSignUpForm />
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

const createLocalPlayer = () => {
  const playerId = crypto.randomUUID();
  const guest = {
    user: playerId,
    armies: [] as PlayerArmy[],
    isLocal: true,
  };
  localStorage.setItem('guest', JSON.stringify(guest));

  return guest;
};
export default CreatePlayerModal;
