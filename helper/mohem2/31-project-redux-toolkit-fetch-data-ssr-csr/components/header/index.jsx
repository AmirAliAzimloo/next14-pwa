"use client"
import { useDispatch } from "react-redux";
import { cartValueSetter } from "../../store/slices/counterSlice";
import { useEffect } from "react";

const Header = ({reduxVarValue}) => {

   const dispatch=useDispatch()
   useEffect(()=>{
      dispatch(cartValueSetter(reduxVarValue));
   },[]);



   return (
      <div className=" bg-indigo-300 p-8 rounded-md m-8">
         this is header
      </div>
   );
}

export default Header;