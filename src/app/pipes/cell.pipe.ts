import { Pipe, PipeTransform } from '@angular/core';
import { cellValueColorSpec, colBackgroundColorSpec } from '../util/sudoku-preview';
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
    return colBackgroundColorSpec.Error;
  }
  else if (cell.id === currentCell.id) {
    return colBackgroundColorSpec.Current;
  }
  else if (cell.row === currentCell.row || cell.col === currentCell.col) {
    return colBackgroundColorSpec.NearBy;
  }
  else if (cell.value === currentCell.value && cell.value !== 0) {
    return colBackgroundColorSpec.SameValue;
  }
  return colBackgroundColorSpec.Fixed;
}

function cellColor(cell: Cell): string {
  if (cell.isSelect) {
    return cellValueColorSpec.Edit;
  }
  return cellValueColorSpec.Fixed;
}
