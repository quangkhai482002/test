import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { format, subDays, addDays } from "date-fns";

interface ScanDate {
  date: string;
  scanned: boolean;
}

const generateDateRange = (
  startDate: Date,
  totalDays: number,
  scannedDates: string[]
): ScanDate[] => {
  return Array.from({ length: totalDays }, (_, i) => {
    const date = subDays(startDate, i);
    return {
      date: format(date, "yyyy-MM-dd"),
      scanned: scannedDates.includes(format(date, "yyyy-MM-dd")),
    };
  });
};

const fakeScannedDates = [
  format(subDays(new Date(), 1), "yyyy-MM-dd"),
  format(subDays(new Date(), 3), "yyyy-MM-dd"),
  format(subDays(new Date(), 5), "yyyy-MM-dd"),
  format(subDays(new Date(), 6), "yyyy-MM-dd"),
];

const DateScanList: React.FC = () => {
  const [offset, setOffset] = useState(0); // để điều hướng next/prev
  const [showScanned, setShowScanned] = useState(true);
  const [showUnscanned, setShowUnscanned] = useState(true);

  const today = useMemo(() => new Date(), []);
  const startDate = subDays(today, offset);
  const dateList = useMemo(() => {
    return generateDateRange(startDate, 30, fakeScannedDates);
  }, [offset]);

  const filteredList = useMemo(() => {
    return dateList.filter((item) => {
      if (item.scanned && showScanned) return true;
      if (!item.scanned && showUnscanned) return true;
      return false;
    });
  }, [dateList, showScanned, showUnscanned]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Danh sách ngày quét (30 ngày)
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={() => setOffset(offset + 30)}>
          ← Trước
        </Button>
        <Button
          variant="contained"
          onClick={() => setOffset(Math.max(0, offset - 30))}
        >
          Sau →
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={showScanned}
              onChange={(e) => setShowScanned(e.target.checked)}
            />
          }
          label="Hiện ngày đã quét"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showUnscanned}
              onChange={(e) => setShowUnscanned(e.target.checked)}
            />
          }
          label="Hiện ngày chưa quét"
        />
      </Box>

      <Grid container spacing={1}>
        {filteredList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.date}>
            <Box
              p={2}
              borderRadius={2}
              bgcolor={item.scanned ? "green.100" : "grey.300"}
            >
              <Typography fontWeight="bold">{item.date}</Typography>
              <Typography variant="body2">
                {item.scanned ? "Đã quét" : "Chưa quét"}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DateScanList;
