export interface Cell {
  id?: string;
  row: number;
  col: number;
  value?: number;
  comment?: number[];
  isActive: boolean;
  isSelect: boolean;
  isError?: boolean;
}

export interface Row {
  id: string;
  row: Cell[];
  isComplete?: boolean;
}

export interface Grid {
  id: string;
  grid: Cell[][];
}

export interface Control {
  value: number;
  isCompleted: boolean;
}

export let controlNumber2: Control[] = [
  {value: 1, isCompleted: false},
  {value: 2, isCompleted: false},
  {value: 3, isCompleted: false},
  {value: 4, isCompleted: false},
  {value: 5, isCompleted: false},
  {value: 6, isCompleted: false},
  {value: 7, isCompleted: false},
  {value: 8, isCompleted: false},
  {value: 9, isCompleted: false},
];

export interface CurrentCell {
  row: number;
  col: number;
  id?: string;
}

export interface CurrentCell {
  row: number;
  col: number;
  id?: string;
}

export interface CurrentControl {
  value: number;
  completed?: boolean;
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
