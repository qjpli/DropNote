import { LucideIcon, icons } from "lucide-react-native";

export const loadIcon = (iconName: string): LucideIcon | null => {
  const IconComponent = icons[iconName as keyof typeof icons];

  if (!IconComponent) {
    console.error(`Failed to load icon: ${iconName}`);
    return null;
  }

  return IconComponent;
};