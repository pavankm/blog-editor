import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface PageIndicatorProps {
  currentPage?: number;
  totalPages?: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentPage = 1,
  totalPages = 1,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.text}>
          Page {currentPage} of {totalPages}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 5,
  },
  badge: {
    backgroundColor: "#7C6FD4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#7C6FD4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default PageIndicator;
