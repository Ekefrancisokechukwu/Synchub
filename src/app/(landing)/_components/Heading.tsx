"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return (
    <div className="mt-20 pb-5 px-4">
      <h1 className="md:text-6xl sm:text-5xl text-3xl text-center font-bold leading-normal">
        Create and enjoy with
        <br />
        <span className="bg-clip-text bg-gradient-to-r text-transparent from-slate-600 via-blue-500 to-blue-700 inline-block">
          Synchub
        </span>{" "}
        Today!
      </h1>

      <div className="text-center mt-16">
        {isLoading ? (
          <Button variant={"ghost"} className="animate-spin">
            <Loader2 />
          </Button>
        ) : (
          <SignInButton>
            <Button size={"lg"} className="group text-xl rounded-3xl">
              Join
              <ArrowUpRight className="transition-all ml-3" />
            </Button>
          </SignInButton>
        )}
      </div>

      <div className="text-center mt-14">
        <p className="text-lg mb-2">
          Join our waitlist to receive exclusive updates and early access.
        </p>
        <button className="bg-gradient-to-r text-sm from-teal-500 to-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300">
          Join Waitlist
        </button>
      </div>
    </div>
  );
};
export default Heading;
