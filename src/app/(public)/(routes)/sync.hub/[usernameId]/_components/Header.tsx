import Image from "next/image";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { useCopy } from "@/hooks/use-copy";
import { Copy } from "lucide-react";

type Props = {
  avater: Doc<"synchubAccount">;
};

const Header = ({ avater }: Props) => {
  const { imageUrl, username, avatar, email, displayUsername, bio } = avater;

  const { copied, copyToClipboard } = useCopy(email || "");

  return (
    <div className="text-center">
      {imageUrl ? (
        <div className="relative bg-gray-200 sm:size-[6rem] size-[5rem] mx-auto rounded-full">
          <Image
            src={imageUrl!}
            alt={avater.username}
            fill
            sizes="(max-width: 768px) 100vw, 33vw)"
            quality={90}
            loading="lazy"
            className="mx-auto object-cover  rounded-full"
          />
        </div>
      ) : (
        <div
          style={{ background: avatar.bg }}
          className="sm:size-[6rem] size-[5rem] mx-auto rounded-full grid place-items-center text-xl text-white "
        >
          <span>{username.charAt(0)}</span>
        </div>
      )}
      <h1 className="mt-4 sm:text-4xl text-2xl font-semibold capitalize">
        {displayUsername}
      </h1>

      {bio && (
        <p className="sm:text-lg text-base mt-4 font-medium text-center">
          {bio}
        </p>
      )}

      {email && (
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 mt-4 mx-auto border group text-black rounded-lg  sm:text-base text-sm font-medium  flex items-center"
        >
          <Copy className="mr-2 w-4 h-4 " />{" "}
          <span className="group-active:scale-90 transition-all duration-300">
            {copied ? "Copied" : "  E-mail"}
          </span>
        </button>
      )}
    </div>
  );
};

export default Header;
