# 🏗️ App Architecture & Component Hierarchy

## Full Application Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│            ┌────────────────────────────────────────┐           │
│            │    ThemeProvider (Light/Dark Theme)    │           │
│            └────────────────────────────────────────┘           │
│                                                                  │
│            ┌────────────────────────────────────────┐           │
│            │      React Navigation Stack           │           │
│            │  ┌──────────────────────────────────┐ │           │
│            │  │  Screen Navigator (Tabs/Stack)  │ │           │
│            │  │  ┌──────────────────────────┐    │ │           │
│            │  │  │                          │    │ │           │
│            │  └──────────────────────────────┘    │ │           │
│            └────────────────────────────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Screen Architecture Diagram

### EditorScreen Structure
```
┌──────────────────────────────────────────────────────────────────┐
│                      EditorScreen                                 │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Toolbar                                                    │  │
│ │ ┌─────────┬──────────────────────────────┬──────────────┐ │  │
│ │ │ Menu    │  ToolPalette                 │ Actions      │ │  │
│ │ │ Button  │  ┌───────────────────────┐   │ ┌──────────┐│ │  │
│ │ │         │  │ ColorPicker    Slider │   │ │ Preview ││ │  │
│ │ │         │  │ Pen: ⚫ Thick: ──     │   │ │ Publish ││ │  │
│ │ │         │  └───────────────────────┘   │ │ Settings││ │  │
│ │ │         │                               │ └──────────┘│ │  │
│ │ └─────────┴──────────────────────────────┴──────────────┘ │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                     Main Content Area                       │ │
│ │                                                             │ │
│ │  ┌─────────────────────┐      ┌──────────────────────┐   │ │
│ │  │   DrawingCanvas     │      │  PageIndicator       │   │ │
│ │  │                     │      │  "Page 1 of 3"       │   │ │
│ │  │  ┌───────────────┐  │      └──────────────────────┘   │ │
│ │  │  │ Layer Stack   │  │                                 │ │
│ │  │  │  - Layer 3 ▶  │  │                                 │ │
│ │  │  │  - Layer 2    │  │                                 │ │
│ │  │  │  - Layer 1    │  │                                 │ │
│ │  │  └───────────────┘  │                                 │ │
│ │  │                     │                                 │ │
│ │  └─────────────────────┘                                 │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌────────────────────────┐        ┌──────────────────────────┐ │
│ │  Sidebar (Hidden)      │        │  PreviewModal (Hidden)   │ │
│ │  [Toggle to show]      │        │  [Overlay Preview]       │ │
│ │                        │        │                          │ │
│ │  LayerPanel            │        │  BlogPostPreview         │ │
│ │  ┌──────────────────┐  │        │  ┌──────────────────┐    │ │
│ │  │ Pages            │  │        │  │ Title            │    │ │
│ │  │ ┌──────────────┐ │  │        │  │ Content Preview  │    │ │
│ │  │ │ Page 1 🔤    │ │  │        │  │ [+] Export Btn   │    │ │
│ │  │ │ Page 2 🔤    │ │  │        │  │                  │    │ │
│ │  │ │ Page 3 ◀     │ │  │        │  └──────────────────┘    │ │
│ │  │ └──────────────┘ │  │        │                          │ │
│ │  │                  │  │        └──────────────────────────┘ │
│ │  │ [+] Add Page     │  │                                     │ │
│ │  └──────────────────┘  │                                     │ │
│ │                        │                                     │ │
│ └────────────────────────┘                                     │ │
│                                                                │ │
└──────────────────────────────────────────────────────────────┘
```

---

