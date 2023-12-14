// "use client"
import Header from "../../components/header";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { decrement } from "../../store/slices/counterSlice";

// SSR GET REDUX DEF VAL
const getData=async()=>{
   const data=await fetch("https://moviesapi.ir/api/v1/movies",{cache:"default"});
   return data.json();
}


// const ReduxDefaultValues = ({children}) => {
const ReduxDefaultValues =  async ({children}) => {

   const data=await getData();
   const reduxVarValue=data.metadata.per_page;
   console.log(reduxVarValue)

   // const dispatch=useDispatch()
   


   // useEffect(()=>{
   //    axios
   //    ....
   //    dispatch(decrement());
   // })

   return (
      <div>
         <Header reduxVarValue={reduxVarValue}/>
         <div>{children}</div>
      </div>
   );
}

export default ReduxDefaultValues;