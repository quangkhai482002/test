import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const options = [
  { id: 1, label: "Lựa chọn 1" },
  { id: 2, label: "Lựa chọn 2" },
  { id: 3, label: "Lựa chọn 3" },
];

export default function CheckboxWithUrlDebounce() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<number[]>([]);

  // Load từ URL khi mở trang
  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      setSelected(ids.split(",").map((id) => parseInt(id)));
    }
  }, [searchParams]);

  // Debounce update URL
  useEffect(() => {
    const handler = setTimeout(() => {
      if (selected.length > 0) {
        setSearchParams({ ids: selected.join(",") });
      } else {
        setSearchParams({});
      }
    }, 500); // ⏱️ delay 500ms

    return () => clearTimeout(handler); // huỷ nếu user tick liên tục
  }, [selected, setSearchParams]);

  const handleChange = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Box>
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            control={
              <Checkbox
                checked={selected.includes(opt.id)}
                onChange={() => handleChange(opt.id)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
