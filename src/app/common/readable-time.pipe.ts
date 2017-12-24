// vim: set tabstop=2 expandtab filetype=javascript:

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableTime'
})
export class ReadableTimePipe implements PipeTransform
{

  transform(value: number): any
  {
    var seconds = value;
    var result = '';
    var years = Math.floor(seconds / 31536000);
    seconds %= 31536000;
    if (years)
    {
        result = years + (seconds ? 'y ': (years>1 ? ' years':' year'));
    }
    var days = Math.floor(seconds / 86400);
    seconds %= 86400;
    if (days)
    {
        var weeks = Math.floor(days / 7);
        if( (days % 7)  == 0 )
        {
          result = result + weeks + (seconds ? 'w ': (weeks>1 ? ' weeks':' week'));
        }
        else
        {
          result = result + days + (seconds ? 'd ': (days>1 ? ' days':' day'));
        }
    }
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    if( hours )
    {
      result = result + hours + (seconds ? 'h ': (hours>1 ? ' hours':' hour'));
    }

    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    if( minutes )
    {
      result = result + minutes + (seconds ? 'm ': (minutes>1 ? ' minutes':' minute'));
    }
    if( seconds )
    {
      result = result + seconds + (result.length ? 's': (seconds>1 ? ' seconds':' second'));
    }
    return result;
  }

}
