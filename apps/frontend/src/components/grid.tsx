import React from "react";
import Cell from "./cell";
import { GridProps } from "@/types";

function Grid({
  map,
  onCellClick,
  whoseTurn,
  getCellContent,
  isMoveValid,
}: GridProps) {
  return (
    <div className="grid grid-cols-1 gap-1 bg-[#287e28] bg-opacity-60 backdrop-blur-lg p-10 rounded-2xl">
      {map.map((row, rowIndex) => (
        <div key={"r" + rowIndex} className="flex">
          {row.map((cell, columnIndex) => (
            <Cell
              key={"c" + columnIndex + "" + rowIndex}
              cell={cell}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              onClick={onCellClick}
              isMoveValid={isMoveValid(whoseTurn()!, columnIndex, rowIndex)}
              getCellContent={getCellContent}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
