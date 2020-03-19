// vim: set tabstop=2 expandtab filetype=javascript:
export class GenericError {
  status /* : number */ = 0;
  message /* : string */ = 'Something went horribly wrong...';
  details: Array<string> = [];
  filename /* : string */ = '';
  fileline /* : number */ = 0;

  setStatus(status: number): GenericError {
    this.status = status;
    return this;
  }

  setMessage(message: string): GenericError {
    this.message = message;
    return this;
  }

  applyObject(obj: any): GenericError {
    this.status = obj && obj.status || this.status;
    this.message = obj && obj.message || this.message;
    this.details = obj && obj.details || this.details;
    this.filename = obj && obj.filename || this.filename;
    this.fileline = obj && obj.fileline || this.fileline;
    return this;
  }
}
