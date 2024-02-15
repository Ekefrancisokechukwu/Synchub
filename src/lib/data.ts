import { SlSocialFacebook, SlSocialBehance } from "react-icons/sl";

import { BsTwitterX } from "react-icons/bs";
import {
  FaSnapchat,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
  FaAmazon,
  FaTwitch,
} from "react-icons/fa6";
import { FiYoutube, FiLinkedin } from "react-icons/fi";

import { PiTiktokLogoLight } from "react-icons/pi";
import { IconProps } from "@/components/modals/IconHandle";

export const SocialIcons: IconProps[] = [
  {
    icon: SlSocialFacebook,
    name: "facebook",
    featured: false,
  },
  {
    icon: BsTwitterX,
    name: "Twitter X",
    featured: true,
  },
  {
    icon: FaSnapchat,
    name: "Snapchat",
    featured: false,
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    featured: false,
  },
  {
    icon: FiYoutube,
    featured: false,
    name: "youtube",
  },
  {
    icon: PiTiktokLogoLight,
    name: "tiktok",
    featured: false,
  },
  {
    icon: FaWhatsapp,
    name: "whatsapp",
    featured: false,
  },
  {
    icon: FaGithub,
    name: "github",
    featured: true,
  },
  {
    icon: FaAmazon,
    name: "amazone",
    featured: false,
  },
  {
    icon: FiLinkedin,
    name: "Linkedin",
    featured: false,
  },
  {
    icon: FaTwitch,
    name: "Twitch",
    featured: false,
  },
  {
    icon: SlSocialBehance,
    name: "Behance",
    featured: false,
  },
];
