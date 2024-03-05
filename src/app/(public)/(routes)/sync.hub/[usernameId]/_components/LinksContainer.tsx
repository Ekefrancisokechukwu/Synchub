import LinkItem from "./LinkItem";

type Props = {
  links: LinksProps[];
};

const LinksContainer = ({ links }: Props) => {
  return (
    <div className="mt-7 flex flex-col gap-y-5">
      {links
        .filter((i) => i.visible)
        .map((link) => {
          return <LinkItem key={link.id} link={link} />;
        })}
    </div>
  );
};
export default LinksContainer;
