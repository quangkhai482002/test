// src/CustomNode.tsx
import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { TextField, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type ActionType = "fill" | "click" | "wait" | "validate";

interface CustomNodeData {
  action: ActionType;
  fieldType?: "username" | "password" | "general";
  xpath?: string;
  waitTime?: number;
  successXPath?: string;
  failXPath?: string;
  captchaXPath?: string;
  description?: string;
  onDelete: (id: string) => void;
}

const actionLabels = {
  fill: "Fill Input",
  click: "Click Element",
  wait: "Wait",
  validate: "Validate Result",
};

export const CustomNode = ({
  data,
  id,
}: {
  data: CustomNodeData;
  id: string;
}) => {
  const { setNodes } = useReactFlow();

  const updateNodeData = (updates: Partial<CustomNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...updates },
          };
        }
        return node;
      })
    );
  };

  const { action, fieldType = "general", onDelete } = data;

  return (
    <Box
      sx={{
        padding: 2,
        background: "#fff",
        borderRadius: 2,
        border: "2px solid #1976d2",
        minWidth: 300,
        boxShadow: 3,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          {actionLabels[action]}
          {action === "fill" && fieldType !== "general" && ` (${fieldType})`}
        </Typography>
        <IconButton size="small" onClick={() => onDelete(id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Fill & Click: XPath + Description */}
      {(action === "fill" || action === "click") && (
        <>
          <TextField
            fullWidth
            label="XPath"
            size="small"
            value={data.xpath || ""}
            onChange={(e) => updateNodeData({ xpath: e.target.value })}
            placeholder="//input[@id='username']"
            sx={{ mb: 1.5 }}
          />
          <TextField
            fullWidth
            label="Description"
            size="small"
            value={data.description || ""}
            onChange={(e) => updateNodeData({ description: e.target.value })}
            placeholder="Mô tả hành động này"
          />
        </>
      )}

      {/* Wait */}
      {action === "wait" && (
        <>
          <TextField
            fullWidth
            label="Thời gian chờ (ms)"
            type="number"
            size="small"
            value={data.waitTime || 1000}
            onChange={(e) =>
              updateNodeData({ waitTime: Number(e.target.value) || 1000 })
            }
            sx={{ mb: 1.5 }}
          />
          <TextField
            fullWidth
            label="Description"
            size="small"
            value={data.description || ""}
            onChange={(e) => updateNodeData({ description: e.target.value })}
            placeholder="Chờ sau khi submit..."
          />
        </>
      )}

      {/* Validate */}
      {action === "validate" && (
        <>
          <TextField
            fullWidth
            label="Success XPath"
            size="small"
            value={data.successXPath || ""}
            onChange={(e) => updateNodeData({ successXPath: e.target.value })}
            placeholder="//div[contains(text(),'Đăng nhập thành công')]"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Fail XPath"
            size="small"
            value={data.failXPath || ""}
            onChange={(e) => updateNodeData({ failXPath: e.target.value })}
            placeholder="//span[contains(text(),'Sai thông tin')]"
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Captcha XPath"
            size="small"
            value={data.captchaXPath || ""}
            onChange={(e) => updateNodeData({ captchaXPath: e.target.value })}
            placeholder="//iframe[@title='reCAPTCHA']"
            sx={{ mb: 1.5 }}
          />
          <TextField
            fullWidth
            label="Description"
            size="small"
            value={data.description || ""}
            onChange={(e) => updateNodeData({ description: e.target.value })}
            placeholder="Kiểm tra kết quả đăng nhập"
          />
        </>
      )}
    </Box>
  );
};
