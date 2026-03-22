import {
  Card,
  CardContent,
  Box,
  Typography,
  CardHeader,
  keyframes,
} from "@mui/material";
import { useState } from "react";

const shineInfinite = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

type Props = {
  //   title: string;
  color?: string;
  children?: React.ReactNode;
};

export default function CustomCard(
  {
    //   title,
    // color = "#1976d2",
    // children,
  }: Props,
) {
  const slide = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPos({ x, y });
  };
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      {/* <CardHeader
        title="Header có hiệu ứng lướt"
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#abb5be",
          color: "white",
          transition: "background-color 0.4s ease",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(196, 64, 64, 0.25), transparent)",
            transition: "left 5s ease",
            pointerEvents: "none",
          },

          "&:hover": {
            backgroundColor: "#abb5be",
            "&::before": {
              left: "100%",
            },
          },
        }}
      /> */}

      <CardHeader
        title="Header có hiệu ứng lướt"
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#abb5be",
          color: "white",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(0, 255, 26, 0.25), transparent)",
            animation: `${slide} 3s linear infinite`,
            pointerEvents: "none",
          },
        }}
      />

      {/* <CardHeader
        title="Gradient theo chuột"
        onMouseMove={handleMouseMove}
        sx={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #ff6b6b, #4ecdc4 60%, #556270)`,
          color: "white",
          transition: "background 0.3s ease",
        }}
      /> */}

      {/* Content */}
      <CardContent>Thướng thằng cầy</CardContent>
    </Card>
  );
}
