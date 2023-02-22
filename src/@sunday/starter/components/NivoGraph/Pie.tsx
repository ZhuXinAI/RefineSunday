import { Center, Input } from "@chakra-ui/react";
import { IGridItem } from "@sunday/frontend-shared/components/GridView/types";
import { BsPieChart } from "react-icons/bs";
import { Pie } from "@nivo/pie";
type Props = {
  dataSource: string;
};

const Component = ({ dataSource }: Props) => {
  return (
    <Center h="full">
      <Pie width={300} height={300} data={[]} legends={[]} />
    </Center>
  );
};

export const NIVO_PIE: IGridItem = {
  type: "nivo_pie",
  label: "Pie Chart",
  schema: {
    properties: {
      dataSource: {
        title: "Data Source",
        type: "string",
        enum: ["Data Space", "Custom JSON"],
      },
    },
  },
  component: Component,
  icon: <BsPieChart size={36} />,
};
