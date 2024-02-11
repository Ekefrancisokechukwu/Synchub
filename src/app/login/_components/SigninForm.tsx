"use client";

import { SignIn } from "@clerk/clerk-react";

const SigninForm = () => {
  return <SignIn redirectUrl={"/dashboard"} />;
};

export default SigninForm;
