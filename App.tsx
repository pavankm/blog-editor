import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/components/navigation/AppNavigator";

/**
 * App Component
 *
 * Root component that wraps the entire application with:
 * - SafeAreaProvider (for safe area context)
 * - AppNavigator (for React Navigation screen management)
 *
 * Dependencies:
 * - React Navigation with bottom tabs
 * - SafeAreaContext
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
