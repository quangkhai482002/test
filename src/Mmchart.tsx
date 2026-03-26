import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

// 1. Dữ liệu thật
const realData = [
  {
    name: "User A",
    value: 100,
    img: "https://grout.in/avatar/User+A.png?size=128&rounded=true",
  },
  {
    name: "User B",
    value: 80,
    img: "https://grout.in/avatar/Alice.png?size=128&rounded=true&background=random",
  },
  {
    name: "User C",
    value: 200,
    img: "https://grout.in/avatar/Alice.png?size=128&rounded=true&background=random",
  },
];

// 2. Tạo dữ liệu FAKE (trang trí)
// Chúng ta tạo ngẫu nhiên khoảng 10-15 quả cầu nhỏ
const fakeData = Array.from({ length: 12 }).map((_, index) => ({
  name: `Fake_${index}`, // Tên duy nhất để ECharts quản lý
  value: Math.random() * 30 + 10, // Giá trị nhỏ (10-40) để size nhỏ
  isFake: true, // Cờ để đánh dấu đây là node fake
}));

// 3. Gộp dữ liệu
const allData = [...realData, ...fakeData];

const MIN_SIZE = 80;
const MAX_SIZE = 160;
const FAKE_MIN_SIZE = 30;
const FAKE_MAX_SIZE = 60;

const BubbleCircleChart: React.FC = () => {

    const echartsRef = useRef<any>(null);

  useEffect(() => {
    // Tạo hiệu ứng chuyển động nhẹ bằng cách cập nhật nhẹ thông số lực định kỳ
    const timer = setInterval(() => {
      if (echartsRef.current) {
        const chartInstance = echartsRef.current.getEchartsInstance();
        chartInstance.setOption({
          series: [{
            force: {
              // Thay đổi nhẹ lực đẩy để các hạt rung rinh
              repulsion: 150 + Math.random() * 50 
            }
          }]
        });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);
  // Hàm tính toán kích thước bubble
  const getSymbolSize = (value: number, isFake?: boolean) => {
    if (isFake) {
      // Scale riêng cho node fake
      return FAKE_MIN_SIZE + (value / 40) * (FAKE_MAX_SIZE - FAKE_MIN_SIZE);
    }

    // Scale cho node thật (như cũ)
    const values = realData.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    if (maxVal === minVal) return (MIN_SIZE + MAX_SIZE) / 2;
    return MIN_SIZE + ((value - minVal) * (MAX_SIZE - MIN_SIZE)) / (maxVal - minVal);
  };

  const option: echarts.EChartsOption = {
    backgroundColor: "#1a1a1a", // Đổi nền tối cho nổi bật
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    tooltip: {
      show: true,
      trigger: "item",
    },

    graphic: [
      {
        type: "circle",
        left: "center",
        top: "middle",
        shape: { r: 280 },
        style: { stroke: "#00ff88", fill: "none", lineWidth: 1, opacity: 0.1 },
      },
      {
        type: "circle",
        left: "center",
        top: "middle",
        shape: { r: 200 },
        style: { stroke: "#00ff88", fill: "none", lineWidth: 1, opacity: 0.2 },
      },
    ],
    series: [
      {
        type: "graph",
        layout: "force",
        legendHoverLink: false,
        force: {
          repulsion: 150, // Giảm repulsion lực đẩy để chúng đứng gần nhau hơn một chút
          edgeLength: 80,
          gravity: 0.05, // Lực hút vào tâm nhẹ
          layoutAnimation: true, // Bật animation
        },
        animationThreshold: 2000,
        progressive: 200,
        draggable: true,
        data: allData.map((item: any) => {
          const size = getSymbolSize(item.value, item.isFake);

          // Cấu hình CHUNG
          const node: any = {
            ...item,
            symbolSize: size,
            emphasis: {
              scale: item.isFake ? 1 : 1.1, // Node fake không phóng to khi hover
            },
          };

          // Cấu hình RIÊNG cho node FAKE
          if (item.isFake) {
            node.itemStyle = {
              color: "#00ff88",
              opacity: 0.3, // Làm mờ đi
              borderWidth: 0,
            };
            node.label = { show: false }; // Ẩn label
            node.tooltip = { show: false }; // Ẩn tooltip cấp độ node (chắc chắn hơn)
          } 
          // Cấu hình RIÊNG cho node THẬT
          else {
            const imgSize = size * 0.4;
            node.itemStyle = {
              color: "#00ff88",
              shadowBlur: 15,
              shadowColor: "rgba(0, 255, 136, 0.7)",
            };
            node.label = {
              show: true,
              formatter: `{name|${item.name}}\n{img|}\n{value|${item.value}}`,
              rich: {
                name: {
                  fontSize: size * 0.12,
                  color: "#000",
                  align: "center",
                  padding: [0, 0, 5, 0],
                },
                img: {
                  height: imgSize,
                  width: imgSize,
                  borderRadius: imgSize / 2,
                  backgroundColor: { image: item.img },
                  align: "center",
                },
                value: {
                  fontSize: size * 0.1,
                  color: "#333",
                  align: "center",
                  padding: [5, 0, 0, 0],
                },
              },
            };
          }

          return node;
        }),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "600px", padding: "20px" }}>
      <ReactECharts 
      ref={echartsRef}
        option={option} 
        style={{ height: "100%" }} 
        opts={{ renderer: 'svg' }} // Dùng SVG cho mượt khi có nhiều node nhỏ
      />
    </div>
  );
};

export default BubbleCircleChart;