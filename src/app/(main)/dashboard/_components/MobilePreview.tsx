"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";

const MobilePreview = () => {
  const currentAccount = useQuery(api.synchubAccount.accounts);
  const [copied, setCopied] = useState(false);
  const isLoading = currentAccount === undefined || currentAccount === null;

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  if (isLoading) {
    return (
      <ScrollArea className="h-[85vh] rounded-3xl px-4  bg-gray-200  w-[330px] mx-auto shadow-[0px_0px_0px_11px_#2c2c2b,_0px_0px_0px_13px_#1a1919,_0px_0px_0px_20px_#0e0e0d] ">
        <Button size={"icon"} variant={"ghost"} className="animate-spin">
          <Loader2 />
        </Button>
      </ScrollArea>
    );
  }

  return (
    <>
      <ScrollArea className="h-[80vh] rounded-3xl px-4  bg-neutral-50  w-[320px] mx-auto  shadow-[0px_0px_0px_8px_#2c2c2b,_0px_0px_0px_8px_#1a1919,_0px_0px_0px_15px_#0e0e0d] ">
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
              {currentAccount[0].username}
            </h1>
            {currentAccount[0].bio && (
              <p className="mt-3 text-center text-sm text-neutral-600 ">
                {currentAccount[0].bio}
              </p>
            )}

            {currentAccount[0].email && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleCopy(currentAccount[0].email!)}
                  className="px-3 py-2 border group text-neutral-500 rounded-sm  text-sm  flex items-center"
                >
                  <Copy className="mr-2 w-4 h-3 " />{" "}
                  <span className="group-active:scale-90 transition-all duration-300">
                    {copied ? "Copied" : "  E-mail"}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </ScrollArea>

      <div className="grid place-items-center mt-7">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-5 py-2 text-sm hover:shadow-xl  rounded-full text-white bg-blue-600 inline-block  text-center"
        >
          Device Preview
        </motion.button>
      </div>
    </>
  );
};
export default MobilePreview;
