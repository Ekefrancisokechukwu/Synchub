import { create } from "zustand";

type FileUploadStore = {
  isOpen: boolean;
  isUpload: boolean;
  isAvaliable: boolean;
  upload: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleUpload: () => void;
  handleUploadAvailable: () => void;
  setAvialableFalse: () => void;
  onReplace: (url: string) => void;
  setLinkId: (url: string) => void;
  url?: string;
  linkId?: string;
};

export const useThumbnail = create<FileUploadStore>((set) => ({
  url: undefined,
  isOpen: false,
  isUpload: false,
  isAvaliable: false,
  upload: false,
  linkId: "",
  onOpen: () => set({ isOpen: true }),
  handleUpload: () => set({ isUpload: true, upload: true }),
  handleUploadAvailable: () => set({ isAvaliable: true, upload: true }),
  setAvialableFalse: () =>
    set({ isAvaliable: false, upload: false, isUpload: false }),
  onClose: () =>
    set({
      isOpen: false,
      isUpload: false,
      isAvaliable: false,
      url: undefined,
      upload: false,
    }),
  setLinkId: (linkId: string) => set({ linkId }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
