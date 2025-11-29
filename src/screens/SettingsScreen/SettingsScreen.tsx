import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";
import { useSettingsStore } from "../../store/SettingsContext";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import TwoColumnLayout from "../../components/common/layouts/TwoColumnLayout";
import NavigationMenu from "../../components/common/NavigationMenu";

// SettingsScreen Specific Components
import SettingsNavigation from "./SettingsNavigation";
import SettingsPanel from "./SettingsPanel";

export type SettingsSectionType =
  | "github"
  | "hugo"
  | "editor"
  | "appearance"
  | "sync"
  | "about";

/**
 * SettingsScreen
 *
 * Application settings and configuration with sections for:
 * - GitHub integration
 * - Hugo configuration
 * - Editor preferences
 * - Appearance (theme, colors)
 * - Sync & backup
 * - App information
 */
export const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  // Zustand store for settings
  const {
    githubToken,
    hugoConfig,
    editorPreferences,
    appearance,
    setGithubToken,
    setHugoConfig,
    setEditorPreferences,
    setAppearance,
  } = useSettingsStore();

  // Local state
  const [activeSection, setActiveSection] =
    useState<SettingsSectionType>("github");

  /**
   * Handle theme toggle (light/dark mode)
   */
  const handleToggleTheme = (isDark: boolean) => {
    setAppearance({
      ...appearance,
      darkMode: isDark,
    });
  };

  /**
   * Handle GitHub settings update
   */
  const handleGithubUpdate = (field: string, value: string) => {
    setGithubToken({
      ...githubToken,
      [field]: value,
    });
  };

  /**
   * Handle Hugo settings update
   */
  const handleHugoUpdate = (field: string, value: string) => {
    setHugoConfig({
      ...hugoConfig,
      [field]: value,
    });
  };

  /**
   * Handle editor preferences update
   */
  const handleEditorUpdate = (field: string, value: any) => {
    setEditorPreferences({
      ...editorPreferences,
      [field]: value,
    });
  };

  /**
   * Test GitHub connection
   */
  const handleTestGithubConnection = () => {
    // TODO: Test connection to GitHub API
    console.log("Testing GitHub connection");
  };
  /**
   * Disconnect GitHub
   */
  const handleDisconnectGithub = () => {
    setGithubToken({
      token: "",
      username: "",
      repository: "",
    });
  };

  /**
   * Handle navigation
   */
  const handleNavigate = (screen: string) => {
    console.log("Navigating to:", screen);

    try {
      switch (screen) {
        case "posts":
          navigation.navigate("PostList" as never);
          break;
        case "editor":
          navigation.navigate("Editor" as never);
          break;
        case "settings":
          // Already on settings screen
          break;
        case "publish":
          alert("Publish functionality coming soon!");
          break;
        default:
          console.warn(`Unknown navigation target: ${screen}`);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      alert(`Navigation to ${screen} not available yet`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        onLeftButtonPress={() => {
          navigation.navigate("PostList" as never);
        }}
        leftButtonIcon="arrow-left"
        title="Settings"
        rightButtons={[]}
      />

      {/* Navigation Menu - positioned absolute in top-right */}
      <View style={styles.navigationMenuContainer}>
        <NavigationMenu onNavigate={handleNavigate} />
      </View>

      {/* Main Content - Two Column Layout */}
      <TwoColumnLayout
        leftColumn={
          <SettingsNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        }
        rightColumn={
          <SettingsPanel
            activeSection={activeSection}
            githubToken={githubToken}
            hugoConfig={hugoConfig}
            editorPreferences={editorPreferences}
            appearance={appearance}
            onGithubUpdate={handleGithubUpdate}
            onHugoUpdate={handleHugoUpdate}
            onEditorUpdate={handleEditorUpdate}
            onToggleTheme={handleToggleTheme}
            onTestGithubConnection={handleTestGithubConnection}
            onDisconnectGithub={handleDisconnectGithub}
          />
        }
        leftColumnWidth={240}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    navigationMenuContainer: {
      position: "absolute",
      top: theme.spacing.sm,
      right: theme.spacing.sm,
      zIndex: 10,
    },
  });

export default SettingsScreen;
