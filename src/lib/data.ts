import * as SlIcons from "react-icons/sl";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa6";
import * as FiIoncs from "react-icons/fi";
import * as PiIcons from "react-icons/pi";
import { IconType } from "react-icons/lib";
import { IconProps } from "@/components/modals/IconHandle";

export const IconsReact = {
  ...BsIcons,
  ...FaIcons,
  ...FiIoncs,
  ...PiIcons,
  ...SlIcons,
};

export const SocialIcons: IconProps[] = [
  {
    icon: "SlSocialFacebook",
    name: "facebook",
    added: false,
  },
  {
    icon: "BsTwitterX",
    name: "Twitter X",
    added: false,
  },
  {
    icon: "FaSnapchat",
    name: "Snapchat",
    added: false,
  },
  {
    icon: "FaInstagram",
    name: "Instagram",
    added: false,
  },
  {
    icon: "FiYoutube",
    added: false,
    name: "youtube",
  },
  {
    icon: "PiTiktokLogoLight",
    name: "tiktok",
    added: false,
  },
  {
    icon: "FaWhatsapp",
    name: "whatsapp",
    added: false,
  },
  {
    icon: "FaGithub",
    name: "github",
    added: false,
  },
  {
    icon: "FaAmazon",
    name: "amazone",
    added: false,
  },
  {
    icon: "FiLinkedin",
    name: "Linkedin",
    added: false,
  },
  {
    icon: "FaTwitch",
    name: "Twitch",
    added: false,
  },
  {
    icon: "SlSocialBehance",
    name: "Behance",
    added: false,
  },
];
