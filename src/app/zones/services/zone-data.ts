// vim: set tabstop=2 expandtab filetype=javascript:
export class ZoneDataEntry {
  name /* : string */ = '';
  ttl /* : number */ = 0;
  type /* : string */ = '';
  data /* : string */ = '';

  static isEqual(data1: ZoneDataEntry, data2: ZoneDataEntry): boolean {
    return data1 === data2 ||
      data1 !== undefined &&
      data2 !== undefined &&
      data1.name === data2.name &&
      data1.ttl === data2.ttl &&
      data1.type === data2.type &&
      data1.data === data2.data;
  }
}

export class ZoneDataSecuredNsec3 {
  salt /* : string */ = '';
  iterations /* : number */ = 0;
}

export class ZoneDataSecured {
  zsk: number[] = [];
  ksk: number[] = [];
  nsec3param /* : ZoneDataSecuredNsec3 */ = new ZoneDataSecuredNsec3();
}

export class ZoneData {
  name /* : string */ = '';
  master /* : string */ = '';
  responsible /* : string */ = '';
  serial /* : number */ = 0;
  refresh /* : number */ = 0;
  retry /* : number */ = 0;
  expire /* : number */ = 0;
  minimum /* : number */ = 0;
  secured /* : ZoneDataSecured */ = new ZoneDataSecured();
  entries: ZoneDataEntry[] = [];
  read /* : boolean */ = false;
  write /* : boolean */ = false;
}

export type DNSTypeList = DNSType[];

export class DNSType {
  name /* : string */ = '';
  regexp /* : string */ = '';
}
