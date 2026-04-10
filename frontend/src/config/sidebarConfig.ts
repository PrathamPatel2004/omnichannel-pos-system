import { Home, Users, Box, ShoppingCart, Settings, Layers } from "lucide-react";

export const sidebarConfig = {
  admin: [
    { name: "Dashboard", icon: Home },
    { name: "Users", icon: Users },
    { name: "Products", icon: Box },
    { name: "Orders", icon: ShoppingCart },
    { name: "Inventory", icon: Layers },
    { name: "Settings", icon: Settings },
  ],
  manager: [
    { name: "Dashboard", icon: Home },
    { name: "Products", icon: Box },
    { name: "Orders", icon: ShoppingCart },
    { name: "Inventory", icon: Layers },
  ],
  cashier: [
    { name: "POS", icon: ShoppingCart },
    { name: "Orders", icon: Box },
  ],
};