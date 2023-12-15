import { useTranslations } from "next-intl";

import Products from "@/components/products";


export default function Home({ params }) {
  const t = useTranslations("Home");
  return (
    <main className=" my-8 p-8 text-indigo-100 flex flex-col gap-8 container mx-auto">
      <div className=" bg-zinc-900 flex flex-col gap-8 p-4 rounded-md" >
        <div>{t("title")}</div>
        <div>{t("desc")}</div>
      </div>
      <Products lang={params.locale}/>
    </main>
  );
}
