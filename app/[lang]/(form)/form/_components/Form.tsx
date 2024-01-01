"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "./Input";
import { useState } from "react";

const schema = yup.object({
  mobile: yup
    .string()
    .required("Phone is a required field")
    .matches(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format"
    ),
});

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      mobile: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

    <Input
    label="mobile"
    register={register}
    errors={errors}
    name="mobile"
    />

        <button className="bg-sky-500 mt-4 mx-auto block" type="submit">
          click me
        </button>
      </form>
    </>
  );
};

export default Form;
