import clsx from "clsx";
import { memo } from "react";
import styles from "./Field.module.css";
import type { RowModel } from "../../model/RowModel";
import { Row } from "..";

type FieldProps = {
  rows: RowModel[];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
  rowClassName?: CSSModuleClasses | string;
  matrixClassName?: CSSModuleClasses | string;
  cellClassName?: CSSModuleClasses | string;
};

const Field = memo(function Field({
  rows,
  onCellClick,
  rowClassName,
  matrixClassName,
  cellClassName,
}: FieldProps) {
  return (
    <div className={clsx(styles.matrix, matrixClassName)}>
      {rows.map((rowModel, rowIndex) => (
        <Row
          row={rowModel}
          key={rowIndex}
          rowIndex={rowIndex}
          onCellClick={onCellClick}
          cellClassName={clsx(styles.cell, cellClassName)}
          rowClassName={clsx(styles.row, rowClassName)}
        />
      ))}
    </div>
  );
});

export default Field;
