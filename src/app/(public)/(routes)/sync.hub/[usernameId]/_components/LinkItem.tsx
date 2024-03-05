import Image from "next/image";
import Link from "next/link";
import img from "../../../../../../../public/img/i.webp";
import { RxExternalLink } from "react-icons/rx";

type Props = {
  link: LinksProps;
};

const LinkItem = ({ link }: Props) => {
  return (
    <>
      {link.headline && (
        <h1 className="text-center first-letter:uppercase text-lg text-neutral-600 font-semibold">
          {link.txt}
        </h1>
      )}

      {!link.headline && link.link! && (
        <Link
          href={link.link}
          className="w-full shadow flex hover:bg-gray-100 duration-500 transition-all items-center justify-between bg-neutral-50 rounded-2xl px-5 py-3"
        >
          <div className="relative sm:size-[3rem] size-[2rem] rounded-2xl">
            <Image
              src={img}
              alt=""
              sizes="(max-width: 768px) 100vw, 33vw)"
              fill
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <span className="capitalize text-[1.1rem] font-medium text-neutral-500">
            {link.txt}
          </span>
          <RxExternalLink className="text-[1.3rem] text-gray-500" />
        </Link>
      )}
    </>
  );
};
export default LinkItem;
