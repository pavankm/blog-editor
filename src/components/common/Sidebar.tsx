import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  position?: "left" | "right";
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  isVisible,
  onClose,
  position = "left",
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
      )}

      {/* Sidebar Panel */}
      <Animated.View
        style={[
          styles.sidebar,
          position === "left" ? styles.sidebarLeft : styles.sidebarRight,
          isVisible ? styles.sidebarVisible : styles.sidebarHidden,
        ]}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Sidebar Content */}
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    width: 300,
    height: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 11,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    paddingTop: 16,
  },
  sidebarLeft: {
    left: 0,
  },
  sidebarRight: {
    right: 0,
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: "#E0E0E0",
  },
  sidebarVisible: {
    opacity: 1,
  },
  sidebarHidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  closeButton: {
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#7C6FD4",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Sidebar;
