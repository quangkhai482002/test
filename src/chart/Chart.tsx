import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsType } from "echarts";

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Khởi tạo biểu đồ
      const chart = echarts.init(chartRef.current);

      // Cấu hình biểu đồ
      const option = {
        // Dữ liệu mẫu
        series: [
          {
            type: "line",
            data: [10, 20, 30, 25, 15, 35, 40], // Dữ liệu cho đường
            smooth: true, // Làm mượt đường
            lineStyle: {
              color: "#5470C6",
              width: 3,
            },
            showSymbol: false, // Ẩn các điểm trên đường
          },
        ],
        // Ẩn trục X và Y
        xAxis: {
          show: false, // Ẩn trục X
          type: "category",
          data: ["A", "B", "C", "D", "E", "F", "G"], // Dữ liệu mẫu cho trục X
        },
        yAxis: {
          show: false, // Ẩn trục Y
        },
        // Tùy chỉnh grid để loại bỏ khoảng cách
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          containLabel: false,
        },
        // Tùy chỉnh thêm nếu cần
        tooltip: {
          trigger: "axis", // Hiển thị tooltip khi hover
        },
      };

      // Thiết lập cấu hình cho biểu đồ
      chart.setOption(option);

      // Xử lý resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "400px" }} // Kích thước biểu đồ
    />
  );
};

export default LineChart;
