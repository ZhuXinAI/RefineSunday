import { Avatar, Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { TOOLBAR } from "../const";

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export const Toolbar = ({ onCancel, onSave }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const toolbarItems = useMemo(() => {
    return TOOLBAR.filter((item) =>
      item.label.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput]);

  return (
    <Flex
      padding="15px"
      background={"gray.900"}
      borderRight="1px solid"
      borderColor={"gray.700"}
      width="200px"
      flexDir={"column"}
      h="full"
    >
      <Input
        placeholder="搜索"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <Flex paddingBottom={'20px'} overflowY={'auto'} flex={1} minH='0px' width={"100%"} flexDir={"row"} flexWrap="wrap">
        {toolbarItems.map((item) => (
          <Center
            cursor={"pointer"}
            marginY={"20px"}
            flexDirection={"column"}
            key={item.type}
            width={"50%"}
            h={50}
            className="droppable-element"
            draggable={true}
            unselectable="on"
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item.type)}
          >
            {item.icon || <Avatar name={item.label} size={'xs'}/>}
            <Text marginTop={"5px"} fontSize={12}>
              {item.label}
            </Text>
          </Center>
        ))}
      </Flex>
      <Flex gap="10px" flexDir={"column"}>
        <Button onClick={onSave}>保存</Button>

        <Button onClick={onCancel} variant="outline">
          取消
        </Button>
      </Flex>
    </Flex>
  );
};
