"use client";

import { FileUploadModal } from "../modals/FileUploadModal";
import IconHandle from "../modals/IconHandle";
import LinkThumbnail from "../modals/LinkThumbnail";
import StacksModal from "../modals/StacksModal";

export const ModalProvider = () => {
  return (
    <>
      <FileUploadModal />
      <IconHandle />
      <LinkThumbnail />
      <StacksModal />
    </>
  );
};
