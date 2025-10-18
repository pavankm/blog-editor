# 🗺️ Component Dependency Map

## Quick Navigation Guide

This document maps which components need to be built and which screens depend on them.

---

## 📦 Common Components

### Base UI Components (`src/components/common/`)

#### `Toolbar.tsx` ⭐ **CRITICAL**
- **Used in:** EditorScreen, PostListScreen, SettingsScreen (all 3 screens!)
- **Props:**
  - `onLeftButtonPress()` - Left button click handler
  - `leftButtonIcon` - Icon name string
  - `centerContent?` - React component to render in center
  - `rightButtons?` - Array of button configs
  - `title?` - Toolbar title
- **Children it might contain:**
  - `ToolPalette` (EditorScreen)
  - `PostSearch` (PostListScreen)

#### `Sidebar.tsx`
- **Used in:** EditorScreen
- **Props:**
  - `isVisible` - Boolean
  - `onClose()` - Close handler
  - `position` - 'left' | 'right'
  - `children` - Content
- **Children it contains:**
  - `LayerPanel` (EditorScreen)

#### `TwoColumnLayout.tsx` ⭐ **CRITICAL**
- **Used in:** PostListScreen, SettingsScreen
- **Props:**
  - `leftColumn` - React component
  - `rightColumn` - React component
  - `leftColumnWidth` - Number (pixel width)
- **Children patterns:**
  - Left: Navigation/Filter components
  - Right: Content/List components

#### `Button.tsx`
- **Used in:** Many places (common utility)
- **Variants:**
  - primary (purple)
  - secondary (outlined)
  - danger (red)

#### `SearchBar.tsx`
- **Used in:** PostListScreen (center toolbar)
- **Props:**
  - `value` - Search text
  - `onChange()` - Change handler
  - `placeholder` - Placeholder text

#### Other Common Components
- `Badge.tsx` - Status badges
- `Tag.tsx` - Tag display
- `Modal.tsx` - Modal/dialog container
- `Divider.tsx` - Visual separator
- `InfoBox.tsx` - Info message box
- `EmptyState.tsx` - Empty state UI
- `ThemeProvider.tsx` - Theme context wrapper
- `useTheme.ts` - Theme hook

---

## 🎨 Screen-Specific Components

### EditorScreen Components (`src/components/screens/EditorScreen/`)

```
EditorScreen.tsx (parent)
├── Toolbar (IMPORTED from common)
│   └── center: ToolPalette
├── DrawingCanvas
│   └── [uses react-native-svg or Skia]
├── Sidebar (IMPORTED from common)
│   └── LayerPanel
│       ├── LayerItem (multiple)
│       └── AddPageZone
├── PageIndicator
└── PreviewModal
    └── BlogPostPreview
```

**Components to build:**
- [ ] `DrawingCanvas.tsx` - Main canvas component (touches react-native-svg)
- [ ] `ToolPalette.tsx` - Tool selection + color picker
  - Uses: `ColorPicker.tsx`
  - Uses: `ThicknessSlider.tsx`
- [ ] `LayerPanel.tsx` - Sidebar content
- [ ] `LayerItem.tsx` - Individual layer in list
- [ ] `PageIndicator.tsx` - Floating badge
- [ ] `PreviewModal.tsx` - Modal overlay
- [ ] `BlogPostPreview.tsx` - Preview content

**Sub-components:**
- [ ] `ColorPicker.tsx` - Color selection UI
- [ ] `ThicknessSlider.tsx` - Stroke width slider

---

### PostListScreen Components (`src/components/screens/PostListScreen/`)

```
PostListScreen.tsx (parent)
├── Toolbar (IMPORTED from common)
│   └── center: PostSearch
├── TwoColumnLayout (IMPORTED from common)
│   ├── left: PostFilters
│   │   ├── FilterItem (multiple)
│   │   └── SortDropdown
│   └── right: PostCardList
│       ├── PostCard (multiple)
│       │   ├── StatusBadge
│       │   └── Tag (multiple)
│       └── EmptyState
```

**Components to build:**
- [ ] `PostSearch.tsx` - Search input (wrapper around SearchBar)
- [ ] `PostFilters.tsx` - Left sidebar filters
- [ ] `FilterItem.tsx` - Individual filter option
- [ ] `SortDropdown.tsx` - Sort options
- [ ] `PostCardList.tsx` - List container
- [ ] `PostCard.tsx` - Individual post card
  - Uses: `StatusBadge` (from common)
  - Uses: `Tag` (from common)

---

### SettingsScreen Components (`src/components/screens/SettingsScreen/`)

```
SettingsScreen.tsx (parent)
├── Toolbar (IMPORTED from common)
├── TwoColumnLayout (IMPORTED from common)
│   ├── left: SettingsNavigation
│   │   ├── NavSection
│   │   └── NavItem (multiple)
│   └── right: SettingsPanel
│       ├── GithubSettings (visible conditionally)
│       ├── HugoSettings
│       ├── EditorSettings
│       ├── AppearanceSettings
│       ├── SyncSettings
│       └── AboutSettings
```

**Components to build:**
- [ ] `SettingsNavigation.tsx` - Left sidebar nav
- [ ] `NavItem.tsx` - Individual nav item
- [ ] `NavSection.tsx` - Section header + items
- [ ] `SettingsPanel.tsx` - Right content area
- [ ] `SettingsCard.tsx` - Settings card container
- [ ] `SettingItem.tsx` - Individual setting (label + control)
- [ ] `TextInput.tsx` - Form input (reusable)
- [ ] `ToggleSwitch.tsx` - On/off toggle (reusable)
- [ ] `SelectInput.tsx` - Dropdown select (reusable)
- [ ] `ActionButtons.tsx` - Button group

