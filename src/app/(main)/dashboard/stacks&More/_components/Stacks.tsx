"use client";

import { useStacks } from "@/hooks/use-stacks";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import { useMutation } from "convex/react";
import Image from "next/image";
import { BsTrash3 } from "react-icons/bs";
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";

type StackType = {
  url: string;
  visible: boolean;
};

type Props = {
  stack: StackType;
};

const Stacks = () => {
  const { onOpen: openStacks } = useStacks();
  const { currentUser } = useCurrentUser();

  if (!currentUser) return;

  return (
    <div className="bg-white p-4 rounded-lg">
      <button
        onClick={openStacks}
        className="w-full flex-1 text-base mt-1 font-medium rounded-lg text-white py-3 bg-blue-500 hover:bg-blue-600 duration-500 transition-all"
      >
        Add Stacks & Tool
      </button>
      <div className="mt-5 flex gap-x-5 gap-y-6 flex-wrap">
        {currentUser.stacks?.map((stack, i) => {
          return <Stack key={i} stack={stack} />;
        })}
      </div>
    </div>
  );
};

function Stack({ stack }: Props) {
  const update = useMutation(api.synchubAccount.updateAccount);
  const { currentUser } = useCurrentUser();

  const deleteIcon = () => {
    if (!currentUser) return;

    const updatedIcons = currentUser?.stacks?.filter(
      (item) => item.url !== stack.url
    );

    const promise = update({ id: currentUser._id, stacks: updatedIcons });

    toast.promise(promise!, {
      loading: "deleting...",
      success: "Deleted! ",
      error: "faild to Delete...",
    });
  };

  return (
    <div className="flex flex-col items-center  gap-y-2">
      <div className="border rounded-lg p-2">
        <Image src={stack.url} alt="figma" width={40} height={40} />
      </div>
      <div className="flex items-center text-neutral-700 gap-x-4">
        <button
          onClick={deleteIcon}
          className="p-1 rounded-lg hover:bg-neutral-100 transition duration-300"
        >
          <BsTrash3 className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default Stacks;
