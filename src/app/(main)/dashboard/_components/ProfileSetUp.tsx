"use client";

import { useEffect, useState } from "react";
import Input from "./ui/Input";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";

const ProfileSetUp = () => {
  const [wordCount, setWordCount] = useState<number>(0);
  const { onOpen } = useFileUploadModal();
  const accountQuery = useQuery(api.synchubAccount.accounts);
  const [currentAccount, setCurrentAccount] = useState<Doc<"synchubAccount">>();
  const [inputValues, setInputValues] = useState({ username: "", bio: "" });

  const update = useMutation(api.synchubAccount.updateAccount);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));

    if (name === "bio" || name === "username") {
      // Update bio or username in real-time
      if (currentAccount) {
        update({
          id: currentAccount._id,
          [name]: value,
        });
      }
    }

    if (name === "bio") {
      const words = value.split("");
      setWordCount(words.length > 100 ? 100 : words.length);
    }
  };

  useEffect(() => {
    if (accountQuery) {
      setCurrentAccount(accountQuery[0]);
      setInputValues({
        username: accountQuery[0]?.username || "",
        bio: accountQuery[0]?.bio || "",
      });
    }
  }, [accountQuery]);

  return (
    <div>
      <h1 className="text-[1.1rem] text-neutral-900 font-semibold">
        User Profile
      </h1>

      <div className="bg-white rounded-xl mt-4 p-5">
        <div className="flex items-center gap-x-3">
          <div
            style={{ background: currentAccount?.avatar.bg }}
            onClick={onOpen}
            className="w-[5rem] h-[5rem] flex-shrink-0 cursor-pointer grid place-items-center rounded-full  text-white text-xl"
          >
            @
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <button
              onClick={onOpen}
              className="text-base w-full py-3 transition duration-300 hover:bg-blue-700 font-semibold text-white bg-blue-500 rounded-3xl"
            >
              Pick an image
            </button>
            <button className="text-base w-full py-3 transition duration-300 hover: text-neutral-500 border font-semibold rounded-3xl">
              Remove
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          <Input
            name="username"
            handleChange={handleChange}
            value={inputValues.username}
            labelText="Profile Title"
          />
          <div className="relative grow">
            <textarea
              name="bio"
              cols={30}
              value={inputValues.bio || currentAccount?.bio}
              onChange={handleChange}
              placeholder="Bio"
              maxLength={100}
              className="peer min-h-[5rem] resize-none bg-muted w-full px-3 pt-8 pb-4 placeholder-transparent  text-neutral-500 rounded-lg hover:outline text-base focus:outline outline-offset-1 outline-2  outline-stone-400 transition duration-75 ease-out"
            ></textarea>
            <label className="absolute -translate-y-1 truncate pointer-events-none text-sm transition-all text-neutral-500 transform  pl-3 top-[10px] left-0 scale-[0.85] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 origin-[0] peer-focus:scale-[0.85] peer-focus:-translate-y-1">
              Bio
            </label>
            <div className="flex justify-end text-neutral-600 font-medium text-base">
              <span>
                {wordCount}
                <span>/</span>100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSetUp;
