import { create } from "zustand";

type AddIconStore = {
  isOpen: boolean;
  isDelete: boolean;
  linkId: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useDelete = create<AddIconStore>((set) => ({
  isOpen: false,
  isDelete: false,
  linkId: "",
  onOpen: (id: string) => set({ isOpen: true, linkId: id }),
  onClose: () => set({ isOpen: false }),
}));
