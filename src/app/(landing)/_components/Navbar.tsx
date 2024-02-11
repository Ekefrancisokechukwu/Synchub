import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border px-7 bg-primary-foreground/55 backdrop-blur  dark:border-gray-100/20   rounded-3xl lg:block hidden ">
      <ul className="flex  items-center gap-x-5 ">
        <li>
          <Link
            href={"#"}
            className="text-gray-500 font-medium py-3 inline-block px-5 "
          >
            Integration
          </Link>
        </li>
        <li>
          <Link
            href={"#"}
            className="text-gray-500 font-medium py-3 inline-block px-5 "
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href={"#"}
            className="text-gray-500 font-medium py-3 inline-block px-5 "
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={"#"}
            className="text-gray-500 font-medium py-3 inline-block px-5 "
          >
            Contact
          </Link>
        </li>
      </ul>
      <div
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #00000000 50%, transparent 50%),radial-gradient(rgba(200,200,200,0.1) 0%,rgba(99, 124, 184, 0.1) 40%,  transparent 80%)",
        }}
        aria-hidden="true"
        className="top-full left-1/2 h-[200px] w-full  max-w-[200px] md:max-w-[400px] user-select-none center pointer-events-none absolute sm:max-w-full -translate-x-1/2 "
      ></div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(213, 20, 20, 0.67) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        className="absolute w-[80%] h-px"
      />
    </nav>
  );
};

export default Navbar;
