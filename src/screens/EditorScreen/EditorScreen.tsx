import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import Sidebar from "../../components/common/Sidebar";

// EditorScreen Specific Components
import DrawingCanvas from "../../components/canvas/DrawingCanvas";
import ToolPalette from "../../components/toolbar/ToolPalette";
import LayerPanel from "../../components/LayerManager/LayerPanel";
import PageIndicator from "../../components/canvas/PageIndicator";

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
  // Local state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);

  // Mock data for layers
  const [layers, setLayers] = useState([
    { id: "layer-1", name: "Layer 1", visible: true },
    { id: "layer-2", name: "Layer 2", visible: true },
  ]);

  const currentPost = {
    title: "Sample Post",
    id: "1",
  };

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
    const newLayer = {
      id: "layer-" + (layers.length + 1),
      name: "Layer " + (layers.length + 1),
      visible: true,
    };
    setLayers([...layers, newLayer]);
  };

  /**
   * Handle page change from sidebar
   */
  const handleSelectPage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    setIsSidebarVisible(false);
  };

  /**
   * Handle delete layer
   */
  const handleDeleteLayer = (layerId: string) => {
    setLayers(layers.filter((l) => l.id !== layerId));
  };

  /**
   * Handle toggle layer visibility
   */
  const handleToggleLayerVisibility = (layerId: string) => {
    setLayers(
      layers.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l))
    );
  };

  /**
   * Handle export
   */
  const handleExport = (format: "pdf" | "image" | "text") => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        onLeftButtonPress={handleToggleSidebar}
        leftButtonIcon=""
        centerContent={
          <ToolPalette
            selectedTool={selectedTool}
            selectedColor={selectedColor}
            strokeWidth={strokeWidth}
            onToolChange={setSelectedTool}
            onColorChange={setSelectedColor}
            onStrokeWidthChange={setStrokeWidth}
          />
        }
        rightButtons={[
          {
            icon: "",
            onPress: handleOpenPreview,
            label: "Preview",
          },
          {
            icon: "",
            onPress: () => {
              console.log("Publish pressed");
            },
            label: "Publish",
          },
          {
            icon: "",
            onPress: () => {
              console.log("Settings pressed");
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
          activeLayerId={layers[0]?.id}
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
          activeLayerId={layers[0]?.id}
          onSelectLayer={(layerId: string) => {
            console.log("Selected layer:", layerId);
          }}
          onToggleLayerVisibility={handleToggleLayerVisibility}
          onDeleteLayer={handleDeleteLayer}
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
          onExport={handleExport}
        />
      )}
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAFAFA",
    },
    mainContent: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
  });

const styles = createStyles();

export default EditorScreen;
