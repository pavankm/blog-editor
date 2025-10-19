import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { EditorScreen } from "../../screens/EditorScreen/EditorScreen";
import PostListScreen from "../../screens/PostListScreen/PostListScreen";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";

/**
 * AppNavigator
 *
 * Top-level navigation component using React Navigation that manages screen transitions between:
 * - EditorScreen: Main drawing and editing interface
 * - PostListScreen: Browse and manage blog posts
 * - SettingsScreen: Application configuration and preferences
 *
 * Uses React Navigation's bottom tab navigator for screen management.
 * Screens can navigate using the useNavigation hook.
 */

export type RootStackParamList = {
  Editor: undefined;
  PostList: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Feather>["name"] = "home";

            if (route.name === "PostList") {
              iconName = focused ? "list" : "list";
            } else if (route.name === "Editor") {
              iconName = focused ? "edit-3" : "edit-3";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings";
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#e0e0e0",
          },
        })}
      >
        <Tab.Screen
          name="PostList"
          component={PostListScreen}
          options={{
            title: "Posts",
          }}
        />
        <Tab.Screen
          name="Editor"
          component={EditorScreen}
          options={{
            title: "Editor",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
