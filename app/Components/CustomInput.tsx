/* eslint-disable react/react-in-jsx-scope */
"use client";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { EyeIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const getInputType = () => {
    if (input_type === "password") {
      return showPassword ? "text" : "password";
    }
    return input_type;
  };
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
        <div className="relative">
          <input
            type={getInputType()}
            placeholder={placeholder}
            className={`w-full py-3  px-3  text-xs focus:outline-none  font-semibold rounded-lg border border-zinc-600/20 focus:border-primary  ${addtional_class}`}
            {...register}
          />
          {input_type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
        {errors && (
          <span className="text-red-400 text-xs font-bold">{errors}</span>
        )}
      </div>
    </>
  );
}

export default CustomInput;
