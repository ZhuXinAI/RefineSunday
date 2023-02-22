import { IGridItem } from "./types";

export const TOOLBAR: IGridItem[] = [];

export const TOOLBAR_MAP: {
  [key: string]: IGridItem;
} = TOOLBAR.reduce(
  (acc, item) => ({
    ...acc,
    [item.type]: item,
  }),
  {}
);

if (typeof window !=='undefined') {
  (window as any).TOOLBAR = TOOLBAR;
}