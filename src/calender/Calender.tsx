import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TimelineWithRelations = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const timelineItems = [
    { label: "Tạo A", date: "2024-01-01" },
    { label: "Cập nhật A", date: "2024-02-15" },
    { label: "Tạo B", date: "2024-03-10" },
  ];

  const relations = [
    { from: "A", to: "B", date: "2024-04-01" },
    { from: "B", to: "C", date: "2024-05-10" },
    { from: "C", to: "D", date: "2024-06-01" },
  ];

  return (
    <Box display="flex" height="100vh">
      {/* Left Column */}
      <Box width="30%" borderRight="1px solid #ccc" p={2}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Timeline" />
          <Tab label="Detail" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        {tabIndex === 0 && (
          <Box display="flex" flexDirection="column" position="relative" pl={4}>
            {/* Vertical Line */}
            <Box
              sx={{
                position: "absolute",
                left: "28px",
                top: 0,
                bottom: 0,
                width: "4px",
                backgroundColor: "#ccc",
                zIndex: 1,
              }}
            />
            {timelineItems.map((item, idx) => (
              <Box key={idx} display="flex" alignItems="center" mb={3}>
                {/* Timeline Dot */}
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "#1976d2",
                    position: "absolute",
                    left: "20px",
                    zIndex: 2,
                  }}
                />
                {/* Timeline Item */}
                <Card
                  variant="outlined"
                  sx={{ ml: 4, width: "100%", zIndex: 2 }}
                >
                  <CardContent>
                    <Typography fontWeight={600}>{item.label}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="body1">
              Chi tiết các đối tượng sẽ hiển thị ở đây, ví dụ:
            </Typography>
            <ul>
              <li>A: Đối tượng người dùng</li>
              <li>B: Đối tượng sự kiện</li>
            </ul>
          </Box>
        )}
      </Box>

      {/* Right Column */}
      <Box flex={1} p={4} overflow="auto">
        <Typography variant="h6" gutterBottom>
          Mối quan hệ giữa các đối tượng theo thời gian
        </Typography>
        <Box display="flex" flexDirection="column" position="relative" pl={4}>
          {/* Vertical Line */}
          <Box
            sx={{
              position: "absolute",
              left: "28px",
              top: 0,
              bottom: 0,
              width: "4px",
              backgroundColor: "#ccc",
              zIndex: 1,
            }}
          />
          {relations.map((rel, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={3}>
              {/* Timeline Dot */}
              <Box
                sx={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#1976d2",
                  position: "absolute",
                  left: "20px",
                  zIndex: 2,
                }}
              />
              {/* Relation Item */}
              <Box display="flex" alignItems="center" gap={2} ml={4} zIndex={2}>
                <Card variant="outlined" sx={{ px: 2, py: 1, minWidth: 60 }}>
                  <Typography>{rel.from}</Typography>
                </Card>
                <ArrowForwardIcon color="action" />
                <Card variant="outlined" sx={{ px: 2, py: 1, minWidth: 60 }}>
                  <Typography>{rel.to}</Typography>
                </Card>
                <Typography variant="caption" color="text.secondary" ml={2}>
                  {rel.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineWithRelations;
