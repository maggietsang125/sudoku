export interface Cell {
  id: string;
  value?: number;
  comment?: number[];
  isActive: boolean;
  isSelect: boolean;
}

export interface Row {
  id: string;
  row: Cell[];
}

export interface Grid {
  id: string;
  grid: Row[];
}

export interface CurrentCell {
  row: number;
  col: number;
  id?: string;
}

// export interface ControlNumber {
//   One: number;
//   Two: number;
//   Three: number;
//   Four: number;
//   Five: number;
//   Six: number;
//   Seven: number;
//   Eight: number;
//   Nine: number;
// }

// export enum Controls {
//   // One: 1,
//   // Two: 2,
//   // Three: 3,
//   // Four: 4,
//   // Five: 5,
//   // Six: 6,
//   // Seven: 7,
//   // Eight: 8,
//   // Nine: 9,
//   One = 1,
//   Two = 2,
//   Three = 3,
//   Four = 4,
//   Five = 5,
//   Six = 6,
//   Seven = 7,
//   Eight = 8,
//   Nine = 9,
// }
