import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../components/navigation/colors";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 32,
    margin: 24,
    borderWidth: 1,
    shadowColor: "#7C6FD4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
});

export const getDynamicStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors;
  return StyleSheet.create({
    page: {
      backgroundColor: isDark ? "#2A2D4A" : "#FAFAFA",
      borderColor: colors.border,
      shadowColor: isDark ? "#9B8CE8" : "#7C6FD4",
    },
  });
};
