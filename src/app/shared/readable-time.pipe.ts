// vim: set tabstop=2 expandtab filetype=javascript:

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableTime'
})
export class ReadableTimePipe implements PipeTransform {

  transform(value: number): any {
    var temp = value;
    var result = '';
    var years = Math.floor(temp / 31536000);
    if (years)
    {
        result = years + 'y ';
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days)
    {
        result = result + days + 'd ';
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    var minutes = Math.floor((temp %= 3600) / 60);
    var seconds = temp % 60;
    result = result + hours + ' hour ' + 
        minutes + ' minute ' +
        seconds + ' second';
    return result;
  }

}
