"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";

import DefaultButton from "@/components/ui/Buttons/DefaultButton";
import DefaultField from "@/components/ui/inputs/DefaultField";
import DefaultSelect from "@/components/ui/inputs/DefaultSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import validateNationalCode from "@/utils/validateNationalCode";

interface StepOneProps<T> {
  locales: T;
  setStep: Dispatch<SetStateAction<number>>;
  setStepOneDetails: Dispatch<SetStateAction<Record<string, any>>>;
}

const StepOne: React.FC<StepOneProps<{ [key: string]: string }>> = ({
  locales,
  setStep,
  setStepOneDetails,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const validationSchema = yup.object({
    first_name: yup.string().required(locales.required),
    last_name: yup.string().required(locales.required),
    mobile_number: yup
      .string()
      .required(locales.required)
      .min(11, locales.mobile)
      .max(11, locales.mobile)
      .matches(/^(?:(?:\+|00)98|0)?9[0-9]{9}$/, locales.true_characters),
    activity_field: yup.array().min(1, locales.required),
    national_code: yup.string().test({
      name: "national_code_regex",
      test: function (value: any) {
        if (value && !validateNationalCode(value)) {
          return false;
        }
        return true;
      },
      message: locales.national_code_err,
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<yup.InferType<typeof validationSchema>>({
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      activity_field: [],
      national_code: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const activityFieldWatch = watch("activity_field");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      setStepOneDetails(data);
      setStep(2);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 pt-8">
        <DefaultField
          label={locales.first_name}
          type="text"
          id="first_name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required={true}
          placeholder="امیرعلی"
        />
        <DefaultField
          label={locales.last_name}
          type="text"
          id="last_name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required={true}
          placeholder="عظیم لو"
        />
        <DefaultField
          label={locales.mobile_number}
          type="text"
          id="mobile_number"
          register={register}
          errors={errors}
          disabled={isLoading}
          required={true}
          placeholder="09121345678"
        />

        {/* <DefaultSelect
        menuPlacement="top"
        isSearchable={false}
          disabled={isLoading}
          label={locales.activity_field}
          options={activityFields}
          onChange={(value) =>
            setValue("activity_field", [value], {
              shouldValidate: true,
            })
          }
          value={activityFieldWatch}
          required={true} 
          placeHolder={locales.activity_field}
          errors={errors}
          id="activity_field"
          defaultName="constant_fa"
        /> */}

        <DefaultField
          label={locales.national_code}
          type="text"
          id="national_code"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="0567794671"
        />

        <DefaultButton
          disabled={isLoading}
          fullWidth
          className="translate-y-7"
        >
          {locales.continiue}
        </DefaultButton>
      </div>
    </form>
  );
};

export default StepOne;
