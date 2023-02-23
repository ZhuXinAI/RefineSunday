import { Grid } from "./Grid";
import { FaBox } from "react-icons/fa";
import { COMMON_DEFINITION } from "../../json-schema/definitions";
import { IGridItem } from "@sunday/core/components/GridView";
export const GRID: IGridItem = {
  type: "grid",
  label: "Grid",
  propsFields: [],
  component: Grid,
  icon: <FaBox size={36} />,
  editType: "jsonschema",
  schema: {
    type: "object",
    definitions: COMMON_DEFINITION,
    properties: {
      isForm: {
        type: "boolean",
        title: "是否为表单",
      },
      form: {
        type: "object",
        title: "",
        properties: {
          endpoint: {
            type: "string",
            title: "表单发送服务器地址"
          },
          redirectAfterSuccess: {
            type: "string",
            title: "提交成功跳转地址"
          }
        }
      }
    },
  },
};
