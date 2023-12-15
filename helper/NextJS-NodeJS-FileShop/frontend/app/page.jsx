import MainSlider from "../components/sliders/mainSlider";
import ProductsSlider from "../components/sliders/products-slider";
import MiddleBanner from "../components/middle-banners";
import GraphicCategories from "../components/graphic-cats";
import GraphicSlider from "../components/sliders/graphic-slider";
import NewBlogs from "../components/newBlogs";


const Home = () => {
   return (
      <div>
         <main className=" flex flex-col gap-12">
            <MainSlider />
            <ProductsSlider title="اپلیکیشن ها" linkComp="apps" />
            <MiddleBanner />
            <ProductsSlider title="کتاب ها" linkComp="books" />
            <GraphicCategories />
            <GraphicSlider />
            <NewBlogs />
         </main>
      </div>
   );
};

export default Home;
