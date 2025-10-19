import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { SettingsSectionType } from "./SettingsScreen";

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

interface SettingsPanelProps {
  activeSection: SettingsSectionType;
  githubToken: GithubSettings;
  hugoConfig: HugoSettings;
  editorPreferences: EditorPreferences;
  appearance: AppearanceSettings;
  onGithubUpdate: (field: string, value: string) => void;
  onHugoUpdate: (field: string, value: string) => void;
  onEditorUpdate: (field: string, value: any) => void;
  onToggleTheme: (isDark: boolean) => void;
  onTestGithubConnection: () => void;
  onDisconnectGithub: () => void;
}

/**
 * SettingsPanel Component
 *
 * Displays settings content based on the active section.
 * Each section has its own set of controls and options.
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  activeSection,
  githubToken,
  hugoConfig,
  editorPreferences,
  appearance,
  onGithubUpdate,
  onHugoUpdate,
  onEditorUpdate,
  onToggleTheme,
  onTestGithubConnection,
  onDisconnectGithub,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderSection = () => {
    switch (activeSection) {
      case "github":
        return renderGithubSettings();
      case "hugo":
        return renderHugoSettings();
      case "editor":
        return renderEditorSettings();
      case "appearance":
        return renderAppearanceSettings();
      case "sync":
        return renderSyncSettings();
      case "about":
        return renderAboutSettings();
      default:
        return null;
    }
  };

  const renderGithubSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>GitHub Integration</Text>
      <Text style={styles.sectionDescription}>
        Configure your GitHub repository for publishing your blog posts.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>GitHub Token</Text>
        <TextInput
          style={styles.input}
          placeholder="ghp_xxxxxxxxxxxx"
          placeholderTextColor={theme.colors.placeholder}
          value={githubToken.token}
          onChangeText={(text) => onGithubUpdate("token", text)}
          secureTextEntry
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="your-username"
          placeholderTextColor={theme.colors.placeholder}
          value={githubToken.username}
          onChangeText={(text) => onGithubUpdate("username", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Repository</Text>
        <TextInput
          style={styles.input}
          placeholder="your-repo"
          placeholderTextColor={theme.colors.placeholder}
          value={githubToken.repository}
          onChangeText={(text) => onGithubUpdate("repository", text)}
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={onTestGithubConnection}
        >
          <Text style={styles.buttonText}>Test Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={onDisconnectGithub}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Disconnect
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHugoSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hugo Configuration</Text>
      <Text style={styles.sectionDescription}>
        Configure your Hugo project settings and paths.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Site Name</Text>
        <TextInput
          style={styles.input}
          placeholder="My Blog"
          placeholderTextColor={theme.colors.placeholder}
          value={hugoConfig.siteName}
          onChangeText={(text) => onHugoUpdate("siteName", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Content Directory</Text>
        <TextInput
          style={styles.input}
          placeholder="content/posts"
          placeholderTextColor={theme.colors.placeholder}
          value={hugoConfig.contentDirectory}
          onChangeText={(text) => onHugoUpdate("contentDirectory", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Output Directory</Text>
        <TextInput
          style={styles.input}
          placeholder="public"
          placeholderTextColor={theme.colors.placeholder}
          value={hugoConfig.outputDirectory}
          onChangeText={(text) => onHugoUpdate("outputDirectory", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Base URL</Text>
        <TextInput
          style={styles.input}
          placeholder="https://yourblog.com"
          placeholderTextColor={theme.colors.placeholder}
          value={hugoConfig.baseURL}
          onChangeText={(text) => onHugoUpdate("baseURL", text)}
        />
      </View>

      <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
        <Text style={styles.buttonText}>Save Hugo Config</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditorSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Editor Preferences</Text>
      <Text style={styles.sectionDescription}>
        Customize your drawing and editing experience.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Default Pen Color</Text>
        <View style={styles.colorPickerPlaceholder}>
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: editorPreferences.defaultPenColor },
            ]}
          />
          <Text style={styles.colorValue}>
            {editorPreferences.defaultPenColor}
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pen Width</Text>
        <View style={styles.sliderPlaceholder}>
          <Text style={styles.sliderValue}>
            {editorPreferences.defaultPenWidth}px
          </Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Grid Snap</Text>
          <Switch
            value={editorPreferences.gridSnap}
            onValueChange={(value) => onEditorUpdate("gridSnap", value)}
            trackColor={{ false: "#767577", true: "#81c784" }}
            thumbColor={editorPreferences.gridSnap ? "#4caf50" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Grid Size</Text>
        <View style={styles.sliderPlaceholder}>
          <Text style={styles.sliderValue}>{editorPreferences.gridSize}px</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Auto-save Interval (seconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="60"
          placeholderTextColor={theme.colors.placeholder}
          value={String(editorPreferences.autoSaveInterval)}
          onChangeText={(text) =>
            onEditorUpdate("autoSaveInterval", parseInt(text) || 60)
          }
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderAppearanceSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <Text style={styles.sectionDescription}>
        Customize the look and feel of the application.
      </Text>

      <View style={styles.formGroup}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={appearance.darkMode}
            onValueChange={onToggleTheme}
            trackColor={{ false: "#767577", true: "#81c784" }}
            thumbColor={appearance.darkMode ? "#4caf50" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Accent Color</Text>
        <View style={styles.colorPickerPlaceholder}>
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: appearance.accentColor },
            ]}
          />
          <Text style={styles.colorValue}>{appearance.accentColor}</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Font Size</Text>
        <View style={styles.fontSizeOptions}>
          {(["small", "medium", "large"] as const).map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.fontSizeButton,
                appearance.fontSize === size && styles.fontSizeButtonActive,
              ]}
              onPress={() => onEditorUpdate("fontSize", size)}
            >
              <Text
                style={[
                  styles.fontSizeButtonText,
                  appearance.fontSize === size &&
                    styles.fontSizeButtonTextActive,
                ]}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSyncSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sync & Backup</Text>
      <Text style={styles.sectionDescription}>
        Manage automatic sync and backup settings.
      </Text>

      <View style={styles.formGroup}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Auto Sync</Text>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: "#767577", true: "#81c784" }}
            thumbColor="#f4f3f4"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Last Sync</Text>
        <Text style={styles.infoText}>Never synced</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sync Interval (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="15"
          placeholderTextColor={theme.colors.placeholder}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
          <Text style={styles.buttonText}>Sync Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Backup Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAboutSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.aboutContainer}>
        <Text style={styles.appName}>📝 Blog Editor</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <Text style={styles.aboutDescription}>
          A powerful and intuitive editor for creating and managing blog posts
          with drawing capabilities.
        </Text>

        <View style={styles.aboutLinks}>
          <TouchableOpacity>
            <Text style={styles.link}>Documentation</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>GitHub Repository</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>License</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.credits}>
          <Text style={styles.creditsTitle}>Credits</Text>
          <Text style={styles.creditsText}>
            Built with React Native and TypeScript
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderSection()}
    </ScrollView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      paddingVertical: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 13,
      color: theme.colors.textSecondary || "#666",
      marginBottom: 16,
      lineHeight: 18,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 13,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBackground || "#fff",
    },
    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    colorPickerPlaceholder: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    colorPreview: {
      width: 32,
      height: 32,
      borderRadius: 4,
      marginRight: 12,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    colorValue: {
      fontSize: 13,
      color: theme.colors.text,
      fontFamily: "monospace",
    },
    sliderPlaceholder: {
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.inputBackground || "#fff",
    },
    sliderValue: {
      fontSize: 13,
      color: theme.colors.text,
      fontWeight: "500",
    },
    fontSizeOptions: {
      flexDirection: "row",
      gap: 8,
    },
    fontSizeButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      borderRadius: 6,
      alignItems: "center",
      backgroundColor: theme.colors.inputBackground || "#fff",
    },
    fontSizeButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    fontSizeButtonText: {
      fontSize: 12,
      color: theme.colors.text,
      fontWeight: "500",
    },
    fontSizeButtonTextActive: {
      color: "#fff",
    },
    buttonGroup: {
      flexDirection: "row",
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonPrimary: {
      backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: "transparent",
    },
    buttonText: {
      fontSize: 13,
      fontWeight: "600",
      color: "#fff",
    },
    buttonTextSecondary: {
      color: theme.colors.primary,
    },
    aboutContainer: {
      paddingVertical: 16,
    },
    appName: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 4,
    },
    version: {
      fontSize: 13,
      color: theme.colors.textSecondary || "#666",
      marginBottom: 16,
    },
    aboutDescription: {
      fontSize: 13,
      color: theme.colors.textSecondary || "#666",
      lineHeight: 18,
      marginBottom: 20,
    },
    aboutLinks: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border || "#e0e0e0",
      paddingVertical: 12,
      marginBottom: 20,
    },
    link: {
      fontSize: 13,
      color: theme.colors.primary,
      fontWeight: "500",
      paddingVertical: 6,
    },
    credits: {
      paddingVertical: 12,
    },
    creditsTitle: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 4,
    },
    creditsText: {
      fontSize: 12,
      color: theme.colors.textSecondary || "#666",
    },
    infoText: {
      fontSize: 13,
      color: theme.colors.textSecondary || "#666",
    },
  });

export default SettingsPanel;
