// src/CustomEdgeWithDelete.tsx
import React from "react";
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomEdgeWithDelete({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onDelete = () => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  };

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="24"
            markerHeight="24"
            refX="24"
            refY="12"
            orient="auto"
          >
            <polygon points="0 0, 24 12, 0 24" fill="#1976d2" />
          </marker>
        </defs>
      </svg>
      {/* Đường edge + mũi tên kín rõ ràng */}
      <BaseEdge
        path={edgePath}
        style={{ strokeWidth: 3, stroke: "#1976d2", ...style }}
        markerEnd="url(#arrowhead)"
      />

      {/* Nút X ở giữa edge */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all", // Cho phép click
          }}
          className="nodrag nopan" // Quan trọng: tránh conflict với pan/drag canvas
        >
          <IconButton
            size="small"
            color="error"
            onClick={onDelete}
            sx={{
              backgroundColor: "white",
              boxShadow: 3,
              "&:hover": { backgroundColor: "#ffebee" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
