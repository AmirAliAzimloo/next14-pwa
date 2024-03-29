"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface InputProps{
    label:string,
    register:UseFormRegister<any>,
    errors?:FieldErrors,
    name:string
}


const Input: React.FC<InputProps> = ({
    label,
    register,
    errors,
    name
}) => {
  return (
        <div>
          <label>{label}</label>
          <input {...register("mobile")} className="bg-teal-500" />
          {/* {(errors as Record<string, any>)[id]?.message} */}
        </div>
  );
};

export default Input;
