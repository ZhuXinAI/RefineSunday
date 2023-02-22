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
} from "@pankod/refine-chakra-ui";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { SundayComponent } from "@sunday/core/types/sunday";

interface Props {
  title: string | React.ReactNode;
  resource?: string;
  withBreadcrumb?: boolean;
  wrapperProps?: any;
  columns: ColumnDef<any>[];
}

export const List: React.FC<Props> = ({
  title,
  resource,
  withBreadcrumb,
  wrapperProps,
  columns = [],
}) => {
  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
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
            default: "id",
          },
          header: {
            type: "string",
          },
          accessorKey: {
            type: "string",
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
