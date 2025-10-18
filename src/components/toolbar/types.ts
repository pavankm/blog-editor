export type BrushSize = "small" | "medium" | "large";

export interface BottomToolbarProps {
  selectedBrushSize: BrushSize;
  onBrushSizeChange: (size: BrushSize) => void;
  onClear: () => void;
  onToolSelect: (tool: string) => void;
}
