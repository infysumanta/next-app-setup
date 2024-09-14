import { Home, Package, User } from "lucide-react";

export const SIDEBAR_MENU_ITEM = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
    route_group: ["/"],
  },
  {
    icon: User,
    label: "Users",
    href: "/users",
    route_group: ["/users"],
  },
  {
    icon: Package,
    label: "Products",
    href: "/products",
    route_group: ["/products"],
  },
];
