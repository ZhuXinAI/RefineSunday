import React, { useMemo } from "react";
import { Center, Input } from "@chakra-ui/react";
import { BsBarChartLine } from "react-icons/bs";
import { ResponsiveLine } from "@nivo/line";
import { SundayComponent } from "@sunday/core/types/sunday";
type Props = {
  endpoints: {
    url: string;
    label: string;
  }[];
  xLabel: string;
  yLabel: string;
};

export const CustomLineChart = ({ xLabel = "Label", yLabel = "Label" }: Props) => {
  const data: any[] = [];
  const enhancedData = useMemo(() => {
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

(CustomLineChart as SundayComponent).config= {
  type: "nivo_line",
  label: "Line Charts",
  schema: {
    properties: {
      endpoints: {
        type: "array",
        title: "Data Source",
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
          },
        },
      },
      xLabel: {
        title: "X Axis Title",
        type: "string",
      },
      yLabel: {
        title: "Y Axis Title",
        type: "string",
      },
    },
  },
  component: CustomLineChart,
  icon: <BsBarChartLine size={36} />,
};
