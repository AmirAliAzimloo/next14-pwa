"use client"

import { useRef, useState } from "react";
import Editor from "../editor";

import axios from "axios";


const FormComp = () => {

   const titleRef = useRef();
   const [mainText, setmainText] = useState("");


   const formSubmit = (e) => {
      e.preventDefault();

      const formData = {
         title: titleRef.current.value,
         text: mainText
      }

      const bUrl = "http://localhost:3000/api/post-text"
      axios.post(bUrl, formData)
         .then(d => {
            console.log(d.data);
         })
         .catch(e => {
            console.log(e);
         })
   }

   return (
      <div>
         <form onSubmit={formSubmit} className=" flex flex-col gap-8 p-8 rounded-md border-2 border-zinc-300">
            <input  ref={titleRef} type="text" placeholder="title" className=" bg-white p-2 rounded-md outline-none border-2 border-zinc-200 focus:border-indigo-500 focus:bg-zinc-100 " />
            <Editor setmainText={setmainText} />
            <button className=" bg-indigo-500 text-white p-2 rounded-md">submit</button>
         </form>
      </div>
   );
}

export default FormComp;