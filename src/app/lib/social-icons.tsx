import {
  FaLinkedinIn as LinkedInIcon,
  FaTelegramPlane as TelegramIcon,
} from "react-icons/fa";
import { socialProfiles } from "./site";

export { LinkedInIcon };

export const socialLinks = [
  { ...socialProfiles.telegram, icon: TelegramIcon },
  { ...socialProfiles.linkedin, icon: LinkedInIcon },
];
