"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Loader, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import React, { useState } from "react";
import PublishedLink from "./PublishedLink";
import { useCopy } from "@/hooks/use-copy";
import Link from "next/link";
import { IconsReact } from "@/lib/data";
import { IconType } from "react-icons/lib";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import MobileLinksContainer from "./MobileLinksContainer";

const MobilePreview = () => {
  const currentAccount = useQuery(api.synchubAccount.accounts);
  const isLoading = currentAccount === undefined || currentAccount === null;
  const { currentUser } = useCurrentUser();
  const { copied, copyToClipboard } = useCopy(
    !isLoading ? currentAccount[0]?.email! : ""
  );

  if (isLoading) {
    return (
      <>
        <ScrollArea className="h-[80vh] mt-8 grid place-items-center rounded-3xl px-4  bg-neutral-50  xl:w-[320px] w-[240px]  mx-auto  shadow-[0px_0px_0px_8px_#2c2c2b,_0px_0px_0px_8px_#1a1919,_0px_0px_0px_15px_#0e0e0d] ">
          <Button size={"icon"} variant={"ghost"} className="animate-spin">
            <Loader />
          </Button>
        </ScrollArea>
      </>
    );
  }

  return (
    <>
      <div className="mb-8">
        <PublishedLink />
      </div>

      <ScrollArea className="h-[80vh] rounded-3xl px-4  bg-neutral-50  xl:w-[320px] w-[240px]  mx-auto  shadow-[0px_0px_0px_8px_#2c2c2b,_0px_0px_0px_8px_#1a1919,_0px_0px_0px_15px_#0e0e0d] ">
        {currentAccount.length > 0 && (
          <>
            <div className="pt-7">
              {currentAccount[0].imageUrl ? (
                <Avatar className="w-[4rem] h-[4rem] mx-auto">
                  <AvatarImage
                    className="object-cover"
                    src={currentAccount[0].imageUrl}
                    alt={currentAccount[0].username}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              ) : (
                <figure
                  style={{ background: currentAccount[0]?.avatar.bg }}
                  className="w-[4rem] h-[4rem] text-base  rounded-full  text-white mx-auto grid place-items-center"
                >
                  @
                </figure>
              )}
            </div>

            <h1 className="text-center text-xl capitalize  mt-3 font-semibold">
              {currentAccount[0].displayUsername}
            </h1>
            {currentAccount[0].bio && (
              <p className="mt-3 text-center text-sm text-neutral-600 ">
                {currentAccount[0].bio}
              </p>
            )}

            {currentAccount[0].email && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 border group text-neutral-500 rounded-lg  text-sm  flex items-center"
                >
                  <Copy className="mr-2 w-4 h-3 " />{" "}
                  <span className="group-active:scale-90 transition-all duration-300">
                    {copied ? "Copied" : "  E-mail"}
                  </span>
                </button>
              </div>
            )}

            {currentAccount[0].socialIcons?.length! > 0 && (
              <div className="mt-4 w-[15rem] mx-auto flex items-center justify-center gap-x-2">
                {currentAccount[0].socialIcons
                  ?.filter(
                    (icon) => icon.added === true && icon.hidden === false
                  )
                  ?.map((icon, i) => {
                    const iconName = icon.icon as "Bs0Circle";

                    const Icon = IconsReact[iconName];

                    return (
                      <Link
                        key={i}
                        href={icon.link}
                        className="p-2 border  rounded-xl hover:text-gray-800 transition duration-200 text-gray-500"
                      >
                        <span className="text-xl w-4 h-4 ">
                          <Icon className="text-sm" />
                        </span>
                      </Link>
                    );
                  })}
              </div>
            )}

            {currentAccount[0].links?.length! > 0 && (
              <MobileLinksContainer links={currentAccount[0].links!} />
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
};
export default MobilePreview;
