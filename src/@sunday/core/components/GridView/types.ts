import { Layout } from "react-grid-layout";

export interface IGridViewItem {
  props: any;
  type: string;
  key?: string;
}

export interface IGridViewData {
  layouts: Layout[];
  grids: {
    [key: string]: IGridViewItem;
  };
  title?: string;
}

export interface IGridItemPropField {
  key: string;
  label: string;
  type: string;
  options?:
    | {
        key: string;
        value: string;
      }[]
    | ((helpers: any) => {
        key: string;
        value: string;
      }[]);
}

export interface IGridItem {
  type: string;
  label: string;
  component: React.FunctionComponent<any>;
  propsFields?: IGridItemPropField[];
  icon?: React.ReactNode;
  editType?: "jsonschema" | "fields";
  schema?: any;
  uiSchema?: any;
}

// <Grid.component label={xxx}  />
