import {
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
} from "@chakra-ui/react";
import cuid from "cuid";
// import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import ReactGridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";
import { IoClose, IoPencil } from "react-icons/io5";
import { FiLock, FiUnlock } from "react-icons/fi";
import { AutoSizer } from "react-virtualized";
// import { toast } from "util/toast";
import { GridViewContext } from "./context";
import { DetailBar } from "./DetailBar";
import { GridItem } from "./GridItem";
import { Toolbar } from "./Toolbar";
import { IGridViewData, IGridViewItem } from "./types";
import { TOOLBAR_MAP } from "./const";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

type Props = {
  data: IGridViewData;
  onChange: (data: IGridViewData) => void;
  onExit: () => void;
};

function removeUnusedGrid(
  grids: {
    [key: string]: IGridViewItem;
  },
  layouts: Layout[]
) {
  const newGrids: { [key: string]: IGridViewItem } = {};
  layouts.forEach((layout) => {
    newGrids[layout.i] = grids[layout.i];
  });
  Object.values(newGrids)
    .filter((grid) => grid.type === "grid")
    .forEach((grid) => {
      (grid?.props?.layouts || []).forEach((layout: Layout) => {
        newGrids[layout.i] = grids[layout.i];
      });
    });
  return newGrids;
}

export const GridView = ({ data, onChange, onExit }: Props) => {
  const [title, setTitle] = useState<string>(data.title || "");
  const [layouts, setLayouts] = useState<Layout[]>(data.layouts || []);
  const [grids, setGrids] = useState<{
    [key: string]: IGridViewItem;
  }>(data.grids || {});
  const [editingGrid, setEditingGrid] = useState<IGridViewItem>();

  const handleUpdate = useCallback(() => {
    onChange({
      layouts,
      grids: removeUnusedGrid(grids, layouts),
      title,
    });
  }, [onChange, grids, layouts, title]);

  const onLayoutChange = useCallback((layouts) => {
    setLayouts(layouts);
  }, []);

  const lockItem = useCallback(
    (key) => () => {
      setLayouts(
        layouts.map((item) => {
          if (item.i === key) {
            return {
              ...item,
              isDraggable: false,
              static: true,
            };
          } else {
            return item;
          }
        })
      );
    },
    [layouts]
  );

  const unlockItem = useCallback(
    (key) => () => {
      setLayouts(
        layouts.map((item) => {
          if (item.i === key) {
            return {
              ...item,
              isDraggable: true,
              static: false,
            };
          } else {
            return item;
          }
        })
      );
    },
    [layouts]
  );

  const removeItem = useCallback(
    (key) => () => {
      setLayouts(layouts.filter((item) => item.i !== key));
    },
    [layouts]
  );

  const editItem = useCallback(
    (key) => () => {
      setEditingGrid({
        ...grids[key],
        key,
      });
    },
    [grids]
  );

  const actualLayout = useMemo(() => {
    return layouts.map((item) => (
      <Box
        position={"relative"}
        background={"gray.900"}
        borderRadius="10px"
        key={item.i}
        border="1px solid"
        _hover={{
          borderColor: "red.400",
        }}
        borderColor={editingGrid?.key === item.i ? "red.400" : "transparent"}
      >
        <Flex
          position={"absolute"}
          bg="rgba(0, 0, 0, 0.3)"
          opacity={0}
          left={0}
          right={0}
          top={0}
          bottom={0}
          _hover={{
            opacity: 1,
            zIndex: 99,
          }}
          justifyContent={"center"}
          alignItems="center"
        >
          <Flex
            gap="10px"
            flexDir={"row"}
            color="gray.100"
            justifyContent={"center"}
            alignItems="center"
            zIndex={100}
          >
            {!item.static && (
              <FiLock size={30} cursor={"pointer"} onClick={lockItem(item.i)} />
            )}
            {item.static && (
              <FiUnlock size={30} cursor={"pointer"} onClick={unlockItem(item.i)} />
            )}
            <IoPencil size={30} cursor={"pointer"} onClick={editItem(item.i)} />
            <IoClose size={30} cursor={"pointer"} onClick={removeItem(item.i)} />
          </Flex>
        </Flex>

        {grids[item.i] && <GridItem id={item.i} grid={grids[item.i]} />}
      </Box>
    ));
  }, [layouts, grids, removeItem, editItem, editingGrid]);

  const onDrop = useCallback(
    (layouts: Layout[], layoutItem, _event) => {
      const newId = cuid();
      const type = _event.dataTransfer?.getData("text/plain");
      setLayouts(
        layouts.map((layout) => {
          if (layout.i === "__dropping-elem__") {
            layout.i = newId;
            const layoutExtra = TOOLBAR_MAP[type].layoutExtra || {};
            return {
              ...layout,
              ...layoutExtra,
            };
          }
          return layout;
        })
      );
      setGrids({
        ...grids,
        [newId]: {
          type,
          props: {},
        },
      });
    },
    [grids]
  );

  const onSave = useCallback(() => {
    handleUpdate();
    onExit();
  }, [handleUpdate, onExit]);

  const onCancel = useCallback(() => {
    onExit();
  }, [onExit]);

  const onSaveEditingGrid = useCallback(
    (values) => {
      if (editingGrid) {
        setEditingGrid({
          ...editingGrid,
          props: values,
        });
        setGrids({
          ...grids,
          [editingGrid!.key!]: {
            ...editingGrid,
            props: values,
          },
        });
      }
    },
    [editingGrid, grids]
  );

  return (
    <Flex position={"relative"} h="100%" w="100%" flexDir={"row"}>
      <Toolbar onSave={onSave} onCancel={onCancel} />
      <Flex w="100%" h="100%" overflowY={"auto"}>
        <GridViewContext.Provider
          value={{
            isEditMode: true,
            grids,
            setGrids,
            editingGrid,
            setEditingGrid,
          }}
        >
          <Flex minW="0px" flex={1} h="calc(100vh - 50px)" flexDirection={"column"}>
            <Flex paddingTop="10px" paddingX="20px">
              <Editable
                zIndex="10"
                onSubmit={async (title: string) => {
                  setTitle(title);
                  // toast({
                  //   title: "Title Updated",
                  //   status: "success",
                  //   duration: 2000,
                  //   isClosable: true,
                  // });
                }}
                fontSize="20px"
                defaultValue={title}
              >
                <EditablePreview
                  borderWidth="1px"
                  borderColor="transparent"
                  p="2"
                  _hover={{
                    borderColor: "white",
                  }}
                />
                <EditableInput />
              </Editable>
              <Box flex={1}></Box>
            </Flex>
            <Box flex={1} minH="0">
              <Flex
                padding="20px"
                flexDir={"row"}
                w={"full"}
                h="full"
                position="relative"
              >
                <Box
                  borderRadius="20px"
                  overflow={"hidden"}
                  h={"100%"}
                  flex={1}
                  minW={0}
                  position="relative"
                  padding={"5px"}
                >
                  <Box
                    w={"100%"}
                    h={"100%"}
                    borderStyle={"dashed"}
                    borderRadius="20px"
                    borderWidth={"1px"}
                    borderColor="gray.100"
                    position={"absolute"}
                    top="0"
                    left="0"
                    zIndex={0}
                  ></Box>

                  <Box
                    overflowY={"scroll"}
                    w="full"
                    h={"full"}
                    className="SundayGridView"
                  >
                    {/* <AutoSizer>
                    {({ width, height }) => ( */}
                    <ResponsiveReactGridLayout
                      style={{
                        paddingBottom: 200,
                      }}
                      // key={JSON.stringify([isEditMode])}
                      compactType={'vertical'}
                      onDropDragOver={(e) => {
                        return { w: 6, h: 1 };
                      }}
                      onDrop={onDrop}
                      layouts={{
                        lg: layouts,
                      }}
                      rowHeight={100}
                      breakpoints={{ lg: 1200 }}
                      cols={{ lg: 12 }}
                      resizeHandles={
                        ["e", "n", "s", "w", "ne", "nw", "se", "sw"]
                        // isEditMode
                        //   ? ["e", "n", "s", "w", "ne", "nw", "se", "sw"]
                        //   : undefined
                      }
                      onLayoutChange={onLayoutChange}
                      // measureBeforeMount={false}
                      isDroppable
                      isDraggable
                      isResizable
                      // useCSSTransforms
                    >
                      {actualLayout}
                    </ResponsiveReactGridLayout>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </GridViewContext.Provider>
      </Flex>
      {!!editingGrid && <DetailBar onExit={() => {
        setEditingGrid(undefined);
      }} grid={editingGrid} onSave={onSaveEditingGrid} />}
    </Flex>
  );
};
