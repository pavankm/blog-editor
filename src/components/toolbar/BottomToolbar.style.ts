import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../navigation/colors";

export const styles = StyleSheet.create({
  toolbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  toolbarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 32,
    padding: 12,
    borderWidth: 1,
  },
  toolbarLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  toolButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
  },
  divider: {
    width: 1,
    height: "60%",
    marginHorizontal: 8,
  },
  brushOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  brushLabel: {
    fontSize: 16,
    marginRight: 16,
  },
  brushSizes: {
    flexDirection: "row",
    alignItems: "center",
  },
  brushSizeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
  },
  brushDot: {
    borderRadius: 50,
  },
  clearButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export const getDynamicStyles = (isDark: boolean) => {
  const colors = isDark ? darkColors : lightColors;
  return StyleSheet.create({
    toolbarContent: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    toolButton: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    divider: {
      backgroundColor: colors.border,
    },
    brushLabel: {
      color: colors.text,
    },
    brushSizeButton: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    selectedBrushButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    brushDot: {
      backgroundColor: colors.text,
    },
    selectedBrushDot: {
      backgroundColor: "white",
    },
    clearButton: {
      backgroundColor: colors.secondary,
    },
    clearButtonText: {
      color: "white",
    },
  });
};
