import Image from "next/image";


const Loading = () => {
   return (
      <div className=" my-12 flex justify-center items-center">
         <Image width={120} height={120} alt="loding" src={"/loading.svg"}/>
      </div>
   );
}

export default Loading;