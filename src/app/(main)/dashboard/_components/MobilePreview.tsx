"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Loader, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PublishedLink from "./PublishedLink";
import { useCopy } from "@/hooks/use-copy";
import Link from "next/link";
import { IconsReact } from "@/lib/data";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import MobileLinksContainer from "./MobileLinksContainer";
import { StacksBox } from "@/app/(public)/(routes)/sync.hub/[usernameId]/_components/ui/stacks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";

const MobilePreview = () => {
  const currentAccount = useQuery(api.synchubAccount.accounts);
  const isLoading = currentAccount === undefined || currentAccount === null;
  const { currentUser } = useCurrentUser();
  const { copied, copyToClipboard } = useCopy(
    !isLoading ? currentAccount[0]?.email! : ""
  );
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (
    container: Container | undefined
  ): Promise<void> => {};

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
      <div className="lg:mb-8 my-5">
        <PublishedLink />
      </div>

      <ScrollArea className="h-[80vh] overflow-hidden sm:rounded-3xl px-4 z-30  relative bg-neutral-50  xl:w-[335px] lg:w-[300px] w-full  mx-auto  lg:shadow-[0px_0px_0px_8px_#2c2c2b,_0px_0px_0px_8px_#1a1919,_0px_0px_0px_15px_#0e0e0d] ">
        <div
          style={{
            backgroundColor: currentUser?.style?.backgroundColor,
            backgroundImage:
              currentUser?.style?.backgroundImage ||
              currentUser?.style?.backgroundGradient,
          }}
          className="absolute inset-0 bg-center -z-10 bg-cover "
        ></div>

        {init && currentUser?.style?.particle && (
          <Particles
            className="absolute"
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },

                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
          />
        )}

        {!!currentUser?.style?.backgroundImage && (
          <div className="absolute h-full w-full  inset-0 -z-10">
            <div className="relative w-full h-full">
              <div
                style={{ backgroundImage: `url(${currentUser.imageUrl})` }}
                className="absolute blur-2xl mix-blend-overlay opacity-25 top-0 bg-no-repeat bg-cover bg-center h-full w-full"
              ></div>

              <div
                style={{
                  backgroundSize: "512px 512px",
                  backgroundImage:
                    "url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgNTEyIDUxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KICA8ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+CiAgICA8ZmVUdXJidWxlbmNlIAogICAgICB0eXBlPSdmcmFjdGFsTm9pc2UnIAogICAgICBiYXNlRnJlcXVlbmN5PScwLjcnCiAgICAgIG51bU9jdGF2ZXM9JzMnIAogICAgICBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+CiAgICA8ZmVDb2xvck1hdHJpeCBpbj0idHVyYnVsZW5jZSIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPgoKICAgIDxmZUNvbXBvbmVudFRyYW5zZmVyPgogICAgICA8ZmVGdW5jUiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIgLz4KICAgICAgPGZlRnVuY0cgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDEiIC8+CiAgICAgIDxmZUZ1bmNCIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAxIiAvPgogICAgPC9mZUNvbXBvbmVudFRyYW5zZmVyPgogIDwvZmlsdGVyPgogIAogIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz4KPC9zdmc+)",
                }}
                className="fixed bg-blend-overlay top-0 bg-no-repeat  opacity-[0.04]    h-full w-full"
              ></div>
            </div>
          </div>
        )}

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

            <h1
              style={{ color: currentAccount[0].style?.textHeading }}
              className="text-center text-xl capitalize  mt-3 font-semibold"
            >
              {currentAccount[0].displayUsername}
            </h1>

            {currentAccount[0].bio && (
              <p
                style={{ color: currentAccount[0].style?.textColor }}
                className="mt-3 text-center text-sm text-neutral-600 "
              >
                {currentAccount[0].bio}
              </p>
            )}

            {currentAccount[0].email && (
              <div className="flex justify-center mt-4">
                <button
                  style={{ color: currentUser?.style?.textColor }}
                  onClick={copyToClipboard}
                  className="px-3 py-2 border group  rounded-lg  text-sm  flex items-center"
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
                        style={{ color: currentUser?.style?.textColor }}
                        href={icon.link}
                        className="p-2 border  rounded-xl hover:text-gray-800 transition duration-200 "
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

            {currentAccount[0].stacks?.length! > 0 && (
              <div className="mt-3 pb-10 ">
                <StacksBox
                  variant={currentUser?.style?.variant}
                  className="w-[95%] mx-auto p-1"
                >
                  <h2
                    style={{ color: currentUser?.style?.textColor }}
                    className="font-medium text-sm"
                  >
                    Stacks
                  </h2>

                  <div
                    className={cn(
                      "mt-2  items-center lg:w-[17rem] sm:w-full w-[20rem] max-[343px]:w-[17rem] whitespace-nowrap",
                      currentUser?.stacks?.length! > 6 && "scroller"
                    )}
                  >
                    <ul
                      className={cn(
                        "inline-block space-x-4 cursor-pointer ",
                        currentUser?.stacks?.length! > 6 && "scroller_inner"
                      )}
                    >
                      {currentUser?.stacks!.map((stack, i) => {
                        return (
                          <li
                            key={i}
                            className="w-[1.2rem]  inline-block  h-[1.3rem] flex-shrink-0"
                          >
                            <Image
                              src={stack.url}
                              alt=""
                              width={200}
                              height={200}
                            />
                          </li>
                        );
                      })}
                    </ul>
                    {currentUser?.stacks?.length! > 6 && (
                      <ul
                        className={cn(
                          "inline-block space-x-4 cursor-pointer ",
                          currentUser?.stacks?.length! > 6 && "scroller_inner"
                        )}
                      >
                        {currentUser?.stacks!.map((stack, i) => {
                          return (
                            <li
                              key={i}
                              className="w-[1.2rem] ml-4  inline-block  h-[1.3rem] flex-shrink-0"
                            >
                              <Image
                                src={stack.url}
                                alt=""
                                width={200}
                                height={200}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </StacksBox>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
};
export default MobilePreview;
