'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MatchTypeSelection from '@/components/inputs/MatchTypeSelection';
import ArmySelectorRadioGroup from '@/components/inputs/ArmySelectorRadioGroup';
import { PlayerArmy } from '@/firestore/types';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BattlepackSelect from '@/components/inputs/BattlepackSelect';
import { Battlepack } from '@/types/firestore/firestore';
import CreatePlayerModal from '@/components/modals/CreatePlayerModal';

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
  userId: string;
};

const NewGameForm = ({ battlepacks, userArmies, userId }: NewGameFormProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // TODO: we can prompt player 2 to enter their email to get their armies but for now we will just keep it local
  const [createPlayerModalOpen, setCreatePlayerModalOpen] = useState(false);
  const [opponent, setOpponent] = useState<{
    user: string;
    isLocal: boolean;
    armies: PlayerArmy[];
  }>({
    armies: [],
    user: '',
    isLocal: false,
  });
  const defaultValues = {
    type: searchParams?.get('type') ?? null,
    points: Number(searchParams?.get('points')) ?? null,
    battlepack:
      battlepacks.find(
        (battlepack) => battlepack.id === searchParams?.get('battlepack'),
      ) ?? null,
    playerOne: {
      army: null,
      user: userId,
    },
    playerTwo: {
      army: null,
      user: null,
    },
  };

  useEffect(() => {
    const localPlayer = localStorage.getItem('guest');
    if (localPlayer && !opponent.user) {
      const { user, armies } = JSON.parse(localPlayer);
      console.log('user', user);
      handleOpponent({ user, armies, isLocal: true });
    }
  }, [opponent]);

  const onSubmit = async (data: FormValues) => {
    const { type, points, playerOne, playerTwo, battlepack } = data;
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
      battlepack,
    };

    await fetch('/api/firestore/add-new-game', {
      method: 'POST',
      body: JSON.stringify(game),
    });
    router.push(`/play/${game.id}`);
  };

  const { control, watch, handleSubmit, getValues, setValue } =
    useForm<FormValues>({
      defaultValues,
    });
  const watchedType = watch('type');
  const watchedBattlePack = watch('battlepack');
  const watchedPoints = watch('points');

  const handleBuildArmyDisabled = () => {
    if (!watchedType) return true;
    if (watchedType === 'matched') {
      if (!watchedPoints || !watchedBattlePack) return true;
    }
    return false;
  };

  const handleOpponent = (player: {
    user: string;
    armies: PlayerArmy[];
    isLocal: boolean;
  }) => {
    const { user, isLocal, armies } = player;
    setOpponent({
      user,
      isLocal,
      armies,
    });
    setValue('playerTwo.user', user);
  };

  const BuildArmyButton = ({
    playerId,
    isLocal,
  }: {
    playerId: string;
    isLocal?: boolean;
  }) => (
    <Link
      href={{
        pathname: '/build',
        query: {
          type: getValues('type'),
          battlepack: getValues('battlepack')?.id,
          points: getValues('points'),
          player: playerId,
          local: isLocal,
        },
      }}
    >
      <button
        onClick={(e) => {
          if (!playerId) {
            e.preventDefault();
            setCreatePlayerModalOpen(true);
          }
        }}
        className="cursor-pointer rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={handleBuildArmyDisabled()}
      >
        Build Army
      </button>
    </Link>
  );

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
          <div className="col-span-2 w-1/3 place-self-center">
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
          <BuildArmyButton playerId={getValues('playerOne.user')!} />
        </div>
        {/*player 2*/}
        <div className="flex flex-col items-center">
          <span className="self-end text-lg font-bold">Player 2</span>
          <div className="flex flex-col items-center">
            <ArmySelectorRadioGroup
              control={control}
              options={opponent.armies}
              rules={{ required: true }}
              label="Army"
              name="playerTwo.army"
            />
            <BuildArmyButton
              playerId={getValues('playerTwo.user')!}
              isLocal={opponent.isLocal}
            />
          </div>
        </div>
      </div>
      {/*submit form*/}
      <button className="button mt-auto mb-10" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
      <CreatePlayerModal
        isOpen={createPlayerModalOpen}
        setIsOpen={setCreatePlayerModalOpen}
        handleOpponent={handleOpponent}
      />
    </>
  );
};

export default NewGameForm;
