# Blog Editor - React Native Expo App

An iPad-optimized blog editing app with layered drawing capabilities, Apple Pencil support, and direct publishing features.

- [Blog Editor - React Native Expo App](#blog-editor---react-native-expo-app)
  - [🎯 Project Overview](#-project-overview)
  - [✨ Key Features](#-key-features)
  - [🛠 Technology Stack](#-technology-stack)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [🔄 Development Loop](#-development-loop)
    - [Quick Start Commands](#quick-start-commands)
    - [Building the App](#building-the-app)
    - [iPad Testing on PC](#ipad-testing-on-pc)
    - [Required Dependencies](#required-dependencies)
  - [🎨 Core Features Implementation](#-core-features-implementation)
    - [Drawing System](#drawing-system)
    - [Export System](#export-system)
    - [Publishing Integration](#publishing-integration)
  - [📱 Target Platform](#-target-platform)
  - [Development Roadmap](#development-roadmap)
    - [Phase 1: Core Drawing \& Text Editing (MVP)](#phase-1-core-drawing--text-editing-mvp)
    - [Phase 2: Enhanced Drawing Features](#phase-2-enhanced-drawing-features)
    - [Phase 3: Export \& Publishing](#phase-3-export--publishing)
    - [Phase 4: Polish \& Optimization](#phase-4-polish--optimization)
  - [🧪 Testing](#-testing)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [📞 Support](#-support)


## 🎯 Project Overview

This app allows you to write and edit blog entries with pen input support, create layered annotations, and publish directly to your website. Designed specifically for iPad with Apple Pencil integration.

## ✨ Key Features

- **Layered Drawing System**: Create multiple drawing layers on top of text content
- **Apple Pencil Support**: Full pressure sensitivity and gesture support
- **Rich Text Editing**: Markdown-supported text editor
- **Export Options**: Export as PDF, image, or text file
- **One-Click Publishing**: Direct publishing to WordPress, Ghost, or custom APIs
- **Post Management**: View all posts with publication status
- **Tool Palette**: Pen, highlighter, eraser with customizable colors and stroke width

## 🛠 Technology Stack

- **React Native 0.73+** with TypeScript
- **Expo SDK 50+** for simplified development and deployment
- **React Navigation 6** for screen navigation
- **react-native-svg** for vector-based drawing and layering
- **react-native-gesture-handler** for Apple Pencil input
- **Zustand** for state management
- **React Query (TanStack Query)** for server state and caching

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── DrawingCanvas/   # Canvas and drawing tools
│   ├── LayerManager/    # Layer visibility and controls
│   ├── ToolPalette/     # Pen tools, colors, thickness
│   └── common/          # Shared UI components
├── screens/             # Main app screens
│   ├── EditorScreen/    # Main editing interface
│   ├── PostListScreen/  # Blog posts management
│   ├── SettingsScreen/  # App configuration
│   └── PublishScreen/   # Publishing options
├── services/            # API and external integrations
│   ├── blogApi.ts       # Publishing service
│   ├── storage.ts       # Local data persistence
│   └── export.ts        # File export utilities
├── store/               # Global state management
│   ├── postStore.ts     # Blog posts state
│   ├── editorStore.ts   # Editor state (layers, tools)
│   └── settingsStore.ts # App settings
├── types/               # TypeScript type definitions
├── utils/               # Helper functions
└── hooks/               # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or physical iPad for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-editor.git
cd blog-editor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on iOS:
```bash
npx expo run:ios
```

## 🔄 Development Loop

### Quick Start Commands

```bash
# Start development server
npm start

# Test on web browser (recommended for PC development)
npm run web

# Test on iPad simulator (requires macOS)
npm run ipad-sim

# Target iPad device specifically
npm run ipad

# Run tests
npm test
```

### Building the App

```bash
# Build for all platforms
npm run build

# Build for iOS only
npm run build:ios

# Build for Android only
npm run build:android
```

### iPad Testing on PC

Since you're developing on Windows for iPad, here are the recommended approaches:

1. **Web Development & Testing:**
   ```bash
   npm run web
   ```
   - Open in Chrome and use DevTools
   - Simulate iPad screen size (1024x768 or 2048x1536)
   - Test touch interactions

2. **Physical iPad Testing:**
   ```bash
   npm start
   ```
   - Install Expo Go app on your iPad
   - Scan the QR code to test on real device
   - Best for testing Apple Pencil functionality

3. **Cloud iOS Simulators:**
   - Use services like BrowserStack or Sauce Labs
   - Test iOS behavior without owning a Mac

### Required Dependencies

The app uses the following key dependencies:

```json
{
  "react-native": "^0.73.0",
  "expo": "^50.0.0",
  "@react-navigation/native": "^6.0.0",
  "react-native-svg": "^14.0.0",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-reanimated": "^3.6.0",
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.0.0",
  "react-native-sqlite-storage": "^6.0.0",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "react-native-html-to-pdf": "^0.12.0",
  "react-native-view-shot": "^3.8.0",
  "axios": "^1.6.0",
  "react-native-fs": "^2.20.0"
}
```

## 🎨 Core Features Implementation

### Drawing System
- Multi-layer vector-based drawing using SVG
- Apple Pencil pressure sensitivity support
- Real-time stroke rendering with smooth performance
- Layer composition and management

### Export System
- PDF generation with embedded drawings
- High-resolution image export
- Plain text extraction from content
- Sharing integration with iOS share sheet

### Publishing Integration
- WordPress REST API support
- Ghost CMS API integration
- Custom webhook publishing
- One-click publishing workflow

## 📱 Target Platform

This app is specifically designed and optimized for:
- **iPad** (all sizes)
- **iOS 14+**
- **Apple Pencil** (1st and 2nd generation)

## Development Roadmap

### Phase 1: Core Drawing & Text Editing (MVP)
- [ ] Basic text editor
- [ ] Simple drawing with pen input
- [ ] Layer system (add/remove/toggle visibility)
- [ ] Basic tool palette (pen, highlighter, eraser)
- [ ] Local storage for posts

### Phase 2: Enhanced Drawing Features
- [ ] Pressure sensitivity
- [ ] Advanced color picker
- [ ] Stroke width adjustment
- [ ] Undo/redo functionality
- [ ] Layer management improvements

### Phase 3: Export & Publishing
- [ ] PDF/image/text export
- [ ] Publishing API integration
- [ ] Post management screen
- [ ] Settings and configuration

### Phase 4: Polish & Optimization
- [ ] Performance optimization
- [ ] iPad-specific UI improvements
- [ ] Accessibility features
- [ ] User onboarding

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run component tests
npm run test:components

# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Expo team for the excellent development platform
- React Native community for drawing and gesture libraries
- Open source contributors

## 📞 Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.

---

**Note**: This is an open-source project designed for educational and personal use. Please ensure you have appropriate permissions before publishing to external blog platforms.
