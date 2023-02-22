import { Progress } from "./Progress";
import { FaCircleNotch } from "react-icons/fa";
export const PROGRESS = {
  type: "progress",
  label: "Progress",
  schema: {
    properties: {
      label: {
        title: "Title",
        type: "string",
      },
      dataSourceProgressEndpoint: {
        title: "Data Source Endpoint (Progress)",
        type: "string",
      },
      dataSourceTotalEndpoint: {
        title: "Data Source Endpoint (Total)",
        type: "string",
      },
    },
  },
  component: Progress,
  icon: <FaCircleNotch size={36} />,
};
