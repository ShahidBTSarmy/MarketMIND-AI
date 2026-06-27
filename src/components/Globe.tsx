import { useEffect, useRef, useState, MouseEvent } from "react";

interface GlobeProps {
  positivePercentage?: number;
}

export default function Globe({ positivePercentage = 64 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let localYRotation = rotation.y;

    // Handle resizing correctly using ResizeObserver to prevent visual distortion
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    // Generate globe points
    const points: { x: number; y: number; z: number; color: string }[] = [];
    const numPoints = 600;
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      
      const r = 110; // Globe Radius
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      // Color distribution mimicking positive (blue/cyan) vs others (yellow/red)
      const isPositive = Math.random() < (positivePercentage / 100);
      const color = isPositive ? "#bdc2ff" : (Math.random() < 0.6 ? "#a2e7ff" : "#ffb4ab");
      points.push({ x, y, z, color });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw background ambient halo
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 140);
      grad.addColorStop(0, "rgba(189, 194, 255, 0.04)");
      grad.addColorStop(1, "rgba(5, 8, 22, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Automatically rotate over time if not dragging
      if (!isDragging) {
        localYRotation += 0.003;
      } else {
        localYRotation = rotation.y;
      }

      // Draw wireframe grid rings (Bauhaus inspired structure)
      ctx.lineWidth = 0.5;
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += Math.PI / 6) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        const rLat = 110 * Math.cos(lat);
        const yLat = 110 * Math.sin(lat);
        
        // 3D project ring
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const lon = (s / steps) * Math.PI * 2 + localYRotation;
          const x = rLat * Math.sin(lon);
          const z = rLat * Math.cos(lon);

          // Rotate around X-axis
          const rx = x;
          const ry = yLat * Math.cos(rotation.x) - z * Math.sin(rotation.x);
          const rz = yLat * Math.sin(rotation.x) + z * Math.cos(rotation.x);

          // Perspective scaling
          const fov = 350;
          const scale = fov / (fov + rz);
          const px = cx + rx * scale;
          const py = cy + ry * scale;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Render points with perspective depth sorting
      const sortedPoints = points
        .map(pt => {
          // Rotate points around Y axis (auto rotation)
          const cosY = Math.cos(localYRotation);
          const sinY = Math.sin(localYRotation);
          const x1 = pt.x * cosY - pt.z * sinY;
          const z1 = pt.x * sinY + pt.z * cosY;

          // Rotate points around X axis (tilt)
          const cosX = Math.cos(rotation.x);
          const sinX = Math.sin(rotation.x);
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = pt.y * sinX + z1 * cosX;

          return { x: x1, y: y2, z: z2, color: pt.color };
        })
        .sort((a, b) => b.z - a.z); // Farther points first

      sortedPoints.forEach(pt => {
        const fov = 350;
        const scale = fov / (fov + pt.z);
        const px = cx + pt.x * scale;
        const py = cy + pt.y * scale;

        // Clip points outside radius just in case
        const alpha = Math.max(0.1, Math.min(1, (350 - pt.z) / 450));
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(px, py, pt.z > 0 ? 1 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [rotation, isDragging, positivePercentage]);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev.x + dy * 0.005)),
      y: prev.y + dx * 0.005
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      id="globe-panel"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
