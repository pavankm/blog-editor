import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../hooks/useTheme";

interface ToolPaletteProps {
  selectedTool?: string;
  selectedColor?: string;
  strokeWidth?: number;
  onToolChange?: (tool: string) => void;
  onColorChange?: (color: string) => void;
  onStrokeWidthChange?: (width: number) => void;
  compact?: boolean; // New prop for compact horizontal layout
}

// SVG Icon Components based on the HTML file
const PenIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M12 19l7-7 3 3-7 7-3-3z" />
    <Path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
  </Svg>
);

const HighlighterIcon = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M9 11l3 3L22 4" />
    <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </Svg>
);

const EraserIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M20 20H7L3 16l10-10 7 7-4 4" />
    <Path d="M7 20v-5" />
  </Svg>
);

const TOOLS = [
  { id: "pen", name: "Pen", icon: PenIcon },
  { id: "highlighter", name: "Highlighter", icon: HighlighterIcon },
  { id: "eraser", name: "Eraser", icon: EraserIcon },
];
const COLORS = ["#000000", "#7c6fd4", "#ff9b9b", "#98d8c8"]; // Colors: black, pen-blue, pen-red, pen-green
const STROKE_WIDTHS = [1, 2, 4, 6, 8];

const ToolPalette: React.FC<ToolPaletteProps> = ({
  selectedTool = "pen",
  selectedColor = "#000000",
  strokeWidth = 2,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  compact = false,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (compact) {
    // Compact horizontal layout for header with 3 distinct sections
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.compactContainer}
      >
        {/* Section 1: Tools */}
        <View style={styles.paletteSection}>
          {TOOLS.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <TouchableOpacity
                key={tool.id}
                style={[
                  styles.compactToolButton,
                  selectedTool === tool.id && styles.compactToolButtonActive,
                ]}
                onPress={() => onToolChange?.(tool.id)}
              >
                <IconComponent
                  color={
                    selectedTool === tool.id
                      ? theme.colors.textOnPrimary || "#ffffff"
                      : theme.colors.primary || "#7C6FD4"
                  }
                  size={16}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Separator 1 */}
        <View style={styles.sectionSeparator} />

        {/* Section 2: Colors */}
        <View style={styles.paletteSection}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.compactColorButton,
                { backgroundColor: color },
                selectedColor === color && styles.compactColorButtonActive,
              ]}
              onPress={() => onColorChange?.(color)}
            />
          ))}
        </View>

        {/* Separator 2 */}
        <View style={styles.sectionSeparator} />

        {/* Section 3: Stroke Width Slider */}
        <View style={styles.paletteSection}>
          <Slider
            style={styles.thicknessSlider}
            minimumValue={1}
            maximumValue={10}
            value={strokeWidth || 2}
            onValueChange={onStrokeWidthChange}
            step={1}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
        </View>
      </ScrollView>
    );
  }

  // Original vertical layout
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tools</Text>
      <View style={styles.toolsRow}>
        {TOOLS.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <TouchableOpacity
              key={tool.id}
              style={[
                styles.toolButton,
                selectedTool === tool.id && styles.toolButtonActive,
              ]}
              onPress={() => onToolChange?.(tool.id)}
            >
              <IconComponent
                color={
                  selectedTool === tool.id
                    ? theme.colors.textOnPrimary || "#ffffff"
                    : theme.colors.primary || "#7C6FD4"
                }
                size={16}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Colors</Text>
      <View style={styles.colorsRow}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.colorButtonActive,
            ]}
            onPress={() => onColorChange?.(color)}
          />
        ))}
      </View>

      <Text style={styles.label}>Stroke Width: {strokeWidth}px</Text>
      <View style={styles.strokeRow}>
        {STROKE_WIDTHS.map((width) => (
          <TouchableOpacity
            key={width}
            style={[
              styles.strokeButton,
              strokeWidth === width && styles.strokeButtonActive,
            ]}
            onPress={() => onStrokeWidthChange?.(width)}
          >
            <Text style={styles.strokeText}>{width}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    // Original styles
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: theme.spacing.sm,
      gap: theme.spacing.sm,
      maxHeight: 200,
    },
    label: {
      ...theme.typography.labelSmall,
      color: theme.colors.primary,
      textTransform: "uppercase",
    },
    toolsRow: {
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    toolButton: {
      width: 40,
      height: 40,
      padding: theme.spacing.xs,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 20, // Make circular (40/2)
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    toolButtonActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.successLight,
    },
    toolText: {
      fontSize: 16,
    },
    colorsRow: {
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    colorButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    colorButtonActive: {
      borderColor: theme.colors.primary,
      borderWidth: 3,
    },
    strokeRow: {
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
    strokeButton: {
      width: 40,
      height: 40,
      padding: theme.spacing.xs,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 20, // Make circular (40/2)
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    strokeButtonActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.successLight,
    },
    strokeText: {
      ...theme.typography.labelSmall,
      color: theme.colors.primary,
    },

    // Compact horizontal styles
    compactContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.xs,
      gap: theme.layout.compactSpacing,
    },
    paletteSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.layout.compactSpacing,
    },
    sectionSeparator: {
      width: 1,
      height: 24,
      backgroundColor: theme.colors.border,
      opacity: 0.5,
      marginHorizontal: theme.spacing.xs,
    },
    compactToolButton: {
      width: 40,
      height: 40,
      borderRadius: 20, // Make circular (40/2)
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: "rgba(124, 111, 212, 0.1)", // More visible border like HTML
    },
    compactToolButtonActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    compactToolText: {
      fontSize: 14,
    },
    compactColorButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: "rgba(124, 111, 212, 0.2)", // More visible border like HTML
    },
    compactColorButtonActive: {
      borderColor: theme.colors.primary,
      borderWidth: 3, // Thicker border when active like HTML
    },
    compactStrokeButton: {
      width: 28,
      height: 28,
      borderRadius: 14, // Make circular (28/2)
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: "rgba(124, 111, 212, 0.1)", // More visible border like HTML
    },
    compactStrokeButtonActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.successLight,
    },
    compactStrokeText: {
      ...theme.typography.labelSmall,
      color: theme.colors.primary,
      fontSize: 10,
    },
    thicknessSlider: {
      width: 100,
      height: 20, // Slider needs some height for touch target
    },
  });

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    gap: 12,
    maxHeight: 200,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C6FD4",
    textTransform: "uppercase",
  },
  toolsRow: {
    flexDirection: "row",
    gap: 8,
  },
  toolButton: {
    flex: 1,
    padding: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  toolButtonActive: {
    borderColor: "#7C6FD4",
    backgroundColor: "#F5E6FF",
  },
  toolText: {
    fontSize: 16,
  },
  colorsRow: {
    flexDirection: "row",
    gap: 8,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  colorButtonActive: {
    borderColor: "#7C6FD4",
    borderWidth: 3,
  },
  strokeRow: {
    flexDirection: "row",
    gap: 8,
  },
  strokeButton: {
    flex: 1,
    padding: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  strokeButtonActive: {
    borderColor: "#7C6FD4",
    backgroundColor: "#F5E6FF",
  },
  strokeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C6FD4",
  },
});

export default ToolPalette;
