function createRectangularArray<T>(
  width: number,
  height: number,
  initialValue: T = "" as T,
): T[][] {
  if (width <= 0 || height <= 0) {
    throw new Error("Ширина и высота должны быть положительными числами");
  }

  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    throw new Error("Ширина и высота должны быть целыми числами");
  }

  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => initialValue),
  );
}

export { createRectangularArray };
