import express from 'express';
import { RoleRequest } from 'app-request';
import { BadRequest } from '../../core/handler/app-error';
import asyncHandler from '../../core/handler/async';
import { SuccessResponse } from '../../core/handler/app-response';
import { AppUserRepository } from '../../database/repository/app-user';
import KeystoreRepository from '../../database/repository/keystore';
import AppUser from '../../database/model/app-user';
import { RoleType } from '../../database/model/role';
import validator from '../../helper/validator';
import role from '../../helper/role';
import schema from './schema';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import authorization from '../../auth/authorization';
import authentication from '../../auth/authentication';

const router = express.Router();

//----------------------------------------------------------------
router.use(authentication, role(RoleType.ADMIN), authorization);
//----------------------------------------------------------------

router.post(
  '/user/assign',
  validator(schema.credential),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await AppUserRepository.getByEmail(req.body.email);
    if (!user) throw new BadRequest('User do not exists');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await AppUserRepository.changePassword({
      _id: user._id,
      password: passwordHash,
    } as AppUser);

    await KeystoreRepository.removeAllForClient(user);

    new SuccessResponse(
      'User password updated',
      _.pick(user, ['_id', 'email']),
    ).send(res);
  }),
);

export default router;