"use client";

import MobilePreview from "./MobilePreview";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isPreviewOpen: boolean;
};

const ThemeMediaPreview = ({ isPreviewOpen }: Props) => {
  const variant = {
    open: {
      height: "100%",
    },

    close: {
      height: 0,
    },
  };
  return (
    <AnimatePresence initial mode="popLayout">
      <motion.div
        variants={variant}
        exit={"close"}
        initial={"close"}
        animate={isPreviewOpen ? "open" : "close"}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
        className="fixed top-0 z-[60] left-0 h-full  bg-gray-500 lg:hidden block  w-full"
      >
        <MobilePreview />
      </motion.div>
    </AnimatePresence>
  );
};
export default ThemeMediaPreview;
