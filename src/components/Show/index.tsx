import { registerComponent } from "@sunday/core/utils/register";
import React, { useMemo } from "react";
import {
  Breadcrumb,
  Show as RefineShow,
  Heading,
  SaveButtonProps,
} from "@pankod/refine-chakra-ui";

interface formItem {
  id?: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: any[];
  required?: boolean;
}

interface Props {
  title: string | React.ReactNode;
  isLoading?: boolean;
  resource?: string;
  withBreadcrumb?: boolean;
  wrapperProps?: any;
  body: React.ReactNode;
  canDelete?: boolean;
  canEdit?: boolean;
  recordItemId?: string;
}

export const Show: React.FC<Props> = ({
  title,
  isLoading = false,
  resource,
  withBreadcrumb,
  wrapperProps,
  body,
  canDelete = false,
  canEdit = false,
  recordItemId
}) => {
  const renderTitle = useMemo(() => {
    if (typeof title === "string") {
      return <Heading size="lg">{title}</Heading>;
    }
    return title;
  }, [title]);
  return (
    <RefineShow
      isLoading={isLoading}
      title={renderTitle}
      resource={resource}
      breadcrumb={withBreadcrumb ? <Breadcrumb /> : null}
      wrapperProps={{ ...wrapperProps }}
      canDelete={canDelete}
      canEdit={canEdit}
      recordItemId={recordItemId}
    >
      {body}
    </RefineShow>
  );
};

(Show as any).config = {
  schema: {
    title: {
      type: "string",
      title: "Title",
    },
  },
  type: "show",
  label: "Show",
};
