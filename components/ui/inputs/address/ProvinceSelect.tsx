"use client";

import { useEffect } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";


import { cn } from "@/utils/cn";


interface ProvinceSelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (
    newValue:
      | MultiValue<Record<string, any>>
      | SingleValue<Record<string, any>>,
    actionMeta: ActionMeta<Record<string, any>>
  ) => void;
  options: Record<string, any>[];
  disabled?: boolean;
  isMulti?: boolean;
  required?: boolean;
  placeHolder: string;
  id: string;
  errors?: FieldErrors;
  setValue:UseFormSetValue<any>
  isSearchable?: boolean;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
  isMulti,
  required,
  placeHolder,
  id,
  errors,
  setValue,
  isSearchable
}) => {


  useEffect(()=>{
    setValue("cities",null)
  },[value])


  return (
    <div className="z-[100]">
      <label
        className={cn(
          "text-sm font-medium leading-6 text-gray-900 dark:text-white  flex gap-1 items-center",
          errors?.[id] && "text-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
        htmlFor={id}
      >
        {label}
        {required && <div className="text-sm font-medium text-rose-500">*</div>}
      </label>

      <div className="mt-2">
        <ReactSelect
          isSearchable={ isSearchable !== undefined ? isSearchable : true }
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={isMulti}
          options={options}
          getOptionLabel={(option)=>option["name"]}
          getOptionValue={(option)=>option["id"]}
          // styles={{ 
          //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          //   control: (provided, state) => ({
          //     ...provided,
          //     borderColor:
          //       state.isFocused && !errors?.[id]
          //         ? "#14b8a6"
          //         : state.isFocused && errors?.[id]
          //         ? "#f43f5e"
          //         : errors?.[id]
          //         ? "#f43f5e"
          //         : "",
          //     borderRadius: "6px",
          //     boxShadow: "none",
          //     color:"#262626",
          //     fontSize:14
          //   }),
          //   option:(provided)=>({
          //     ...provided,
          //     color:"#262626",
          //     fontSize:14
          //   })
           
          // }}
          name={id}
          placeholder={placeHolder}
        />

        {errors?.[id] && (
          <div
            className={cn(
              "block text-sm font-medium leading-6 text-gray-900",
              errors?.[id] && "text-rose-500",
              disabled && "opacity-50 cursor-default"
            )}
          >
            {(errors as Record<string, any>)[id]?.message}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProvinceSelect;
