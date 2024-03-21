"use client";

import { dancingScript } from "@/components/ui/fonts";
import { links } from "./Navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const { currentUser } = useCurrentUser();
  const pathname = usePathname();

  return (
    <header className="sm:hidden block border-b shadow-md z-40 fixed   top-0 left-0 bg-white w-full">
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <h3
          className={`${dancingScript.className} bg-clip-text  font-bold text-4xl bg-gradient-to-r text-transparent from-slate-600 via-blue-500 to-blue-700 inline-block `}
        >
          sy
        </h3>

        <Link href={"/dashboard/account"}>
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={currentUser?.imageUrl}
              alt="avater"
            />
          </Avatar>
        </Link>
      </div>
      <nav>
        <ul className="flex items-center">
          {links.map((link, i) => {
            const Icon = link.icon;

            return (
              <li
                key={i}
                className={cn(
                  "flex-1 w-full rounded-md",
                  pathname === link.path && "bg-gray-100"
                )}
              >
                <Link
                  href={link.path}
                  className="inline-block text-center text-sm text-gray-500 w-full py-3"
                >
                  <Icon className="w-5 h-5 mx-auto" />
                  <span className="mt-1 inline-block font-medium capitalize">
                    {link.text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
