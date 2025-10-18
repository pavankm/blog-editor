import { StyleSheet } from "react-native";

export type Screen = "canvas" | "preview" | "posts" | "settings";

export interface ScreenSelectorProps {
  currentScreen: Screen;
  onScreenSelect: (screen: Screen) => void;
}
