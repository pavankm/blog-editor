import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { SettingsSectionType } from "./SettingsScreen";

interface SettingsNavigationProps {
  activeSection: SettingsSectionType;
  onSectionChange: (section: SettingsSectionType) => void;
}

const SETTINGS_SECTIONS: Array<{
  id: SettingsSectionType;
  label: string;
  icon: string;
}> = [
  { id: "github", label: "GitHub", icon: "🔗" },
  { id: "hugo", label: "Hugo", icon: "⚙️" },
  { id: "editor", label: "Editor", icon: "✏️" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
  { id: "sync", label: "Sync & Backup", icon: "💾" },
  { id: "about", label: "About", icon: "ℹ️" },
];

/**
 * SettingsNavigation Component
 *
 * Left-side navigation menu for settings sections.
 * Shows all available settings categories and highlights the active one.
 */
const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.divider} />
      {SETTINGS_SECTIONS.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.navItem,
            activeSection === section.id && styles.navItemActive,
          ]}
          onPress={() => onSectionChange(section.id)}
        >
          <Text style={styles.navItemIcon}>{section.icon}</Text>
          <Text
            style={[
              styles.navItemText,
              activeSection === section.id && styles.navItemTextActive,
            ]}
          >
            {section.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      paddingVertical: 8,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
      paddingHorizontal: 12,
      paddingVertical: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border || "#e0e0e0",
      marginVertical: 8,
    },
    navItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginVertical: 4,
      borderRadius: 6,
      backgroundColor: "transparent",
    },
    navItemActive: {
      backgroundColor: theme.colors.primary + "20",
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      paddingLeft: 9,
    },
    navItemIcon: {
      fontSize: 18,
      marginRight: 12,
    },
    navItemText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    navItemTextActive: {
      fontWeight: "600",
      color: theme.colors.primary,
    },
  });

export default SettingsNavigation;
