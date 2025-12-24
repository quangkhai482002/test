// src/FlowWithFAB.tsx
import React, { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  NodeTypes,
  getOutgoers,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {
  Fab,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomNode } from "./CustomNode";

const initialNodes: Node[] = [
  {
    id: "start",
    type: "input",
    position: { x: 250, y: 50 },
    data: { label: "Start" },
    deletable: false,
  },
  {
    id: "end",
    type: "output",
    position: { x: 250, y: 600 },
    data: { label: "End" },
    deletable: false,
  },
];

const initialEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

type ActionType = "fill" | "click" | "wait" | "validate";

export default function FlowWithFAB() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newAction, setNewAction] = React.useState<
    "fill-username" | "fill-password" | "click" | "wait" | "validate"
  >("fill-username");

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
    );
  };

  const addNode = () => {
    let action: ActionType = "fill";
    let fieldType: "username" | "password" | "general" = "general";
    let defaultDescription = "";

    switch (newAction) {
      case "fill-username":
        action = "fill";
        fieldType = "username";
        defaultDescription = "Điền tên đăng nhập";
        break;
      case "fill-password":
        action = "fill";
        fieldType = "password";
        defaultDescription = "Điền mật khẩu";
        break;
      case "click":
        action = "click";
        defaultDescription = "Click vào phần tử";
        break;
      case "wait":
        action = "wait";
        defaultDescription = "Chờ một khoảng thời gian";
        break;
      case "validate":
        action = "validate";
        defaultDescription = "Kiểm tra kết quả đăng nhập";
        break;
    }

    const newNode: Node = {
      id: getNodeId(),
      type: "custom",
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 400 + 150,
      },
      data: {
        action,
        fieldType,
        xpath: "",
        waitTime: 1000,
        successXPath: "",
        failXPath: "",
        captchaXPath: "",
        description: defaultDescription,
        onDelete: deleteNode,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // Hàm sinh JSON script_login đúng yêu cầu
  const generateLoginScript = () => {
    const startNode = nodes.find((n) => n.id === "start");
    if (!startNode) return null;

    const steps: any[] = [];
    const visited = new Set<string>();
    let validateData: any = null;

    const traverse = (node: Node) => {
      if (visited.has(node.id) || node.id === "start" || node.id === "end")
        return;
      visited.add(node.id);

      const data = node.data as any;

      if (data.action === "validate") {
        validateData = {
          success: data.successXPath?.trim() || "",
          fail: data.failXPath?.trim() || "",
          captcha: data.captchaXPath?.trim() || "",
        };
      } else {
        const step: any = {
          action: data.action,
          description: data.description?.trim() || "",
        };

        if (data.action === "fill" || data.action === "click") {
          step.xpath = data.xpath?.trim() || "";
          // Optional: thêm value placeholder cho username/password
          if (data.action === "fill" && data.fieldType === "username")
            step.value = "YOUR_USERNAME";
          if (data.action === "fill" && data.fieldType === "password")
            step.value = "YOUR_PASSWORD";
        }

        if (data.action === "wait") {
          step.time = data.waitTime || 1000;
        }

        steps.push(step);
      }

      const outgoers = getOutgoers(node, nodes, edges);
      outgoers.forEach(traverse);
    };

    const startOutgoers = getOutgoers(startNode, nodes, edges);
    startOutgoers.forEach(traverse);

    return {
      script_login: {
        steps,
        validate: validateData || { success: "", fail: "", captcha: "" },
      },
    };
  };

  const handleExport = () => {
    const script = generateLoginScript();
    if (!script || script.script_login.steps.length === 0) {
      alert("Chưa có hành động nào trong flow hoặc chưa kết nối từ Start!");
      return;
    }

    const jsonString = JSON.stringify(script, null, 2);
    console.log(jsonString);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} size={1} />
      </ReactFlow>

      {/* Panel chọn loại node */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: 4,
          display: "flex",
          gap: 2,
          alignItems: "end",
          zIndex: 10,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Loại hành động</InputLabel>
          <Select
            value={newAction}
            label="Loại hành động"
            onChange={(e) => setNewAction(e.target.value as any)}
          >
            <MenuItem value="fill-username">Fill Username (XPath)</MenuItem>
            <MenuItem value="fill-password">Fill Password (XPath)</MenuItem>
            <MenuItem value="click">Click Element (XPath)</MenuItem>
            <MenuItem value="wait">Wait (thời gian ms)</MenuItem>
            <MenuItem value="validate">Validate Result (3 XPath)</MenuItem>
          </Select>
        </FormControl>

        <Fab color="primary" onClick={addNode}>
          <AddIcon />
        </Fab>
      </Box>

      {/* Nút Export JSON */}
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={handleExport}
        sx={{
          position: "absolute",
          bottom: 32,
          right: 32,
          zIndex: 10,
          px: 4,
          py: 1.5,
          fontWeight: "bold",
        }}
      >
        Export Login Script JSON
      </Button>
    </Box>
  );
}
