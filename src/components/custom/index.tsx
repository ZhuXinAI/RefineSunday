import { registerComponent } from "@sunday/core/utils/register";
import React from "react";

interface Props {
  title: string;
}

export const Custom: React.FC<Props> = ({ title }) => {
  return <div>{title}</div>;
};

(Custom as any).config = {
  schema: {
    title: {
      type: "string",
      title: "Title",
    },
  },
  type: "custom",
  label: "Custom",
};
