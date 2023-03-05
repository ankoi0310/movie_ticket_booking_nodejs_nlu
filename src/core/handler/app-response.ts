import { Response } from 'express';

enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

abstract class AppResponse {
  constructor(protected statusCode: StatusCode, protected status: ResponseStatus, protected message: string) { }

  protected prepare<T extends AppResponse>(res: Response, response: T, headers: { [key: string]: string }): Response {
    for (const [key, value] of Object.entries(headers)) {
      res.append(key, value);
    }

    return res.status(this.status).json(AppResponse.sanitize(response));
  }

  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare(res, this, headers);
  }

  private static sanitize<T extends AppResponse>(response: T): T {
    const clone: T = Object.assign({}, response);

    // @ts-ignore
    delete clone.status;

    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends AppResponse {
  constructor(message = 'Authentication failed') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends AppResponse {
  constructor(message = 'Not found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<NotFoundResponse>(res, this, headers);
  }
}

export class ForbiddenResponse extends AppResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends AppResponse {
  constructor(message = 'Bad request') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class InternalServerErrorResponse extends AppResponse {
  constructor(message = 'Internal server error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class SuccessMsgResponse extends AppResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class FailureMsgResponse extends AppResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends AppResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class AccessTokenErrorResponse extends AppResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Invalid access token') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return this.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

export class TokenRefreshResponse extends AppResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<TokenRefreshResponse>(res, this, headers);
  }
}
