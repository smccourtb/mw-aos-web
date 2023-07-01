import React from 'react';

import type { Icon } from '@/components/icons/interface/Icon';

const UserPicSVG: React.FC<Icon> = ({ className }) => {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_iconCarrier">
        <circle
          cx="12"
          cy="10"
          r="3"
          stroke="#222222"
          strokeLinecap="round"
        ></circle>
        <circle cx="12" cy="12" r="9" stroke="#222222"></circle>
        <path
          d="M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059"
          stroke="#222222"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
};

export default UserPicSVG;
