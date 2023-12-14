import TestBtn from "../components/testBtn";

const Home = () => {
   return (
      <div className=" flex flex-col gap-8 p-8">
         <div>خانه</div>
         <div className=" flex flex-col gap-8">
            <TestBtn/>
         </div>
      </div>
   );
};

export default Home;
