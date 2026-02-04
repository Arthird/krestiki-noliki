import clsx from "clsx";
import { memo, useMemo } from "react";
import styles from "./Field.module.css";
import type { RowModel } from "../../model/RowModel";
import { Row } from "..";

type FieldProps = {
  matrix: RowModel[];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
  winningSeries: [number, number][];
  rowClassName?: CSSModuleClasses | string;
  matrixClassName?: CSSModuleClasses | string;
  cellClassName?: CSSModuleClasses | string;
};

const Field = memo(function Field({
  matrix,
  onCellClick,
  winningSeries,
  rowClassName,
  matrixClassName,
  cellClassName,
}: FieldProps) {
  const matrixClass = clsx(styles.matrix, matrixClassName);
  const cellClass = clsx(styles.cell, cellClassName);
  const rowClass = clsx(styles.row, rowClassName);

  const winningIndexesByRow = useMemo(() => {
    const map = new Map<number, Set<number>>();
    winningSeries.forEach(([rowIndex, cellIndex]) => {
      if (!map.has(rowIndex)) {
        map.set(rowIndex, new Set());
      }
      map.get(rowIndex)!.add(cellIndex);
    });
    return map;
  }, [winningSeries]);

  return (
    <div className={matrixClass}>
      {matrix.map((row, rowIndex) => {
        const winningIndexes = winningIndexesByRow.get(rowIndex) || new Set();
        return (
          <Row
            row={row}
            key={rowIndex}
            rowIndex={rowIndex}
            onCellClick={onCellClick}
            winningIndexes={winningIndexes}
            cellClassName={cellClass}
            rowClassName={rowClass}
          />
        );
      })}
    </div>
  );
});

export default Field;
