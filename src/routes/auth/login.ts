import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import schema from './schema';
import validator from '../../helper/validator';
import { PublicRequest } from '../../types/app-request';
import asyncHandler from '../../core/handler/async';
import { AppUserRepository } from '../../database/repository/app-user';
import KeystoreRepository from '../../database/repository/keystore';
import { createTokens } from '../../auth/util';
import { getUserData } from './util';
import { BadRequest, AuthenticationFailure } from '../../core/handler/app-error';
import { SuccessResponse } from '../../core/handler/app-response';

const router = express.Router();

router.post(
  '/',
  validator(schema.credential),
  asyncHandler(async (req: PublicRequest, res) => {
    const user = await AppUserRepository.getByEmail(req.body.email);
    if (!user) throw new BadRequest('User not registered');
    if (!user.password) throw new BadRequest('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthenticationFailure('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepository.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    const userData = await getUserData(user);

    new SuccessResponse('Login Success', {
      user: userData,
      tokens: tokens,
    }).send(res);
  }),
);

export default router;