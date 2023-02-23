import { Center, Text } from "@chakra-ui/react";
import { IGridItem } from "@sunday/core/components/GridView";
import { BiText } from "react-icons/bi";

type Props = {
  value: string;
};

export const Component = ({ value = "输入文字" }: Props) => {
  return (
    <Center h="full">
      <Text>{value}</Text>
    </Center>
  );
};

export const UI_LABEL: IGridItem = {
  type: "ui_label",
  label: "文字",
  propsFields: [
    {
      key: "value",
      label: "文字内容",
      type: "text",
    },
  ],
  component: Component,
  icon: <BiText size={36} />,
};
