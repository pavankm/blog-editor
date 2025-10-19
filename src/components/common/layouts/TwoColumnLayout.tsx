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

      {/* Divider */}
      <View style={styles.divider} />

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
    flex: 0,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  rightColumn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  divider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
});

export default TwoColumnLayout;
