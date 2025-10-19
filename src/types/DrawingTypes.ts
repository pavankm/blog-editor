/**
 * Drawing and Layer Types
 */

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: "pen" | "highlighter" | "eraser";
  createdAt: Date;
}

export interface Layer {
  id: string;
  name: string;
  strokes: Stroke[];
  visible: boolean;
  opacity: number;
  zIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  name: string;
  layers: Layer[];
  width: number;
  height: number;
  backgroundColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ToolType = "pen" | "highlighter" | "eraser" | "selection";

export interface DrawingState {
  selectedTool: ToolType;
  selectedColor: string;
  strokeWidth: number;
  opacity: number;
}
