import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  autoSaveInterval: number; // in seconds
}

interface AppearanceSettings {
  darkMode: boolean;
  accentColor: string;
  fontSize: "small" | "medium" | "large";
}

interface SyncSettings {
  autoSync: boolean;
  lastSyncTime: Date | null;
  syncInterval: number; // in minutes
}

interface SettingsStoreState {
  // Settings
  githubToken: GithubSettings;
  hugoConfig: HugoSettings;
  editorPreferences: EditorPreferences;
  appearance: AppearanceSettings;
  sync: SyncSettings;

  // Actions: GitHub
  setGithubToken: (settings: Partial<GithubSettings>) => void;

  // Actions: Hugo
  setHugoConfig: (settings: Partial<HugoSettings>) => void;

  // Actions: Editor Preferences
  setEditorPreferences: (settings: Partial<EditorPreferences>) => void;

  // Actions: Appearance
  setAppearance: (settings: Partial<AppearanceSettings>) => void;

  // Actions: Sync
  setSyncSettings: (settings: Partial<SyncSettings>) => void;
  updateLastSyncTime: () => void;

  // Bulk operations
  resetAllSettings: () => void;
}

const initialState = {
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

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setGithubToken: (settings: Partial<GithubSettings>) => {
        set((state) => ({
          githubToken: {
            ...state.githubToken,
            ...settings,
          },
        }));
      },

      setHugoConfig: (settings: Partial<HugoSettings>) => {
        set((state) => ({
          hugoConfig: {
            ...state.hugoConfig,
            ...settings,
          },
        }));
      },

      setEditorPreferences: (settings: Partial<EditorPreferences>) => {
        set((state) => ({
          editorPreferences: {
            ...state.editorPreferences,
            ...settings,
          },
        }));
      },

      setAppearance: (settings: Partial<AppearanceSettings>) => {
        set((state) => ({
          appearance: {
            ...state.appearance,
            ...settings,
          },
        }));
      },

      setSyncSettings: (settings: Partial<SyncSettings>) => {
        set((state) => ({
          sync: {
            ...state.sync,
            ...settings,
          },
        }));
      },

      updateLastSyncTime: () => {
        set((state) => ({
          sync: {
            ...state.sync,
            lastSyncTime: new Date(),
          },
        }));
      },

      resetAllSettings: () => {
        set(initialState);
      },
    }),
    {
      name: "settings-store",
      version: 1,
    }
  )
);
