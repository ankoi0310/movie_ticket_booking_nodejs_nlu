import { Tokens } from 'app-request';
import { AuthenticationFailure, InternalServerError } from '../core/handler/app-error';
import JWT, { JwtPayload } from '../core/security/jwt';
import { Types } from 'mongoose';
import AppUser from '../database/model/app-user';
import { token } from '../config/token';

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthenticationFailure('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new AuthenticationFailure('Invalid Authorization');
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== token.issuer ||
    payload.aud !== token.audience ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthenticationFailure('Invalid Access Token');
  return true;
};

export const createTokens = async (
  user: AppUser,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      token.issuer,
      token.audience,
      user._id.toString(),
      accessTokenKey,
      token.accessTokenValidity,
    ),
  );

  if (!accessToken) throw new InternalServerError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      token.issuer,
      token.audience,
      user._id.toString(),
      refreshTokenKey,
      token.refreshTokenValidity,
    ),
  );

  if (!refreshToken) throw new InternalServerError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};