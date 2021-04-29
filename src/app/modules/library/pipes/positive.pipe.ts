import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive'
})
export class PositivePipe implements PipeTransform {

  transform(num: number, args?: any): any {
    return Math.abs(num);
  }

}
