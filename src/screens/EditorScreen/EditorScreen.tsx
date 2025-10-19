import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

// Common Components
import Toolbar from "../../components/common/Toolbar";
import Sidebar from "../../components/common/Sidebar";
import NavigationMenu from "../../components/common/NavigationMenu";

// EditorScreen Specific Components
import DrawingCanvas, {
  DrawingCanvasRef,
} from "../../components/canvas/DrawingCanvas";
import ToolPalette from "../../components/toolbar/ToolPalette";
import LayerPanel from "../../components/LayerManager/LayerPanel";
import PageIndicator from "../../components/canvas/PageIndicator";

// Theme
import { useTheme } from "../../hooks/useTheme";

// SVG Icons for toolbar buttons (from HTML)
const PreviewIcon = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const UndoIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M3 7v6h6" />
    <Path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
  </Svg>
);

const RedoIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <Path d="M21 7v6h-6" />
    <Path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
  </Svg>
);

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
  const drawingCanvasRef = useRef<DrawingCanvasRef>(null);

  // Local state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#000000"); // Match new palette default (black)
  const [strokeWidth, setStrokeWidth] = useState(3); // Match HTML default value

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
   * Handle navigation from NavigationMenu
   */
  const handleNavigate = (screen: string) => {
    console.log(`Navigate to: ${screen}`);
    // TODO: Implement actual navigation logic
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
   * Handle page change from canvas
   */
  const handlePageChange = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    // Update total pages from canvas
    const totalPagesFromCanvas = drawingCanvasRef.current?.getTotalPages() || 1;
    setTotalPages(totalPagesFromCanvas);
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
   * Handle undo action
   */
  const handleUndo = () => {
    drawingCanvasRef.current?.undo();
  };

  /**
   * Handle redo action
   */
  const handleRedo = () => {
    drawingCanvasRef.current?.redo();
  };

  /**
   * Handle export
   */
  const handleExport = (format: "pdf" | "image" | "text") => {
    console.log(`Exporting as ${format}`);
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <Toolbar
        centerContent={
          <View style={styles.compactToolPalette}>
            <ToolPalette
              selectedTool={selectedTool}
              selectedColor={selectedColor}
              strokeWidth={strokeWidth}
              onToolChange={setSelectedTool}
              onColorChange={setSelectedColor}
              onStrokeWidthChange={setStrokeWidth}
              compact={true}
            />
          </View>
        }
        rightButtons={[]}
      />

      {/* Right Toolbar Buttons - positioned absolute */}
      <View style={styles.rightToolbarContainer}>
        <TouchableOpacity
          style={[styles.toolButton, styles.previewButton]}
          onPress={handleOpenPreview}
        >
          <PreviewIcon color={theme.colors.primary || "#7C6FD4"} size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} onPress={handleUndo}>
          <UndoIcon color={theme.colors.primary || "#7C6FD4"} size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} onPress={handleRedo}>
          <RedoIcon color={theme.colors.primary || "#7C6FD4"} size={20} />
        </TouchableOpacity>
      </View>

      {/* Navigation Menu - positioned absolute in top-right */}
      <View style={styles.navigationMenuContainer}>
        <NavigationMenu onNavigate={handleNavigate} />
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Drawing Canvas */}
        <DrawingCanvas
          ref={drawingCanvasRef}
          currentPost={currentPost}
          layers={layers}
          activeLayerId={layers[0]?.id}
          selectedTool={selectedTool}
          selectedColor={selectedColor}
          strokeWidth={strokeWidth}
          onPageChange={handlePageChange}
        />

        {/* Page Indicator Badge */}
        <PageIndicator
          currentPage={currentPageIndex + 1}
          totalPages={totalPages}
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
      {/* TODO: Import PreviewModal component */}
      {isPreviewVisible && (
        <View>
          {/* PreviewModal component will be added when imported */}
          {/* <PreviewModal
            post={currentPost}
            layers={layers}
            isVisible={isPreviewVisible}
            onClose={handleClosePreview}
            onExport={handleExport}
          /> */}
        </View>
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
    navigationMenuContainer: {
      position: "absolute",
      top: theme.spacing.sm,
      right: theme.spacing.sm,
      zIndex: 10,
    },
    compactToolPalette: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: theme.spacing.xs,
      maxHeight: theme.layout.toolbarHeight - theme.spacing.sm,
      overflow: "hidden",
    },
    rightToolbarContainer: {
      position: "absolute",
      top: theme.spacing.sm,
      right: 60, // Position to the left of navigation menu
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      zIndex: 9,
    },
    toolButton: {
      width: 40,
      height: 40,
      borderRadius: 20, // Circular like in HTML
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
      ...theme.shadow.sm,
    },
    previewButton: {
      // Special styling for preview button if needed
    },
  });

export default EditorScreen;
