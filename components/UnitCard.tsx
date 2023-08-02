import React, { useState } from 'react';
import { ArmyBuilderEnhancement, PlayerArmyUnit } from '@/firestore/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltips/Tooltip';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useGameContext } from '@/context/GameContext';

type UnitCardProps = {
  unit: PlayerArmyUnit;
};
const UnitCard = ({ unit }: UnitCardProps) => {
  const { getUnits } = useGameContext();
  const [showSpellModal, setShowSpellModal] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<{
    spell: {};
    units: PlayerArmyUnit[];
  }>({
    spell: {},
    units: [] as PlayerArmyUnit[],
  });

  // when clicking on a spell, add it to the list of spells chosen
  // TODO: add a total spells available vs spells chosen indicator
  // TODO: in the tooltip show a success, fail, and miscast button
  // TODO: if miscast, apply the miscast effect..... need to look up what this is
  const handleSpell = (spell: {
    name: string;
    description: string;
    flavor: string;
    range: number;
    castingValue: number;
    effect: {
      onSuccess: {
        type: string;
        target: {
          type: string;
          amount: number;
          affiliation: string;
        };
      };
    };
  }) => {
    // check if spell has the property effect
    console.log('unit.name', unit.name);

    if (!spell?.effect) return;
    const { target, type } = spell.effect.onSuccess;
    console.log('target', target);

    // show applicable targets in a modal
    // if target is self, then just apply the effect
    // if target is enemy, then show a list of enemy units
    // if target is friendly, then show a list of friendly units
    // if target is all enemy, then show a list of all enemy units
    // if target is all friendly, then show a list of all friendly units
    const unitType = target.affiliation === 'friendly' ? 1 : 2;
    console.log('unitType', unitType);

    const applicableUnits = getUnits(unitType, []);

    setSelectedSpell({
      spell,
      units: applicableUnits,
    });
    setShowSpellModal(true);
    // this may need to be more than just a boolean
    // probably just pass everything to the modal and let it handle it
    // we would need a modal for all of the roll mechanics
  };

  const MainStats = () => (
    <div className="flex h-full w-full select-none justify-between border border-black p-4">
      <span>{unit.name}</span>
      <div className="flex gap-2 divide-x divide-gray-700 self-end">
        {Object.entries(unit.baseStats).map((stat) => (
          <div key={stat[0]} className="flex items-baseline gap-0.5 pl-0.5">
            <span className="font-bold capitalize">{stat[0][0]}</span>
            <span className="text-xs lg:text-sm">{stat[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const SpellSlide = () => {
    const { spells, enhancements } = unit;
    const { spellLores } = enhancements;
    const combinedSpells = [...(spells ?? []), ...([spellLores] ?? [])];
    return (
      <div className="flex h-full w-full flex-col items-start gap-2 border border-black p-2 text-[12px]">
        {combinedSpells.map((spell, i) => (
          <Tooltip key={spell!.name + i}>
            <TooltipTrigger asChild={false} className={'w-full'}>
              <button
                onClick={() => handleSpell(spell!)}
                className="flex w-full items-center justify-between whitespace-nowrap rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200"
              >
                <span>{spell!.name}</span>
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    <SpellIcon />
                    <span>{spell?.range ? `${spell.range}"` : '-'}</span>
                  </div>
                  <div className="flex gap-1">
                    <DiceIcon />
                    <span>{spell?.castingValue + '+'}</span>
                  </div>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex max-w-[350px] flex-col rounded bg-gray-700 bg-opacity-95 p-4 text-xs text-gray-100">
                {spell!.description}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      swipeable={true}
      showStatus={false}
      showIndicators={false}
      emulateTouch
      dynamicHeight={false}
    >
      <MainStats />
      <SpellSlide />
    </Carousel>
  );
};

const SpellIcon = () => (
  <svg
    fill="none"
    height="16"
    width="16"
    viewBox="0 0 150 147"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M29.1996 146.766C27.9644 146.892 26.717 146.724 25.5587 146.278C24.4006 145.83 23.3644 145.116 22.5348 144.192C15.8362 137.26 9.21526 130.253 2.67178 123.171C0.688781 121.02 0.971248 119.133 3.15701 116.707C11.0972 107.895 19.0506 99.0952 27.0171 90.3063C48.0494 67.1269 70.9907 45.871 93.5675 24.2471C101.252 16.8868 108.84 9.42604 116.45 1.98859C117.625 0.796834 119.206 0.0901938 120.878 0.00886453C122.55 -0.0724646 124.192 0.477471 125.477 1.54955C128.106 3.75584 130.6 6.13247 133.06 8.53044C137.425 12.7863 141.93 16.9281 145.986 21.467C150.075 26.0421 151.142 30.7138 146.532 35.7785C123.009 61.6289 98.3828 86.3736 72.6537 110.013C59.9772 121.612 47.1424 133.039 34.3848 144.55C32.8838 145.905 31.4268 147.323 29.1996 146.766ZM121.607 7.91006C83.039 45.0259 44.11 80.8232 9.0522 120.783C16.0105 126.78 22.1111 133.892 30.2853 138.737L34.9303 133.709C34.434 133.315 33.8037 132.872 33.2459 132.355C32.5904 131.757 31.9729 131.119 31.397 130.444C29.7969 128.544 29.5449 126.668 30.6624 125.354C31.9133 123.883 33.8678 123.819 36.0393 125.432C37.5242 126.532 38.8094 127.903 40.2826 129.243C40.9764 128.645 41.6657 128.111 42.2831 127.504C42.9503 126.847 43.5502 126.122 43.788 125.859C42.3304 124.162 41.0976 122.735 39.8745 121.301C38.7 119.923 38.1292 118.415 39.2979 116.784C40.2198 115.496 41.9275 115.309 43.7971 116.448C45.7555 117.642 47.5674 119.076 49.6404 120.546L53.703 116.695C52.9414 116.074 52.2279 115.396 51.5684 114.667C49.2272 111.592 46.8969 108.506 44.6723 105.347C44.4587 105.084 44.3011 104.78 44.209 104.455C44.117 104.128 44.0925 103.787 44.137 103.451C44.1816 103.115 44.2943 102.792 44.4683 102.501C44.6421 102.211 44.8736 101.958 45.1485 101.76C46.3521 100.777 47.6555 101.01 48.8054 101.926C49.5756 102.56 50.3014 103.247 50.9776 103.98C53.4879 106.617 55.9756 109.276 58.6608 112.128L60.9217 109.697C59.604 108.13 58.3738 106.847 57.3548 105.412C55.9393 103.419 56.0326 101.551 57.4041 100.304C58.6699 99.1528 60.4073 99.1956 62.2387 100.65C63.706 101.816 65.0193 103.176 66.7585 104.778L70.2846 100.282C69.0511 99.2674 67.8727 98.1886 66.7539 97.0489C65.1675 95.2868 65.0374 93.5953 66.1301 92.2497C67.2405 90.8826 68.9274 90.6994 70.9454 91.8611C71.8854 92.4472 72.7807 93.1019 73.6235 93.82C74.373 94.4139 75.0733 95.0699 75.7665 95.6728L80.3959 90.8658C78.1492 87.997 75.8753 85.1393 73.6585 82.2381C72.9212 81.2739 72.0389 80.2714 71.7584 79.1518C71.4824 78.0315 71.6392 76.8483 72.1963 75.8381C73.032 74.5876 74.5525 74.6433 75.7555 75.5266C76.7933 76.3497 77.7676 77.2485 78.6707 78.2167C81.1597 80.7021 83.624 83.2121 86.2671 85.8833L89.7006 82.5587C89.0249 81.5776 88.5216 80.8678 88.0409 80.1432C87.4546 79.337 86.9182 78.4958 86.4343 77.6241C85.4483 75.651 85.7061 73.6895 86.9732 72.7582C88.265 71.8095 90.1437 72.145 91.7348 73.7296C92.803 74.7923 93.7579 75.9683 94.8858 77.2311L98.2474 74.0417C97.6377 73.0322 97.1804 72.2933 96.7379 71.5395C96.2501 70.8006 95.8128 70.0287 95.428 69.2309C94.5353 67.101 94.9946 65.1317 96.5151 64.1798C97.9902 63.2545 99.6182 63.5803 101.284 65.203C102.134 66.0312 102.912 66.9339 104.03 68.1326L106.464 65.6627C104.446 62.7488 102.649 60.2303 100.94 57.6549C99.5929 55.6254 99.5417 53.8226 100.657 52.7981C101.899 51.6532 103.883 51.885 105.73 53.5273C106.787 54.5061 107.785 55.5467 108.718 56.6434C109.71 57.7637 110.634 58.9455 111.698 60.2375L115.866 55.5814C114.815 53.3797 113.858 51.5107 113.022 49.5886C112.32 47.9736 112.622 46.4668 114.168 45.5175C115.794 44.5182 117.168 45.3115 118.279 46.5484C119.232 47.6098 120.068 48.7748 121.16 50.1515L124.145 47.0082C123.542 46.1391 123.09 45.5187 122.672 44.8711C122.189 44.1283 121.7 43.3869 121.278 42.6092C120.088 40.4107 120.123 38.7172 121.333 37.7524C122.676 36.6832 124.282 37.1514 126.201 39.1965C127.001 40.0493 127.769 40.9319 128.676 41.9382L131.367 38.8643C130.032 36.8018 128.869 35.0481 127.752 33.2672C126.867 31.9964 126.086 30.6563 125.417 29.26C124.843 27.8917 124.791 26.3168 126.235 25.3681C126.844 24.9617 127.571 24.7714 128.299 24.8277C129.029 24.8841 129.718 25.1839 130.256 25.6789C130.941 26.2412 131.581 26.8555 132.171 27.5167C133.744 29.225 135.285 30.9618 137.004 32.8715L140.068 29.4031L121.607 7.91006Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          fill="white"
          height="147"
          transform="translate(0.777344)"
          width="149"
        />
      </clipPath>
    </defs>
  </svg>
);

const DiceIcon = () => (
  <svg
    viewBox="0 0 512 512"
    height="16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <polyline
      fill="none"
      points="69 153.99 256 263.99 443 153.99"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <line
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      x1="256"
      x2="256"
      y1="463.99"
      y2="263.99"
    />
    <ellipse cx="256" cy="152" rx="24" ry="16" />
    <ellipse cx="208" cy="296" rx="16" ry="24" />
    <ellipse cx="112" cy="328" rx="16" ry="24" />
    <ellipse cx="304" cy="296" rx="16" ry="24" />
    <ellipse cx="400" cy="240" rx="16" ry="24" />
    <ellipse cx="304" cy="384" rx="16" ry="24" />
    <ellipse cx="400" cy="328" rx="16" ry="24" />
  </svg>
);
export default UnitCard;