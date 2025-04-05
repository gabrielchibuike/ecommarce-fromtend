"use client";
import { InputsTypes } from "@/interface/customIputTypes";
import { UseFormRegisterReturn } from "react-hook-form";
type CustomInputType = {
  label?: string;
  addtional_class?: string;
  name?: keyof InputsTypes;
  placeholder?: string;
  input_type: string;
  icon?: JSX.Element;
  register?: UseFormRegisterReturn;
  errors?: string;
};
function CustomInput({
  label,
  addtional_class,
  name,
  input_type,
  placeholder,
  register,
  errors,
}: CustomInputType) {
  return (
    <div className="relative w-full flex flex-col ">
      <label className="text-xs  py-1 text-zinc-800 font-bold">{label}</label>
      <input
        type={input_type}
        placeholder={placeholder}
        className={`w-full py-2  px-3  text-xs focus:outline-none  font-semibold rounded-lg border border-zinc-600/20   ${addtional_class}`}
        {...register}
      />
      {errors && (
        <span className="text-red-400 text-xs font-bold">{errors}</span>
      )}
    </div>
  );
}

export default CustomInput;
