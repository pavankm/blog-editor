# ⚡ Quick Reference: Three Screens Overview

## EditorScreen 📝
**File:** `src/screens/EditorScreen/EditorScreen.tsx`

### What it does:
- Main editing interface for blog posts
- Drawing canvas with pen/highlighter/eraser
- Layer management
- Real-time tool palette (colors, thickness)
- Preview and export

### Key State:
```tsx
- isSidebarVisible: boolean
- isPreviewVisible: boolean
- currentPageIndex: number
- Zustand: useEditorStore()
```

### Main Handlers:
```tsx
handleToggleSidebar() → ToggleLayerPanel
handleOpenPreview() → ShowExportModal
handleAddPage() → AddNewLayer
handleSelectPage(index) → ChangeActivePage
```

### Component Tree:
```
Toolbar (with ToolPalette in center)
  ├─ DrawingCanvas
  ├─ PageIndicator
  ├─ Sidebar
  │   └─ LayerPanel
  └─ PreviewModal
```

---

## PostListScreen 📋
**File:** `src/screens/PostListScreen/PostListScreen.tsx`

### What it does:
- Display all blog posts in a list
- Filter by status (All, Draft, Published)
- Search functionality
- Sort options
- Access to individual posts for editing

### Key State:
```tsx
- currentFilter: 'all' | 'published' | 'draft'
- searchQuery: string
- sortBy: 'newest' | 'oldest' | 'title'
- Zustand: usePostStore()
```

### Main Handlers:
```tsx
handleCreateNewPost() → NavigateToEditor
handlePostPress(id) → OpenPostInEditor
handleDeletePost(id) → RemovePost
handleTogglePublish(id, published) → UpdatePostStatus
```

### Component Tree:
```
Toolbar (with PostSearch in center)
  └─ TwoColumnLayout
      ├─ PostFilters (left)
      │   ├─ FilterItem ("All", "Draft", "Published")
      │   └─ SortDropdown
      └─ PostCardList (right)
          ├─ PostCard (repeated)
          │   ├─ StatusBadge
          │   └─ Tag (repeated)
          └─ EmptyState (when no posts)
```

---

## SettingsScreen ⚙️
**File:** `src/screens/SettingsScreen/SettingsScreen.tsx`

### What it does:
- App configuration and preferences
- GitHub integration setup
- Hugo static site config
- Editor preferences
- Theme selection (light/dark)
- Sync & backup options
- About information

### Key State:
```tsx
- activeSection: 'github' | 'hugo' | 'editor' | 'appearance' | 'sync' | 'about'
- Zustand: useSettingsStore()
```

### Main Handlers:
```tsx
handleToggleTheme(isDark) → UpdateTheme
handleGithubUpdate(field, value) → UpdateGithubSettings
handleHugoUpdate(field, value) → UpdateHugoConfig
handleEditorUpdate(field, value) → UpdateEditorPrefs
handleTestGithubConnection() → ValidateGithubAPI
handleDisconnectGithub() → ClearGithubSettings
```

### Component Tree:
```
Toolbar (with title "Settings")
  └─ TwoColumnLayout
      ├─ SettingsNavigation (left)
      │   ├─ NavSection ("General")
      │   │   ├─ NavItem "GitHub"
      │   │   ├─ NavItem "Hugo Config"
      │   │   └─ NavItem "Editor"
      │   └─ NavSection ("Preferences")
      │       ├─ NavItem "Appearance"
      │       ├─ NavItem "Sync"
      │       └─ NavItem "About"
      └─ SettingsPanel (right) - Dynamic content based on activeSection
          ├─ GitHub settings (form fields + test button)
          ├─ Hugo settings (form fields)
          ├─ Editor settings (toggles + dropdowns)
          ├─ Appearance settings (theme toggle)
          ├─ Sync settings (backup buttons)
          └─ About settings (app info + version)
```

---

## 🔄 Common Patterns Across All Screens

### 1. Theme Integration
```tsx
const { theme } = useTheme();
const styles = createStyles(theme);

// Use in JSX
<View style={styles.container}>
```

