import { Center, Input } from "@chakra-ui/react";
import { IGridItem } from "@sunday/core/components/GridView";
import { BsInputCursor } from "react-icons/bs";
import { COMMON_DEFINITION } from "../../../json-schema/definitions";
import { useController } from "react-hook-form";

type Props = {
  placeholder: string;
  type: string;
  name: string;
  isInForm: boolean;
};

const FormInputComponent = ({
  name,
  placeholder,
  type,
}: {
  name: string;
  placeholder: string;
  type: string;
}) => {
  const { field } = useController({ name });
  return <Input {...field} type={type} placeholder={placeholder} />;
};

const Component = ({ placeholder, type, name, isInForm }: Props) => {
  return (
    <Center h="full">
      {isInForm ? (
        <FormInputComponent name={name} type={type} placeholder={placeholder} />
      ) : (
        <Input name={name} type={type} placeholder={placeholder}></Input>
      )}
    </Center>
  );
};

export const UI_INPUT: IGridItem = {
  type: "ui_input",
  label: "输入框",
  propsFields: [],
  editType: "jsonschema",
  schema: {
    type: "object",
    definitions: COMMON_DEFINITION,
    properties: {
      name: {
        type: "string",
        title: "表单字段名（英文）",
      },
      title: {
        type: "string",
        title: "表单标题",
      },
      placeholder: {
        type: "string",
        title: "占位符",
      },
      isInForm: {
        type: "boolean",
        title: "属于表单",
      },
    },
  },
  component: Component,
  icon: <BsInputCursor size={36} />,
};
