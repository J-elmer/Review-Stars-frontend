import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import moment from "moment";

@Pipe({
  name: 'toTwelveHoursBase'
})
export class ToTwelveHoursBasePipe implements PipeTransform {

  transform(value: Date): string {
    return moment(value, 'HH:mm').format('hh:mm A');
  }
}
