import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import ProgressBar from '@/components/ProgressBar';
import { CustomContentProps } from 'notistack';

interface ReceivedCommandPointAlertProps extends CustomContentProps {}
const ReceivedCommandPointAlert = React.forwardRef<
  HTMLDivElement,
  ReceivedCommandPointAlertProps
>((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    id,
    message,
    style,
  } = props;
  return (
    <div
      ref={ref}
      style={style}
      className="flex w-full transform flex-col items-center overflow-hidden rounded bg-black shadow-xl transition-all"
    >
      <div className="flex w-full items-center gap-4 p-2">
        <h4 className="flex items-center gap-1 self-start text-sm text-white">
          {<ExclamationCircleIcon className="h-5 w-5 text-white" />}
          You received a command point!
        </h4>
        <p className="text-sm text-gray-500">{message ?? ''}</p>
      </div>
      <ProgressBar duration={5000} start={true} />
    </div>
  );
});

export default ReceivedCommandPointAlert;
