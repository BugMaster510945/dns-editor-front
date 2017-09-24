// vim: set tabstop=2 expandtab filetype=javascript:
import { Pipe, PipeTransform } from '@angular/core';
import { ZoneDataEntry } from '../../shared/zone-data';

@Pipe({
  name: 'filterZoneEntry'
})
export class FilterZoneEntryPipe implements PipeTransform
{

  transform(value: ZoneDataEntry[], f_name: any, f_ttl: any, f_type: any, f_data): ZoneDataEntry[]
  {
    if( typeof f_name !== 'string' ) f_name = '';
    if( typeof f_ttl  !== 'string' ) f_ttl  = '';
    if( typeof f_type !== 'string' ) f_type = '';
    if( typeof f_data !== 'string' ) f_data = '';

    // Prepare les filtres
    f_name = f_name.trim().toLocaleLowerCase();
    f_ttl  = f_ttl.trim().toLocaleLowerCase();
    f_type = f_type.trim().toLocaleLowerCase();
    f_data = f_data.trim().toLocaleLowerCase();

    let f_no_name: boolean = f_name.length == 0;
    let f_no_ttl:  boolean = f_ttl.length  == 0;
    let f_no_type: boolean = f_type.length == 0;
    let f_no_data: boolean = f_data.length == 0;

    //return value.filter(
    return (value || []).filter(
      (item) => 
      {
        return true &&
          (f_no_name || item.name.toLocaleLowerCase().includes(f_name)) &&
          (f_no_ttl  || item.ttl.toString().includes(f_ttl)) &&
          (f_no_type || item.type.toLocaleLowerCase().includes(f_type)) &&
          (f_no_data || item.data.toLocaleLowerCase().includes(f_data));
      }
    );
  }

}
