import React from "react";
import { View, StyleSheet } from "react-native";
import AppNavigator from "./src/components/navigation/AppNavigator";
import { EditorScreen } from "./src/screens/EditorScreen/EditorScreen";
import PostListScreen from "./src/screens/PostListScreen/PostListScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";

/**
 * App Component
 *
 * Root component that wraps the entire application with:
 * - ThemeProvider (for theme context) - TODO: implement
 * - AppNavigator (for screen management)
 *
 * Dependencies to implement:
 * - ThemeProvider component
 * - Redux/Zustand store setup
 */
export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator
        EditorScreen={EditorScreen}
        PostListScreen={PostListScreen}
        SettingsScreen={SettingsScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
