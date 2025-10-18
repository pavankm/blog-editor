import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Screen, ScreenSelectorProps } from "./types";
import { styles, getDynamicStyles } from "./ScreenSelector.style";

const screens: { id: Screen; label: string }[] = [
  { id: "canvas", label: "書く" },
  { id: "preview", label: "Preview" },
  { id: "posts", label: "Posts" },
  { id: "settings", label: "Settings" },
];

const ScreenSelector: React.FC<ScreenSelectorProps> = ({
  currentScreen,
  onScreenSelect,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.content, dynamicStyles.content]}>
        {screens.map((screen) => {
          const isActive = currentScreen === screen.id;
          return (
            <TouchableOpacity
              key={screen.id}
              onPress={() => onScreenSelect(screen.id)}
              style={[styles.button, isActive && dynamicStyles.activeButton]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.buttonText,
                  dynamicStyles.buttonText,
                  isActive && styles.activeButtonText,
                  isActive && dynamicStyles.activeButtonText,
                ]}
              >
                {screen.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ScreenSelector;