### PostListScreen Structure
```
┌────────────────────────────────────────────────────────────────┐
│                    PostListScreen                               │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Toolbar                                                  │  │
│ │ ┌────────┬──────────────────────────┬──────────────────┐ │  │
│ │ │ Menu   │  PostSearch              │  New Post / Settings
│ │ │        │  🔍 "Search posts..."    │  [+]  [⚙]      │ │  │
│ │ │        │                          │                  │ │  │
│ │ └────────┴──────────────────────────┴──────────────────┘ │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │              TwoColumnLayout                             │  │
│ │  ┌─────────────────┐  ┌────────────────────────────────┐ │  │
│ │  │ PostFilters     │  │ PostCardList                   │ │  │
│ │  │                 │  │                                │ │  │
│ │  │ Status Section: │  │ ┌──────────────────────────┐  │ │  │
│ │  │ [◉] All (12)    │  │ │ Post Card               │  │ │  │
│ │  │ [ ] Draft (3)   │  │ │ ┌──────────────────────┐│  │ │  │
│ │  │ [ ] Published (9)  │ │ │ Cover Image         ││  │ │  │
│ │  │                 │  │ │ └──────────────────────┘│  │ │  │
│ │  │ Sort Section:   │  │ │ Status: ✨ Published   │  │ │  │
│ │  │ [Newest ▼]      │  │ │ Title: "My Post"       │  │ │  │
│ │  │                 │  │ │ Date: Mar 15, 2024     │  │ │  │
│ │  │                 │  │ │ Tags: [Design][Web]    │  │ │  │
│ │  │                 │  │ │ 🎨 🔗 📌              │  │ │  │
│ │  │                 │  │ └──────────────────────────┘  │ │  │
│ │  │                 │  │                                │ │  │
│ │  │                 │  │ ┌──────────────────────────┐  │ │  │
│ │  │                 │  │ │ Post Card               │  │ │  │
│ │  │                 │  │ │ ... (repeated)         │  │ │  │
│ │  │                 │  │ └──────────────────────────┘  │ │  │
│ │  │                 │  │                                │ │  │
│ │  │                 │  │ [EmptyState if no posts]      │ │  │
│ │  └─────────────────┘  └────────────────────────────────┘ │  │
│ │                                                            │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

### SettingsScreen Structure
```
┌────────────────────────────────────────────────────────────────┐
│                    SettingsScreen                               │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Toolbar                                                  │  │
│ │ [← Back]          Settings          [⚙]              │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │              TwoColumnLayout                             │  │
│ │  ┌─────────────────┐  ┌────────────────────────────────┐ │  │
│ │  │ SettingsNav     │  │ SettingsPanel (Dynamic)        │ │  │
│ │  │                 │  │                                │ │  │
│ │  │ GENERAL:        │  │ When "GitHub" selected:        │ │  │
│ │  │ [◉] GitHub      │  │ ┌────────────────────────────┐ │ │  │
│ │  │ [ ] Hugo Config │  │ │ GitHub Integration         │ │ │  │
│ │  │ [ ] Editor      │  │ │ ┌──────────────────────────┐│ │ │  │
│ │  │                 │  │ │ │ Token: [__________]      ││ │ │  │
│ │  │ PREFERENCES:    │  │ │ │ Owner: [__________]      ││ │ │  │
│ │  │ [ ] Appearance  │  │ │ │ Repo:  [__________]      ││ │ │  │
│ │  │ [ ] Sync        │  │ │ │ Branch: [main ▼]        ││ │ │  │
│ │  │ [ ] About       │  │ │ └──────────────────────────┘│ │ │  │
│ │  │                 │  │ │ [Test] [Disconnect]        │ │ │  │
│ │  │                 │  │ └────────────────────────────┘ │ │  │
│ │  │                 │  │                                │ │  │
│ │  │                 │  │ When "Appearance" selected:   │ │  │
│ │  │                 │  │ ┌────────────────────────────┐ │ │  │
│ │  │                 │  │ │ Theme:                     │ │ │  │
│ │  │                 │  │ │ 🌙 Dark Mode [ ▯ → ◉]    │ │ │  │
│ │  │                 │  │ │                            │ │ │  │
│ │  │                 │  │ │ Color Scheme:              │ │ │  │
│ │  │                 │  │ │ [Purple ▼]                 │ │ │  │
│ │  │                 │  │ └────────────────────────────┘ │ │  │
│ │  │                 │  │                                │ │  │
│ │  └─────────────────┘  └────────────────────────────────┘ │  │
│ │                                                            │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Component Tree (Text Format)

### EditorScreen Component Tree
```
App
└── EditorScreen
    ├── Toolbar
    │   ├── ToolButton (left)
    │   ├── ToolPalette (center)
    │   │   ├── ColorPicker
    │   │   └── ThicknessSlider
    │   └── ToolButton[] (right)
    ├── DrawingCanvas
    │   └── [SVG/Skia Canvas]
    ├── PageIndicator
    ├── Sidebar
    │   └── LayerPanel
    │       ├── LayerItem[]
    │       └── AddPageZone
    └── PreviewModal
        └── BlogPostPreview
```

