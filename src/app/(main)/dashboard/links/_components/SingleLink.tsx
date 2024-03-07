"use client";

import { RiDraggable } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import { useThumbnail } from "@/hooks/use-thumbnail";
import Image from "next/image";

type Props = {
  link: LinksProps;
};

const SingleLink = ({ link }: Props) => {
  const [editLink, setEditLink] = useState(false);
  const [editLinkName, setEditLinkName] = useState(false);
  const [editHeadline, setEditHeadline] = useState(false);
  const [title, setTitle] = useState(link.txt);
  const [linkValue, setLinkValue] = useState(
    link.link ? link.link : "https://"
  );
  const { currentUser } = useCurrentUser();
  const { onOpen, onReplace, setLinkId } = useThumbnail();

  const updatelinks = useMutation(api.synchubAccount.updateLinks);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
      transition: {
        duration: 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const handleEditTitle = (updatedTitle: string) => {
    if (!currentUser) return;

    const visibleHandle = updatedTitle ? true : false;

    const updatedLink = currentUser.links!.map((l) =>
      l.id === link.id
        ? { ...link, txt: updatedTitle, visible: visibleHandle }
        : l
    );

    if (title) {
      updatelinks({
        id: currentUser?._id,
        links: updatedLink,
      });
    }
  };

  const handleEditLink = (newLinkValue: string) => {
    if (!currentUser) return;

    const visibleHandle = newLinkValue && link.link ? true : false;

    const updatedLink = currentUser.links!.map((l) =>
      l.id === link.id
        ? { ...link, link: newLinkValue, visible: visibleHandle }
        : l
    );

    if (linkValue) {
      updatelinks({
        id: currentUser?._id,
        links: updatedLink,
      });
    }
  };

  const handleVisiblity = () => {
    if (!currentUser) return;

    const updatedLink = currentUser.links!.map((l) =>
      l.id === link.id ? { ...link, visible: !link.visible } : l
    );

    if (linkValue) {
      updatelinks({
        id: currentUser?._id,
        links: updatedLink,
      });
    }
  };

  const deleteLink = () => {
    if (!currentUser) return;
    const updatedLink = currentUser.links?.filter(
      (item) => item.id !== link.id
    );

    if (linkValue) {
      updatelinks({
        id: currentUser?._id,
        links: updatedLink,
      });
    }
  };

  useEffect(() => {
    setLinkValue(link.link ? link.link : "https://");
  }, [link.link]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      {link.headline && (
        <div className="max-h-[13rem] group-first-of-type:mt-0 mt-8  h-full flex items-center gap-x-2">
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
                  value={title}
                  onBlur={() => {
                    setEditHeadline(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditHeadline(false);
                    }
                  }}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleEditTitle(e.target.value);
                  }}
                  className="text-base text-center outline-none"
                />
              ) : (
                <h5 className="text-base first-letter:capitalize text-gray-700 font-medium ">
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
              <motion.button
                onClick={handleVisiblity}
                transition={{ duration: 0.3, bounce: 2, bounceDamping: 2 }}
                className="p-2 transition duration-300 text-[1.3rem] rounded-xl hover:bg-neutral-100 "
              >
                {link.visible ? (
                  <motion.span
                    className="inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <TbEyeCheck />
                  </motion.span>
                ) : (
                  <motion.span
                    className="inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <TbEyeCancel />
                  </motion.span>
                )}
              </motion.button>
              <button
                onClick={deleteLink}
                className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 "
              >
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
      )}

      {!link.headline && (
        <div className="flex items-center gap-x-2 max-h-[13rem] h-full">
          <button {...attributes} {...listeners} className="cursor-grab ">
            <RiDraggable className="text-2xl text-gray-500" />
          </button>

          <div className="py-4 px-6  flex-grow bg-white rounded-2xl h-full flex items-center">
            <div className="flex-grow flex gap-x-7 items-center">
              <span
                onClick={() => {
                  setLinkId(link.id);
                  onOpen();
                }}
                className="w-9 cursor-pointer bg-neutral-100 rounded-full h-9 place-items-center text-xl text-gray-500  grid"
              >
                {link.img ? (
                  <Image
                    src={link.img}
                    alt="thumbnail img"
                    width={60}
                    height={60}
                  />
                ) : (
                  <IoImageOutline />
                )}
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
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        handleEditTitle(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditLinkName(false);
                        }
                      }}
                      type="text"
                      className="text-base outline-none"
                    />
                  ) : (
                    <h5 className="text-base text-gray-700 capitalize">
                      {link.txt ? link.txt : "Link Titile"}
                    </h5>
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
                      onBlur={(e) => {
                        setEditLink(false);
                        handleEditLink(e.target.value);
                      }}
                      onChange={(e) => {
                        setLinkValue(e.target.value);
                        console.log(e.target.value);
                        handleEditLink(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditLink(false);
                          handleEditLink(linkValue);
                        }
                      }}
                      value={linkValue}
                      type="text"
                      className="outline-none text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm  truncate w-44">
                      {link.link ? link.link : "Enter Link"}
                    </p>
                  )}
                  {!editLink && <FiEdit className="text-sm text-gray-400" />}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3 text-gray-500 text-xl">
              <button
                onClick={handleVisiblity}
                className="p-2 transition duration-300 text-[1.3rem] rounded-xl hover:bg-neutral-100 "
              >
                {link.visible && link.link ? (
                  <span>
                    <TbEyeCheck />
                  </span>
                ) : (
                  <span>
                    <TbEyeCancel />
                  </span>
                )}
              </button>
              <button
                onClick={deleteLink}
                className="p-2 transition duration-300 rounded-xl hover:bg-neutral-100 "
              >
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
