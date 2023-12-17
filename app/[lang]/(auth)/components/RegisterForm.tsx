"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "@/lib/axios/axios";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    name: yup.string().required(),
    mobile:  yup.string().required(),
  })


const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      name: "",
      mobile: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const otp = await axios.post("/api/getotp",data)

      if(!!otp){
          router.push("/checkotp")
      }

      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

      <div>
      <label>name : </label>
      <input className="bg-red-300" {...register("name")} />
      <p>{errors.name?.message}</p>
      </div>

     <div>
     <label>mobile : </label>
      <input className="bg-red-300" {...register("mobile")} />
      <p>{errors.mobile?.message}</p>
     </div>

      <button className="bg-green-500" type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
