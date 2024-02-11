"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import GoogleLoading from "./ui/GoogleLoading";

const GoogleAccount = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <GoogleLoading />;
  }

  return (
    <form className="max-w-[40rem] w-full mx-auto">
      <h1 className="text-neutral-600 text-center font-medium text-3xl">
        My account
      </h1>
      <div className="bg-white w-full flex flex-col rounded-md gap-y-5 mt-9 px-9 py-4">
        <div className="">
          <Avatar className="mx-auto">
            <AvatarImage src={user?.imageUrl} alt="avater image " />
          </Avatar>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-sm text-neutral-600 ">
            Name
          </label>
          <input
            type="text"
            defaultValue={user?.fullName || ""}
            className="w-full outline-none  border-b py-3 "
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-sm text-neutral-600 ">
            Email
          </label>
          <input
            disabled
            type="email"
            defaultValue={user?.emailAddresses[0].emailAddress}
            className="w-full outline-none  border-b py-3 "
          />
        </div>
      </div>
    </form>
  );
};
export default GoogleAccount;
