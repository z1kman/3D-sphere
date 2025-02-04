import type { Component } from "solid-js";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <canvas class={styles.Surface}></canvas>
    </div>
  );
};

export default App;
