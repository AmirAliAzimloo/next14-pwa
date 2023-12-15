"use client"
import { useEffect, useState } from "react";

import Followers from "@/components/follow/followers";
import Followings from "@/components/follow/followings";

const Posts = ({params}) => {
   const [details,setdetails]=useState(<Followings/>);

   useEffect(()=>{
      if(params.slug[0]=="followings"){
         setdetails(<Followings/>);
      }
      else if(params.slug[0]=="followers"){
         setdetails(<Followers/>);
      }
   },[params.slug[0]]);


   return (
      <div>
         {details}
      </div>
   );
}

export default Posts;