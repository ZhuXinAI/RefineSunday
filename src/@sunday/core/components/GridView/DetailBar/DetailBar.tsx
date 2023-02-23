import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { TOOLBAR_MAP } from "../const";
import { IGridItem, IGridViewItem } from "../types";
import { DetailBarJsonSchema } from "./DetailBarJsonSchema";

type Props = {
  grid: IGridItem;
  onSave: (grid: IGridItem) => void;
  defaultValues: any;
  onExit: () => void;
};

export const DetailBar = ({
  grid,
  onSave,
  onExit
}: {
  grid?: IGridViewItem;
  onSave: any;
  onExit: () => void;
}) => {
  const gridWithFields = useMemo(() => {
    return grid ? TOOLBAR_MAP[grid.type] : null;
  }, [grid]);

  return (
    <Flex
      padding="15px"
      paddingTop="40px"
      background={"gray.900"}
      border="1px solid"
      borderColor={"gray.700"}
      width="250px"
      flexDir={"column"}
      h="100%"
      overflowY={"auto"}
      position={'absolute'}
      right="20px"
      top="20px"
      bottom="20px"
    >
      <Box cursor={"pointer"} position={'absolute'} top="10px" right="10px" onClick={onExit}>
        <IoClose size={20}/>
      </Box>
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
