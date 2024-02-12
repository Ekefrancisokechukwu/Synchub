"use client";

import ProfileImageUpload from "@/app/(main)/dashboard/_components/ui/ProfileImageUpload";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { SingleImageDropzone } from "../SingleDropzone";

export const FileUploadModal = () => {
  const { isOpen, onClose, isUpload, handleUpload } = useFileUploadModal();
  const accountQuery = useQuery(api.synchubAccount.accounts);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.synchubAccount.updateAccount);

  function handleClose() {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  }

  const onChange = async (file?: File) => {
    if (!accountQuery) return;

    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      await update({ id: accountQuery[0]._id, imageUrl: res.url });
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-3">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.2rem] text-neutral-900">
            Upload Profile Pic
          </DialogTitle>
        </DialogHeader>
        {isUpload ? (
          <SingleImageDropzone
            value={file}
            disabled={isSubmitting}
            onChange={onChange}
          />
        ) : (
          <ul className="space-y-3 mt-3">
            <ProfileImageUpload handleClick={handleUpload} />
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};
