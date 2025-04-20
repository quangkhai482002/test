import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { deleteReport, fetchReport } from "../services/api";
import { useEffect, useState } from "react";

const Report = () => {
  const [data, setData] = useState<any[]>([]);
  const handleGetReport = async () => {
    const res = await fetchReport();
    setData(res);
  };
  const handleDeleteReport = async (id: string) => {
    try {
      await deleteReport(id);
      handleGetReport();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  useEffect(() => {
    handleGetReport();
  }, []);
  const navigate = useNavigate();
  return (
    <Box p={3} marginTop={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Danh sách báo cáo</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
      </Box>
      <Grid2 container spacing={3}>
        {data.map((item) => (
          <Grid2 key={item.id}>
            <Card sx={{ width: 200, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                onClick={() => navigate(`/edit/${item.id}`)}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Button onClick={() => handleDeleteReport(item.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Report;
