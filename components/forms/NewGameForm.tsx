'use client';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import MatchTypeSelection from '@/components/inputs/MatchTypeSelection';
import ArmySelectorRadioGroup from '@/components/inputs/ArmySelectorRadioGroup';
import { Battlepack, PlayerArmy } from '@/firestore/types';
import AuthContext from '@/context/AuthContext';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BattlepackSelect from '@/components/inputs/BattlepackSelect';

type FormValues = {
  type: string | null;
  points: number | null;
  battlepack: Battlepack | null;
  playerOne: {
    army: {} | null;
    user: string | null;
  };
  playerTwo: {
    army: {} | null;
    user: string | null;
  };
};

type NewGameFormProps = {
  userArmies: PlayerArmy[];
  battlepacks: Battlepack[];
};

const NewGameForm = ({ battlepacks, userArmies }: NewGameFormProps) => {
  const user = useContext(AuthContext);
  const searchParams = useSearchParams();
  const [playerTwoArmies, setPlayerTwoArmies] = useState<PlayerArmy[]>([]);
  // TODO: we can prompt player 2 to enter their email to get their armies but for now we will just keep it local

  const defaultValues = {
    type: searchParams?.get('type') ?? null,
    points: Number(searchParams?.get('points')) ?? null,
    battlepack: null,
    playerOne: {
      army: null,
      user: user?.uid,
    },
    playerTwo: {
      army: null,
      user: crypto.randomUUID(),
    },
  };
  const onSubmit = async (data: FormValues) => {
    if (!user) {
      alert('You must be logged in to create a game');
      return;
    }
    const { type, points, playerOne, playerTwo } = data;
    const game = {
      id: crypto.randomUUID(),
      type,
      points,
      playerOne: {
        army: playerOne.army,
        user: playerOne.user,
      },
      playerTwo: {
        army: playerTwo.army,
        user: playerTwo.user,
      },
    };
    await fetch('/api/firestore/add-new-game', {
      method: 'POST',
      body: JSON.stringify(game),
    });
    redirect(`/play/${game.id}`);
  };

  const { control, watch, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues,
  });
  const watchedType = watch('type');
  const watchedBattlePack = watch('battlepack');
  const watchedPoints = watch('points');

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="col-span-2">
          <MatchTypeSelection
            label="Match Type"
            control={control}
            rules={{ required: true }}
            name="type"
            options={[
              { value: 'matched', label: 'Matched Play' },
              { value: 'open', label: 'Open Play' },
              { value: 'narrative', label: 'Narrative Play' },
            ]}
          />
        </div>
        {watchedType === 'matched' && (
          <div className="col-span-2">
            <BattlepackSelect
              placeholder="Battlepack"
              control={control}
              rules={{ required: watchedType === 'matched' }}
              name="battlepack"
              options={battlepacks}
            />
          </div>
        )}

        {/*points*/}
        {watchedType === 'matched' && watchedBattlePack && (
          <div className="col-span-2">
            <MatchTypeSelection
              label="Points"
              name="points"
              options={
                getValues('battlepack')?.armyRules.map((rules) => {
                  return {
                    value: rules.points,
                    label: rules.points.toString(),
                  };
                }) ?? []
              }
              rules={{ required: watchedType === 'matched' }}
              control={control}
            />
          </div>
        )}
        {/*player 1*/}
        <div className="flex flex-col items-center">
          <span className="self-start text-lg font-bold">Player 1</span>
          <ArmySelectorRadioGroup
            control={control}
            options={userArmies}
            rules={{ required: true }}
            label="Army"
            name="playerOne.army"
          />
          <Link
            className="button"
            href={{
              pathname: '/build',
              query: {
                type: getValues('type'),
                battlepack: getValues('battlepack')?.id,
                points: getValues('points'),
                player: getValues('playerOne.user'),
              },
            }}
          >
            Build Army
          </Link>
        </div>
        {/*player 2*/}
        <div className="flex flex-col items-center">
          <span className="self-end text-lg font-bold">Player 2</span>
          <div className="flex flex-col items-center">
            <ArmySelectorRadioGroup
              control={control}
              options={playerTwoArmies}
              rules={{ required: true }}
              label="Army"
              name="playerTwo.army"
            />
            <Link
              className="button"
              href={{
                pathname: '/build',
                query: {
                  type: getValues('type'),
                  battlepack: getValues('battlepack')?.id,
                  points: getValues('points'),
                  player: getValues('playerTwo.user'),
                },
              }}
            >
              Build Army
            </Link>
          </div>
        </div>
      </div>
      {/*submit form*/}
      <button className="button mt-auto mb-10" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </>
  );
};

export default NewGameForm;
