import { Stats } from "./Stats";
import { BiStats } from "react-icons/bi";
export const STATS = {
  type: "stat",
  label: "Stat",
  propsFields: [
    {
      key: "label",
      label: "标题",
      type: "text",
    },
    {
      key: "dataSourceEndpoint",
      label: "数据端点",
      type: "text",
    },
  ],
  component: Stats,
  icon: <BiStats size={36} />,
};
