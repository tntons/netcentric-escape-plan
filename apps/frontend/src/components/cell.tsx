import React from "react";
import { CellProps, CellType } from "@/types";

function Cell({
  cell,
  columnIndex,
  rowIndex,
  onClick,
  isMoveValid,
  getCellContent,
}: CellProps) {
  const getCellClassName = (cell: CellType) => {
    switch (cell) {
      case 0:
      case 1:
      case "w":
      case "p":
      case "h":
        return "w-20 h-20";
      default:
        return "";
    }
  };

  return (
    <div className={getCellClassName(cell)}>
      <button
        onClick={() => onClick(columnIndex, rowIndex)}
        className={`relative ${getCellClassName(cell)}`}
        disabled={!isMoveValid}
      >
        {getCellContent(cell)}
        {/* {isMoveValid && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-400 bg-opacity-50">
            You can add an overlay icon or border here
          </div>
        )} */}
      </button>
    </div>
  );
}

export default Cell;
