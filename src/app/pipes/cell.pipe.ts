import { Pipe, PipeTransform } from '@angular/core';
import { cellValueColor, colBackgroundColor } from '../util/sudoku-preview';
import { Cell } from '../util/sudoku-util';

export interface CellPreviewInfro {
  value: number | undefined;
  background: string;
  color: string;
  cell: Cell;
}



@Pipe({
  name: 'cell'
})
export class CellPreviewPipe implements PipeTransform {

  transform(row: Cell[], currentCell: Cell): CellPreviewInfro[] {
    const tempRow: CellPreviewInfro[] = row.map(col => {
      return {
        value: col.value === 0 ? undefined : col.value,
        background: cellBackgroundColor(col, currentCell),
        color: cellColor(col),
        cell: col,
      };

    });

    return tempRow;
  }

}

function cellBackgroundColor(cell: Cell, currentCell: Cell): string {
  if (cell.isError) {
    return colBackgroundColor.Error;
  }
  else if (cell.id === currentCell.id) {
    return colBackgroundColor.Current;
  }
  else if (cell.row === currentCell.row || cell.col === currentCell.col) {
    return colBackgroundColor.NearBy;
  }
  else if (cell.value === currentCell.value && cell.value !== 0) {
    return colBackgroundColor.SameValue;
  }
  return colBackgroundColor.Fixed;
}

function cellColor(cell: Cell): string {
  if (cell.isSelect) {
    return cellValueColor.Edit;
  }
  return cellValueColor.Fixed;
}
