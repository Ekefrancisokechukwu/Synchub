import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";
import tan2 from "../../../../../public/img/formavater.webp";
import { LinkTheme } from "@/app/(public)/(routes)/sync.hub/[usernameId]/_components/ui/link";
import { useCurrentUser } from "@/hooks/useCurrentAccount";

type Props = {
  link: LinksProps;
};

const PreviewBtn = ({ link }: Props) => {
  const { currentUser } = useCurrentUser();

  const style = currentUser?.style;

  return (
    <>
      {link.headline && (
        <h1
          style={{ color: style?.textHeading }}
          className="text-center first-letter:uppercase font-semibold"
        >
          {link.txt}
        </h1>
      )}

      {!link.headline && link.link! && (
        <LinkTheme
          href={link.link!}
          variant={currentUser?.style?.variant}
          className="py-3 px-4 w-[95%]"
        >
          <div className="w-5 h-6 rounded-full">
            {link.img ? (
              <Image priority src={link.img} alt="" width={30} height={30} />
            ) : null}
          </div>
          <span className="capitalize">{link.txt}</span>
          <RxExternalLink />
        </LinkTheme>
      )}
    </>
  );
};
export default PreviewBtn;
