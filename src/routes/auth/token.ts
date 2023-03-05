import express from 'express';
import { TokenRefreshResponse } from '../../core/handler/app-response';
import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { AppUserRepository } from '../../database/repository/app-user';
import { AuthenticationFailure } from '../../core/handler/app-error';
import JWT from '../../core/security/jwt';
import KeystoreRepository from '../../database/repository/keystore';
import crypto from 'crypto';
import {
  validateTokenData,
  createTokens,
  getAccessToken,
} from '../../auth/util';
import validator, { ValidationSource } from '../../helper/validator';
import schema from './schema';
import asyncHandler from '../../core/handler/async';

const router = express.Router();

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  asyncHandler(async (req: ProtectedRequest, res) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await AppUserRepository.getById(
      new Types.ObjectId(accessTokenPayload.sub),
    );
    if (!user) throw new AuthenticationFailure('User not registered');
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthenticationFailure('Invalid access token');

    const keystore = await KeystoreRepository.find(
      req.user,
      accessTokenPayload.prm,
      refreshTokenPayload.prm,
    );

    if (!keystore) throw new AuthenticationFailure('Invalid access token');
    await KeystoreRepository.remove(keystore._id);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepository.create(req.user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      req.user,
      accessTokenKey,
      refreshTokenKey,
    );

    new TokenRefreshResponse(
      'Token Issued',
      tokens.accessToken,
      tokens.refreshToken,
    ).send(res);
  }),
);

export default router;