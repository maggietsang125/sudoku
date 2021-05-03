import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

import { Cell, Row, Grid, CurrentControl } from './util/sudoku-util';
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

  currentGrid: Grid = this.updateCurrent2dGrid(this.format2DGrid(sampleGrid));
  currentCell: Cell = {
    row: 9,
    col: 9,
    isActive: false,
    isSelect: false,
  };
  currentControl: CurrentControl = { value: 9, completed: false };

  ControlNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
    // this.currentGrid = this.updateCurrent2dGrid(this.format2DGrid(this.simpleArray));
    this.currentGrid = this.updateCurrent2dGrid(this.format2DGrid(sampleGrid));
    console.log(this.currentGrid);

    // this.ControlNumber.every(num => {
    //   this.checkRow(num) ? con
    // });
  }

  toggleStartScreen(): void {
    this.isOpeningScreen = !this.isOpeningScreen;
  }

  toggleConsole(): void {
    this.isConsole = !this.isConsole;
  }

  format2DGrid(array: number[][]) {
    const newGrid = array.map((row, rowIndex) => {
      const newRow = row.map((col, colIndex) => {
        if (col === 0) {
          return {
            id: String(rowIndex) + String(colIndex),
            row: rowIndex,
            col: colIndex,
            isActive: false,
            isSelect: true,
            isError: false,
          } as Cell;
        }
        return {
          id: String(rowIndex) + String(colIndex),
          row: rowIndex,
          col: colIndex,
          value: col,
          isActive: false,
          isSelect: false,
          isError: false,
        } as Cell;
      });
      return newRow;
    });

    // console.log('newGrid: ' + newGrid);
    return {
      id: '01',
      grid: newGrid,
    };
  }

  resetGrid(): void {
    this.currentGrid = this.updateCurrent2dGrid(this.format2DGrid(sampleGrid));
    this.exitControlNumber();
  }

  updateCurrent2dGrid(grid: Grid): Grid {
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
      isError: cell.isError,
    };
    return this.currentCell;
  }

  updateControlNumber(control: number): CurrentControl {
    this.currentControl.value = control;

    if (this.currentCell.isSelect) {
      this.editCell(this.currentCell);
    }

    console.log(this.currentControl);
    return this.currentControl;
  }

  exitControlNumber(): CurrentControl {
    this.currentControl.value = -1;
    return this.currentControl;
  }

  @HostListener('document:keydown', ['$event'])
  ControlNumberKeydown(event: KeyboardEvent): void {
    const key = Number(event.key);
    if (this.ControlNumber.includes(key)) {
      this.updateControlNumber(key);
    }
  }

  // tslint:disable-next-line: typedef
  editCell(cell: Cell) {
    if (!cell.isSelect) { return; }
    if (this.currentControl.value === -1) { return; }

    if (this.currentGrid.grid[cell.row][cell.col].value === this.currentControl.value) {
      this.currentGrid.grid[cell.row][cell.col].value = undefined;
      return;
    }
    this.currentGrid.grid[cell.row][cell.col].value = this.currentControl.value;



    console.log('cell edited');

    this.checkRow(cell.row);
    // // this.checkColumn(cell.col);
    // this.checkNumberPresence(cell.row, cell.col);
    return this.currentCell;
  }

  checkNumberPresence(row: number, col: number): boolean {
    const cell = this.currentGrid.grid[this.currentCell.row][this.currentCell.col];
    cell.isError = this.checkRow(row) && this.checkColumn(col);
    console.log('cell.isError: ' + cell.isError);
    this.updateCurrentCell(cell);
    // this.editCell(cell);

    return cell.isError;
  }

  checkRow(row: number): boolean {
    const cell = this.currentGrid.grid[this.currentCell.row][this.currentCell.col];
    const tempRow = this.currentGrid.grid[row].map(col => col.value).filter(Number);

    tempRow.some(x => tempRow.indexOf(x) !== tempRow.lastIndexOf(x)) ? cell.isError = true : cell.isError = false;
    this.updateCurrentCell(cell);

    console.log('check row: ' + cell.isError);
    return cell.isError;

    // const tempRow = this.currentGrid.grid[row].map(col => col.value).filter(Number);
    // return tempRow.some(x => tempRow.indexOf(x) !== tempRow.lastIndexOf(x));
  }

  checkColumn(col: number): boolean {
    // const cell = this.currentGrid.grid[this.currentCell.row][this.currentCell.col];

    // const tempCol = this.currentGrid.grid.map(row => row[col].value).filter(Number);
    // tempCol.some(x => tempCol.indexOf(x) !== tempCol.lastIndexOf(x)) ? cell.isError = true : cell.isError = false;
    // this.updateCurrentCell(cell);

    // console.log('check col: ' + cell.isError);
    // return cell.isError;

    const tempCol = this.currentGrid.grid.map(row => row[col].value).filter(Number);
    return tempCol.some(x => tempCol.indexOf(x) !== tempCol.lastIndexOf(x));
  }

}
