import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useSettingsStore } from "../../store/SettingsContext";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import TwoColumnLayout from "../../components/common/layouts/TwoColumnLayout";

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

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        onLeftButtonPress={() => {
          // TODO: Navigate back
        }}
        leftButtonIcon="arrow-left"
        title="Settings"
        rightButtons={[]}
      />

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
  });

export default SettingsScreen;
