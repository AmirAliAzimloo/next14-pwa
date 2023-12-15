import FormComp from "@/components/formComp";


const Home = () => {
   return (
      <main className=" flex justify-center items-center my-16">
         <div className=" flex flex-col gap-20 w-full">
            <div className=" bg-blue-600 text-white rounded p-4">Home page</div>
            <FormComp/>
         </div>
      </main>
   );
}

export default Home;

