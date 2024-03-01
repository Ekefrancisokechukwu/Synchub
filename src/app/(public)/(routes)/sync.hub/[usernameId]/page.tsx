"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import Header from "./_components/Header";

interface DocumentIdPageProps {
  params: {
    usernameId: Id<"synchubAccount">;
  };
}

const Overview = ({ params }: DocumentIdPageProps) => {
  const decodedParams = decodeURIComponent(params.usernameId);

  const account = useQuery(api.synchubAccount.getAccount, {
    usernameId: decodedParams,
  });

  console.log(decodedParams, "@Specter");

  if (account === undefined) {
    return;
  }

  const objUser = Object.fromEntries(
    account.map((account) => ["currentUser", account])
  );

  const { currentUser } = objUser;
  console.log(account);

  return (
    <div className="sm:px-0 px-5">
      <div className="max-w-[40rem] w-full  pt-14 pb-7  mx-auto">
        <Header avater={currentUser} />
      </div>
    </div>
  );
};
export default Overview;
