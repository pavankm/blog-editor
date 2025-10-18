🎨 Theme System Architecture
Theme Configuration (src/styles/theme.ts)
Theme Provider (src/context/ThemeContext.tsx)
Styled Components/NativeBase Integration
Each component uses useTheme() hook to access current theme colors
NativeBase components inherit theme automatically
CSS-in-JS or StyleSheet with theme values

src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── ToolButton.tsx
│   │   ├── Toolbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Badge.tsx
│   │   ├── Tag.tsx
│   │   ├── Modal.tsx
│   │   ├── Divider.tsx
│   │   ├── InfoBox.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── forms/
│   │   │   ├── TextInput.tsx
│   │   │   ├── ToggleSwitch.tsx
│   │   │   ├── SelectInput.tsx
│   │   │   ├── FormGroup.tsx
│   │   │   └── FormSection.tsx
│   │   └── layouts/
│   │       ├── TwoColumnLayout.tsx
│   │       ├── FullscreenLayout.tsx
│   │       └── PageWrapper.tsx
│   │
│   ├── toolbar/
│   │   ├── ColorPicker.tsx
│   │   ├── ThicknessSlider.tsx
│   │   └── ToolPaletteSection.tsx
│   │
│   ├── canvas/
│   │   ├── DrawingCanvas.tsx
│   │   ├── PageIndicator.tsx
│   │   └── AddPageZone.tsx
│   │
│   ├── LayerManager/
│   │   ├── LayerPanel.tsx
│   │   ├── LayerItem.tsx
│   │   └── LayerThumbnail.tsx
│   │
│   ├── screens/
│   │   ├── EditorScreen/
│   │   │   ├── EditorScreen.tsx
│   │   │   ├── PreviewModal.tsx
│   │   │   └── BlogPostPreview.tsx
│   │   │
│   │   ├── PostListScreen/
│   │   │   ├── PostListScreen.tsx
│   │   │   ├── PostCardList.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostFilters.tsx
│   │   │   ├── FilterItem.tsx
│   │   │   ├── SortDropdown.tsx
│   │   │   └── PostSearch.tsx
│   │   │
│   │   └── SettingsScreen/
│   │       ├── SettingsScreen.tsx
│   │       ├── SettingsNavigation.tsx
│   │       ├── NavItem.tsx
│   │       ├── NavSection.tsx
│   │       ├── SettingsPanel.tsx
│   │       ├── SettingsCard.tsx
│   │       ├── SettingItem.tsx
│   │       └── GithubSettings.tsx (example section component)
│   │
│   └── navigation/
│       └── AppNavigator.tsx
│
├── hooks/
│   ├── useTheme.ts
│   ├── useDrawing.ts
│   ├── useKeyboard.ts
│   └── ...
│
├── styles/
│   ├── theme.ts          # Theme definitions (light/dark)
│   ├── colors.ts         # Color palette
│   ├── spacing.ts        # Spacing constants
│   ├── typography.ts     # Font sizes, weights
│   └── shadows.ts        # Shadow definitions
│
├── context/
│   ├── ThemeContext.tsx
│   └── ...
│
├── store/
│   ├── editorStore.ts    # Zustand: canvas, layers, tools
│   ├── postStore.ts      # Zustand: blog posts
│   ├── settingsStore.ts  # Zustand: app settings (theme pref)
│   └── ...
│
├── types/
│   ├── BlogPost.ts
│   ├── DrawingTypes.ts
│   ├── Theme.ts
│   └── ...
│
├── services/
│   ├── storage.ts
│   ├── export.ts
│   └── blogApi.ts
│
├── utils/
│   ├── themeUtils.ts     # Theme helper functions
│   ├── dateFormatters.ts
│   └── ...
│
└── App.tsx


 Component Dependency Graph
App.tsx (ThemeProvider wrapper)
├── AppNavigator
│   ├── EditorScreen
│   │   ├── Toolbar (ColorPicker, ThicknessSlider, ToolButton)
│   │   ├── DrawingCanvas
│   │   ├── LayerPanel (LayerItem)
│   │   └── PreviewModal (BlogPostPreview)
│   │
│   ├── PostListScreen
│   │   ├── Toolbar (SearchBar, ToolButton)
│   │   ├── TwoColumnLayout
│   │   │   ├── PostFilters (FilterItem)
│   │   │   └── PostCardList (PostCard with Badge, Tag)
│   │   └── EmptyState
│   │
│   └── SettingsScreen
│       ├── Toolbar
│       └── TwoColumnLayout
│           ├── SettingsNavigation (NavItem, NavSection)
│           └── SettingsPanel (SettingsCard, SettingItem)