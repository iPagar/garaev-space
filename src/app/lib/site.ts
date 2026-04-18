import type { ComponentType, SVGProps } from "react";
import { LinkedInIcon, TelegramIcon } from "./social-icons";

type SocialLink = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://t.me/ipagar",
    label: "Telegram",
    icon: TelegramIcon,
  },
  {
    href: "https://linkedin.com/in/ipagar",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
];

export const ownMobileProjects = [
  "https://apps.apple.com/us/app/supplement-scanner-supplens/id6756219517",
  "https://apps.apple.com/app/6758587114",
];

export const ownWebsiteProjects: string[] = ["https://limemenu.org"];

export const clientProjects: string[] = [];
