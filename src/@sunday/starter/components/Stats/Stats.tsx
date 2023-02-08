import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";

type Props = {
  label: string;
  dataSourceEndpoint: string;
};

export const Stats = ({
  label = "输入标签",
  dataSourceEndpoint = "",
}: Props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(dataSourceEndpoint);
      setData(data?.count);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Center borderRadius={'20px'} bg="gray.900" w="full" h="full" padding="10px">
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{isLoading ? <Spinner /> : data}</StatNumber>
        {/* <StatHelpText>Feb 12 - Feb 28</StatHelpText> */}
      </Stat>
    </Center>
  );
};
