"use client";

import UseMultiStepForm from "@/hooks/UseMultiStepForm";
import Username from "./Username";
import { FormEvent, useState } from "react";
import Categories from "./Categories";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { randomColor } from "@/lib/utils";

export interface FormData {
  username: string;
  name: string;
}

const AccountSetupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
  });
  const createAccount = useMutation(api.synchubAccount.createAccount);
  const accounts = useQuery(api.synchubAccount.allAccounts);
  const [isError, setIsError] = useState("");

  const handleChange = (fields: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const { step, isLastStep, nextStep } = UseMultiStepForm([
    <Username
      key="username"
      {...formData}
      handleChange={handleChange}
      isError={isError}
    />,
    <Categories
      key={"categories"}
      isError={isError}
      {...formData}
      handleChange={handleChange}
    />,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, username } = formData;

    for (let account of accounts!) {
      if (account.username === `@${formData.username}`) {
        setIsError("Username already exist");
        return;
      }
    }

    if (!isLastStep && !username.trim()) {
      setIsError("Please enter a value");
      return;
    }

    if (isLastStep && !name.trim()) {
      setIsError("Please enter a value");
      return;
    }

    if (!isLastStep) {
      setIsError("");
      nextStep();
      return;
    }

    const promise = createAccount({
      name: formData.name,
      username: `@${formData.username}`,
      displayUsername: `@${formData.username}`,
      avatar: {
        initail: formData.username.charAt(0),
        bg: randomColor(),
      },
    });

    setFormData({ name: "", username: "" });

    toast.promise(promise!, {
      loading: "Creating a new Account...",
      success: "New Account Created!! ",
      error: "faild to create a new Account...",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[40rem] w-full mx-auto">
      <h1 className="text-neutral-600 text-center font-medium text-3xl">
        Setup Synchub Account
      </h1>
      <div className="mt-9 flex flex-col gap-y-8">
        {step}
        <button className="w-full transition duration-200  rounded-3xl py-3 text-white text-base px-5  bg-blue-500 hover:bg-blue-700">
          Continue
        </button>
      </div>
    </form>
  );
};
export default AccountSetupForm;
