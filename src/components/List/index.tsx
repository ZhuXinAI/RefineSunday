import { registerComponent } from "@sunday/core/utils/register";
import React, { useMemo } from "react";
import {
  List as RefineList,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Breadcrumb,
  FileField,
  BooleanField,
  DateField,
  EmailField,
  MarkdownField,
  NumberField,
  TagField,
  UrlField,
} from "@pankod/refine-chakra-ui";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { SundayComponent } from "@sunday/core/types/sunday";
import { IconCheck, IconX } from "@tabler/icons";

interface Props {
  title: string | React.ReactNode;
  resource?: string;
  withBreadcrumb?: boolean;
  wrapperProps?: any;
  columns: Array<any>;
}

export const List: React.FC<Props> = ({
  title,
  resource,
  withBreadcrumb,
  wrapperProps,
  columns = [],
}) => {
  const filteredColumns = useMemo(() => {
    return columns
      .filter((column) => !!column.id)
      ?.map((_column) => {
        if (_column.fieldType === "text") {
          return _column;
        } else {
          return {
            ..._column,
            cell: (props: any) => {
              const { getValue } = props;
              switch (_column.fieldType) {
                case "boolean":
                  return (
                    <BooleanField
                      value={getValue() === _column.trueValue}
                      trueIcon={<IconCheck />}
                      falseIcon={<IconX />}
                      valueLabelTrue={_column.trueValue}
                      valueLabelFalse={_column.falseValue}
                    />
                  );
                case "date":
                  return <DateField format="LLL" value={getValue()} />;
                case "email":
                  return <EmailField value={getValue()} />;
                case "file":
                  return <FileField src={getValue()[0].url} target="_blank" />;
                case "markdown":
                  return <MarkdownField value={getValue()} />;
                case "number":
                  return (
                    <NumberField
                      value={getValue()}
                      options={{
                        notation: "compact",
                      }}
                    />
                  );
                case "tag":
                  return <TagField value={getValue()} />;
                case "url":
                  return <UrlField value={getValue()[0].url} />;
              }
            },
          };
        }
      });
  }, [columns]);
  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns: filteredColumns,
  });
  const renderTitle = useMemo(() => {
    if (typeof title === "string") {
      return <Heading size="lg">{title}</Heading>;
    }
    return title;
  }, [title]);
  return (
    <RefineList
      resource={resource}
      title={renderTitle}
      breadcrumb={withBreadcrumb ? <Breadcrumb /> : null}
      wrapperProps={{ ...wrapperProps }}
    >
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups()?.map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel()?.rows?.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </RefineList>
  );
};

(List as SundayComponent).config = {
  schema: {
    title: {
      type: "string",
      title: "Title",
    },
    resource: {
      type: "string",
      title: "Resource",
    },
    withBreadcrumb: {
      title: "With Breadcrumb",
      type: "boolean",
    },
    columns: {
      title: "Columns",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            title: "ID",
          },
          header: {
            type: "string",
            title: "Header",
          },
          accessorKey: {
            type: "string",
            title: "Accessor Key",
          },
          fieldType: {
            type: "string",
            title: "Field Type",
            default: "text",
            enum: [
              "boolean",
              "date",
              "email",
              "file",
              "markdown",
              "number",
              "tag",
              "text",
              "url",
            ],
          },
          trueValue: {
            type: "string",
            title: "True Value (only applicable for boolean field)",
          },
          falseValue: {
            type: "string",
            title: "False Value (only applicable for boolean field)",
          },
        },
      },
    },
  },
  type: "list",
  label: "List",
  component: List,
  layoutExtra: {
    minW: 12,
    minH: 5,
    w: 12,
    h: 5,
  },
};
