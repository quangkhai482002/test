import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

// ====== DATA ======
type NodeType = {
  id: string;
  label: string;
  value: number;
  description: string;
};

const nodes: NodeType[] = [
  { id: "1", label: "Node A", value: 10, description: "Chi tiết Node A" },
  { id: "2", label: "Node B", value: 20, description: "Chi tiết Node B" },
  { id: "3", label: "Node C", value: 15, description: "Chi tiết Node C" },
  { id: "4", label: "Node D", value: 25, description: "Chi tiết Node D" },
  { id: "5", label: "Node E", value: 18, description: "Chi tiết Node E" },
];

export default function ThreeGraph() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f172a");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // ===== LIGHT =====
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);

    // ===== CREATE NODES (CIRCLE) =====
    const radius = 15;
    const meshes: THREE.Mesh[] = [];

    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2;

      const geometry = new THREE.SphereGeometry(node.value / 10, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: "#22c55e",
        emissive: "#14532d",
      });

      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = radius * Math.cos(angle);
      sphere.position.y = radius * Math.sin(angle);

      sphere.userData = node;

      meshes.push(sphere);
      scene.add(sphere);
    });

    // ===== SMOOTH CIRCLE LINE (IMPORTANT) =====
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      2 * Math.PI,
      false,
      0
    );

    const points = curve.getPoints(120);

    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );

    const material = new THREE.LineBasicMaterial({
      color: "#38bdf8",
      transparent: true,
      opacity: 0.8,
    });

    const circle = new THREE.LineLoop(geometry, material);
    scene.add(circle);

    // ===== RAYCAST CLICK =====
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh;
        setSelectedNode(obj.userData as NodeType);
      }
    };

    window.addEventListener("click", onClick);

    // ===== HOVER EFFECT =====
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      meshes.forEach((m) => m.scale.set(1, 1, 1));

      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh;
        obj.scale.set(1.4, 1.4, 1.4);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // ===== ANIMATION =====
    const animate = () => {
      requestAnimationFrame(animate);

      meshes.forEach((m) => {
        m.rotation.y += 0.01;
      });

      circle.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // ===== CLEANUP =====
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />

      <Dialog open={!!selectedNode} onClose={() => setSelectedNode(null)}>
        <DialogTitle>{selectedNode?.label}</DialogTitle>
        <DialogContent>
          <Typography>Value: {selectedNode?.value}</Typography>
          <Typography>{selectedNode?.description}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
