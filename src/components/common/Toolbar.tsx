import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface ToolbarButton {
  icon: string;
  onPress: () => void;
  label: string;
}

interface ToolbarProps {
  onLeftButtonPress?: () => void;
  leftButtonIcon?: string;
  centerContent?: React.ReactNode;
  rightButtons?: ToolbarButton[];
  title?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onLeftButtonPress,
  leftButtonIcon,
  centerContent,
  rightButtons = [],
  title,
}) => {
  return (
    <View style={styles.container}>
      {/* Center Content or Title */}
      <View style={styles.centerContent}>
        {centerContent ? (
          centerContent
        ) : (
          <Text style={styles.title}>{title || "Toolbar"}</Text>
        )}
      </View>

      {/* Right Buttons */}
      <View style={styles.rightButtons}>
        {rightButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  button: {
    padding: 8,
    minWidth: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#7C6FD4",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7C6FD4",
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
});

export default Toolbar;
