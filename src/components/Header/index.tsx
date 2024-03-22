import Image from "next/image";
import logo from "../../../public/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 flex w-full justify-center py-3 tb:py-4 lg:py-5 border-b border-gray-50 bg-gradient-to-b from-white backdrop-blur-2xl">
      <div className="flex items-center justify-center">
        <a href="/">
          <Image src={logo} alt="" className="2xs:w-20 2xs:h-10 xs:w-24 xs:h-12 2sm:w-[7.2rem] 2sm:h-[3.6rem] w-[7rem] h-14 lg:w-40 lg:h-20 cursor-pointer" />
        </a>
      </div>
    </header>
  );
};

export default Header;
