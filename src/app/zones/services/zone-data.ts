// vim: set tabstop=2 expandtab filetype=javascript:
export class ZoneDataEntry {
  name: string;
  ttl: number;
  type: string;
  data: string;
};

export class ZoneDataSecuredNsec3 {
  salt: string;
  iterations: number;
};

export class ZoneDataSecured {
  zsk: number[];
  ksk: number[];
  nsec3param: ZoneDataSecuredNsec3;
};

export class ZoneData {
  name: string;
  master: string;
  responsible: string;
  serial: number;
  refresh: number;
  retry: number;
  expire: number;
  minimum: number;
  secured: ZoneDataSecured;
  entries: ZoneDataEntry[];
  read: boolean;
  write: boolean;
}

export type DNSTypeList = DNSType[];

export class DNSType {
  name: string;
  regexp: string;
}
