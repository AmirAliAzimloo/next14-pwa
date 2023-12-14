"use client"
import { useGetFilmApiQuery } from "../../store/slices/filmApi";

const RTKFetcher = () => {
   const data=useGetFilmApiQuery("")
   console.log(data)
   return (
      <div>
         rtk
      </div>
   );
}

export default RTKFetcher;