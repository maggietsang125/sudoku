import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

import { Cell, Row, Grid } from './util/sudoku-util';
import { sampleGrid } from './util/sudoku-samples';

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
    // trigger('consolePage', [
    //   state('openConsole', style({
    //     width: '25%',
    //     heigh: '100%',
    //     'background-color': '#f2f1efc7',
    //     position: 'absolute',
    //     padding: '12px',
    //     left: '0',
    //     display: 'flex',
    //     'flex-direction': 'column',
    //   })),
    //   state('closeConsole', style({
    //     height: '5%',
    //     width: '0%',
    //     // display: 'none',
    //   })),
    //   transition('openConsole => closeConsole', [
    //     animate('1s')
    //   ]),
    //   transition('closeConsole => openConsole', [
    //     animate('0.5s')
    //   ]),
    // ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'sudokuAng';

  isOpeningScreen = true;
  isConsole = true;

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

  // currentGrid: Grid = this.updateCurrentGrid(this.formatGrid(this.simpleArray));
  currentGrid: Grid = this.updateCurrentGrid(this.formatGrid(sampleGrid));
  currentCell: Cell = {
    row: 9,
    col: 9,
    isActive: false,
    isSelect: false,
  };
  currentControl = 9;

  ControlNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.currentGrid = this.updateCurrentGrid(this.formatGrid(this.simpleArray));
    this.currentGrid = this.updateCurrentGrid(this.formatGrid(sampleGrid));
    console.log(this.currentGrid);
  }

  toggleStartScreen(): void {
    this.isOpeningScreen = !this.isOpeningScreen;
  }

  toggleConsole(): void {
    this.isConsole = !this.isConsole;
  }

  formatGrid(array: number[][]): Grid {
    const newGrid: Grid = {
      id: 'grid id 01',
      grid: array.map((row, rowIndex) => {
        const newRow = row.map((col, colIndex) => {
          if (col === 0) {
            return {
              id: String(rowIndex) + String(colIndex),
              row: rowIndex,
              col: colIndex,
              isActive: false,
              isSelect: true,
            } as Cell;
          }
          return {
            id: String(rowIndex) + String(colIndex),
            row: rowIndex,
            col: colIndex,
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

  resetGrid() {
    this.currentGrid = this.updateCurrentGrid(this.formatGrid(sampleGrid));
    this.exitControlNumber();
  }

  updateCurrentGrid(grid: Grid): Grid {
    this.currentGrid = grid;
    return this.currentGrid;
  }

  updateCurrentCell(cell: Cell): {} {
    console.log(cell.value);
    this.currentCell.isActive = false;

    this.currentCell = {
      id: cell.id,
      row: cell.row,
      col: cell.col,
      value: cell.value,
      comment: cell.comment,
      isActive: true,
      isSelect: cell.isSelect,
    };
    // this.editCell(cell);
    return this.currentCell;
  }

  updateControlNumber(control: number) {
    this.currentControl = control;

    if (this.currentCell.isSelect) {
      this.editCell(this.currentCell);
    }

    console.log(this.currentControl);
    return this.currentControl;
  }

  exitControlNumber() {
    this.currentControl = -1;
    return this.currentControl;
  }

  @HostListener('document:keydown', ['$event'])
  ControlNumberKeydown(event: KeyboardEvent): void {
    const key = Number(event.key);
    if (this.ControlNumber.includes(key)) {
      this.updateControlNumber(key);
    }
  }

  editCell(cell: Cell) {
    if (!cell.isSelect) { return; }
    if (this.currentControl === -1) { return; }

    if (this.currentGrid.grid[cell.row].row[cell.col].value === this.currentControl) {
      this.currentGrid.grid[cell.row].row[cell.col].value = undefined;
      return;
    }

    this.currentGrid.grid[cell.row].row[cell.col].value = this.currentControl;
    console.log('cell edited');
    return this.currentCell;
  }

  // checkRow(row: number) {
  //   const tempRowthis.currentGrid.grid[row].row.map
  // }

}
