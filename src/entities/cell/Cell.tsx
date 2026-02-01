import { memo } from "react";
import type { CellValue } from "./CellValue";
import styles from "./Cell.module.css";
import clsx from "clsx";

type CellProps = {
  value: CellValue;
  index: number;
  onClick: (index: number) => void;
  className?: CSSModuleClasses | string;
};

const Cell = memo(function Cell({ value, onClick, index, className }: CellProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={clsx(styles.cell, className)}
    >
      {value}
    </button>
  );
});

export default Cell;
