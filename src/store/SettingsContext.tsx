import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Interfaces
interface GithubSettings {
  token: string;
  username: string;
  repository: string;
}

interface HugoSettings {
  siteName: string;
  contentDirectory: string;
  outputDirectory: string;
  baseURL: string;
}

interface EditorPreferences {
  defaultPenColor: string;
  defaultPenWidth: number;
  gridSnap: boolean;
  gridSize: number;
  autoSaveInterval: number;
}

interface AppearanceSettings {
  darkMode: boolean;
  accentColor: string;
  fontSize: "small" | "medium" | "large";
}

interface SyncSettings {
  autoSync: boolean;
  lastSyncTime: Date | null;
  syncInterval: number;
}

export interface SettingsStoreState {
  githubToken: GithubSettings;
  hugoConfig: HugoSettings;
  editorPreferences: EditorPreferences;
  appearance: AppearanceSettings;
  sync: SyncSettings;
}

interface SettingsActions {
  setGithubToken: (settings: Partial<GithubSettings>) => void;
  setHugoConfig: (settings: Partial<HugoSettings>) => void;
  setEditorPreferences: (settings: Partial<EditorPreferences>) => void;
  setAppearance: (settings: Partial<AppearanceSettings>) => void;
  setSyncSettings: (settings: Partial<SyncSettings>) => void;
  updateLastSyncTime: () => void;
  resetAllSettings: () => void;
}

// Initial state
const initialState: SettingsStoreState = {
  githubToken: {
    token: "",
    username: "",
    repository: "",
  },
  hugoConfig: {
    siteName: "My Blog",
    contentDirectory: "content",
    outputDirectory: "public",
    baseURL: "https://example.com",
  },
  editorPreferences: {
    defaultPenColor: "#000000",
    defaultPenWidth: 2,
    gridSnap: false,
    gridSize: 10,
    autoSaveInterval: 30,
  },
  appearance: {
    darkMode: false,
    accentColor: "#7c3aed",
    fontSize: "medium" as const,
  },
  sync: {
    autoSync: false,
    lastSyncTime: null,
    syncInterval: 5,
  },
};

// Action types
type SettingsAction =
  | { type: "SET_GITHUB_TOKEN"; payload: Partial<GithubSettings> }
  | { type: "SET_HUGO_CONFIG"; payload: Partial<HugoSettings> }
  | { type: "SET_EDITOR_PREFERENCES"; payload: Partial<EditorPreferences> }
  | { type: "SET_APPEARANCE"; payload: Partial<AppearanceSettings> }
  | { type: "SET_SYNC_SETTINGS"; payload: Partial<SyncSettings> }
  | { type: "UPDATE_LAST_SYNC_TIME" }
  | { type: "RESET_ALL_SETTINGS" };

// Reducer
function settingsReducer(
  state: SettingsStoreState,
  action: SettingsAction
): SettingsStoreState {
  switch (action.type) {
    case "SET_GITHUB_TOKEN":
      return {
        ...state,
        githubToken: { ...state.githubToken, ...action.payload },
      };
    case "SET_HUGO_CONFIG":
      return {
        ...state,
        hugoConfig: { ...state.hugoConfig, ...action.payload },
      };
    case "SET_EDITOR_PREFERENCES":
      return {
        ...state,
        editorPreferences: {
          ...state.editorPreferences,
          ...action.payload,
        },
      };
    case "SET_APPEARANCE":
      return {
        ...state,
        appearance: { ...state.appearance, ...action.payload },
      };
    case "SET_SYNC_SETTINGS":
      return {
        ...state,
        sync: { ...state.sync, ...action.payload },
      };
    case "UPDATE_LAST_SYNC_TIME":
      return {
        ...state,
        sync: { ...state.sync, lastSyncTime: new Date() },
      };
    case "RESET_ALL_SETTINGS":
      return initialState;
    default:
      return state;
  }
}

// Context
interface SettingsContextType {
  state: SettingsStoreState;
  dispatch: React.Dispatch<SettingsAction>;
  actions: SettingsActions;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// Provider
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const actions: SettingsActions = {
    setGithubToken: (settings) =>
      dispatch({ type: "SET_GITHUB_TOKEN", payload: settings }),
    setHugoConfig: (settings) =>
      dispatch({ type: "SET_HUGO_CONFIG", payload: settings }),
    setEditorPreferences: (settings) =>
      dispatch({ type: "SET_EDITOR_PREFERENCES", payload: settings }),
    setAppearance: (settings) =>
      dispatch({ type: "SET_APPEARANCE", payload: settings }),
    setSyncSettings: (settings) =>
      dispatch({ type: "SET_SYNC_SETTINGS", payload: settings }),
    updateLastSyncTime: () => dispatch({ type: "UPDATE_LAST_SYNC_TIME" }),
    resetAllSettings: () => dispatch({ type: "RESET_ALL_SETTINGS" }),
  };

  return (
    <SettingsContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook - Compatible with zustand API
export const useSettingsStore = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsStore must be used within SettingsProvider");
  }

  const { state, actions } = context;

  return {
    ...state,
    setGithubToken: actions.setGithubToken,
    setHugoConfig: actions.setHugoConfig,
    setEditorPreferences: actions.setEditorPreferences,
    setAppearance: actions.setAppearance,
    setSyncSettings: actions.setSyncSettings,
    updateLastSyncTime: actions.updateLastSyncTime,
    resetAllSettings: actions.resetAllSettings,
  };
};
