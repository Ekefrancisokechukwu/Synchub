"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginBtn = () => {
  return (
    <Button asChild variant={"outline"} className="rounded-3xl">
      <Link href={"/login"}>Login</Link>
    </Button>
  );
};
export default LoginBtn;
