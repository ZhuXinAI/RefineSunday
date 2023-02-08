import { Center } from "@chakra-ui/react";
import React from "react";
// import { SpaceDetail } from "screen/Spaces/SpaceDetail";

type Props = {
  spaceId: string;
};

export const Table = ({
  spaceId
}: Props) => {

  if (!spaceId) {
    return <Center h="full">
      选择一个数据空间
    </Center>
  }

  return null;
  // return <SpaceDetail spaceId={spaceId} />
};
