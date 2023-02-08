import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IGridItem } from "@sunday/frontend-shared/components/GridView/types";
import * as React from "react";
import { ChakraIcon } from "./icon";


const Component = ({
  title,
  subtitle,
  leftCtaButton,
  leftCtaButtonHref,
  rightCtaButton,
  rightCtaButtonHref,
}: {
  title: string;
  subtitle: string;
  leftCtaButton: string;
  leftCtaButtonHref: string;
  rightCtaButton: string;
  rightCtaButtonHref: string;
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
            {leftCtaButton}
          </Button>
          <Button variant="primary" size="lg">
            {rightCtaButton}
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);


export const ChakraCTACentered: IGridItem = {
    type: "chakra_cta_centered",
    label: "CTA 居中",
    propsFields: [
      {
        key: "title",
        label: "标题",
        type: "text",
      },
      {
        key: "subtitle",
        label: "副标题",
        type: "text",
      },
      {
        key: "leftCtaButton",
        label: "左按钮文字",
        type: "text",
      },
      {
        key: "leftCtaButtonHref",
        label: "左按钮链接",
        type: "text",
      },
      {
        key: "rightCtaButton",
        label: "右按钮文字",
        type: "text",
      },
      {
        key: "rightCtaButtonHref",
        label: "右按钮链接",
        type: "text",
      },
    ],
    component: Component,
    icon: <ChakraIcon />,
  };
  