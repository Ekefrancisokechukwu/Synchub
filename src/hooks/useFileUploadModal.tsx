import { create } from "zustand";

type FileUploadStore = {
  isOpen: boolean;
  isUpload: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleUpload: () => void;
  onReplace: (url: string) => void;
  url?: string;
};

export const useFileUploadModal = create<FileUploadStore>((set) => ({
  url: undefined,
  isOpen: false,
  isUpload: false,
  onOpen: () => set({ isOpen: true }),
  handleUpload: () => set({ isUpload: true }),
  onClose: () => set({ isOpen: false, isUpload: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
