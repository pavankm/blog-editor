import React from "react";
import { View, StyleSheet } from "react-native";

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  leftColumnWidth?: number;
}

/**
 * TwoColumnLayout Component
 *
 * Displays two columns side-by-side, useful for settings or split views.
 * Left column typically contains navigation/menu items.
 * Right column contains the main content.
 */
const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  leftColumnWidth = 240,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={[styles.column, { width: leftColumnWidth }]}>
        {leftColumn}
      </View>

      {/* Right Column */}
      <View style={[styles.column, styles.rightColumn]}>{rightColumn}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  rightColumn: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
});

export default TwoColumnLayout;
