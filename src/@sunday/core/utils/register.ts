import { COMMON_DEFINITION } from "@sunday/starter/json-schema/definitions";
import { IGridItem } from "../components/GridView";
import { TOOLBAR, TOOLBAR_MAP } from "../components/GridView/const";

interface ISundayConfig extends Omit<IGridItem, "component"> {}

export const registerComponent = (
  component: any,
  inputConfig?: ISundayConfig
) => {
  const config = inputConfig || component.config;

  const item = {
    component,
    type: component.name,
    label: component.name,
    ...config,
    schema: {
      type: "object",
      properties: config?.schema || {},
    },
  };
  console.log("config item", item);
  TOOLBAR.push(item);
  TOOLBAR_MAP[item.type] = item;
  console.log("Updated Toolbar", TOOLBAR);
};
