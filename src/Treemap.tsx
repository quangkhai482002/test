import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Box, Stack } from "@mui/material";

type TreeNode = {
    name: string;
    value?: number;
    children?: TreeNode[];
};

const data: TreeNode[] = [
    {
        name: "Frontend",
        children: [
            { name: "React", value: 40 },
            { name: "Vue", value: 20 },
            { name: "Angular", value: 15 },
        ],
    },
    {
        name: "Backend",
        children: [
            { name: "Node.js", value: 35 },
            { name: "Java", value: 25 },
            { name: "Python", value: 30 },
        ],
    },
    {
        name: "Database",
        children: [
            { name: "MySQL", value: 20 },
            { name: "MongoDB", value: 15 },
            { name: "PostgreSQL", value: 25 },
        ],
    },
];

const TreemapChart: React.FC = () => {
    // const chartRef = useRef<any>(null);
    // useEffect(() => {
    //     const handleResize = () => {
    //         if (chartRef.current) {
    //             const chartInstance = chartRef.current.getEchartsInstance();
    //             chartInstance.resize();
    //         }
    //     };

    //     window.addEventListener("resize", handleResize);
    //     // Gọi ngay lần đầu để fix lỗi không full width khi load
    //     setTimeout(handleResize, 100); 

    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);
    const option: echarts.EChartsOption = {
        tooltip: {
            formatter: "{b}: {c}",
        },
        series: [
            {
                type: "treemap",
                data,
                width: "100%",  // Ép series chiếm 100%
            height: "100%",
                roam: false, // zoom + pan
                label: {
                    show: true,
                    formatter: "{b}",
                },
                upperLabel: {
                    show: true,
                    height: 30,
                },
                itemStyle: {
                    borderColor: "#fff",
                },
                levels: [
                    {
                        itemStyle: {
                            borderWidth: 2,
                            gapWidth: 2,
                        },
                    },
                    {
                        colorSaturation: [0.3, 0.6],
                        itemStyle: {
                            borderWidth: 1,
                            gapWidth: 1,
                        },
                    },
                ],
            },
        ],
    };

    return (
        <Box sx={{ width: "100%", height: 200, bgcolor: 'red' }}>
  <ReactECharts option={option} style={{ width: "100%", height: "100%" }} 
//   notMerge={true}
//   lazyUpdate={true}
// ref={chartRef}
//   opts={{ renderer: 'canvas' }}
  />
</Box>

    );
};

export default TreemapChart;