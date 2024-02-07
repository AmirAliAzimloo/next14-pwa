
import { Locale } from "@/i18n-config";
import RegisterForm from "./_components/RegisterForm";
import { getDictionary } from "@/get-dictionary";



export default async function Register(
  {
    params
  }: {
    params: { lang: Locale } 
  }
) {


  const dictionary = await getDictionary(params.lang)


  return (
   <>


   <RegisterForm
   locales={{...dictionary.auth.register,...dictionary.validation}}
   />

   </>
  )
}


