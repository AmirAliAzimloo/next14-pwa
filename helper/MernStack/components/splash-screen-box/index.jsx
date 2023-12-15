import Image from "next/image";
import 'animate.css';

const SplashScreenBox = () => {
   return (
      <div className=" flex justify-center items-center h-[100vh] ">
         <div className=" flex flex-col gap-4 items-center">
            <div className="  w-[5rem] h-[5rem] relative  animate__animated animate__slow animate__flip">
               <Image src={"/logo-70.png"} fill className="object-cover" alt="splash screen" />
            </div>
            <p className=" animate__animated animate__slower animate__fadeInUp">mernfa.ir</p>
         </div>
      </div>
   );
}

export default SplashScreenBox;