import { useCurrentUser } from "@/hooks/useCurrentAccount";
import { BsTwitterX } from "react-icons/bs";
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IconsReact } from "@/lib/data";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { AnimatePresence, animate, motion } from "framer-motion";

interface EditModes {
  [key: number]: boolean;
}

interface SocialIcon {
  icon: string;
  name: string;
  added: boolean;
  hidden: boolean;
  link?: string;
}

const SocialIcons = () => {
  const { currentUser } = useCurrentUser();
  const [editMode, setEditMode] = useState<EditModes>({});
  const update = useMutation(api.synchubAccount.updateAccount);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  const handleEdit = (linkIcon: SocialIcon, i: number) => {
    if (!currentUser) return;

    const updatedIcons = currentUser.socialIcons!.map((icon) =>
      icon.name === linkIcon.name ? { ...icon, link: inputValues[i] } : icon
    );

    if (inputValues[i]) {
      update({
        id: currentUser?._id,
        socialIcons: updatedIcons,
      });
    }
  };

  const handleSetInvisble = (linkIcon: SocialIcon) => {
    if (!currentUser) return;

    const updatedIcons = currentUser.socialIcons!.map((icon) =>
      icon.name === linkIcon.name ? { ...icon, hidden: !icon.hidden } : icon
    );

    update({
      id: currentUser?._id,
      socialIcons: updatedIcons,
    });
  };

  const deleteIcon = (name: string) => {
    if (!currentUser) return;

    const updatedIcons = currentUser.socialIcons!.map((icon) =>
      icon.name === name ? { ...icon, added: false, hidden: false } : icon
    );

    update({
      id: currentUser?._id,
      socialIcons: updatedIcons,
    });
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setInputValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleEditClick = (index: number) => {
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [index]: !prevEditModes[index],
    }));
  };

  if (!currentUser) return;

  return (
    <div className="mt-5">
      <h1 className="text-[1.1rem] text-neutral-900 font-semibold">
        Social Icons
      </h1>
      <div className="mt-3 bg-white rounded-xl p-1">
        {currentUser.socialIcons
          ?.filter((socialIcon) => socialIcon.added)
          .map((icon, i) => {
            const inconName = icon.icon as "Bs0Circle";
            const Icon = IconsReact[inconName];
            return (
              <div key={i} className="flex items-center">
                <div
                  onClick={() => handleEditClick(i)}
                  className="flex-grow flex hover:bg-neutral-100 p-4 rounded-xl duration-300 transition cursor-pointer items-center gap-x-3"
                >
                  <Icon className="text-xl" />
                  <div className="w-full ">
                    {editMode[i] ? (
                      <input
                        onFocus={(e) => {
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEdit(icon, i);
                            handleEditClick(i);
                          }
                        }}
                        onChange={(e) => handleChange(i, e)}
                        onBlur={() => {
                          handleEdit(icon, i);
                          handleEditClick(i);
                        }}
                        type="text"
                        value={inputValues[i] ?? icon.link}
                        autoFocus
                        className="w-full outline-none py-[.1rem] bg-transparent"
                      />
                    ) : (
                      <span className="font-medium text-lg capitalize">
                        {icon.name}
                      </span>
                    )}
                  </div>
                  {!editMode[i] && (
                    <span className="">
                      <FiEdit />
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xl gap-x-4">
                  <motion.button
                    onClick={() => handleSetInvisble(icon)}
                    className="p-2 transition duration-300 text-gray-400 rounded-xl hover:bg-neutral-100 "
                  >
                    <AnimatePresence mode="wait" initial>
                      <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {icon.hidden ? <TbEyeCancel /> : <TbEyeCheck />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                  <button
                    onClick={() => deleteIcon(icon.name)}
                    className="p-2 transition duration-300 text-gray-400 rounded-xl hover:bg-neutral-100 "
                  >
                    <BsTrash3 />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SocialIcons;
