"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import LinksContainer from "./_components/LinksContainer";
import Heading from "./_components/Heading";
import Header from "./_components/Header";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeProps, useTheme } from "@/context/ThemeContext";
import Stacks from "./_components/Stacks";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DocumentIdPageProps {
  params: {
    usernameId: Id<"synchubAccount">;
  };
}

const defaultTheme = {
  backgroundColor: "#fff",
  backgroundImage: "#fff",
  textColor: "#7e7e7e",
  textHeading: "#1d1d1dd8",
  variant: "_3dWhite",
  particle: null,
  backgroundGradient: "#ffff",
};

const Overview = ({ params }: DocumentIdPageProps) => {
  const decodedParams = decodeURIComponent(params.usernameId);
  const [mounted, setMounted] = React.useState(false);
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const account = useQuery(api.synchubAccount.getAccount, {
    usernameId: decodedParams,
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (
    container: Container | undefined
  ): Promise<void> => {};

  if (account === undefined) {
    return;
  }
  const objUser = Object.fromEntries(
    account.map((account) => ["currentUser", account])
  );

  const { currentUser } = objUser;
  const theme = currentUser.style || defaultTheme;

  return (
    <div className="bg-blend-color-burn bg-center bg-contain bg-no-repeat sm:px-0 px-5 relative z-20  ">
      <div
        style={{
          backgroundColor: theme?.backgroundColor,
          backgroundImage: theme.backgroundGradient || theme.backgroundImage,
        }}
        className="fixed inset-0 bg-center -z-10 bg-cover "
      ></div>

      {init && theme.particle && (
        <Particles
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
                speed: 1,
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

      {!!theme.backgroundImage && (
        <div className="fixed h-full w-full  inset-0 -z-10">
          <div className="relative w-full h-full">
            <div
              style={{ backgroundImage: `url(${currentUser.imageUrl})` }}
              className="fixed blur-2xl mix-blend-overlay opacity-25 top-0 bg-no-repeat bg-cover bg-center h-full w-full"
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

      {mounted ? (
        <Header avater={currentUser} />
      ) : (
        <div className="">
          <Skeleton className="size-24 rounded-full mx-auto mt-9" />
        </div>
      )}

      <div className="max-w-[40rem] w-full  py-14  mx-auto">
        <Heading avater={currentUser} />
        {currentUser.links !== undefined && currentUser.links?.length > 0 && (
          <LinksContainer
            style={theme as ThemeProps}
            links={currentUser.links}
          />
        )}

        {currentUser.stacks?.length! > 0 && (
          <Stacks stacks={currentUser.stacks!} style={theme as ThemeProps} />
        )}
      </div>

      <div className="py-[2rem] text-center flex justify-center items-center gap-x-4">
        <Link
          target="_blank"
          href={"https://twitter.com/Francis64995273"}
          className="text-neutral-400 hover:underline font-medium text-sm"
        >
          &copy; Francis
        </Link>
        <Button
          asChild
          variant={"ghost"}
          className="rounded-full bg-gray-100 text-gray-500"
        >
          <Link href={"/"}>Create yours</Link>
        </Button>
      </div>
    </div>
  );
};
export default Overview;
