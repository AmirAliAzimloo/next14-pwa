import TestBtn from "../components/testBtn";
import RTKFetcher from "../components/rtk-fetcher";

const Home = () => {
   return (
      <div className=" flex flex-col gap-8 p-8">
         <div>خانه</div>
         <div className=" flex flex-col gap-8">
            <TestBtn/>
            <RTKFetcher/>
         </div>
      </div>
   );
};

export default Home;
