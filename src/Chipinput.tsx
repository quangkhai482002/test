import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";

// Dữ liệu giả
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

  return (
    <Card>
      <CardHeader title="Header Title" />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          {displayData.map((item, index) => (
            <React.Fragment key={index}>
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
          ))}
        </Grid>
        {fakeData.length > 2 && (
          <Button onClick={() => setShowAll(!showAll)} sx={{ mt: 2 }}>
            {showAll ? "Ẩn bớt" : "Hiển thị thêm"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default MyInterface;
