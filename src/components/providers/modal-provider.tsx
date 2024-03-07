"use client";

import { FileUploadModal } from "../modals/FileUploadModal";
import IconHandle from "../modals/IconHandle";
import LinkThumbnail from "../modals/LinkThumbnail";

export const ModalProvider = () => {
  return (
    <>
      <FileUploadModal />
      <IconHandle />
      <LinkThumbnail />
    </>
  );
};
