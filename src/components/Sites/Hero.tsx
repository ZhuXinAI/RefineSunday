import React from "react";
import {
  chakra,
  Box,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { ChakraIcon } from "./icon";
import { COMMON_DEFINITION } from "./common/definitions";
import { IButton } from "./common/type";
import { EMPTY_BUTTON } from "./common/const";
import { SundayComponent } from "@sunday/core/types/sunday";

export const ChakraChocHero = ({
  promotion,
  title = "标题",
  subtitle = "副标题",
  leftButton = EMPTY_BUTTON,
  rightButton = EMPTY_BUTTON,
  imgUrl = 'https://via.placeholder.com/400',
  align,
}: {
  promotion: string;
  title: string;
  subtitle: string;
  leftButton: IButton;
  rightButton: IButton;
  imgUrl: string;
  align: "left" | "right";
}) => {
  const text = (
    <Flex
      direction="column"
      alignItems="start"
      justifyContent="center"
      px={{ base: 4, lg: 20 }}
      py={24}
    >
      {promotion && (
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          {promotion}
        </Badge>
      )}
      <chakra.h1
        mb={6}
        fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
        fontWeight="bold"
        color="brand.600"
        _dark={{ color: "gray.300" }}
        lineHeight="shorter"
      >
        {title}
      </chakra.h1>

      <chakra.p
        pr={{ base: 0, lg: 16 }}
        mb={4}
        fontSize="md"
        color="brand.600"
        _dark={{ color: "gray.400" }}
        letterSpacing="wider"
      >
        {subtitle}
      </chakra.p>
    </Flex>
  );

  const image = (
    <Box>
      <Image
        src={imgUrl}
        alt="hero"
        objectFit="cover"
        w="full"
        h={{ base: 64, md: "full" }}
        bg="gray.100"
        loading="lazy"
      />
    </Box>
  );

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      height='100%'
      _after={{
        bg: "brand.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      {align === "right" ? (
        <>
          {text}
          {image}
        </>
      ) : (
        <>
          {image}
          {text}
        </>
      )}
    </SimpleGrid>
  );
};

(ChakraChocHero as SundayComponent).config = {
  type: "chakra_choc_hero_image",
  label: "Hero/Image",
  component: ChakraChocHero,
  layoutExtra: {
    minW: 12,
    minH: 5,
    w: 12,
    h: 5
  },
  icon: <ChakraIcon />,
  schema: {
    type: "object",
    definitions: COMMON_DEFINITION,
    properties: {
      promotion: {
        type: "string",
        title: "Small Title",
      },
      title: {
        type: "string",
        title: "Title",
      },
      subtitle: {
        type: "string",
        title: "Subtitle",
      },
      leftButton: {
        title: "Left Butto",
        $ref: "#/definitions/button",
      },
      rightButton: {
        title: "Right Button",
        $ref: "#/definitions/button",
      },
      align: {
        type: "string",
        title: "Arrangments",
        oneOf: [
          { const: "left", title: "Left Image + Right Text" },
          { const: "right", title: "Left Text + Right Image" },
        ],
        default: "right"
      },
      imgUrl: {
        type: "string",
        title: "Image",
      },
    },
  },
};
