import { useContext, createContext } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary?: string;
  textOnPrimary?: string;
  border?: string;
  placeholder?: string;
  inputBackground?: string;
  success?: string;
  error?: string;
  warning?: string;
  successLight?: string;
  warningLight?: string;
  errorLight?: string;
}

interface ThemeTypography {
  titleLarge: { fontSize: number; fontWeight: string; lineHeight: number };
  titleMedium: { fontSize: number; fontWeight: string; lineHeight: number };
  bodyLarge: { fontSize: number; fontWeight: string; lineHeight: number };
  bodyMedium: { fontSize: number; fontWeight: string; lineHeight: number };
  bodySmall: { fontSize: number; fontWeight: string; lineHeight: number };
  labelLarge: { fontSize: number; fontWeight: string; letterSpacing: number };
  labelMedium: { fontSize: number; fontWeight: string };
  labelSmall: { fontSize: number; fontWeight: string };
}

interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface ThemeRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
}

interface ThemeShadow {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadow: ThemeShadow;
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
    textOnPrimary: "#ffffff",
    border: "#e2e8f0",
    placeholder: "#94a3b8",
    inputBackground: "#ffffff",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    successLight: "#d4edda",
    warningLight: "#fff3cd",
    errorLight: "#fee2e2",
  },
  typography: {
    titleLarge: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
    titleMedium: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
    bodyLarge: { fontSize: 14, fontWeight: "500", lineHeight: 20 },
    bodyMedium: { fontSize: 13, fontWeight: "400", lineHeight: 18 },
    bodySmall: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
    labelLarge: { fontSize: 11, fontWeight: "600", letterSpacing: 0.5 },
    labelMedium: { fontSize: 12, fontWeight: "600" },
    labelSmall: { fontSize: 11, fontWeight: "500" },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  radius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
  },
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
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
    textOnPrimary: "#ffffff",
    border: "#334155",
    placeholder: "#64748b",
    inputBackground: "#1e293b",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
    successLight: "#064e3b",
    warningLight: "#451a03",
    errorLight: "#7f1d1d",
  },
  typography: {
    titleLarge: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
    titleMedium: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
    bodyLarge: { fontSize: 14, fontWeight: "500", lineHeight: 20 },
    bodyMedium: { fontSize: 13, fontWeight: "400", lineHeight: 18 },
    bodySmall: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
    labelLarge: { fontSize: 11, fontWeight: "600", letterSpacing: 0.5 },
    labelMedium: { fontSize: 12, fontWeight: "600" },
    labelSmall: { fontSize: 11, fontWeight: "500" },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  radius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
  },
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
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
export type {
  Theme,
  ThemeColors,
  ThemeTypography,
  ThemeSpacing,
  ThemeRadius,
  ThemeShadow,
};
