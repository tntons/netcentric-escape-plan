import Image from "next/image";
import GameLayout from "@/components/game-layout";
import { RoomInfo } from "@/types";

const mockRoomInfo: RoomInfo = {
  mapInfo: {
    map: [
      [0, 0, 0, 0, "h"],
      ["p", 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 1, 0, "w"],
      [0, 0, 0, 0, 0],
    ],
    wCoor: [1, 0] as [number, number],
    pCoor: [3, 4] as [number, number],
    hCoor: [[0, 4]],
  },
  players: [
    {
      id: "1",
      name: "Player 1",
      role: "warden",
      isTurn: true,
      picture: "/images/warden.png",
      score: 0,
    },
    {
      id: "2",
      name: "Player 2",
      role: "prisoner",
      isTurn: false,
      picture: "/images/prisoner.png",
      score: 0,
    },
  ],
  timer: 60,
};

export default function Home() {
  return (
    <div>
      <GameLayout roomInfo={mockRoomInfo} />
    </div>
  );
}
