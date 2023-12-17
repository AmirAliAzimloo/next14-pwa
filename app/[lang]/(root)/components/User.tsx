"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { useContext } from "react";
import { TestContext } from "@/context/TestContext"

const User = () => {
    // const username = useAppSelector(state => state?.user?.name);
    const { user } = useContext(TestContext)
    
    return ( 
        <div>
            UserName : {username}
        </div>
     );
}
 
export default User;