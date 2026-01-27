const aliases: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@hourly": "0 * * * *",
};

import { TextField, Typography, Box } from "@mui/material";
import { useState, useMemo } from "react";
import { isValidCron } from "cron-validator";
import cronstrue from "cronstrue";
import parser from "cron-parser";

export default function CronGuruLike() {
  const [cron, setCron] = useState("");

  const isValid = cron === "" || isValidCron(cron, { seconds: false });

  const humanText = useMemo(() => {
    if (!isValid || !cron) return "";
    try {
      return cronstrue.toString(cron, { locale: "vi" });
    } catch {
      return "";
    }
  }, [cron, isValid]);

  const nextRuns = useMemo(() => {
    if (!isValid || !cron) return [];
    try {
      const interval = parser.parse(cron);
      return Array.from({ length: 5 }, () => interval.next().toString());
    } catch {
      return [];
    }
  }, [cron, isValid]);

  return (
    <Box sx={{ width: 500 }}>
      <TextField
        label="Cron expression"
        value={cron}
        onChange={(e) => setCron(e.target.value)}
        fullWidth
        error={!isValid && cron !== ""}
        helperText={
          isValid || cron === ""
            ? "Ví dụ: */5 * * * *"
            : "Cron expression không hợp lệ"
        }
        size="small"
      />

      {/* Human readable */}
      {humanText && (
        <Typography variant="h6" sx={{ mt: 1 }}>
          {humanText}
        </Typography>
      )}

      {/* Next runs */}
      {nextRuns.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption">Next runs:</Typography>
          {nextRuns.map((d, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{ display: "block", fontFamily: "monospace" }}
            >
              {d}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
