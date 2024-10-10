"use client";

import { socket } from "@/socket";
import React, { useRef } from "react";
import Grid from "./grid";
import { GameLayoutProps, CellType, Player } from "@/types";
import Image from "next/image";

export default function GameLayout({ roomInfo }: GameLayoutProps) {
  const map = roomInfo.mapInfo.map;
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);

  const getCellContent = (cell: CellType) => {
    const wardenImage = roomInfo.players.find(
      (p) => p.role === "warden"
    )?.picture;
    const prisonerImage = roomInfo.players.find(
      (p) => p.role === "prisoner"
    )?.picture;

    switch (cell) {
      case 0:
        return (
          <div className="relative w-full h-full">
            <Image
              src="/images/base-tile.png"
              alt="base-tile"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full">
            <Image
              src="/images/obstacle-tile.png"
              alt="Obstacle"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      case "w":
        return (
          <div className="relative w-full h-full">
            <Image
              src="/images/base-tile.png"
              alt="base-tile"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      case "p":
        return (
          <div className="relative w-full h-full">
            <Image
              src="/images/base-tile.png"
              alt="base-tile"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      case "h":
        return (
          <div className="relative w-full h-full">
            <Image
              src="/images/base-tile.png"
              alt="base-tile"
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      default:
        return "";
    }
  };

  const whoseTurn = (): Player | undefined => {
    return roomInfo.players.find((p) => p.isTurn === true);
  };

  const movePlayer = (
    player: Player,
    columnIndex: number,
    rowIndex: number
  ) => {
    const currentIndex =
      player.role === "warden"
        ? roomInfo.mapInfo.wCoor
        : roomInfo.mapInfo.pCoor;

    if (
      Math.abs(rowIndex - currentIndex[0]) > 1 ||
      Math.abs(columnIndex - currentIndex[1]) > 1
    ) {
      return alert("You can only move to an adjacent block");
    }

    if (map[rowIndex][columnIndex] === 1) {
      return alert("You cannot move to an obstacle");
    }

    if (player.role === "warden" && map[rowIndex][columnIndex] === "h") {
      return alert("You cannot move to the tunnel box");
    }

    if (
      map[rowIndex][columnIndex] === 0 ||
      map[rowIndex][columnIndex] === "p" ||
      map[rowIndex][columnIndex] === "h"
    ) {
      moveSoundRef.current?.play();
      const newMap = map.map((row) => [...row]);
      newMap[currentIndex[0]][currentIndex[1]] = 0;
      newMap[rowIndex][columnIndex] = player.role[0] as CellType;

      const newRoomInfo = {
        ...roomInfo,
        players: roomInfo.players.map((p) => {
          if (p.role === player.role) {
            return {
              ...p,
              isTurn: false,
              win:
                map[rowIndex][columnIndex] === "p" ||
                map[rowIndex][columnIndex] === "h",
            };
          } else {
            return { ...p, isTurn: true, win: false };
          }
        }),
        mapInfo: {
          ...roomInfo.mapInfo,
          map: newMap,
          [`${player.role[0]}Coor`]: [rowIndex, columnIndex],
        },
      };

      socket.emit("update-position", newRoomInfo);
    }
  };

  const isMoveValid = (
    player: Player,
    columnIndex: number,
    rowIndex: number
  ) => {
    const currentIndex =
      player.role === "warden"
        ? roomInfo.mapInfo.wCoor
        : roomInfo.mapInfo.pCoor;
    const rowDiff = Math.abs(rowIndex - currentIndex[0]);
    const colDiff = Math.abs(columnIndex - currentIndex[1]);
    return (
      rowDiff <= 1 &&
      colDiff <= 1 &&
      map[rowIndex][columnIndex] !== 1 &&
      map[rowIndex][columnIndex] !== player.role[0]
    );
  };

  const handleCellClick = (columnIndex: number, rowIndex: number) => {
    const player = whoseTurn();
    if (player) {
      movePlayer(player, columnIndex, rowIndex);
    }
  };

  return (
    <>
      <Grid
        map={map}
        onCellClick={handleCellClick}
        whoseTurn={whoseTurn}
        getCellContent={getCellContent}
        isMoveValid={isMoveValid}
      />
      <audio ref={moveSoundRef} hidden>
        <source src="/music/move.m4a" type="audio/mp4" />
      </audio>
    </>
  );
}
