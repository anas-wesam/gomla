'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const H = 560;
    const W = canvas.parentElement?.offsetWidth || 400;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x0d0d0d, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const L1 = new THREE.PointLight(0xf59e0b, 9, 18);
    L1.position.set(4, 2, 4);
    scene.add(L1);
    const L2 = new THREE.PointLight(0xfff7ed, 4, 12);
    L2.position.set(-3, -3, 2);
    scene.add(L2);
    const L3 = new THREE.DirectionalLight(0xffffff, 2);
    L3.position.set(0, 6, 4);
    scene.add(L3);

    const group = new THREE.Group();

    // Main icosahedron — dark gold
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x130e00,
      emissive: 0x0d0800,
      specular: 0xf59e0b,
      shininess: 350,
    });
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 4), coreMat));

    // Wireframe overlay
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.32, 3),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.06 })
    ));

    // Orbiting rings
    const ringBase = { transparent: true, opacity: 0.75 } as const;
    const r1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.014, 16, 80),
      new THREE.MeshPhongMaterial({ color: 0xf59e0b, emissive: 0x7c3d00, emissiveIntensity: 0.5, ...ringBase })
    );
    r1.rotation.x = Math.PI / 3.5;
    group.add(r1);

    const r2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.010, 16, 80),
      new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x6b2f00, emissiveIntensity: 0.4, ...ringBase })
    );
    r2.rotation.x = -Math.PI / 3;
    r2.rotation.z = Math.PI / 5;
    group.add(r2);

    scene.add(group);

    // Floating gold particles
    const pGeo = new THREE.BufferGeometry();
    const N = 90;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 2.8 + Math.random() * 1.4;
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xf59e0b, size: 0.022, transparent: true, opacity: 0.45,
    })));

    let t = 0;
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.006;
      group.rotation.y = t * 0.38;
      group.rotation.x = Math.sin(t * 0.28) * 0.14;
      group.position.y = Math.sin(t * 0.6) * 0.04;
      r1.rotation.y += 0.006;
      r2.rotation.x += 0.005;
      L1.position.x = Math.sin(t * 0.7) * 4;
      L1.position.z = Math.cos(t * 0.7) * 3;
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = canvas?.parentElement?.offsetWidth || 400;
      camera.aspect = w / H;
      camera.updateProjectionMatrix();
      renderer.setSize(w, H);
    }
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 560 }} />;
}
