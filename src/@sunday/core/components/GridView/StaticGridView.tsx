import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import { AutoSizer } from "react-virtualized";
import { GridViewContext } from "./context";
import { GridItem } from "./GridItem";
import { IGridViewData } from "./types";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
            <Button onClick={onEdit}>Edit</Button>
          </Flex>
        )}
        <Box flex={1} minH="0">
          <Box className="SundayGridView" h="full" w="full">

                <ResponsiveReactGridLayout
                  compactType={null}
                  layouts={{
                    lg: layout
                  }}
                  rowHeight={100}
                  isDroppable={false}
                  isDraggable={false}
                  isResizable={false}
                >
                  {actualLayout}
                </ResponsiveReactGridLayout>

          </Box>
        </Box>
      </Flex>
    </GridViewContext.Provider>
  );
};
