import { memo, useCallback} from "react";
import type { CellValue } from "./CellValue";
import styles from "./Cell.module.css";
import clsx from "clsx";

type CellProps = {
  value: CellValue;
  index: number;
  onClick: (index: number) => void;
  isWinning: boolean;
  className?: CSSModuleClasses | string;
};

const Cell = memo(function Cell({
  value,
  onClick,
  index,
  isWinning,
  className,
}: CellProps) {
  const handleClick = useCallback(() => onClick(index), [onClick, index]);
  const cellClassName = clsx(
    styles.cell,
    isWinning && styles.winning,
    className,
  );

  return (
    <button type="button" onClick={handleClick} className={cellClassName}>
      {value}
    </button>
  );
});

export default Cell;
