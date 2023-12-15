"use client";
import { useState, useEffect } from "react";

import AllSliders from "./allSliders";
import NewSlider from "./newSlider";
import SliderDetails from "./sliderDetails";

const SliderMain = () => {
   const [midBanDetCtrl, setmidBanDetCtrl] = useState("");
   const [randNumForBannerClick, setrandNumForBannerClick] = useState(1);
   const [det, setdet] = useState(<AllSliders setrandNumForBannerClick={setrandNumForBannerClick} setmidBanDetCtrl={setmidBanDetCtrl} />);
   
   useEffect(() => {
      if (midBanDetCtrl!="") {
         setdet(<SliderDetails midBanId={midBanDetCtrl} />);
      }
   }, [randNumForBannerClick]);
   
   return (
      <div className=" flex flex-col gap-8">
         <section className=" flex justify-between items-center gap-2">
            <h1 className=" text-blue-500 text-lg">اسلایدرها</h1>
            <div className=" flex justify-end items-center gap-2">
               <button
                  onClick={() =>
                     setdet(
                        <AllSliders  setrandNumForBannerClick={setrandNumForBannerClick} setmidBanDetCtrl={setmidBanDetCtrl} />
                     )
                  }
                  className=" flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-500' hover:bg-orange-500"
               >
                  همه
               </button>
               <button
                  onClick={() => setdet(<NewSlider />)}
                  className=" flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-500' hover:bg-orange-500"
               >
                  اسلایدر جدید
               </button>
            </div>
         </section>
         <section>{det}</section>
      </div>
   );
};

export default SliderMain;
