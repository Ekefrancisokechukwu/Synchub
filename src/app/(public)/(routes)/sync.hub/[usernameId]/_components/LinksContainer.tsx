import { ThemeProps } from "@/context/ThemeContext";
import LinkItem from "./LinkItem";

type Props = {
  links: LinksProps[];
  style: ThemeProps;
};

const LinksContainer = ({ links, style }: Props) => {
  return (
    <div className="mt-7 flex flex-col gap-y-7">
      {links
        .filter((i) => i.visible)
        .map((link) => {
          return <LinkItem style={style} key={link.id} link={link} />;
        })}
    </div>
  );
};
export default LinksContainer;
