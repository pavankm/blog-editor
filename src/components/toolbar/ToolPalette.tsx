import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

interface ToolPaletteProps {
  selectedTool?: string;
  selectedColor?: string;
  strokeWidth?: number;
  onToolChange?: (tool: string) => void;
  onColorChange?: (color: string) => void;
  onStrokeWidthChange?: (width: number) => void;
}

const TOOLS = ["pen", "highlighter", "eraser"];
const COLORS = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
const STROKE_WIDTHS = [1, 2, 4, 6, 8];

const ToolPalette: React.FC<ToolPaletteProps> = ({
  selectedTool = "pen",
  selectedColor = "#000000",
  strokeWidth = 2,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tools</Text>
      <View style={styles.toolsRow}>
        {TOOLS.map((tool) => (
          <TouchableOpacity
            key={tool}
            style={[
              styles.toolButton,
              selectedTool === tool && styles.toolButtonActive,
            ]}
            onPress={() => onToolChange?.(tool)}
          >
            <Text style={styles.toolText}>
              {tool === "pen" ? "✏️" : tool === "highlighter" ? "🖍️" : "🗑️"}
            </Text>
          </TouchableOpacity>
        ))}
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
