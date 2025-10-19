# Settings Screen Structure Visualization

## Component Hierarchy

```
SettingsScreen (Main Container)
├── Toolbar
│   ├── Left Button (Back/Menu)
│   ├── Title: "Settings"
│   └── Right Buttons (Empty)
│
└── TwoColumnLayout
    ├── LEFT COLUMN (SettingsNavigation)
    │   ├── Title: "Settings"
    │   ├── Divider
    │   └── Navigation Items
    │       ├── GitHub 🔗
    │       ├── Hugo ⚙️
    │       ├── Editor ✏️
    │       ├── Appearance 🎨
    │       ├── Sync & Backup 💾
    │       └── About ℹ️
    │
    └── RIGHT COLUMN (SettingsPanel - ScrollView)
        └── Dynamic Content based on activeSection
            │
            ├── GITHUB Section
            │   ├── Title & Description
            │   ├── Text Input: GitHub Token (secure)
            │   ├── Text Input: Username
            │   ├── Text Input: Repository
            │   ├── Button Group
            │   │   ├── Test Connection
            │   │   └── Disconnect
            │   
            ├── HUGO Section
            │   ├── Title & Description
            │   ├── Text Input: Site Name
            │   ├── Text Input: Content Directory
            │   ├── Text Input: Output Directory
            │   ├── Text Input: Base URL
            │   └── Button: Save Hugo Config
            │
            ├── EDITOR Section
            │   ├── Title & Description
            │   ├── Color Picker Placeholder: Default Pen Color
            │   ├── Slider Placeholder: Pen Width
            │   ├── Toggle Switch: Grid Snap
            │   ├── Slider Placeholder: Grid Size
            │   └── Text Input: Auto-save Interval
            │
            ├── APPEARANCE Section
            │   ├── Title & Description
            │   ├── Toggle Switch: Dark Mode
            │   ├── Color Picker Placeholder: Accent Color
            │   └── Button Group: Font Size
            │       ├── Small
            │       ├── Medium (default)
            │       └── Large
            │
            ├── SYNC Section
            │   ├── Title & Description
            │   ├── Toggle Switch: Auto Sync
            │   ├── Info Text: Last Sync
            │   ├── Text Input: Sync Interval
            │   ├── Button: Sync Now
            │   └── Button: Backup Now
            │
            └── ABOUT Section
                ├── App Name: 📝 Blog Editor
                ├── Version: 1.0.0
                ├── Description
                ├── Link Group
                │   ├── Documentation
                │   ├── GitHub Repository
                │   ├── Report Issue
                │   └── License
                └── Credits Section
                    └── Technology Stack
```

## SettingsNavigation Layout

```
┌─────────────────────────────────────────┐
│           Settings (Title)              │
├─────────────────────────────────────────┤
│                                         │
│  🔗  GitHub          [Active: bg fill]  │
│  ⚙️   Hugo            [border-left]     │
│  ✏️   Editor                            │
│  🎨  Appearance                         │
│  💾  Sync & Backup                      │
│  ℹ️   About                             │
│                                         │
└─────────────────────────────────────────┘
```

## SettingsPanel - GitHub Section Example

```
┌──────────────────────────────────────────────────────────┐
│ GitHub Integration                                       │
│ Configure your GitHub repository for publishing your    │
│ blog posts.                                             │
│                                                          │
│ GitHub Token                                            │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ghp_xxxxxxxxxxxx (masked)       [Input Field]     │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ Username                                                │
│ ┌────────────────────────────────────────────────────┐ │
│ │ your-username                   [Input Field]     │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ Repository                                              │
│ ┌────────────────────────────────────────────────────┐ │
│ │ your-repo                       [Input Field]     │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌────────────────────┐  ┌────────────────────┐         │
│ │ Test Connection    │  │ Disconnect         │         │
│ └────────────────────┘  └────────────────────┘         │
└──────────────────────────────────────────────────────────┘
```

## Theme-Aware Styling

### Light Theme
```
Background: #f8fafc (light slate)
Surface: #ffffff (white)
Text: #1e293b (dark slate)
Primary: #7c3aed (purple)
Border: #e2e8f0 (light border)
```

### Dark Theme
```
Background: #0f172a (dark blue)
Surface: #1e293b (dark slate)
Text: #f1f5f9 (light text)
Primary: #a78bfa (light purple)
Border: #334155 (dark border)
```

## Key Features

✅ **Modular Components** - Each section is independently rendered
✅ **Type-Safe** - Full TypeScript support with interfaces
✅ **Theme Support** - Adapts to light/dark mode
✅ **Scrollable Content** - ScrollView handles overflow
✅ **Two-Column Layout** - Navigation on left, content on right
✅ **Form Inputs** - Text, number, toggle, and color inputs
✅ **Visual Hierarchy** - Clear titles, descriptions, and sections
✅ **Touch-Friendly** - Adequate button sizes and spacing
