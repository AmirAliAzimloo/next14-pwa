import SliderComp from "./slider-comp";
import MainSliderAds from "./ads";
import HotNews from "./hot-news";

const MainSlider = () => {
   return (
      <section className=" bg-zinc-100 rounded-lg p-4 flex flex-col gap-6 ">
         <HotNews/>
         <div className=" flex justify-between items-center gap-4 ">
            <SliderComp/>
            <MainSliderAds/>
         </div>
      </section>
   );
}

export default MainSlider;