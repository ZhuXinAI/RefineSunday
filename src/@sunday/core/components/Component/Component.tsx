import useDebounce from "@sunday/core/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { GridView, StaticGridView } from "../GridView";
import axios from "axios";
import { useSundayData } from "@sunday/core/hooks/useSundayData";

type Props = {
  id: string;
  data?: any;
};

const SundayComponentWithData = ({ id, data: dataFromProps }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { updateData } = useSundayData();

  const [data, setData] = useState<any>(dataFromProps);

  const debouncedData = useDebounce(data, 500);

  useEffect(() => {
    if (debouncedData) {
      updateData({
        [id]: debouncedData,
      } as any);
    }
  }, [debouncedData, id]);

  return (
    <>
      {!isEditMode ? (
        <StaticGridView
          onEdit={() => {
            setIsEditMode(true);
          }}
          data={
            data || {
              layouts: [],
              grids: {},
            }
          }
        />
      ) : (
        <GridView
          data={
            data || {
              layouts: [],
              grids: {},
            }
          }
          onChange={setData}
          onExit={() => {
            setIsEditMode(false);
          }}
        />
      )}
    </>
  );
};

export const SundayComponent = (props: any) => {
  const { data, isFetched } = useSundayData();
  return isFetched ? (
    <SundayComponentWithData data={data ? data[props.id] : null} {...props} />
  ) : null;
};
