import { Locale } from "@/libs/i18n/i18n-config";

import { getDictionary } from "@/libs/i18n/get-dictionary";
import ProductsSearchList from "./_components/ProductsSearchList";

export default async function HomeCompany({
  params,
}: {
  params: { lang: Locale; companyID: string };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
    <div>
    <ProductsSearchList company_id={params.companyID} locales={{...dictionary.search , ...dictionary.products} } />
    </div>
    </>
  );
}
