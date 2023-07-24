'use client';
import React, { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { DocumentAddIcon, DocumentRemoveIcon } from '@heroicons/react/outline';
import { sanitizeInput } from '@/utils/input-helpers';
import AlertDatabaseError from '@/components/AlertDatabaseError';
import Input from '@/components/inputs/Input';
import { Faction } from '@/types/firestore/factions';

type FirestoreFactionFormProps = {
  factions: Faction[];
};

type FormValues = {
  faction: string;
};
const FirestoreFactionForm = ({ factions }: FirestoreFactionFormProps) => {
  const [submissionFailed, setSubmissionFailed] = useState(false);
  // used to check if faction already exists in the database
  const factionNames = factions.map((faction) => faction.name);

  const { handleSubmit, control, reset, formState, setError, setFocus } =
    useForm<FormValues>({
      defaultValues: {
        faction: '',
      },
      mode: 'onSubmit',
    });

  const handleAdd = async (data: FormValues) => {
    const sanitizedfaction = sanitizeInput(data.faction);
    const factionExists = factionNames.includes(sanitizedfaction);
    // check if faction already exists in the database
    if (factionExists) {
      setError('faction', {
        type: 'custom',
        message: `${data.faction} already exists in the database`,
      });
      setFocus('faction');
      return;
    }
    // call api to add faction to database
    const response = await fetch('/api/firestore/add-faction', {
      method: 'POST',
      body: sanitizedfaction,
    });
    // if api call fails, alert user
    if (!response.ok) {
      setSubmissionFailed(true);
    }
    reset();
  };

  const handleDelete = async (data: FormValues) => {
    const sanitizedFaction = sanitizeInput(data.faction);
    // get the ref of the faction to be deleted
    const factionRef = factions.find(
      (faction) => faction.name === sanitizedFaction,
    )?.ref;
    // check if faction exists in the database. If not, throw error
    if (!factionRef) {
      setError('faction', {
        type: 'custom',
        message: `${data.faction} does not exist in the database`,
      });
      setFocus('faction');
      return;
    }
    // call api to delete faction from database
    const response = await fetch('/api/firestore/delete-faction', {
      method: 'POST',
      body: factionRef,
    });
    // if api call fails, alert user
    if (!response.ok) {
      setSubmissionFailed(true);
    }
    reset();
  };

  return (
    <>
      <div className="flex w-fit gap-4 pt-2 pb-5">
        <Input
          control={control as Control<FormValues>}
          name="faction"
          label="Faction"
          rules={{
            required: true,
            minLength: 4,
            maxLength: 30,
          }}
        />
        {/* add button */}
        <button
          onClick={handleSubmit(handleAdd)}
          disabled={formState.isSubmitting}
          className="flex items-center justify-center rounded-md bg-blue-700 px-2 py-1 font-bold text-white disabled:opacity-50"
        >
          <DocumentAddIcon className="h-5 w-5" />
        </button>
        {/* delete button */}
        <button
          onClick={handleSubmit(handleDelete)}
          disabled={formState.isSubmitting}
          className="flex items-center justify-center rounded-md border border-2 border-blue-300 px-2 py-1 font-bold text-blue-500 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <DocumentRemoveIcon className="h-5 w-5" />
        </button>
      </div>
      {submissionFailed && (
        <AlertDatabaseError
          setIsOpen={setSubmissionFailed}
          isOpen={submissionFailed}
        />
      )}
    </>
  );
};

export default FirestoreFactionForm;
