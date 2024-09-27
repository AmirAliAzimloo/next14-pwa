
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import User from "./_components/User"
import CustomSelect from "./_components/select";

const Home = async ({
    params: { lang },
  }: {
    params: { lang: Locale } 
  }) => {

  const dictionary = await getDictionary(lang)


    return ( 
      <>
        {/* <CustomCarousel /> */}
        <div className="mx-auto w-full max-w-sm my-10">
        <CustomSelect />
        </div>
        {/* <User />
        <div className="centerAll mt-4 bg-green-500 rounded-sm py-4">
            <Link  href={`/${lang}/map`} >
                {"dictionary.login"}
            </Link> 
        </div>
        <div className="centerAll mt-4 bg-rose-500 rounded-sm py-4">
            <Link  href={`/${lang}/map`} >
                map
            </Link>
        </div>
        <div className="centerAll mt-4 bg-sky-500 rounded-sm py-4">
            <Link  href={`/${lang}/form`} >
                form
            </Link>
        </div> */}
      </>
    
     );
}
 
export default Home;