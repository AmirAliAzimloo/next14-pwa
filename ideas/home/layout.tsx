import { Locale } from "@/libs/i18n/i18n-config";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import MultiNav from "@/components/ui/Navbars/MultiNav";
import getCompanyInfo from "@/actions/get-companyInfo";
import CompanyFooter from "@/components/ui/Footers/CompanyFooter";
import SearchFilterNav from "@/components/ui/Navbars/SearchFilterNav";
import SearchInput from "./_components/SearchInput";

export default async function HomeCompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; companyID: string };
}) {
  
  const dictionary = await getDictionary(params.lang);

  const companyInfo = await getCompanyInfo(params.companyID);

  

  return (
    <>
      <MultiNav center={companyInfo?.name_fa} backHome={true} />
      <SearchInput locales={dictionary.home} company_id={params.companyID} />

      {children}
      <CompanyFooter company_id={params.companyID} />
    </>
  );
}
