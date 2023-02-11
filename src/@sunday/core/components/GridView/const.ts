import {
  GRID,
  PROGRESS,
  STATS,
  TABLE,
  UI_LABEL,
  FORM,
  UI_INPUT,
  UI_BUTTON,
} from "@sunday/starter/components";
import { IGridItem } from "./types";
import * as NIVO_GRAPH from "@sunday/starter/components/NivoGraph";
import * as CHAKRA from "@sunday/starter/components/Chakra";

export const TOOLBAR: IGridItem[] = [
  STATS,
  PROGRESS,
  GRID,
  TABLE,
  UI_LABEL,
  UI_INPUT,
  UI_BUTTON,
  FORM,
  
  ...Object.values(NIVO_GRAPH),
  ...Object.values(CHAKRA),
];

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