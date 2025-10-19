import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface DrawingCanvasProps {
  currentPost?: any;
  layers?: any[];
  activeLayerId?: string;
  selectedTool?: string;
  selectedColor?: string;
  strokeWidth?: number;
  onPageChange?: (pageIndex: number) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  currentPost,
  layers,
  activeLayerId,
  selectedTool,
  selectedColor,
  strokeWidth,
  onPageChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>🎨</Text>
        <Text style={styles.title}>Drawing Canvas</Text>
        <Text style={styles.subtitle}>Placeholder Component</Text>
        <Text style={styles.info}>
          Tool: {selectedTool || "pen"} | Color: {selectedColor || "#000"} |
          Width: {strokeWidth || 2}px
        </Text>
        <Text style={styles.info}>Layers: {layers?.length || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  placeholderText: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7C6FD4",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  info: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
});

export default DrawingCanvas;
