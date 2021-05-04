import { Pipe, PipeTransform } from '@angular/core';
import { controlBackgroundColorSpec, controlColorSpec } from '../util/sudoku-preview';
import { Control, CurrentControl } from '../util/sudoku-util';

export interface ControlPreviewInfo {
  value: number;
  background: string;
  color: string;
}

@Pipe({
  name: 'controlPreview'
})
export class ControlPreviewPipe implements PipeTransform {
  transform(controlList: Control[], currentControl: CurrentControl): ControlPreviewInfo[] {
    return controlList.map(num => {
      return {
        value: num.value,
        background: controlBackgroundColor(num.value, currentControl),
        color: controlColor(num.value, currentControl),
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
