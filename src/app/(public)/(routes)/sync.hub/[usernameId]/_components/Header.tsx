import Image from "next/image";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { useCopy } from "@/hooks/use-copy";
import { Copy } from "lucide-react";
import Link from "next/link";
import { IconsReact } from "@/lib/data";

type Props = {
  avater: Doc<"synchubAccount">;
};

const Header = ({ avater }: Props) => {
  console.log(avater);

  const {
    imageUrl,
    username,
    avatar,
    email,
    displayUsername,
    bio,
    socialIcons,
  } = avater;

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
        <p className="sm:text-lg text-neutral-600 text-base mt-4 font-medium text-center">
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

      {socialIcons?.length! > 0 && (
        <div className="mt-4 flex  justify-center items-center gap-x-2">
          {socialIcons
            ?.filter((icon) => icon.added === true && !icon.hidden)
            .map((socialIcon, i) => {
              const iconName = socialIcon.icon as "Bs0Circle";
              const Icon = IconsReact[iconName];

              return (
                <Link
                  target="_blank"
                  href={socialIcon.link}
                  key={i}
                  className="min-w-14 h-12 bg-neutral-50 border text-neutral-500 transition duration-300 hover:text-neutral-900 text-xl rounded-lg grid place-items-center"
                >
                  <Icon />
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Header;
