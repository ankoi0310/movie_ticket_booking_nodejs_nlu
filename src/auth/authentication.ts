import express from 'express';
import { ProtectedRequest } from 'app-request';
import { AppUserRepository } from '../database/repository/app-user';
import KeystoreRepository from '../database/repository/keystore';
import {
  AuthenticationFailure,
  InvalidAccessToken,
  TokenExpired,
} from '../core/handler/app-error';
import JWT from '../core/security/jwt';
import { Types } from 'mongoose';
import { getAccessToken, validateTokenData } from './util';
import validator, { ValidationSource } from '../helper/validator';
import schema from './schema';
import asyncHandler from '../core/handler/async';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user = await AppUserRepository.getById(new Types.ObjectId(payload.sub));
      if (!user) throw new AuthenticationFailure('User not registered');
      req.user = user;

      const keystore = await KeystoreRepository.findForKey(req.user, payload.prm);
      if (!keystore) throw new AuthenticationFailure('Invalid access token');
      req.keystore = keystore;

      return next();
    } catch (e) {
      if (e instanceof TokenExpired) throw new InvalidAccessToken(e.message);
      throw e;
    }
  }),
);