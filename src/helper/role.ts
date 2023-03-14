import { RoleType } from '../database/model/role';
import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (...roleCodes: RoleType[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleTypes = roleCodes;
    next();
  };