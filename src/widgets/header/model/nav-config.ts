export interface NavItem {
  key: string;
  labelKey: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: "home", labelKey: "Главная", href: "/" },
  { key: "about", labelKey: "О школе", href: "/about" },
  { key: "course", labelKey: "О курсе", href: "/course" },
  { key: "branches", labelKey: "Филиалы", href: "/contacts" },
  { key: "news", labelKey: "Новости", href: "/news" },
];
