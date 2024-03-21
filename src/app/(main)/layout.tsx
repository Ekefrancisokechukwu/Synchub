"use client";

import { useConvexAuth } from "convex/react";
import Navigation from "./dashboard/_components/Navigation";
import ProfileControl from "./dashboard/_components/profile-control";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobilePreview from "./dashboard/_components/MobilePreview";
import Header from "./dashboard/_components/Header";
import { motion } from "framer-motion";
import ThemeMediaPreview from "./dashboard/_components/ThemeMediaPreview";
import { X } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return redirect("/");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="h-screen flex bg-gray-100">
      <Header />
      <ProfileControl />
      <Navigation />

      <main className="grow h-screen flex   overflow-y-scroll overflow-x-hidden">
        <div className="sm:px-11 px-6 flex-[50%]  pt-5 sm:mt-0 mt-[8rem] max-[500px]:mt-[10rem]">
          {children}
        </div>

        <ThemeMediaPreview isPreviewOpen={isPreviewOpen} />
        <motion.button
          whileTap={{ scale: 1.1, shadow: "#0000007a 2px 2px 0 0" }}
          transition={{ type: "spring" }}
          style={{ translateX: "-50%" }}
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="inline-block  lg:hidden py-2 px-6 z-[70] rounded-3xl font-medium bg-gray-900 text-white text-lg fixed left-1/2 bottom-[2rem] shadow-xl "
        >
          {isPreviewOpen ? <X /> : "Preview"}
        </motion.button>

        {pathname !== "/dashboard/account" && (
          <div className="grow lg:block hidden border-l sticky top-0 px-10 py-5 h-screen">
            <MobilePreview />
          </div>
        )}
      </main>
    </div>
  );
}
