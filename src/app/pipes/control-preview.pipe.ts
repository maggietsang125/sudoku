import { Pipe, PipeTransform } from '@angular/core';
import { controlBackgroundColorSpec, controlColorSpec } from '../util/sudoku-preview';
import { CurrentControl } from '../util/sudoku-util';

export interface ControlPreviewInfo {
  value: number;
  background: string;
  color: string;
}

@Pipe({
  name: 'controlPreview'
})
export class ControlPreviewPipe implements PipeTransform {

  transform(controlList: number[], currentControl: CurrentControl): ControlPreviewInfo[] {
    return controlList.map(num => {
      return {
        value: num,
        background: controlBackgroundColor(num, currentControl),
        color: controlColor(num, currentControl),
      };
    });
  }

}

function controlBackgroundColor(control: number, currentControl: CurrentControl): string {
  if (control === currentControl.value) {
    return controlBackgroundColorSpec.Current;
  }
  // else if ( the number is completed)
  return controlBackgroundColorSpec.Fixed;
}

function controlColor(control: number, currentControl: CurrentControl): string {
  if (currentControl.completed) {
    return controlColorSpec.Completed;
  }
  return controlColorSpec.Fixed;
}
