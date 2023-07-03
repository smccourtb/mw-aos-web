import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

type InputProps = {
  type?: string;
};
const Input = (props: UseControllerProps<any> & InputProps) => {
  const { field, fieldState } = useController(props);
  const label = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <div className="relative flex flex-col">
      <input
        {...field}
        placeholder={label}
        type={props.type || 'text'}
        className="peer rounded-md focus:outline-none"
      />
      <div className="peer-placeholder-show:text-gray-400 pointer-events-none absolute -translate-y-2.5 translate-x-3 select-none bg-white px-1 text-sm font-medium text-blue-700 opacity-100 transition-all peer-placeholder-shown:translate-y-1 peer-placeholder-shown:opacity-0">
        <label>{label}</label>
      </div>

      <small className="absolute -bottom-5 left-0 whitespace-nowrap text-xs text-red-700">
        {fieldState.error?.message}
      </small>
    </div>
  );
};

export default Input;