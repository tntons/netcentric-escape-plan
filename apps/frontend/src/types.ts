export type CellType = 0 | 1 | "w" | "p" | "h";

export interface CellProps {
  cell: CellType;
  columnIndex: number;
  rowIndex: number;
  onClick: (columnIndex: number, rowIndex: number) => void;
  isMoveValid: boolean;
  getCellContent: (cell: CellType) => JSX.Element | string;
}

export interface GridProps {
  map: CellType[][];
  onCellClick: (columnIndex: number, rowIndex: number) => void;
  whoseTurn: () => Player | undefined;
  getCellContent: (cell: CellType) => JSX.Element | string;
  isMoveValid: (
    player: Player,
    columnIndex: number,
    rowIndex: number
  ) => boolean;
}

export interface Player {
  id: string;
  name: string;
  role: "warden" | "prisoner";
  isTurn: boolean;
  picture: string;
  win?: boolean;
  score?: number;
}

export interface MapInfo {
  map: CellType[][];
  wCoor: [number, number];
  pCoor: [number, number];
  hCoor: [number, number][];
}

export interface RoomInfo {
  mapInfo: MapInfo;
  players: Player[];
  timer: number;
}

export interface GameLayoutProps {
  roomInfo: RoomInfo;
}
