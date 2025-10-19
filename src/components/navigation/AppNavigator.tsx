import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

/**
 * AppNavigator
 *
 * Top-level navigation component that manages screen transitions between:
 * - EditorScreen: Main drawing and editing interface
 * - PostListScreen: Browse and manage blog posts
 * - SettingsScreen: Application configuration and preferences
 *
 * This navigator handles:
 * - Screen state management (which screen is active)
 * - Screen transitions/routing
 * - Props passing to active screen
 */

export type ScreenName = "editor" | "postList" | "settings";

interface AppNavigatorProps {
  // Screen components to render
  EditorScreen: React.ComponentType<any>;
  PostListScreen: React.ComponentType<any>;
  SettingsScreen: React.ComponentType<any>;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  EditorScreen,
  PostListScreen,
  SettingsScreen,
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>("postList");

  const styles = createStyles();

  const navigateTo = (screen: ScreenName) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "editor":
        return <EditorScreen onNavigate={navigateTo} navigateTo={navigateTo} />;
      case "postList":
        return (
          <PostListScreen onNavigate={navigateTo} navigateTo={navigateTo} />
        );
      case "settings":
        return (
          <SettingsScreen onNavigate={navigateTo} navigateTo={navigateTo} />
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });
};

export default AppNavigator;
