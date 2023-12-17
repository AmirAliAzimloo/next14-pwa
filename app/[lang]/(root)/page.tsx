
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import User from "./components/User"

const Home = async ({
    params: { lang },
  }: {
    params: { lang: Locale } 
  }) => {

  const dictionary = await getDictionary(lang)


    return ( 
      <>
        <User />
        <div className="centerAll mt-4 bg-green-500 rounded-sm py-4">
            <Link  href={`/${lang}/login`} >
                {dictionary.login}
            </Link> 
        </div>
        <div className="centerAll mt-4 bg-rose-500 rounded-sm py-4">
            <Link  href={`/${lang}/map`} >
                map
            </Link>
        </div>
      </>
    
     );
}
 
export default Home;