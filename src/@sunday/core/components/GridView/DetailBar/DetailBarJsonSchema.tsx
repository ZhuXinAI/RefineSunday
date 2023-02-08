import React from "react";
import { withTheme } from "@rjsf/core";
import { Theme as ChakraUITheme } from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv6";
// Make modifications to the theme with your own fields and widgets

const Form = withTheme(ChakraUITheme);

type Props = {
  schema: any;
  uiSchema: any;
  onSave: (values: any) => void;
  defaultValues: any;
};

export const DetailBarJsonSchema = ({
  schema,
  uiSchema = {},
  onSave,
  defaultValues,
}: Props) => {
  return (
    <Form
      formData={defaultValues}
      schema={schema}
      uiSchema={{...uiSchema, 
        "ui:submitButtonOptions": {
          "norender": true,
        }
      }}
      validator={validator}
      onChange={(values) => {
        onSave(values.formData)
      }}
    />
  );
};
