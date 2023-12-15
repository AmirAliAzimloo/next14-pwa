
const getData=async()=>{
   const data=await fetch("http://localhost:3000/api/get-text",{cache:"no-store"});
   return data.json()
}

const ShowText = async () => {
   const data=await getData();
   console.log(data)
   return (
      <div>
         <main className=" flex justify-center items-center my-16">
         <div className=" flex flex-col gap-20 w-full">
            <div className=" bg-blue-600 text-white rounded p-4">show text page</div>
            <div  className=" flex flex-col gap-6">
               {
                  data.data.map((da,i)=>(
                     <div key={i} className=" bg-zinc-100 rounded-md p-8 flex flex-col gap-6">
                        <div>title : {da.title}</div>
                        <div dangerouslySetInnerHTML={{ __html: da.text }}></div>
                     </div>
                  ))
               }
            </div>
         </div>
      </main>
      </div>
   );
}

export default ShowText;