import MainSlider from "@/components/sliders/main-slider";
import MainPageCategories from "@/components/main-page-categories";
import MainPagePopularPosts from "@/components/main-page-popular-posts";
import MainPageAdsSection from "@/components/main-page-ads-section";
import MainPageBestBlogsAndNewPosts from "@/components/main-page-best-new-blogs";



const Home = async () => {
   return (
      <main className=" flex flex-col gap-12">
         <MainSlider/>
         <MainPageCategories/>
         <MainPagePopularPosts/>
         <MainPageAdsSection/>
         <MainPageBestBlogsAndNewPosts/>
      </main>
   );
}

export default Home;

