"use client";

import { RiDraggable } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { TbEyeCheck } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { LinksProps } from "./LinksContainer";

type Props = {
  link: LinksProps;
  // link: {id:number,t:string};
};

const SingleLink = ({ link }: Props) => {
  // const [edit, setEdit] = useState<{ [key: number]: string }>({});
  const [editLink, setEditLink] = useState(false);
  const [editLinkName, setEditLinkName] = useState(false);
  const [editHeadline, setEditHeadline] = useState(false);
  const [title, setTile] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: link.id,
    transition: {
      duration: 500,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="z-50">
     

      {link.headline && (
        <div className="max-h-[13rem] h-full flex items-center gap-x-2">
          <button {...attributes} {...listeners} className="cursor-grab">
            <RiDraggable className="text-2xl text-gray-500" />
          </button>
          <div className="py-4 px-6  flex-grow  bg-white rounded-2xl min-h-full flex items-center">
            <div
              onClick={() => {
                console.log("cliked");

                setEditHeadline(true);
              }}
              className="flex-grow flex justify-center  items-center gap-x-2 text-center"
            >
              {editHeadline ? (
                <input
                  autoFocus
                  type="text"
                  value={title ?? link.txt}
                  onBlur={() => {
                    setEditHeadline(false);
                  }}
                  onChange={(e) => setTile(e.target.value)}
                  className="text-base text-center outline-none"
                />
              ) : (
                <h5 className="text-base text-gray-500 font-medium ">
                  {link.txt ? link.txt : " Headline Title"}
                </h5>
              )}
              {!editHeadline && (
                <span>
                  <FiEdit className="text-sm text-gray-400" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-x-3 text-gray-500 text-xl">
              <button className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 ">
                <TbEyeCheck />
              </button>
              <button className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 ">
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
      )}

      {!link.headline && (
        <div className="flex items-center gap-x-2 max-h-[13rem] h-full">
          <button {...attributes} {...listeners} className="cursor-grab">
            <RiDraggable className="text-2xl text-gray-500" />
          </button>

          <div className="py-4 px-6  flex-grow bg-white rounded-2xl h-full flex items-center">
            <div className="flex-grow flex gap-x-7 items-center">
              <span className="w-9 cursor-pointer bg-neutral-100 rounded-full h-9 place-items-center text-xl text-gray-500  grid">
                <IoImageOutline />
              </span>
              <div>
                <div
                  onClick={() => setEditLinkName(true)}
                  className="flex items-center gap-x-2"
                >
                  {editLinkName ? (
                    <input
                      autoFocus
                      onBlur={() => {
                        setEditLinkName(false);
                      }}
                      type="text"
                      className="text-base outline-none"
                    />
                  ) : (
                    <h5 className="text-base">Github</h5>
                  )}
                  {!editLinkName && (
                    <span>
                      <FiEdit className="text-sm text-gray-400" />
                    </span>
                  )}
                </div>
                <div
                  onClick={() => setEditLink(true)}
                  className="flex items-center gap-x-2 mt-2"
                >
                  {editLink ? (
                    <input
                      autoFocus
                      onBlur={() => {
                        setEditLink(false);
                      }}
                      type="text"
                      className="outline-none text-sm"
                    />
                  ) : (
                    <p className=" text-sm">http://youtube/_56765m8 </p>
                  )}
                  {!editLink && <FiEdit className="text-sm text-gray-400" />}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3 text-gray-500 text-xl">
              <button className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 ">
                <TbEyeCheck />
              </button>
              <button className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 ">
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleLink;
