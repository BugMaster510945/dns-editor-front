// vim: set tabstop=2 expandtab filetype=javascript:
export class Error
{
  status: number;
  message: string;
  details: Array<String>;
  filename: string;
  fileline: number;

  constructor(status: number, message: string, obj?: any)
  {
    this.status = status;
    this.message = obj && obj.message || message;
    this.details = obj && obj.details || [];
    this.filename = obj && obj.filename || '';
    this.fileline = obj && obj.fileline || 0;

    // ignore stacktrace
  }
}