### PostListScreen Component Tree
```
App
└── PostListScreen
    ├── Toolbar
    │   ├── ToolButton (left)
    │   ├── PostSearch (center)
    │   └── ToolButton[] (right)
    └── TwoColumnLayout
        ├── PostFilters (left)
        │   ├── FilterItem[]
        │   └── SortDropdown
        └── PostCardList (right)
            ├── PostCard[]
            │   ├── StatusBadge
            │   └── Tag[]
            └── EmptyState
```

### SettingsScreen Component Tree
```
App
└── SettingsScreen
    ├── Toolbar
    │   ├── ToolButton (left)
    │   ├── Title (center)
    │   └── ToolButton[] (right)
    └── TwoColumnLayout
        ├── SettingsNavigation (left)
        │   ├── NavSection[]
        │   │   └── NavItem[]
        │   └── NavSection[]
        │       └── NavItem[]
        └── SettingsPanel (right)
            └── [Section Component]
                ├── SettingsCard[]
                │   ├── SettingItem[]
                │   │   ├── TextInput
                │   │   ├── ToggleSwitch
                │   │   └── SelectInput
                │   └── Button[]
                └── InfoBox
```

---

## State Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│              React Context (useTheme)                    │
│   ┌─────────────────────────────────────────────────┐  │
│   │ {                                               │  │
│   │   theme: { colors, spacing, typography },      │  │
│   │   isDarkMode: boolean                           │  │
│   │ }                                               │  │
│   └─────────────────────────────────────────────────┘  │
│                      ▲                                   │
│                      │ Consumed by ALL screens          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            Zustand Stores                               │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ useEditorStore                                   │  │
│  │ {                                                │  │
│  │   currentPost, layers, activeLayer,             │  │
│  │   selectedTool, selectedColor, strokeWidth,     │  │
│  │   actions: addLayer, deleteLayer, ...           │  │
│  │ }                                                │  │
│  │ Used by: EditorScreen                           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ usePostStore                                     │  │
│  │ {                                                │  │
│  │   posts: BlogPost[],                            │  │
│  │   actions: addPost, deletePost, updatePost      │  │
│  │ }                                                │  │
│  │ Used by: PostListScreen                         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ useSettingsStore                                │  │
│  │ {                                                │  │
│  │   githubToken, hugoConfig, editorPrefs,        │  │
│  │   appearance: { darkMode, ... },                │  │
│  │   actions: setGithubToken, setHugoConfig, ...   │  │
│  │ }                                                │  │
│  │ Used by: SettingsScreen                         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: EditorScreen

```
User draws on canvas
        ↓
DrawingCanvas detects gesture
        ↓
Calls onStroke(path) handler
        ↓
EditorScreen receives path
        ↓
Updates useEditorStore with new drawing
        ↓
Store triggers re-render of DrawingCanvas
        ↓
Canvas re-renders with new path
        ↓
All layers visually updated
```

---

## Dark/Light Mode Flow

```
User toggles theme in SettingsScreen
        ↓
handleToggleTheme(isDark)
        ↓
useSettingsStore.setAppearance({ darkMode: isDark })
        ↓
Store persists to AsyncStorage
        ↓
Context provider detects change
        ↓
useTheme() hook returns new theme
        ↓
All screens re-render with new theme colors
        ↓
CSS-in-JS stylesheets update automatically
```

---

## File Organization Summary

```
src/
├── App.tsx                     # Entry point with ThemeProvider
├── screens/                    # Three main screens
│   ├── EditorScreen/
│   │   └── EditorScreen.tsx    ✅
│   ├── PostListScreen/
│   │   └── PostListScreen.tsx  ✅
│   └── SettingsScreen/
│       └── SettingsScreen.tsx  ✅
├── components/                 # All UI components
│   ├── common/                 # Shared components
│   ├── canvas/                 # Drawing canvas
│   ├── LayerManager/           # Layer panel
│   ├── toolbar/                # Tool palette
│   └── screens/                # Screen-specific components
├── hooks/                      # Custom hooks
│   └── useTheme.ts             # Theme hook
├── store/                      # Zustand stores
│   ├── editorStore.ts
│   ├── postStore.ts
│   └── settingsStore.ts
├── types/                      # TypeScript definitions
├── styles/                     # Theme & styling
└── utils/                      # Utilities
```
