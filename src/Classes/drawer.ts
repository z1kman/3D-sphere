type Position = {
  x: number;
  y: number;
};

type Color = {
  r: number;
  g: number;
  b: number;
};
export class Drawer {
  ctx: CanvasRenderingContext2D | null = null;
  width: number = 0;
  height: number = 0;
  surface: ImageData | null;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.surface = ctx.getImageData(0, 0, width, height);
  }

  draw() {
    if (!this.surface || !this.ctx) return;

    this.ctx.putImageData(this.surface, 0, 0);
  }

  addPixel(position: Position, color: Color) {
    if (!this.surface) return;
    const { x, y } = position;
    const { r, g, b } = color;
    const index = (this.width * y + x) * 4;
    const surface = this.surface;

    surface.data[index] = r;
    surface.data[index + 1] = g;
    surface.data[index + 2] = b;
    surface.data[index + 3] = 255;
  }

  addLine({
    line1,
    line2,
    color,
  }: {
    line1: Position;
    line2: Position;
    color: Color;
  }) {
    const { r, g, b } = color;
    const c1 = line2.y - line1.y;
    const c2 = line2.x - line1.x;

    const length = Math.sqrt(c1 * c1 + c2 * c2);

    const xStep = c2 / length;
    const yStep = c1 / length;

    for (let i = 0; i < length; i++) {
      const position = {
        x: Math.trunc(line1.x + xStep * i),
        y: Math.trunc(line1.y + yStep * i),
      };
      const color = { r, g, b };
      this.addPixel(position, color);
    }
  }

  clearSurface() {
    if (!this.surface) return;
    const surfaceSize = this.width * this.height * 4;
    for (let i = 0; i < surfaceSize; i++) {
      if (!this.surface.data[i]) continue;
      this.surface.data[i] = 0;
    }
  }
}
