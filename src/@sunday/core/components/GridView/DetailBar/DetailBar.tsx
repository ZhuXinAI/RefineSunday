import { Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TOOLBAR_MAP } from "../const";
import { IGridItem, IGridViewItem } from "../types";
import { DetailBarJsonSchema } from "./DetailBarJsonSchema";

type Props = {
  grid: IGridItem;
  onSave: (grid: IGridItem) => void;
  defaultValues: any;
};

export const DetailBar = ({
  grid,
  onSave,
}: {
  grid?: IGridViewItem;
  onSave: any;
}) => {
  const gridWithFields = useMemo(() => {
    return grid ? TOOLBAR_MAP[grid.type] : null;
  }, [grid]);

  return (
    <Flex
      padding="15px"
      background={"gray.900"}
      borderLeft="1px solid"
      borderColor={"gray.700"}
      width="250px"
      flexDir={"column"}
      h="100%"
      overflowY={"auto"}
    >
      {!!grid && !!gridWithFields && gridWithFields.schema && (
        <>
            <DetailBarJsonSchema
              schema={gridWithFields.schema}
              uiSchema={gridWithFields.uiSchema}
              onSave={onSave}
              defaultValues={grid.props}
            />
        </>
      )}
    </Flex>
  );
};
