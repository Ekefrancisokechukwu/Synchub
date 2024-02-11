"use client";

import { useConvexAuth, useQuery } from "convex/react";
import SkeletonDashboard from "../_components/SkeletonDashboard";
import { redirect } from "next/navigation";
import ProfileSetUp from "../_components/ProfileSetUp";
import MobilePreview from "../_components/MobilePreview";
import { api } from "../../../../../convex/_generated/api";
import ProfileControl from "../_components/profile-control";
import AccountSetupForm from "../account/_components/AccountSetupForm";

const Page = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const accounts = useQuery(api.synchubAccount.accounts);

  const isAccount =
    accounts === undefined || accounts === null || accounts.length < 1;

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  if (isAccount) {
    return (
      <div className="h-screen  bg-gray-100">
        <ProfileControl />
        <div className="pt-14">
          <AccountSetupForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProfileSetUp />
    </div>
  );
};
export default Page;
