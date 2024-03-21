"use client";

import Image from "next/image";
import { RxExternalLink } from "react-icons/rx";
import { LinkTheme } from "./ui/link";
import { ThemeProps } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  link: LinksProps;
  style: ThemeProps;
};

const option = {
  dark: { scale: [1.01, 1] },
  rounded: {},
  _3dWhite: {},
  simple: {},
  particleGray: {
    scale: 1.05,
  },
  gradients: {},
  default: {},
};

const LinkItem = ({ link, style }: Props) => {
  return (
    <>
      {link.headline && (
        <h1
          style={{ color: style?.textHeading }}
          className="text-center first-of-type:mt-0 mt-8 first-letter:uppercase text-lg  font-semibold"
        >
          {link.txt}
        </h1>
      )}

      {!link.headline && link.link! && (
        <motion.div
          variants={option}
          whileHover={option[style.variant!]}
          transition={{
            type: "spring",
            damping: 4,
            duration: 0.2,
            stiffness: 100,
          }}
        >
          <LinkTheme href={link.link} variant={style.variant}>
            <div className="relative sm:size-[2.5rem] size-[2rem] rounded-xl">
              {link.img ? (
                <Image
                  src={link.img}
                  alt={link.img}
                  sizes="(max-width: 768px) 100vw, 33vw)"
                  fill
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : null}
            </div>

            <span className="capitalize text-[1.1rem] font-medium ">
              {link.txt}
            </span>

            <RxExternalLink className="text-[1.3rem] " />
          </LinkTheme>
        </motion.div>
      )}
    </>
  );
};
export default LinkItem;
