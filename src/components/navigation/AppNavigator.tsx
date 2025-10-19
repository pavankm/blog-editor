import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
 * This component provides a stack navigator for proper screen management.
 */

export type RootStackParamList = {
  PostList: undefined;
  Editor: undefined;
  Settings: undefined;
  Publish: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PostList"
        screenOptions={{
          headerShown: false, // Hide default headers since we have custom navigation
        }}
      >
        <Stack.Screen name="PostList" component={PostListScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* Publish screen can be added later */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
