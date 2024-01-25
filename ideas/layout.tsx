import { Locale } from "@/libs/i18n/i18n-config";
import { getDictionary } from "@/libs/i18n/get-dictionary";
import MultiNav from "@/components/ui/Navbars/MultiNav";
import SearchFooter from "@/components/ui/Footers/SearchFooter";
import SearchFilterNav from "@/components/ui/Navbars/SearchFilterNav";
import SearchInput from "./_components/SearchInput";
import DefaultPageLoader from "@/components/loaders/DefaultPageLoader";
import { Suspense } from "react";
 
export const revalidate = 36000; //10h


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <Suspense fallback={<DefaultPageLoader />}>
        <MultiNav center={dictionary.search.title} backHome={true} />
        <SearchInput locales={dictionary.home} />
        <SearchFilterNav />
        <div className="w-full">
          <div className="mx-4">{children}</div>
        </div>
        <SearchFooter locales={dictionary.filters} />
      </Suspense>
    </>
  );
}
