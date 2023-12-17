"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { useContext } from "react";
import { TestContext } from "@/context/TestContext"

const User = () => {
    // const username = useAppSelector(state => state?.user?.name);
    const { user } = useContext(TestContext)

    console.log("User User User",user)
    
    return ( 
        <div>
            UserName : {user}
        </div>
     );
}
 
export default User;