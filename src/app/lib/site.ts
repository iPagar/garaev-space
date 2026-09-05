export const siteConfig = {
  name: "Pavel Garaev",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pavelgaraev.com").replace(
    /\/$/,
    "",
  ),
  description:
    "Design and engineering consultancy for research, media, and expert-led organizations.",
} as const;

export const socialProfiles = {
  telegram: { href: "https://t.me/ipagar", label: "Telegram" },
  linkedin: { href: "https://linkedin.com/in/ipagar", label: "LinkedIn" },
} as const;
