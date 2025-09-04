import Image from "next/image";
import Menu from "./menu";
import SocialMediaIcons from "./socialMediaIcons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex lg:items-center justify-between py-5 px-5 md:px-5 h-[100px] bg-transparent text-black md:text-white z-50">
      <Menu />
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Hero Background"
            layout="fill"
            objectFit="contain"
            priority
            className="p-5 h-8 md:h-10"
          />
        </Link>
      </div>
      <SocialMediaIcons variant="header" />
    </header>
  );
}