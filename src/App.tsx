import { onMount, type Component } from "solid-js";
import styles from "./App.module.css";
import { Drawer } from "./Classes/drawer";

const App: Component = () => {
  let surfaceRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!surfaceRef) return;
    const ctx = surfaceRef.getContext("2d");
    const offset = 10; // 5px = App padding (1px * 2) + canvas border (4px * 2)
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth - surfaceRef.offsetLeft;
    const height = window.innerHeight - surfaceRef.offsetTop;
    surfaceRef.width = width;
    surfaceRef.height = height;
    if (!ctx) return;
    const drawer = new Drawer(ctx, width, height);
    drawer.addLine({
      line1: { x: 20, y: 20 },
      line2: { x: 40, y: 30 },
      color: { r: 244, g: 10, b: 150 },
    });
    drawer.draw();
    console.log("width, ", width, height);
  });
  return (
    <div class={styles.App}>
      <canvas ref={surfaceRef} class={styles.Surface}></canvas>
    </div>
  );
};

export default App;
