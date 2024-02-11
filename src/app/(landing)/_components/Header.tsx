import SynchubSVG from "@/components/ui/logo";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import LoginBtn from "./LoginBtn";

const Header = () => {
  return (
    <header className="flex justify-between py-5 px-6">
      <SynchubSVG />
      <Navbar />
      <div className="flex items-center gap-x-8">
        {" "}
        <ThemeToggle />
        <Link href={"#"} className="p-2 ">
          Register
        </Link>
        <LoginBtn />
      </div>
    </header>
  );
};
export default Header;
