import { Center, Button, ButtonProps } from "@chakra-ui/react";
import { IGridItem } from "@sunday/core/components/GridView";
import { BsMenuButton } from "react-icons/bs";
import { COMMON_DEFINITION } from "../../../json-schema/definitions";

type Props = {
  button: {
    type: ButtonProps["type"];
    variant: ButtonProps["variant"];
    text: string;
  };
};

const Component = ({ button }: Props) => {
  const {
    type = "button",
    variant = "outline",
    text = "输入按钮内容",
  } = button || {};

  return (
    <Center h="full">
      <Button isFullWidth type={type} variant={variant}>
        {text}
      </Button>
    </Center>
  );
};

export const UI_BUTTON: IGridItem = {
  type: "ui_button",
  label: "按钮",
  propsFields: [],
  component: Component,
  icon: <BsMenuButton size={36} />,
  editType: "jsonschema",
  schema: {
    type: "object",
    definitions: COMMON_DEFINITION,
    properties: {
      button: {
        title: "按钮属性",
        $ref: "#/definitions/button",
      },
    },
  },
};
