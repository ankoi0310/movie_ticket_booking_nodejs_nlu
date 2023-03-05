import { Response } from 'express';
import { environment } from '../../config/app';
import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse
} from './app-response';

export enum ErrorType {
  TOKEN_EXPIRED = 'TokenExpired',
  UNAUTHORIZED = 'Unauthorized',
  INVALID_ACCESS_TOKEN = 'InvalidAccessToken',
  FORBIDDEN = 'Forbidden',
  INTERNAL_SERVER_ERROR = 'InternalServerError',
  BAD_REQUEST = 'BadRequest',
  NOT_FOUND = 'NotFound',
  NO_DATA_AVAILABLE = 'NoDataAvailable',
  NO_ENTRY = 'NoEntry',
}

export abstract class AppError extends Error {
  constructor(public type: ErrorType, public message: string) {
    super(type);
  }

  public static handle (error: AppError, res: Response): Response {
    switch (error.type) {
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(error.message).send(res);
      case ErrorType.INVALID_ACCESS_TOKEN:
        return new AccessTokenErrorResponse(error.message).send(res);
      case ErrorType.INTERNAL_SERVER_ERROR:
        return new InternalServerErrorResponse(error.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_DATA_AVAILABLE:
      case ErrorType.NO_ENTRY:
        return new NotFoundResponse(error.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(error.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(error.message).send(res);
      default: {
        let message = error.message;
        if (environment === 'production') message = 'Internal Server Error';
        return new InternalServerErrorResponse(message).send(res);
      }
    }
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(ErrorType.INTERNAL_SERVER_ERROR, message);
  }
}

export class NotFound extends AppError {
  constructor(message = 'Not found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class NoDataAvailable extends AppError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA_AVAILABLE, message);
  }
}

export class NoEntry extends AppError {
  constructor(message = 'Entry was not found') {
    super(ErrorType.NO_ENTRY, message);
  }
}

export class BadRequest extends AppError {
  constructor(message = 'Bad request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class Forbidden extends AppError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

export class AuthenticationFailure extends AppError {
  constructor(message = 'Authentication failed') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

export class InvalidAccessToken extends AppError {
  constructor(message = 'Invalid access token') {
    super(ErrorType.INVALID_ACCESS_TOKEN, message);
  }
}

export class TokenExpired extends AppError {
  constructor(message = 'Token expired') {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}