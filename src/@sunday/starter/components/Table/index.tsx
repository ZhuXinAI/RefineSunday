import { IGridItem } from "@sunday/frontend-shared/components/GridView/types";
import { BiTable } from "react-icons/bi";
import { Table } from "./Table";

export const TABLE: IGridItem = {
  type: "table",
  label: "Table",
  propsFields: [
    {
      key: "spaceId",
      label: "选择数据空间",
      type: "select-space",
    },
  ],
  component: Table,
  icon: <BiTable size={36} />,
};
