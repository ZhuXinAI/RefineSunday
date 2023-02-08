import { Box, Flex } from "@chakra-ui/react";
import { useGridViewContext } from "@sunday/core/components/GridView/context";
import { GridItem } from "@sunday/core/components/GridView/GridItem";
import cuid from "cuid";
import React, { useCallback, useMemo, useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import { AutoSizer } from "react-virtualized";
import { IoClose, IoPencil } from "react-icons/io5";
import { FormWrapper } from "./FormWrapper";

type Props = {
  rowHeight: number;
  layouts: Layout[];
  id: string;
  isForm?: boolean;
  form?: {
    endpoint: string;
    redirectAfterSuccess: string;
  };
  isStatic?: boolean;
};

export const Grid = ({
  rowHeight = 50,
  layouts: layoutsFromProps = [],
  id,
  isForm = false,
  form = {
    endpoint: "",
    redirectAfterSuccess: ""
  },
  isStatic = false,
}: Props) => {
  const [layouts, setLayouts] = useState<Layout[]>(layoutsFromProps);
  const { isEditMode, grids, setGrids, setEditingGrid } = useGridViewContext();

  const layoutsEnhanced = useMemo(() => {
    return layouts.map((item) =>
      isStatic
        ? {
            ...item,
            isDraggable: false,
            static: true,
          }
        : item
    );
  }, [layouts]);

  const onDrop = useCallback(
    (layouts: Layout[], layoutItem, _event) => {
      const newId = cuid();
      const newLayouts = layouts.map((layout) => {
        if (layout.i === "__dropping-elem__") {
          layout.i = newId;
        }
        return layout;
      });
      setLayouts(newLayouts);
      setGrids({
        ...grids,
        [id]: {
          ...grids[id],
          props: {
            ...grids[id].props,
            layouts: newLayouts,
          },
        },
        [newId]: {
          type: _event.dataTransfer?.getData("text/plain"),
          props: {},
        },
      });
    },
    [grids, setGrids, id]
  );

  const removeItem = useCallback(
    (key) => () => {
      const newLayouts = layouts.filter((item) => item.i !== key);
      setLayouts(newLayouts);
      setGrids({
        ...grids,
        [id]: {
          ...grids[id],
          props: {
            ...grids[id].props,
            layouts: newLayouts,
          },
        },
      });
    },
    [layouts, id, grids, setGrids]
  );

  const editItem = useCallback(
    (key) => () => {
      setEditingGrid({
        ...grids[key],
        key,
      });
    },
    [grids, setEditingGrid]
  );

  const onLayoutChange = useCallback(
    (layouts) => {
      setLayouts(layouts);
      setGrids({
        ...grids,
        [id]: {
          ...grids[id],
          props: {
            ...grids[id].props,
            layouts,
          },
        },
      });
    },
    [grids, id, setGrids]
  );

  const actualLayout = useMemo(() => {
    return layouts.map((item) => (
      <Box position={"relative"} borderRadius="10px" key={item.i}>
        {isEditMode && (
          <Flex
            gap="10px"
            flexDir={"row"}
            position={"absolute"}
            right="10px"
            top="10px"
            color="gray.100"
            zIndex={1000}
          >
            <IoPencil cursor={"pointer"} onClick={editItem(item.i)} />
            <IoClose cursor={"pointer"} onClick={removeItem(item.i)} />
          </Flex>
        )}
        {grids[item.i] && <GridItem id={item.i} grid={grids[item.i]} />}
      </Box>
    ));
  }, [layouts, grids, isEditMode, removeItem, editItem]);

  const content = (
    <Box
      key={JSON.stringify([rowHeight, isEditMode])}
      className="SundayGridView"
      w="full"
      h="full"
      overflow={"hidden"}
    >
      <AutoSizer>
        {({ width, height }) => (
          <ReactGridLayout
            compactType={null}
            onDropDragOver={(e) => {
              return { w: 4, h: 1 };
            }}
            onDragStart={(...args) => {
              const event = args[4];
              event.stopPropagation();
              if (!isEditMode) {
                event.preventDefault();
              }
            }}
            onDrop={onDrop}
            layout={layoutsEnhanced}
            rowHeight={rowHeight}
            width={width}
            isDroppable={isEditMode}
            isDraggable={isEditMode}
            resizeHandles={
              isEditMode
                ? ["e", "n", "s", "w", "ne", "nw", "se", "sw"]
                : undefined
            }
            onLayoutChange={onLayoutChange}
          >
            {actualLayout}
          </ReactGridLayout>
        )}
      </AutoSizer>
    </Box>
  );

  return isForm ? <FormWrapper isStatic={isStatic} form={form}>{content}</FormWrapper> : content;
};
