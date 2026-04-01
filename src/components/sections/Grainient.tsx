"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type GrainientProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
};

const hexToVec3 = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
};

export default function Grainient({
  color1 = "#ffffff",
  color2 = "#2afa00",
  color3 = "#e1ff00",
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
}: GrainientProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const geometry = new Triangle(gl);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [1, 1] as [number, number] },
      uColor1: { value: hexToVec3(color1) },
      uColor2: { value: hexToVec3(color2) },
      uColor3: { value: hexToVec3(color3) },
      uTimeSpeed: { value: timeSpeed },
      uColorBalance: { value: colorBalance },
      uWarpStrength: { value: warpStrength },
      uWarpFrequency: { value: warpFrequency },
      uWarpSpeed: { value: warpSpeed },
      uWarpAmplitude: { value: warpAmplitude },
      uBlendAngle: { value: blendAngle },
      uBlendSoftness: { value: blendSoftness },
      uRotationAmount: { value: rotationAmount },
      uNoiseScale: { value: noiseScale },
      uGrainAmount: { value: grainAmount },
      uGrainScale: { value: grainScale },
      uGrainAnimated: { value: grainAnimated ? 1 : 0 },
      uContrast: { value: contrast },
      uGamma: { value: gamma },
      uSaturation: { value: saturation },
      uCenterX: { value: centerX },
      uCenterY: { value: centerY },
      uZoom: { value: zoom },
    };

    const program = new Program(gl, {
      vertex: `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;

        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform float uTime;

        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;

        uniform float uTimeSpeed;
        uniform float uColorBalance;
        uniform float uWarpStrength;
        uniform float uWarpFrequency;
        uniform float uWarpSpeed;
        uniform float uWarpAmplitude;
        uniform float uBlendAngle;
        uniform float uBlendSoftness;
        uniform float uRotationAmount;
        uniform float uNoiseScale;
        uniform float uGrainAmount;
        uniform float uGrainScale;
        uniform float uGrainAnimated;
        uniform float uContrast;
        uniform float uGamma;
        uniform float uSaturation;
        uniform float uCenterX;
        uniform float uCenterY;
        uniform float uZoom;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 345.45));
          p += dot(p, p + 34.345);
          return fract(p.x * p.y);
        }

        vec3 applySaturation(vec3 color, float sat) {
          float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
          return mix(vec3(luma), color, sat);
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = uv * 2.0 - 1.0;
          p.x *= uResolution.x / uResolution.y;

          float t = uTime * uTimeSpeed;
          float angle = radians(uBlendAngle + t * uRotationAmount * 0.01);
          mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

          p = rot * p;
          p /= max(uZoom, 0.05);
          p += vec2(uCenterX, uCenterY) * 0.35;

          float warp = sin((p.x + t * uWarpSpeed) * uWarpFrequency) *
                       cos((p.y - t * uWarpSpeed) * uWarpFrequency) *
                       uWarpStrength;

          vec2 wp = p + vec2(warp) * (uWarpAmplitude / 1000.0);

          float axisMix = wp.x * 0.5 + 0.5;
          axisMix += sin((wp.y + t) * uNoiseScale) * 0.08;
          axisMix = smoothstep(0.0 - uBlendSoftness, 1.0 + uBlendSoftness, axisMix);

          vec3 col = mix(uColor1, uColor2, axisMix);

          float radial = length(wp * vec2(0.85, 1.0));
          float cMix = smoothstep(0.15, 1.25, radial + uColorBalance * 0.2);
          col = mix(col, uColor3, cMix);

          float gTime = mix(0.0, t * 2.0, uGrainAnimated);
          float grain = hash((uv + gTime) * (uResolution / max(uGrainScale, 0.01)) * 0.6);
          col += (grain - 0.5) * uGrainAmount;

          col = (col - 0.5) * uContrast + 0.5;
          col = applySaturation(col, uSaturation);
          col = pow(max(col, vec3(0.0)), vec3(1.0 / max(uGamma, 0.01)));

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width, height];
    };

    resize();

    let rafId = 0;
    const render = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (canvas.parentElement === host) {
        host.removeChild(canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
  ]);

  return <div ref={hostRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}
