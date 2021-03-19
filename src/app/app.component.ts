import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Cell, Row, Grid, CurrentCell } from './sudoku-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../mobile.scss'],
  animations: [
    trigger('loadingPage', [
      state('open', style({
        height: '100%',
        opacity: 1,
        backgroundColor: 'rgba(147, 191, 238)'
      })),
      state('closed', style({
        height: '10%',
        'font-size': '200%',
        'border-bottom': '0px solid #dddddd',
        // display: 'none',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'sudokuAng';

  isOpen = true;

  firstGrid: Grid = {
    id: 'grid id 01',
    grid: [],
  };

  simpleArray: number[][] = [
    [11, 12, 13, 14, 15, 16, 0, 18, 19],
    [0, 22, 23, 24, 25, 26, 27, 28, 29],
    [31, 32, 33, 0, 35, 36, 37, 38, 39],
    [41, 42, 43, 44, 0, 46, 47, 48, 49],
    [51, 0, 53, 54, 55, 56, 57, 58, 59],
    [61, 62, 63, 64, 65, 66, 67, 68, 0],
    [71, 72, 73, 74, 75, 76, 77, 78, 79],
    [81, 82, 0, 84, 85, 0, 87, 88, 89],
    [91, 92, 93, 94, 95, 96, 97, 0, 99]
  ];

  currentGrid: Grid | null = this.updateCurrentGrid(this.formatGrid(this.simpleArray));
  currentCell: CurrentCell = {
    row: 0,
    col: 0,
    id: '00',
  };
  currentControl = 9;

  ControlNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.currentGrid = this.updateCurrentGrid(this.formatGrid(this.simpleArray));
    console.log(this.currentGrid);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  formatGrid(array: number[][]): Grid {
    const newGrid: Grid = {
      id: 'grid id 01',
      grid: array.map((row, rowIndex) => {
        const newRow = row.map((col, colIndex) => {
          if (col === 0) {
            return {
              id: String(rowIndex) + String(colIndex),
              isActive: false,
              isSelect: true,
            } as Cell;
          }
          return {
            id: String(rowIndex) + String(colIndex),
            value: col,
            isActive: false,
            isSelect: false,
          } as Cell;

        });
        return {
          id: String(rowIndex),
          row: newRow,
        };
      })
    };
    console.log('newGrid: ' + newGrid.id);

    return newGrid;
  }

  clickCell(cell: Cell): {} {
    console.log(cell.id);
    this.currentCell = {
      row: Number(cell.id[0]),
      col: Number(cell.id[1]),
      id: cell.id,
    };
    return this.currentCell;

    // const row = Number(cell.id[0]);
    // const col = Number(cell.id[1]);
    // this.currentGrid?.grid[row].row[col].isActive = !this.currentGrid?.grid[row].row[col].isActive;
  }

  clickControl(thing: number): number {
    this.currentControl = thing;
    return this.currentControl;
  }

  updateCurrentGrid(grid: Grid): Grid {
    this.currentGrid = grid;
    return this.currentGrid;
  }

  // updateCurrentCell(cellId: string, value: number) {
  //   const row = Number(cellId[0]);
  //   const col = Number(cellId[1]);

  //   // this.currentGrid?.grid[row].row[col].value = value;
  // }





}
