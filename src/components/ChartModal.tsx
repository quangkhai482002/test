// ChartModal.tsx
import { Box, Button, Modal, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import Chart from "./Chart"; // Điều chỉnh đường dẫn nếu cần

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  onInsertImage: (imageData: string) => void;
}

const ChartModal: React.FC<ChartModalProps> = ({
  open,
  onClose,
  onInsertImage,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddChart = async () => {
    if (!chartRef.current) return;

    try {
      setIsLoading(true);
      const canvas = await html2canvas(chartRef.current);
      const imageData = canvas.toDataURL("image/png");
      onInsertImage(imageData); // Gửi imageData về parent component
    } catch (error) {
      console.error("Error converting chart to image", error);
    } finally {
      setIsLoading(false);
      onClose(); // Đóng modal
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Preview Chart
        </Typography>
        <div
          ref={chartRef}
          style={{
            width: 400,
            height: 300,
            margin: "0 auto",
          }}
        >
          <Chart />
        </div>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            onClick={handleAddChart}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to Document"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChartModal;
