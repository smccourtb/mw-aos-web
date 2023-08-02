import Input from '@/components/inputs/Input';
import { Control } from 'react-hook-form';
import FormSelect from '@/components/inputs/FormSelect';
import React from 'react';
import Toggle from '@/components/inputs/Toggle';

type WeaponInputProps = {
  entryNumber: number;
  control: Control<any>;
};

const WeaponInput = ({ entryNumber, control }: WeaponInputProps) => {
  return (
    <div className={'flex gap-2'}>
      <Input
        name={`weapons.${entryNumber}.name`}
        control={control}
        label={`Name`}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.type`}
        placeholder={'Type'}
        options={['missile', 'melee']}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.range`}
        placeholder={'Range'}
        options={['1', '2', '3', '4', '5', '6', '18', '12', '24', '30']}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.attacks`}
        placeholder={'Attacks'}
        options={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          'D3',
          'D6',
          '*',
          'Models In Range(3)',
        ]}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.toHit`}
        placeholder={'To Hit'}
        options={['1+', '2+', '3+', '4+', '5+', '6', '*']}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.toWound`}
        placeholder={'To Wound'}
        options={['1+', '2+', '3+', '4+', '5+', '6']}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.rend`}
        placeholder={'Rend'}
        options={['-1', '-2', '-3', '-']}
        control={control}
        rules={{ required: true }}
      />
      <FormSelect
        name={`weapons.${entryNumber}.stats.damage`}
        placeholder={'Damage'}
        options={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          'D3',
          'D6',
          '*',
          'Target Unit Count',
          'Special',
        ]}
        control={control}
        rules={{ required: true }}
      />
      <Toggle name={`weapons.${entryNumber}.required`} control={control} />
    </div>
  );
};

export default WeaponInput;
