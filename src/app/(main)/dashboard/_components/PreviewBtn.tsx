import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";
import tan2 from "../../../../../public/img/formavater.webp";

type Props = {
  link: LinksProps;
};

const PreviewBtn = ({ link }: Props) => {
  return (
    <>
      {link.headline && (
        <h1 className="text-center first-letter:uppercase font-semibold">
          {link.txt}
        </h1>
      )}

      {!link.headline && link.link! && (
        <Link
          href={link.link!}
          className="w-full border rounded-md flex items-center justify-between py-3 px-4"
        >
          <div className="w-5 h-6 rounded-full">
            <Image src={tan2} alt="" width={500} height={500} className="" />
          </div>
          <span className="capitalize">{link.txt}</span>
          <RxExternalLink />
        </Link>
      )}
    </>
  );
};
export default PreviewBtn;
