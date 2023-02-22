import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TOOLBAR_MAP } from "../const";

type Props = {
  grid: {
    type: string;
    props: any;
  };
  id: string;
  isStatic?: boolean
};

export const GridItem = ({ grid, id, isStatic = false }: Props) => {
  const element = useMemo(() => {
    if (!!TOOLBAR_MAP[grid.type]?.component) {
      return React.createElement(TOOLBAR_MAP[grid.type]?.component, {
        ...grid.props,
        id,
        isStatic
      });
    }
    else {
      return null;
    }
  }, [grid, id]);

  return <Box overflow={'hidden'} h="full" w="full">{element}</Box>;
};