### 2. Store Integration
```tsx
const { data, actions } = useStore();
// Use: data and actions(params)
```

### 3. Event Handler Pattern
```tsx
const handleActionName = (param?: type) => {
  // TODO: comment about what needs to happen
  console.log('Action triggered');
};

// Pass to child
<ChildComponent onEvent={handleActionName} />
```

### 4. Filter & Sort Pattern
```tsx
const filtered = data.filter(item => condition);
const sorted = [...filtered].sort((a, b) => comparison);
```

---

## 📊 Navigation Between Screens

Expected navigation pattern (to be implemented):

```
PostListScreen (default/entry point)
├─ Click post card → EditorScreen (with post ID)
├─ Click "New Post" → EditorScreen (new post)
└─ Click settings → SettingsScreen

EditorScreen
├─ Click back/menu → PostListScreen
└─ Click settings → SettingsScreen

SettingsScreen
└─ Click back → Previous screen
```

---

## 🎨 Theme Support (Dark/Light Mode)

All screens automatically support themes. The `theme` object has:
```tsx
theme.colors.background      // Main background
theme.colors.surface         // Card/elevated surfaces
theme.colors.primary         // Brand color (purple)
theme.colors.text            // Primary text
theme.colors.textSecondary   // Secondary text
theme.colors.border          // Border color
theme.colors.error           // Error red
theme.colors.success         // Success green
```

---

## 🔧 Common Child Component Imports

**All screens might need:**
```tsx
import Toolbar from '../../components/common/Toolbar';
import Button from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
```

**EditorScreen needs:**
```tsx
import DrawingCanvas from '../../components/canvas/DrawingCanvas';
import LayerPanel from '../../components/LayerManager/LayerPanel';
import ToolPalette from '../../components/toolbar/ToolPalette';
```

**PostListScreen needs:**
```tsx
import TwoColumnLayout from '../../components/common/layouts/TwoColumnLayout';
import PostCardList from './PostCardList';
import PostFilters from './PostFilters';
```

**SettingsScreen needs:**
```tsx
import TwoColumnLayout from '../../components/common/layouts/TwoColumnLayout';
import SettingsNavigation from './SettingsNavigation';
import SettingsPanel from './SettingsPanel';
```

---

## 💾 Data Structures Used

### BlogPost (from `usePostStore()`)
```tsx
{
  id: string
  title: string
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  tags: string[]
  layers: DrawingLayer[]
}
```

### DrawingLayer (from `useEditorStore()`)
```tsx
{
  id: string
  type: 'text' | 'drawing'
  visible: boolean
  zIndex: number
  content?: string
  paths?: DrawingPath[]
}
```

### Settings (from `useSettingsStore()`)
```tsx
{
  githubToken: { token, owner, repo, branch }
  hugoConfig: { baseUrl, contentDir, ... }
  editorPreferences: { autoSave, defaultTool, ... }
  appearance: { darkMode, ... }
}
```

---

## ✅ Implementation Checklist

### For each screen, you still need:
- [ ] Child components (see COMPONENT_DEPENDENCY_MAP.md)
- [ ] Zustand store setup
- [ ] Navigation hooks integration
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty states
- [ ] Type definitions for all data structures

### For all screens:
- [ ] useTheme() hook implementation
- [ ] Theme context provider
- [ ] Light/dark theme definitions
- [ ] All common components

---

## 🚀 Next Steps

1. **Create Zustand stores** (editorStore, postStore, settingsStore)
2. **Create useTheme() hook** with theme context
3. **Build critical common components** (Toolbar, Button, TwoColumnLayout)
4. **Build screen-specific components** phase by phase
5. **Test each screen independently**
6. **Implement navigation between screens**
7. **Add error handling and edge cases**

---

## 📚 Related Documentation

- See `COMPONENT_DEPENDENCY_MAP.md` for complete component hierarchy
- See `SCREENS_IMPLEMENTATION.md` for detailed implementation notes
- See `outline.md` for project architecture and tech stack details
