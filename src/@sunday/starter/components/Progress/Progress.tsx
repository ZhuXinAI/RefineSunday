import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Text
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useCountData } from "../../hooks/useData";

type Props = {
  title: string;
  dataSourceProgressEndpoint: string;
  dataSourceTotalEndpoint: string;
};


export const Progress = ({
  title,
  dataSourceTotalEndpoint,
  dataSourceProgressEndpoint,
}: Props) => {
  const { data: progress = 0, isLoading: isLoadingProgress } = useCountData(
    dataSourceProgressEndpoint,
    'count'
  );
  const { data: total = 0, isLoading: isLoadingTotal } = useCountData(
    dataSourceTotalEndpoint,
    'count'
  );
  const progressValue = useMemo(() => {
    if (progress && total) {
      return (progress / total) * 100;
    } else {
      return 0;
    }
  }, [progress, total]);
  const isLoading = isLoadingProgress || isLoadingTotal;

  return (
    <Center borderRadius={'20px'} bg="gray.900" flexDirection={'column'} h="full">
      <CircularProgress size="100px" value={progressValue} color="green.400">
        <CircularProgressLabel>
          {isLoading ? <Spinner></Spinner> : <>{progressValue}%</>}
        </CircularProgressLabel>
      </CircularProgress>
      <Text mt="10px">{title}</Text>
    </Center>
  );
};
