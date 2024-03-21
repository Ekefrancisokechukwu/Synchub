"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useConvexAuth();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return (
    <div className=" bg-primary-foreground  min-h-screen">
      <div className="max-w-[1600px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
