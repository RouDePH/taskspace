import { HttpStatus } from '@nestjs/common';

export interface IResponseOptions {
  status?: HttpStatus;
  isArray?: boolean;
}
