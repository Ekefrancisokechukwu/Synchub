import { ScrollArea } from "@/components/ui/scroll-area";
import { availableThumbnailIcons } from "@/lib/data";
import Image from "next/image";

type Props = {
  chooseAvailableImg: (imgUrl: string) => void;
};

const AvaliableLinkThumbnail = ({ chooseAvailableImg }: Props) => {
  return (
    <ScrollArea className="h-[18rem]">
      <div className="p-3 bg-white grid grid-cols-6 gap-2  items-center">
        {availableThumbnailIcons.map((url) => {
          return (
            <div
              key={url}
              onClick={() => chooseAvailableImg(url)}
              className="p-2 cursor-pointer grid place-items-center border transition-all duration-300 rounded-lg hover:ring-1 ring-gray-400"
            >
              <Image src={url} alt="img1" width={40} height={40} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
export default AvaliableLinkThumbnail;
