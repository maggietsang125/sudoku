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
        background: controlBackgroundColor(num, currentControl),
        color: controlColor(num),
      };
    });
  }
}

function controlBackgroundColor(control: Control, currentControl: CurrentControl): string {
  if (control.isCompleted) {
    return controlBackgroundColorSpec.Completed;
  }
  else if (control.value === currentControl.value) {
    return controlBackgroundColorSpec.Current;
  }
  return controlBackgroundColorSpec.Fixed;
}

function controlColor(control: Control): string {
  if (control.isCompleted) {
    return controlColorSpec.Completed;
  }
  return controlColorSpec.Fixed;
}
