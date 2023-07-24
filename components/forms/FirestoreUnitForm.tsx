'use client';
import React, { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import AlertDatabaseError from '@/components/AlertDatabaseError';
import Select from '@/components/inputs/Select';
import Input from '@/components/inputs/Input';
import InputArray from '@/components/forms/InputArray';
import { Faction } from '@/types/firestore/factions';

type FirestoreUnitFormProps = {
  factions: Faction[];
};

type FormValues = {
  faction: string;
  unitName: string;
  role: string[];
  baseStats: {
    wounds: number | '';
    move: number | '';
    save: number | '';
    bravery: number | '';
  };
  points: number | '';
  unitSize: number | '';
  weapons: {
    name: string;
    type: string;
    stats: {
      range: number | '';
      attacks: number | '';
      toHit: number | '';
      toWound: number | '';
      rend: number | '';
      damage: number | '';
    };
    required: boolean;
  }[];
};

// TODO: add confirmation modal for delete
const FirestoreUnitForm = ({ factions }: FirestoreUnitFormProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      faction: '',
      unitName: '',
      role: [],
      baseStats: {
        wounds: '',
        move: '',
        save: '',
        bravery: '',
      },
      points: '',
      unitSize: '',
      weapons: [
        {
          name: '',
          type: '',
          stats: {
            range: '',
            attacks: '',
            toHit: '',
            toWound: '',
            rend: '',
            damage: '',
          },
          required: false,
        },
      ],
    },
    mode: 'all',
  });

  const [submissionFailed, setSubmissionFailed] = useState(false);
  // used to check if faction already exists in the database

  const handleAdd = async (data: FormValues) => {
    console.log('data', data);

    // call api to add unit to database
    const response = await fetch('/api/firestore/add-unit', {
      method: 'POST',
      body: '',
    });
    // if api call fails, alert user
    if (!response.ok) {
      setSubmissionFailed(true);
    }
    reset();
  };

  return (
    <div className="m-5 grid grid-cols-12 gap-5">
      {/* Faction */}
      <div className="col-span-12 row-span-2 w-2/12 place-self-center">
        <Select
          control={control as Control<FormValues>}
          rules={{ required: true }}
          name="faction"
          placeholder="Select Faction"
          options={factions.map((faction) => faction.name)}
        />
      </div>
      {/* Base Info */}
      <div className="col-span-6 row-span-3 grid grid-cols-2 gap-y-5 gap-x-2">
        <p className="text-md col-span-full font-bold">General</p>
        <Input
          name={'unitName'}
          label={'Unit Name'}
          control={control as Control<FormValues>}
          rules={{ required: true, minLength: 1, maxLength: 50 }}
        />
        <Input
          name={'points'}
          label={'Points'}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          type={'number'}
        />
        <Input
          name={'unitSize'}
          label={'Unit Size'}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          type={'number'}
        />
        <Select
          name={'role'}
          placeholder={'Role'}
          options={['Battleline', 'Leader', 'Behemoth', 'Artillery', 'None']}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          multiple
        />
      </div>
      {/* Stats */}
      <div className="col-span-6 row-span-3 grid grid-cols-2 gap-y-5 gap-x-2">
        <p className="text-md col-span-full font-bold">Stats</p>
        <Input
          name={'baseStats.move'}
          label={'Move'}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          type={'number'}
        />
        <Input
          name={'baseStats.save'}
          label={'Save'}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          type={'number'}
        />
        <Input
          name={'baseStats.bravery'}
          label={'Bravery'}
          control={control as Control<FormValues>}
          rules={{
            required: true,
            maxLength: { value: 2, message: 'No more than 2 digits' },
          }}
          type={'number'}
        />
        <Input
          name={'baseStats.wounds'}
          label={'Wounds'}
          control={control as Control<FormValues>}
          rules={{ required: true }}
          type={'number'}
        />
      </div>
      {/* Weapons */}
      <InputArray
        control={control}
        name={'weapons'}
        defaultValues={{
          name: '',
          type: '',
          stats: {
            range: '',
            attacks: '',
            toHit: '',
            toWound: '',
            rend: '',
            damage: '',
          },
          required: false,
        }}
      />
      {submissionFailed && (
        <AlertDatabaseError
          setIsOpen={setSubmissionFailed}
          isOpen={submissionFailed}
        />
      )}
      <button onClick={handleSubmit(handleAdd)} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default FirestoreUnitForm;
