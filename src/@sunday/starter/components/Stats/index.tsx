import { Stats } from "./Stats";
import { BiStats } from "react-icons/bi";
export const STATS = {
  schema: {
    properties: {
      label: {
        title: "Label",
        type: "string",
      },
      dataSourceEndpoint: {
        title: "Data Source Endpoint",
        type: "string",
      },
    },
  },
  type: "stat",
  label: "Stat",
  component: Stats,
  icon: <BiStats size={36} />,
};