**Section Components (conditional renders in SettingsPanel):**
- [ ] GitHub integration section
- [ ] Hugo configuration section
- [ ] Editor preferences section
- [ ] Appearance/theme section
- [ ] Sync & backup section
- [ ] About section

---

## 🔀 Component Usage Matrix

| Component       | EditorScreen | PostListScreen | SettingsScreen |
| --------------- | :----------: | :------------: | :------------: |
| Toolbar         |      ✅       |       ✅        |       ✅        |
| Button          |      ✅       |       ✅        |       ✅        |
| Modal           |      ✅       |       ❌        |       ❌        |
| Sidebar         |      ✅       |       ❌        |       ❌        |
| TwoColumnLayout |      ❌       |       ✅        |       ✅        |
| Badge           |      ✅       |       ✅        |       ❌        |
| Tag             |      ✅       |       ✅        |       ❌        |
| SearchBar       |      ❌       |       ✅        |       ❌        |
| TextInput       |      ❌       |       ❌        |       ✅        |
| ToggleSwitch    |      ❌       |       ❌        |       ✅        |
| SelectInput     |      ❌       |       ❌        |       ✅        |

---

## 📊 Build Priority

### Phase 1: Critical Shared Components
Must build first (used by multiple screens):
1. `Toolbar.tsx` ⭐
2. `Button.tsx` ⭐
3. `TwoColumnLayout.tsx` ⭐
4. `SearchBar.tsx`
5. `Modal.tsx`

### Phase 2: EditorScreen Dependencies
Build next (specialized for editor):
6. `DrawingCanvas.tsx`
7. `ToolPalette.tsx`
8. `LayerPanel.tsx`
9. `ColorPicker.tsx`
10. `ThicknessSlider.tsx`

### Phase 3: PostListScreen Dependencies
11. `PostFilters.tsx`
12. `PostCardList.tsx`
13. `PostCard.tsx`
14. `FilterItem.tsx`

### Phase 4: SettingsScreen Dependencies
15. `SettingsNavigation.tsx`
16. `SettingsPanel.tsx`
17. `TextInput.tsx`
18. `ToggleSwitch.tsx`
19. `SelectInput.tsx`

### Phase 5: Utilities & Others
20. Theme components, hooks, utilities

---

## 🎯 Data Flow Patterns

### EditorScreen Data Flow
```
EditorScreen (useEditorStore)
├── Tool Selection → ToolPalette → updateColor/updateStrokeWidth
├── Canvas Drawing → DrawingCanvas → store paths
├── Layer Management → LayerPanel → addLayer/deleteLayer
└── Preview → PreviewModal → export trigger
```

### PostListScreen Data Flow
```
PostListScreen (usePostStore)
├── Search Input → PostSearch → filter posts
├── Filter Selection → PostFilters → filter by status
├── Sort Option → SortDropdown → sort posts
└── Card Click → PostCardList → navigate to editor
```

### SettingsScreen Data Flow
```
SettingsScreen (useSettingsStore)
├── Nav Click → SettingsNavigation → change active section
└── Form Input → SettingsPanel → update store
    ├── GitHub fields → setGithubToken
    ├── Hugo fields → setHugoConfig
    ├── Theme toggle → setAppearance
    └── Others → respective setters
```

---

## 🧮 Component Count Summary

- **Total components to build: ~50**
  - Common: 12
  - EditorScreen: 7 + 2 sub = 9
  - PostListScreen: 6
  - SettingsScreen: 10
  - Form controls: 3 (reusable)
  - Section components: 6

---

## 💾 Zustand Stores Needed

Each screen needs its corresponding store:

### `useEditorStore()` - Editor state
```tsx
{
  currentPost: BlogPost | null
  layers: DrawingLayer[]
  activeLayerId: string
  selectedTool: 'pen' | 'highlighter' | 'eraser'
  selectedColor: string
  strokeWidth: number
  // ... actions
}
```

### `usePostStore()` - Posts list state
```tsx
{
  posts: BlogPost[]
  // ... actions (add, delete, update)
}
```

### `useSettingsStore()` - Settings state
```tsx
{
  githubToken: { token, owner, repo, branch }
  hugoConfig: { ... }
  editorPreferences: { ... }
  appearance: { darkMode, ... }
  // ... actions
}
```

### `useTheme()` - Theme hook (context-based)
```tsx
{
  theme: { colors, spacing, typography, ... }
  isDarkMode: boolean
  toggleTheme: () => void
}
```

---

## 🚀 Implementation Checklist

Use this to track progress:

- [ ] Phase 1: Critical components
  - [ ] Toolbar.tsx
  - [ ] Button.tsx
  - [ ] TwoColumnLayout.tsx
  - [ ] SearchBar.tsx
  - [ ] Modal.tsx
  
- [ ] Phase 2: EditorScreen
  - [ ] DrawingCanvas.tsx
  - [ ] ToolPalette.tsx
  - [ ] LayerPanel.tsx
  
- [ ] Phase 3: PostListScreen
  - [ ] PostFilters.tsx
  - [ ] PostCardList.tsx
  - [ ] PostCard.tsx
  
- [ ] Phase 4: SettingsScreen
  - [ ] SettingsNavigation.tsx
  - [ ] SettingsPanel.tsx
  - [ ] Form inputs
  
- [ ] Phase 5: Stores & Utils
  - [ ] useEditorStore()
  - [ ] usePostStore()
  - [ ] useSettingsStore()
  - [ ] useTheme()
