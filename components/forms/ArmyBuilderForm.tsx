'use client';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Select from '@/components/inputs/Select';
import { Tab } from '@headlessui/react';
import UnitCard from '@/components/forms/army-builder-form/UnitCard';
import {
  Battlepack,
  EnhancementKeys,
  Enhancements,
  Faction,
  FactionName,
  PlayerArmy,
  PlayerArmyUnit,
  RoleName,
  Unit,
} from '@/firestore/types';
import ArmyTypeRadioGroup from '@/components/inputs/ArmyTypeRadioGroup';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import useEnhancements from '@/hooks/useEnhancements';

type FormValues = {
  factionName: string;
  units: PlayerArmyUnit[];
  subFaction: string | null;
  type: 'starborne' | 'coalesced' | null;
};

type ArmyBuilderFormProps = {
  pointLimit: number | null;
  armyData: Faction[];
  battlepack: Battlepack | null;
  enhancements: Enhancements;
};

const ArmyBuilderForm = ({
  armyData,
  battlepack,
  enhancements,
}: ArmyBuilderFormProps) => {
  const user = useContext(AuthContext);
  const searchParams = useSearchParams();
  const pointLimit = searchParams?.get('points');
  const router = useRouter();
  const [initialDataCollected, setInitialDataCollected] = useState(false);
  const [chosenArmy, setChosenArmy] = useState<Faction | null>(null);
  const [pointValue, setPointValue] = useState(0);
  const [roleCounts, setRoleCounts] = useState<{
    [K in RoleName]: { count: number; min: number | null; max: number | null };
  }>({
    leader: { count: 0, max: 0, min: 1 },
    battleline: { count: 0, max: null, min: 0 },
    behemoth: { count: 0, max: 0, min: null },
    artillery: { count: 0, max: 0, min: null },
  });

  const defaultValues = {
    factionName: '',
    type: null,
    subFaction: null,
    units: [] as PlayerArmyUnit[],
  };

  const { control, watch, handleSubmit, setValue, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const watchedUnits = watch('units');
  const watchedFactionName = watch('factionName') as FactionName;
  const watchedType = watch('type');
  const watchedSubFaction = watch('subFaction');

  const [potentialGeneral, setPotentialGeneral] = useState<Unit | null>(null);
  const {
    determineEnhancementEligibility,
    availableEnhancements,
    setAvailableEnhancements,
  } = useEnhancements({
    enhancements,
    chosenArmy,
    armyType: watchedType,
    subFaction: watchedSubFaction,
    potentialGeneral,
  });

  useEffect(() => {
    setInitialRoleCounts();
  }, []);

  useEffect(() => {
    if (watchedFactionName) {
      setChosenArmy(
        armyData.find((army) => army.name === watchedFactionName) ?? null,
      );
    }
  }, [watchedFactionName]);

  useEffect(() => {
    if (watchedSubFaction) {
      const updatedUnits = chosenArmy?.units.map((unit) => {
        return {
          ...unit,
          keywords: [...unit.keywords, watchedType],
        };
      }) as Unit[];
      setChosenArmy(
        (prevState) =>
          ({
            ...prevState,
            units: updatedUnits ?? [],
          } as Faction),
      );
      setInitialDataCollected(true);
    }
  }, [watchedSubFaction]);

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

  const setInitialRoleCounts = useCallback(() => {
    const pointRules = battlepack?.armyRules.find(
      (battlepack) => battlepack.points === Number(pointLimit),
    );

    const { leaders, battleline, behemoths, artillery } = pointRules!;

    setRoleCounts({
      leader: {
        count: 0,
        ...leaders,
      },
      battleline: {
        count: 0,
        ...battleline,
      },
      behemoth: {
        count: 0,
        ...behemoths,
      },
      artillery: {
        count: 0,
        ...artillery,
      },
    });
  }, [battlepack]);

  const determineUnitRoleEligibility = (role?: RoleName) => {
    const unitsInRole = chosenArmy?.units.filter((unit) =>
      role ? unit.role.includes(role) : unit.role.length === 0,
    );
    // TODO: add conditional role check (subfaction)
    return unitsInRole ?? [];
  };

  const fieldSections = useMemo(() => {
    if (!chosenArmy && !availableEnhancements) return [];
    const { leader, battleline, behemoth, artillery } = roleCounts;
    return [
      {
        displayName: 'Leaders',
        name: 'leader' as RoleName,
        condition:
          leader.max &&
          leader.count <= leader.max &&
          leader.min &&
          leader.count >= leader.min,
        units: determineUnitRoleEligibility('leader'),
      },
      {
        displayName: 'Battleline',
        name: 'battleline' as RoleName,
        condition: battleline.min && battleline.count >= battleline.min,
        units: determineUnitRoleEligibility('battleline'),
      },
      {
        displayName: 'Behemoths',
        name: 'behemoth' as RoleName,
        condition: behemoth.max && behemoth.count <= behemoth.max,
        units: determineUnitRoleEligibility('behemoth'),
      },
      {
        displayName: 'Artillery',
        name: 'artillery' as RoleName,
        condition: artillery.max && artillery.count <= artillery.max,
        units: determineUnitRoleEligibility('artillery'),
      },
      {
        displayName: 'Units',
        name: 'unit' as RoleName,
        condition: true,
        units: determineUnitRoleEligibility(),
      },
    ];
  }, [roleCounts, watchedFactionName, chosenArmy]);

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
      // flip all chosen enhancements to true, so they cant be picked again
      Object.keys(unit.enhancements).forEach((enhancement) => {
        // @ts-ignore
        if (unit.enhancements[enhancement] !== null) {
          // find all enhancements that match the incoming unit.enhancements and set the chosen property to true
          setAvailableEnhancements((prevState) => ({
            ...prevState!,
            [enhancement]: prevState![enhancement as EnhancementKeys].map(
              (prevEnhancement) => {
                if (
                  prevEnhancement.name ===
                  // @ts-ignore
                  unit.enhancements[enhancement].name
                ) {
                  return {
                    ...prevEnhancement,
                    chosen: true,
                  };
                }
                return prevEnhancement;
              },
            ),
          }));
        }
      });

      setPotentialGeneral(null);
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
    const currentPlayer = searchParams?.get('player');
    const { factionName, units } = data;
    const army: PlayerArmy = {
      factionName: factionName as FactionName,
      units,
      id: crypto.randomUUID(),
    };
    if (currentPlayer === user?.uid) {
      await fetch('/api/firestore/add-player-army', {
        method: 'POST',
        body: JSON.stringify(army),
      });
    }
    router.push(`/play/new?${searchParams?.toString()}`);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      {pointLimit && (
        <span className="sticky -top-6 z-50 mb-4 w-full bg-white py-2 drop-shadow">{`${pointValue} / ${pointLimit}`}</span>
      )}
      <div
        className={`${
          initialDataCollected ? '' : 'my-auto h-full '
        } flex w-full items-center justify-center justify-evenly self-center transition-all`}
      >
        <div className="w-1/3">
          <Select
            placeholder="Choose your faction"
            name="factionName"
            control={control}
            rules={{ required: true }}
            options={armyData.map((army) => army.name)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <ArmyTypeRadioGroup
            options={
              armyData
                .find((army) => army.name === watchedFactionName)
                ?.type.map((type) => type.name) ?? []
            }
            control={control}
            rules={{ required: true }}
            name="type"
          />
          <Select
            placeholder="Choose your subfaction"
            name="subFaction"
            control={control}
            rules={{ required: true }}
            options={
              armyData
                .find((army) => army.name === watchedFactionName)
                ?.type.find((type) => type.name === watchedType)
                ?.subFactions.map((subFaction) => subFaction.name) ?? []
            }
          />
        </div>
      </div>

      <div
        className={`my-10 w-full transition-all  ${
          initialDataCollected ? 'opacity-100' : 'translate-y-4 opacity-0'
        } duration-200 ease-in-out`}
      >
        <Tab.Group>
          <Tab.List className="flex w-full justify-evenly">
            {fieldSections.map((section, index) => (
              <Tab
                key={index}
                className="mt-4 flex w-full flex-col items-center gap-2 rounded-t-md px-2 py-1 pb-2 font-bold capitalize text-gray-500 transition-all duration-200 ease-in-out focus:outline-none ui-selected:bg-gray-700 ui-selected:text-white"
              >
                {section.displayName}

                <div className="flex-start flex w-full items-center gap-2 text-sm">
                  <div className="flex flex-col">
                    <span>{roleCounts[section.name]?.min ?? '-'}</span>
                    <span className="text-[10px] uppercase leading-[10px] opacity-50">
                      min
                    </span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span>{roleCounts[section.name]?.max ?? '-'}</span>
                    <span className="text-[10px] uppercase leading-[10px] opacity-50">
                      max
                    </span>
                  </div>
                  {roleCounts[section.name]?.count > 0 && (
                    <div className="ml-auto flex flex-col">
                      <span>{roleCounts[section.name]?.count}</span>
                      <span className="text-[10px] uppercase leading-[10px] opacity-50">
                        total
                      </span>
                    </div>
                  )}
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="h-full w-full rounded-md border-t-2 border-gray-700 bg-gray-100 drop-shadow-lg">
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
                    enhancements={determineEnhancementEligibility(unit)}
                    potentialGeneral={potentialGeneral}
                    selectPotentialGeneral={setPotentialGeneral}
                  />
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <button
        className="button fixed bottom-10"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
      <button
        className="button fixed bottom-10 right-10"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ArmyBuilderForm;
