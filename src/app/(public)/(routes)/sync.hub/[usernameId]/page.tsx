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
};

const Overview = ({ params }: DocumentIdPageProps) => {
  const decodedParams = decodeURIComponent(params.usernameId);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const account = useQuery(api.synchubAccount.getAccount, {
    usernameId: decodedParams,
  });

  if (account === undefined) {
    return;
  }

  const objUser = Object.fromEntries(
    account.map((account) => ["currentUser", account])
  );

  const { currentUser } = objUser;

  const theme = currentUser.style || defaultTheme;

  return (
    <div
      style={{
        backgroundColor: theme?.backgroundColor,
        backgroundImage: theme?.backgroundImage,
      }}
      className="bg-blend-color-burn sm:px-0 px-5 relative z-20  "
    >
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

        <Stacks style={theme as ThemeProps} />
      </div>
    </div>
  );
};
export default Overview;
