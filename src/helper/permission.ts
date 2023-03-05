import { Response, NextFunction } from 'express';
import { Forbidden } from '../core/handler/app-error';
import { PublicRequest } from '../types/app-request';

export default (permission: string) =>
  (req: PublicRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.apiKey?.permissions)
        return next(new Forbidden('Permission Denied'));

      const exists = req.apiKey.permissions.find((entry: string) => entry === permission);
      if (!exists) return next(new Forbidden('Permission Denied'));

      next();
    } catch (error) {
      next(error);
    }
  };