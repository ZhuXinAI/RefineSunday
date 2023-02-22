import useDebounce from "@sunday/core/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { GridView, StaticGridView } from "../GridView";
import { useSundayData } from "@sunday/core/hooks/useSundayData";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";

type Props = {
  id: string;
  data?: any;
  components?: any[];
};

const SundayComponentWithData = ({
  id,
  data: dataFromProps,
  components,
}: Props) => {
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
          components={components}
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

export const SundayRefineComponent = (props: any) => {
  const { useParams } = useRouterContext();
  const { action = "list" } = useParams<ResourceRouterParams>();
  return <SundayComponent key={`${props.name}-${action}`} id={`${props.name}-${action}`} />;
};
