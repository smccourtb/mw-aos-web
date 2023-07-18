import bastiladon from '../units/bastiladon.json';
import carnosaur from '../units/saurusOldbloodOnCarnosaur.json';
import saurusWarriors from '../units/saurusWarrior.json';
import terradon from '../units/terradonRider.json';
import ripperdactyl from '../units/ripperdactylRider.json';
import starpriest from '../units/skinkStarpriest.json';
import slannStarmaster from '../units/slannStarmaster.json';

export const seraphon = {
  name: 'seraphon',
  units: [
    bastiladon,
    carnosaur,
    saurusWarriors,
    terradon,
    ripperdactyl,
    starpriest,
    slannStarmaster,
  ],
  grandStrategies: [
    {
      name: 'Realmshaper Guardians',
      description:
        'When the battle ends, you complete this grand strategy if you have a Coalesced Realmshaper Engine or Starborne Realmshaper Engine on the battlefield, there are no enemy models within 12" of it and it was not affected by a successful Smash To Rubble monstrous rampage.',
    },
    {
      name: 'Repel Corruption',
      description:
        'When the battle ends, you complete this grand strategy if there are no enemy units wholly within your territory.',
    },
    {
      name: 'Continuous Expansion',
      description:
        'When the battle ends, you complete this grand strategy if there is at least 1 friendly SERAPHON unit wholly within each large quarter of the battlefield (core rules, 28.2.8).',
    },
    {
      name: 'Further the Great Plan',
      description:
        'When the battle ends, you complete this grand strategy if you completed 4 or more battle tactics and each of those battle tactics was from the March of the Seraphon Host table below.',
    },
  ],
  battleTactics: [
    {
      name: 'Stampede of Scales',
      description:
        'Pick 3 different friendly SERAPHON MONSTERS. You complete this tactic if each of those units runs in the following movement phase and finishes that run within 6" of at least 1 of the other units you picked and wholly within enemy territory.',
    },
    {
      name: 'Celestial Obliteration',
      description:
        'Pick 1 enemy unit on the battlefield. You complete this tactic if that unit is destroyed this turn by mortal wounds caused by a spell or the abilities of an endless spell.',
    },
    {
      name: 'Overwhelming Numbers',
      description:
        'Pick 1 objective controlled by the enemy. You complete this tactic at the end of this turn if you control that objective and all friendly units contesting it have the SKINK keyword.',
    },
    {
      name: 'Apex Predator',
      description:
        'Pick 1 enemy MONSTER. You complete this tactic at the end of this turn if that enemy unit was destroyed by an attack made by a friendly SERAPHON MONSTER.',
    },
    {
      name: 'Cold-blooded Resilience',
      description:
        'Pick 1 friendly SAURUS or KROXIGOR unit within 3" of an enemy unit. You complete this tactic at the end of this turn if that unit was not destroyed, did not retreat and was not removed from the battlefield.',
    },
    {
      name: 'Pack Hunters',
      description:
        'Pick 1 enemy unit within 3" of only 1 friendly AGGRADON unit. You complete this tactic if, at the end of this turn, that unit is within 3" of 2 or more friendly AGGRADON units.',
    },
  ],
  type: [
    {
      name: 'coalesced',
      subFactions: [
        {
          name: 'thunder lizard',
          ability: {
            name: 'Mighty Beasts of War',
            description:
              'At the end of the charge phase, you can carry out 2 monstrous rampages with each friendly THUNDER LIZARD MONSTER instead of 1.',
          },
        },
        {
          name: 'koatl’s claw',
          ability: {
            name: 'Savagery Incarnate',
            description:
              'Add 1 to wound rolls for attacks made with melee weapons by friendly KOATL’S CLAW SAURUS and KOATL’S CLAW KROXIGOR units that made a charge move in the same turn.',
          },
        },
      ],
      battleTraits: [
        {
          name: 'Predatory Fighters',
          description:
            'Add 1 to bite rolls made for COALESCED SAURUS and COALESCED KROXIGOR units with the Mighty Saurus Jaws, Saurus Jaws or Vice-like Jaws ability.',
        },
        {
          name: 'Scaly Skin',
          description:
            'Subtract 1 from the damage inflicted (to a minimum of 1) by each successful attack that targets a friendly COALESCED unit that has the SAURUS, KROXIGOR or MONSTER keyword.',
        },
        {
          name: 'Beasts of the Dark Jungles',
          description:
            'When you carry out a monstrous rampage with a COALESCED MONSTER, you can carry out 1 of the monstrous rampages below instead of any other monstrous rampage you can carry out with that unit.',
        },
      ],
      enhancements: {
        commandTraits: [
          {
            name: 'Wrath of Aeons',
            description:
              'Once per battle, at the start of your combat phase, you can say that this general will rouse the wrath of the Seraphon. If you do so, until the end of that phase, add 1 to the Attacks characteristic of melee weapons used by friendly SAURUS and KROXIGOR units while they are wholly within 12" of this unit.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Custodian of Divine Technology',
            description:
              'Pick 2 artefacts of power from the Treasures of the Temple-cities table and note them on your roster. This general has both of those artefacts of power, but they cannot be given any others. These 2 artefacts of power are in addition to the first artefact of power enhancement you can take for your army.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Master of the Material Plane',
            description:
              'This general knows 2 extra spells from the Lore of Ancient Domains.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Dominating Mind',
            description:
              'Once per turn, at the start of your hero phase, you can pick 1 friendly COALESCED MONSTER unit on the battlefield and say that it will have its mind dominated by this general. If you do so, roll a dice. On a 2+, add 1 to wound rolls for attacks made with melee weapons by that unit until the start of your next hero phase. If the unit picked to have its mind dominated has a mount, this command trait only affects attacks made by that unit’s mount.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Prime Warbeast',
            description:
              'Unit with mount only. Add 1 to the Attacks characteristic of the weapons used by this general’s mount.',
            applicableKeywords: ['saurus'],
          },
          {
            name: 'Thickly Scaled Hide',
            description:
              'Add 1 to save rolls for attacks that target this general.',
            applicableKeywords: ['saurus'],
          },
          {
            name: 'Vengeful Defender',
            description:
              'At the start of your hero phase, if this general is wholly within your territory, you can pick this general and up to 2 other friendly SAURUS or KROXIGOR units wholly within 12" of this general to each make a normal move.',
            applicableKeywords: ['saurus'],
          },
        ],
        artefacts: [
          {
            name: 'Throne of the Lost Gods',
            description:
              'Add 4" to the bearer’s Move characteristic, and add 1 to the bearer’s Wounds characteristic.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Crystalline Skull',
            description:
              'The bearer starts with a power reserve of 0. Each time the bearer successfully casts a spell that is not unbound, increase the bearer’s power reserve by 1. Once per battle, in your hero phase, you can say that the bearer will shatter the crystalline skull. If you do so, pick 1 enemy unit within 12" of the bearer and roll a number of dice equal to the power reserve. For each 3+, that unit suffers 1 mortal wound.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Itxi Grubs',
            description:
              'At the start of each hero phase, you can heal 1 wound allocated to the bearer. In addition, in your hero phase, you can re-roll 1 casting roll or 1 dispelling roll for the bearer, and in the enemy hero phase, you can re-roll 1 unbinding roll for the bearer.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Coatl Familiar',
            description:
              'Once per battle, at the start of your hero phase, you can say that the bearer will be blessed by Tepok. If you do so, the bearer can attempt to cast 1 additional spell in that hero phase, and that spell can be any spell from the Lore of Ancient Domains.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Sotek’s Gaze',
            description:
              'Enemy models with a Wounds characteristic of 1 or 2 cannot contest objectives while they are within 6" of the bearer.',
            applicableKeywords: ['saurus'],
          },
          {
            name: 'Bloodrage Pendant',
            description:
              'Add 1 to the Attacks characteristic of the bearer’s melee weapons. If the number of wounds allocated to the bearer is equal to or greater than half of the bearer’s Wounds characteristic (rounding up), add 2 instead.',
            applicableKeywords: ['saurus'],
          },
          {
            name: 'Blade of Realities',
            description:
              'Pick 1 of the bearer’s melee weapons. Improve the Rend characteristic of that weapon by 1. In addition, add 1 to the damage inflicted by each successful attack made with that weapon that targets a HERO.',
            applicableKeywords: ['saurus'],
          },
        ],
        spellLores: [
          {
            name: 'The Earth Trembles',
            description:
              'The Earth Trembles is a spell that has a casting value of 8. If successfully cast, pick 1 of the corners of the battlefield and draw a straight line between that corner and the closest part of the caster’s base. Roll a dice for each enemy unit passed across by that line. On a 4+, that unit suffers D3 mortal wounds.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Empowered Celestite',
            description:
              'Empowered Celestite is a spell that has a casting value of 7 and a range of 18". If successfully cast, pick 1 friendly SAURUS unit wholly within range and visible to the caster. Until the start of the next hero phase, improve the Rend characteristic of that unit’s Celestite weapons by 1. A Celestite weapon is any weapon that has ‘Celestite’ in the name.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Drain Magic',
            description:
              'Drain Magic is a spell that has a casting value of 6. If successfully cast, until the end of the phase, each time a friendly SERAPHON WIZARD is picked to cast a spell, instead of attempting to cast that spell, they can attempt to dispel an endless spell. If they do so, add 1 to the dispelling roll. In addition, until the end of the phase, subtract 1 from unbinding rolls made for enemy units.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Itzl’s Invigoration',
            description:
              'Itzl’s Invigoration is a spell that has a casting value of 6 and a range of 12". If successfully cast, pick 1 friendly MONSTER wholly within range and visible to the caster. Until the start of your next hero phase, use the top row of that unit’s damage table, regardless of how many wounds it has suffered.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Telepathic Summons',
            description:
              'Telepathic Summons is a spell that has a casting value of 6 and a range of 9". If successfully cast, pick 1 friendly SERAPHON unit that is not a MONSTER and that is visible to the caster. Remove that unit from the battlefield and set it up again wholly within range of the caster and more than 9" from all enemy units. That unit cannot move in the next movement phase.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Light of Chotec',
            description:
              'Light of Chotec is a spell that has a casting value of 7 and a range of 12". If successfully cast, pick 1 friendly SERAPHON model wholly within range and visible to the caster. Roll a number of dice equal to the number of wounds allocated to it. For each 5+, heal 1 wound allocated to that model.',
            applicableKeywords: ['skink wizard'],
            includeUnique: true,
          },
          {
            name: 'Heavenly Frenzy',
            description:
              'Heavenly Frenzy is a spell that has a casting value of 7 and a range of 18". If successfully cast, pick 1 friendly SERAPHON unit wholly within range and visible to the caster. Until the end of the turn, that unit can run and still charge later in the turn.',
            applicableKeywords: ['skink wizard'],
            includeUnique: true,
          },
          {
            name: 'Tide of Serpents',
            description:
              'Tide of Serpents is a spell that has a casting value of 7 and a range of 15". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each 5+, that unit suffers 1 mortal wound.',
            applicableKeywords: ['skink wizard'],
            includeUnique: true,
          },
        ],
        prayer: [],
        triumphs: [],
      },
      monstrousRampages: [
        {
          name: 'Gargantuan Jaws',
          description:
            'Only a CARNOSAUR can carry out this monstrous rampage. Pick 1 enemy model within 3" of this unit and roll a dice. If the roll is greater than that model’s Wounds characteristic, it is slain.',
        },
        {
          name: 'Earthshaking Charge',
          description:
            'Only a STEGADON that has made a charge move in the same phase can carry out this monstrous rampage. Pick 1 enemy unit within 1" of this unit and roll a dice. On a 4+, the strike-last effect applies to that unit until the end of the following combat phase.',
        },
        {
          name: 'Odious Roar',
          description:
            'Only a TROGLODON can carry out this monstrous rampage. Roll a dice. On a 2+, until the end of the following combat phase, the range of this unit’s Stench of Death ability is 12" instead of 9".',
        },
        {
          name: 'Bludgeoning Sweep',
          description:
            'Only a BASTILADON can carry out this monstrous rampage. Pick 1 enemy unit within 3" of this unit that is not a MONSTER and roll a dice. If the roll is less than the number of models in that enemy unit, that enemy unit suffers a number of mortal wounds equal to the roll.',
        },
      ],
    },
    {
      name: 'starborne',
      subFactions: [
        {
          name: 'fangs of sotek',
          ability: {
            name: 'The Serpent Strikes',
            description:
              'The commanding player of a Fangs of Sotek army can use the Redeploy command ability up to 3 times in each of their opponent’s movement phases. In addition, the first 2 times the Redeploy command is issued to any friendly FANGS OF SOTEK SKINK units in a phase, no command points are spent.',
          },
        },
        {
          name: 'dracothion’s tail',
          ability: {
            name: 'Appear on Command',
            description:
              'During deployment, instead of setting up a DRACOTHION’S TAIL unit on the battlefield, you can place it to one side and say that it is set up on the temple-ship as a reserve unit. You can set up 1 unit on the temple-ship for each DRACOTHION’S TAIL unit you have set up on the battlefield. At the end of your movement phase, you can set up 1 or more of the reserve units on the temple-ship on the battlefield, wholly within 12" of a friendly cosmic node and more than 9" from all enemy units.',
          },
        },
      ],
      // TODO: add the cosmic power thing
      battleTraits: [],
      heroicActions: [
        {
          name: 'Contemplations of the Ancient Ones',
          description:
            'Pick 1 friendly STARBORNE SLANN. Replace 1 spell that they know from the Lore of Celestial Domination with another spell from that table.',
        },
        {
          name: 'Spatial Translocation',
          description:
            'Pick 1 friendly STARBORNE SLANN, and then pick 1 other friendly STARBORNE unit wholly within 12" of them. Remove that other STARBORNE unit from the battlefield and set it up again on the battlefield more than 9" from all enemy units. That unit cannot move in the following movement phase.',
        },
      ],
      enhancements: {
        commandTraits: [
          {
            name: 'Arcane Might',
            description:
              'This general can control up to 3 predatory endless spells per hero phase. In addition, when this general casts a spell that summons an endless spell, the range of that spell is doubled.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Higher State of Consciousness',
            description:
              'Ignore modifiers (positive and negative) to save rolls for attacks that target this general.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Lord of Celestial Resonance',
            description:
              'Each time this general successfully casts a spell that is not unbound, successfully unbinds a spell or successfully dispels an endless spell, you receive 2 cosmic power points instead of 1.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Vast Intellect',
            description:
              'This general knows 2 extra spells from the Lore of Celestial Domination.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Master of Star-rituals',
            description:
              'WIZARD only. This general knows all the spells from the Lore of Celestial Manipulation in addition to any other spells they know.',
            applicableKeywords: ['skink'],
          },
          {
            name: 'Nimble Warleader',
            description:
              'Roll 2D6 instead of D6 when making run rolls for friendly SKINK units while they are wholly within 18" of this general.',
            applicableKeywords: ['skink'],
          },
          {
            name: 'Shrewd Strategist',
            description:
              'Once per battle, at the start of your opponent’s combat phase, you can pick 1 friendly SERAPHON unit wholly within 18" of this general. If that unit is within 12" of any enemy units but more than 3" from all enemy units, it can immediately attempt a charge.',
            applicableKeywords: ['skink'],
          },
        ],
        artefacts: [
          {
            name: 'Relocation Orb',
            description:
              'Once per battle, at the end of a phase, if the bearer has had any wounds allocated to them in that phase, you can remove the bearer from the battlefield and set them up anywhere wholly within 12" of a friendly cosmic node and more than 9" from all enemy units.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Prism of Amyntok',
            description:
              'Once per battle, at the start of a phase, pick 1 enemy unit within 12" of the bearer and roll a dice. On a 1, nothing happens. On a 2+, that enemy unit suffers a number of mortal wounds equal to the roll.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Zoetic Dial',
            description:
              'After deployment but before the first battle round begins, secretly record the number of a battle round on a piece of paper. At the start of that battle round, reveal the information and then heal all wounds allocated to the bearer. In addition, during that battle round, add 1 to save rolls for attacks that target the bearer.',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Spacefolder’s Stave',
            description:
              'Once per turn, at the end of your movement phase, if the bearer is on the battlefield, you can say that they will guide the arrival of their celestial reinforcements. If you do so, the next friendly STARBORNE unit to be set up on the battlefield can be set up more than 7" from all enemy units instead of more than 9".',
            applicableKeywords: ['slaan'],
          },
          {
            name: 'Incandescent Rectrices',
            description:
              'At the start of each of your hero phases, you can heal up to D3 wounds allocated to the bearer.',
            applicableKeywords: ['skink'],
          },
          {
            name: 'Sacred Stegadon Helm',
            description:
              'Add 1 to save rolls for attacks that target the bearer. In addition, add 1 to the Damage characteristic of melee weapons used by the bearer if they made a charge move in the same turn.',
            applicableKeywords: ['skink'],
          },
          {
            name: 'Cloak of Feathers',
            description:
              'Unit that does not have the MONSTER keyword only. Subtract 1 from hit rolls for attacks that target the bearer. In addition, add 4" to the bearer’s Move characteristic, and the bearer can fly.',
            applicableKeywords: ['skink'],
          },
        ],
        spellLores: [
          {
            name: 'Comet’s Call',
            description:
              'Comet’s Call is a spell that has a casting value of 7. If successfully cast, pick up to D3 different enemy units on the battlefield. If the casting roll was 10+, pick up to D6 different enemy units instead of up to D3. Each of those units suffers D3 mortal wounds (roll separately for each unit).',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Tepok’s Beneficence',
            description:
              'Tepok’s Beneficence is a spell that has a casting value of 5 and a range of 18". If successfully cast, pick 1 friendly SKINK unit wholly within range and visible to the caster. Until the start of your next hero phase, subtract 1 from wound rolls for attacks that target that unit.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Drain Magic',
            description:
              'Drain Magic is a spell that has a casting value of 6. If successfully cast, until the end of the phase, each time a friendly SERAPHON WIZARD is picked to cast a spell, instead of attempting to cast that spell, they can attempt to dispel an endless spell. If they do so, add 1 to the dispelling roll. In addition, until the end of the phase, subtract 1 from unbinding rolls made for enemy units.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Mystical Unforging',
            description:
              'Mystical Unforging is a spell that has a casting value of 8 and a range of 12". If successfully cast, pick 1 enemy unit within range and visible to the caster. Until the start of your next hero phase, the Rend characteristic of that unit’s weapons is treated as ‘-’.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Stellar Tempest',
            description:
              'Stellar Tempest is a spell that has a casting value of 8 and a range of 24". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each 5+, that unit suffers 1 mortal wound.',
            applicableKeywords: ['slaan'],
            includeUnique: true,
          },
          {
            name: 'Cosmic Crush',
            description:
              'Cosmic Crush is a spell that has a casting value of 7 and a range of 12". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each roll that equals or exceeds that unit’s Save characteristic, that unit suffers 1 mortal wound.',
            applicableKeywords: ['skink'],
            includeUnique: true,
          },
          {
            name: 'Celestial Harmony',
            description:
              'Celestial Harmony is a spell that has a casting value of 5 and a range of 18". If successfully cast, pick 1 friendly SERAPHON unit wholly within range and visible to the caster. If the casting roll was 10+, pick all friendly SERAPHON units wholly within range and visible to the caster instead of 1. Until your next hero phase, the units picked have a Bravery characteristic of 10.',
            applicableKeywords: ['skink'],
            includeUnique: true,
          },
          {
            name: 'Speed of Huanchi',
            description:
              'Speed of Huanchi is a spell that has a casting value of 6 and a range of 18". If successfully cast, pick 1 friendly KROXIGOR or SKINK unit that is not a MONSTER and that is wholly within range and visible to the caster. That unit can make a normal move.',
            applicableKeywords: ['skink'],
            includeUnique: true,
          },
        ],
        prayer: [],
        triumphs: [],
      },
    },
  ],
  battalions: [{ name: 'Thunderquake' }],
};
