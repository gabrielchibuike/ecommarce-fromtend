/* eslint-disable react/react-in-jsx-scope */
"use client";
import { UseFormRegisterReturn } from "react-hook-form";
type CustomInputType = {
  label?: string;
  addtional_class?: string;
  hideAsteric?: string;
  // name?: keyof InputsTypes;
  placeholder?: string;
  input_type: string;
  icon?: JSX.Element;
  register?: UseFormRegisterReturn;
  errors?: string;
};
function CustomInput({
  label,
  addtional_class,
  hideAsteric,
  // name,
  input_type,
  placeholder,
  register,
  errors,
}: CustomInputType) {
  return (
    <>
      <div className="relative w-full flex flex-col ">
        <div className="flex gap-2 items-center">
          <label className="text-sm  py-1 text-zinc-800 font-">{label}</label>
          <div
            className={`text-sm  py-1 text-zinc-800 font-bold ${hideAsteric}`}
          >
            *
          </div>
        </div>
        <input
          type={input_type}
          placeholder={placeholder}
          className={`w-full py-3  px-3  text-xs focus:outline-none  font-semibold rounded-lg border border-zinc-600/20 focus:border-primary  ${addtional_class}`}
          {...register}
        />
        {errors && (
          <span className="text-red-400 text-xs font-bold">{errors}</span>
        )}
      </div>
    </>
  );
}

export default CustomInput;
