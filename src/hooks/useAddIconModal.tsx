import { create } from "zustand";

type AddIconStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  // handleUpload: () => void;
};

export const useAddIconModal = create<AddIconStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  // handleUpload: () => set({ isUpload: true }),
  onClose: () => set({ isOpen: false }),
}));
