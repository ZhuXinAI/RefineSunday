import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { FaForumbee } from "react-icons/fa";
import { IGridItem } from "@sunday/core/components/GridView";

type Props = {
  title: string;
  subtitle: string;
};

const Component = ({ title = "输入表单标题", subtitle = "" }: Props) => {
  return (
    <Center h="full">
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </Center>
  );
};

export const FORM: IGridItem = {
  type: "form",
  label: "表单",
  propsFields: [
    {
      key: "title",
      label: "表单标题",
      type: "text",
    },
    {
      key: "title",
      label: "表单副标题",
      type: "text",
    },
  ],
  component: Component,
  icon: <FaForumbee size={36} />,
};
