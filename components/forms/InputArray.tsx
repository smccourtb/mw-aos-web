import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { PlusSmIcon } from '@heroicons/react/solid';
import WeaponInput from '@/components/inputs/WeaponInput';

type InputArrayProps = {
  control: Control<any>;
  name: string;
  defaultValues: unknown;
};
const InputArray = ({ control, name, defaultValues }: InputArrayProps) => {
  const { fields, append } = useFieldArray({ control, name });

  return (
    <>
      <p className="text-md col-span-2 row-start-7 font-bold">Weapons</p>
      <button
        className="col-span-10 h-6 w-6 rounded-md bg-green-600 p-1 text-white"
        onClick={() => {
          append(defaultValues);
        }}
      >
        <PlusSmIcon />
      </button>
      <div className={'col-span-full flex flex-col'}>
        {fields.map((field, i) => (
          <WeaponInput control={control} entryNumber={i} key={field.id} />
        ))}
      </div>
    </>
  );
};

export default InputArray;
