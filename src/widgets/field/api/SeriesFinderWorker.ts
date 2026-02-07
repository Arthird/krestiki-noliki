import { findLongestSeries } from "./findLongsetSeries";

self.onmessage = (event) => {
  try {
    const { matrix, rowIndex, cellIndex, countToWin } = event.data;

    const longestSeries = findLongestSeries(matrix, rowIndex, cellIndex);

    const isWin = longestSeries.length >= countToWin;

    self.postMessage({ longestSeries, isWin, rowIndex, cellIndex });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
