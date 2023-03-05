import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';
import { InvalidAccessToken, TokenExpired } from '../handler/app-error';
import Logger from '../log/logger';
import { token } from '../../config/token';

/*
 * issuer     — Software organization who issues the token.
 * subject    — Intended user of the token.
 * audience   — Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm  — Encryption algorithm to be used to protect the token.
 */

export class JwtPayload {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm: string;

  constructor(
    issuer: string,
    audience: string,
    subject: string,
    param: string,
    validity: number,
  ) {
    this.iss = issuer;
    this.aud = audience;
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity;
    this.prm = param;
  }
}

async function encode(payload: JwtPayload): Promise<string> {
  // @ts-ignore
  return promisify(sign)({ ...payload }, token.jwtSecret, { algorithm: 'HS512' });
}

/**
 * This method checks the token and returns the decoded data when token is valid in all respect
 */
async function validate(token: string): Promise<JwtPayload> {
  try {
    // @ts-ignore
    return (await promisify(verify)(token, token.jwtSecret)) as JwtPayload;
  } catch (e: any) {
    Logger.debug(e);
    if (e && e.name === 'TokenExpired') throw new TokenExpired();
    // throws error if the token has not been encrypted by the private key
    throw new InvalidAccessToken();
  }
}

/**
 * Returns the decoded payload if the signature is valid even if it is expired
 */
async function decode(token: string): Promise<JwtPayload> {
  try {
    // @ts-ignore
    return (await promisify(verify)(token, token.jwtSecret, {
      ignoreExpiration: true,
    })) as JwtPayload;
  } catch (e) {
    Logger.debug(e);
    throw new InvalidAccessToken();
  }
}

export default {
  encode,
  validate,
  decode,
};