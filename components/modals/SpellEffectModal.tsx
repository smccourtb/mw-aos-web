import React from 'react';
import ModalWrapper from '@/components/modals/ModalWrapper';
import { PlayerArmyUnit } from '@/firestore/types';

type SpellEffectModalProps = {
  spell: any;
  units: PlayerArmyUnit[];
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpellEffectModal = ({
  spell,
  units,
  isOpen,
  closeModal,
}: SpellEffectModalProps) => {
  // const { type: effectType, target } = spell.effect.onSuccess;
  // const { type, amount, affiliation } = target;

  // first we need to to determine the affiliation and type of the target
  // then we need to determine the type of effect
  if (!spell) return null;

  const { target, result, type } = spell?.effect.onSuccess;
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="bg-white p-6">
        <h2>{`Choose ${target?.amount} ${target?.type} to cast this spell on`}</h2>
        <div>
          {units.map((unit) => {
            return (
              <div className="flex items-center gap-2">
                <button className="my-1 rounded-md bg-gray-700 px-2 py-1 font-bold text-white hover:bg-gray-600">
                  {unit.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SpellEffectModal;
