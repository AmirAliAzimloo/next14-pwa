"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { useContext } from "react";
import { TestContext } from "@/context/TestContext"
import useFcmToken from "@/hooks/useFcmToken";
import { test, useGetAllPosts } from "@/api/resolvers/post/use-get-posts";

const User = () => {
    // const username = useAppSelector(state => state?.user?.name);
    const { user } = useContext(TestContext);

    const postsQuery = useGetAllPosts();
    // const test2 = test();


    const { token, notificationPermissionStatus } = useFcmToken();

    console.log('notificationPermissionStatus =>',notificationPermissionStatus)
    console.log('token =>',token)
    console.log('postsQuery =>',postsQuery)
    
    return ( 
        <div>
            <i className="next14-pwa-home font-icon bg-red-500 text-sky-500" />
            UserName : {user}
        </div>
     );
}
 
export default User;