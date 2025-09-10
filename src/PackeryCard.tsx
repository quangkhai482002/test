import { Box, Card, CardContent, Typography } from "@mui/material";
// @ts-ignore
import Packery from "packery/js/packery";
import { useEffect, useRef } from "react";

const items = [
  {
    id: 1,
    title: "Card 1",
    content: [
      "Short text",
      "Another line",
      "a little bit longer content to change height.",
    ],
  },
  {
    id: 2,
    title: "Card 2",
    content: ["This card has a little bit longer content to change height."],
  },
  {
    id: 5,
    title: "Card 5",
    content: ["Packery + MUI + React + TypeScript 🎉"],
  },
  { id: 3, title: "Card 3", content: ["Medium text for testing layout."] },
  {
    id: 4,
    title: "Card 4",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Medium text for testing layout.",
      "One more line to make it taller.",
    ],
  },
  {
    id: 6,
    title: "Card 6",
    content: [
      "Short text",
      "Another line",
      "a little bit longer content to change height.",
    ],
  },
  {
    id: 7,
    title: "Card 7",
    content: ["This card has a little bit longer content to change height."],
  },
  {
    id: 8,
    title: "Card 8",
    content: ["Packery + MUI + React + TypeScript 🎉"],
  },
  { id: 9, title: "Card 9", content: ["Medium text for testing layout."] },
  {
    id: 10,
    title: "Card 10",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Medium text for testing layout.",
      "One more line to make it taller.",
    ],
  },
];

export default function PackeryLayout() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      const pckry = new Packery(gridRef.current, {
        itemSelector: ".grid-item",
        gutter: 10,
        fitWidth: true,
      });

      // relayout sau khi render
      pckry.layout();

      const handleResize = () => pckry.layout();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <Box
      ref={gridRef}
      sx={{
        maxWidth: 900,
        backgroundColor: "#f0f0f0",
        margin: "0 auto",
        padding: 2,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          className="grid-item"
          sx={{
            // KHÔNG đặt width/height cố định, chỉ cho maxWidth thôi
            maxWidth: 350,
            marginBottom: 2,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Box>
                {item.content.map((line, index) => (
                  <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                    {line}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
