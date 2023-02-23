import React from "react";
import { Center, Input } from "@chakra-ui/react";
import { BsPieChart } from "react-icons/bs";
import { Pie } from "@nivo/pie";
import { SundayComponent } from "@sunday/core/types/sunday";
type Props = {
  dataSource: string;
};

export const CustomPie: React.FC<Props> = ({ dataSource }) => {
  return (
    <Center h="full">
      <Pie width={300} height={300} data={[]} legends={[]} />
    </Center>
  );
};

(Pie as SundayComponent).config = {
  type: "nivo_pie",
  label: "Pie Chart",
  schema: {
    properties: {
      dataSource: {
        title: "Data Source",
        type: "string",
      },
    },
  },
  component: CustomPie,
  icon: <BsPieChart size={36} />,
};
