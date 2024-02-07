import { FieldErrors, UseFormRegister } from "react-hook-form";

import { cn } from "@/utils/cn";

interface DefaultFieldProps {
  label: string;
  id: string;
  errors?: FieldErrors;
  type: string;
  register: UseFormRegister<any>;
  disabled: boolean;
  required?: boolean;
  className?: string;
  placeholder: string;
  icon?: React.ReactNode;
}

const DefaultField: React.FC<DefaultFieldProps> = ({
  label,
  id,
  errors,
  type,
  register,
  disabled,
  required,
  className,
  placeholder,
  icon,
}) => {
  return (
    <>
      <div className={className}>
        <label
          className={cn(
            "text-sm font-medium leading-6 text-gray-900 dark:text-white   flex gap-1 items-center justify-between pb-2",
            errors?.[id] && "text-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
          htmlFor={id}
        >
          <div className="flex items-center justify-center gap-1">
            {label}
            {required && (
              <div className="text-sm font-medium text-rose-500">*</div>
            )}
          </div>

          {icon}
        </label>

        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id)}
          className={cn(
            `
          border-none
          outline-none
          form-input
          block
          w-full
          rounded-md
          border-0
          p-2
          text-gray-900
          dark:text-white
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-teal-600
          sm:text-sm
          sm:leading-6`,
            errors?.[id] && "focus:ring-rose-500",
            errors?.[id] && "ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
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
    </>
  );
};

export default DefaultField;
