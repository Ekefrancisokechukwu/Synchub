"use client";

import { useEffect, useState } from "react";
import { FileUploadModal } from "../modals/FileUploadModal";

export const ModalProvider = () => {
  return (
    <>
      <FileUploadModal />
    </>
  );
};
