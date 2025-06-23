// import React, { useEffect, useState } from "react";
// import * as echarts from "echarts";
// import ReactECharts from "echarts-for-react";

// // Define TypeScript interfaces
// interface GraphNode {
//   id: string;
//   name: string;
//   symbolSize: number;
//   x: number;
//   y: number;
//   value: number;
//   category: number;
//   label?: {
//     show?: boolean;
//   };
// }

// interface GraphLink {
//   source: string;
//   target: string;
// }

// interface GraphCategory {
//   name: string;
// }

// interface GraphData {
//   nodes: GraphNode[];
//   links: GraphLink[];
//   categories: GraphCategory[];
// }

// const LesMiserablesGraph: React.FC = () => {
//   const [option, setOption] = useState<any>(null);
//   const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 124 124" fill="none">
// <rect width="124" height="124" rx="24" fill="#F97316"/>
// <path d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z" fill="white"/>
// <circle cx="63.2109" cy="37.5391" r="18.1641" fill="black"/>
// <rect opacity="0.4" x="81.1328" y="80.7198" width="17.5687" height="17.3876" rx="4" transform="rotate(-45 81.1328 80.7198)" fill="#FDBA74"/>
// </svg>`;
//   const svgPath =
//     "path://M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z";

//   // Static data with adjusted links
//   const graph: GraphData = {
//     nodes: [
//       {
//         id: "0",
//         name: "Myriel",
//         symbolSize: 19,
//         x: -266.82776,
//         y: 299.6904,
//         value: 28.685715,
//         category: 0,
//       },
//       {
//         id: "1",
//         name: "Napoleon",
//         symbolSize: 19,
//         x: -418.08344,
//         y: 446.8853,
//         value: 4,
//         category: 0,
//       },
//       {
//         id: "2",
//         name: "MlleBaptistine",
//         symbolSize: 19,
//         x: -212.76357,
//         y: 265,
//         value: 9.485714,
//         category: 1,
//       },
//     ],
//     links: [
//       { source: "0", target: "1" }, // Connect Myriel to Napoleon
//       { source: "0", target: "2" }, // Connect Myriel to MlleBaptistine
//       { source: "1", target: "2" }, // Connect Napoleon to MlleBaptistine
//     ],
//     categories: [{ name: "Group 0" }, { name: "Group 1" }],
//   };
//   useEffect(() => {
//     // Process nodes to set label visibility and make them draggable
//     graph.nodes.forEach((node: GraphNode) => {
//       node.symbolSize = 40;
//       node.label = {
//         show: node.symbolSize > 10, // bạn có thể tùy chỉnh số này
//       };
//       (node as any).draggable = true; // cho phép kéo từng node
//       (node as any).icon = svgPath; // sử dụng biểu tượng SVG
//       (node as any).itemStyle = {
//         color: "#66bb6a", // Màu fill node (xanh lá cây nhạt)
//         borderColor: "green", // Viền xanh lá cây
//         borderWidth: 3, // Độ dày viền
//       };
//     });

//     const chartOption = {
//       // title: {
//       //   text: "Les Miserables",
//       //   subtext: "Draggable nodes + straight lines",
//       //   top: "bottom",
//       //   left: "right",
//       // },
//       tooltip: {},
//       // legend: [
//       //   {
//       //     data: graph.categories.map((a: GraphCategory) => a.name),
//       //   },
//       // ],
//       itemStyle: {
//         borderColor: "green",
//         borderWidth: 2,
//       },
//       animationDuration: 1500,
//       animationEasingUpdate: "quinticInOut",
//       series: [
//         {
//           name: "Les Miserables",
//           type: "graph",
//           layout: "none",
//           data: graph.nodes,
//           links: graph.links,
//           categories: graph.categories,
//           roam: true,
//           label: {
//             position: "right",
//             formatter: "{b}",
//           },
//           lineStyle: {
//             color: "source",
//             curveness: 0, // ⭐ làm đường thẳng
//           },
//           emphasis: {
//             focus: "adjacency",
//             lineStyle: {
//               width: 10,
//             },
//           },
//           draggable: true, // ⭐ cho phép kéo node
//         },
//       ],
//     };

//     setOption(chartOption);
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <div style={{ width: "90%", height: "600px", border: "1px solid #ccc" }}>
//         {option ? (
//           <ReactECharts
//             echarts={echarts}
//             option={option}
//             style={{ height: "100%", width: "100%" }}
//             showLoading={false}
//           />
//         ) : (
//           <div>Loading...</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LesMiserablesGraph;

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
  symbol?: string; // Add symbol property
  itemStyle?: {
    color?: string;
    borderColor?: string;
    borderWidth?: number;
  };
  draggable?: boolean; // Add draggable property
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

  // Simplified SVG path for the nodes
  const svgPath =
    "path://M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z";

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
    // Process nodes to set label visibility, make them draggable, and apply custom SVG
    graph.nodes.forEach((node: GraphNode) => {
      node.symbolSize = 40;
      node.label = {
        show: node.symbolSize > 10,
      };
      node.symbol = svgPath; // Set the custom SVG path
      node.draggable = true;
      node.itemStyle = {
        color: "#66bb6a", // Node fill color
        borderColor: "green", // Node border color
        borderWidth: 3, // Node border width
      };
    });

    const chartOption = {
      tooltip: {},
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "Les Miserables",
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
            curveness: 0, // Straight lines
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
      <div style={{ width: "90%", height: "600px", border: "1px solid #ccc" }}>
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
