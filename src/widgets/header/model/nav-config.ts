export interface NavItem {
  key: string;
  labelKey: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: "home", labelKey: "about", href: "/" },
  { key: "about", labelKey: "shkole", href: "/about" },
  { key: "course", labelKey: "course", href: "/course" },
  { key: "branches", labelKey: "filial", href: "/contacts" },
  { key: "news", labelKey: "news", href: "/news" },
];
