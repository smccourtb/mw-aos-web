import { useCallback, useEffect, useState } from 'react';
import {
  ArmyBuilderEnhancement,
  Enhancement,
  EnhancementKeys,
  Enhancements,
  Faction,
  Unit,
} from '@/firestore/types';

type useEnhancementsProps = {
  chosenArmy: Faction | null;
  enhancements: Enhancements;
  armyType: string | null;
  subFaction: string | null;
  potentialGeneral: Unit | null;
};
const useEnhancements = ({
  enhancements,
  chosenArmy,
  armyType,
  subFaction,
  potentialGeneral,
}: useEnhancementsProps) => {
  const [availableEnhancements, setAvailableEnhancements] = useState<{
    [k in EnhancementKeys]: ArmyBuilderEnhancement[];
  }>();

  useEffect(() => {
    determineAvailableEnhancements();
  }, [subFaction]);

  const formatEnhancements = (enhancements: Enhancements, source: string) => {
    return Object.keys(enhancements).reduce(
      (acc, key) => {
        return {
          ...acc,
          [key]: enhancements[key as EnhancementKeys].map(
            (enhancement: Enhancement) => {
              return {
                ...enhancement,
                chosen: false,
                source: source,
              };
            },
          ),
        };
      },
      {} as {
        [key in EnhancementKeys]: ArmyBuilderEnhancement[];
      },
    );
  };

  const determineAvailableEnhancements = useCallback(() => {
    if (!chosenArmy || !armyType || !subFaction) return;
    const formattedUniversalEnhancements = formatEnhancements(
      enhancements,
      'universal',
    );

    // get the enhancements of chosen faction/subfaction
    const factionEnhancements: Enhancements =
      chosenArmy?.type.find((type) => type.name === armyType)?.enhancements ??
      ({} as Enhancements);

    const formattedFactionEnhancements = formatEnhancements(
      factionEnhancements,
      armyType!,
    );

    const mergedEnhancements = Object.keys(
      formattedUniversalEnhancements,
    ).reduce(
      (acc, key) => {
        return {
          ...acc,
          [key]: [
            ...formattedUniversalEnhancements[key as EnhancementKeys],
            ...formattedFactionEnhancements[key as EnhancementKeys],
          ],
        };
      },
      {} as {
        [key in EnhancementKeys]: ArmyBuilderEnhancement[];
      },
    );

    setAvailableEnhancements(mergedEnhancements);
  }, [chosenArmy, armyType, subFaction]);

  const determineAvailableCommandTraits = (
    unit: Unit,
  ): ArmyBuilderEnhancement[] | null => {
    const { commandTraits } = availableEnhancements!;
    const totalAllowed = 1;
    // check if unit is selected as a potential general
    if (potentialGeneral?.name !== unit.name) return null;

    // check if unit has the keyword of the chosen army type or sub faction. we use this to determine if the unit can
    // use (sub) faction specific command traits or the universal ones
    const hasSubFactionKeyword =
      unit.keywords.includes(subFaction!) || unit.keywords.includes(armyType!);

    const filteredCommandTraits: ArmyBuilderEnhancement[] =
      commandTraits.filter((trait) =>
        hasSubFactionKeyword
          ? trait.source === armyType
          : trait.source === 'universal',
      );

    // next we filter out based on keywords. In this case, we want to filter out all command traits that don't have
    // the 'hero' keyword first. Then after we check for any conditions that might prevent the unit from taking the command point. we will filter out faction specific keywords
    const eligibleKeywords = ['hero'];

    // check if unit has any of the eligible keywords. Might need to change to 'every' in the future in the case of
    // having to match all eligible keywords
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;

    // check if the number of chosen command traits is less than the total allowed
    if (
      filteredCommandTraits.filter((trait) => trait.chosen).length >=
      totalAllowed
    )
      return null;

    // if the unit has the sub faction keyword(s), we need to filter out any command traits that don't have the sub faction keyword(s)
    const unitSpecificCommandTraits = filteredCommandTraits.filter((trait) =>
      trait?.applicableKeywords?.every((keyword) =>
        unit.keywords.includes(keyword),
      ),
    );
    // finally, return any leftover command traits that haven't been chosen
    const availableCommandTraits = unitSpecificCommandTraits.filter(
      (trait) => !trait.chosen,
    );
    return availableCommandTraits.length > 0 ? availableCommandTraits : null;
  };
  const determineAvailableSpellLores = (unit: Unit) => {
    const { spellLores } = availableEnhancements!;

    const eligibleKeywords = ['wizard'];
    // check if unit has any of the eligible keywords. Might need to change to 'every' in the future in the case of
    // having to match all eligible keywords
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;
    // you can choose 1 spell lore for each wizard in your army. Total count as of right, isn't set up to track
    // enhancement count. Meaning if a battalion is chosen, an army is allowed to take multiple enhancements which
    // would let each wizard take 1(base) + n(number of battalions) enhancements.
    // totalAllowed at this level would really be the number of wizards in the army * 1 (for base) + the number of
    // battalions

    if (unit.name === 'Skink Starpriest') {
      console.log('spellLores', spellLores);
    }
    const unitSpecificSpellLores = spellLores.filter((trait) => {
      if (trait.hasOwnProperty('applicableKeywords')) {
        return trait?.applicableKeywords?.every((keyword) =>
          unit.keywords.includes(keyword),
        );
      } else {
        return true;
      }
    });

    // filter out spell lores that are already chosen
    const availableSpellLores = unitSpecificSpellLores.filter(
      (trait) => !trait.chosen,
    );
    return availableSpellLores.length > 0 ? availableSpellLores : null;
  };

  const determineAvailableArtefacts = (unit: Unit) => {
    const { artefacts } = availableEnhancements!;
    const totalAllowed = 1;

    const eligibleKeywords = ['hero'];
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;

    const hasSubFactionKeyword =
      unit.keywords.includes(subFaction!) || unit.keywords.includes(armyType!);

    const filteredArtefacts = artefacts.filter((trait) =>
      hasSubFactionKeyword
        ? trait.source === armyType
        : trait.source === 'universal',
    );
    // check if the number of chosen artefacts is less than the total allowed
    if (
      filteredArtefacts.filter((trait) => trait.chosen).length >= totalAllowed
    )
      return null;

    // if the unit has the sub faction keyword(s), we need to filter out any command traits that don't have the sub faction keyword(s)
    const unitSpecificArtefacts = filteredArtefacts.filter((trait) =>
      trait?.applicableKeywords?.every((keyword) =>
        unit.keywords.includes(keyword),
      ),
    );

    const availableArtefacts = unitSpecificArtefacts.filter(
      (trait) => !trait.chosen,
    );
    return availableArtefacts.length > 0 ? availableArtefacts : null;
  };

  const determineAvailablePrayers = (unit: Unit) => {
    const { prayer } = availableEnhancements!;

    const eligibleKeywords = ['priest'];
    // check if unit has any of the eligible keywords. Might need to change to 'every' in the future in the case of
    // having to match all eligible keywords
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;

    // filter out spell lores that are already chosen
    const availablePrayers = prayer.filter((trait) => !trait.chosen);
    return availablePrayers.length > 0 ? availablePrayers : null;
  };

  const determineAvailableTriumphs = () => {
    const { triumphs } = availableEnhancements!;
    const totalAllowed = 1;

    if (triumphs.filter((trait) => trait.chosen).length >= totalAllowed)
      return null;

    return triumphs.filter((trait) => !trait.chosen);
  };

  const determineEnhancementEligibility = (unit: Unit) => {
    // unique units cannot take any enhancements
    if (unit.isUnique) return;
    const eligibleCommandTraits = availableEnhancements
      ? determineAvailableCommandTraits(unit)
      : null;
    const eligibleArtefacts = availableEnhancements
      ? determineAvailableArtefacts(unit)
      : null;
    const eligibleSpellLores = availableEnhancements
      ? determineAvailableSpellLores(unit)
      : null;
    const eligibleTriumphs = availableEnhancements
      ? determineAvailableTriumphs()
      : null;
    const eligiblePrayers = availableEnhancements
      ? determineAvailablePrayers(unit)
      : null;

    return {
      commandTraits: eligibleCommandTraits,
      artefacts: eligibleArtefacts,
      spellLores: eligibleSpellLores,
      triumphs: eligibleTriumphs,
      prayers: eligiblePrayers,
    };
  };

  return {
    availableEnhancements,
    setAvailableEnhancements,
    determineEnhancementEligibility,
  };
};

export default useEnhancements;
