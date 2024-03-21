"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, Loader2, SquareUser } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentAccount";

const ProfileControl = () => {
  const accounts = useQuery(api.synchubAccount.accounts);

  const account = accounts !== undefined && accounts !== null;
  const [currentAccount, setCurrentAccount] = useState<Doc<"synchubAccount">>();
  const { setUser, currentUser } = useCurrentUser();

  useEffect(() => {
    if (account && accounts.length > 0) {
      setCurrentAccount(accounts[0]);
      setUser(accounts[0]);
    }
  }, [account, accounts, setUser]);

  return (
    <div className="fixed right-[3rem] top-3 w-[3rem] bg-white sm:grid hidden z-20 place-items-center shadow-xl h-[3rem] rounded-full">
      {!account ? (
        <Button
          size={"icon"}
          variant={"ghost"}
          className="animate-spin text-neutral-800"
        >
          <Loader2 />
        </Button>
      ) : accounts.length < 1 ? (
        <TooltipProvider delayDuration={3} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle />
            </TooltipTrigger>
            <TooltipContent className="bg-stone-900 text-white" side="left">
              <p>Create your Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div
              className="w-[2.5rem] h-[2.5rem] grid place-items-center rounded-full"
              style={{ backgroundColor: `${currentAccount?.avatar.bg}` }}
            >
              <span className="text-lg uppercase text-white text-center">
                {currentAccount?.username.charAt(0)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-12 p-5 rounded-2xl">
            <div className="flex items-center gap-x-3">
              {currentAccount?.imageUrl ? (
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={currentUser?.imageUrl}
                  />
                  <AvatarFallback>
                    {currentAccount?.username.charAt(1)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div
                  className="w-[2.2rem] h-[2.2rem] grid place-items-center rounded-full"
                  style={{ backgroundColor: `${currentAccount?.avatar.bg}` }}
                >
                  <span className="text-lg uppercase text-white text-center">
                    {currentAccount?.username.charAt(1)}
                  </span>
                </div>
              )}

              <div className="">
                <h1 className="font-semibold">{currentAccount?.username}</h1>
                <p className="text-xs text-neutral-400">
                  synchub/{currentAccount?.username}
                </p>
              </div>
            </div>

            <button
              disabled
              className="inline-block cursor-not-allowed py-2 px-4 text-[1rem] font-medium rounded-3xl border w-full mt-4 transition duration-300 hover:bg-neutral-100"
            >
              Launch a new hub
            </button>

            <DropdownMenuLabel className="mt-3 text-gray-400 font-medium">
              Account
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="rounded-2xl mt-2 py-4 cursor-pointer"
              >
                <Link
                  href={"/dashboard/account"}
                  className=" flex items-center gap-x-5 py-1 rounded-2xl"
                >
                  <SquareUser className=" w-5 h-5 " />{" "}
                  <h5 className="">My Account</h5>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
export default ProfileControl;
