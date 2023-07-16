import { useCallback, useEffect, useState } from 'react';
import {
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
    [k in EnhancementKeys]: {
      value: {
        name: string;
        description: string;
        chosen: boolean;
        source: string;
        applicableKeywords?: string[];
      }[];
      totalAllowed: number;
    };
  }>();

  useEffect(() => {
    console.log('triggered');

    determineAvailableEnhancements();
  }, [subFaction]);
  const formatEnhancements = (enhancements: Enhancements, source: string) => {
    return Object.keys(enhancements).reduce(
      (acc, key) => {
        console.log('key, acc', key, acc);

        return {
          ...acc,
          [key]: {
            value: enhancements[key as EnhancementKeys].map(
              (enhancement: Enhancement) => {
                return {
                  ...enhancement,
                  chosen: false,
                  source: source,
                };
              },
            ),
            totalAllowed: key === 'spellLore' || key === 'prayer' ? 100 : 1,
          },
        };
      },
      {} as {
        [key in EnhancementKeys]: {
          value: {
            name: string;
            description: string;
            applicableKeywords?: string[];
            includeUnique?: boolean;
            chosen: boolean;
            source: string;
          }[];
          totalAllowed: number;
        };
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
          [key]: {
            value: [
              ...formattedUniversalEnhancements[key as EnhancementKeys].value,
              ...formattedFactionEnhancements[key as EnhancementKeys].value,
            ],
            totalAllowed:
              formattedUniversalEnhancements[key as EnhancementKeys]
                .totalAllowed,
          },
        };
      },
      {} as {
        [key in EnhancementKeys]: {
          value: {
            name: string;
            description: string;
            chosen: boolean;
            source: string;
          }[];
          totalAllowed: number;
        };
      },
    );

    setAvailableEnhancements(mergedEnhancements);
  }, [chosenArmy, armyType, subFaction]);

  const determineAvailableCommandTraits = (unit: Unit) => {
    if (!availableEnhancements) return;
    const { commandTraits } = availableEnhancements;

    // check if unit is selected as a potential general
    if (potentialGeneral?.name !== unit.name) return null;

    // check if unit has the keyword of the chosen army type or sub faction. we use this to determine if the unit can
    // use (sub) faction specific command traits or the universal ones
    const hasSubFactionKeyword =
      unit.keywords.includes(subFaction!) || unit.keywords.includes(armyType!);

    const filteredCommandTraits = commandTraits.value.filter((trait) =>
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
      commandTraits.totalAllowed
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
    if (!availableEnhancements) return;
    const { spellLores } = availableEnhancements;

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
    if (
      spellLores.value.filter((trait) => trait.chosen).length >=
      spellLores.totalAllowed
    )
      return null;
    const unitSpecificSpellLores = spellLores.value.filter((trait) =>
      trait?.applicableKeywords?.every((keyword) =>
        unit.keywords.includes(keyword),
      ),
    );
    // filter out spell lores that are already chosen
    const availableSpellLores = unitSpecificSpellLores.filter(
      (trait) => !trait.chosen,
    );
    return availableSpellLores.length > 0 ? availableSpellLores : null;
  };

  const determineAvailableArtefacts = (unit: Unit) => {
    if (!availableEnhancements) return;
    const { artefacts } = availableEnhancements;

    const eligibleKeywords = ['hero'];
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;

    const hasSubFactionKeyword =
      unit.keywords.includes(subFaction!) || unit.keywords.includes(armyType!);
    console.log('hasSubFactionKeyword', hasSubFactionKeyword);

    const filteredArtefacts = artefacts.value.filter((trait) =>
      hasSubFactionKeyword
        ? trait.source === armyType
        : trait.source === 'universal',
    );
    console.log('artefacts.totalAllowed', artefacts.totalAllowed);

    console.log('filteredArtefacts', filteredArtefacts);
    // check if the number of chosen artefacts is less than the total allowed
    if (
      filteredArtefacts.filter((trait) => trait.chosen).length >=
      artefacts.totalAllowed
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
    if (!availableEnhancements) return;
    const { prayer } = availableEnhancements;

    const eligibleKeywords = ['priest'];
    // check if unit has any of the eligible keywords. Might need to change to 'every' in the future in the case of
    // having to match all eligible keywords
    if (!eligibleKeywords.some((keyword) => unit.keywords.includes(keyword)))
      return null;
    // you can choose 1 spell lore for each wizard in your army. Total count as of right, isn't set up to track
    // enhancement count. Meaning if a battalion is chosen, an army is allowed to take multiple enhancements which
    // would let each wizard take 1(base) + n(number of battalions) enhancements.
    // totalAllowed at this level would really be the number of wizards in the army * 1 (for base) + the number of
    // battalions
    if (
      prayer.value.filter((trait) => trait.chosen).length >= prayer.totalAllowed
    )
      return null;

    // filter out spell lores that are already chosen
    const availablePrayers = prayer.value.filter((trait) => !trait.chosen);
    return availablePrayers.length > 0 ? availablePrayers : null;
  };

  const determineAvailableTriumphs = () => {
    if (!availableEnhancements) return;
    const { triumphs } = availableEnhancements;

    if (
      triumphs.value.filter((trait) => trait.chosen).length >=
      triumphs.totalAllowed
    )
      return null;

    return triumphs.value;
  };

  const determineEnhancementEligibility = (unit: Unit) => {
    if (!availableEnhancements) return;
    // unique units cannot take any enhancements
    if (unit.isUnique) return;
    const eligibleCommandTraits = determineAvailableCommandTraits(unit);
    const eligibleArtefacts = determineAvailableArtefacts(unit);
    const eligibleSpellLores = determineAvailableSpellLores(unit);
    const eligibleTriumphs = determineAvailableTriumphs();
    const eligiblePrayers = determineAvailablePrayers(unit);
    console.log('eligibleArtefacts', eligibleArtefacts);

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
