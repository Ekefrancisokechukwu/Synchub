import Input from "@/app/(main)/dashboard/_components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddIconModal } from "@/hooks/useAddIconModal";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronLeft, ChevronRightIcon, Facebook } from "lucide-react";
import { IconsReact, SocialIcons } from "@/lib/data";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/useCurrentAccount";

export type IconProps = {
  icon: string;
  name: string;
  added: boolean;
};

export type ClickProp = {
  icon: null | any;
  name: string;
  link: string;
  added?: boolean;
};

const Variants = {
  from: { opacity: 0, y: 15 },
  to: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * i },
  }),
};

type T = {
  link: string;
  name: string;
  icon: string;
  added: boolean;
};

const IconHandle = () => {
  const { isOpen, onClose } = useAddIconModal();
  const [searchValue, setSearchValue] = useState("");
  const [selectedIconValue, setSlectedIconValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<
    ClickProp | IconProps | null
  >(null);
  const update = useMutation(api.synchubAccount.updateAccount);
  const { currentUser } = useCurrentUser();

  const addIcon = (linkIcon: T) => {
    if (!currentUser) return;

    const updatedIcons = currentUser.socialIcons!.map((icon) =>
      icon.name === linkIcon.name
        ? { ...icon, link: selectedIconValue, added: !icon.added }
        : icon
    );

    update({
      id: currentUser?._id,
      socialIcons: updatedIcons,
    });

    handleCloseModal();
    setSlectedIconValue("");
  };

  const handleSelectedIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlectedIconValue(e.target.value);
    setIsValid(isLinkValid(e.target.value));
  };

  const isLinkValid = (link: string) => {
    const linkPattern = /^https:\/\//i;
    return linkPattern.test(link);
  };

  const newFilteredIcon = currentUser?.socialIcons!.filter((icon) =>
    icon.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectIcon = (icon: IconProps) => {
    setSelectedIcon(icon);
    setSearchValue("");
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedIcon(null);
    setSearchValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="overflow-hidden ">
        <motion.div layout="position">
          {!selectedIcon && (
            <motion.div layoutId="icon">
              <div>
                <DialogHeader>
                  <DialogTitle className="text-center">Add icon</DialogTitle>
                </DialogHeader>
                <div className="mt-3">
                  <Input
                    value={searchValue}
                    handleChange={handleChange}
                    labelText="Search"
                  />
                </div>
                <ScrollArea className="mt-2 h-[15rem]">
                  <motion.ul className="mt-2 space-y-2">
                    {searchValue === "" ? (
                      currentUser &&
                      currentUser.socialIcons !== undefined &&
                      currentUser.socialIcons?.length > 0 &&
                      currentUser?.socialIcons.map((icon, i) => {
                        const { name, added } = icon;

                        const inconName = icon.icon as "Bs0Circle";
                        const Icon = IconsReact[inconName];

                        return (
                          <motion.li
                            variants={Variants}
                            initial="from"
                            whileInView="to"
                            custom={i}
                            viewport={{ once: true }}
                            key={i}
                            className=""
                          >
                            <button
                              disabled={added}
                              onClick={() => handleSelectIcon(icon)}
                              className="flex py-4 px-3 w-full disabled:cursor-default disabled:opacity-50  justify-between cursor-pointer hover:bg-neutral-100 duration-300 rounded-lg"
                            >
                              <div className="flex gap-x-3 items-center">
                                <span className="text-lg">
                                  <Icon />
                                </span>

                                <span className="font-medium capitalize">
                                  {name}
                                </span>
                              </div>

                              {added ? (
                                <span className="text-base text-green-600">
                                  Added
                                </span>
                              ) : (
                                <span>
                                  <ChevronRightIcon className="w-5 h-5 text-neutral-900" />
                                </span>
                              )}
                            </button>
                          </motion.li>
                        );
                      })
                    ) : searchValue && newFilteredIcon!.length > 0 ? (
                      newFilteredIcon!.map((icon, i) => {
                        const { name, added } = icon;
                        const iconName = icon.icon as "Bs0Circle";

                        const Icon = IconsReact[iconName];

                        return (
                          <motion.li
                            onClick={() => handleSelectIcon(icon)}
                            variants={Variants}
                            initial="from"
                            whileInView="to"
                            custom={i}
                            viewport={{ once: true }}
                            key={i}
                          >
                            <button
                              disabled={added}
                              className="flex py-4 px-3 w-full disabled:cursor-default disabled:opacity-40  justify-between cursor-pointer hover:bg-neutral-100 duration-300 rounded-lg"
                            >
                              <div className="flex gap-x-3 items-center">
                                <span className="text-lg">
                                  <Icon />
                                </span>

                                <span className="font-medium capitalize">
                                  {name}
                                </span>
                              </div>

                              {added ? (
                                <span className="text-base text-green-600">
                                  Added
                                </span>
                              ) : (
                                <span>
                                  <ChevronRightIcon className="w-5 h-5 text-neutral-900" />
                                </span>
                              )}
                            </button>
                          </motion.li>
                        );
                      })
                    ) : (
                      <h1 className="text-center mt-12 font-medium text-neutral-900 text-base">
                        Icon Not Found.....
                      </h1>
                    )}
                  </motion.ul>
                </ScrollArea>
              </div>
            </motion.div>
          )}

          {selectedIcon && (
            <motion.div className="">
              <DialogHeader className="flex flex-row items-center">
                <Button
                  onClick={() => setSelectedIcon(null)}
                  size={"icon"}
                  variant={"ghost"}
                  className="rounded-lg "
                >
                  <ChevronLeft />
                </Button>
                <DialogTitle className="ml-14 !mt-0">
                  Add {selectedIcon?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-3">
                <Input
                  value={selectedIconValue}
                  handleChange={handleSelectedIconChange}
                  labelText={`Add your ${selectedIcon.name} link`}
                />
              </div>
              {!isValid && selectedIconValue && (
                <p className="text-red-500 mt-2 text-sm">
                  Enter a valid {selectedIcon.name} Link
                </p>
              )}

              <button
                disabled={selectedIconValue === "" || !isValid}
                onClick={() =>
                  addIcon({
                    link: selectedIconValue,
                    name: selectedIcon.name,
                    icon: selectedIcon.icon,
                    added: true,
                  })
                }
                className="block py-2 w-full rounded-lg mt-3 px-2 text-lg font-medium disabled:bg-neutral-300 disabled:text-stone-500  text-gray-100 bg-neutral-900 "
              >
                Add Icon
              </button>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
export default IconHandle;
