import { HttpException } from '@nestjs/common';

export class CustomResponse {
  statusCode: number;
  message: string;
  data?: any;

  constructor(statusCode: number, data:any) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class CustomError extends HttpException {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super({ message, statusCode }, statusCode);

    this.statusCode = statusCode;
  }
}