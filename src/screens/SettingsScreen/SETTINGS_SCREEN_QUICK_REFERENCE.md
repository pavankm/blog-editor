# Settings Screen - Quick Reference Guide

## Component Files

### 1. SettingsScreen.tsx
**Location**: `src/screens/SettingsScreen/SettingsScreen.tsx`
**Status**: Already implemented ✅
**Role**: Main container component that orchestrates the settings UI

```tsx
// Usage
<SettingsScreen />
```

---

### 2. SettingsNavigation.tsx
**Location**: `src/screens/SettingsScreen/SettingsNavigation.tsx`
**Status**: NEW ✅
**Role**: Left sidebar navigation menu

```tsx
<SettingsNavigation
  activeSection={activeSection}
  onSectionChange={setActiveSection}
/>
```

**Props**:
- `activeSection`: Current active settings section
- `onSectionChange`: Callback when user clicks a section

**Sections**:
- GitHub 🔗
- Hugo ⚙️
- Editor ✏️
- Appearance 🎨
- Sync & Backup 💾
- About ℹ️

---

### 3. SettingsPanel.tsx
**Location**: `src/screens/SettingsScreen/SettingsPanel.tsx`
**Status**: NEW ✅
**Role**: Main content area with all settings controls

```tsx
<SettingsPanel
  activeSection={activeSection}
  githubToken={githubToken}
  hugoConfig={hugoConfig}
  editorPreferences={editorPreferences}
  appearance={appearance}
  onGithubUpdate={handleGithubUpdate}
  onHugoUpdate={handleHugoUpdate}
  onEditorUpdate={handleEditorUpdate}
  onToggleTheme={handleToggleTheme}
  onTestGithubConnection={handleTestGithubConnection}
  onDisconnectGithub={handleDisconnectGithub}
/>
```

**Props**:
- `activeSection`: Which settings to display
- `githubToken`, `hugoConfig`, `editorPreferences`, `appearance`: Current settings values
- `onGithubUpdate`, `onHugoUpdate`, `onEditorUpdate`: Update callbacks
- `onToggleTheme`: Theme toggle callback
- `onTestGithubConnection`, `onDisconnectGithub`: Action callbacks

---

### 4. TwoColumnLayout.tsx
**Location**: `src/components/common/layouts/TwoColumnLayout.tsx`
**Status**: NEW ✅
**Role**: Reusable two-column layout component

```tsx
<TwoColumnLayout
  leftColumn={<SettingsNavigation {...props} />}
  rightColumn={<SettingsPanel {...props} />}
  leftColumnWidth={240}
/>
```

**Props**:
- `leftColumn`: React component for left column
- `rightColumn`: React component for right column
- `leftColumnWidth`: Width of left column (default: 240)

---

### 5. useTheme.ts
**Location**: `src/hooks/useTheme.ts`
**Status**: NEW ✅
**Role**: Custom hook for theme management

```tsx
const { theme, isDark, toggleTheme } = useTheme();

// Access colors
theme.colors.primary
theme.colors.background
theme.colors.text
// ... etc
```

**Available Colors**:
- `primary` - Main brand color
- `secondary` - Secondary accent color
- `background` - Page background
- `surface` - Component surface/card background
- `text` - Primary text color
- `textSecondary` - Secondary text color
- `border` - Border color
- `placeholder` - Placeholder text color
- `inputBackground` - Input field background
- `success` - Success state color
- `error` - Error state color
- `warning` - Warning state color

---

## Settings Sections Breakdown

### GitHub Integration 🔗
**Fields**:
- Token (secure input)
- Username (text input)
- Repository (text input)

**Actions**:
- Test Connection → `onTestGithubConnection()`
- Disconnect → `onDisconnectGithub()`

### Hugo Configuration ⚙️
**Fields**:
- Site Name (text input)
- Content Directory (text input)
- Output Directory (text input)
- Base URL (text input)

**Actions**:
- Save Hugo Config (button)

### Editor Preferences ✏️
**Fields**:
- Default Pen Color (color preview)
- Pen Width (slider placeholder)
- Grid Snap (toggle)
- Grid Size (slider placeholder)
- Auto-save Interval (numeric input)

### Appearance 🎨
**Fields**:
- Dark Mode (toggle)
- Accent Color (color preview)
- Font Size (small/medium/large buttons)

### Sync & Backup 💾
**Fields**:
- Auto Sync (toggle)
- Last Sync (info display)
- Sync Interval (numeric input)

**Actions**:
- Sync Now
- Backup Now

### About ℹ️
**Displays**:
- App name & version
- Description
- Links (Documentation, GitHub, Report Issue, License)
- Credits

---

## Integration Checklist

- ✅ Import `useTheme` hook in components
- ✅ Import `useSettingsStore` for state management
- ✅ All TypeScript types properly defined
- ✅ All callback handlers in parent component
- ✅ Theme colors consistent across all components
- ✅ Proper prop drilling to child components
- ✅ ScrollView for content overflow
- ✅ Two-column layout responsive

---

## Styling Overview

### Spacing
- `8px` - Small gaps
- `12px` - Standard padding
- `16px` - Large padding/sections
- `20px` - Form groups

### Typography
- **Section Title**: 18px, bold
- **Label**: 13px, semi-bold
- **Input**: 13px, regular
- **Description**: 13px, secondary color

### Components
- **Buttons**: 12px padding vertical, 16px horizontal, 6px border radius
- **Inputs**: 10px padding vertical, 12px horizontal, 6px border radius
- **Icons**: 18px for navigation, 24px for app name

---

## Common Patterns

### Toggle with Label
```tsx
<View style={styles.switchRow}>
  <Text style={styles.label}>Dark Mode</Text>
  <Switch
    value={appearance.darkMode}
    onValueChange={onToggleTheme}
  />
</View>
```

### Form Group
```tsx
<View style={styles.formGroup}>
  <Text style={styles.label}>Field Name</Text>
  <TextInput
    style={styles.input}
    placeholder="..."
    value={value}
    onChangeText={handleChange}
  />
</View>
```

### Button Group
```tsx
<View style={styles.buttonGroup}>
  <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
    <Text style={styles.buttonText}>Primary Action</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
    <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
      Secondary Action
    </Text>
  </TouchableOpacity>
</View>
```

---

## Testing Checklist

- [ ] All sections render without errors
- [ ] Navigation between sections works
- [ ] Theme toggle updates colors correctly
- [ ] Input fields accept user input
- [ ] Toggle switches work bidirectionally
- [ ] Buttons are clickable and trigger callbacks
- [ ] Layout is responsive
- [ ] Scrolling works for overflow content
- [ ] Theme persistence works
- [ ] All placeholders display correctly

---

## Future Enhancements

1. **Component Upgrades**
   - [ ] Replace color picker placeholders with actual picker
   - [ ] Add real slider components
   - [ ] Add file/directory picker
   - [ ] Add date picker for last sync

2. **Features**
   - [ ] Settings validation
   - [ ] Error handling & feedback
   - [ ] Success notifications
   - [ ] Settings reset confirmation
   - [ ] Import/export settings

3. **Integration**
   - [ ] GitHub API connection
   - [ ] Sync implementation
   - [ ] Backup functionality
   - [ ] Analytics integration

---

**Last Updated**: October 18, 2025
