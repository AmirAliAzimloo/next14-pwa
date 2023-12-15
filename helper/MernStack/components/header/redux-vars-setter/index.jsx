"use client"
import { useDispatch } from "react-redux";
import { setuserImageValue } from "@/store/slices/userImageSlice";
import { userIsActiveToTrue } from "@/store/slices/user_is_active";
import { setRoleValue } from "@/store/slices/roleSlice";
import { logedToTrue } from "@/store/slices/logedSlice";

const ReduxVarsDefaultValueSetter = ({data}) => {
   const dispatch=useDispatch();
   dispatch(setuserImageValue(data.data.user_image));
   
   let i=null;
   data.data.user_is_active==true?dispatch(userIsActiveToTrue()):i=null;
   
   dispatch(setRoleValue(data.data.role));
   
   data.data.loged==true?dispatch(logedToTrue()):i=null;


   return (
      <div className="w-0">
         
      </div>
   );
}

export default ReduxVarsDefaultValueSetter;