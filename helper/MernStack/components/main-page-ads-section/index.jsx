import AdsBox from "../boxes/ads-box";


const MainPageAdsSection = () => {
   return (
      <section className=" flex justify-between items-center gap-4">
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/business_social_media_banner_19.jpg"} />
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/5556583.jpg"} />
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/370_digital_marketing_media_post_template.jpg"} />
         <AdsBox goal_link={"/"} goal_alt={"test"} goal_img_link={"/images/ads/150_modern_furniture_social_media_post_template.jpg"} />
      </section>
   );
}

export default MainPageAdsSection;