"use client";

import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const slide = [
  "/img/tan-1.avif",
  "/img/tan-2.avif",
  "/img/tan-3.avif",
  "/img/tan-4.avif",
];

const ProfileImageUpload = () => {
  const [current, setCurrent] = useState(0);
  const { onClose } = useFileUploadModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slide.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [current]);

  const handleFile = () => {
    onClose();
  };

  return (
    <li
      onClick={handleFile}
      className="flex items-center cursor-pointer hover:bg-neutral-100 transition duration-300 p-3 rounded-lg gap-x-5"
    >
      <div className="w-12 h-12 rounded-lg grid place-items-center bg-gradient-to-br from-rose-500 via-blue-700 to-blue-800">
        <div className="rounded-full">
          {
            <Image
              alt="slide-1"
              src={slide[current]}
              width={500}
              height={500}
              className="rounded-full object-cover w-9 h-9"
            />
          }
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-lg">Add your own </span>
        <span className="text-sm text-neutral-400">
          Choose an image or GIF from your device.
        </span>
      </div>
    </li>
  );
};
export default ProfileImageUpload;
