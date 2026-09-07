import {
  ACESFilmicToneMapping,
  BoxGeometry,
  type BufferGeometry,
  Color,
  DirectionalLight,
  type Material,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PCFSoftShadowMap,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  WebGLRenderer,
  type WebGLRenderTarget,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createSculpture } from "./sculpture-geometry";
import { getSculpturePose, smoothSculptureProgress } from "./sculpture-motion";

export type SculptureScene = ReturnType<typeof createSculptureScene>;

export function createSculptureScene(host: HTMLDivElement) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  const scene = new Scene();
  const camera = new OrthographicCamera(-2.7, 2.7, 2.7, -2.7, 0.1, 40);
  const light = new DirectionalLight(0xffffff, 3);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pendingFrame: number | undefined;
  let animate: ((timestamp: number) => void) | undefined;
  let observer: ResizeObserver | undefined;
  let resizeScene: (() => void) | undefined;
  let environment: WebGLRenderTarget | undefined;

  function onScroll() {
    if (pendingFrame !== undefined) return;
    pendingFrame = requestAnimationFrame((timestamp) => {
      pendingFrame = undefined;
      animate?.(timestamp);
    });
  }

  function dispose() {
    window.removeEventListener("scroll", onScroll);
    if (resizeScene) window.removeEventListener("resize", resizeScene);
    document.removeEventListener("visibilitychange", onScroll);
    reducedMotion.removeEventListener("change", onScroll);
    if (pendingFrame !== undefined) cancelAnimationFrame(pendingFrame);
    observer?.disconnect();
    const geometries = new Set<BufferGeometry>();
    const materials = new Set<Material>();
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material)
          ? object.material
          : [object.material]) {
          materials.add(material);
        }
      }
    });
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) material.dispose();
    environment?.dispose();
    light.shadow.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  try {
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.domElement.className =
      "pointer-events-none absolute top-0 block h-full";
    renderer.domElement.setAttribute("aria-hidden", "true");

    const room = new RoomEnvironment();
    const bluePanel = new Mesh(
      new BoxGeometry(7, 4, 0.1),
      new MeshBasicMaterial({ color: new Color(0x2563eb).multiplyScalar(2) }),
    );
    bluePanel.position.set(0, 2, -6);
    room.add(bluePanel);
    const pmrem = new PMREMGenerator(renderer);
    try {
      environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
    } finally {
      room.dispose();
      pmrem.dispose();
    }

    const sculpture = createSculpture();
    scene.add(sculpture);

    light.position.set(-3, 7, 5);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.camera.left = -4;
    light.shadow.camera.right = 4;
    light.shadow.camera.top = 4;
    light.shadow.camera.bottom = -4;
    light.shadow.normalBias = 0.035;
    scene.add(light);

    const ground = new Mesh(
      new PlaneGeometry(20, 20),
      new ShadowMaterial({ opacity: 0.12 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.78;
    ground.receiveShadow = true;
    scene.add(ground);

    camera.position.set(5, 3.5, 6);
    camera.lookAt(0, 0, 0);

    function getScrollProgress() {
      return reducedMotion.matches
        ? 0
        : Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    }

    let progress = getScrollProgress();
    let lastTimestamp: number | undefined;

    function render() {
      const pose = getSculpturePose(progress);
      sculpture.rotation.set(...pose.rotation);
      sculpture.position.set(...pose.position);
      renderer.render(scene, camera);
    }

    animate = (timestamp) => {
      const { top, bottom } = host.getBoundingClientRect();
      if (document.hidden || bottom <= 0 || top >= window.innerHeight) {
        lastTimestamp = undefined;
        return;
      }

      const target = getScrollProgress();
      // Time-based damping keeps the same feel on 60 Hz and 120 Hz screens.
      const deltaSeconds =
        lastTimestamp === undefined
          ? 1 / 60
          : Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      progress = reducedMotion.matches
        ? 0
        : smoothSculptureProgress(progress, target, deltaSeconds);
      render();

      if (progress !== target) {
        lastTimestamp = timestamp;
        onScroll();
      } else {
        lastTimestamp = undefined;
      }
    };

    function resize() {
      const { width, height, right } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const aspect = width / height;
      // Extend the camera and canvas together to preserve the sculpture's scale.
      const shadowSpace = width * 0.3;
      const canvasWidth = width + shadowSpace;
      const availableRight = Math.max(
        0,
        document.documentElement.clientWidth - right - 16,
      );
      camera.left = -2.7 * aspect;
      camera.right = 2.7 * aspect + 5.4 * aspect * 0.3;
      camera.updateProjectionMatrix();
      renderer.domElement.style.width = `${canvasWidth}px`;
      renderer.domElement.style.left = `${-Math.max(0, shadowSpace - availableRight)}px`;
      renderer.setSize(canvasWidth, height, false);
      render();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onScroll);
    reducedMotion.addEventListener("change", onScroll);
    resizeScene = resize;
    window.addEventListener("resize", resize);
    observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    host.append(renderer.domElement);

    return { dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}
