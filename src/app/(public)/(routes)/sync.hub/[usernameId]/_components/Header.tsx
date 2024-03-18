import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegShareSquare } from "react-icons/fa";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { motion } from "framer-motion";
import { useInviewHeader } from "@/hooks/use-inViewHeader";

type Props = {
  avater: Doc<"synchubAccount">;
};

const Header = ({ avater }: Props) => {
  const { inView } = useInviewHeader();

  const variants = {
    initial: { opacity: 0, translateY: 50 },
    animate: { opacity: 1, translateY: 0 },
  };

  return (
    <motion.header
      variants={variants}
      initial={"initial"}
      animate={inView ? "animate" : "initial"}
      transition={{
        duration: 0.3,
        type: "spring",
        ease: "easeIn",
        stiffness: 60,
      }}
      style={{ translateX: "-50%" }}
      className="fixed flex  justify-between items-center backdrop-blur-md bg-neutral-50/70 z-50 left-1/2 top-4 rounded-xl  shadow-md px-3 py-2  sm:w-[40rem] w-[90%]"
    >
      <div className="w-[2.5rem] h-[3rem] relative rounded-lg bg-neutral-100">
        <Image
          src={avater.imageUrl!}
          alt={avater.username}
          fill
          className="object-cover  rounded-lg"
        />
      </div>
      <h2 className="capitalize text-lg">{avater.displayUsername}</h2>

      <Button variant={"outline"} size={"icon"} className="bg-neutral-100">
        <FaRegShareSquare className="text-lg text-neutral-500 " />
      </Button>
    </motion.header>
  );
};
export default Header;
