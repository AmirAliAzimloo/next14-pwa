import Image from "next/image";
import Link from "next-intl/link";

async function getData(input) {
  const url =
    input.locale == "en"
      ? `https://2lang-site-mernfa.iran.liara.run/api/get-product/en/${input.slug}`
      : `https://2lang-site-mernfa.iran.liara.run/api/get-product/fa/${input.slug}`;
  const res = await fetch(url, { cache: "no-cache" });
  return res.json();
}

export default async function Home({ params }) {
  const data = await getData(params);

  return (
    <main className=" my-8 p-8 text-indigo-100 flex flex-col gap-8 container mx-auto">
      <div className=" relative bg-zinc-900 py-20 flex  justify-around items-center gap-8 p-4 rounded-md">
        <Link
          className=" absolute top-2 left-2 bg-indigo-500 text-white px-2 py-1 rounded-sm"
          href={`/products/${data.slug}`}
          locale={params.locale == "en" ? "fa" : "en"}
        >
          {params.locale == "en" ? "to persian" : "به انگلیسی"}
        </Link>
        <div className=" flex justify-center">
          <Image
            src={data.image}
            alt={data.faData ? data.faData.title : data.enData.title}
            width={280}
            height={140}
          />
        </div>
        <div className=" flex flex-col gap-4">
          <h1>{data.faData ? data.faData.title : data.enData.title}</h1>
          <p>{data.faData ? data.faData.desc : data.enData.desc}</p>
        </div>
      </div>
    </main>
  );
}
