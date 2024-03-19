import ProfileImageUpload from "@/app/(main)/dashboard/_components/ui/ProfileImageUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { SingleImageDropzone } from "../SingleDropzone";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import { useStacks } from "@/hooks/use-stacks";
import StacksIcons from "@/app/(main)/dashboard/stacks&More/_components/StacksIcons";

const StacksModal = () => {
  const {
    isOpen,
    onClose,
    isUpload,
    upload,
    handleUpload,
    url,
    isAvaliable,
    linkId,
    handleUploadAvailable,
    setAvialableFalse,
  } = useStacks();

  const [file, setFile] = useState<File>();
  const [avaliableImg, setAvaliableImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useCurrentUser();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.synchubAccount.updateAccount);

  function handleClose() {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  }

  const onChange = async (file?: File) => {
    if (!currentUser) return;
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      });

      const newStack = { url: res.url, visible: true };
      const stacks = currentUser.stacks || [];

      await update({ id: currentUser._id, stacks: [newStack, ...stacks] });
    }
    handleClose();
  };

  const chooseAvailableImg = async (imgUrl: string) => {
    if (!currentUser) return;

    const newStack = { url: imgUrl, visible: true };
    const stacks = currentUser.stacks || [];

    await update({ id: currentUser._id, stacks: [newStack, ...stacks] });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!upload && (
          <div className="">
            <DialogTitle className="text-center text-[1.2rem] text-neutral-900">
              Set Thumbnail
            </DialogTitle>

            <ul className="space-y-3 mt-3">
              <ProfileImageUpload handleClick={handleUpload} />
              <li
                onClick={handleUploadAvailable}
                className="flex items-center cursor-pointer hover:bg-neutral-100 transition duration-300 p-3 rounded-lg gap-x-5"
              >
                <div className="w-12 h-12 rounded-lg grid place-items-center bg-gray-100">
                  <div className="rounded-full">
                    <Image
                      alt="slide-1"
                      src={"/img/tan5.png"}
                      width={500}
                      height={500}
                      className="rounded-full object-cover w-9 h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-lg">Choose avaliable </span>
                  <span className="text-sm text-neutral-400">
                    Choose avaliable.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}

        {upload && (
          <>
            {isUpload && (
              <div className="p-3">
                <DialogHeader>
                  <Button
                    onClick={setAvialableFalse}
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-lg "
                  >
                    <ChevronLeft />
                  </Button>
                  <DialogTitle className="text-center text-[1.2rem] text-neutral-900">
                    Choose image
                  </DialogTitle>
                </DialogHeader>

                <SingleImageDropzone
                  value={file}
                  disabled={isSubmitting}
                  onChange={onChange}
                />
              </div>
            )}

            {isAvaliable && (
              <div className="">
                <DialogHeader>
                  <Button
                    onClick={setAvialableFalse}
                    size={"icon"}
                    variant={"ghost"}
                    className="rounded-lg "
                  >
                    <ChevronLeft />
                  </Button>
                  <DialogTitle className="text-center text-[1.2rem] text-neutral-900">
                    Choose icon
                  </DialogTitle>
                </DialogHeader>
                <StacksIcons chooseAvailableImg={chooseAvailableImg} />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default StacksModal;
