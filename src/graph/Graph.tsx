import React, { useEffect, useRef, useState } from "react";
import G6, { Graph } from "@antv/g6";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";

const GraphWithSvgNodes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false); // State to toggle search input visibility

  const homeSvg = `<svg width="800" height="800" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475s35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"/></svg>`;
  const homeSvgEncoded = `data:image/svg+xml;utf8,${encodeURIComponent(
    homeSvg
  )}`;
  const steps = ["Node 1", "Node 2", "Node 3", "Node 4"];

  useEffect(() => {
    if (!containerRef.current) return;

    const data = {
      nodes: [
        {
          id: "node1",
          label: "Home",
          icon: {
            show: true,
            img: homeSvgEncoded,
            width: 24,
            height: 24,
          },
          details: {
            description: "This is the Home node",
            connections: 1,
            type: "Entry Point",
          },
        },
        {
          id: "node2",
          label: "GitHub",
          icon: {
            show: true,
            img: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg",
            width: 24,
            height: 24,
          },
          details: {
            description: "This is the GitHub node",
            connections: 1,
            type: "Repository",
          },
        },
        {
          id: "node3",
          label: "GitHub",
          icon: {
            show: true,
            img: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg",
            width: 24,
            height: 24,
          },
          details: {
            description: "This is the GitHub node",
            connections: 1,
            type: "Repository",
          },
        },
      ],
      edges: [
        { source: "node1", target: "node2", label: "Edge 1-2" },
        { source: "node2", target: "node3", label: "Edge 2-3" },
      ],
    };

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const graph = new G6.Graph({
      container: containerRef.current,
      width,
      height,
      maxZoom: 1.5,
      fitView: true,
      defaultNode: {
        type: "circle",
        size: 60,
        style: {
          fill: "#5B8FF9",
          stroke: "#3D76DD",
          lineWidth: 3,
        },
        labelCfg: {
          position: "bottom",
          style: {
            fill: "#000",
            fontSize: 12,
            dy: 30,
          },
        },
      },
      defaultEdge: {
        style: {
          stroke: "#e2e2e2",
          lineWidth: 2,
          endArrow: true,
        },
      },
      layout: {
        type: "dagre",
        rankdir: "TB",
        nodesep: 50,
        ranksep: 50,
      },
      modes: {
        default: ["drag-canvas", "zoom-canvas"],
      },
    });

    // Handle node click to highlight and show details
    graph.on("node:click", (evt) => {
      const node = evt.item;
      const model = node?.getModel();

      // Reset all nodes to default style
      graph.getNodes().forEach((n) => {
        graph.updateItem(n, {
          style: {
            fill: "#5B8FF9",
            stroke: "#3D76DD",
            lineWidth: 3,
            shadowBlur: 0,
          },
        });
      });

      // Highlight the clicked node
      if (node) {
        graph.updateItem(node, {
          style: {
            fill: "#FFD700",
            stroke: "#FFA500",
            lineWidth: 4,
            shadowBlur: 10,
          },
        });
      }

      // Update selected node and switch to Details tab
      setSelectedNode(model);
      setActiveTab(1);
    });

    // Reset highlight when clicking on canvas
    graph.on("canvas:click", () => {
      graph.getNodes().forEach((n) => {
        graph.updateItem(n, {
          style: {
            fill: "#5B8FF9",
            stroke: "#3D76DD",
            lineWidth: 3,
            shadowBlur: 0,
          },
        });
      });
      setSelectedNode(null);
    });

    graphRef.current = graph;
    graph.data(data);
    graph.render();

    return () => {
      graph.destroy();
    };
  }, [homeSvgEncoded]);

  // Search node function
  const handleSearchNode = () => {
    if (!graphRef.current) return;

    const graph = graphRef.current;
    const nodes = graph.getNodes();

    // Reset all nodes to default style
    nodes.forEach((n) => {
      graph.updateItem(n, {
        style: {
          fill: "#5B8FF9",
          stroke: "#3D76DD",
          lineWidth: 3,
          shadowBlur: 0,
        },
      });
    });

    if (searchQuery.trim() === "") {
      setSelectedNode(null);
      return;
    }

    // Find node by ID or label (case-insensitive)
    const foundNode = nodes.find((n) => {
      const model = n.getModel();
      return (
        (typeof model.id === "string" &&
          model.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof model.label === "string" &&
          model.label.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    if (foundNode) {
      const model = foundNode.getModel();
      // Highlight the found node
      graph.updateItem(foundNode, {
        style: {
          fill: "#FFD700",
          stroke: "#FFA500",
          lineWidth: 4,
          shadowBlur: 10,
        },
      });
      // Center the view on the found node
      graph.focusItem(foundNode);
      // Update selected node and switch to Details tab
      setSelectedNode(model);
      setActiveTab(1);
    } else {
      setSelectedNode(null);
      // Optionally, you can add a notification here if no node is found
    }
  };

  const handleZoomIn = () => {
    if (graphRef.current) {
      const zoom = graphRef.current.getZoom();
      graphRef.current.zoomTo(zoom + 0.2);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      const zoom = graphRef.current.getZoom();
      graphRef.current.zoomTo(zoom - 0.2);
    }
  };

  const handleReset = () => {
    if (graphRef.current) {
      graphRef.current.fitView();
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setSearchQuery(""); // Clear search query when toggling
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar with Tabs */}
      <Paper
        elevation={3}
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sidebar
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}
        >
          <Tab label="Steps" />
          <Tab label="Details" />
        </Tabs>
        {activeTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Graph Steps
            </Typography>
            <Stepper orientation="vertical" activeStep={-1}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Details
            </Typography>
            {selectedNode ? (
              <Typography variant="body2">
                <strong>Node ID:</strong> {selectedNode.id}
                <br />
                <strong>Label:</strong> {selectedNode.label}
                <br />
                <strong>Description:</strong>{" "}
                {selectedNode.details?.description || "N/A"}
                <br />
                <strong>Connections:</strong>{" "}
                {selectedNode.details?.connections || 0}
                <br />
                <strong>Type:</strong> {selectedNode.details?.type || "Unknown"}
              </Typography>
            ) : (
              <Typography variant="body2">
                Select a node or search to view its details here.
              </Typography>
            )}
          </Box>
        )}
      </Paper>
      {/* Control Buttons and Search Input */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <button onClick={handleZoomIn} style={{ marginRight: 5 }}>
          ➕ Zoom In
        </button>
        <button onClick={handleZoomOut} style={{ marginRight: 5 }}>
          ➖ Zoom Out
        </button>
        <button onClick={handleReset} style={{ marginRight: 5 }}>
          🔄 Reset
        </button>
        <button onClick={toggleSearch}>
          🔍 {showSearch ? "Hide Search" : "Search"}
        </button>
        {showSearch && (
          <Box sx={{ marginTop: 1, display: "flex", gap: 1 }}>
            <TextField
              size="small"
              label="Search Node"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchNode();
                }
              }}
              placeholder="Enter node ID or label"
            />
            <Button
              variant="contained"
              onClick={handleSearchNode}
              sx={{ minWidth: "auto" }}
            >
              Go
            </Button>
          </Box>
        )}
      </div>
      <Box flex={1} ref={containerRef} />
    </Box>
  );
};

export default GraphWithSvgNodes;
