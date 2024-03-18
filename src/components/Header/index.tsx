import Image from "next/image";
import logo from "../../../public/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <div className="flex items-center justify-center">
        <a href="/">
          <Image src={logo} alt="" className="w-9 h-9 cursor-pointer" />
        </a>
      </div>
    </header>
  );
};

export default Header;
