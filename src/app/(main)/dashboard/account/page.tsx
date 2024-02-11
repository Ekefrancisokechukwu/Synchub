"use client";

import { useQuery } from "convex/react";
import AccountSetupForm from "./_components/AccountSetupForm";
import GoogleAccount from "./_components/GoogleAccount";
import { api } from "../../../../../convex/_generated/api";
import SynchubAccount from "./_components/SynchubAccount";
import SynchubAccountLoading from "./_components/ui/SynchubAccountLoading";

const Account = () => {
  const accounts = useQuery(api.synchubAccount.accounts);

  return (
    <div className="pt-3 pb-5 px-5">
      <div className="mt-11">
        {accounts === undefined && <SynchubAccountLoading />}
        {accounts?.length! >= 1 && (
          <div>
            <h1 className="text-neutral-600 text-center font-medium text-3xl">
              My Synchub Accounts
            </h1>
            <div className="mt-6 space-y-6">
              {accounts?.map((account) => {
                return <SynchubAccount key={account._id} account={account} />;
              })}
            </div>
          </div>
        )}

        {accounts?.length! < 1 && <AccountSetupForm />}
      </div>

      <div className="mt-24">
        <GoogleAccount />
      </div>
    </div>
  );
};
export default Account;
