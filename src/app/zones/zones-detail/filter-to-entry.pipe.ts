// vim: set tabstop=2 expandtab filetype=javascript:
import { Pipe, PipeTransform } from '@angular/core';
import { ZoneDataEntry } from '../services/zone-data';

@Pipe({
  name: 'filterToEntry'
})
export class FilterToEntryPipe implements PipeTransform {

  transform(value: any, args?: any): ZoneDataEntry {
    let retour: ZoneDataEntry = new ZoneDataEntry();

    retour.name = value && value.filter_name || '';
    retour.ttl = value && value.filter_ttl && Number(value.filter_ttl) || NaN;
    retour.type = value && value.filter_type || '';
    retour.data = value && value.filter_data || '';

    return retour;
  }
}
