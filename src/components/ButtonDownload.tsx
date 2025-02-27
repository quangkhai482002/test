import { Box, Button } from "@mui/material";

interface ButtonDownloadProps {
  onSave?: () => void;
}
const ButtonDownload = ({ onSave }: ButtonDownloadProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onSave}>Save</Button>
      <Button>Download as html</Button>
    </Box>
  );
};

export default ButtonDownload;
