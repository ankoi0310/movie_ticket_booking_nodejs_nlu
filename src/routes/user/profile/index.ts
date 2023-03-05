import express from 'express';
import { SuccessResponse } from '../../../core/handler/app-response';
import { AppUserRepository } from '../../../database/repository/app-user';
import { ProtectedRequest } from 'app-request';
import { BadRequest } from '../../../core/handler/app-error';
import validator from '../../../helper/validator';
import schema from './schema';
import asyncHandler from '../../../core/handler/async';
import _ from 'lodash';
import authentication from '../../../auth/authentication';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/my',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await AppUserRepository.getPrivateProfileById(req.user._id);
    if (!user) throw new BadRequest('User not registered');

    return new SuccessResponse(
      'success',
      _.pick(user, ['name', 'email', 'profilePicUrl', 'roles']),
    ).send(res);
  }),
);

router.put(
  '/',
  validator(schema.profile),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await AppUserRepository.getPrivateProfileById(req.user._id);
    if (!user) throw new BadRequest('User not registered');

    if (req.body.email) user.email = req.body.email;
    // if (req.body.profilePicUrl) user.profilePicUrl = req.body.profilePicUrl;

    await AppUserRepository.updateInfo(user);

    const data = _.pick(user, ['name', 'profilePicUrl']);

    return new SuccessResponse('Profile updated', data).send(res);
  }),
);

export default router;