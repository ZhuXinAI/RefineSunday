import { createContext, useContext } from "react";
import { IGridViewItem } from "./types";

export const GridViewContext = createContext<{
  isEditMode: boolean;
  grids: any;
  setGrids: (grids: any) => void;
  editingGrid?: IGridViewItem;
  setEditingGrid: (grid: IGridViewItem) => void;
}>({
  isEditMode: false,
  grids: {},
  setGrids: () => {},
  setEditingGrid: () => {},
});

export const useGridViewContext = () => {
  return useContext(GridViewContext);
};
