"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Loader, LogOut } from "lucide-react";

const LogOutButton = () => {
  const { isLoading } = useConvexAuth();
  return (
    <>
      {isLoading ? (
        <Button variant={"ghost"} className="px-3 py-3  animate-spin  mt-6">
          <Loader className="text-neutral-400" />
        </Button>
      ) : (
        <SignOutButton>
          <button className="px-3 py-3 hover:bg-neutral-100  mt-6">
            <LogOut
              className={`text-neutral-400 rounded-md transition-colors duration-200 w-5 h-5 `}
            />
          </button>
        </SignOutButton>
      )}
    </>
  );
};
export default LogOutButton;
