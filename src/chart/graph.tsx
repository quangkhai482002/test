import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

// Define TypeScript interfaces
interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  x: number;
  y: number;
  value: number;
  category: number;
  label?: {
    show?: boolean;
  };
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphCategory {
  name: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories: GraphCategory[];
}

const LesMiserablesGraph: React.FC = () => {
  const [option, setOption] = useState<any>(null);

  // Static data with adjusted links
  const graph: GraphData = {
    nodes: [
      {
        id: "0",
        name: "Myriel",
        symbolSize: 19.12381,
        x: -266.82776,
        y: 299.6904,
        value: 28.685715,
        category: 0,
      },
      {
        id: "1",
        name: "Napoleon",
        symbolSize: 2.66666666666667,
        x: -418.08344,
        y: 446.8853,
        value: 4,
        category: 0,
      },
      {
        id: "2",
        name: "MlleBaptistine",
        symbolSize: 6.32380933333333,
        x: -212.76357,
        y: 245.29176,
        value: 9.485714,
        category: 1,
      },
    ],
    links: [
      { source: "0", target: "1" }, // Connect Myriel to Napoleon
      { source: "0", target: "2" }, // Connect Myriel to MlleBaptistine
      { source: "1", target: "2" }, // Connect Napoleon to MlleBaptistine
    ],
    categories: [{ name: "Group 0" }, { name: "Group 1" }],
  };

  useEffect(() => {
    // Process nodes to set label visibility
    graph.nodes.forEach((node: GraphNode) => {
      node.label = {
        show: node.symbolSize > 30,
      };
    });

    // Define ECharts option
    const chartOption = {
      title: {
        text: "Les Miserables",
        subtext: "Default layout",
        top: "bottom",
        left: "right",
      },
      tooltip: {},
      legend: [
        {
          data: graph.categories.map((a: GraphCategory) => a.name),
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "Les Miserables",
          type: "graph",
          legendHoverLink: false,
          layout: "none",
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: "right",
            formatter: "{b}",
          },
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10,
            },
          },
        },
      ],
    };

    setOption(chartOption);
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      {option ? (
        <ReactECharts
          echarts={echarts}
          option={option}
          style={{ height: "100%", width: "100%" }}
          showLoading={false}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LesMiserablesGraph;
