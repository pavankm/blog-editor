import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { EditorScreen } from "../../screens/EditorScreen/EditorScreen";
import PostListScreen from "../../screens/PostListScreen/PostListScreen";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";

/**
 * AppNavigator
 *
 * Top-level navigation component that manages screen transitions between:
 * - PostListScreen: Browse and manage blog posts (default screen)
 * - EditorScreen: Main drawing and editing interface
 * - SettingsScreen: Application configuration and preferences
 *
 * Navigation is now handled through the NavigationMenu component in each screen's header.
 * This component provides a simple container for the default screen (PostListScreen).
 */

export type RootStackParamList = {
  PostList: undefined;
  Editor: undefined;
  Settings: undefined;
  Publish: undefined;
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      {/* For now, we'll directly render PostListScreen as the main screen */}
      {/* Navigation is handled through the NavigationMenu dropdown in the header */}
      <EditorScreen />
    </NavigationContainer>
  );
};

export default AppNavigator;
