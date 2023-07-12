import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from '@/components/inputs/Select';
import { Tab } from '@headlessui/react';
import UnitCard from '@/components/forms/army-builder-form/UnitCard';
import {
  FactionName,
  PlayerArmy,
  PlayerArmyUnit,
  RoleName,
  Unit,
} from '@/components/firestore/types';

type FormValues = {
  factionName: string;
  units: PlayerArmyUnit[];
};

type ArmyBuilderFormProps = {
  pointLimit: number | null;
  factionNames: string[];
  units: { [K in FactionName]: Unit[] };
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setArmies: {
    setArmy: React.Dispatch<React.SetStateAction<PlayerArmy[]>>;
    currentPlayer: 1 | 2;
  };
};

const ArmyBuilderForm = ({
  pointLimit,
  factionNames,
  units,
  setArmies,
  closeModal,
}: ArmyBuilderFormProps) => {
  const [pointValue, setPointValue] = useState(0);
  const [roleCounts, setRoleCounts] = useState<{
    [K in RoleName]: { count: number; min: number | null; max: number | null };
  }>({
    leader: { count: 0, max: 6, min: 1 },
    battleline: { count: 0, max: null, min: 3 },
    behemoth: { count: 0, max: 4, min: null },
    artillery: { count: 0, max: 4, min: null },
  });

  const { setArmy, currentPlayer } = setArmies;

  const defaultValues = {
    factionName: '',
    units: [] as PlayerArmyUnit[],
  };

  const { control, watch, handleSubmit, setValue, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const watchedUnits = watch('units');
  const watchedFactionName = watch('factionName') as FactionName;

  const checkIfDisabled = (unit: Unit) => {
    let disabled = false;
    if (
      unit.isUnique &&
      getValues('units').find((armyUnit) => armyUnit.name === unit.name)
    ) {
      disabled = true;
    }
    unit.role.forEach((role: RoleName) => {
      if (role === 'battleline') return;
      const roleCount = roleCounts[role];
      if (roleCount.max && roleCount.count >= roleCount.max) {
        disabled = true;
      }
    });
    if (pointValue + unit.points > (pointLimit ? pointLimit : Infinity)) {
      disabled = true;
    }
    return disabled;
  };

  const fieldSections = [
    {
      displayName: 'Leaders',
      condition:
        roleCounts.leader.max &&
        roleCounts.leader.count <= roleCounts.leader.max &&
        roleCounts.leader.min &&
        roleCounts.leader.count >= roleCounts.leader.min,
      units:
        units[watchedFactionName]?.filter((unit: Unit) =>
          unit.role.includes('leader'),
        ) ?? [],
    },
    {
      displayName: 'Battleline',
      condition:
        roleCounts.battleline.min &&
        roleCounts.battleline.count >= roleCounts.battleline.min,
      units:
        units[watchedFactionName]?.filter((unit) =>
          unit.role.includes('battleline'),
        ) ?? [],
    },
    {
      displayName: 'Behemoths',
      condition:
        roleCounts.behemoth.max &&
        roleCounts.behemoth.count <= roleCounts.behemoth.max,
      units:
        units[watchedFactionName]?.filter((unit) =>
          unit.role.includes('behemoth'),
        ) ?? [],
    },
    {
      displayName: 'Artillery',
      condition:
        roleCounts.artillery.max &&
        roleCounts.artillery.count <= roleCounts.artillery.max,
      units:
        units[watchedFactionName]?.filter((unit) =>
          unit.role.includes('artillery'),
        ) ?? [],
    },
    {
      displayName: 'Units',
      condition: true,
      units:
        units[watchedFactionName]?.filter((unit) => unit.role.length === 0) ??
        [],
    },
  ];

  const handleUnitSelection = (unit: PlayerArmyUnit, add: boolean) => {
    const currentUnits = getValues('units');
    if (add) {
      // loop through units roles and increment the count in roleCounts that pertains to the role
      unit.role.forEach((role: string) => {
        setRoleCounts((prevState) => ({
          ...prevState,
          [role]: {
            // @ts-ignore
            ...prevState[role],
            // @ts-ignore
            count: prevState[role].count + 1,
          },
        }));
      });
      setPointValue((prevState) => prevState + unit.points);
      setValue('units', [...currentUnits, unit]);
    } else {
      // loop through units roles and decrement the count in roleCounts that pertains to the role
      unit.role.forEach((role: string) => {
        setRoleCounts((prevState) => ({
          ...prevState,
          [role]: {
            // @ts-ignore
            ...prevState[role],
            // @ts-ignore
            count: prevState[role].count - 1,
          },
        }));
      });
      setPointValue((prevState) => prevState - unit.points);
      setValue(
        'units',
        currentUnits.filter(
          (currentUnit: PlayerArmyUnit) => currentUnit.name !== unit.name,
        ),
      );
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { factionName, units } = data;
    const army: PlayerArmy = {
      factionName: factionName as FactionName,
      units,
      id: crypto.randomUUID(),
    };
    if (currentPlayer === 1) {
      await fetch('/api/firestore/add-player-army', {
        method: 'POST',
        body: JSON.stringify(army),
      });
    }

    setArmy((prevState) => [...prevState, army]);
    closeModal(false);
  };

  return (
    <div className="relative flex min-h-[500px] flex-col items-center">
      {pointLimit && (
        <span className="sticky -top-6 z-50 mb-4 w-full bg-white py-2 drop-shadow">{`${pointValue} / ${pointLimit}`}</span>
      )}
      <div className="w-1/3 self-start">
        <Select
          placeholder="Choose your faction"
          name="factionName"
          control={control}
          rules={{ required: true }}
          options={factionNames}
        />
      </div>
      <Tab.Group>
        <Tab.List className="flex w-full justify-evenly">
          {fieldSections.map((section, index) => (
            <Tab
              key={index}
              className="mt-4 w-full rounded-t-md px-2 py-1 font-bold capitalize text-gray-500 transition-all duration-200 ease-in-out focus:outline-none ui-selected:bg-gray-700 ui-selected:text-white"
            >
              {section.displayName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-full w-full">
          {fieldSections.map((section) => (
            <Tab.Panel
              key={section.displayName}
              className="flex h-full flex-col items-center justify-center gap-2 rounded-md p-4 lg:flex-row"
            >
              {section.units.map((unit, index) => (
                <UnitCard
                  key={unit.name + index}
                  unit={unit}
                  disabled={checkIfDisabled(unit)}
                  handleUnitSelection={handleUnitSelection}
                  selectedUnits={watchedUnits}
                />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <button
        className="button fixed bottom-10"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </div>
  );
};

export default ArmyBuilderForm;
