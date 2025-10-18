import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../components/navigation/colors";

export const styles = StyleSheet.create({
  pageControlContainer: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    padding: 12,
    borderWidth: 1,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const getDynamicStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors;
  return StyleSheet.create({
    pageControlContainer: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    pageInfo: {
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
    },
  });
};
