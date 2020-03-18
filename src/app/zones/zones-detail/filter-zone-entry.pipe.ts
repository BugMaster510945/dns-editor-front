// vim: set tabstop=2 expandtab filetype=javascript:
import { Pipe, PipeTransform } from '@angular/core';
import { ZoneDataEntry } from '@app/zones/services/zone-data';

@Pipe({
  name: 'filterZoneEntry'
})
export class FilterZoneEntryPipe implements PipeTransform {

  transform(value: ZoneDataEntry[], fName: any, fTTL: any, fType: any, fData): ZoneDataEntry[] {
    if (typeof fName !== 'string') { fName = ''; }
    if (typeof fTTL !== 'string') { fTTL = ''; }
    if (typeof fType !== 'string') { fType = ''; }
    if (typeof fData !== 'string') { fData = ''; }

    // Prepare les filtres
    fName = fName.trim().toLocaleLowerCase();
    fTTL = fTTL.trim().toLocaleLowerCase();
    fType = fType.trim().toLocaleLowerCase();
    fData = fData.trim().toLocaleLowerCase();

    const fNoName: boolean = fName.length === 0;
    const fNoTTL: boolean = fTTL.length === 0;
    const fNoType: boolean = fType.length === 0;
    const fNoData: boolean = fData.length === 0;

    // return value.filter(
    return (value || []).filter(
      (item) => {
        return true &&
          (fNoName || item.name.toLocaleLowerCase().includes(fName)) &&
          (fNoTTL || item.ttl.toString().includes(fTTL)) &&
          (fNoType || item.type.toLocaleLowerCase().includes(fType)) &&
          (fNoData || item.data.toLocaleLowerCase().includes(fData));
      }
    );
  }

}
