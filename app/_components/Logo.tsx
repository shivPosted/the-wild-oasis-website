import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <figure className="w-[60px] h-[60px]">
        <Image
          src={logo}
          alt="The Wild Oasis logo"
          quality={100}
          className="size-full"
        />
      </figure>
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
