import { Box, Typography } from "@mui/material";
import ButtonDownload from "./ButtonDownload";

interface HeaderProps {
  onSave?: () => void;
}

const Header = ({ onSave }: HeaderProps) => {
  return (
    <Box
      marginTop={8}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Document Editor
      </Typography>
      <ButtonDownload onSave={onSave} />
    </Box>
  );
};

export default Header;
