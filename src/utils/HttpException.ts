export interface HttpError {
  error?: HttpErrorType;
  message?: string;
  status?: number;
}

export type HttpErrorType =
  | 'invalid_request'
  | 'request_failed'
  | 'server_error'
  | 'unauthorized_request'
  | 'validation_error';

export default class HttpException extends Error {
  public status: number;

  public error: HttpErrorType;

  public constructor(error?: HttpError, stack?: string) {
    super();
    const e = error || {};
    this.error = e.error || 'server_error';
    this.message = e.message || 'An unknown error occured.';
    this.name = 'HttpException';
    this.stack = stack || this.stack;
    this.status = e.status || 500;
  }
}
