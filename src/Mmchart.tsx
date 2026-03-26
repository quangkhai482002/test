import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { m } from "framer-motion";

// 1. Dữ liệu thật
const realData = [
  {
    name: "User AAAAAAAAAAAAAAAAAA",
    value: 8.2,
    img: "https://grout.in/avatar/User+A.png?size=128&rounded=true",
  },
  {
    name: "User B",
    value: 6,
    img: "https://grout.in/avatar/Alice.png?size=128&rounded=true&background=random",
  },
  {
    name: "User C",
    value: 3,
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
  let step = 0;
  const timer = setInterval(() => {
    if (echartsRef.current) {
      step += 0.1;
      const chartInstance = echartsRef.current.getEchartsInstance();
      chartInstance.setOption({
        series: [{
          force: {
            // Thay đổi gravity cực nhỏ theo hàm sin để tạo nhịp thở
            gravity: 0.03 + Math.cos(step) * 0.005 
           
          }
        }]
      });
    }
  }, 100); // Cập nhật nhanh hơn nhưng biên độ cực nhỏ = mượt hơn

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
    animationDurationUpdate: 3000,
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
        animationDuration: 300,
        animationEasing: 'cubicOut',
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

          const mainColor = "#00ff88";
          const secondaryColor = "#005533";


          // Cấu hình RIÊNG cho node FAKE
          if (item.isFake) {
            node.itemStyle = {
              // color: "#00ff88",
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                { offset: 0, color: "#aaffdd" },   // Điểm sáng nhất (highlight)
                { offset: 0.5, color: mainColor }, // Màu chính
                { offset: 1, color: secondaryColor } // Viền tối tạo độ khối
              ]),
              opacity: 0.6, // Làm mờ đi
              borderWidth: 0,
              shadowBlur: 10 ,
              shadowColor: mainColor,
              shadowOffsetX: 0,
              shadowOffsetY: 5, // Đổ bóng xuống dưới một chút cho cảm giác 3D
            };
            node.label = { show: false }; // Ẩn label
            node.tooltip = { show: false }; // Ẩn tooltip cấp độ node (chắc chắn hơn)
          } 
          // Cấu hình RIÊNG cho node THẬT
          else {
            const imgSize = size * 0.4;
            node.itemStyle = {
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                { offset: 0, color: "#aaffdd" },   // Điểm sáng nhất (highlight)
                { offset: 0.5, color: mainColor }, // Màu chính
                { offset: 1, color: secondaryColor } // Viền tối tạo độ khối
              ]),
              opacity: 1, // Làm mờ đi
              borderWidth: 0,
              shadowBlur: 30 ,
              shadowColor: mainColor,
              shadowOffsetX: 0,
              shadowOffsetY: 5,
            };
            node.label = {
              show: true,
              formatter: `{name|${item?.name?.length>10?item.name?.substring(0, 10) + "...":item.name}}\n{img|}\n{value|${item.value}}`,
              rich: {
                name: {
                  fontSize: size * 0.1,
                  color: "#000",
                  align: "center",
                  padding: [0, 0, 5, 0],
                  width: size * 0.8,      // Giới hạn độ rộng của chữ bằng 80% bubble
      overflow: "truncate",   // Tự động cắt và thêm dấu ...
      ellipsis: "...",        // Ký tự hiển thị khi bị cắt
      lineHeight: size * 0.15,
                },
                img: {
                  height: imgSize,
                  width: imgSize,
                  borderRadius: imgSize / 2,
                  backgroundColor: { image: item.img },
                  align: "center",
                },
                value: {
                  fontSize: size * 0.08,
                  lineHeight: 24,
                  color: "#333",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 5,
                  align: "center",
                  padding: [2, 10, 2, 10],
                  
                },
              },
            };

            node.emphasis = {
              scale: 1.15,
              itemStyle: {
                shadowBlur: 40,
                shadowColor: mainColor,
              },
              label: {
                rich: {
                  img: {
                    width: imgSize * 1.12,
                    height: imgSize * 1.12,
                  },
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