import Image from "next/image";
import Link from "next/link";

async function getData(lang) {
  const res = await fetch(
    `https://2lang-site-mernfa.iran.liara.run/api/products/${lang}`,
    { cache: "no-cache" }
  );
  return res.json();
}

const Products = async ({ lang }) => {
  const data = await getData(lang);
  return (
    <div className=" flex justify-between items-center gap-2 flex-wrap">
      {data.map((da, i) => (
        <Link
          href={
            lang == "en" ? `/products/${da.slug}` : `/fa/products/${da.slug}`
          }
          key={i}
          className=" p-3 bg-zinc-600 rounded-lg border-2 border-zinc-700 flex flex-col gap-3 "
        >
          <div className=" flex justify-center">
            <Image
            className=" rounded-md"
              src={da.image}
              alt={da.faData ? da.faData.title : da.enData.title}
              width={260}
              height={140}
            />
          </div>
          <h3>{da.faData ? da.faData.title : da.enData.title}</h3>
          <p>{da.faData ? da.faData.desc : da.enData.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default Products;
