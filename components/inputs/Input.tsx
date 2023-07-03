import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

type InputProps = {
  type?: string;
  label: string;
};
const Input = (props: UseControllerProps<any> & InputProps) => {
  const { field, fieldState } = useController(props);
  return (
    <div className="relative flex flex-col">
      <input
        {...field}
        placeholder={props.label}
        type={props.type || 'text'}
        className="peer rounded-md placeholder:text-xs focus:outline-none"
      />
      <div className="peer-placeholder-show:text-gray-400 pointer-events-none absolute -translate-y-2.5 translate-x-3 select-none bg-white px-1 text-sm font-medium text-blue-700 opacity-100 transition-all peer-placeholder-shown:translate-y-1 peer-placeholder-shown:opacity-0">
        <label>{props.label}</label>
      </div>

      <small className="absolute -bottom-5 left-0 whitespace-nowrap text-xs text-red-700">
        {fieldState.error?.message}
      </small>
    </div>
  );
};

export default Input;
