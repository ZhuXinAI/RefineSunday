import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import ReactGridLayout from "react-grid-layout";
import { AutoSizer } from "react-virtualized";
import { GridViewContext } from "./context";
import { GridItem } from "./GridItem";
import { IGridViewData } from "./types";

type Props = {
  data: IGridViewData;
  onEdit?: () => void;
};

export const StaticGridView = ({ data, onEdit }: Props) => {
  const actualLayout = useMemo(() => {
    return (data.layouts || []).map((item) => (
      <Box
        key={item.i}
      >
        {data.grids[item.i] && (
          <GridItem isStatic={true} id={item.i} grid={data.grids[item.i]} />
        )}
      </Box>
    ));
  }, [data.layouts, data.grids]);

  const layout = useMemo(() => {
    return (data.layouts || []).map((_layout) => ({
      ..._layout,
      isDraggable: false,
      static: true,
    }));
  }, []);

  return (
    <GridViewContext.Provider
      value={{
        isEditMode: false,
        grids: data.grids,
        setGrids: () => {},
        setEditingGrid: () => {},
      }}
    >
      <Flex flexDir={"column"} h="full" w="full">
        {onEdit && (
          <Flex paddingTop="10px" paddingX="20px">
            <Box flex={1}></Box>
            <Button onClick={onEdit}>编辑</Button>
          </Flex>
        )}
        <Box flex={1} minH="0">
          <Box className="SundayGridView" h="full" w="full">
            <AutoSizer>
              {({ width, height }) => (
                <ReactGridLayout
                  compactType={null}
                  layout={layout}
                  rowHeight={100}
                  width={width}
                  isDroppable={false}
                  isDraggable={false}
                  isResizable={false}
                >
                  {actualLayout}
                </ReactGridLayout>
              )}
            </AutoSizer>
          </Box>
        </Box>
      </Flex>
    </GridViewContext.Provider>
  );
};
