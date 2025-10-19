import { useContext, createContext } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary?: string;
  border?: string;
  placeholder?: string;
  inputBackground?: string;
  success?: string;
  error?: string;
  warning?: string;
}

interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

// Light Theme
const lightTheme: Theme = {
  colors: {
    primary: "#7c3aed",
    secondary: "#ec4899",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    placeholder: "#94a3b8",
    inputBackground: "#ffffff",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  isDark: false,
};

// Dark Theme
const darkTheme: Theme = {
  colors: {
    primary: "#a78bfa",
    secondary: "#f472b6",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    border: "#334155",
    placeholder: "#64748b",
    inputBackground: "#1e293b",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
  },
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * useTheme Hook
 *
 * Provides access to the current theme and theme-switching functionality.
 * Usage: const { theme, isDark, toggleTheme } = useTheme();
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    // Default to light theme if context is not available
    return {
      theme: lightTheme,
      isDark: false,
      toggleTheme: () => {},
    };
  }

  return context;
};

export { lightTheme, darkTheme };
export type { Theme, ThemeColors };
