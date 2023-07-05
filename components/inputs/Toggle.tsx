import { Switch } from '@headlessui/react';
import { Control, useController } from 'react-hook-form';

type ToggleProps = {
  name: string;
  control: Control<any>;
};
const Toggle = ({ name, control }: ToggleProps) => {
  const { field } = useController({ name, control });
  const { value, onChange } = field;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={'text-xs font-bold'}>Required</span>

      <Switch
        checked={value}
        onChange={onChange}
        className={`${value ? 'bg-teal-900' : 'bg-gray-400'}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
