// import { Stack, TextField } from "@mui/material";
// import { useState } from "react";

// export default function CronBuilder() {
//   const [cron, setCron] = useState({
//     minute: "*/5",
//     hour: "*",
//     day: "*",
//     month: "*",
//     weekDay: "*",
//   });

//   const cronString = `${cron.minute} ${cron.hour} ${cron.day} ${cron.month} ${cron.weekDay}`;

//   const handleChange =
//     (field: keyof typeof cron) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       setCron({ ...cron, [field]: e.target.value });
//     };

//   return (
//     <Stack
//       sx={{
//         gap: 2,
//         padding: 2,
//       }}
//     >
//       <Stack direction="row" spacing={1}>
//         <TextField
//           label="Minute"
//           value={cron.minute}
//           onChange={handleChange("minute")}
//         />
//         <TextField
//           label="Hour"
//           value={cron.hour}
//           onChange={handleChange("hour")}
//         />
//         <TextField
//           label="Day"
//           value={cron.day}
//           onChange={handleChange("day")}
//         />
//         <TextField
//           label="Month"
//           value={cron.month}
//           onChange={handleChange("month")}
//         />
//         <TextField
//           label="Weekday"
//           value={cron.weekDay}
//           onChange={handleChange("weekDay")}
//         />
//       </Stack>

//       <TextField
//         label="Cron result"
//         value={cronString}
//         InputProps={{ readOnly: true }}
//         fullWidth
//       />
//     </Stack>
//   );
// }

import { TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { isValidCron } from "cron-validator";

export default function CronInputWithValidate() {
  const [cron, setCron] = useState("");

  const isValid = cron === "" || isValidCron(cron, { seconds: false });

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
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
        size="small" // ← optional, looks cleaner for cron
      />

      {/* ← This is what you want */}
      {cron && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: "block", fontFamily: "monospace" }}
        >
          Current value: <strong>{cron}</strong>
        </Typography>
      )}
    </Box>
  );
}
