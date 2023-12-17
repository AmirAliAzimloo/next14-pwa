"use client"

import { useAppSelector } from "@/lib/redux/hooks";

const User = () => {
    const username = useAppSelector(state => state?.user?.name)
    return ( 
        <div>
            UserName : {username}
        </div>
     );
}
 
export default User;