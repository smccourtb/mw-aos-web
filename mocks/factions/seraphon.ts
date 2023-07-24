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
      source: 'Masters of Order',
    },
    {
      name: 'Repel Corruption',
      description:
        'When the battle ends, you complete this grand strategy if there are no enemy units wholly within your territory.',
      source: 'Masters of Order',
    },
    {
      name: 'Continuous Expansion',
      description:
        'When the battle ends, you complete this grand strategy if there is at least 1 friendly SERAPHON unit wholly within each large quarter of the battlefield (core rules, 28.2.8).',
      source: 'Masters of Order',
    },
    {
      name: 'Further the Great Plan',
      description:
        'When the battle ends, you complete this grand strategy if you completed 4 or more battle tactics and each of those battle tactics was from the March of the Seraphon Host table below.',
      source: 'Masters of Order',
    },
  ],
  battleTactics: [
    {
      name: 'Stampede of Scales',
      description:
        'Pick 3 different friendly SERAPHON MONSTERS. You complete this tactic if each of those units runs in the following movement phase and finishes that run within 6" of at least 1 of the other units you picked and wholly within enemy territory.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
    {
      name: 'Celestial Obliteration',
      description:
        'Pick 1 enemy unit on the battlefield. You complete this tactic if that unit is destroyed this turn by mortal wounds caused by a spell or the abilities of an endless spell.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
    {
      name: 'Overwhelming Numbers',
      description:
        'Pick 1 objective controlled by the enemy. You complete this tactic at the end of this turn if you control that objective and all friendly units contesting it have the SKINK keyword.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
    {
      name: 'Apex Predator',
      description:
        'Pick 1 enemy MONSTER. You complete this tactic at the end of this turn if that enemy unit was destroyed by an attack made by a friendly SERAPHON MONSTER.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
    {
      name: 'Cold-blooded Resilience',
      description:
        'Pick 1 friendly SAURUS or KROXIGOR unit within 3" of an enemy unit. You complete this tactic at the end of this turn if that unit was not destroyed, did not retreat and was not removed from the battlefield.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
    {
      name: 'Pack Hunters',
      description:
        'Pick 1 enemy unit within 3" of only 1 friendly AGGRADON unit. You complete this tactic if, at the end of this turn, that unit is within 3" of 2 or more friendly AGGRADON units.',
      applicableSubfactions: [
        'thunder lizard',
        'dracothion’s tail',
        'koatl’s claw',
        'fangs of sotek',
      ],
      source: 'March of the Seraphon Host',
    },
  ],
  battleTraits: [
    {
      name: 'Mighty Beasts of War',
      description:
        'At the end of the charge phase, you can carry out 2 monstrous rampages with each friendly THUNDER LIZARD MONSTER instead of 1.',
      flavor:
        'The spawning pools of the Thunder Lizard give rise to bio-engineered monsters of terrible power.',
      applicableSubfactions: ['thunder lizard'],
    },
    {
      name: 'Savagery Incarnate',
      description:
        'Add 1 to wound rolls for attacks made with melee weapons by friendly KOATL’S CLAW SAURUS and KOATL’S CLAW KROXIGOR units that made a charge move in the same turn.',
      flavor:
        'The saurus and Kroxigor of Koatl’s Claw are renowned as being the most primordially vicious of their kind.',
      applicableSubfactions: ['koatl’s claw'],
    },
    {
      name: 'Predatory Fighters',
      description:
        'Add 1 to bite rolls made for COALESCED SAURUS and COALESCED KROXIGOR units with the Mighty Saurus Jaws, Saurus Jaws or Vice-like Jaws ability.',
      flavor:
        'Coalesced Seraphon have become more closely attuned to the ferocity harboured by all members of their race, ripping chunks of bloody flesh from the enemy as they battle.',
      applicableSubfactions: ['koatl’s claw', 'thunder lizard'],
      type: 'unitModifier',
      target: {
        affiliation: 'friendly',
        keywords: {
          every: ['coalesced'],
          some: ['saurus', 'kroxigor'],
        },
        condition: {
          type: 'ability',
          keywords: {
            every: null,
            some: ['mightySaurusJaws', 'saurusJaws', 'viceLikeJaws'],
          },
        },
      },
    },
    {
      name: 'Scaly Skin',
      description:
        'Subtract 1 from the damage inflicted (to a minimum of 1) by each successful attack that targets a friendly COALESCED unit that has the SAURUS, KROXIGOR or MONSTER keyword.',
      flavor:
        'Having achieved true physicality, the scaled hides of Coalesced Seraphon become tougher with the passing of time. Many of their warriors develop thick bony plates and latticeworks of scar tissue that act as natural armour.',
      applicableSubfactions: ['koatl’s claw', 'thunder lizard'],
    },
    {
      name: 'Beasts of the Dark Jungles',
      description:
        'When you carry out a monstrous rampage with a COALESCED MONSTER, you can carry out 1 of the monstrous rampages below instead of any other monstrous rampage you can carry out with that unit.',
      flavor:
        'Primal jungles stretch for miles around the temple-cities of the Coalesced. These perilous wildernesses give rise to truly awe-inspiring reptilian titans, perfect for taming into beasts of war.',
      applicableSubfactions: ['koatl’s claw', 'thunder lizard'],
    },
    {
      name: 'The Serpent Strikes',
      description:
        'The commanding player of a Fangs of Sotek army can use the Redeploy command ability up to 3 times in each of their opponent’s movement phases. In addition, the first 2 times the Redeploy command is issued to any friendly FANGS OF SOTEK SKINK units in a phase, no command points are spent.',
      applicableSubfactions: ['fangs of sotek'],
    },
    {
      name: 'Appear on Command',
      description:
        'During deployment, instead of setting up a DRACOTHION’S TAIL unit on the battlefield, you can place it to one side and say that it is set up on the temple-ship as a reserve unit. You can set up 1 unit on the temple-ship for each DRACOTHION’S TAIL unit you have set up on the battlefield. At the end of your movement phase, you can set up 1 or more of the reserve units on the temple-ship on the battlefield, wholly within 12" of a friendly cosmic node and more than 9" from all enemy units.',
      applicableSubfactions: ['dracothion’s tail'],
    },
  ],
  heroicActions: [
    {
      name: 'Contemplations of the Ancient Ones',
      description:
        'Pick 1 friendly STARBORNE SLANN. Replace 1 spell that they know from the Lore of Celestial Domination with another spell from that table.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
    },
    {
      name: 'Spatial Translocation',
      description:
        'Pick 1 friendly STARBORNE SLANN, and then pick 1 other friendly STARBORNE unit wholly within 12" of them. Remove that other STARBORNE unit from the battlefield and set it up again on the battlefield more than 9" from all enemy units. That unit cannot move in the following movement phase.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
    },
  ],
  commandTraits: [
    {
      name: 'Arcane Might',
      description:
        'This general can control up to 3 predatory endless spells per hero phase. In addition, when this general casts a spell that summons an endless spell, the range of that spell is doubled.',
      flavor:
        'With the authority of aeons, this powerful slann commands the flow of magic on the battlefield.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Starmaster Disciplines',
    },
    {
      name: 'Higher State of Consciousness',
      description:
        'Ignore modifiers (positive and negative) to save rolls for attacks that target this general.',
      flavor:
        'So deep are the Starmaster’s thoughts that their body becomes a ghostly image as it slips from this reality.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Starmaster Disciplines',
    },
    {
      name: 'Lord of Celestial Resonance',
      description:
        'Each time this general successfully casts a spell that is not unbound, successfully unbinds a spell or successfully dispels an endless spell, you receive 2 cosmic power points instead of 1.',
      flavor:
        'This slann is so attuned to the energies of the heavens that they can manipulate them with a mere thought.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Starmaster Disciplines',
    },
    {
      name: 'Vast Intellect',
      description:
        'This general knows 2 extra spells from the Lore of Celestial Domination.',
      flavor: 'No secret is unknown to the mind of this unfathomable being.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Starmaster Disciplines',
    },
    {
      name: 'Master of Star-rituals',
      description:
        'WIZARD only. This general knows all the spells from the Lore of Celestial Manipulation in addition to any other spells they know.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Celestial Attendants',
    },
    {
      name: 'Nimble Warleader',
      description:
        'Roll 2D6 instead of D6 when making run rolls for friendly SKINK units while they are wholly within 18" of this general.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Celestial Attendants',
    },
    {
      name: 'Shrewd Strategist',
      description:
        'Once per battle, at the start of your opponent’s combat phase, you can pick 1 friendly SERAPHON unit wholly within 18" of this general. If that unit is within 12" of any enemy units but more than 3" from all enemy units, it can immediately attempt a charge.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Celestial Attendants',
    },
    {
      name: 'Wrath of Aeons',
      description:
        'Once per battle, at the start of your combat phase, you can say that this general will rouse the wrath of the Seraphon. If you do so, until the end of that phase, add 1 to the Attacks characteristic of melee weapons used by friendly SAURUS and KROXIGOR units while they are wholly within 12" of this unit.',
      flavor:
        'This slann’s cold disdain for any who would thwart the will of the Old Ones has spread to their more ferocious servants.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Lords of the Temple-cities',
    },
    {
      name: 'Custodian of Divine Technology',
      description:
        'Pick 2 artefacts of power from the Treasures of the Temple-cities table and note them on your roster. This general has both of those artefacts of power, but they cannot be given any others. These 2 artefacts of power are in addition to the first artefact of power enhancement you can take for your army.',
      flavor:
        'The vaults of this Starmaster’s temple-city contain some of the most powerful known artefacts of the Old Ones.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Lords of the Temple-cities',
    },
    {
      name: 'Master of the Material Plane',
      description:
        'This general knows 2 extra spells from the Lore of Ancient Domains.',
      flavor:
        'The proficiency shown by this slann in manipulating their physical surroundings is beyond compare.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Lords of the Temple-cities',
    },
    {
      name: 'Dominating Mind',
      description:
        'Once per turn, at the start of your hero phase, you can pick 1 friendly COALESCED MONSTER unit on the battlefield and say that it will have its mind dominated by this general. If you do so, roll a dice. On a 2+, add 1 to wound rolls for attacks made with melee weapons by that unit until the start of your next hero phase. If the unit picked to have its mind dominated has a mount, this command trait only affects attacks made by that unit’s mount.',
      flavor:
        'This slann can telepathically seize control of the monstrous beasts their servants bring to war, directing their every action to ensure the Great Plan continues apace.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Lords of the Temple-cities',
    },
    {
      name: 'Prime Warbeast',
      description:
        'Unit with mount only. Add 1 to the Attacks characteristic of the weapons used by this general’s mount.',
      flavor: 'The beast this general rides upon is particularly vicious.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Savage Commanders',
    },
    {
      name: 'Thickly Scaled Hide',
      description: 'Add 1 to save rolls for attacks that target this general.',
      flavor:
        'The hard scales covering this general can deflect even the sharpest blade.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Savage Commanders',
    },
    {
      name: 'Vengeful Defender',
      description:
        'At the start of your hero phase, if this general is wholly within your territory, you can pick this general and up to 2 other friendly SAURUS or KROXIGOR units wholly within 12" of this general to each make a normal move.',
      flavor:
        'This spawnlord tirelessly hunts foes through the Seraphon’s sacred domains.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Savage Commanders',
    },
  ],
  artefacts: [
    {
      name: 'Throne of the Lost Gods',
      description:
        'Add 4" to the bearer’s Move characteristic, and add 1 to the bearer’s Wounds characteristic.',
      flavor:
        'The palanquin that bears this slann is a particularly advanced example of Old One technology, a truly stately throne for the mage-lord ensconced in it.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Treasures of the Temple-cities',
    },
    {
      name: 'Crystalline Skull',
      description:
        'The bearer starts with a power reserve of 0. Each time the bearer successfully casts a spell that is not unbound, increase the bearer’s power reserve by 1. Once per battle, in your hero phase, you can say that the bearer will shatter the crystalline skull. If you do so, pick 1 enemy unit within 12" of the bearer and roll a number of dice equal to the power reserve. For each 3+, that unit suffers 1 mortal wound.',
      flavor:
        'Fashioned from meteoric diamond, this strange-looking skull can not only illuminate the presence of ley-line convergences but also unleash devastating bursts of raw arcana.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Treasures of the Temple-cities',
    },
    {
      name: 'Itxi Grubs',
      description:
        'At the start of each hero phase, you can heal 1 wound allocated to the bearer. In addition, in your hero phase, you can re-roll 1 casting roll or 1 dispelling roll for the bearer, and in the enemy hero phase, you can re-roll 1 unbinding roll for the bearer.',
      flavor:
        'Itxi grubs are small, worm-like creatures found in those places where the ground is most saturated in arcane power, and they are amongst a slann’s favourite delicacies.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Treasures of the Temple-cities',
    },
    {
      name: 'Coatl Familiar',
      description:
        'Once per battle, at the start of your hero phase, you can say that the bearer will be blessed by Tepok. If you do so, the bearer can attempt to cast 1 additional spell in that hero phase, and that spell can be any spell from the Lore of Ancient Domains.',
      flavor:
        'Though only a juvenile example of the great feathered serpents, this winged creature is still sacred to the mage-god Tepok.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Treasures of the Temple-cities',
    },
    {
      name: 'Sotek’s Gaze',
      description:
        'Enemy models with a Wounds characteristic of 1 or 2 cannot contest objectives while they are within 6" of the bearer.',
      flavor:
        'The eyes of this gilded war-mask resonate with the pitiless hunger of the Serpent God. Lesser foes cannot help but be cowed by its gaze.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Relics of the Warrior',
    },
    {
      name: 'Bloodrage Pendant',
      description:
        'Add 1 to the Attacks characteristic of the bearer’s melee weapons. If the number of wounds allocated to the bearer is equal to or greater than half of the bearer’s Wounds characteristic (rounding up), add 2 instead.',
      flavor:
        'Carved from the bones of savage reptilian megafauna, the Bloodrage Pendant spurs a warrior’s killing rage - all the more should they themselves shed gore.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Relics of the Warrior',
    },
    {
      name: 'Blade of Realities',
      description:
        'Pick 1 of the bearer’s melee weapons. Improve the Rend characteristic of that weapon by 1. In addition, add 1 to the damage inflicted by each successful attack made with that weapon that targets a HERO.',
      flavor:
        'This pandimensional weapon exists to bring about the end of tyrants.',
      applicableKeywords: ['saurus'],
      applicableSubFactions: ['thunder lizard', 'koatl’s claw'],
      source: 'Relics of the Warrior',
    },
    {
      name: 'Relocation Orb',
      description:
        'Once per battle, at the end of a phase, if the bearer has had any wounds allocated to them in that phase, you can remove the bearer from the battlefield and set them up anywhere wholly within 12" of a friendly cosmic node and more than 9" from all enemy units.',
      flavor:
        'Only the slann can hope to bind the energies of these bizarre phenomena, drawing upon their arcane emanations to rapidly translocate across the weave of reality.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Treasures of the Old Ones',
    },
    {
      name: 'Prism of Amyntok',
      description:
        'Once per battle, at the start of a phase, pick 1 enemy unit within 12" of the bearer and roll a dice. On a 1, nothing happens. On a 2+, that enemy unit suffers a number of mortal wounds equal to the roll.',
      flavor:
        'This prism can channel aetheric power from the skies to blast the bearer’s foes with a beam of pure white energy.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Treasures of the Old Ones',
    },
    {
      name: 'Zoetic Dial',
      description:
        'After deployment but before the first battle round begins, secretly record the number of a battle round on a piece of paper. At the start of that battle round, reveal the information and then heal all wounds allocated to the bearer. In addition, during that battle round, add 1 to save rolls for attacks that target the bearer.',
      flavor:
        'As the stars align with the facets of this mighty artefact, the strands of fate inexorably envelop its bearer.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Treasures of the Old Ones',
    },
    {
      name: 'Spacefolder’s Stave',
      description:
        'Once per turn, at the end of your movement phase, if the bearer is on the battlefield, you can say that they will guide the arrival of their celestial reinforcements. If you do so, the next friendly STARBORNE unit to be set up on the battlefield can be set up more than 7" from all enemy units instead of more than 9".',
      flavor:
        'By focusing on this esoteric baton, the Starmaster sees the teleportation technologies of their vessel glow with enhanced power.',
      applicableKeywords: ['slaan'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Treasures of the Old Ones',
    },
    {
      name: 'Incandescent Rectrices',
      description:
        'At the start of each of your hero phases, you can heal up to D3 wounds allocated to the bearer.',
      flavor:
        'This vibrant plumage imbues the bearer with the restorative power of the heavens.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Vestments of the Priesthood',
    },
    {
      name: 'Sacred Stegadon Helm',
      description:
        'Add 1 to save rolls for attacks that target the bearer. In addition, add 1 to the Damage characteristic of melee weapons used by the bearer if they made a charge move in the same turn.',
      flavor:
        'The horns of this golden helm are said to be fragments of the great Xelbabia’s, a truly colossal Stegadon who served the Old Ones at the dawn of history. Those who wear it are gifted with the strength of Xelbabia’s unstoppable charge.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Vestments of the Priesthood',
    },
    {
      name: 'Cloak of Feathers',
      description:
        'Unit that does not have the MONSTER keyword only. Subtract 1 from hit rolls for attacks that target the bearer. In addition, add 4" to the bearer’s Move characteristic, and the bearer can fly.',
      flavor:
        'The colourful cloaks worn by some skink priests are woven from the shining feathers of Star-eagles.',
      applicableKeywords: ['skink'],
      applicableSubFactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Vestments of the Priesthood',
    },
  ],
  spellLores: [
    {
      name: 'Comet’s Call',
      description:
        'Comet’s Call is a spell that has a casting value of 7. If successfully cast, pick up to D3 different enemy units on the battlefield. If the casting roll was 10+, pick up to D6 different enemy units instead of up to D3. Each of those units suffers D3 mortal wounds (roll separately for each unit).',
      flavor:
        'Their consciousness soaring up to the heavens, the slann summons a cluster of comets before casting them into the enemy’s ranks.',
      applicableKeywords: ['slaan'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Domination',
    },
    {
      name: 'Tepok’s Beneficence',
      description:
        'Tepok’s Beneficence is a spell that has a casting value of 5 and a range of 18". If successfully cast, pick 1 friendly SKINK unit wholly within range and visible to the caster. Until the start of your next hero phase, subtract 1 from wound rolls for attacks that target that unit.',
      flavor:
        'The slann harnesses the arcane principles of Tepok’s Third Manifesting to safeguard their more subtle minions from harm.',
      applicableKeywords: ['slaan'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Domination',
    },
    {
      name: 'Drain Magic',
      description:
        'Drain Magic is a spell that has a casting value of 6. If successfully cast, until the end of the phase, each time a friendly SERAPHON WIZARD is picked to cast a spell, instead of attempting to cast that spell, they can attempt to dispel an endless spell. If they do so, add 1 to the dispelling roll. In addition, until the end of the phase, subtract 1 from unbinding rolls made for enemy units.',
      flavor:
        'The Starmaster conjures a vortex of anti-magic to calm the battlefield.',
      applicableKeywords: ['slaan'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Domination',
    },
    {
      name: 'Mystical Unforging',
      description:
        'Mystical Unforging is a spell that has a casting value of 8 and a range of 12". If successfully cast, pick 1 enemy unit within range and visible to the caster. Until the start of your next hero phase, the Rend characteristic of that unit’s weapons is treated as ‘-’.',
      flavor:
        'The magic of unmaking flies from the slann’s outstretched hands.',
      applicableKeywords: ['slaan'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Domination',
    },
    {
      name: 'Stellar Tempest',
      description:
        'Stellar Tempest is a spell that has a casting value of 8 and a range of 24". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each 5+, that unit suffers 1 mortal wound.',
      flavor:
        'Without warning, a blistering celestial storm descends upon the foe.',
      applicableKeywords: ['slaan'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Domination',
    },
    {
      name: 'Cosmic Crush',
      description:
        'Cosmic Crush is a spell that has a casting value of 7 and a range of 12". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each roll that equals or exceeds that unit’s Save characteristic, that unit suffers 1 mortal wound.',
      flavor:
        'With a chirruped incantation, the skink conjures a localised gravity well to bury foes under the weight of their own bulk and armour.',
      applicableKeywords: ['skink'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Manipulation',
    },
    {
      name: 'Celestial Harmony',
      description:
        'Celestial Harmony is a spell that has a casting value of 5 and a range of 18". If successfully cast, pick 1 friendly SERAPHON unit wholly within range and visible to the caster. If the casting roll was 10+, pick all friendly SERAPHON units wholly within range and visible to the caster instead of 1. Until your next hero phase, the units picked have a Bravery characteristic of 10.',
      flavor:
        'Arms raised, the caster infuses their allies with the calming light of Azyr.',
      applicableKeywords: ['skink'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Manipulation',
    },
    {
      name: 'Speed of Huanchi',
      description:
        'Speed of Huanchi is a spell that has a casting value of 6 and a range of 18". If successfully cast, pick 1 friendly KROXIGOR or SKINK unit that is not a MONSTER and that is wholly within range and visible to the caster. That unit can make a normal move.',
      flavor:
        'With the grace and momentum of a prowling beast, the allies of the priestly mage are filled with a celestial haste.',
      applicableKeywords: ['skink'],
      includeUnique: true,
      applicableSubfactions: ['fangs of sotek', 'dracothion’s tail'],
      source: 'Lore of Celestial Manipulation',
    },
    {
      name: 'The Earth Trembles',
      description:
        'The Earth Trembles is a spell that has a casting value of 8. If successfully cast, pick 1 of the corners of the battlefield and draw a straight line between that corner and the closest part of the caster’s base. Roll a dice for each enemy unit passed across by that line. On a 4+, that unit suffers D3 mortal wounds.',
      flavor:
        'With a focused pulse of will, the Starmaster sets the energy of the ley lines spiking until the ground is violently torn asunder.',
      applicableKeywords: ['slaan'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Ancient Domains',
    },
    {
      name: 'Empowered Celestite',
      description:
        'Empowered Celestite is a spell that has a casting value of 7 and a range of 18". If successfully cast, pick 1 friendly SAURUS unit wholly within range and visible to the caster. Until the start of the next hero phase, improve the Rend characteristic of that unit’s Celestite weapons by 1. A Celestite weapon is any weapon that has ‘Celestite’ in the name.',
      flavor:
        'Tapping into the ancient technologies within the Coalesced’s weapons, a light is birthed in each; for a few moments, every strike shatters armour in an explosion of sparks.',
      applicableKeywords: ['slaan'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Ancient Domains',
    },
    {
      name: 'Drain Magic',
      description:
        'Drain Magic is a spell that has a casting value of 6. If successfully cast, until the end of the phase, each time a friendly SERAPHON WIZARD is picked to cast a spell, instead of attempting to cast that spell, they can attempt to dispel an endless spell. If they do so, add 1 to the dispelling roll. In addition, until the end of the phase, subtract 1 from unbinding rolls made for enemy units.',
      flavor:
        'The Starmaster conjures a vortex of anti-magic to calm the battlefield.',
      applicableKeywords: ['slaan'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Ancient Domains',
    },
    {
      name: 'Itzl’s Invigoration',
      description:
        'Itzl’s Invigoration is a spell that has a casting value of 6 and a range of 12". If successfully cast, pick 1 friendly MONSTER wholly within range and visible to the caster. Until the start of your next hero phase, use the top row of that unit’s damage table, regardless of how many wounds it has suffered.',
      flavor:
        'The slann calls upon the energy of the almighty Tamer to guide a cold-blooded beast in battle and ensure the Great Plan comes to fruition.',
      applicableKeywords: ['slaan'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Ancient Domains',
    },
    {
      name: 'Telepathic Summons',
      description:
        'Telepathic Summons is a spell that has a casting value of 6 and a range of 9". If successfully cast, pick 1 friendly SERAPHON unit that is not a MONSTER and that is visible to the caster. Remove that unit from the battlefield and set it up again wholly within range of the caster and more than 9" from all enemy units. That unit cannot move in the next movement phase.',
      flavor:
        'Words of power resonate in the minds of the Starmaster’s warriors before they blink out of reality, only to reappear by the slann’s side.',
      applicableKeywords: ['slaan'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Ancient Domains',
    },
    {
      name: 'Light of Chotec',
      description:
        'Light of Chotec is a spell that has a casting value of 7 and a range of 12". If successfully cast, pick 1 friendly SERAPHON model wholly within range and visible to the caster. Roll a number of dice equal to the number of wounds allocated to it. For each 5+, heal 1 wound allocated to that model.',
      flavor:
        'The wizard calls upon the sun god Chotec to energise an injured warrior with rays of invigorating solar magics.',
      applicableKeywords: ['skink wizard'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Primal Jungles',
    },
    {
      name: 'Heavenly Frenzy',
      description:
        'Heavenly Frenzy is a spell that has a casting value of 7 and a range of 18". If successfully cast, pick 1 friendly SERAPHON unit wholly within range and visible to the caster. Until the end of the turn, that unit can run and still charge later in the turn.',
      flavor:
        'The priest siphons power from the most wrathful asterisms and funnels it into their already savage spawn-kin.',
      applicableKeywords: ['skink wizard'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Primal Jungles',
    },
    {
      name: 'Tide of Serpents',
      description:
        'Tide of Serpents is a spell that has a casting value of 7 and a range of 15". If successfully cast, pick 1 enemy unit within range and visible to the caster. Roll a number of dice equal to the number of models in that unit. For each 5+, that unit suffers 1 mortal wound.',
      flavor:
        'The caster calls forth a carpet of writhing snakes that brings down the enemy through hundreds of poisonous bites.',
      applicableKeywords: ['skink wizard'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
      includeUnique: true,
      source: 'Lore of Primal Jungles',
    },
  ],
  prayers: [],
  triumphs: [],
  monstrousRampages: [
    {
      name: 'Gargantuan Jaws',
      description:
        'Only a CARNOSAUR can carry out this monstrous rampage. Pick 1 enemy model within 3" of this unit and roll a dice. If the roll is greater than that model’s Wounds characteristic, it is slain.',
      applicableKeywords: ['carnosaur'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
    },
    {
      name: 'Earthshaking Charge',
      description:
        'Only a STEGADON that has made a charge move in the same phase can carry out this monstrous rampage. Pick 1 enemy unit within 1" of this unit and roll a dice. On a 4+, the strike-last effect applies to that unit until the end of the following combat phase.',
      applicableKeywords: ['stegadon'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
    },
    {
      name: 'Odious Roar',
      description:
        'Only a TROGLODON can carry out this monstrous rampage. Roll a dice. On a 2+, until the end of the following combat phase, the range of this unit’s Stench of Death ability is 12" instead of 9".',
      applicableKeywords: ['troglodon'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
    },
    {
      name: 'Bludgeoning Sweep',
      description:
        'Only a BASTILADON can carry out this monstrous rampage. Pick 1 enemy unit within 3" of this unit that is not a MONSTER and roll a dice. If the roll is less than the number of models in that enemy unit, that enemy unit suffers a number of mortal wounds equal to the roll.',
      applicableKeywords: ['bastiladon'],
      applicableSubfactions: ['thunder lizard', 'koatl’s claw'],
    },
  ],
  armyTypes: [
    { name: 'coalesced', subFactions: ['thunder lizard', 'koatl’s claw'] },
    { name: 'starborne', subFactions: ['fangs of sotek', 'dracothion’s tail'] },
  ],
  subfactions: {
    names: [
      'Thunder Lizard',
      'Koatl’s Claw',
      'Fangs of Sotek',
      'Dracothion’s Tail',
    ],
    flavorName: 'constellation',
  },
  battalions: [{ name: 'Thunderquake' }],
};
