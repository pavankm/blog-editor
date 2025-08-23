## The Idea

I want an app that I can use to write my blog entries and edit it, and and then post it on to my website

- The app will be used on ipad
- So it has to allow for pen input
- I want to be have an editing mode in which I can create a new "layer" on top of the existing content
- That way the bottom layer/content can be seen without the highlights
- each layer should work with the pencil and I should be able to erase content
- i want to be able to change the stroke thickness & color & highlighter
- Then I want to be able to export the final result as an image, PDF, or text file
- Then with one click, I want to be able to publish the post directly to my website
- I want another screen where I can see the list of all the blog posts I have written w/ an indication of which ones are published
- There is no need to preserve the converted text file, image, or PDF in the app itself
- For the first version, I want to focus on the core features and get user feedback before adding more advanced functionality.

---

## React Native Blog Editor App - Development Outline for GitHub Copilot

## Project Overview
Create an open-source iPad blog editing app with layered drawing capabilities, Apple Pencil support, and direct publishing features.

## Technology Stack

### Core Framework
- **React Native 0.73+** with TypeScript
- **Expo SDK 50+** for simplified development and deployment
- **React Navigation 6** for screen navigation

### Drawing & Pen Input
- **react-native-svg** for vector-based drawing and layering
- **react-native-gesture-handler** for smooth Apple Pencil input
- **react-native-reanimated 3** for performant animations
- **react-native-skia** for advanced canvas operations (alternative to SVG)

### State Management
- **Zustand** for global state management (lightweight Redux alternative)
- **React Query (TanStack Query)** for server state and caching

### Storage & Persistence
- **@react-native-async-storage/async-storage** for app settings
- **react-native-sqlite-storage** for blog posts and layer data
- **react-native-fs** for file system operations

### Export Capabilities
- **react-native-html-to-pdf** for PDF generation
- **react-native-view-shot** for image exports
- **@react-native-community/share** for sharing exported files

### UI Components
- **NativeBase** or **React Native Elements** for consistent UI
- **react-native-vector-icons** for iconography
- **@react-native-picker/picker** for color/tool selection

### Publishing Integration
- **axios** for HTTP requests to blog APIs
- Support for: WordPress REST API, Ghost API, custom webhooks

## App Architecture

### Folder Structure
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

## Core Features Implementation

### 1. Drawing System
```typescript
// Types for drawing system
interface DrawingLayer {
  id: string;
  type: 'text' | 'drawing';
  visible: boolean;
  zIndex: number;
  content?: string; // for text layers
  paths?: DrawingPath[]; // for drawing layers
}

interface DrawingPath {
  id: string;
  points: Point[];
  color: string;
  strokeWidth: number;
  tool: 'pen' | 'highlighter' | 'eraser';
}

interface Point {
  x: number;
  y: number;
  pressure?: number; // Apple Pencil pressure
  timestamp: number;
}
```

### 2. Editor State Management
```typescript
// Zustand store structure
interface EditorState {
  currentPost: BlogPost | null;
  layers: DrawingLayer[];
  activeLayerId: string;
  selectedTool: Tool;
  strokeWidth: number;
  selectedColor: string;
  isDrawing: boolean;
  
  // Actions
  addLayer: () => void;
  deleteLayer: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  setActiveTool: (tool: Tool) => void;
  updateStrokeWidth: (width: number) => void;
  updateColor: (color: string) => void;
}
```

### 3. Blog Post Data Model
```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  layers: DrawingLayer[];
  published: boolean;
  publishedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  metadata: {
    wordCount: number;
    estimatedReadTime: number;
  };
}
```

### 4. Screen Components Structure

#### EditorScreen
- **TextEditor**: Rich text editing with markdown support
- **DrawingCanvas**: SVG-based canvas with gesture handling
- **LayerPanel**: Layer management sidebar
- **ToolPalette**: Drawing tools, colors, stroke width
- **ExportToolbar**: Export options (PDF, image, text)
- **PublishButton**: One-click publishing

#### PostListScreen
- **PostCard**: Individual post preview with status
- **FilterTabs**: All, Draft, Published
- **SearchBar**: Find posts by title/content
- **CreatePostFAB**: Floating action button for new posts

### 5. Drawing Canvas Implementation
```typescript
// Main canvas component structure
const DrawingCanvas = () => {
  // Use react-native-svg for layered drawing
  // Implement gesture handlers for Apple Pencil
  // Support pressure sensitivity
  // Real-time stroke rendering
  // Layer composition
};
```

### 6. Export System
```typescript
// Export service structure
export class ExportService {
  static async exportToPDF(post: BlogPost): Promise<string>
  static async exportToImage(canvasRef: any): Promise<string>
  static async exportToText(post: BlogPost): Promise<string>
}
```

### 7. Publishing Integration
```typescript
// Publishing service
export class PublishingService {
  static async publishToWordPress(post: BlogPost, credentials: any): Promise<string>
  static async publishToGhost(post: BlogPost, credentials: any): Promise<string>
  static async publishToCustom(post: BlogPost, webhook: string): Promise<string>
}
```

## Development Phases

### Phase 1: Core Drawing & Text Editing (MVP)
- Basic text editor
- Simple drawing with pen input
- Layer system (add/remove/toggle visibility)
- Basic tool palette (pen, highlighter, eraser)
- Local storage for posts

### Phase 2: Enhanced Drawing Features
- Pressure sensitivity
- Advanced color picker
- Stroke width adjustment
- Undo/redo functionality
- Layer management improvements

### Phase 3: Export & Publishing
- PDF/image/text export
- Publishing API integration
- Post management screen
- Settings and configuration

### Phase 4: Polish & Optimization
- Performance optimization
- iPad-specific UI improvements
- Accessibility features
- User onboarding

## Key Dependencies
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

## Development Guidelines for Copilot

1. **Use TypeScript throughout** for better code generation
2. **Implement proper error handling** for all async operations
3. **Follow React Native best practices** for performance
4. **Create reusable components** for drawing tools and UI elements
5. **Implement proper state management** with Zustand stores
6. **Add proper TypeScript interfaces** for all data structures
7. **Include gesture handling** for Apple Pencil input
8. **Optimize for iPad screen sizes** and orientations
9. **Implement proper layer rendering order** in the drawing system
10. **Add comprehensive error boundaries** for crash prevention

## Testing Strategy
- **Unit tests** for utility functions and stores
- **Component tests** for UI components
- **Integration tests** for drawing system
- **E2E tests** for critical user flows
- **Performance testing** for drawing operations

This outline provides a comprehensive foundation for GitHub Copilot to generate a well-structured React Native app with all the requested features.