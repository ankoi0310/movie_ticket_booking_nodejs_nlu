import express from 'express';
import { ProtectedRequest } from 'app-request';
import { AuthenticationFailure } from '../core/handler/app-error';
import { RoleRepository } from '../database/repository/role';
import asyncHandler from '../core/handler/async';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.roles || !req.currentRoleTypes)
      throw new AuthenticationFailure('Permission denied');

    const roles = await RoleRepository.findByTypes(req.currentRoleTypes);
    if (roles.length === 0) throw new AuthenticationFailure('Permission denied');

    let authorized = false;

    for (const userRole of req.user.roles) {
      if (authorized) break;
      for (const role of roles) {
        if (userRole._id.equals(role._id)) {
          authorized = true;
          break;
        }
      }
    }

    if (!authorized) throw new AuthenticationFailure('Permission denied');

    return next();
  }),
);