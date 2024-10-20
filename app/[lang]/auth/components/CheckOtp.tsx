"use client"

import { TestContext } from "@/context/TestContext";
import axios from "@/lib/axios/axios";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/reducers/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"


const schema = yup
  .object({
    otp:  yup.string().required(),
  })

const CheckOtp = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { changeName } = useContext(TestContext)

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        try {
          setIsLoading(true);
    
          const resApi = await axios.post("/api/checkotp",data);

          console.log("User => ",resApi?.data?.user);



          
    
          if(!!resApi?.data?.user){
              changeName(resApi?.data?.user?.name)
              dispatch(setCredentials(resApi.data))
              router.push("/")
          }
    
          
        } catch (error) {
          console.log(error)
        }
        finally{
          setIsLoading(false)
        }
      };
  

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm<yup.InferType<typeof schema>>({
        defaultValues: {
          otp: "",
        },
        resolver: yupResolver(schema),
      });

    return ( 
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

        <div>
        <label>otp : </label>
        <input className="bg-red-300" {...register("otp")} />
        <p>{errors.otp?.message}</p>
        </div>
  
        <button className="bg-green-500" type="submit">submit</button>
      </form>
     );
}
 
export default CheckOtp;