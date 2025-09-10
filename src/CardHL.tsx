import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { title: "Ngắn", content: "1 dòng" },
  { title: "Trung bình", content: "Nội dung dài hơn một chút để test layout" },
  {
    title: "Dài",
    content:
      "Nội dung rất dài để xem card có tự giãn hợp lý không, bla bla bla...",
  },
  { title: "Ngắn 2", content: "Test" },
  { title: "Ngắn", content: "1 dòng" },
  { title: "Trung bình", content: "Nội dung dài hơn một chút để test layout" },
  {
    title: "Dài",
    content:
      "Nội dung rất dài để xem card có tự giãn hợp lý không, bla bla bla...",
  },
  { title: "Ngắn 2", content: "Test" },
  { title: "Ngắn", content: "1 dòng" },
  { title: "Trung bình", content: "Nội dung dài hơn một chút để test layout" },
  {
    title: "Dài",
    content:
      "Nội dung rất dài để xem card có tự giãn hợp lý không, bla bla bla...",
  },
  { title: "Ngắn 2", content: "Test" },
  { title: "Ngắn", content: "1 dòng" },
  { title: "Trung bình", content: "Nội dung dài hơn một chút để test layout" },
  {
    title: "Dài",
    content:
      "Nội dung rất dài để xem card có tự giãn hợp lý không, bla bla bla...",
  },
  { title: "Ngắn 2", content: "Test" },
];

export default function AutoGridCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // auto-fit + minmax
        gap: "16px",
      }}
    >
      {data.map((item, index) => (
        <Card key={index} sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2">{item.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
