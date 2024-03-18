import Header from "./_components/Header";
import Heading from "./_components/Heading";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export default function Home() {
  // const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <main className="">
      <Header />
      <Heading />
    </main>
  );
}
