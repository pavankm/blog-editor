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
  // Additional dreamy pastels colors
  accent?: string; // Mint Green
  skyBlue?: string; // Sky Blue
  softYellow?: string; // Soft Yellow
  plum?: string; // Plum
  surfaceHover?: string; // Hover state for surfaces
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

interface ThemeLayout {
  toolbarHeight: number;
  compactSpacing: number;
  minTouchTarget: number;
  sliderTrackHeight: number;
  sliderThumbSize: number;
}

interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadow: ThemeShadow;
  layout: ThemeLayout;
  isDark: boolean;
}

// Light Theme
const lightTheme: Theme = {
  colors: {
    primary: "#7C6FD4", // Soft Purple
    secondary: "#FF9B9B", // Coral Pink
    background: "#FAF7FF", // Light gradient start
    surface: "rgba(255, 255, 255, 0.9)", // Glass morphism surface
    text: "#5A4FCF", // Primary text color
    textSecondary: "rgba(90, 79, 207, 0.7)", // Secondary text
    textOnPrimary: "#ffffff",
    border: "rgba(255, 255, 255, 0.3)", // Glass morphism border
    placeholder: "rgba(90, 79, 207, 0.5)",
    inputBackground: "rgba(255, 255, 255, 0.9)",
    success: "#98D8C8", // Mint Green
    error: "#FF9B9B", // Coral Pink (used for errors too)
    warning: "#F7DC6F", // Soft Yellow
    successLight: "#98D8C8", // Mint Green light
    warningLight: "#F7DC6F", // Soft Yellow light
    errorLight: "#FFB3B3", // Lightened Coral Pink
    // Additional dreamy pastels colors
    accent: "#98D8C8", // Mint Green
    skyBlue: "#87CEEB", // Sky Blue
    softYellow: "#F7DC6F", // Soft Yellow
    plum: "#DDA0DD", // Plum
    surfaceHover: "rgba(255, 255, 255, 0.95)", // Hover state
  },
  typography: {
    titleLarge: { fontSize: 32, fontWeight: "600", lineHeight: 40 }, // largeTitle from guide
    titleMedium: { fontSize: 24, fontWeight: "600", lineHeight: 32 }, // title from guide
    bodyLarge: { fontSize: 16, fontWeight: "400", lineHeight: 24 }, // body from guide
    bodyMedium: { fontSize: 14, fontWeight: "400", lineHeight: 20 }, // caption from guide
    bodySmall: { fontSize: 12, fontWeight: "400", lineHeight: 16 }, // small from guide
    labelLarge: { fontSize: 20, fontWeight: "500", letterSpacing: 0.5 }, // headline from guide
    labelMedium: { fontSize: 14, fontWeight: "400" }, // caption from guide
    labelSmall: { fontSize: 12, fontWeight: "400" }, // small from guide
  },
  spacing: {
    xs: 8, // 0.5rem (8px)
    sm: 16, // 1rem (16px)
    md: 24, // 1.5rem (24px)
    lg: 32, // 2rem (32px)
    xl: 48, // 3rem (48px)
    xxl: 64, // 4rem (64px)
  },
  radius: {
    xs: 8, // Small elements: 0.5rem (8px)
    sm: 16, // Small-medium: 1rem (16px)
    md: 24, // Medium elements: 1.5rem (24px)
    lg: 32, // Large containers: 2rem (32px)
    xl: 48, // Extra large: 3rem (48px)
    pill: 999, // Circular elements: 50% equivalent
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
  layout: {
    toolbarHeight: 56,
    compactSpacing: 4,
    minTouchTarget: 32,
    sliderTrackHeight: 4,
    sliderThumbSize: 16,
  },
  isDark: false,
};

// Dark Theme
const darkTheme: Theme = {
  colors: {
    primary: "#9B8CE8", // Brightened Soft Purple
    secondary: "#FFB3B3", // Brightened Coral Pink
    background: "#1A1B2E", // Dark gradient start
    surface: "rgba(30, 32, 52, 0.6)", // Dark glass morphism surface
    text: "#B8B5FF", // Brightened text
    textSecondary: "rgba(184, 181, 255, 0.7)", // Secondary text
    textOnPrimary: "#ffffff",
    border: "rgba(184, 181, 255, 0.1)", // Dark glass morphism border
    placeholder: "rgba(184, 181, 255, 0.5)",
    inputBackground: "rgba(30, 32, 52, 0.6)",
    success: "#A8E6D7", // Brightened Mint Green
    error: "#FFB3B3", // Brightened Coral Pink
    warning: "#F9E79F", // Brightened Soft Yellow
    successLight: "rgba(168, 230, 215, 0.2)", // Mint Green with transparency
    warningLight: "rgba(249, 231, 159, 0.2)", // Soft Yellow with transparency
    errorLight: "rgba(255, 179, 179, 0.2)", // Coral Pink with transparency
    // Additional dreamy pastels colors
    accent: "#A8E6D7", // Brightened Mint Green
    skyBlue: "#A3D8F0", // Brightened Sky Blue
    softYellow: "#F9E79F", // Brightened Soft Yellow
    plum: "#E6B3E6", // Brightened Plum
    surfaceHover: "rgba(30, 32, 52, 0.8)", // Hover state
  },
  typography: {
    titleLarge: { fontSize: 32, fontWeight: "600", lineHeight: 40 }, // largeTitle from guide
    titleMedium: { fontSize: 24, fontWeight: "600", lineHeight: 32 }, // title from guide
    bodyLarge: { fontSize: 16, fontWeight: "400", lineHeight: 24 }, // body from guide
    bodyMedium: { fontSize: 14, fontWeight: "400", lineHeight: 20 }, // caption from guide
    bodySmall: { fontSize: 12, fontWeight: "400", lineHeight: 16 }, // small from guide
    labelLarge: { fontSize: 20, fontWeight: "500", letterSpacing: 0.5 }, // headline from guide
    labelMedium: { fontSize: 14, fontWeight: "400" }, // caption from guide
    labelSmall: { fontSize: 12, fontWeight: "400" }, // small from guide
  },
  spacing: {
    xs: 8, // 0.5rem (8px)
    sm: 16, // 1rem (16px)
    md: 24, // 1.5rem (24px)
    lg: 32, // 2rem (32px)
    xl: 48, // 3rem (48px)
    xxl: 64, // 4rem (64px)
  },
  radius: {
    xs: 8, // Small elements: 0.5rem (8px)
    sm: 16, // Small-medium: 1rem (16px)
    md: 24, // Medium elements: 1.5rem (24px)
    lg: 32, // Large containers: 2rem (32px)
    xl: 48, // Extra large: 3rem (48px)
    pill: 999, // Circular elements: 50% equivalent
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
  layout: {
    toolbarHeight: 56,
    compactSpacing: 4,
    minTouchTarget: 32,
    sliderTrackHeight: 4,
    sliderThumbSize: 16,
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
  ThemeLayout,
};
