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
  label: "圆饼图",
  propsFields: [
    {
      key: "dataSource",
      label: "数据来源",
      type: "select",
      options: [
        {
          key: "space",
          value: "数据空间",
        },
        {
          key: "custom_json",
          value: "自定义json",
        },
      ],
    },
  ],
  component: Component,
  icon: <BsPieChart size={36} />,
};
