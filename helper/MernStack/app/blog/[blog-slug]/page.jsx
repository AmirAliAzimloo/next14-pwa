import NewBlogBox from "@/components/boxes/new-blog-box";
import Image from "next/image";
import BlogFollowBtn from "@/components/blog-follow-btn";


const SingleBlogPage = ({ params }) => {
   // console.log(params)


   const data = {
      image: "/images/ads/business_social_media_banner_19.jpg",
      title: "عنوان وبلاگ",
      short_desc: "تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی",
      followers_number: 20,
      followings_number: 5,
      posts: [
         {
            image: "/images/posts/tablet3.jpg",
            title: "  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
            short_desc: "به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
            comments_number: 10,
            view_number: 120,
            slug: "tablet2",
            date: "25 تیر 1420"
         },
         {
            image: "/images/posts/mobile1.jpg",
            title: "قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
            short_desc: "تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
            comments_number: 22,
            view_number: 582,
            slug: "mobile1",
            date: "15 دی 1480"
         },
         {
            image: "/images/posts/laptop1.jpg",
            title: "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
            short_desc: "متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
            comments_number: 25,
            view_number: 12004,
            slug: "laptop1",
            date: "1 بهمن 1500"
         },
         {
            image: "/images/posts/tablet3.jpg",
            title: "  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
            short_desc: "به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
            comments_number: 10,
            view_number: 120,
            slug: "tablet2",
            date: "25 تیر 1420"
         },
         {
            image: "/images/posts/mobile1.jpg",
            title: "قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
            short_desc: "تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
            comments_number: 22,
            view_number: 582,
            slug: "mobile1",
            date: "15 دی 1480"
         },
      ],
   }


   
   return (
      <div className=" flex flex-col gap-12">
         <section className=" flex flex-col gap-8 items-center">
            <div>
               <Image className=" rounded-full border-4 border-blue-500" alt={data.title} width={150} height={150} src={data.image} />
            </div>
            <h1 className="title_style">{data.title}</h1>
            <p className=" w-[600px] max-w-[600px]">{data.short_desc}</p>
            <div className=" flex justify-center items-center gap-8">
               <div>توسط {data.followers_number} نفر دنبال می شود...</div>
               <div>{data.followings_number} را دنبال می کند...</div>
            </div>
            <BlogFollowBtn />
         </section>
         <section className=" flex flex-col gap-4">
            {
               data.posts.map((da, i) => (<NewBlogBox key={i} data={da} />))
            }
         </section>
      </div>
   );
}

export default SingleBlogPage;