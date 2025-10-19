import { create } from "zustand";
import type { Layer, Page, ToolType } from "../types/DrawingTypes";
import type BlogPost from "../types/BlogPost";

interface EditorStoreState {
  // Current document
  currentPost: BlogPost | null;
  pages: Page[];
  currentPageIndex: number;

  // Active editing state
  layers: Layer[];
  activeLayerId: string | null;
  selectedTool: ToolType;
  selectedColor: string;
  strokeWidth: number;
  opacity: number;

  // UI state
  isGridVisible: boolean;
  isSidebarVisible: boolean;
  isPreviewVisible: boolean;
  zoom: number;

  // Actions: Document
  setCurrentPost: (post: BlogPost) => void;
  addPage: (page: Page) => void;
  removePage: (pageId: string) => void;
  setCurrentPageIndex: (index: number) => void;

  // Actions: Layers
  addLayer: (name: string) => void;
  deleteLayer: (layerId: string) => void;
  toggleLayerVisibility: (layerId: string) => void;
  setActiveLayer: (layerId: string) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  renameLayer: (layerId: string, newName: string) => void;

  // Actions: Drawing tools
  setActiveTool: (tool: ToolType) => void;
  updateColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;
  updateOpacity: (opacity: number) => void;

  // Actions: UI
  toggleGrid: () => void;
  toggleSidebar: (visible?: boolean) => void;
  togglePreview: (visible?: boolean) => void;
  setZoom: (zoom: number) => void;

  // Actions: Reset
  clearEditor: () => void;
}

const initialState = {
  currentPost: null,
  pages: [],
  currentPageIndex: 0,
  layers: [],
  activeLayerId: null,
  selectedTool: "pen" as ToolType,
  selectedColor: "#000000",
  strokeWidth: 2,
  opacity: 1,
  isGridVisible: false,
  isSidebarVisible: false,
  isPreviewVisible: false,
  zoom: 1,
};

export const useEditorStore = create<EditorStoreState>((set, get) => ({
  ...initialState,

  // Document actions
  setCurrentPost: (post: BlogPost) => {
    set({ currentPost: post });
  },

  addPage: (page: Page) => {
    set((state) => ({
      pages: [...state.pages, page],
      layers: page.layers,
    }));
  },

  removePage: (pageId: string) => {
    set((state) => ({
      pages: state.pages.filter((p) => p.id !== pageId),
      currentPageIndex: Math.max(0, state.currentPageIndex - 1),
    }));
  },

  setCurrentPageIndex: (index: number) => {
    set((state) => {
      const page = state.pages[index];
      return {
        currentPageIndex: index,
        layers: page ? page.layers : [],
        activeLayerId: page?.layers[0]?.id ?? null,
      };
    });
  },

  // Layer actions
  addLayer: (name: string) => {
    set((state) => {
      const newLayer: Layer = {
        id: `layer-${Date.now()}`,
        name,
        strokes: [],
        visible: true,
        opacity: 1,
        zIndex: state.layers.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedLayers = [...state.layers, newLayer];
      const currentPage = state.pages[state.currentPageIndex];

      if (currentPage) {
        currentPage.layers = updatedLayers;
      }

      return {
        layers: updatedLayers,
        activeLayerId: newLayer.id,
      };
    });
  },

  deleteLayer: (layerId: string) => {
    set((state) => {
      const updatedLayers = state.layers.filter((l) => l.id !== layerId);
      const currentPage = state.pages[state.currentPageIndex];

      if (currentPage) {
        currentPage.layers = updatedLayers;
      }

      return {
        layers: updatedLayers,
        activeLayerId:
          state.activeLayerId === layerId
            ? updatedLayers[0]?.id ?? null
            : state.activeLayerId,
      };
    });
  },

  toggleLayerVisibility: (layerId: string) => {
    set((state) => {
      const updatedLayers = state.layers.map((l) =>
        l.id === layerId ? { ...l, visible: !l.visible } : l
      );

      const currentPage = state.pages[state.currentPageIndex];
      if (currentPage) {
        currentPage.layers = updatedLayers;
      }

      return { layers: updatedLayers };
    });
  },

  setActiveLayer: (layerId: string) => {
    set({ activeLayerId: layerId });
  },

  reorderLayers: (fromIndex: number, toIndex: number) => {
    set((state) => {
      const updatedLayers = [...state.layers];
      const [removed] = updatedLayers.splice(fromIndex, 1);
      updatedLayers.splice(toIndex, 0, removed);

      // Update zIndex
      updatedLayers.forEach((layer, index) => {
        layer.zIndex = index;
      });

      const currentPage = state.pages[state.currentPageIndex];
      if (currentPage) {
        currentPage.layers = updatedLayers;
      }

      return { layers: updatedLayers };
    });
  },

  renameLayer: (layerId: string, newName: string) => {
    set((state) => {
      const updatedLayers = state.layers.map((l) =>
        l.id === layerId ? { ...l, name: newName, updatedAt: new Date() } : l
      );

      const currentPage = state.pages[state.currentPageIndex];
      if (currentPage) {
        currentPage.layers = updatedLayers;
      }

      return { layers: updatedLayers };
    });
  },

  // Drawing tool actions
  setActiveTool: (tool: ToolType) => {
    set({ selectedTool: tool });
  },

  updateColor: (color: string) => {
    set({ selectedColor: color });
  },

  updateStrokeWidth: (width: number) => {
    set({ strokeWidth: Math.max(1, Math.min(50, width)) });
  },

  updateOpacity: (opacity: number) => {
    set({ opacity: Math.max(0, Math.min(1, opacity)) });
  },

  // UI actions
  toggleGrid: () => {
    set((state) => ({ isGridVisible: !state.isGridVisible }));
  },

  toggleSidebar: (visible?: boolean) => {
    set((state) => ({
      isSidebarVisible: visible ?? !state.isSidebarVisible,
    }));
  },

  togglePreview: (visible?: boolean) => {
    set((state) => ({
      isPreviewVisible: visible ?? !state.isPreviewVisible,
    }));
  },

  setZoom: (zoom: number) => {
    set({ zoom: Math.max(0.1, Math.min(5, zoom)) });
  },

  // Reset
  clearEditor: () => {
    set(initialState);
  },
}));
