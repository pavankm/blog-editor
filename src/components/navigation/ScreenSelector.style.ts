import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 32,
    borderWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
  },
  activeButtonText: {
    fontWeight: "600",
  },
});

export const getDynamicStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    content: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    buttonText: {
      color: colors.inactiveText,
    },
    activeButton: {
      backgroundColor: colors.activeBackground,
    },
    activeButtonText: {
      color: colors.primary,
    },
  });
};
