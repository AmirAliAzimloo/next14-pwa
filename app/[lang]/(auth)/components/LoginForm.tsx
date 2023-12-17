"use client"

import { TestContext } from "@/context/TestContext";
import { useContext } from "react";

const LoginForm = () => {

    const { user,changeName} = useContext(TestContext) ;

    console.log("User User User",user)


    return ( 
        <div
        className="bg-orange-500"
        onClick={()=>{
            changeName("test for render")
        }}
        >
            Login
        </div>
     );
}
 
export default LoginForm;