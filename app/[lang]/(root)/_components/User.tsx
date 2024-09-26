"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { useContext } from "react";
import { TestContext } from "@/context/TestContext"
import useFcmToken from "@/hooks/useFcmToken";

const User = () => {
    // const username = useAppSelector(state => state?.user?.name);
    const { user } = useContext(TestContext)


    const { token, notificationPermissionStatus } = useFcmToken();

    console.log('notificationPermissionStatus =>',notificationPermissionStatus)
    console.log('token =>',token)
    
    return ( 
        <div>
            UserName : {user}
        </div>
     );
}
 
export default User;