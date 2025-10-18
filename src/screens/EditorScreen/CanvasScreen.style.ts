import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../components/navigation/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  canvasArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    alignItems: "center",
  },
  placeholderIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export const getDynamicStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors;
  return StyleSheet.create({
    screen: {
      backgroundColor: isDark ? "#1A1B2E" : "#FAF7FF",
    },
    topBar: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    statusDot: {
      backgroundColor: colors.secondary,
    },
    screenTitle: {
      color: colors.text,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
    },
    primaryButtonText: {
      color: "white",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      color: colors.primary,
    },
    placeholderIconContainer: {
      backgroundColor: isDark
        ? "rgba(155, 140, 232, 0.15)"
        : "rgba(124, 111, 212, 0.1)",
    },
    placeholderText: {
      color: colors.textSecondary,
    },
  });
};
