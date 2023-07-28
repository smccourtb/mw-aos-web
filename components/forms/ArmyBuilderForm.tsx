'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from '@/components/inputs/Select';
import { Tab } from '@headlessui/react';
import UnitCard from '@/components/forms/army-builder-form/UnitCard';
import {
  FirestoreBattleTactic,
  PlayerArmy,
  PlayerArmyUnit,
} from '@/firestore/types';
import ArmyTypeRadioGroup from '@/components/inputs/ArmyTypeRadioGroup';
import { useRouter, useSearchParams } from 'next/navigation';
import useEnhancements from '@/hooks/useEnhancements';
import GrandStrategyRadioGroup from '@/components/inputs/GrandStrategyRadioGroup';
import {
  Battlepack,
  EnhancementKeys,
  FactionName,
  RoleName,
  Unit,
  UniversalEnhancement,
} from '@/types/firestore/firestore';
import { Faction } from '@/types/firestore/factions';

type FormValues = {
  factionName: string;
  units: PlayerArmyUnit[];
  subFaction: string | null;
  type: 'starborne' | 'coalesced' | null;
  grandStrategy: { name: string; description: string } | null;
};

type ArmyBuilderFormProps = {
  armies: Faction[];
  battlepack: Battlepack | null;
  enhancements: {
    [key in EnhancementKeys]: UniversalEnhancement[];
  };
  userId: string;
};

type RoleCounts = {
  [K in RoleName]: { count: number; min: number | null; max: number | null };
};

const ArmyBuilderForm = ({
  armies,
  battlepack,
  enhancements,
  userId,
}: ArmyBuilderFormProps) => {
  const searchParams = useSearchParams();
  const pointLimit =
    searchParams?.get('type') !== 'matched'
      ? null
      : searchParams?.get('points');

  const router = useRouter();
  const [initialDataCollected, setInitialDataCollected] = useState(false);
  const [chosenArmy, setChosenArmy] = useState<Faction | null>(null);
  const [hasArmyTypes, setHasArmyTypes] = useState<boolean>(false);
  const [pointValue, setPointValue] = useState(0);
  const [roleCounts, setRoleCounts] = useState<RoleCounts>({
    leader: { count: 0, max: 0, min: 1 },
    battleline: { count: 0, max: null, min: 0 },
    behemoth: { count: 0, max: 0, min: null },
    artillery: { count: 0, max: 0, min: null },
  });

  const defaultValues = {
    factionName: '',
    type: null,
    subFaction: null,
    units: [],
    grandStrategy: null,
  };

  const { control, watch, handleSubmit, setValue, getValues, resetField } =
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
    pointLimit && setInitialRoleCounts();
  }, []);

  useEffect(() => {
    resetField('subFaction');
    setInitialDataCollected(false);
  }, [watchedType]);

  useEffect(() => {
    if (watchedFactionName) {
      setChosenArmy(
        armies.find((army) => army.name === watchedFactionName) ?? null,
      );
      determineFactionArmyTypes();
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

  const determineFactionArmyTypes = useCallback(() => {
    setHasArmyTypes(chosenArmy?.armyTypes.length !== 0 ?? false);
  }, [chosenArmy]);

  const armyTypeOptions = useMemo(() => {
    return chosenArmy?.armyTypes.map((type) => type.name) ?? [];
  }, [chosenArmy]);

  const subFactionOptions = useMemo(() => {
    if (hasArmyTypes) {
      return (
        chosenArmy?.armyTypes.find(
          (type) => type.name === watchedType?.toLowerCase(),
        )?.subFactions ?? []
      );
    }
    return chosenArmy?.subfactions.names ?? [];
  }, [watchedType]);

  const checkIfDisabled = (unit: Unit) => {
    let disabled = false;
    if (
      unit.isUnique &&
      getValues('units').find((armyUnit) => armyUnit.name === unit.name)
    ) {
      disabled = true;
    }
    if (pointLimit) {
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
        condition: pointLimit
          ? leader.max &&
            leader.count <= leader.max &&
            leader.min &&
            leader.count >= leader.min
          : true,
        units: determineUnitRoleEligibility('leader'),
      },
      {
        displayName: 'Battleline',
        name: 'battleline' as RoleName,
        condition: pointLimit
          ? battleline.min && battleline.count >= battleline.min
          : true,
        units: determineUnitRoleEligibility('battleline'),
      },
      {
        displayName: 'Behemoths',
        name: 'behemoth' as RoleName,
        condition: pointLimit
          ? behemoth.max && behemoth.count <= behemoth.max
          : true,
        units: determineUnitRoleEligibility('behemoth'),
      },
      {
        displayName: 'Artillery',
        name: 'artillery' as RoleName,
        condition: pointLimit
          ? artillery.max && artillery.count <= artillery.max
          : true,
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
        if (pointLimit) {
          setRoleCounts((prevState) => ({
            ...prevState,
            [role]: {
              // @ts-ignore
              ...prevState[role],
              // @ts-ignore
              count: prevState[role].count + 1,
            },
          }));
        }
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
      if (pointLimit) {
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
      }
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
    const currentPlayer = userId;
    const isLocal = searchParams?.get('local');
    const { factionName, units, grandStrategy, subFaction } = data;

    const battleTraits =
      chosenArmy?.battleTraits.filter((battleTrait) =>
        battleTrait.applicableSubfactions.includes(subFaction!),
      ) ?? [];

    const army: PlayerArmy = {
      factionName: factionName as FactionName,
      units,
      id: crypto.randomUUID(),
      grandStrategy: grandStrategy!,
      battleTraits,
      battleTactics: [
        ...(chosenArmy?.battleTactics ?? []),
        ...(battlepack?.battleTactics ?? []),
      ] as FirestoreBattleTactic[],
    };
    if (currentPlayer && !isLocal) {
      await fetch('/api/firestore/add-player-army', {
        method: 'POST',
        body: JSON.stringify({ ...army, player: currentPlayer }),
      });
    }
    if (isLocal) {
      const localPlayer = localStorage.getItem('guest');
      if (localPlayer) {
        const { armies } = JSON.parse(localPlayer);
        localStorage.setItem(
          'guest',
          JSON.stringify({
            armies: [...armies, army],
            user: currentPlayer,
          }),
        );
      }
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
        } flex w-full flex-col items-center justify-center justify-evenly gap-4 self-center transition-all`}
      >
        <div className="w-1/3">
          <Select
            placeholder="Choose your faction"
            name="factionName"
            control={control}
            rules={{ required: true }}
            options={armies.map((army) => army.name)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          {hasArmyTypes ? (
            <>
              <ArmyTypeRadioGroup
                options={armyTypeOptions}
                control={control}
                rules={{ required: true }}
                name="type"
              />
              {watchedType && (
                <Select
                  placeholder="Choose your subfaction"
                  name="subFaction"
                  control={control}
                  rules={{ required: true }}
                  options={subFactionOptions}
                />
              )}
            </>
          ) : (
            watchedFactionName && (
              <Select
                placeholder="Choose your subfaction"
                name="subFaction"
                control={control}
                rules={{ required: true }}
                options={subFactionOptions}
              />
            )
          )}
        </div>
      </div>

      {battlepack && watchedSubFaction && (
        <div>
          <GrandStrategyRadioGroup
            name="grandStrategy"
            label="Grand Strategy"
            options={[
              ...battlepack?.grandStrategies,
              ...chosenArmy?.grandStrategies!,
            ]}
            rules={{ required: true }}
            control={control}
          />
        </div>
      )}

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

                {pointLimit && (
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
                )}
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
