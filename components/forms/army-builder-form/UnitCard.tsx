import React from 'react';
import { ArmyBuilderEnhancement, PlayerArmyUnit } from '@/firestore/types';
import { FlagIcon, MusicNoteIcon, PlusIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import LoadoutSelection from '@/components/inputs/LoadoutSelection';
import EnhancementSelection from '@/components/inputs/EnhancementSelection';
import {
  EnhancementKeys,
  SpecialUnitModel,
  Unit,
  UnitWeapon,
} from '@/types/firestore/firestore';

type FormValues = {
  loadoutSelected: { id: string; weapons: string[] } | null;
  champion: boolean;
  musician: boolean;
  standardbearer: boolean;
  enhancements: { [k in EnhancementKeys]: ArmyBuilderEnhancement | null };
};

type UnitCardProps = {
  unit: Unit;
  disabled: boolean;
  handleUnitSelection: (unit: PlayerArmyUnit, add: boolean) => void;
  selectedUnits: PlayerArmyUnit[];
  potentialGeneral: Unit | null;
  selectPotentialGeneral: React.Dispatch<React.SetStateAction<Unit | null>>;
  enhancements:
    | undefined
    | {
        commandTraits: undefined | null | ArmyBuilderEnhancement[];
        spellLores: undefined | null | ArmyBuilderEnhancement[];
        triumphs: undefined | null | ArmyBuilderEnhancement[];
        prayers: undefined | null | ArmyBuilderEnhancement[];
        artefacts: undefined | null | ArmyBuilderEnhancement[];
      };
};
const UnitCard = ({
  unit,
  disabled,
  handleUnitSelection,
  selectedUnits,
  potentialGeneral,
  selectPotentialGeneral,
  enhancements,
}: UnitCardProps) => {
  const defaultValues = {
    loadoutSelected: null,
    champion: false,
    musician: false,
    standardbearer: false,
    enhancements: {
      commandTraits: null,
      spellLores: null,
      triumphs: null,
      prayers: null,
      artefacts: null,
    },
  };

  const { control, getValues, setValue, watch, handleSubmit, reset } =
    useForm<FormValues>({
      defaultValues,
    });

  const isPotentialGeneral = potentialGeneral?.name === unit.name;
  const armyHasGeneral = selectedUnits.some((unit) => unit.isGeneral);

  // used to toggle the general icon color

  const onSubmit = (data: FormValues) => {
    const {
      loadoutSelected,
      champion,
      musician,
      standardbearer,
      enhancements,
    } = data;
    const { commandTraits, spellLores, prayers, artefacts } = enhancements;
    const unitMandatoryWeapons = unit.weapons.filter(
      (weapon: UnitWeapon) => !weapon.choice,
    );

    const { weapons, specialModels, equipOptions, ...rest } = unit;

    const weaponLoadout = loadoutSelected
      ? loadoutSelected?.weapons?.map(
          (weaponName: string) =>
            unit.weapons.find(
              (w: UnitWeapon) => w.name === weaponName,
            ) as UnitWeapon,
        )
      : [];

    const weaponsEquipped = [...weaponLoadout, ...unitMandatoryWeapons];
    const weaponsWithoutChoice = weaponsEquipped.map((weapon: UnitWeapon) => {
      const { choice, ...rest } = weapon;
      return rest;
    });

    const unitToAdd: PlayerArmyUnit = {
      ...rest,
      isGeneral: isPotentialGeneral && !armyHasGeneral,
      enhancements: {
        commandTraits: commandTraits ?? null,
        spellLores: spellLores ?? null,
        prayers: prayers ?? null,
        artefacts: artefacts ?? null,
      },
      weapons: weaponsWithoutChoice,
      equippedSpecialModels:
        unit?.specialModels?.filter((model: SpecialUnitModel) => {
          return (
            (model.name.toLowerCase() === 'champion' && champion) ||
            (model.name.toLowerCase() === 'musician' && musician) ||
            (model.name.toLowerCase() === 'standard bearer' && standardbearer)
          );
        }) || null,
    };
    handleUnitSelection(unitToAdd, true);
    reset();
  };

  return (
    <div
      key={unit.ref}
      className={`${
        disabled ? 'pointer-events-none' : ''
      } relative my-4 flex w-full select-none items-center justify-between rounded-md bg-gray-700 p-2 text-sm text-white disabled:opacity-50 lg:w-1/2`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <span className="lg:text-md relative -left-2 -top-5 flex select-none items-center justify-between whitespace-nowrap rounded-md border-2 border-gray-700 bg-white py-1 px-2 text-left text-xs font-bold text-gray-700 md:text-sm">
          <span>{unit.name}</span>
          <div
            className={`${
              selectedUnits.filter(
                (selectedUnit) => selectedUnit.ref === unit.ref,
              ).length > 0
                ? 'scale-100'
                : 'scale-0'
            } absolute -right-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-700 bg-white text-base text-gray-700 text-white transition-all duration-150`}
          >
            {
              selectedUnits.filter(
                (selectedUnit) => selectedUnit.name === unit.name,
              ).length
            }
          </div>
        </span>
        <div className="flex items-center">
          {unit?.specialModels && (
            <div className="flex items-center gap-4">
              {unit.specialModels.map((model: SpecialUnitModel) => (
                <button
                  key={model.name}
                  onClick={() => {
                    const name = model.name.toLowerCase().replace(' ', '') as
                      | 'champion'
                      | 'musician'
                      | 'standardbearer';
                    setValue(name, !getValues(name));
                  }}
                  className={`h-6 w-6 ${
                    watch(
                      model.name.toLowerCase().replace(' ', '') as
                        | 'champion'
                        | 'musician'
                        | 'standardbearer',
                    )
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }`}
                >
                  {model.name.toLowerCase() === 'standard bearer' ? (
                    <FlagIcon />
                  ) : model.name.toLowerCase() === 'musician' ? (
                    <MusicNoteIcon />
                  ) : (
                    model.name.toLowerCase() === 'champion' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  )}
                </button>
              ))}
            </div>
          )}
          {unit.role.includes('leader') && !armyHasGeneral && (
            <button
              onClick={() =>
                selectPotentialGeneral(isPotentialGeneral ? null : unit)
              }
              className={`h-6 w-6 ${
                isPotentialGeneral ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"
                />
              </svg>
            </button>
          )}
          <div className="h-6 opacity-0" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-center">
        {unit?.equipOptions && (
          <div className="flex w-full items-center gap-2 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              className="h-6 w-6"
            >
              <g>
                <path
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <LoadoutSelection
              name={'loadoutSelected'}
              options={unit.equipOptions}
              control={control}
              rules={{ required: true }}
              placeholder={'FormSelect Weapon'}
            />
          </div>
        )}
        {enhancements?.commandTraits && (
          <div className="flex w-full items-center gap-2 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              className="h-6 w-6"
            >
              <g>
                <path
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <EnhancementSelection
              name={'enhancements.commandTraits.json'}
              options={enhancements?.commandTraits}
              control={control}
              rules={{ required: true }}
              placeholder={'Command Trait'}
            />
          </div>
        )}
        {enhancements?.artefacts && (
          <div className="flex w-full items-center gap-2 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              className="h-6 w-6"
            >
              <g>
                <path
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <EnhancementSelection
              name={'enhancements.artefacts'}
              options={enhancements?.artefacts}
              control={control}
              rules={{ required: true }}
              placeholder={'Artefact'}
            />
          </div>
        )}
        {enhancements?.spellLores && (
          <div className="flex w-full items-center gap-2 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              className="h-6 w-6"
            >
              <g>
                <path
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <EnhancementSelection
              name={'enhancements.spellLores'}
              options={enhancements?.spellLores}
              control={control}
              rules={{ required: true }}
              placeholder={'Spell Lores'}
            />
          </div>
        )}
        {enhancements?.prayers && (
          <div className="flex w-full items-center gap-2 text-gray-500">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              className="h-6 w-6"
            >
              <g>
                <path
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <EnhancementSelection
              name={'enhancements.prayers'}
              options={enhancements?.prayers}
              control={control}
              rules={{ required: true }}
              placeholder={'Prayers'}
            />
          </div>
        )}
      </div>

      <div className="flex h-full w-1/5 flex-col items-center justify-between">
        <span className="relative -right-2 -top-5 self-end rounded-md border-2 border-gray-700 bg-white py-1 px-2 font-bold text-gray-700">
          {unit.points}
        </span>
        <button
          disabled={disabled}
          className="group relative h-6 w-6 self-end rounded-full bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:hover:bg-green-500"
          onClick={handleSubmit(onSubmit)}
        >
          <PlusIcon className="absolute inset-0.5 h-5 w-5 text-white " />
        </button>
      </div>
    </div>
  );
};

export default UnitCard;
