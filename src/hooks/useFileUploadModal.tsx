import { create } from "zustand";

type FileUploadStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useFileUploadModal = create<FileUploadStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
