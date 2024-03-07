import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";
import tan2 from "../../../../../public/img/formavater.webp";

type Props = {
  link: LinksProps;
};

const PreviewBtn = ({ link }: Props) => {
  console.log(link.img);

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
          className="w-full border rounded-2xl flex items-center justify-between py-3 px-4"
        >
          <div className="w-5 h-6 rounded-full">
            {link.img ? (
              <Image priority src={link.img} alt="" width={30} height={30} />
            ) : null}
          </div>
          <span className="capitalize">{link.txt}</span>
          <RxExternalLink />
        </Link>
      )}
    </>
  );
};
export default PreviewBtn;
