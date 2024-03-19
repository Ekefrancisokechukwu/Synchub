import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

type Props = {
  chooseAvailableImg: (imgUrl: string) => void;
};

const StacksIcons = ({ chooseAvailableImg }: Props) => {
  return (
    <ScrollArea className="h-[18rem]">
      <div className="p-3 bg-white grid grid-cols-6 gap-2  items-center">
        {stacks.map((url) => {
          return (
            <button
              key={url}
              onClick={() => chooseAvailableImg(url)}
              className="p-2 cursor-pointer grid place-items-center border transition-all duration-300 rounded-lg hover:ring-1 ring-gray-400"
            >
              <Image alt="stacks icon" src={url} width={40} height={40} />
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

const stacks = [
  "/img/figma.png",
  "/img/illustrator.png",
  "/img/vue.png",
  "/img/sketch.png",
  "/img/photoshop.png",
  "/img/node.png",
  "/img/react.png",
  "/img/js.png",
  "/img/angular.png",
  "/img/css.png",
  "/img/html.png",
  "/img/github.png",
  "/img/tailwind.png",
  "/img/npm.png",
];

export default StacksIcons;
