"use client"

import { useSelector, useDispatch } from "react-redux";
import {increment, decrement} from "../../store/slices/counterSlice";


const TestBtn = () => {

   const theCounter=useSelector((store)=>store.counter.value);
   const dispatch=useDispatch();

   return (
      <div className=" flex flex-col gap-8 m-10 p-4 bg-indigo-100 rounded-md">
         <div>counter with redux toolkit</div>
         <div>value is : {theCounter}</div>
         <div className=" flex gap-4">
            <button onClick={()=>dispatch(increment())} className=" w-12 h-12 flex justify-center items-center text-xl bg-blue-500 text-white p-4 rounded-md">+</button>
            <button onClick={()=>dispatch(decrement())} className=" w-12 h-12 flex justify-center items-center text-xl bg-rose-500 text-white p-4 rounded-md">-</button>
         </div>
      </div>
   );
};

export default TestBtn;
