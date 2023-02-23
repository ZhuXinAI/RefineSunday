import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SundayComponent } from "@sunday/core/types/sunday";
import { EMPTY_BUTTON } from "./common/const";
import * as React from "react";
import { COMMON_DEFINITION } from "./common/definitions";
import { IButton } from "./common/type";
import { ChakraIcon } from "./icon";

export const CTACentered = ({
  title,
  subtitle,
  leftCtaButton = EMPTY_BUTTON,
  rightCtaButton = EMPTY_BUTTON,
}: {
  title: string;
  subtitle: string;
  leftCtaButton: IButton;
  rightCtaButton: IButton;
}) => (
  <Box as="section" bg="bg-surface">
    <Container py={{ base: "16", md: "24" }}>
      <Stack spacing={{ base: "8", md: "10" }}>
        <Stack spacing={{ base: "4", md: "5" }} align="center">
          <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
            {title}
          </Heading>
          <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
            {subtitle}
          </Text>
        </Stack>
        <Stack
          spacing="3"
          direction={{ base: "column", sm: "row" }}
          justify="center"
        >
          <Button variant="secondary" size="lg">
            {leftCtaButton.text}
          </Button>
          <Button variant="primary" size="lg">
            {rightCtaButton.text}
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);


(CTACentered as SundayComponent).config = {
    type: "chakra_cta_centered",
    label: "CTA Centered",
    layoutExtra: {
      minW: 12,
      minH: 3,
      w: 12,
      h: 3
    },
    schema: {
      type: "object",
      definitions: COMMON_DEFINITION,
      properties: {
        title: {
          type: "string",
          title: "Title",
        },
        subtitle: {
          type: "string",
          title: "Subtitle",
        },
        leftCtaButton: {
          title: "Left Button",
          $ref: "#/definitions/button",
        },
        rightCtaButton: {
          title: "Right Button",
          $ref: "#/definitions/button",
        },
      }
    },
    component: CTACentered,
    icon: <ChakraIcon />,
  };
  