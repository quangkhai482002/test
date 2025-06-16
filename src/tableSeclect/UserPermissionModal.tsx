import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Autocomplete,
} from "@mui/material";

const userList = [
  "Alice Nguyen",
  "Bob Tran",
  "Charlie Le",
  "David Pham",
  "Evelyn Vo",
  "Frank Doan",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserPermissionModal: React.FC<Props> = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (user: string) => {
    console.log("Selected from list:", user);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add User Permission</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            freeSolo
            options={userList}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            onChange={(_, value) => {
              setSelectedUser(value);
              if (value) {
                console.log("Selected from autocomplete:", value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search user" variant="outlined" />
            )}
          />
        </Box>

        <List>
          {userList.map((user) => (
            <ListItem
              key={user}
              component="button"
              onClick={() => handleUserClick(user)}
              sx={{
                textAlign: "left",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionModal;
