import { ReactNode } from "react";

export interface PageComponentProps {
  children: ReactNode;
}

export interface PageControlProps {
  currentPage: number;
  totalPages: number;
  onAddPage: () => void;
}
