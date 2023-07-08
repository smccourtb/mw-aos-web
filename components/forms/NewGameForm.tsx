'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import MatchTypeSelection from '@/components/inputs/MatchTypeSelection';
import ArmySelectorRadioGroup from '@/components/inputs/ArmySelectorRadioGroup';

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

type NewGameFormProps = {};
const NewGameForm = ({}: NewGameFormProps) => {
  const [openModal, setOpenModal] = React.useState(false);
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
        <div className="flex flex-col items-center">
          <span className="self-start text-lg font-bold">Player 1</span>
          <ArmySelectorRadioGroup
            control={control}
            options={[]}
            label="Army"
            name="army"
            openModal={setOpenModal}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="self-end text-lg font-bold">Player 2</span>
        </div>
      </div>
      <button className="button mt-auto mb-10" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
      {openModal && <></>}
    </>
  );
};

export default NewGameForm;
