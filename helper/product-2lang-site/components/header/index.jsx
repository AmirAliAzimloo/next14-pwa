import Link from "next-intl/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" flex justify-between items-center gap-2 p-4 bg-[#07070733]">
      <Link href={"/"}>
        <Image
          className=" bg-white rounded"
          src={"/images/logo.png"}
          alt="persian"
          width={50}
          height={50}
        />
      </Link>
      <div className=" flex justify-start items-center gap-4">
        <Link className=" rounded" href={"/"} locale="fa">
          <Image
            src={"/images/langs/persian.png"}
            alt="persian"
            width={30}
            height={15}
          />
        </Link>
        <Link className="rounded" href={"/"} locale="en">
          <Image
            src={"/images/langs/english.png"}
            alt="persian"
            width={30}
            height={15}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
