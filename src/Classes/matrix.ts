import { Vector } from "./vector";

export class Matrix {
  static multiply(a: number[][], b: number[][]) {
    const m = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        m[i][j] =
          a[i][0] * b[0][j] +
          a[i][1] * b[1][j] +
          a[i][2] * b[2][j] +
          a[i][3] * b[3][j];
      }
    }

    return m;
  }

  static multiplyVector(m: number[][], v: Vector) {
    return new Vector(
      m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3] * v.w,
      m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3] * v.w,
      m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3] * v.w,
      m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3] * v.w
    );
  }

  static getTranslation(dx: number, dy: number, dz: number) {
    return [
      [1, 0, 0, dx],
      [0, 1, 0, dy],
      [0, 0, 1, dz],
      [0, 0, 0, 1],
    ];
  }

  static getScale(sx: number, sy: number, sz: number) {
    return [
      [sx, 0, 0, 0],
      [0, sy, 0, 0],
      [0, 0, sz, 0],
      [0, 0, 0, 1],
    ];
  }

  static getRotationX(angle: number) {
    const rad = (Math.PI / 180) * angle;

    return [
      [1, 0, 0, 0],
      [0, Math.cos(rad), -Math.sin(rad), 0],
      [0, Math.sin(rad), Math.cos(rad), 0],
      [0, 0, 0, 1],
    ];
  }

  static getRotationY(angle: number) {
    const rad = (Math.PI / 180) * angle;

    return [
      [Math.cos(rad), 0, Math.sin(rad), 0],
      [0, 1, 0, 0],
      [-Math.sin(rad), 0, Math.cos(rad), 0],
      [0, 0, 0, 1],
    ];
  }

  static getRotationZ(angle: number) {
    const rad = (Math.PI / 180) * angle;

    return [
      [Math.cos(rad), -Math.sin(rad), 0, 0],
      [Math.sin(rad), Math.cos(rad), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
  }
}
