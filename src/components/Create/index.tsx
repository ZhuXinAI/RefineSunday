import React, { useCallback, useMemo } from "react";
import {
  Breadcrumb,
  Create as RefineCreate,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@pankod/refine-chakra-ui";
import { useForm } from "@pankod/refine-react-hook-form";

interface formItem {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: any[];
  required?: boolean;
}

interface Props {
  title: string | React.ReactNode;
  resource?: string;
  withBreadcrumb?: boolean;
  wrapperProps?: any;
  fields: any[];
}

export const Create: React.FC<Props> = ({
  title,
  resource,
  withBreadcrumb,
  wrapperProps,
  fields = [],
}) => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    formState: { errors },
  } = useForm();
  const renderTitle = useMemo(() => {
    if (typeof title === "string") {
      return <Heading size="lg">{title}</Heading>;
    }
    return title;
  }, [title]);

  const renderField = useCallback((field: any) => {
    switch (field?.type) {
      case "select":
        return (
          <Select
            id={field?.id || field?.label}
            placeholder={field?.placeholder}
            required={field?.required}
          >
            {field?.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
    
      default:
        return <Input id={field?.id || field?.label} type="text" {...field} />;
    }
  }, []);
  return (
    <RefineCreate
      isLoading={formLoading}
      saveButtonProps={{ ...saveButtonProps }}
      title={renderTitle}
      resource={resource}
      breadcrumb={withBreadcrumb ? <Breadcrumb /> : null}
      wrapperProps={{ ...wrapperProps }}
    >
      {fields.map((field) => (
        <FormControl mb="3" isInvalid={!!errors?.title}>
          <FormLabel>{field.label}</FormLabel>
          {renderField(field)}
          <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
        </FormControl>
      ))}
    </RefineCreate>
  );
};

(Create as any).config = {
  schema: {
    title: {
      title: "Title",
      type: "string",
    },
    withBreadcrumb:{
        title: "With Breadcrumb",
        type: "boolean",
    },
    fields: {
      title: "Fields",
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["text", "select", "boolean"],
          },
          required: {
            type: "boolean",
          },
          placeholder: {
            type: "string",
          },
        },
      },
    },
  },
  type: "create",
  label: "Create",
};
