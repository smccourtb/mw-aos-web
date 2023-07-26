import React from 'react';

type ProgressBarProps = {
  duration: number;
  start: boolean;
};
const ProgressBar = ({ duration, start }: ProgressBarProps) => {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full">
      <div className="absolute h-full w-full bg-gray-700"></div>
      <div
        className={`relative h-full bg-white transition-all duration-[${duration.toString()}ms] ease-linear ${
          start ? 'w-full' : 'w-0'
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
