import { create } from "zustand";

type FileUploadStore = {
  isOpen: boolean;
  isUpload: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleUpload: () => void;
};

export const useFileUploadModal = create<FileUploadStore>((set) => ({
  isOpen: false,
  isUpload: false,
  onOpen: () => set({ isOpen: true }),
  handleUpload: () => set({ isUpload: true }),
  onClose: () => set({ isOpen: false, isUpload: false }),
}));
