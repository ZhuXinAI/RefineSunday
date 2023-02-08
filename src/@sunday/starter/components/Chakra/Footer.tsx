import * as React from "react";
import {
  ButtonGroup,
  Container,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IGridItem } from "@sunday/frontend-shared/components/GridView/types";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ChakraIcon } from "./icon";
import { IBox } from "../../json-schema/type";
import { COMMON_DEFINITION, COMMON_UI_SCHEMA } from "../../json-schema/definitions";

const Component = ({
  companyName,
  logoUrl,
  box,
}: {
  companyName: string;
  logoUrl: string;
  box: IBox
}) => (
  <Container {...box} as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justify="space-between" direction="row" align="center">
        {logoUrl && <Image maxH={'50px'} maxW="300px" src={logoUrl} alt="Logo" />}
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} {companyName}, Inc. All rights
        reserved.
      </Text>
    </Stack>
  </Container>
);

export const ChakraFooter: IGridItem = {
  type: "chakra_footer",
  label: "CTA Footer",
  editType: "jsonschema",
  propsFields: [],
  schema: {
    type: "object",
    properties: {
      logoUrl: {
        type: "string",
        title: "Logo地址"
      },
      companyName: {
        type: "string",
        title: "公司名称"
      },
      box: COMMON_DEFINITION.box
    },
  },
  uiSchema: {
    box: COMMON_UI_SCHEMA.box
  },
  component: Component,
  icon: <ChakraIcon />,
};
