import { Card, CardContent, Box, Typography, CardHeader } from "@mui/material";

type Props = {
  //   title: string;
  color?: string;
  children?: React.ReactNode;
};

export default function CustomCard({
  //   title,
  color = "#1976d2",
  children,
}: Props) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 60,
          borderBottom: "1px solid #eee",
        }}
      >
        <Box
          sx={{
            width: 6,
            height: "100%",
            backgroundColor: color,
            borderTopLeftRadius: 8,
          }}
        />

        <Typography sx={{ ml: 2, fontWeight: 600 }}>abc</Typography>
      </Box> */}
      <CardHeader
        title={
          <Box
            sx={{
              height: 4,
              width: "100%",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#eee",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: "40%",
                backgroundColor: color,
                animation: "slide 1.5s infinite",
                "@keyframes slide": {
                  "0%": { left: "-40%" },
                  "100%": { left: "100%" },
                },
              }}
            >
              <Typography
                sx={{
                  ml: 2,
                  fontWeight: 600,
                  color: "#fff",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                abc
              </Typography>
            </Box>
          </Box>
        }
      ></CardHeader>

      {/* Content */}
      <CardContent>cdf</CardContent>
    </Card>
  );
}
