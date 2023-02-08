import { Progress } from "./Progress";
import { FaCircleNotch } from "react-icons/fa";
export const PROGRESS = {
  type: "progress",
  label: "Progress",
  propsFields: [
    {
      key: "title",
      label: "标题",
      type: "text",
    },
    {
      key: "dataSourceProgressEndpoint",
      label: "数据端点（计算值）",
      type: "text",
    },
    {
      key: "dataSourceTotalEndpoint",
      label: "数据端点（总值）",
      type: "text",
    },
  ],
  component: Progress,
  icon: <FaCircleNotch size={36} />,
};
