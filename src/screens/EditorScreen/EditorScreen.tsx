import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useEditorStore } from "../../store/editorStore";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import Sidebar from "../../components/common/Sidebar";

// EditorScreen Specific Components
import DrawingCanvas from "../../components/canvas/DrawingCanvas";
import ToolPalette from "../../components/toolbar/ToolPalette";
import LayerPanel from "../../components/LayerManager/LayerPanel";
import PageIndicator from "../../components/canvas/PageIndicator";
import PreviewModal from "./PreviewModal";

/**
 * EditorScreen
 *
 * Main editing interface for blog posts with:
 * - Drawing canvas with pen/highlighter/eraser support
 * - Layer management sidebar
 * - Tool palette (colors, thickness, tools)
 * - Page management and preview
 * - Export and publish functionality
 */
export const EditorScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Zustand store for editor state
  const {
    currentPost,
    layers,
    activeLayerId,
    selectedTool,
    selectedColor,
    strokeWidth,
    addLayer,
    deleteLayer,
    toggleLayerVisibility,
    setActiveTool,
    updateStrokeWidth,
    updateColor,
  } = useEditorStore();

  // Local state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  /**
   * Handle toolbar left button (menu/sidebar toggle)
   */
  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  /**
   * Handle preview/export button
   */
  const handleOpenPreview = () => {
    setIsPreviewVisible(true);
  };

  /**
   * Handle close preview modal
   */
  const handleClosePreview = () => {
    setIsPreviewVisible(false);
  };

  /**
   * Handle adding a new page/layer
   */
  const handleAddPage = () => {
    addLayer();
  };

  /**
   * Handle page change from sidebar
   */
  const handleSelectPage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    setIsSidebarVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        onLeftButtonPress={handleToggleSidebar}
        leftButtonIcon="menu"
        centerContent={
          <ToolPalette
            selectedTool={selectedTool}
            selectedColor={selectedColor}
            strokeWidth={strokeWidth}
            onToolChange={setActiveTool}
            onColorChange={updateColor}
            onStrokeWidthChange={updateStrokeWidth}
          />
        }
        rightButtons={[
          {
            icon: "eye",
            onPress: handleOpenPreview,
            label: "Preview",
          },
          {
            icon: "upload",
            onPress: () => {
              // TODO: Handle publish
            },
            label: "Publish",
          },
          {
            icon: "settings",
            onPress: () => {
              // TODO: Navigate to settings
            },
            label: "Settings",
          },
        ]}
      />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Drawing Canvas */}
        <DrawingCanvas
          currentPost={currentPost}
          layers={layers}
          activeLayerId={activeLayerId}
          selectedTool={selectedTool}
          selectedColor={selectedColor}
          strokeWidth={strokeWidth}
          onPageChange={setCurrentPageIndex}
        />

        {/* Page Indicator Badge */}
        <PageIndicator
          currentPage={currentPageIndex + 1}
          totalPages={layers.length}
        />
      </View>

      {/* Left Sidebar - Layer/Page Manager */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        position="left"
      >
        <LayerPanel
          layers={layers}
          activeLayerId={activeLayerId}
          onSelectLayer={(layerId) => {
            // TODO: Update active layer in store
          }}
          onToggleLayerVisibility={toggleLayerVisibility}
          onDeleteLayer={deleteLayer}
          onAddLayer={handleAddPage}
          currentPageIndex={currentPageIndex}
          onSelectPage={handleSelectPage}
        />
      </Sidebar>

      {/* Preview Modal */}
      {isPreviewVisible && (
        <PreviewModal
          post={currentPost}
          layers={layers}
          isVisible={isPreviewVisible}
          onClose={handleClosePreview}
          onExport={(format: "pdf" | "image" | "text") => {
            // TODO: Handle export
            console.log(`Export as ${format}`);
          }}
        />
      )}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    mainContent: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
  });

export default EditorScreen;
