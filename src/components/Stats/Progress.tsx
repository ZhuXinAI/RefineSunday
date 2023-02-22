import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useList } from "@pankod/refine-core";
import { SundayComponent } from "@sunday/core/types/sunday";
import { NextPage } from "next";
import React, { useMemo } from "react";

type Props = {
  title: string;
};

export const Progress: React.FC<Props> = ({ title }) => {
  const { data, isLoading } = useList<any, any>({
    resource: "posts",
  });

  const progressValue = useMemo(() => {
    return (data?.data?.length || 0) / (data?.total || 100)
  }, [data])

  return (
    <Center
      borderRadius={"20px"}
      bg="gray.900"
      flexDirection={"column"}
      h="full"
    >
      <CircularProgress size="100px" value={progressValue} color="green.400">
        <CircularProgressLabel>
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <>{progressValue}%</>
          )}
        </CircularProgressLabel>
      </CircularProgress>
      <Text mt="10px">{title}</Text>
    </Center>
  );
};

(Progress as SundayComponent).config = {
    label: "Progress",
    type: 'progress',
    schema: {
        title: {
            type: 'string',
            label: "Title"
        },
    },
    component: Progress
}