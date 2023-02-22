import React, { useMemo } from "react";
import { Center, Input } from "@chakra-ui/react";
import { IGridItem } from "@sunday/frontend-shared/components/GridView/types";
import { BsBarChartLine } from "react-icons/bs";
import { ResponsiveLine } from "@nivo/line";
import { COMMON_DEFINITION } from "../../json-schema/definitions";
import { useMultipleCountData } from "../../hooks/useData";
type Props = {
  endpoints: {
    url: string;
    label: string;
  }[];
  xLabel: string;
  yLabel: string;
};

const Component = ({ endpoints, xLabel = "标题", yLabel = "数量" }: Props) => {
  const { data = [], isLoading } = useMultipleCountData(endpoints, 'count');

  const enhancedData = useMemo(() => {
    console.log("Line data", data);
    return [
      {
        id: "count",
        data: data.map((item: any) => ({
          x: item.label,
          y: item.count,
        })),
      },
    ];
  }, [data]);

  console.log("enhancedData", enhancedData);

  return (
    <Center borderRadius={"20px"} bg="gray.900" w="full" h="full">
      <ResponsiveLine
        data={enhancedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          max: 5,
          min: 0,
          stacked: false,
        }}
        enableGridY={false}
        enableGridX={false}
        yFormat=" >-.0f"
        axisTop={null}
        axisRight={null}
        enableArea
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xLabel,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: yLabel,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "white",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "white",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Center>
  );
};

export const NIVO_LINE: IGridItem = {
  type: "nivo_line",
  label: "线状图",
  editType: "jsonschema",
  propsFields: [],
  schema: {
    type: "object",
    definitions: COMMON_DEFINITION,
    properties: {
      endpoints: {
        type: "array",
        title: "Data source",
        items: {
          type: "object",
          title: "",
          properties: {
            url: {
              type: "string",
              title: "API Address",
            },
            label: {
              type: "string",
              title: "Group Name",
            },
          }
        },
      },
      xLabel: {
        title: "X Axis Label",
        type: "string",
      },
      yLabel: {
        title: "Y Axis Label",
        type: "string",
      },
    },
  },
  component: Component,
  icon: <BsBarChartLine size={36} />,
};
