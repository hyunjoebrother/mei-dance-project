import Image from "next/image";
import logo from "../../../public/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 flex w-full justify-center py-3 tb:py-4 lg:py-5 border-b border-gray-50 bg-gradient-to-b from-white backdrop-blur-2xl">
      <div className="flex items-center justify-center">
        <a href="/">
          <Image src={logo} alt="" className="2xs:w-32 2xs:h-8 xs:w-36 xs:h-9 2sm:w-36 2sm:h-9 w-40 h-10 lg:w-48 lg:h-12 cursor-pointer" />
        </a>
      </div>
    </header>
  );
};

export default Header;
