// import React, { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Points, PointMaterial, Float } from '@react-three/drei';
// import * as THREE from 'three';

// // This is the "Magic" — A GLSL shader for organic movement
// const vertexShader = `
//   varying float vZ;
//   uniform float uTime;
  
//   // Helper for noise (Classic Perlin)
//   vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//   vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//   vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
//   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
//   float snoise(vec3 v) {
//     const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//     const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
//     vec3 i  = floor(v + dot(v, C.yyy) );
//     vec3 x0 =   v - i + dot(i, C.xxx) ;
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min( g.xyz, l.zxy );
//     vec3 i2 = max( g.xyz, l.zxy );
//     vec3 x1 = x0 - i1 + C.xxx;
//     vec3 x2 = x0 - i2 + C.yyy;
//     vec3 x3 = x0 - D.yyy;
//     i = mod289(i);
//     vec4 p = permute( permute( permute(
//                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
//     float n_ = 0.142857142857;
//     vec3  ns = n_ * D.wyz - D.xzx;
//     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_ );
//     vec4 x = x_ *ns.x + ns.yyyy;
//     vec4 y = y_ *ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);
//     vec4 b0 = vec4( x.xy, y.xy );
//     vec4 b1 = vec4( x.zw, y.zw );
//     vec4 s0 = floor(b0)*2.0 + 1.0;
//     vec4 s1 = floor(b1)*2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));
//     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
//     vec3 p0 = vec3(a0.xy,h.x);
//     vec3 p1 = vec3(a0.zw,h.y);
//     vec3 p2 = vec3(a1.xy,h.z);
//     vec3 p3 = vec3(a1.zw,h.w);
//     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//     p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
//     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
//   }

//   void main() {
//     // Distort the position based on noise + time
//     float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, uTime * 0.4));
//     vec3 newPos = position + (normal * noise * 0.3);
    
//     vZ = newPos.z; // Pass Z to fragment for color mapping
//     vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
//     gl_Position = projectionMatrix * mvPosition;
//     gl_PointSize = 3.0; // Size of the glowing dots
//   }
// `;

// const fragmentShader = `
//   varying float vZ;
//   void main() {
//     // Bright neon green color
//     vec3 color = vec3(0.2, 1.0, 0.3);
//     // Add some variation based on depth
//     gl_FragColor = vec4(color, 0.8);
//   }
// `;

// const OrbMesh = () => {
//   const meshRef = useRef<THREE.Points>(null!);
  
//   // Custom Uniforms to pass data to the Shader
//   const uniforms = useMemo(() => ({
//     uTime: { value: 0.0 },
//   }), []);

//   useFrame((state) => {
//     const { clock } = state;
//     // Update time for the animation
//     if (meshRef.current) {
//       (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
//       // Slow rotation for the 3D feel
//       meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
//     }
//   });

//   return (
//     <points ref={meshRef}>
//       {/* Icosahedron gives a spherical distribution of points. 
//           Detail 20-30 gives it that dense mesh look from your photo.
//       */}
//       <icosahedronGeometry args={[2, 30]} />
//       <shaderMaterial
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         uniforms={uniforms}
//         transparent
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// export default function GlowOrbApp() {
//   return (
//     <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
//       <Canvas camera={{ position: [0, 0, 5] }}>
//         <ambientLight intensity={0.5} />
//         <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//           <OrbMesh />
//         </Float>
//       </Canvas>
//     </div>
//   );
// }

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- PHẦN TÍNH TOÁN TOÁN HỌC ---
// Hàm này tạo ra mã SVG path cho một vòng tròn nhưng "méo mó" một chút
// dựa trên các giá trị ngẫu nhiên (để tạo hiệu ứng "giật").
const createJitteryCirclePath = (
  radius: number,     // Bán kính cơ bản
  center: number,     // Tâm (cả X và Y)
  numPoints: number,  // Số điểm kiểm soát đường cong (càng nhiều càng mượt nhưng lag)
  jitterStr: number   // Độ mạnh của hiệu ứng "giật"
) => {
  const points: { x: number; y: number }[] = [];
  
  // 1. Tạo các điểm cơ bản trên vòng tròn
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    // Thêm một chút ngẫu nhiên vào bán kính của mỗi điểm
    const randomRadius = radius + (Math.random() - 0.5) * jitterStr;
    
    const x = center + randomRadius * Math.cos(angle);
    const y = center + randomRadius * Math.sin(angle);
    points.push({ x, y });
  }

  // 2. Nối các điểm lại bằng đường cong Catmull-Rom (để nó mượt)
  // Trong SVG, chúng ta dùng lệnh C (Cubic Bezier)
  let pathData = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < numPoints; i++) {
    const p0 = points[(i - 1 + numPoints) % numPoints];
    const p1 = points[i];
    const p2 = points[(i + 1) % numPoints];
    const p3 = points[(i + 2) % numPoints];

    // Tính toán các điểm kiểm soát Bezier từ Catmull-Rom
    // (Đây là công thức chuẩn để nối điểm thành đường cong mượt)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return pathData + ' Z'; // Z để đóng vòng tròn
};

// --- COMPONENT CHÍNH ---
const JitteringRing: React.FC = () => {
  const SIZE = 400;         // Kích thước vùng vẽ SVG
  const CENTER = SIZE / 2;   // Tâm
  const RADIUS = 150;       // Bán kính vòng tròn chính
  const NUM_POINTS = 12;    // Số điểm (giảm xuống để thấy "giật" rõ hơn, tăng lên để mượt hơn)
  const JITTER_STRENGTH = 25; // Độ lệch tối đa (pixel) khi "giật"

  // Tạo một mảng các "hình dạng" khác nhau để Framer Motion chuyển đổi qua lại
  // useMemo giúp không tính toán lại mỗi lần render
  const pathVariants = useMemo(() => {
    const variants: string[] = [];
    for (let i = 0; i < 6; i++) { // Tạo 6 hình dạng ngẫu nhiên khác nhau
      variants.push(createJitteryCirclePath(RADIUS, CENTER, NUM_POINTS, JITTER_STRENGTH));
    }
    return variants;
  }, [RADIUS, CENTER, NUM_POINTS, JITTER_STRENGTH]);

  return (
    <div style={{
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: '#050505', // Nền đen
      overflow: 'hidden'
    }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        
     
        <motion.path
          d={pathVariants[0]} // Bắt đầu từ hình dạng đầu tiên
          animate={{
            d: pathVariants, // Chuyển đổi qua lại giữa các hình dạng
          }}
          transition={{
            duration: 0.8,     // Tốc độ chuyển đổi (càng nhỏ càng giật nhanh)
            repeat: Infinity, // Lặp lại vô hạn
            repeatType: "reverse", // Đi xuôi rồi đi ngược lại
            ease: "easeInOut"  // Kiểu chuyển động
          }}
          stroke="#10ff30"     // Màu xanh lá (neon)
          strokeWidth={8}      // Độ dày lớn cho lớp mờ
          fill="none"
          style={{ filter: 'blur(10px)', opacity: 0.5 }} // Làm mờ đi
        />

       
        <motion.path
          d={pathVariants[0]}
          animate={{
            d: pathVariants,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          stroke="#30ff50"     // Màu xanh lá sáng hơn
          strokeWidth={3}      // Độ dày vừa phải
          fill="none"
          strokeLinecap="round" // Bo tròn đầu đường kẻ
          style={{ filter: 'drop-shadow(0 0 5px #30ff50)' }} // Thêm chút bóng sáng trực tiếp
        />
      </svg>
    </div>
  );
};

export default JitteringRing;
