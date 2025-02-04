export class Vector {
  x = 0;
  y = 0;
  z = 0;
  w = 1;

  constructor(x: number, y: number, z: number, w: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  static add(v1: Vector, v2: Vector) {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const length = this.getLength();

    this.x /= length;
    this.y /= length;
    this.z /= length;

    return this;
  }

  multiplyByScalar(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
  }
}
