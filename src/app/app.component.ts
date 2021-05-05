import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

import { Cell, Row, Grid, CurrentControl, controlNumber2, Control } from './util/sudoku-util';
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
  currentControl: CurrentControl = { value: 9, isCompleted: false };

  ControlNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  controlNumber = controlNumber2;

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

  format2DGrid(array: number[][]): Grid {
    const newGrid = array.map((row, rowIndex) => {
      const newRow = row.map((col, colIndex) => {
        if (col === 0) {
          return {
            id: String(rowIndex) + String(colIndex),
            row: rowIndex,
            col: colIndex,
            value: col,
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
    console.log('id: ' + cell.id + ', value: ' + cell.value, ', isSelect: ' + cell.isSelect + ', isError: ' + cell.isError);
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
    this.currentControl = {
      value: this.controlNumber[control].value,
      isCompleted: this.controlNumber[control].isCompleted,
    };

    if (this.currentCell.isSelect && this.currentCell.value !== this.controlNumber[control].value) {
      this.editCell(this.currentCell);
      this.updateCurrentCell(this.currentCell);
    }
    else if (this.currentCell.value === this.currentControl.value) {
      this.removeCurrentCell();
    }

    console.log('Control: ' + this.currentControl.value);
    return this.currentControl;
  }

  @HostListener('document:keydown.delete', ['$event'])
  removeCurrentCell(event?: KeyboardEvent): void {
    console.log('delete cell');
    this.currentGrid.grid[this.currentCell.row][this.currentCell.col].value = 0;
    this.currentGrid.grid[this.currentCell.row][this.currentCell.col].isError = false;
    // this.controlNumber = this.checkControlCompletion();
    this.updateCurrentCell(this.currentGrid.grid[this.currentCell.row][this.currentCell.col]);
    return;
  }

  @HostListener('document:keydown', ['$event'])
  ControlNumberKeydown(event: KeyboardEvent): void {
    const key = Number(event.key);
    console.log('keydown: ' + key);
    if (this.ControlNumber.includes(key)) {
      this.updateControlNumber(key);
      // this.updateControlNumber(key - 1);
    }
  }

  exitControlNumber(): CurrentControl {
    this.currentControl = {
      value: 0,
      isCompleted: false,
    };
    return this.currentControl;
  }

  editCell(cell: Cell): void {
    if (!cell.isSelect) { return; }
    if (this.currentControl.value === 0) { return; }

    if (this.currentCell.value === this.currentControl.value) {
      this.removeCurrentCell();
      return;
    }
    this.currentGrid.grid[cell.row][cell.col].value = this.currentControl.value;
    this.currentGrid.grid[cell.row][cell.col].isError = this.checkDuplicate(cell.row, cell.col);

    console.log('cell edited');

    // this.controlNumber = this.checkControlCompletion();
    return;
  }

  checkDuplicate(row: number, col: number): boolean {
    console.log('\n inside check duplicates \n --------------------------------------');
    const cell = this.currentGrid.grid[this.currentCell.row][this.currentCell.col];

    const tempRow = this.currentGrid.grid[row].map(column => column.value).filter(Number);
    const tempCol = this.currentGrid.grid.map(rows => rows[col].value).filter(Number);
    const cutRow = Math.trunc(row / 3) * 3;
    const cutCol = Math.trunc(col / 3) * 3;

    const smallGrid = this.currentGrid.grid.slice(cutRow, cutRow + 3)
      .map(rows => rows.slice(cutCol, cutCol + 3))
      .reduce((prev, next) => prev.concat(next))
      .map(column => column.value)
      .filter(Number);

    cell.isError = (
      tempRow.some(x => tempRow.indexOf(x) !== tempRow.lastIndexOf(x)) ||
      tempCol.some(x => tempCol.indexOf(x) !== tempCol.lastIndexOf(x)) ||
      smallGrid.some(x => smallGrid.indexOf(x) !== smallGrid.lastIndexOf(x))
    );


    this.updateCurrentCell(cell);
    return cell.isError;
  }

  checkControlCompletion(): Control[] {
    console.log('inside check control');

    const tempRow = this.currentGrid.grid
      .map(row => row.map(col => col.value))
      .reduce((prev, next) => prev.concat(next))
      .filter(Number)
      .filter(cell => cell !== undefined || cell !== 0 ? cell : null);
    console.log('check control: ' + tempRow);

    // const idk = this.controlNumber.map(control => {
    //   tempRow.filter(cell => cell === control.value).length >= 9
    //     ? control.isCompleted = true
    //     : control.isCompleted = false;
    //   console.log(control.value + ' isCompleted: ' + control.isCompleted);
    // });


    const idk = tempRow.filter(cell => cell === this.controlNumber[0].value).length >= 9
      ? this.controlNumber[0].isCompleted = true
      : this.controlNumber[0].isCompleted = false;
    console.log(this.controlNumber[0].value + ' isCompleted: ' + this.controlNumber[0].isCompleted);

    console.log(idk);
    console.log(this.controlNumber);
    return this.controlNumber;
  }

}
