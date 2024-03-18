import { Doc } from "../../../../../convex/_generated/dataModel";
import PreviewBtn from "./PreviewBtn";

type Props = {
  links: LinksProps[];
};

const MobileLinksContainer = ({ links }: Props) => {
  return (
    <div className="flex items-center flex-col gap-y-5 mt-4 pb-6">
      {links
        .filter((i) => i.visible)
        .map((link) => {
          return <PreviewBtn link={link} key={link.id} />;
        })}
    </div>
  );
};
export default MobileLinksContainer;
