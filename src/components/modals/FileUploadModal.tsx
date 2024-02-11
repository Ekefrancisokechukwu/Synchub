"use client";

import ProfileImageUpload from "@/app/(main)/dashboard/_components/ui/ProfileImageUpload";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";

export const FileUploadModal = () => {
  const { isOpen, onClose } = useFileUploadModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-3">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.2rem] text-neutral-900">
            Upload Profile Pic
          </DialogTitle>
        </DialogHeader>
        <ul className="space-y-3 mt-3">
          <ProfileImageUpload />
        </ul>
      </DialogContent>
    </Dialog>
  );
};
