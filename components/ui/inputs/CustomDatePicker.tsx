"use client";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import "react-multi-date-picker/styles/colors/green.css";
import { dateMilady } from "@/utils/dateConverter";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { cn } from "@/utils/cn";

interface CustomDatePickerProps {
  setValue: UseFormSetValue<any>;
  name: string;
  id: string;
  errors?: FieldErrors;
  disabled: boolean;
  calendarPosition : string;
  defaultOpen: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  setValue,
  name,
  id,
  errors,
  disabled,
  calendarPosition,
  defaultOpen
}) => {
  //* react state
  const [inputValue, setInputValue] = useState<any>(null);
  const datePickerRef = useRef<any>(null);

  function handleChange(date: any, { input, isTyping }: any) {
    if (!isTyping)
      return setValue(
        name,
        dateMilady(`${date?.year}/${date?.month}/${date?.day}`)
      ); // user selects the date from the calendar and no needs for validation.
    if (!isTyping) return setInputValue(date); // user selects the date from the calendar and no needs for validation.

    const strings = input.value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number: any) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val: any) => val.startsWith("00"))) return false;

    setValue(name, dateMilady(`${date?.year}/${date?.month}/${date?.day}`));
    setInputValue(date);
  }

  useEffect(() => {
    // Open the calendar after the component is mounted
    if (datePickerRef.current && !!defaultOpen) {
      datePickerRef.current.openCalendar();
    }
  }, [defaultOpen]);

  return (
    <>
      <DatePicker
        ref={datePickerRef}
        portal
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: "26px",
          textAlign: "center",
        }}
        containerStyle={{
          width: "100%",
          textAlign: "center",
        }}
        className="green"
        name={name}
        id={id}
        value={inputValue || new Date()}
        onChange={handleChange}
        locale={persian_fa}
        calendar={persian}
        calendarPosition={calendarPosition}
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
    </>
  );
};

export default CustomDatePicker;
