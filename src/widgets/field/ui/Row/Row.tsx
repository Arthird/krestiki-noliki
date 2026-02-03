import { memo, useCallback } from "react";
import styles from "./Row.module.css";
import clsx from "clsx";
import Cell from "../../../../entities/cell/Cell";
import type { RowModel } from "../../model/RowModel";

type RowProps = {
  row: RowModel;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
  rowIndex: number;
  rowClassName?: CSSModuleClasses | string;
  cellClassName?: CSSModuleClasses | string;
};

const Row = memo(function Row({
  row,
  onCellClick,
  rowIndex,
  rowClassName,
  cellClassName,
}: RowProps) {
  const handleCellClick = useCallback(
    (cellIndex: number) => onCellClick(rowIndex, cellIndex),
    [onCellClick, rowIndex],
  );

  return (
    <div className={clsx(styles.row, rowClassName)}>
      {row.map((value, index) => (
        <Cell
          value={value}
          key={index}
          index={index}
          onClick={handleCellClick}
          className={cellClassName}
        />
      ))}
    </div>
  );
});

export default Row;
