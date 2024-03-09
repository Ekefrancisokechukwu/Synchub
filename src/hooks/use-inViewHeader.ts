import { MotionValue } from "framer-motion";
import { create } from "zustand";

type Props = {
  inView: boolean;
  setInviewFalse: () => void;
  setInviewTrue: () => void;
  setScrollValue: (scrollYProgress: MotionValue<number>) => void;
  scrollYProgress: MotionValue<number> | null;
};

export const useInviewHeader = create<Props>((set) => ({
  inView: false,
  scrollYProgress: null,
  setInviewFalse: () => set({ inView: false }),
  setInviewTrue: () => set({ inView: true }),
  setScrollValue: (scrollYProgress: MotionValue<number>) =>
    set({ scrollYProgress: scrollYProgress }),
}));
