import AdsBox from "@/components/boxes/ads-box";

const MainSliderAds = () => {
   return (
      <div className=" min-w-[185px] w-[185px] h-[400px]   flex flex-col  items-end justify-between gap-4">
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/150_modern_furniture_social_media_post_template.jpg"} />
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/370_digital_marketing_media_post_template.jpg"} />
      </div>
   );
}

export default MainSliderAds;