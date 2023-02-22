import { COMMON_DEFINITION } from "@sunday/starter/json-schema/definitions";
import { IGridItem } from "../components/GridView";
import { TOOLBAR, TOOLBAR_MAP } from "../components/GridView/const";

interface ISundayConfig extends Omit<IGridItem, "component"> {}

export const registerComponent = (components: any[]) => {
  components.forEach((component) => {
    const config = component.config;
    const item = {
      component,
      type: component.type,
      label: component.name,
      ...config,
      schema: {
        type: "object",
        properties: config?.schema || {},
      },
    };
    if (!!TOOLBAR_MAP[item.type]) {
      return;
    }
    TOOLBAR.push(item);
    TOOLBAR_MAP[item.type] = item;
  });

  console.log("TOOLBAR_AFTER", TOOLBAR, TOOLBAR_MAP);
};
