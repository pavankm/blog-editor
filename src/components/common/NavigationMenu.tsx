import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface NavigationMenuProps {
  onNavigate?: (screen: string) => void;
}

/**
 * NavigationMenu Component
 *
 * Common dropdown menu that appears when the 3-dot button is pressed.
 * Contains navigation items that were previously in the bottom navigation.
 */
const NavigationMenu: React.FC<NavigationMenuProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isVisible, setIsVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "posts",
      title: "All Posts",
      icon: "📝",
      onPress: () => {
        setIsVisible(false);
        onNavigate?.("posts");
      },
    },
    {
      id: "editor",
      title: "Editor",
      icon: "✏️",
      onPress: () => {
        setIsVisible(false);
        onNavigate?.("editor");
      },
    },
    {
      id: "settings",
      title: "Settings",
      icon: "⚙️",
      onPress: () => {
        setIsVisible(false);
        onNavigate?.("settings");
      },
    },
    {
      id: "publish",
      title: "Publish",
      icon: "🚀",
      onPress: () => {
        setIsVisible(false);
        onNavigate?.("publish");
      },
    },
  ];

  const MenuButton = () => (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => setIsVisible(true)}
    >
      <Text style={styles.menuIcon}>⋮</Text>
    </TouchableOpacity>
  );

  const MenuModal = () => (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <Text style={styles.menuItemIcon}>{item.icon}</Text>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <>
      <MenuButton />
      <MenuModal />
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    menuButton: {
      padding: theme.spacing.sm,
      marginLeft: theme.spacing.md,
    },
    menuIcon: {
      fontSize: 18,
      color: theme.colors.text,
      transform: [{ rotate: "90deg" }],
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      paddingTop: 80, // Account for header height
      paddingRight: theme.spacing.lg,
    },
    menuContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingVertical: theme.spacing.sm,
      minWidth: 180,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadow.md,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    menuItemIcon: {
      fontSize: 16,
      marginRight: theme.spacing.md,
    },
    menuItemText: {
      ...theme.typography.bodyLarge,
      color: theme.colors.text,
    },
  });

export default NavigationMenu;
