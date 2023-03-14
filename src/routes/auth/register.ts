import express from 'express';
import { AppUserRepository } from '../../database/repository/app-user';
import { SuccessResponse } from '../../core/handler/app-response';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import { BadRequest } from '../../core/handler/app-error';
import AppUser from '../../database/model/app-user';
import { createTokens } from '../../auth/util';
import validator from '../../helper/validator';
import schema from './schema';
import asyncHandler from '../../core/handler/async';
import bcrypt from 'bcrypt';
import { RoleType } from '../../database/model/role';
import { getUserData } from './util';
import { UserInfoRepository } from '../../database/repository/user-info';
import UserInfo from '../../database/model/user-info';
import { VerificationTokenRepository } from '../../database/repository/verification-token';
import { VerificationTokenModel } from '../../database/model/verification-token';
import { sendVerification } from '../../middleware/app-mail-service';

const router = express.Router();

router.post(
  '/',
  validator(schema.register),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await AppUserRepository.getByEmail(req.body.email);
    if (user) throw new BadRequest('User already registered');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const userInfo = await UserInfoRepository.create({
      fullName: req.body.fullName,
      phone: req.body.phone,
    } as UserInfo);

    const { user: newUser, keystore } = await AppUserRepository.create(
      {
        email: req.body.email,
        password: passwordHash,
        userInfo: userInfo,
      } as AppUser,
      accessTokenKey,
      refreshTokenKey,
      RoleType.USER,
    );

    // Create verification token
    const token = crypto.randomBytes(64).toString('hex');
    await VerificationTokenModel.create({
      appUser: newUser,
      token: token,
    });

    // Send email to user with verification link
    const result = await sendVerification(newUser.email, token);
    if (!result) throw new BadRequest('Failed to send verification email');

    // Update verification info
    const verificationToken = await VerificationTokenRepository.getByToken(token);
    if (!verificationToken) throw new BadRequest('Invalid verification token');

    verificationToken.isSent = true;
    await VerificationTokenModel.findOneAndUpdate(
      { token: token },
      verificationToken,
      { new: true }
    );

    const tokens = await createTokens(
      newUser,
      keystore.primaryKey,
      keystore.secondaryKey,
    );
    const userData = await getUserData(newUser);

    new SuccessResponse('Registration successful', {
      user: userData,
      tokens,
    }).send(res);
  }),
);


export default router;