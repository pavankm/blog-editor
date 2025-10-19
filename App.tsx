import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "./src/store/SettingsContext";
import { PostProvider } from "./src/store/PostContext";
import AppNavigator from "./src/components/navigation/AppNavigator";

/**
 * App Component
 *
 * Root component that wraps the entire application with:
 * - SafeAreaProvider (for safe area context)
 * - SettingsProvider (for settings state management)
 * - PostProvider (for post state management)
 * - AppNavigator (for React Navigation screen management)
 *
 * Dependencies:
 * - React Navigation with bottom tabs
 * - SafeAreaContext
 * - Context API for state management
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <PostProvider>
          <AppNavigator />
        </PostProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
