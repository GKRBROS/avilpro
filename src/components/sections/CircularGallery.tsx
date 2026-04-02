"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import styles from "./CircularGallery.module.css";

type GalleryItem = {
  image: string;
  text: string;
};

type CircularGalleryProps = {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl: any, text: string, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create 2D context for text texture");
  }

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: any;
  plane: any;
  text: string;
  textColor: string;
  font: string;
  mesh: any;

  constructor({ gl, plane, text, textColor = "#545050", font = "30px sans-serif" }: any) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const titleHeight = this.plane.scale.y * 0.15;
    const titleWidth = titleHeight * aspect;

    this.mesh.scale.set(titleWidth, titleHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - titleHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  extra = 0;
  geometry: any;
  gl: any;
  image: string;
  index: number;
  length: number;
  scene: any;
  screen: any;
  text: string;
  viewport: any;
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program: any;
  plane: any;
  title: any;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;
  scale = 1;

  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font }: any) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.decoding = "async";
    img.onload = () => {
      const applyTexture = () => {
        texture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };

      if (typeof img.decode === "function") {
        img.decode().then(applyTexture).catch(applyTexture);
      } else {
        applyTexture();
      }
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll: any, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLDivElement;
  renderer: any;
  gl: any;
  camera: any;
  scene: any;
  planeGeometry: any;
  medias: Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen = { width: 0, height: 0 };
  viewport = { width: 0, height: 0 };
  raf = 0;
  isDown = false;
  isHovering = false;
  lastPointerMoveAt = 0;
  autoDirection: 1 | -1 = 1;
  start = 0;
  scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
  scrollSpeed = 2;
  autoMoveSpeedMultiplier = 0.06;
  onCheckDebounce: () => void;

  boundOnResize!: () => void;
  boundOnWheel!: (e: WheelEvent) => void;
  boundOnTouchDown!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchMove!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchUp!: () => void;
  boundOnPointerEnter!: () => void;
  boundOnPointerLeave!: () => void;
  boundOnPointerMove!: () => void;

  constructor(container: HTMLDivElement, { items, bend, textColor = "#ffffff", borderRadius = 0, font = "bold 30px Figtree", scrollSpeed = 2, scrollEase = 0.05 }: any = {}) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };

    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(items: GalleryItem[] | undefined, bend = 1, textColor: string, borderRadius: number, font: string) {
    const fallbackItems: GalleryItem[] = [
      { image: "https://picsum.photos/seed/1/800/600", text: "Bridge" },
      { image: "https://picsum.photos/seed/2/800/600", text: "Desk Setup" },
      { image: "https://picsum.photos/seed/3/800/600", text: "Waterfall" },
      { image: "https://picsum.photos/seed/4/800/600", text: "Strawberries" },
    ];

    const galleryItems = items && items.length ? items : fallbackItems;
    this.mediasImages = [...galleryItems, ...galleryItems];

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e: TouchEvent | MouseEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    this.lastPointerMoveAt = Date.now();
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025) * this.getMotionFactor();
    this.scroll.target = this.scroll.position + distance;
    this.lastPointerMoveAt = Date.now();
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.lastPointerMoveAt = Date.now();
    this.autoDirection = delta > 0 ? 1 : -1;
    this.onCheckDebounce();
  }

  onPointerEnter() {
    this.isHovering = true;
    this.lastPointerMoveAt = Date.now();
  }

  onPointerLeave() {
    this.isHovering = false;
  }

  onPointerMove() {
    this.lastPointerMoveAt = Date.now();
  }

  onCheck() {
    if (!this.medias.length) return;

    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  getMotionFactor() {
    // Mobile: even slower drag response for smoother control on touch screens.
    return this.screen.width < 768 ? 0.5 : 1;
  }

  getAutoMoveSpeedMultiplier() {
    // Responsive speed: faster on mobile, slower on desktop
    // Mobile (< 768px): 0.04 (slower and smoother flow)
    // Tablet (768-1024px): 0.07 (medium)
    // Desktop (> 1024px): 0.05 (slower)
    const width = this.screen.width;
    if (width < 768) return 0.04;
    if (width < 1024) return 0.07;
    return 0.05;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    
    // Update auto-move speed multiplier on resize
    this.autoMoveSpeedMultiplier = this.getAutoMoveSpeedMultiplier();
  }

  update() {
    const idleFor = Date.now() - this.lastPointerMoveAt;
    const shouldAutoMove = !this.isDown && (!this.isHovering || idleFor > 900);
    if (shouldAutoMove) {
      this.scroll.target += this.scrollSpeed * this.autoMoveSpeedMultiplier * this.autoDirection;
    }

    const effectiveEase = this.screen.width < 768 ? this.scroll.ease * 0.75 : this.scroll.ease;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, effectiveEase);
    const direction: "right" | "left" = this.scroll.current > this.scroll.last ? "right" : "left";

    this.medias.forEach((media) => media.update(this.scroll, direction));

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnPointerEnter = this.onPointerEnter.bind(this);
    this.boundOnPointerLeave = this.onPointerLeave.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("wheel", this.boundOnWheel, { passive: true });
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    this.container.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    this.container.addEventListener("touchend", this.boundOnTouchUp);
    this.container.addEventListener("pointerenter", this.boundOnPointerEnter);
    this.container.addEventListener("pointerleave", this.boundOnPointerLeave);
    this.container.addEventListener("pointermove", this.boundOnPointerMove);

    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);

    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("wheel", this.boundOnWheel);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    this.container.removeEventListener("touchmove", this.boundOnTouchMove);
    this.container.removeEventListener("touchend", this.boundOnTouchUp);
    this.container.removeEventListener("pointerenter", this.boundOnPointerEnter);
    this.container.removeEventListener("pointerleave", this.boundOnPointerLeave);
    this.container.removeEventListener("pointermove", this.boundOnPointerMove);

    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);

    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({ items, bend = 3, textColor = "#ffffff", borderRadius = 0.05, font = "bold 30px Figtree", scrollSpeed = 2, scrollEase = 0.05 }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return <div className={styles.circularGallery} ref={containerRef} />;
}
