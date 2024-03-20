export interface IBaseResponse<T> {
  code: number;
  msg: string;
  data: T;
}
export interface IBaseError<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data?: T;
}
