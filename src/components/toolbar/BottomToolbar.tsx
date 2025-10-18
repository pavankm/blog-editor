import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Edit3 } from "lucide-react-native";
import { BottomToolbarProps, BrushSize } from "./types";
import { styles, getDynamicStyles } from "./BottomToolbar.style";

const brushSizes: { size: BrushSize; dotSize: number }[] = [
  { size: "small", dotSize: 4 },
  { size: "medium", dotSize: 8 },
  { size: "large", dotSize: 12 },
];

const BottomToolbar: React.FC<BottomToolbarProps> = ({
  selectedBrushSize,
  onBrushSizeChange,
  onClear,
  onToolSelect,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <View style={styles.toolbarContainer}>
      <View style={[styles.toolbarContent, dynamicStyles.toolbarContent]}>
        <View style={styles.toolbarLeft}>
          <TouchableOpacity
            style={[styles.toolButton, dynamicStyles.toolButton]}
            onPress={() => onToolSelect("pen")}
          >
            <Edit3 size={24} color={isDark ? "#B8B5FF" : "#5A4FCF"} />
          </TouchableOpacity>
          <View style={[styles.divider, dynamicStyles.divider]} />
          <View style={styles.brushOptions}>
            <Text style={[styles.brushLabel, dynamicStyles.brushLabel]}>
              Brush
            </Text>
            <View style={styles.brushSizes}>
              {brushSizes.map(({ size, dotSize }) => {
                const isSelected = selectedBrushSize === size;
                return (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.brushSizeButton,
                      dynamicStyles.brushSizeButton,
                      isSelected && dynamicStyles.selectedBrushButton,
                    ]}
                    onPress={() => onBrushSizeChange(size)}
                  >
                    <View
                      style={[
                        styles.brushDot,
                        { width: dotSize, height: dotSize },
                        isSelected
                          ? dynamicStyles.selectedBrushDot
                          : dynamicStyles.brushDot,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.clearButton, dynamicStyles.clearButton]}
          onPress={onClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomToolbar;
