import { Doc } from "../../../../../convex/_generated/dataModel";
import PreviewBtn from "./PreviewBtn";

type Props = {
  links: LinksProps[];
};

const MobileLinksContainer = ({ links }: Props) => {
  return (
    <div className="flex flex-col gap-y-5 mt-4">
      {links
        .filter((i) => i.visible)
        .map((link) => {
          return <PreviewBtn link={link} key={link.id} />;
        })}
    </div>
  );
};
export default MobileLinksContainer;
