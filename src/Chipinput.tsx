import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Box,
  Stack,
  ButtonGroup,
} from "@mui/material";

const fakeData = [
  { name: "Thành phần 1", content: "Nội dung 1" },
  { name: "Thành phần 2", content: "Nội dung 2" },
  { name: "Thành phần 3", content: "Nội dung 3" },
  { name: "Thành phần 4", content: "Nội dung 4" },
  { name: "Thành phần 5", content: "Nội dung 5" },
];

function MyInterface() {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? fakeData : fakeData.slice(0, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã sao chép: " + text);
    });
  };

  return (
    <>
      {displayData.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardHeader
            title={
              <Box
                sx={{
                  bgcolor: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover .action-buttons": {
                    opacity: 1,
                    visibility: "visible",
                  },
                  p: 1,
                }}
              >
                <Typography variant="h6">Header Title</Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  className="action-buttons"
                  sx={{
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <ButtonGroup size="small" aria-label="Small button group">
                    <Button size="small" variant="outlined">
                      Sửa
                    </Button>
                    <Button size="small" variant="outlined">
                      Xóa
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleCopy(item.content)}
                    >
                      Copy
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Box>
            }
          />

          <CardContent>
            <Grid container direction="column" spacing={2}>
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h6">{item.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{item.content}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {index < displayData.length - 1 && <Divider />}
              </React.Fragment>
            </Grid>
          </CardContent>
        </Card>
      ))}
      {fakeData.length > 2 && (
        <Button onClick={() => setShowAll(!showAll)} sx={{ mt: 2 }}>
          {showAll ? "Ẩn bớt" : "Hiển thị thêm"}
        </Button>
      )}
    </>
  );
}

export default MyInterface;
