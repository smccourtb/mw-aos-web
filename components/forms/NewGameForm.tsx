'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MatchTypeSelection from '@/components/inputs/MatchTypeSelection';
import ArmySelectorRadioGroup from '@/components/inputs/ArmySelectorRadioGroup';
import { FactionName, PlayerArmy, Unit } from '@/components/firestore/types';
import ArmyBuilderModal from '@/app/modals/ArmyBuilderModal';

type FormValues = {
  type: string;
  points: string | null;
  playerOne: {
    army: {} | null;
    playerId: string;
  };
  playerTwo: {
    army: {} | null;
    playerId: string;
  };
};

type NewGameFormProps = {
  armyBuilderData: {
    factions: string[];
    units: { [K in FactionName]: Unit[] };
  };
  userArmies: PlayerArmy[];
};

const NewGameForm = ({ armyBuilderData, userArmies }: NewGameFormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [playerOneArmies, setPlayerOneArmies] =
    useState<PlayerArmy[]>(userArmies);
  const [playerTwoArmies, setPlayerTwoArmies] = useState<PlayerArmy[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  // TODO: we can prompt player 2 to enter their email to get their armies but for now we will just keep it local

  const defaultValues = {
    type: 'Matched Play',
    points: null,
    playerOne: {
      army: null,
      playerId: '',
    },
    playerTwo: {
      army: null,
      playerId: '',
    },
  };
  const onSubmit = (data: FormValues) => console.log(data);

  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });
  const watchType = watch('type');
  const points = watch('points');

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="col-span-2">
          <MatchTypeSelection
            label="Match Type"
            control={control}
            rules={{ required: true }}
            name="type"
            options={['Matched Play', 'Open Play', 'Narrative Play']}
          />
        </div>

        {/*points*/}
        {watchType.includes('Matched') && (
          <div className="col-span-2">
            <MatchTypeSelection
              label="Points"
              name="points"
              options={['1000', '1500', '2000', '2500', '3000']}
              control={control}
            />
          </div>
        )}
        {/*player 1*/}
        <div className="flex flex-col items-center">
          <span className="self-start text-lg font-bold">Player 1</span>
          <ArmySelectorRadioGroup
            control={control}
            options={playerOneArmies}
            label="Army"
            name="playerOne.army"
          />
          <button
            className="button"
            onClick={() => {
              setCurrentPlayer(1);
              setOpenModal(true);
            }}
          >
            Build Army
          </button>
        </div>
        {/*player 2*/}
        <div className="flex flex-col items-center">
          <span className="self-end text-lg font-bold">Player 2</span>
          <div className="flex flex-col items-center">
            <ArmySelectorRadioGroup
              control={control}
              options={playerTwoArmies}
              label="Army"
              name="playerTwo.army"
            />
            <button
              className="button"
              onClick={() => {
                setCurrentPlayer(2);
                setOpenModal(true);
              }}
            >
              Build Army
            </button>
          </div>
        </div>
      </div>
      {/*submit form*/}
      <button className="button mt-auto mb-10" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
      {openModal && (
        <ArmyBuilderModal
          isOpen={openModal}
          closeModal={setOpenModal}
          setArmies={{
            setArmy:
              currentPlayer === 1 ? setPlayerOneArmies : setPlayerTwoArmies,
            currentPlayer,
          }}
          data={{
            armyData: armyBuilderData,
            pointLimit: Number(points) || null,
          }}
        />
      )}
    </>
  );
};

export default NewGameForm;
