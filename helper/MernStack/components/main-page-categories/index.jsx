import CategoryBox from "./category-box";

const MainPageCategories = () => {

   const categories=[
      {
         title:"JAVASCRIPT",
         link:"/search/categories/javascript",
      },
      {
         title:"PYTHON",
         link:"/search/categories/python",
      },
      {
         title:"PHP",
         link:"/search/categories/php",
      },
      {
         title:"GO",
         link:"/search/categories/go",
      },
      {
         title:"++C",
         link:"/search/categories/c-plus-plus",
      },
      {
         title:"HTML",
         link:"/search/categories/html",
      },
      {
         title:"CSS",
         link:"/search/categories/CSS",
      },
      {
         title:"SWIFT",
         link:"/search/categories/SWIFT",
      },
      {
         title:"KOTLIN",
         link:"/search/categories/KOTLIN",
      },
      {
         title:"JAVA",
         link:"/search/categories/JAVA",
      },
      {
         title:"#C",
         link:"/search/categories/C-SHARP",
      },
      {
         title:"ELM",
         link:"/search/categories/ELM",
      },
      {
         title:"ASP.NET",
         link:"/search/categories/ASP.NET",
      },
      {
         title:"RUBY",
         link:"/search/categories/RUBY",
      },
   ]

   return (
      <section className="  bg-zinc-100 rounded-lg p-4 flex flex-col gap-8">
         <h2 className=" title_style">طبق دسته بندی های مرن بلاگ انتخاب کنید...</h2>
         <div className="flex justify-around items-center flex-wrap gap-6">
         {
            categories.map((da,i)=><CategoryBox key={i} data={da}/>)
         }
         </div>
      </section>
   );
}

export default MainPageCategories;