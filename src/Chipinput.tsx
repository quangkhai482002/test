import React, { useState, useRef } from "react";
import { Box, Chip, InputBase } from "@mui/material";

interface ChipData {
  label: string;
  deletable: boolean;
}

const ChipTextField: React.FC = () => {
  // Pre-populated fake data (non-deletable chips)
  const initialChips: ChipData[] = [
    { label: "React", deletable: false },
    { label: "TypeScript", deletable: false },
    { label: "Material-UI", deletable: false },
  ];

  const [chips, setChips] = useState<ChipData[]>(initialChips);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setChips([...chips, { label: inputValue.trim(), deletable: true }]);
      setInputValue("");
      inputRef.current?.focus(); // Keep focus in input
    }
  };

  const handleDeleteChip = (chipToDelete: string) => {
    setChips(chips.filter((chip) => chip.label !== chipToDelete));
    inputRef.current?.focus(); // Keep focus after deleting chip
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
        p: 1,
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
        bgcolor: "background.paper",
        minHeight: 56, // Match default TextField height
        "&:hover": {
          borderColor: "grey.600",
        },
        "&:focus-within": {
          borderColor: "primary.main",
          borderWidth: 2,
        },
      }}
    >
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip.label}
          onDelete={
            chip.deletable ? () => handleDeleteChip(chip.label) : undefined
          }
          sx={{ m: 0.5 }}
        />
      ))}
      <InputBase
        inputRef={inputRef}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder={chips.length === 0 ? "Nhập và nhấn Enter để tạo chip" : ""}
        sx={{
          flex: 1,
          minWidth: 100, // Ensure enough space for input
          p: 1,
        }}
        multiline
      />
    </Box>
  );
};

export default ChipTextField;
