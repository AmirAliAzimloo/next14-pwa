"use client";

import ReactSelect, {
  ActionMeta,
  GetOptionLabel,
  MultiValue,
  SingleValue,
} from "react-select";
import { FieldErrors } from "react-hook-form";

import { cn } from "@/utils/cn";

interface OptionalSelectProps {
  label?: string;
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
  placeHolder?: string;
  id: string;
  errors?: FieldErrors;
  menuPlacement?: "auto" | "top" | "bottom" | undefined;
  getOptionLabel: GetOptionLabel<Record<string, any>>;
  getOptionValue: GetOptionLabel<Record<string, any>>;
  isSearchable?: boolean;
  defaultMenuIsOpen?: boolean;
}

const OptionalSelect: React.FC<OptionalSelectProps> = ({
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
  menuPlacement,
  getOptionLabel,
  getOptionValue,
  isSearchable,
  defaultMenuIsOpen
}) => {
  return (
    <div className="z-[100]">
      {!!label ? (
        <label
          className={cn(
            "text-sm font-medium leading-6 text-gray-900 dark:text-white  flex gap-1 items-center",
            errors?.[id] && "text-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
          htmlFor={id}
        >
          {label}
          {required && (
            <div className="text-sm font-medium text-rose-500">*</div>
          )}
        </label>
      ) : null}

      <div className="mt-2">
        <ReactSelect
        defaultMenuIsOpen={defaultMenuIsOpen || false}
          isSearchable={isSearchable !== undefined ? isSearchable : true}
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={isMulti}
          options={options}
          menuPlacement={menuPlacement || "auto"}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (provided, state) => ({
              ...provided,
              borderColor:
                state.isFocused && !errors?.[id]
                  ? "#14b8a6"
                  : state.isFocused && errors?.[id]
                  ? "#f43f5e"
                  : errors?.[id]
                  ? "#f43f5e"
                  : "",
              borderRadius: "6px",
              boxShadow: "none",
              color: "#262626",
              fontSize: 14,
            }),
            option: (provided) => ({
              ...provided,
              color: "#262626",
              fontSize: 14,
            }),
          }}
          name={id}
          placeholder={!!placeHolder ? placeHolder : ""}
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

export default OptionalSelect;
