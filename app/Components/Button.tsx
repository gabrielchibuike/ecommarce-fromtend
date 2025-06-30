import React from "react";

type ButtonType = {
  addtional_class?: string;
  btn_text: string | JSX.Element;
  onclick_event?: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
};
export default function Button({
  addtional_class,
  btn_text,
  onclick_event,
  disabled,
  isSubmitting,
}: ButtonType) {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting || disabled}
        className={`px-2 py-2  h-auto text-sm font-bold focus:outline-none lg: transition duration-100 ease-linear  disabled:opacity-40  flex justify-center items-center   ${addtional_class}`}
        onClick={onclick_event}
      >
        <div>{isSubmitting ? "loading...." : btn_text}</div>
      </button>
    </>
  );
}
