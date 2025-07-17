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
  symbol?: string;
  itemStyle?: {
    color?: string;
    borderColor?: string;
    borderWidth?: number;
  };
  draggable?: boolean;
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

  // Custom symbol with circle and icon
  const customSymbol = (params: any) => {
    const radius = params.size[0] / 2;
    const centerX = radius;
    const centerY = radius;

    return `
      <svg width="${params.size[0]}" height="${params.size[1]}" viewBox="0 0 ${
      params.size[0]
    } ${params.size[1]}" xmlns="http://www.w3.org/2000/svg">
        <!-- Circle background -->
        <circle cx="${centerX}" cy="${centerY}" r="${
      radius * 0.8
    }" fill="black" stroke="green" stroke-width="2"/>
        <!-- Icon -->
        <path d="M21 15v3.93a2 2 0 0 1-2.29 2A18 18 0 0 1 3.14 5.29 2 2 0 0 1 5.13 3H9a1 1 0 0 1 1 .89 10.7 10.7 0 0 0 1 3.78 1 1 0 0 1-.42 1.26l-.86.49a1 1 0 0 0-.33 1.46 14.1 14.1 0 0 0 3.69 3.69 1 1 0 0 0 1.46-.33l.49-.86a1 1 0 0 1 1.3-.38 10.7 10.7 0 0 0 3.78 1 1 1 0 0 1 .89 1"
              
        transform="translate(${centerX - 10}, ${centerY - 10}) scale(0.8)"
              fill="white"
              stroke="none"/>
      </svg>
    `;
  };

  const graph: GraphData = {
    nodes: [
      {
        id: "0",
        name: "Myriel",
        symbolSize: 40,
        x: -266.82776,
        y: 299.6904,
        value: 28.685715,
        category: 0,
      },
      {
        id: "1",
        name: "Napoleon",
        symbolSize: 40,
        x: -418.08344,
        y: 446.8853,
        value: 4,
        category: 0,
      },
      {
        id: "2",
        name: "MlleBaptistine",
        symbolSize: 40,
        x: -212.76357,
        y: 265,
        value: 9.485714,
        category: 38,
      },
    ],
    links: [
      { source: "0", target: "1" },
      { source: "0", target: "2" },
      { source: "1", target: "2" },
    ],
    categories: [{ name: "Group 0" }, { name: "Group 1" }],
  };

  useEffect(() => {
    // Process nodes to use our custom SVG symbol
    graph.nodes.forEach((node: GraphNode) => {
      node.symbolSize = 40; // Increased size to accommodate both circle and icon
      node.label = {
        show: node.symbolSize > 10,
      };
      node.draggable = true;
      // Assign SVG as image symbol
      node.symbol = `image://data:image/svg+xml;utf8,${encodeURIComponent(
        customSymbol({ size: [node.symbolSize, node.symbolSize] })
      )}`;
      node.itemStyle = {
        color: "green", // No fill for the container
      };
    });

    const chartOption = {
      tooltip: {},
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          // name: "Les Miserables",
          type: "graph",
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
            curveness: 0,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10,
            },
          },
          draggable: true,
        },
      ],
    };

    setOption(chartOption);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "600px",
          border: "1px solid #ccc",
          backgroundColor: "black",
        }}
      >
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
    </div>
  );
};

export default LesMiserablesGraph;
