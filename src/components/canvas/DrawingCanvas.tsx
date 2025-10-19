import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
} from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import { useTheme } from "../../hooks/useTheme";

interface DrawingCanvasProps {
  currentPost?: any;
  layers?: any[];
  activeLayerId?: string;
  selectedTool?: string;
  selectedColor?: string;
  strokeWidth?: number;
  onPageChange?: (pageIndex: number) => void;
}

export interface DrawingCanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  getCurrentPageIndex: () => number;
  getTotalPages: () => number;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: string;
}

interface Page {
  id: string;
  strokes: Stroke[];
  title: string;
}

const { width: screenWidth } = Dimensions.get("window");
const PAGE_WIDTH = Math.min(700, screenWidth - 40); // Max 700px or screen width - padding
const PAGE_HEIGHT = 900;
const PAGE_MARGIN = 40;

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  (
    {
      currentPost,
      layers,
      activeLayerId,
      selectedTool = "pen",
      selectedColor = "#000000",
      strokeWidth = 3,
      onPageChange,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [pages, setPages] = useState<Page[]>([
      { id: "page-1", strokes: [], title: "Page 1" },
    ]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
    const [undoStack, setUndoStack] = useState<
      { pageIndex: number; stroke: Stroke }[]
    >([]);

    const scrollViewRef = useRef<ScrollView>(null);

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        undo: () => {
          if (undoStack.length === 0) return;

          const lastAction = undoStack[undoStack.length - 1];
          setPages((prev) =>
            prev.map((page, index) =>
              index === lastAction.pageIndex
                ? {
                    ...page,
                    strokes: page.strokes.filter(
                      (stroke) => stroke.id !== lastAction.stroke.id
                    ),
                  }
                : page
            )
          );
          setUndoStack((prev) => prev.slice(0, -1));
        },
        redo: () => {
          // Simple redo - could be enhanced with a proper redo stack
          console.log("Redo not fully implemented yet");
        },
        clear: () => {
          setPages((prev) => prev.map((page) => ({ ...page, strokes: [] })));
          setUndoStack([]);
        },
        getCurrentPageIndex: () => currentPageIndex,
        getTotalPages: () => pages.length,
      }),
      [undoStack, currentPageIndex, pages.length]
    );

    // Notify parent about page changes
    useEffect(() => {
      onPageChange?.(currentPageIndex);
    }, [currentPageIndex, onPageChange]);

    const addNewPage = useCallback(() => {
      const newPageId = `page-${pages.length + 1}`;
      const newPage: Page = {
        id: newPageId,
        strokes: [],
        title: `Page ${pages.length + 1}`,
      };

      setPages((prev) => [...prev, newPage]);

      // Scroll to the new page
      setTimeout(() => {
        if (scrollViewRef.current) {
          const scrollToY = pages.length * (PAGE_HEIGHT + PAGE_MARGIN * 2);
          scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
        }
      }, 100);
    }, [pages.length]);

    // Helper function to check if a point is close to a stroke
    const isPointNearStroke = (
      point: Point,
      stroke: Stroke,
      eraserSize: number = 20
    ): boolean => {
      for (let i = 0; i < stroke.points.length - 1; i++) {
        const p1 = stroke.points[i];
        const p2 = stroke.points[i + 1];

        // Calculate distance from point to line segment
        const A = point.x - p1.x;
        const B = point.y - p1.y;
        const C = p2.x - p1.x;
        const D = p2.y - p1.y;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;

        if (lenSq === 0) {
          // Point is the same as p1
          const distance = Math.sqrt(A * A + B * B);
          return distance <= eraserSize;
        }

        const param = dot / lenSq;
        let xx, yy;

        if (param < 0) {
          xx = p1.x;
          yy = p1.y;
        } else if (param > 1) {
          xx = p2.x;
          yy = p2.y;
        } else {
          xx = p1.x + param * C;
          yy = p1.y + param * D;
        }

        const dx = point.x - xx;
        const dy = point.y - yy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= eraserSize) {
          return true;
        }
      }
      return false;
    };

    // Function to handle erasing
    const handleErasing = (point: Point, pageIndex: number) => {
      const eraserSize = strokeWidth * 4; // Eraser is larger than brush

      setPages((prev) =>
        prev.map((page, index) => {
          if (index !== pageIndex) return page;

          const remainingStrokes = page.strokes.filter(
            (stroke) => !isPointNearStroke(point, stroke, eraserSize)
          );

          return { ...page, strokes: remainingStrokes };
        })
      );
    };

    const handleDrawingStart = (
      event: GestureResponderEvent,
      pageIndex: number
    ) => {
      const { locationX, locationY } = event.nativeEvent;
      setIsDrawing(true);
      setCurrentPageIndex(pageIndex);

      if (selectedTool === "eraser") {
        // Start erasing immediately
        handleErasing({ x: locationX, y: locationY }, pageIndex);
        setCurrentStroke([]); // Don't track stroke for eraser
      } else {
        setCurrentStroke([{ x: locationX, y: locationY }]);
      }
    };

    const handleDrawingMove = (
      event: GestureResponderEvent,
      pageIndex: number
    ) => {
      if (!isDrawing || pageIndex !== currentPageIndex) return;

      const { locationX, locationY } = event.nativeEvent;

      if (selectedTool === "eraser") {
        // Continue erasing
        handleErasing({ x: locationX, y: locationY }, pageIndex);
      } else {
        setCurrentStroke((prev) => [...prev, { x: locationX, y: locationY }]);
      }
    };

    const handleDrawingEnd = (pageIndex: number) => {
      if (!isDrawing || pageIndex !== currentPageIndex) {
        setIsDrawing(false);
        setCurrentStroke([]);
        return;
      }

      // For eraser, we don't create strokes, just finish erasing
      if (selectedTool === "eraser") {
        setIsDrawing(false);
        setCurrentStroke([]);
        return;
      }

      // For pen and highlighter, create strokes as before
      if (currentStroke.length < 2) {
        setIsDrawing(false);
        setCurrentStroke([]);
        return;
      }

      const newStroke: Stroke = {
        id: `stroke-${Date.now()}-${Math.random()}`,
        points: currentStroke,
        color: selectedColor,
        width: strokeWidth,
        tool: selectedTool,
      };

      setPages((prev) =>
        prev.map((page, index) =>
          index === pageIndex
            ? { ...page, strokes: [...page.strokes, newStroke] }
            : page
        )
      );

      // Add to undo stack
      setUndoStack((prev) => [...prev, { pageIndex, stroke: newStroke }]);

      setIsDrawing(false);
      setCurrentStroke([]);
    };

    const createPanResponder = (pageIndex: number) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
          // On web, only capture if we have a drawing tool selected
          if (Platform.OS === "web") {
            return !!(
              selectedTool &&
              selectedTool !== "" &&
              selectedTool !== "none"
            );
          }

          // On native platforms, be more permissive
          return true;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // If no drawing tool is selected, never capture
          if (!selectedTool || selectedTool === "" || selectedTool === "none") {
            return false;
          }

          const { dx, dy, vx, vy } = gestureState;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          // On web, be very conservative - only capture clear drawing gestures
          if (Platform.OS === "web") {
            // If it's primarily vertical movement, let scroll handle it
            if (absDy > absDx && absDy > 5) {
              return false;
            }

            // If very little movement, don't capture
            if (absDx < 3 && absDy < 3) {
              return false;
            }

            // Only capture if movement suggests drawing (horizontal or diagonal)
            return absDx >= absDy || (absDx > 5 && absDy > 5);
          } else {
            // Native platform logic (keep existing)
            const absVx = Math.abs(vx);
            const absVy = Math.abs(vy);

            if (absDy > absDx * 1.5 && absVy > 0.5) {
              return false;
            }

            if (absVy > 1.0 && absVy > absVx * 2) {
              return false;
            }

            if (absDx < 5 && absDy < 5) {
              return false;
            }
          }

          // Otherwise, if we have a drawing tool, capture for drawing
          return true;
        },
        onPanResponderGrant: (event) => handleDrawingStart(event, pageIndex),
        onPanResponderMove: (event) => handleDrawingMove(event, pageIndex),
        onPanResponderRelease: () => handleDrawingEnd(pageIndex),
        onPanResponderTerminate: () => handleDrawingEnd(pageIndex),
      });
    };

    const convertPointsToPath = (points: Point[]): string => {
      if (points.length < 2) return "";

      let path = `M${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L${points[i].x},${points[i].y}`;
      }
      return path;
    };

    const AddPageButton = () => (
      <TouchableOpacity
        style={[
          styles.addPageButton,
          { backgroundColor: theme.colors.surface },
        ]}
        onPress={addNewPage}
      >
        <View
          style={[styles.addPageContent, { borderColor: theme.colors.primary }]}
        >
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.primary}
            strokeWidth="2"
          >
            <Line x1="12" y1="5" x2="12" y2="19" />
            <Line x1="5" y1="12" x2="19" y2="12" />
          </Svg>
          <Text style={[styles.addPageText, { color: theme.colors.primary }]}>
            Add New Page
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={Platform.OS !== "web"} // Disable bounces on web
          scrollEventThrottle={16}
          directionalLockEnabled={Platform.OS !== "web"} // Disable on web
          alwaysBounceVertical={Platform.OS !== "web"}
          decelerationRate="normal"
          maximumZoomScale={1}
          minimumZoomScale={1}
          removeClippedSubviews={false}
        >
          {pages.map((page, pageIndex) => (
            <View key={page.id} style={styles.pageContainer}>
              {/* Page Label */}
              <Text style={[styles.pageLabel, { color: theme.colors.primary }]}>
                {page.title}
              </Text>

              {/* Page Canvas */}
              <View
                style={[
                  styles.pageCanvas,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    shadowColor: theme.colors.primary,
                  },
                ]}
                // Only add pan handlers if we have a valid drawing tool
                {...(selectedTool &&
                selectedTool !== "" &&
                selectedTool !== "none"
                  ? createPanResponder(pageIndex).panHandlers
                  : {})}
              >
                <Svg
                  width={PAGE_WIDTH}
                  height={PAGE_HEIGHT}
                  style={styles.svgCanvas}
                >
                  {/* Render completed strokes */}
                  {page.strokes.map((stroke) => (
                    <Path
                      key={stroke.id}
                      d={convertPointsToPath(stroke.points)}
                      stroke={stroke.color}
                      strokeWidth={stroke.width}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity={stroke.tool === "highlighter" ? 0.3 : 1}
                    />
                  ))}

                  {/* Render current stroke while drawing (not for eraser) */}
                  {isDrawing &&
                    pageIndex === currentPageIndex &&
                    selectedTool !== "eraser" &&
                    currentStroke.length > 1 && (
                      <Path
                        d={convertPointsToPath(currentStroke)}
                        stroke={selectedColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity={selectedTool === "highlighter" ? 0.3 : 1}
                      />
                    )}
                </Svg>
              </View>
            </View>
          ))}

          {/* Add Page Button */}
          <AddPageButton />
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7FF", // Match theme background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: PAGE_MARGIN,
    paddingHorizontal: 20,
  },
  pageContainer: {
    marginBottom: PAGE_MARGIN,
    alignItems: "center",
  },
  pageLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 15,
    marginLeft: -PAGE_WIDTH + 50, // Align to left edge of page
    alignSelf: "flex-start",
    opacity: 0.8,
  },
  pageCanvas: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    borderRadius: 32, // 2rem like HTML
    borderWidth: 1,
    overflow: "hidden",
    elevation: 8,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
  },
  svgCanvas: {
    flex: 1,
  },
  addPageButton: {
    width: PAGE_WIDTH,
    height: 120,
    borderRadius: 32,
    marginTop: PAGE_MARGIN / 2,
    elevation: 4,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
  addPageContent: {
    flex: 1,
    borderWidth: 3,
    borderStyle: "dashed",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(124, 111, 212, 0.05)",
  },
  addPageText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default DrawingCanvas;
