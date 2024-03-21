"use client";

import { ThemeProps } from "@/context/ThemeContext";
import Image from "next/image";
import { StacksBox } from "./ui/stacks";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type StacksProps = {
  url: string;
  visible: boolean;
};

type Props = {
  style: ThemeProps;
  stacks: StacksProps[];
};

const Stacks = ({ style, stacks }: Props) => {
  return (
    <StacksBox variant={style.variant} className="mt-6 overscroll-x-auto">
      <h2 style={{ color: style.textColor }} className="font-medium text-lg">
        Stacks
      </h2>

      <div
        className={cn(
          "mt-2 overflow-hidden  items-center whitespace-nowrap",
          stacks.length > 6 && "scroller"
        )}
      >
        <ul
          className={cn(
            "inline-block space-x-7 cursor-pointer ",
            stacks.length > 6 && "scroller_inner"
          )}
        >
          {stacks.map((stack, i) => {
            return (
              <li
                key={i}
                className="w-[3rem]  inline-block  h-[3rem] flex-shrink-0"
              >
                <Image src={stack.url} alt="" width={200} height={200} />
              </li>
            );
          })}
        </ul>
        {stacks.length > 6 && (
          <ul
            className={cn(
              "inline-block space-x-7  cursor-pointer ",
              stacks.length > 6 && "scroller_inner"
            )}
          >
            {stacks?.map((stack, i) => {
              return (
                <li
                  key={i}
                  className="w-[3rem] ml-7  inline-block  h-[3rem] flex-shrink-0"
                >
                  <Image src={stack.url} alt="" width={200} height={200} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </StacksBox>
  );
};
export default Stacks;
