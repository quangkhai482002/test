import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box, Slider, Typography, Paper, Stack, CssBaseline } from '@mui/material';

const ThreeScene: React.FC = () => {
  // Refs để lưu trữ các đối tượng Three.js
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const lineRef = useRef<THREE.Object3D | null>(null);

  // State điều khiển từ MUI
  const [nodeCount, setNodeCount] = useState<number>(8);
  const [radius, setRadius] = useState<number>(5);
  
  // === DATA SCORE (mỗi node có 1 score) ===
  const [scores, setScores] = useState<number[]>([100, 85, 92, 78, 95, 88, 65, 72]);

  // Helper tạo text billboard (Sprite) - luôn quay mặt về camera
  const createTextSprite = (text: string, color = '#ffffff'): THREE.Sprite => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Style text to be bolder and clearer when inside sphere
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      depthTest: false,
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.4, 0.7, 1); // nhỏ hơn một chút để nằm gọn bên trong node
    return sprite;
  };

  // 1. Khởi tạo Scene (Chỉ chạy 1 lần khi mount)
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 8, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    nodesGroupRef.current = nodesGroup;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // 2. Đồng bộ scores khi nodeCount thay đổi
  useEffect(() => {
    setScores((prev) => {
      if (prev.length === nodeCount) return prev;
      if (prev.length < nodeCount) {
        const additional = Array.from(
          { length: nodeCount - prev.length },
          () => Math.floor(Math.random() * 60) + 40
        );
        return [...prev, ...additional];
      }
      return prev.slice(0, nodeCount);
    });
  }, [nodeCount]);

  // 3. Cập nhật Nodes + Score Label (bây giờ nằm CHÍNH GIỮA BÊN TRONG node)
  useEffect(() => {
    const scene = sceneRef.current;
    const nodesGroup = nodesGroupRef.current;
    if (!scene || !nodesGroup) return;

    // Xóa hết node + label cũ
    while (nodesGroup.children.length > 0) {
      const obj = nodesGroup.children[0];
      nodesGroup.remove(obj);

      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            (obj.material as THREE.Material).dispose();
          }
        }
      } else if (obj instanceof THREE.Sprite) {
        const mat = obj.material as THREE.SpriteMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      }
    }

    // Xóa vòng tròn cũ
    if (lineRef.current) {
      if (lineRef.current instanceof THREE.Mesh) {
        lineRef.current.geometry.dispose();
        (lineRef.current.material as THREE.Material).dispose();
      }
      scene.remove(lineRef.current);
    }

    const sphereGeom = new THREE.SphereGeometry(0.3, 32, 32);

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const score = scores[i] ?? 0;

      // === NODE SPHERE (làm trong suốt để thấy score bên trong) ===
      const material = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xff4081 : 0x00e5ff,
        emissive: i === 0 ? 0xff4081 : 0x00e5ff,
        emissiveIntensity: 0.6,
        transparent: true,     // ← quan trọng
        opacity: 0.82,         // ← đủ trong để thấy text bên trong
      });
      const node = new THREE.Mesh(sphereGeom, material);
      node.position.set(x, 0, z);
      nodesGroup.add(node);

      // === SCORE LABEL NẰM CHÍNH GIỮA BÊN TRONG NODE ===
      const scoreSprite = createTextSprite(score.toString(), 
      // labelColor
    );
      scoreSprite.position.set(x, 0, z);   // ← chính giữa node (bên trong)
      nodesGroup.add(scoreSprite);
    }

    // Vòng tròn nối
    const circleGeom = new THREE.TorusGeometry(radius, 0.03, 16, 100);
    const circleMat = new THREE.MeshBasicMaterial({
      color: 0x148231,
      transparent: true,
      opacity: 0.6,
    });
    const circle = new THREE.Mesh(circleGeom, circleMat);
    circle.rotation.x = Math.PI / 2;
    scene.add(circle);
    lineRef.current = circle;

  }, [nodeCount, radius, scores]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </>
  );
};

export default ThreeScene;