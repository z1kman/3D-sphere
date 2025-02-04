import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";
import styles from "./App.module.css";
import { Drawer } from "./Classes/drawer";
import { Vector } from "./Classes/vector";
import { Matrix } from "./Classes/matrix";

const App: Component = () => {
  let surfaceRef: HTMLCanvasElement | undefined;
  const [isMiddleMouseDown, setIsMiddleMouseDown] = createSignal(false);
  const [initialX, setInitialX] = createSignal<number | null>(null);
  const [drawer, setDrawer] = createSignal<Drawer>();

  onMount(() => {
    if (!surfaceRef) return;
    const ctx = surfaceRef.getContext("2d");
    const width = window.innerWidth - surfaceRef.offsetLeft;
    const height = window.innerHeight - surfaceRef.offsetTop;
    surfaceRef.width = width;
    surfaceRef.height = height;
    if (!ctx) return;
    setDrawer(new Drawer(ctx, width, height));
    drawCube();
  });

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button === 1) {
      setInitialX(event.clientX);
      setIsMiddleMouseDown(true);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isMiddleMouseDown()) {
      drawCube(event.clientX - (initialX() || 0));
      console.log("event", event.clientX);
      console.log(`coords: ${event.clientX}, ${event.clientY}`);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (event.button === 1) {
      setIsMiddleMouseDown(false);
      setInitialX(null);
    }
  };

  createEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    onCleanup(() => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    });
  });

  const drawCube = (angle: number = 0) => {
    drawer()?.clearSurface();
    const vertices = [
      new Vector(-1, 1, 1), 
      new Vector(-1, 1, -1), 
      new Vector(1, 1, -1), 
      new Vector(1, 1, 1),
      new Vector(-1, -1, 1),
      new Vector(-1, -1, -1),
      new Vector(1, -1, -1),
      new Vector(1, -1, 1), 
    ];

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],

      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],

      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
    ];
    const sceneVertices = [];
    for (let i = 0; i < vertices.length; i++) {
      let vertex = Matrix.multiplyVector(
        Matrix.getRotationX(angle),
        vertices[i]
      );

      vertex = Matrix.multiplyVector(Matrix.getRotationY(angle), vertex);

      vertex = Matrix.multiplyVector(Matrix.getScale(100, 100, 100), vertex);

      vertex = Matrix.multiplyVector(
        Matrix.getTranslation(400, -300, 0),
        vertex
      );
      sceneVertices.push(vertex);
    }
    for (let i = 0, l = edges.length; i < l; i++) {
      const e = edges[i];
      const line1 = { x: sceneVertices[e[0]].x, y: sceneVertices[e[0]].y };
      const line2 = { x: sceneVertices[e[1]].x, y: sceneVertices[e[1]].y };
      const color = { r: 0, g: 0, b: 255 };
      drawer()?.addLine({ line1, line2, color });
    }
    drawer()?.draw();
  };

  return (
    <div class={styles.App}>
      <canvas ref={surfaceRef} class={styles.Surface}></canvas>
    </div>
  );
};

export default App;
