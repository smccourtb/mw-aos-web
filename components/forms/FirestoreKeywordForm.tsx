'use client';
import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import { Control, useForm } from 'react-hook-form';
import { DocumentAddIcon, DocumentRemoveIcon } from '@heroicons/react/outline';
import { sanitizeInput } from '@/utils/input-helpers';
import AlertDatabaseError from '@/components/AlertDatabaseError';

type AddKeywordProps = {
  keywords: { ref: string; name: string }[];
};

type FormValues = {
  keyword: string;
};
const FirestoreKeywordForm = ({ keywords }: AddKeywordProps) => {
  const [submissionFailed, setSubmissionFailed] = useState(false);
  // used to check if keyword already exists in the database
  const keywordNames = keywords.map((keyword) => keyword.name);

  const { handleSubmit, control, reset, formState, setError, setFocus } =
    useForm<FormValues>({
      defaultValues: {
        keyword: '',
      },
      mode: 'onSubmit',
    });

  const handleAdd = async (data: FormValues) => {
    const sanitizedKeyword = sanitizeInput(data.keyword);
    const keywordExists = keywordNames.includes(sanitizedKeyword);
    // check if keyword already exists in the database
    if (keywordExists) {
      setError('keyword', {
        type: 'custom',
        message: `${data.keyword} already exists in the database`,
      });
      setFocus('keyword');
      return;
    }
    // call api to add keyword to database
    const response = await fetch('/api/firestore/add-keyword', {
      method: 'POST',
      body: sanitizedKeyword,
    });
    // if api call fails, alert user
    if (!response.ok) {
      setSubmissionFailed(true);
    }
    reset();
  };

  const handleDelete = async (data: FormValues) => {
    const sanitizedKeyword = sanitizeInput(data.keyword);
    // get the ref of the keyword to be deleted
    const keyWordRef = keywords.find(
      (keyword) => keyword.name === sanitizedKeyword,
    )?.ref;
    // check if keyword exists in the database. If not, throw error
    if (!keyWordRef) {
      setError('keyword', {
        type: 'custom',
        message: `${data.keyword} does not exist in the database`,
      });
      setFocus('keyword');
      return;
    }
    // call api to delete keyword from database
    const response = await fetch('/api/firestore/delete-keyword', {
      method: 'POST',
      body: keyWordRef,
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
        <TextInput
          control={control as Control<FormValues>}
          name="keyword"
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

export default FirestoreKeywordForm;
