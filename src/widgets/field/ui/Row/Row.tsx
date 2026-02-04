import { memo, useCallback, useMemo } from "react";
import styles from "./Row.module.css";
import clsx from "clsx";
import Cell from "../../../../entities/cell/Cell";
import type { RowModel } from "../../model/RowModel";

type RowProps = {
  row: RowModel;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
  rowIndex: number;
  winningIndexes: Set<number>;
  rowClassName?: CSSModuleClasses | string;
  cellClassName?: CSSModuleClasses | string;
};

const Row = memo(function Row({
  row,
  onCellClick,
  rowIndex,
  winningIndexes,
  rowClassName,
  cellClassName,
}: RowProps) {
  const handleCellClick = useCallback(
    (cellIndex: number) => onCellClick(rowIndex, cellIndex),
    [onCellClick, rowIndex],
  );

  const rowClassname = useMemo(
    () => clsx(styles.row, rowClassName),
    [rowClassName],
  );

  return (
    <div className={rowClassname}>
      {row.map((value, index) => (
        <Cell
          value={value}
          key={index}
          index={index}
          onClick={handleCellClick}
          isWinning={winningIndexes.has(index)}
          className={cellClassName}
        />
      ))}
    </div>
  );
});

export default Row;
