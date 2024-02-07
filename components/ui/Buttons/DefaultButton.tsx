"use client";

import React from "react";

import { cn } from "@/utils/cn";

interface DefaultButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean; 
  danger?: boolean;
  disabled?: boolean;
  className?: string;
  outline?: boolean;
  small?: boolean;
  noBorder?: boolean;
  isBenefit?:boolean;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  className,
  outline,
  small,
  noBorder,
  isBenefit = false
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        `
        flex
        justify-center
        rounded-md
        font-semibold
        focus-visible:outline
        focus-visible:outline-teal-600
        `,
        disabled && "opacity-50 cursor-pointer",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        
        !secondary && !danger && !outline && "bg-teal-600 hover:bg-teal-600 ,focus-visible:outline-teal-600 ",
        !!outline && !!noBorder
          ? "bg-white outline outline-teal-600 text-teal-600"
          : "bg-teal-600  text-white",
        !!outline && "bg-white outline outline-teal-600 text-teal-600",
        small
          ? "p-1 tracking-tighter text-[12px] focus-visible:outline-1 focus-visible:outline-offset-1 "
          : "px-3 py-2 text-sm  focus-visible:outline-2 focus-visible:outline-offset-2 ",
          danger &&  "bg-rose-500 hover:bg-rose-600 focus-visible: outline-rose-600 ",
        className
      )}
    >
      {(disabled && !isBenefit) ? (<>aaa</>) : children}
    </button>
  );
};

export default DefaultButton;
