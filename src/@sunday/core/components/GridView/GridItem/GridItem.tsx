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
    return React.createElement(TOOLBAR_MAP[grid.type]?.component, {
      ...grid.props,
      id,
      isStatic
    });
  }, [grid, id]);

  return <Box overflow={'hidden'} h="full" w="full">{element}</Box>;
};
