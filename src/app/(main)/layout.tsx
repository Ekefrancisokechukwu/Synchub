"use client";

import { useConvexAuth } from "convex/react";
import Navigation from "./dashboard/_components/Navigation";
import ProfileControl from "./dashboard/_components/profile-control";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import MobilePreview from "./dashboard/_components/MobilePreview";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useConvexAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return redirect("/");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="h-screen flex bg-gray-100">
      <ProfileControl />
      <Navigation />

      <main className="grow h-screen flex   overflow-y-scroll">
        <div className="px-11 flex-[50%]  pt-5">{children}</div>

        {!isLoading && pathname !== "/dashboard/account" && (
          <div className="grow border-l sticky top-0 px-10 py-5 h-screen">
            <MobilePreview />
          </div>
        )}
      </main>
    </div>
  );
}
