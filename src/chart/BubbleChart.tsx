import React from "react";
import ReactECharts from "echarts-for-react";

// Danh sách các tháng
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Dữ liệu ví dụ cho 3 đối tượng
const data = {
  "Đối tượng A": [
    [0, 120, 15],
    [1, 132, 20],
    [2, 101, 10],
    [3, 134, 25],
    [4, 90, 10],
    [5, 230, 30],
  ],
  "Đối tượng B": [
    [0, 220, 10],
    [1, 182, 15],
    [2, 191, 30],
    [3, 234, 22],
    [4, 290, 18],
    [5, 330, 25],
  ],
  "Đối tượng C": [
    [0, 150, 8],
    [1, 232, 12],
    [2, 201, 20],
    [3, 154, 14],
    [4, 190, 15],
    [5, 330, 18],
  ],
};

const BubbleChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const month = months[params.value[0]];
        return `${params.seriesName}<br/>Tháng: ${month}<br/>Giá trị: ${params.value[1]}<br/>Cỡ: ${params.value[2]}`;
      },
    },
    legend: {
      bottom: 0,
    },
    xAxis: {
      type: "category",
      name: "Tháng",
      data: months,
    },
    yAxis: {
      type: "value",
      name: "Giá trị",
    },
    series: Object.entries(data).map(([name, values]) => ({
      name,
      type: "scatter",
      symbolSize: (val: any) => val[2],
      data: values,
    })),
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default BubbleChart;
