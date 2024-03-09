"use client";

import Image from "next/image";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { useCopy } from "@/hooks/use-copy";
import { Copy } from "lucide-react";
import Link from "next/link";
import { IconsReact } from "@/lib/data";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInviewHeader } from "@/hooks/use-inViewHeader";

type Props = {
  avater: Doc<"synchubAccount">;
};

const Heading = ({ avater }: Props) => {
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
  const { setInviewFalse, setInviewTrue } = useInviewHeader();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setInviewFalse();
    } else {
      setInviewTrue();
    }
  }, [isInView, setInviewFalse, setInviewTrue]);

  return (
    <div className="text-center">
      {imageUrl ? (
        <div className="relative bg-gray-200 sm:size-[5.3rem] size-[4rem] mx-auto rounded-full">
          <Image
            src={imageUrl!}
            alt={avater.username}
            fill
            sizes="(max-width: 768px) 100vw, 33vw)"
            quality={100}
            loading="lazy"
            className="mx-auto object-cover  rounded-full"
          />
        </div>
      ) : (
        <div
          style={{ background: avatar.bg }}
          className="sm:size-[5rem] size-[4rem] mx-auto rounded-full grid place-items-center text-xl text-white "
        >
          <span>{username.charAt(0)}</span>
        </div>
      )}

      <h1 ref={ref} className="mt-4 sm:text-2xl text-xl font-medium capitalize">
        {displayUsername}
      </h1>

      {bio && (
        <p className="sm:text-lg text-neutral-400 text-base mt-4 font-normal text-center">
          {bio}
        </p>
      )}

      {email && (
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 mt-4 mx-auto border group text-neutral-700 rounded-xl  sm:text-base text-sm font-medium  flex items-center"
        >
          <Copy className="mr-2 w-4 h-4 " />{" "}
          <span className="group-active:scale-90 transition-all  duration-300">
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
                  className="sm:size-[3rem] size-[2.5rem] flex-shrink-0 bg-neutral-50 border text-neutral-500 transition duration-500 hover:text-neutral-900  rounded-xl grid place-items-center"
                >
                  <Icon className="sm:text-[1.2rem] text-lg" />
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Heading;
