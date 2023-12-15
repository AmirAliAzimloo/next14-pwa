"use client"
import { useEffect, useState } from "react";

import MyAllPosts from "@/components/my-posts/all";
import MyDraftPosts from "@/components/my-posts/draft";
import MyPublishedPosts from "@/components/my-posts/published";
import MyWaitingForManagerPosts from "@/components/my-posts/waiting-for-manager";
import MyBookMarkedPosts from "@/components/my-posts/bookmarked";
import MyLikedPosts from "@/components/my-posts/liked";

const Posts = ({params}) => {
   const [details,setdetails]=useState(<MyAllPosts/>);

   useEffect(()=>{
      if(params.slug[0]=="all"){
         setdetails(<MyAllPosts/>);
      }
      else if(params.slug[0]=="drafts"){
         setdetails(<MyDraftPosts/>);
      }
      else if(params.slug[0]=="published"){
         setdetails(<MyPublishedPosts/>);
      }
      else if(params.slug[0]=="waiting"){
         setdetails(<MyWaitingForManagerPosts/>);
      }
      else if(params.slug[0]=="bookmarked"){
         setdetails(<MyBookMarkedPosts/>);
      }
      else if(params.slug[0]=="liked"){
         setdetails(<MyLikedPosts/>);
      }
   },[params.slug[0]]);


   return (
      <div>
         {details}
      </div>
   );
}

export default Posts;