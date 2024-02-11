"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import {
  Computer,
  MoreHorizontal,
  StretchHorizontal,
  Trash,
  Wrench,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SquareUser } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { FormEvent, useEffect, useState } from "react";

type AccountProps = {
  account: Doc<"synchubAccount">;
};

const SynchubAccount = ({ account }: AccountProps) => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(account.username);
  const [isInputChanged, setIsInputChanged] = useState(false);

  const deleteAccount = useMutation(api.synchubAccount.deleteAccount);
  const updateUsername = useMutation(api.synchubAccount.updateUsername);

  async function handleDelete() {
    const promise = deleteAccount({ id: account._id });
    toast.promise(promise!, {
      loading: "Deleting  Account...",
      success: "Account deleted  🛑",
      error: "faild to delete  Account...",
    });
  }

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    const promise = updateUsername({ username, id: account._id });
    toast.promise(promise!, {
      loading: "Updating  Username...",
      success: "Username Updated ",
      error: "faild to update  Username...",
    });
    setEdit(false);
  }

  useEffect(() => {
    if (username !== account.username) {
      setIsInputChanged(false);
    } else {
      setIsInputChanged(true);
    }
  }, [account.username, username]);

  return (
    <AlertDialog>
      <div className="max-w-[40rem] w-full mx-auto bg-white rounded-xl ">
        <div className="flex ">
          <div className="border-r flex-shrink-0 py-3 px-3">
            <div
              style={{ backgroundColor: `${account.avatar.bg}` }}
              className="w-[2.5rem] h-[2.5rem]  grid place-items-center rounded-full  text-white"
            >
              <h4 className="text-center uppercase font-medium text-xl">
                {account.avatar.initail}
              </h4>
            </div>
          </div>

          <div className="py-3  px-2 w-full">
            <div className="flex   items-center justify-between">
              <span className="font-medium capitalize text-neutral-400">
                {account.username}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-none">
                  <Button className="outline-none" variant={"ghost"}>
                    <MoreHorizontal className="text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-2xl">
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem
                      onClick={() => setEdit(true)}
                      className="cursor-pointer py-4 text-base text-neutral-500"
                    >
                      <SquareUser className="mr-2 w-4 h-4" /> Change Username
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <DropdownMenuItem className="cursor-pointer py-4 text-base text-neutral-500">
                    <StretchHorizontal className="mr-2 w-4 h-4" /> Links
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-4 text-base text-neutral-500">
                    <Computer className="mr-2 w-4 h-4" /> Appearance
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-4 text-base text-neutral-500">
                    <Wrench className="mr-2 w-4 h-4" /> Settings
                  </DropdownMenuItem>
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem className="cursor-pointer py-4 hover:!text-red-700 text-base text-red-500">
                      <Trash className="mr-2 w-4 h-4" /> Delete Account
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-full mt-3">
              <h6 className="text-neutral-600 text-base">Admins</h6>

              <span className="mt-2  capitalize inline-block p-1 bg-neutral-100 w-full">
                {account.name}
              </span>
            </div>
          </div>
        </div>

        {edit && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Change username
              </AlertDialogTitle>
            </AlertDialogHeader>

            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-2 px-3 w-full rounded-md outline-stone-900/50 outline-offset-4 border"
                />
              </div>

              <AlertDialogFooter className="">
                <div className="flex flex-col-reverse gap-y-3 w-full">
                  <AlertDialogCancel onClick={() => setEdit(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction type="submit" disabled={isInputChanged}>
                    Done
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        )}

        {!edit && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Please confirm:</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </div>
    </AlertDialog>
  );
};

export default SynchubAccount;
